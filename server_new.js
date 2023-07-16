// import { parentPort, workerData } from "worker_threads";
import { Worker, workerData, parentPort } from "worker_threads";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import express from "express";
import { createRequire } from "module";
import WebSocket from "ws";
import * as http from "http";

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
var app = express();
var port = 4020;
app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(express.static(__dirname));
app.use(express.static("assets"));
app.use(express.static("frontend"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/frontend/index.html");
});

app.get("/import", (req, res) => {
  res.sendFile(__dirname + "/frontend/importPage.html");
});

app.get("/division", (req, res) => {
  res.sendFile(__dirname + "/frontend/divisionPage.html");
});

function sendWebsocket(ws, msg) {
  if (ws) {
    ws.send(msg);
  } else {
    console.log("WEBSOCKET DOES NOT EXISTS");
  }
}

app.post("/division_calculate", function (req, res) {
  let settings = req.body;
  // GET BARS DATA
  let timeframes = [...settings.dataSettings.timeframes];
  let symbol_bars = settings.dataSettings.symbol;
  let allSymbolsBars = {};

  let calculate_log = {
    time: new Date().toString(),
    timestamp: new Date().getTime(),
    settings: settings,
  };

  timeframes.forEach(async (tf) => {
    let path = `./assets/JSON/${symbol_bars}/${symbol_bars}, ${tf}.json`;
    let bars_data = require(path);

    //FILTER BARS BY DATE RANGE
    let date_from = new Date(settings.dataSettings.date.from).getTime();
    let date_to = new Date(settings.dataSettings.date.to).getTime();
    bars_data = bars_data.filter(
      (el) => +el.time + "000" >= date_from && +el.time + "000" < date_to
    );

    //FILTER BARS BY TRADING HOURS
    if (tf != "1D" && tf != "1W" && tf != "1M") {
      let gmt = settings.dataSettings.timezone;
      gmt = Number(gmt.replace("GMT", ""));
      //ADD LOGIC UTC
      bars_data = bars_data.filter((el, index) => {
        let date = new Date(Number(el.time + "000"));
        let day = date.getDay();
        let hours = date.getUTCHours() + gmt;
        if (hours < 0) {
          hours = 24 + hours;
          day--;
        } else if (hours > 24) {
          hours = hours - 24;
          day++;
        }
        hours = hours.toString();
        if (hours.length == 1) {
          hours = "0" + hours;
        }

        let minutes = date.getMinutes();
        minutes = minutes.toString();
        if (minutes.length == 1) {
          minutes += "0";
        }
        let session = `${hours}${minutes}`;
        let inSession = false;

        let th = settings.dataSettings.trading_hours;
        if (settings.dataSettings.isAdvancedTradingHours) {
          let tradingHoursDays = [
            settings.dataSettings.sunday_trading_hours,
            settings.dataSettings.monday_trading_hours,
            settings.dataSettings.tuesday_trading_hours,
            settings.dataSettings.wednesday_trading_hours,
            settings.dataSettings.thursday_trading_hours,
            settings.dataSettings.friday_trading_hours,
            settings.dataSettings.saturday_trading_hours,
          ];
          th = tradingHoursDays[day];
        }
        th.forEach((th_el) => {
          if (th_el.from <= session && th_el.to >= session) {
            inSession = true;
          }
        });
        if (inSession) {
          return el;
        }
      });
    }
    if (bars_data.length > 0) {
      allSymbolsBars[tf] = bars_data;
    }
  });

  let configSettings = {};
  let disabledCriterias = [];

  let addParametr = (fullObj, key) => {
    if (!(fullObj[key].length == 1 && fullObj[key][0] == 0)) {
      configSettings[key] = fullObj[key];
    } else {
      disabledCriterias.push(key);
    }
  };

  // ADD PARAMETRS
  addParametr(settings.configSettings, "barsClose");
  addParametr(settings.configSettings, "barsCloseReversal");
  addParametr(settings.configSettings, "barsIgnore");
  addParametr(settings.configSettings, "barsIgnoreClose");
  addParametr(settings.configSettings, "profitPercantage");
  addParametr(settings.configSettings, "lossPercantage");
  //addParametr(settings.configSettings, "enableSLbyReversal");

  if (settings.configSettings.enableCCI) {
    configSettings.cciLength = settings.configSettings.cciLength;
    configSettings.cciValue = settings.configSettings.cciValue;
  }

  //configSettings.enableSLbyReversal = [0];
  // settings.configSettings.enableSLbyReversal;

  // CASE ADD CCI

  // CHECK profit => if profit == 0  => delete from params

  // BUILD ALL CASES PARAMS
  console.time("Build_params");
  let fullResult = buildParams(configSettings); // less options => add profit : 0 ,
  let arrParams = fullResult.resultModified;

  console.timeEnd("Build_params");
  console.log("ARR_PARAMS", arrParams.length);
  let alias = fullResult.alias;
  //let results = [];
  let results = {};
  let resultsPartials = {};

  //Workers INIT
  const data_step = 2000;
  var Workers = {
    total:
      arrParams.length < data_step
        ? 1
        : Math.ceil(arrParams.length / data_step), // number of Workers to run arrParams
    sliced_params: [], // array of arrParams data splitted for all Workers
    opened: {}, // all opened Workers splitted by timeframes
    closed: {}, // all opened Workers splitted by timeframes
  };

  console.log("Total workers : ", Workers.total);

  let loops_count = 0;
  let workers_timeframe_count = 0;
  let worker_in_loop = false;

  //worker queue to initialize
  function initWorkers(current_tf_index) {
    if (current_tf_index + 1 > Object.keys(allSymbolsBars).length) {
      console.log("!!! ALL WORKERS FINISHED !!!");
      return;
    }
    let worker_timeframe = Object.keys(allSymbolsBars)[current_tf_index];
    if (!Workers.opened[worker_timeframe]) {
      Workers.opened[worker_timeframe] = 0;
    }
    if (!Workers.closed[worker_timeframe]) {
      Workers.closed[worker_timeframe] = 0;
      // workers_result = {}
    }

    openWorkers(5, worker_timeframe, current_tf_index);
  }
  //write worker result to file
  function writeWorkers(result, worker_timeframe, file_name) {
    if (Object.keys(result).length == 0) return;

    try {
      let folder_path = __dirname + `/calculations`;
      let folder_path_timeframe =
        __dirname + `/calculations/${worker_timeframe}`;
      let folder_path_years =
        folder_path_timeframe +
        `/${new Date(settings.dataSettings.date.from).getFullYear()}_${new Date(
          settings.dataSettings.date.to
        ).getFullYear()}`;

      if (!fs.existsSync(folder_path)) {
        fs.mkdirSync(folder_path);
      }
      if (!fs.existsSync(folder_path_timeframe)) {
        fs.mkdirSync(folder_path_timeframe);
      }
      if (!fs.existsSync(folder_path_years)) {
        fs.mkdirSync(folder_path_years);
      }

      Object.keys(result).forEach((result_sr) => {
        let folder_path_slice_range = folder_path_years + `/${result_sr}`;
        let folder_path_symbol = folder_path_slice_range + `/${symbol_bars}`;
        if (!fs.existsSync(folder_path_slice_range)) {
          fs.mkdirSync(folder_path_slice_range);
        }
        if (!fs.existsSync(folder_path_symbol)) {
          fs.mkdirSync(folder_path_symbol);
        }
        let file_index = 0;
        fs.readdir(folder_path_symbol, (error, files) => {
          if (error) {
            console.log("Error on write File :::", error);
          } else {
            file_index = files.length + 1;
            fs.writeFile(
              file_name
                ? folder_path_symbol + `/${file_name}_${file_index}`
                : folder_path_symbol + `/${file_index}`,
              JSON.stringify(result[result_sr]),
              (res) => {}
            );
          }
        });
      });
    } catch (err) {
      console.log("ERROR_WRITE_FILE", err);
    }
  }

  //initialize worker + event open/close
  function openWorkers(count, worker_timeframe, worker_timeframe_index) {
    let last_open = Workers.opened[worker_timeframe];
    let last_close = Workers.closed[worker_timeframe];
    let initial_close = last_close;
    let workers_result = {};

    console.time(
      `(${worker_timeframe}) Worker calculation (${initial_close} - ${
        initial_close + count
      })`
    );

    let workers_to_open = Workers.sliced_params.slice(
      last_close,
      last_close + count
    );
    if (workers_to_open.length) {
      workers_to_open.forEach((params_data, workerIndex) => {
        let worker = new Worker("./webworker_division_calculate.js", {
          workerData: {
            arr: params_data,
            alias,
            configSettings,
            symbol_bars,
            symbol_bars_data: allSymbolsBars[worker_timeframe], // allSymbolsBars[tf].slice(0, 160), //allSymbolsBars[tf]
            orderCall: settings.configSettings.orderCall,
            enableSLbyReversal: settings.configSettings.enableSLbyReversal,
            disabledCriterias,
          },
        });
        worker.once("message", (result) => {
          //   workers_result = { ...workers_result, ...result };
          writeWorkers(result, worker_timeframe);
          Object.keys(result).forEach((key) => {
            console.log("WORKER RESULT =>", key, ":", result[key].length);
          });
        });
        worker.on("online", () => {
          last_open++;
          console.log("worker opened:" + worker_timeframe, last_open);
        });
        worker.on("exit", () => {
          last_close++;

          console.log("worker closed:" + worker_timeframe, last_close);

          if (
            last_close == initial_close + count &&
            Workers.total > last_close
          ) {
            console.timeEnd(
              `(${worker_timeframe}) Worker calculation (${initial_close} - ${
                initial_close + count
              })`
            );
            Workers.closed[worker_timeframe] = last_close;
            Workers.opened[worker_timeframe] = last_open;

            openWorkers(count, worker_timeframe, worker_timeframe_index);
          }
          if (last_close == Workers.total) {
            setTimeout(() => {
              console.timeEnd(
                `(${worker_timeframe}) Worker calculation (${initial_close} - ${
                  initial_close + count
                })`
              );
              console.log(`All workers (${worker_timeframe}) finished`);
              Workers.closed[worker_timeframe] = last_close;
              Workers.opened[worker_timeframe] = last_open;
              //   writeWorkers(workers_result, worker_timeframe);
              initWorkers(worker_timeframe_index + 1);
            }, 100);
          }
        });
      });
    }
  }
  //set data for Workers (splitted for each)
  do {
    let from_i = loops_count * data_step;
    let to_i = from_i + data_step;
    loops_count++;
    if (from_i >= arrParams.length) break;

    Workers.sliced_params.push(arrParams.slice(from_i, to_i));
  } while (true);

  //Start workers
  initWorkers(0);
});

