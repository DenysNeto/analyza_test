window.UtilsManager = {
  divideIntoHours: (arr) => {
    let hours = {};
    arr.forEach((el) => {
      let result = new Date(+(el.timeEnter + "000")).getUTCHours();
      if (hours[result]) {
        hours[result].push(el);
      } else {
        hours[result] = [el];
      }
    });
    return hours;
  },

  divideIntoWeekDays: (arr) => {
    let weekDays = {};
    arr.forEach((el) => {
      let result = new Date(+(el.timeEnter + "000")).getUTCDay();
      if (weekDays[result]) {
        weekDays[result].push(el);
      } else {
        weekDays[result] = [el];
      }
    });
    return weekDays;
  },

  divideIntoMonthDays: (arr) => {
    let monthDays = {};
    arr.forEach((el) => {
      let result = new Date(+(el.timeEnter + "000")).getDate();
      if (monthDays[result]) {
        monthDays[result].push(el);
      } else {
        monthDays[result] = [el];
      }
      return monthDays;
    });
    return monthDays;
  },

  getOccurrence: (array, value) => {
    var count = 0;
    array.forEach((v) => v === value && count++);
    return count;
  },
  maximizeByField: (array, field, direction) => {
    // if direction == "up" => from minimum to maximum
    // if direction == "down" => from  maximum to minimum
    if (direction == "down") {
      return array.sort((a, b) => a[field] - b[field]).reverse();
    } else {
      return array.sort((a, b) => a[field] - b[field]);
    }
  },
};
