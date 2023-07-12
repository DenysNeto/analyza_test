import { parentPort, workerData } from "worker_threads";
import calculateProfit from "./calculateProfit.js";
import UtilsManager from "./utils/utils.js";

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

let result_arr = [];
let partialResult = {};
let partialRange = undefined;
let startTime = new Date().getTime();
const timeframe = workerData.symbol_bars_data[0].timeframe;
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
// TODO START HERE
let allIndexes = {};
for (let arrIndexQQ = 0; arrIndexQQ < workerData.arr.length; arrIndexQQ++) {
  let arr = workerData.arr[arrIndexQQ];
  console.log(
    "AAA",
    new Date().getTime(),
    workerData.indexWorker,
    arrIndexQQ,
    workerData.arr.length
  );
  // build array by 50
  let divisions = {};

  let keySet = "";
  arr.forEach((el) => (keySet += el.split("_")[1]));

  allIndexes[keySet] = {
    [timeframe]: {},
  };

  // if (workerData.slice_ranges) {
  //   if (workerData.slice_ranges == "1M") {
  // newArray = UtilsManager.splitMonth(workerData.symbol_bars_data);
  //   } else if (workerData.slice_ranges == "1D") {
  //     newArray = UtilsManager.splitDay(workerData.symbol_bars_data);
  //   } else if (workerData.slice_ranges == "1W") {
  //     newArray = UtilsManager.splitWeek(workerData.symbol_bars_data);
  //   } else if (workerData.slice_ranges == "1H") {
  //     newArray = UtilsManager.splitHour(workerData.symbol_bars_data);
  //   }
  // }

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

  // DIVIDED ARRAY

  Object.entries(divisions).forEach(([key, value], i) => {
    partialResult[key] = [];
    value.forEach((el, index) => {
      if (!partialResult[key]) partialResult[key] = [];

      if (
        !allIndexes[keySet] ||
        !allIndexes[keySet][timeframe] ||
        !allIndexes[keySet][timeframe][key]
      ) {
        allIndexes[keySet][timeframe] = {
          ...allIndexes[keySet][timeframe],
          [key]: [],
        };
      }

      allIndexes[keySet][timeframe][key].push({
        keyTimeframe: key,
        id: index + 1,
        result: buildResult(
          arr,
          workerData.alias,
          workerData.configSettings,
          workerData.symbol_bars,
          el,
          workerData.orderCall,
          workerData.disabledCriterias,
          workerData.enableSLbyReversal
        ),
      });

      // EEE

      //   partialResult[key].push({
      //     keyTimeframe : key,
      //     id: index + 1,
      //     result: buildResult(
      //       arr,
      //       workerData.alias,
      //       workerData.configSettings,
      //       workerData.symbol_bars,
      //       el,
      //       workerData.orderCall,
      //       workerData.disabledCriterias,
      //       workerData.enableSLbyReversal
      //     ),
      //   });
    });
  });

  // SET PARTIAL RANGE
  partialRange = Object.keys(divisions).length;

  // TODO UNCOMMENT
  result_arr.push(
    buildResult(
      arr,
      workerData.alias,
      workerData.configSettings,
      workerData.symbol_bars,
      workerData.symbol_bars_data,
      workerData.orderCall,
      workerData.disabledCriterias,
      workerData.enableSLbyReversal
    )
  );
}

let finishTime = new Date().getTime();
let deltaSeconds = (finishTime - startTime) / 100;

parentPort.postMessage({
  allIndexes,
  result: result_arr,
  partialResult,
  partialRange,
  deltaSeconds: deltaSeconds,
});
