import request from "../utils/request";
// 中高风险地区
const getRegionList = () =>
  request.get("https://cangyuan.yinyuancorgi.com/api/statistics/risk");
// 全国统计接口
const getCountryTotal = () =>
  request.get("https://cangyuan.yinyuancorgi.com/api/statistics/country-total");
// 乡镇数据上报
const getRecordList = (params) =>
  request.get(
    `https://cangyuan.yinyuancorgi.com/api/statistics/town-data?town_id=${params.town_Id}`
  );
// 执勤卡点进出人员统计
const getStatisticsList = () =>
  request.get(`https://cangyuan.yinyuancorgi.com/api/statistics/list`);
// 执勤卡点进出人员统计
const getXianList = () =>
  request.get(`https://cangyuan.yinyuancorgi.com/api/statistics/total`);

export default {
  getRegionList,
  getCountryTotal,
  getRecordList,
  getStatisticsList,
  getXianList,
};