app.post("/calculate", function (req, res) {
  let settings = req.body;
  // GET BARS DATA
  let symbols = [...settings.dataSettings.symbols];
  let allSymbolsBars = {};

  let calculate_log = {
    time: new Date().toString(),
    timestamp: new Date().getTime(),
    settings: settings,
  };

  //  Add settings to log data(calculate_logs.txt)
  // fs.readFile(__dirname + "/logs/calculate_logs.txt", "utf8", (err, data) => {
  //   if (err) {
  //     console.log("Err sendedMessage", err);
  //   } else {
  //     if (data == null || data == "" || data == undefined) {
  //       data = null;
  //     }
  //     let LOG =
  //       data == null
  //         ? JSON.stringify(calculate_log)
  //         : data + "," + JSON.stringify(calculate_log);

  //     fs.writeFileSync(__dirname + "/logs/calculate_logs.txt", LOG, () => {
  //       console.log("SeND");
  //     });
  //   }
  // });

  symbols.forEach(async (symbol) => {
    let path = `./assets/JSON/${symbol}/${symbol}, ${settings.dataSettings.timeframe}.json`;
    let bars_data = require(path);

    //FILTER BARS BY DATE RANGE
    let date_from = new Date(settings.dataSettings.date.from).getTime();
    let date_to = new Date(settings.dataSettings.date.to).getTime();
    bars_data = bars_data.filter(
      (el) => +el.time + "000" >= date_from && +el.time + "000" < date_to
    );

    //FILTER BARS BY TRADING HOURS
    if (
      settings.dataSettings.timeframe != "1D" &&
      settings.dataSettings.timeframe != "1W" &&
      settings.dataSettings.timeframe != "1M"
    ) {
      let gmt = settings.dataSettings.timezone;
      gmt = Number(gmt.replace("GMT", ""));
      //ADD LOGIC UTC
      bars_data = bars_data.filter((el, index) => {
        let date = new Date(Number(el.time + "000"));
        let day = date.getDay();
        let hours = date.getUTCHours() + gmt;
        if (hours < 0) {
          hours = 24 + hours;
          day--;
        } else if (hours > 24) {
          hours = hours - 24;
          day++;
        }
        hours = hours.toString();
        if (hours.length == 1) {
          hours = "0" + hours;
        }

        let minutes = date.getMinutes();
        minutes = minutes.toString();
        if (minutes.length == 1) {
          minutes += "0";
        }
        let session = `${hours}${minutes}`;
        let inSession = false;

        let th = settings.dataSettings.trading_hours;
        if (settings.dataSettings.isAdvancedTradingHours) {
          let tradingHoursDays = [
            settings.dataSettings.sunday_trading_hours,
            settings.dataSettings.monday_trading_hours,
            settings.dataSettings.tuesday_trading_hours,
            settings.dataSettings.wednesday_trading_hours,
            settings.dataSettings.thursday_trading_hours,
            settings.dataSettings.friday_trading_hours,
            settings.dataSettings.saturday_trading_hours,
          ];
          th = tradingHoursDays[day];
        }
        th.forEach((th_el) => {
          if (th_el.from <= session && th_el.to >= session) {
            inSession = true;
          }
        });
        if (inSession) {
          return el;
        }
      });
    }

    // bars_data = bars_data.reverse();
    allSymbolsBars[symbol] = bars_data;
  });

  let configSettings = {};
  // let configSettings = {
  //   barsClose: settings.configSettings.barsClose,
  //   barsCloseReversal: settings.configSettings.barsCloseReversal,
  //   barsIgnore: settings.configSettings.barsIgnore,
  //   profitPercantage: settings.configSettings.profitPercantage,
  // };
  let disabledCriterias = [];

  let addParametr = (fullObj, key) => {
    if (!(fullObj[key].length == 1 && fullObj[key][0] == 0)) {
      configSettings[key] = fullObj[key];
    } else {
      disabledCriterias.push(key);
    }
  };

  // ADD PARAMETRS
  addParametr(settings.configSettings, "barsClose");
  addParametr(settings.configSettings, "barsCloseReversal");
  addParametr(settings.configSettings, "barsIgnore");
  addParametr(settings.configSettings, "barsIgnoreClose");
  addParametr(settings.configSettings, "profitPercantage");
  addParametr(settings.configSettings, "lossPercantage");
  //addParametr(settings.configSettings, "enableSLbyReversal");

  if (settings.configSettings.enableCCI) {
    configSettings.cciLength = settings.configSettings.cciLength;
    configSettings.cciValue = settings.configSettings.cciValue;
  }

  //configSettings.enableSLbyReversal = [0];
  // settings.configSettings.enableSLbyReversal;

  // CASE ADD CCI

  // CHECK profit => if profit == 0  => delete from params

  // BUILD ALL CASES PARAMS
  console.time("Build_params");
  let fullResult = buildParams(configSettings); // less options => add profit : 0 ,
  let arrParams = fullResult.resultModified;

  console.timeEnd("Build_params");
  let alias = fullResult.alias;
  //let results = [];
  let results = {};
  let resultsPartials = {};

  // PREPARE CASES
  let counter = 0;
  let temp = Math.floor(arrParams.length / 10);
  let workerNumber = temp < 200 ? 200 : temp;
  let workerCounter = 0;
  let arrWorkers = [];
  arrParams.forEach((el, index) => {
    if (index % workerNumber == 0) {
      arrWorkers.push(
        arrParams.slice(workerCounter, workerCounter + workerNumber)
      );
      workerCounter += workerNumber;
    }
  });

  console.log("COUNT", arrWorkers.length);
  console.time("Total_calc");

  Object.keys(allSymbolsBars).forEach((symbol_bars, index) => {
    let startPartNumber = index * arrParams.length;

    if (!results[symbol_bars]) {
      results[symbol_bars] = [];
    }

    if (!resultsPartials[symbol_bars]) {
      resultsPartials[symbol_bars] = [];
    }

    console.log("CONFIG_SETTINGS", settings.dataSettings.slice_ranges);

    arrWorkers.forEach((arr, arrIndex) => {
      let worker = new Worker("./webworker_calculate.js", {
        workerData: {
          arr,
          alias,
          configSettings,
          symbol_bars,
          symbol_bars_data: allSymbolsBars[symbol_bars],
          orderCall: settings.configSettings.orderCall,
          enableSLbyReversal: settings.configSettings.enableSLbyReversal,
          disabledCriterias,
          slice_ranges: settings.dataSettings.slice_ranges,
        },
      });

      worker.once("message", (result) => {
        // TODO COMMENT AFTER
        // resultsPartials[symbol_bars] = [];
        // results[symbol_bars] = [];

        // push
        // if arr.length == arrParams => send

        let totalWorkers =
          arrWorkers.length * Object.keys(allSymbolsBars).length;

        //console.log("RESULT_PERC", loadedPeercentages);

        counter++;

        let loadedPeercentages = (counter / totalWorkers) * 100;

        sendWebsocket(WEBSOCKET, { result });

        // TODO CHECK
        sendWebsocket(WEBSOCKET, loadedPeercentages);

        results[symbol_bars].push(result.result);
        resultsPartials[symbol_bars].push(result.partialResult);
        console.log(
          "TOTAL Workers",
          arrWorkers.length * Object.keys(allSymbolsBars).length,
          counter,
          result.deltaSeconds
        );

        if (arrWorkers.length * Object.keys(allSymbolsBars).length <= counter) {
          Object.keys(results).forEach((result) => {
            let result_temp = [];
            results[result].forEach((el) => {
              result_temp = result_temp.concat(el);
            });
            results[result] = result_temp;
          });

          Object.keys(resultsPartials).forEach((result) => {
            let result_temp = [];
            resultsPartials[result].forEach((el) => {
              result_temp = result_temp.concat(el);
            });
            resultsPartials[result] = result_temp;
          });

          res.json({
            results,
            partialResult: resultsPartials,
            partialRange: result.partialRange,
          });

          console.timeEnd("Total_calc");
          console.log(
            "RESULTS:",
            Object.keys(results),
            Object.values(results).length
          );
          //       console.timeEnd(`CALC_${symbol_bars}`);
        }
        console.log(`Worker : `, counter);
      });
    });
  });
});

