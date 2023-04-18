import Taro from "@tarojs/taro";

// 计算目标日期距离当天日期间隔几天，返回结果为负数，即：过去的几天
function diffDate(_date = "2022-02-08") {
  // 给日期类对象添加日期差方法，返回日期与diff参数日期的时间差，单位为天
  Date.prototype.diff = function (_date) {
    return (this.getTime() - date.getTime()) / (24 * 60 * 60 * 1000);
  };
  // 构造两个日期
  const now = new Date(_date);
  //也可以不要后面的时间如：2015/01/01
  const date = new Date();
  // 调用日期差方搜索法，求得参数日期与系统时间相差的天数
  const diff = now.diff(date);
  // 输出日期差
  return Math.ceil(diff).toString().replace("-", "");
}

//传入日期是周几，计算当前日期是周几
function getWeek(date) {
  // 完整代码加测试代码如下，你根据实际需要改动下就OK了。
  const dt = new Date(date);
  const weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  return weekDay[dt.getDay()];
}

//格式化日期
function formatDate(date) {
  // 完整代码加测试代码如下，你根据实际需要改动下就OK了。
  const dt = new Date(date);
  const weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  return weekDay[dt.getDay()];
}

//获取当前时区的年、月、日、时、分、秒
const getCurrentTime = () => {
  let _time = new Date();
  let y = String(_time.getFullYear());
  let m = String(
    _time.getMonth() + 1 < 10
      ? "0" + (_time.getMonth() + 1)
      : _time.getMonth() + 1
  );
  let d = String(
    _time.getDate() < 10 ? "0" + _time.getDate() : _time.getDate()
  );
  let hh = String(
    _time.getHours() < 10 ? "0" + _time.getHours() : _time.getHours()
  );
  let mm = String(
    _time.getMinutes() < 10 ? "0" + _time.getMinutes() : _time.getMinutes()
  );
  let ss = String(
    _time.getSeconds() < 10 ? "0" + _time.getSeconds() : _time.getSeconds()
  );
  return { y, m, d, hh, mm, ss };
};

function getTs(time) {
  const timeStr = Date.parse(time);
  return timeStr;
}
//
function handlePublishTimeDesc(post_modified) {
  // 拿到当前时间戳和发布时的时间戳，然后得出时间戳差
  var curTime = new Date();
  var postTime = new Date(post_modified); //部分浏览器不兼容此转换建议所以对此进行补充（指定调用自己定义的函数进行生成发布时间的时间戳）

  //var timeDiff = curTime.getTime() - postTime.getTime();
  //上面一行代码可以换成以下（兼容性的解决）
  var timeDiff = curTime.getTime() - getTs(post_modified);

  // 单位换算
  var min = 60 * 1000;
  var hour = min * 60;
  var day = hour * 24;
  var week = day * 7;
  var month = week * 4;
  var year = month * 12;

  // 计算发布时间距离当前时间的周、天、时、分
  var exceedyear = Math.floor(timeDiff / year);
  var exceedmonth = Math.floor(timeDiff / month);
  var exceedWeek = Math.floor(timeDiff / week);
  var exceedDay = Math.floor(timeDiff / day);
  var exceedHour = Math.floor(timeDiff / hour);
  var exceedMin = Math.floor(timeDiff / min);

  // 最后判断时间差到底是属于哪个区间，然后return

  if (exceedyear < 100 && exceedyear > 0) {
    return exceedyear + "年前";
  } else {
    if (exceedmonth < 12 && exceedmonth > 0) {
      return exceedmonth + "月前";
    } else {
      if (exceedWeek < 4 && exceedWeek > 0) {
        return exceedWeek + "星期前";
      } else {
        if (exceedDay < 7 && exceedDay > 0) {
          return exceedDay + "天前";
        } else {
          if (exceedHour < 24 && exceedHour > 0) {
            return exceedHour + "小时前";
          } else {
            return exceedMin + "分钟前";
          }
        }
      }
    }
  }
}

/**
 * 把json对象拆成url参数格式的方法
 * @data 需要处理的json对象
 */
const getParam = (data: any) => {
  let url = "";
  for (const k in data) {
    const value = data[k] !== undefined ? data[k] : "";
    // url += `&${k}=${encodeURIComponent(value)}`;
    url += `&${k}=${value}`;
  }
  return url ? url.substring(1) : "";
};
/**
 * //获取带参数的url方法 将参数拼到url后面
 * @param url  url;
 * @param data 参数
 * @returns  拼接后的url
 */
const urlEncode = (url: string, data: any) => {
  //看原始url地址中开头是否带?，然后拼接处理好的参数
  return (url += (url.indexOf("?") < 0 ? "?" : "") + getParam(data));
};

/**
 * 获取股票开盘时间
 * @returns
 */
async function getLatestUpdateTime() {
  const now = new Date();
  const today = now.toLocaleDateString("zh-CN", { timeZone: "Asia/Shanghai" });

  // 判断今天是否是工作日
  const isWorkday = await isWorkdayInChina(today);
  if (isWorkday) {
    // 如果今天是工作日，判断当前时间是否在开盘时间内，如果是，返回当前时间，否则返回最近一次的收盘时间
    const openTime = new Date(`${today} 09:30:00`);
    const closeTime = new Date(`${today} 15:00:00`);
    if (now >= openTime && now <= closeTime) {
      return now.toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" });
    } else {
      return closeTime.toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" });
    }
  } else {
    // 如果今天是节假日，计算最近一次的收盘时间
    const lastCloseTime = new Date(`${today} 15:00:00`);
    if (now < lastCloseTime) {
      lastCloseTime.setDate(lastCloseTime.getDate() - 1);
    }

    // 增加计数器和循环次数阈值
    let count = 0;
    const maxCount = 10;

    while (
      (await isWorkdayInChina(
        lastCloseTime.toLocaleDateString("zh-CN", { timeZone: "Asia/Shanghai" })
      )) === false
    ) {
      lastCloseTime.setDate(lastCloseTime.getDate() - 1);
      count++;
      if (count >= maxCount) {
        throw new Error("无法计算最近一次的收盘时间");
      }
    }
    return lastCloseTime.toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" });
  }
}

async function isWorkdayInChina(dateStr) {
  const url = `https://timor.tech/api/holiday/info/${dateStr.replace(
    /\//g,
    "-"
  )}`;
  const result = await Taro.request({ url }).then((response) => response.data);
  if (result.code === 0) {
    // 0 代表成功，1 代表失败
    return result.type.type === 0;
  } else {
    console.error(result.msg);
    throw new Error(result.msg);
  }
}
export {
  diffDate,
  getCurrentTime,
  getWeek,
  formatDate,
  handlePublishTimeDesc,
  urlEncode,
  getLatestUpdateTime,
};
