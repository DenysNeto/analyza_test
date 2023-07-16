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
  // "1min",
  // "3min",
  // "5min",
  // "1H",
  // "4H",
  "1D",
  "1W",
  "1M",
];
// TODO START HERE

//let allIndexes = {};s
let partCounter = 0;
let partQnt = 100;

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
do {
  try {
    let allIndexes = {};
    let current_arr = arr_data.slice(0, pointer);
    async.forEachOf(current_arr, (arr, arrIndex) => {
      //let arr = current_arr[arrIndex];

      let keySet = "";
      arr.forEach((el) => (keySet += el.split("_")[1]));
      allIndexes[keySet] = {
        [timeframe]: {},
      };

      // DIVIDED ARRAY
      for (let key in divisions) {
        let value = divisions[key];
        // console.log("DIVISION", key, value.length);
        partialResult[key] = [];
        async.forEachOf(value, (el, index) => {
          // let el = value[index];
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
        });
      }
    });

    arr_data.splice(0, pointer);
    //console.log("WORKER_DATA_ARR", workerData.arr.length);
    conclusive_result = { ...conclusive_result, ...allIndexes };
    counter++;

    if (arr_data.length == 0) {
      parentPort.postMessage({
        ...conclusive_result,
      });
      // process.exit()
    }
  } catch (err) {
    console.log("WORKER_ERROR", err);
  }
} while (arr_data.length > 0);

// FINIDH

//for (let arrIndex = 0; arrIndex < workerData.arr.length; arrIndex++)
//console.time("WORKER");
// async.forEachOf(workerData.arr, (arr, arrIndex) => {
//   //  let arr = workerData.arr[arrIndex];

//   // build array by 50
//   let divisions = {};

//   // console.log("EEEE", arr);
//   let keySet = "";
//   arr.forEach((el) => (keySet += el.split("_")[1]));
//   allIndexes[keySet] = {
//     [timeframe]: {},
//   };

//   // DIVIDED ARRAY
//   async.forEachOf(divisions, (value, key) => {
//     // console.log("DIVISION", key, value.length);
//     partialResult[key] = [];
//     async.forEachOf(value, (el, index) => {
//       // let el = value[index];
//       if (!partialResult[key]) partialResult[key] = [];

//       if (
//         !allIndexes[keySet] ||
//         !allIndexes[keySet][timeframe] ||
//         !allIndexes[keySet][timeframe][key]
//       ) {
//         allIndexes[keySet][timeframe] = {
//           ...allIndexes[keySet][timeframe],
//           [key]: [],
//         };
//       }
//       allIndexes[keySet][timeframe][key].push({
//         keyTimeframe: key,
//         id: index + 1,
//         result: buildResult(
//           arr,
//           workerData.alias,
//           workerData.configSettings,
//           workerData.symbol_bars,
//           el,
//           workerData.orderCall,
//           workerData.disabledCriterias,
//           workerData.enableSLbyReversal
//         ),
//       });
//     });
//   });

//   //SEND MESSAGES
//   // if (arrIndex > 0 && arrIndex % partQnt == 0) {
//   //   parentPort.postMessage({
//   //     allIndexes,
//   //   });
//   //   partCounter++;
//   //   result_arr = [];
//   //   allIndexes = {};
//   // } else if (arrIndex + partQnt >= workerData.arr.length) {
//   //   if (arrIndex + 1 == workerData.arr.length) {
//   //     parentPort.postMessage({
//   //       allIndexes,
//   //       finished: true,
//   //     });

//   //  console.timeEnd("WORKER");
//   //}}
// });

// let finishTime = new Date().getTime();
// let deltaSeconds = (finishTime - startTime) / 100;
