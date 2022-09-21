<template>
  <div class="page-home_region">
    <div class="region_block_bac">
      <img src="@/assets/home/bottom1.png" alt="" />
    </div>
    <div class="region_title">全国中高风险地区</div>
    <div class="region_list">
      <div class="th">
        <p>省级</p>
        <p>地区</p>
        <p>风险等级</p>
      </div>
      <vue-seamless-scroll :data="regionList" class="warp">
        <ul class="item">
          <li v-for="(item, index) in regionList" :key="index">
            <span>{{ item.province }}</span>
            <span>{{ item.county }}</span>
            <span class="gao" v-if="item.isRisk == 'gao'">高风险</span>
            <span class="zhong" v-if="item.isRisk == 'zhong'">中风险</span>
          </li>
        </ul>
      </vue-seamless-scroll>
    </div>
  </div>
</template>
<script>
import vueSeamlessScroll from "vue-seamless-scroll";
export default {
  data() {
    return {
      option: {
        step: 0.5,
        hoverStop: false,
      },
      // 中高风险地区
      regionList: [],
    };
  },
  mounted() {
    this.initRegionList();
  },
  components: {
    vueSeamlessScroll,
  },
  methods: {
    // 中高风险
    async initRegionList() {
      let { data } = await this.$api.homeApi.getRegionList();
      if (!data) return;
      data.high_list.map((item) => {
        item.isRisk = "gao";
      });
      data.middle_list.map((item) => {
        item.isRisk = "zhong";
      });
      this.regionList = data.high_list.concat(data.middle_list);
    },
  },
};
</script>
<style lang="scss">
.page-home_region {
  position: absolute;
  top: 54%;
  left: 64px;
  width: 420px;
  .region_block_bac img {
    width: 100%;
  }
  .region_title {
    position: absolute;
    top: 16px;
    left: 40px;
    font-size: 18px;
  }
  .region_list {
    width: 95%;
    position: absolute;
    // width: 100%;
    // left: -20px;
    left: 0;
    top: 40px;
    height: 82%;
    .th {
      margin-top: 25px;
      display: flex;
      text-align: center;
      padding-bottom: 10px;
      p {
        flex: 1;
        font-size: 16px;
      }
    }
    .warp {
      height: 215px;
      // overflow-y: scroll;
      overflow: hidden;
      ul li {
        display: flex;
        text-align: center;
        span {
          flex: 1;
          font-size: 12px;
        }
        .gao {
          color: red;
        }
        .zhong {
          color: #fe9d36;
        }
        .di {
          color: #41a4ce;
        }
      }
    }
  }
}
</style>
