

import { IDate } from "MyTypes";

const date2pretty = (date) => {
    const cDate = new Date();
    const cYear = cDate.getFullYear();
    const cMonth = cDate.getMonth() + 1;
    const cDay = cDate.getDate();
    const tdate = new Date(date);
    const tYear = tdate.getFullYear();
    const tMonth = tdate.getMonth() + 1;
    const tDay = tdate.getDate();
    const cstr = `${cYear}-${cMonth}-${cDay < 10 ? "0" + cDay : cDay}`;
    const tstr = `${tYear}-${tMonth}-${tDay < 10 ? "0" + tDay : tDay}`;
    if (cstr === tstr) {
      return "今天";
    }
    if (cYear === tYear && cMonth === tMonth) {
      if (cDay > tDay) {
        return {
          1: "昨天",
          2: "前天",
        }[cDay - tDay] || tstr;
      }
      if (tDay > cDay) {
        return {
          1: "明天",
          2: "后天",
        }[tDay - cDay] || tstr;
      }
    }
    return tstr;
}

function addZero(str) {
  if (typeof str === "string") { return str; }
  return str < 10 ? "0" + str : str;
}

function titlePrefix(type: string) {
  return `dida - ${type}`;
}
/**
 * 改变日期
 * left -> 前移
 * right -> 后移
*/
function moveDate(time: string | Date, left?: number, right?: number) {
    const date = typeof time === "object" ? time : new Date(time);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let curDate = {
        year, month, day
    };
    if (left) {
      const leftDay = day - left;
      curDate = getCurDate({year, month, day: leftDay})
    } else if (right) {
      curDate = getCurDate({year, month, day}, right)
    }
    return curDate;
}

export function getCurDate(date: IDate, right?: number): IDate {
    let { year, month, day } = date;
    let curDayLen = new Date(date.year, date.month, 0).getDate();
    if (day < 0) {
      date.month = month - 1;
      date = getNewDate(date);
      curDayLen = new Date(date.year, date.month, 0).getDate();
      if (Math.abs(day) > curDayLen) {
          return getCurDate({
            year,
            month: month - 1,
            day: day + curDayLen,
          });
      } else {
        return {
            year,
            month: date.month,
            day: curDayLen + day
        };
      }
    } else if (right) {
      const rightDay = day + right;
      if (rightDay > curDayLen) {
          date.month = month + 1;
          right = right - (curDayLen - day) - 1;
          date.day = 1;
          date = getNewDate(date);
          return getCurDate({
            ...date,
          }, right);
      }
      return {
          year,
          month,
          day: rightDay
      };
    }
    return {
        year,
        month,
        day
    };
}

function getNewDate(date: IDate) {
    let { year, month } = date;
    // 根据月，日期优先进行还原
    if (month <= 0) {
      month = 12;
      year = year - 1;
    } else if (month > 12) {
      month = 1;
      year = year + 1;
    }
    return {
        year, month, day: date.day
    };
}
export {
    date2pretty,
    addZero,
    titlePrefix,
    getNewDate,
    moveDate
}