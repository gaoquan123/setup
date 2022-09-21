/* eslint-disable */
export const regNumber = /^[1-9]\d*$/;
export const regPhone = /^(1[3-9][0-9])[0-9]{8}$/; // 手机号
// eslint-disable-next-line no-useless-escape
export const regEmail =
  /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
export const regPassword =
  /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{8,20}$/;
export const regdate = /^\d{4}(-|\/|\.)\d{1,2}\1\d{1,2}$/;

/**
 * 判断手机号码是否正确
 * @method isTelephone
 * @param {String}
 * @return {Boolean}
 */
export const isTelephone = (telephone) => {
  return /^(1[3-9][0-9])[0-9]{8}$/.test(telephone);
};

/**
 * 判断邮箱是否正确
 * @method isEmail
 * @param {String}
 * @return {Boolean}
 */
export const isEmail = (email) => {
  return /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(
    email
  );
};

/**
 * 判断身份证是否正确
 * @method isIDCard
 * @param {String}
 * @return {Boolean}
 */
export const isIDCard = (idCard) => {
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idCard);
};

/**
 * 判断地址是否正确
 * @method isStreet
 * @param {String}
 * @return {Boolean}
 */
const REGEX_CHINESE =
  /[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]/;
export const isStreet = (street) => {
  const hasChinese = street.match(REGEX_CHINESE);
  const hasNumber = street.match(/\d+/);
  return hasChinese && hasNumber;
};

/**
 * 对象按照字母abc排序
 * @method isStreet
 */
export const objKeySort = (obj) => {
  let newKey = Object.keys(obj).sort();
  let newObj = {};
  for (let i = 0; i < newKey.length; i++) {
    newObj[newKey[i]] = obj[newKey[i]];
  }
  return newObj;
};

export function utilsFormatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}
// 文字格式换行
export function utilsFormatter(a) {
  var str = a
    // eslint-disable-next-line no-control-regex
    .replace(/[^\x00-\xff]/g, "$&\x01")
    // eslint-disable-next-line no-control-regex
    .replace(/.{1}\x01?/g, "$&\n")
    // eslint-disable-next-line no-control-regex
    .replace(/\x01/g, "");
  return str;
}

export function utilsObjText(index) {
  let obj = {
    1: "勐董镇",
    2: "班老乡",
    3: "班洪乡",
    4: "糯粮乡",
    5: "芒卡镇",
    6: "勐角乡",
    7: "勐来乡",
    8: "勐省镇",
    9: "岩帅镇",
    10: "单甲乡",
    11: "勐省农场",
  };
  return obj[index];
}
