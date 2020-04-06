

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

function fixDate(str) {
  if (typeof str === "string") { return str; }
  return str < 10 ? "0" + str : str;
}

function titlePrefix(type: string) {
  return `dida - ${type}`;
}

export {
    date2pretty,
    fixDate,
    titlePrefix
}