app.get("/available_dates", (req, res) => {
  let symbols = ["AAPL", "AMZN", "ES", "GOOGL", "MSFT", "NQ", "NVDA", "TSLA"];
  let timeframes = ["1H", "4H", "1D", "1W", "1M", "1min", "3min", "5min"];
  let available_dates = {};
  symbols.forEach((symbol) => {
    if (!available_dates[symbol]) {
      available_dates[symbol] = {};
    }
    timeframes.forEach((tf) => {
      if (!available_dates[symbol][tf]) {
        available_dates[symbol][tf] = { from: null, to: null };
      }
      let path = `./assets/JSON/${symbol}/${symbol}, ${tf}.json`;
      let bars_data = require(path);

      //2018-01-01
      let start_time = new Date(Number(bars_data[0].time + "000"));
      let end_time = new Date(
        Number(bars_data[bars_data.length - 1].time + "000")
      );

      function parseDateStr(date) {
        let year = String(date.getFullYear());
        let month = String(date.getMonth() + 1);
        month = month.length == 1 ? "0" + month : month;
        let day = String(date.getDate());
        day = day.length == 1 ? "0" + day : day;

        return `${year}-${month}-${day}`;
      }

      available_dates[symbol][tf].from = parseDateStr(start_time);
      available_dates[symbol][tf].to = parseDateStr(end_time);
    });
  });
  res.json(available_dates);
});

