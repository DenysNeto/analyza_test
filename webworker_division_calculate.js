import { parentPort, workerData } from "worker_threads";
import calculateProfit from "./calculateProfit.js";
import UtilsManager from "./utils/utils.js";
import async from "async";

function buildResult(
  arr,
  alias,
  configSettings,
  symbol_bars,
  symbol_bars_data,
  orderCall,
  disabledCriterias,
  enableSLbyReversal
) {
  let arrTranslated = arr.map((el) => alias[el]);
  let obj = {};

  Object.keys(configSettings).forEach((key, index) => {
    obj[key] = arrTranslated[index];
  });

  if (disabledCriterias.length) {
    disabledCriterias.forEach((elInner) => {
      obj[elInner] = 0;
    });
  }

  // TODO UNCOMMENT
  obj = {
    ...obj,
    orderCall: orderCall,
    enableSLbyReversal,
    bars: symbol_bars_data,
  };
  // console.log("OBJ", obj);
  return calculateProfit(obj);
}

// console.log("WEBWORKER", workerData.alias);
let result_arr = [];
let partialResult = {};
let partialRange = undefined;
let startTime = new Date().getTime();
const timeframe = workerData.symbol_bars_data[0].timeframe; // ;
const avaliable_slice_ranges = [
  "1min",
  "3min",
  "5min",
  "1H",
  "4H",
  "1D",
  "1W",
  "1M",
];

const fileds_output = [
  "profit",
  "barsClose",
  "barsCloseReversal",
  "barsIgnore",
  "barsIgnoreClose",
  "profitPercantage",
  "lossPercantage",
];

// START

//divisions
let divisions = {};
try {
  let tf_range_index = avaliable_slice_ranges.findIndex((el) => {
    return el == timeframe;
  });
  let arr_slice_ranges = avaliable_slice_ranges.slice(tf_range_index + 1);
  arr_slice_ranges.forEach((range) => {
    if (range == "1M") {
      divisions[range] = UtilsManager.splitMonth(workerData.symbol_bars_data);
    } else if (range == "1D") {
      divisions[range] = UtilsManager.splitDay(workerData.symbol_bars_data);
    } else if (range == "1W") {
      divisions[range] = UtilsManager.splitWeek(workerData.symbol_bars_data);
    } else if (range == "1H") {
      divisions[range] = UtilsManager.splitHour(workerData.symbol_bars_data);
    }
  });
} catch (err) {
  console.log("WORKER_DIVISION_ERROR", err);
}

let counter = 0;
let pointer = 10;
let arr_data = [...workerData.arr];
let conclusive_result = {};
let allIndexes = {};
do {
  try {
    let current_arr = arr_data.slice(0, pointer);
    async.forEachOf(current_arr, (arr, arrIndex) => {
      let conclusive_obj = {};
      //let arr = current_arr[arrIndex];
      // DIVIDED ARRAY
      for (let key in divisions) {
        if (!conclusive_obj[key]) {
          conclusive_obj[key] = [];
        }

        let value = divisions[key];
        // console.log("DIVISION", key, value.length);
        partialResult[key] = [];
        async.forEachOf(value, (el, index) => {
          // let el = value[index];
          if (!partialResult[key]) partialResult[key] = [];

          let calc_result = buildResult(
            arr,
            workerData.alias,
            workerData.configSettings,
            workerData.symbol_bars,
            el,
            workerData.orderCall,
            workerData.disabledCriterias,
            workerData.enableSLbyReversal
          );
          Object.keys(calc_result).forEach((key) => {
            if (!fileds_output.includes(key)) delete calc_result[key];
          });

          conclusive_obj[key].push({ ...calc_result });
        });

        // if (!allIndexes[timeframe]) {
        //   allIndexes[timeframe] = {};
        // }
        if (!allIndexes[key]) {
          allIndexes[key] = [];
        }

        let output_fields = { ...conclusive_obj[key][0] };
        delete output_fields["profit"];
        let arr_profits = conclusive_obj[key].map((el) => el.profit);
        let output_profit = arr_profits.reduce(function (a, b) {
          return a + b;
        }, 0);

        allIndexes[key].push({
          totalProfit: output_profit,
          ...output_fields,
        });
      }
    });

    arr_data.splice(0, pointer);
    //console.log("WORKER_DATA_ARR", workerData.arr.length);
    counter++;
  } catch (err) {
    console.log("WORKER_ERROR", err);
  }
} while (arr_data.length > 0);

parentPort.postMessage({
  ...allIndexes,
});
