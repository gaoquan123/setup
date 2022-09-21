<template>
  <div class="page-home">
    <div class="page-home_bac">
      <img src="../assets/home/home-bac.jpg" alt="" />
    </div>
    <!-- 头部 -->
    <div class="page-home_header">
      <p class="name">沧源佤族自治县</p>
      <p class="title">沧源佤族自治县疫情防控一张图</p>
      <p class="date">
        {{ rightDate }}
        <!-- <img src="../assets/home/open-icon.png" alt="" srcset="" /> -->
        <!-- <span class="block">
          <span class="demonstration">默认</span>
          <el-date-picker
            v-model="rightDate"
            type="date"
            placeholder="选择日期"
            @change="bindChange"
          >
          </el-date-picker> -->
        <!-- </span> -->
      </p>
    </div>
    <HomeBlock1></HomeBlock1>
    <!-- 报表2 -->
    <div class="page-home_map">
      <div class="map_block_header">
        <img src="@/assets/home/top2.png" alt="" />
      </div>
      <div class="swiper_box">
        <!--swiper组件-->
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item, index) in 11" :key="index">
              <img :src="require(`@/assets/home/map${item}.png`)" alt="" />
            </div>
          </div>
          <!-- 如果需要导航按钮 -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
      </div>
    </div>
    <!-- 报表3 -->
    <HomeBlock3></HomeBlock3>
    <!-- 报表4 -->
    <HomeBlock4></HomeBlock4>
    <!-- 报表5 -->
    <div class="page-home_record">
      <div class="record_block_bac">
        <img src="@/assets/home/bottom2.png" alt="" />
      </div>
      <div class="record_title">{{ recordText }}上报记录</div>
      <a class="link" href="#"></a>
      <div id="map_box" class="map_box"></div>
    </div>
    <!-- 报表6 -->
    <HomeBlock6></HomeBlock6>
  </div>
</template>
<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import { utilsFormatDate, utilsFormatter, utilsObjText } from "../utils/index";
import HomeBlock1 from "@/components/home/HomeBlock1";
import HomeBlock6 from "@/components/home/HomeBlock6";
import HomeBlock3 from "@/components/home/HomeBlock3";
import HomeBlock4 from "@/components/home/HomeBlock4";

let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/bar"); //柱状图
export default {
  name: "home",
  data() {
    return {
      // isShowBlock: true,
      // 时间
      rightDate: "",
      // 轮播图ID
      swiperId: 1,
      // 图形数据
      xAxisArr: [],
      yAxisArr: [],
      // 上报记录
      recordText: "",
    };
  },
  components: {
    HomeBlock1,
    HomeBlock6,
    HomeBlock3,
    HomeBlock4,
  },
  mounted() {
    // block2
    this.initSwiper();
    // block5
    this.bindChange();
  },
  methods: {
    // 乡镇上报
    async initRecordList() {
      let params = {
        town_Id: this.swiperId,
        // date: this.rightDate,
      };
      let { data } = await this.$api.homeApi.getRecordList(params);
      this.xAxisArr = [];
      let xArr = Object.keys(data);
      this.yAxisArr = Object.values(data);
      xArr.map((item) => {
        this.xAxisArr.push(utilsFormatter(item));
      });
      this.setMap();
    },
    // 时间初始化
    bindChange(data) {
      let date = data == null ? new Date() : new Date(data);
      this.rightDate = utilsFormatDate(date, "yyyy-MM-dd");
    },
    // 地图初始化
    setMap() {
      let self = this;
      var mapChart = echarts.init(document.getElementById("map_box"));
      mapChart.setOption({
        color: ["#F3E731"],
        xAxis: {
          type: "category",
          data: self.xAxisArr,
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            // show: false,
            lineStyle: {
              color: "#999",
            },
          },
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: false,
          },
          axisLine: {
            // show: false,
            lineStyle: {
              color: "#999",
            },
          },
        },
        series: [
          {
            barWidth: 8,
            label: {
              show: true,
              position: "top",
              // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              //   {
              //     color: "#3db0fe",
              //   },
              //   {
              //     color: "#0a81d4",
              //   },
              // ]),
              textStyle: {
                fontSize: "12",
                color: "#fff",
              },
            },
            data: self.yAxisArr,
            type: "bar",
          },
        ],
      });
    },
    // 轮播图初始化
    initSwiper() {
      let self = this;
      new Swiper(".swiper-container", {
        nextButton: ".swiper-button-next",
        prevButton: ".swiper-button-prev",
        slidesPerView: 1,
        autoplayDisableOnInteraction: false,
        spaceBetween: 30,
        loop: true,
        autoplay: 2000,
        onSlideChangeEnd: function (swiper) {
          self.swiperId = swiper.activeIndex == 12 ? 1 : swiper.activeIndex;
          self.recordText = utilsObjText(self.swiperId);
          self.initRecordList();
        },
      });
    },
  },
};
</script>
<style lang="scss">
.page-home {
  position: relative;
  .page-home_bac img {
    width: 100%;
  }
  // 头部
  .page-home_header {
    position: absolute;
    top: 3.5%;
    color: #fff;
    width: 96%;
    display: flex;
    height: 7%;
    left: 2%;
    align-items: center;
    justify-content: center;
    align-items: center;
    p {
      flex: 1 1 33.33%;
      color: #00ccd7;
    }
    .name {
      font-size: 18px;
      padding-left: 35px;
      width: 100px;
    }
    .title {
      font-size: 30px;
      text-align: center;
    }
    .date {
      padding-right: 26px;
      text-align: right;
      width: 100px;
      font-size: 16px;
      position: relative;
      img {
        position: relative;
        top: 2px;
        width: 16px;
        height: 16px;
        left: -2px;
      }
      .block {
        position: absolute;
        right: 90px;
        top: -30px;
        width: 50px;
        .demonstration {
          opacity: 0;
        }
        .el-input {
          width: 120px;
        }

        .el-input__inner {
          width: 120px;
          padding: 0 !important;
        }
        .el-input__suffix {
          display: none;
        }
        .el-date-editor {
          opacity: 0;
        }
      }
    }
  }
  // 报表2
  .page-home_map {
    position: absolute;
    top: 16.5%;
    left: 35.5%;
    width: 420px;
    .map_block_header img {
      width: 100%;
    }
    .swiper_box {
      width: 100%;
      position: absolute;
      top: -25%;
      .swiper-container {
        width: 100%;
        .swiper-slide img {
          width: 100%;
        }
        .swiper-button-prev,
        .swiper-button-next {
          // width: 30px;
          background-size: 15px;
        }
      }
    }
  }
  // 报表5
  .page-home_record {
    position: absolute;
    top: 54%;
    left: 35.5%;
    width: 420px;
    .record_block_bac img {
      width: 100%;
    }
    .record_title {
      position: absolute;
      top: 16px;
      left: 50px;
      font-size: 18px;
    }
    .link {
      position: absolute;
      top: 16px;
      right: 30px;
      width: 50px;
      font-size: 18px;
      width: 50px;
      height: 30px;
      opacity: 0;
      cursor: pointer;
      z-index: 99;
    }
    .map_box {
      position: absolute;
      top: 10%;
      width: 100%;
      left: 15px;
      height: 300px;
      canvas {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