function buildParams(params) {
  let inputObj = params || {
    var1: [2, 3, 4, 5, 6, 7, 8],
    var2: [2, 3, 4, 5, 6, 7, 8],
    var3: [2, 3, 4, 5, 6, 7, 8],
    var4: [2, 3, 4, 5, 6, 7, 8],
  };

  // let var1 = [2,3,4,5,6,7,8]
  // let var2 = [2, 3, 4, 5, 6, 7, 8]
  // let var3 = [2, 3, 4, 5, 6, 7, 8]
  // let var4 = [2, 3, 4, 5, 6, 7, 8]
  let arrTotal = [];
  Object.keys(inputObj).forEach((key) => {
    arrTotal.push(inputObj[key]);
  });

  //console.log("ARR_TOTAL", arrTotal);

  let fillAlias = (arrOfArray) => {
    let resultArr = [];
    let alias = {};
    arrOfArray.forEach((arr, indexOutter) => {
      arr.forEach((el, indexInner) => {
        resultArr.push(`index${indexOutter}_${indexInner}`);
        alias[`index${indexOutter}_${indexInner}`] = el;
      });
    });
    return { resultArr, alias };
  };

  let arrFull = fillAlias(arrTotal);
  //console.log("ARRAY_FULL", arrFull);
  let arr = arrFull.resultArr;
  let alias = arrFull.alias;

  let modify = (originalArr, variables) => {
    let resultZboubNew = originalArr.map((el) =>
      el.slice(0, variables).join("AAA")
    );
    let resultNew = Array.from(new Set(resultZboubNew)).map((el) =>
      el.split("AAA")
    );
    resultNew = resultNew.filter((el, indexOutter) => {
      let isValid = 0;
      el.forEach((elInner, index) => {
        if (elInner.includes("index" + index)) {
          isValid++;
        }
      });
      return el.length == isValid;
    });
    return resultNew;
  };

  const permutator = (inputArr, variable) => {
    let result = [];
    const permute = (arr, m = []) => {
      if (arr.length === 0 || m.length == variable) {
        result.push(m);
      } else {
        for (let i = 0; i < arr.length; i++) {
          let curr = arr.slice();
          let next = curr.splice(i, 1);
          // TODO TEST
          let isValid = 0;
          m.forEach((elInner, index) => {
            if (elInner.includes("index" + index)) {
              isValid++;
            }
          });
          if (!m[0] || (isValid == m.length && m.length <= variable))
            permute(curr.slice(), m.concat(next));
        }
      }
    };

    permute(inputArr);
    return result;
  };

  let result = permutator(arr, arrTotal.length);
  // MODIFIED RESULT
  let resultModified = modify(result, arrTotal.length);
  // console.log("MODIFIED_RESULT", resultModified);

  // FINAL RESULT AND TRANSLATED
  // resultModified.forEach((arr, index) => {
  //   if (index < 10) {
  //     let worker = new Worker("exampleWorker.js", { type: "module" });
  //     let arrTranslated = arr.map((el) => alias[el]);
  //     console.log("ARR_TRANSLAED", arrTranslated);
  //     worker.postMessage(arrTranslated);

  //     worker.onmessage = function (event) {
  //       console.log("RESULT WEB WORKER", event.data);
  //     };
  //   }

  //   // call webworker  and set varaibles
  // });

  // ADD WEBWorkers

  return { resultModified, alias };
}

// CONNECTION WEBSOKET
const server = http.createServer(app);

server.listen(4020, () => {
  console.log(`Server started on port ${server.address().port} :)`);
});

const wss = new WebSocket.Server({ server });
let WEBSOCKET = undefined;

wss.on("connection", (ws) => {
  console.log("CONNECTED_NEW");
  ws.send(`Hello, you sent -> `);
  //connection is up, let's add a simple simple event
  ws.on("message", (message) => {
    //log the received message and send it back to the client
    console.log("received: %s", message);
    ws.send(`Hello, you sent -> ${message}`);
  });

  WEBSOCKET = ws;
  //send immediatly a feedback to the incoming connection
  setTimeout(() => {
    ws.send("Hi there, I am a WebSocket server");
  }, 2000);
});

// setTimeout(() => {
//   sendWebsocket(WEBSOCKET, "HELOOO");
// }, 5000);

// func async count ()
// delete first for eech
