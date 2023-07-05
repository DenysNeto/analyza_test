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
  return calculateProfit(obj);
}

let result_arr = [];
let partialResult = [];
let partialRange = undefined;
let startTime = new Date().getTime();

// TODO START HERE
workerData.arr.forEach((arr, arrIndex) => {
  // build array by 50
  let newArray = [];

  // TODO EXAMPLE DIVIDER BY BLOCKS
  // let divider = 50;
  // let index = true;
  // while (index) {
  //   let startIndex = newArray.length; //
  //   let arrayEl = workerData.symbol_bars_data.slice(
  //     startIndex * divider,
  //     startIndex * divider + divider
  //   );
  //   if (arrayEl.length == divider) {
  //     newArray.push(arrayEl);
  //   } else {
  //     index = false;
  //   }
  // }

  console.log("BARS_LENGTH", workerData.symbol_bars_data.length);
  if (workerData.slice_ranges) {
    if (workerData.slice_ranges == "1M") {
      newArray = UtilsManager.splitMonth(workerData.symbol_bars_data);
    } else if (workerData.slice_ranges == "1D") {
      newArray = UtilsManager.splitDay(workerData.symbol_bars_data);
    } else if (workerData.slice_ranges == "1W") {
      newArray = UtilsManager.splitWeek([...workerData.symbol_bars_data]);
    } else if (workerData.slice_ranges == "1H") {
      newArray = UtilsManager.splitHour(workerData.symbol_bars_data);
    }
  }

  // DIVIDED ARRAY

  newArray.forEach((el, index) => {
    partialResult.push({
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

  // SET PARTIAL RANGE
  partialRange = newArray.length;

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
});

let finishTime = new Date().getTime();
let deltaSeconds = (finishTime - startTime) / 100;

parentPort.postMessage({
  result: result_arr,
  partialResult,
  partialRange,
  deltaSeconds: deltaSeconds,
});
