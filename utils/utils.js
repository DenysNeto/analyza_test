export default {
  splitMonth: (arr) => {
    let ranges = [];
    let currMonth = -1;
    arr.forEach((el) => {
      let month = new Date(Number(el.time + "000")).getMonth();
      if (currMonth == -1) {
        currMonth = month;
        ranges[0] = [];
        ranges[0].push(el);
      } else if (currMonth == month) {
        ranges[ranges.length - 1].push(el);
      } else {
        ranges.push([]);
        ranges[ranges.length - 1].push(el);
        currMonth = month;
      }
    });
    return ranges;
  },

  splitWeek: (arr) => {
    let currDay = -1;
    let ranges = [];
    arr.forEach((el) => {
      let day = new Date(Number(el.time + "000")).getDay();
      if (currDay == -1) {
        currDay = day;
        ranges[0] = [];
        ranges[0].push(el);
      } else if (currDay < day) {
        currDay = day;
        ranges[ranges.length - 1].push(el);
      } else {
        ranges.push([]);
        ranges[ranges.length - 1].push(el);
        currDay = day;
      }
    });
    return ranges;
  },

  splitDay: (arr) => {
    let ranges = [];
    let currDay = -1;
    arr.forEach((el) => {
      let day = new Date(Number(el.time + "000")).getDate();
      if (currDay == -1) {
        currDay = day;
        ranges[0] = [];
        ranges[0].push(el);
      } else if (currDay == day) {
        ranges[ranges.length - 1].push(el);
      } else {
        ranges.push([]);
        ranges[ranges.length - 1].push(el);
        currDay = day;
      }
    });
    return ranges;
  },

  splitHour: (arr) => {
    let ranges = [];
    let currDay = -1;
    arr.forEach((el) => {
      let day = new Date(Number(el.time + "000")).getHours();
      if (currDay == -1) {
        currDay = day;
        ranges[0] = [];
        ranges[0].push(el);
      } else if (currDay == day) {
        ranges[ranges.length - 1].push(el);
      } else {
        ranges.push([]);
        ranges[ranges.length - 1].push(el);
        currDay = day;
      }
    });
    return ranges;
  },
};
