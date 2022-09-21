<template>
  <div class="page-home_xian">
    <div class="xian_block_bac">
      <img src="@/assets/home/top3.png" alt="" />
    </div>
    <div class="xian_title">全县扫码人数统计</div>
    <div class="xian_list" v-if="xianList && isShow">
      <div class="xian_item">
        <h4 style="color: #ffdb0c">
          <animate-number
            from="0"
            :to="xianList.point_scan_num"
            duration="2000"
          ></animate-number>
        </h4>
        <p>执勤卡点扫码人数</p>
      </div>
      <div class="xian_item">
        <h4 style="color: #04d3f3">
          <animate-number
            from="0"
            :to="xianList.common_scan_num"
            duration="2000"
          ></animate-number>
        </h4>
        <p>普通场所扫码人数</p>
      </div>
      <div class="xian_item">
        <h4 style="color: #fe9d36">
          <animate-number
            from="0"
            :to="xianList.today_scan_num"
            duration="1500"
          ></animate-number>
        </h4>
        <p>今日扫码新增人数</p>
      </div>
      <div class="xian_item">
        <h4 style="color: #bb75fc">
          <animate-number
            from="0"
            :to="xianList.exception_scan_num"
            duration="1000"
          ></animate-number>
        </h4>
        <p>全县扫码异常人数</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 全县扫码
      xianList: null,
      isShow: true,
    };
  },
  mounted() {
    this.initXianList();
    setInterval(() => {
      this.isShow = false;
      this.$nextTick(() => {
        this.isShow = true;
      });
      this.initXianList();
    }, 10000);
  },
  methods: {
    // 县级扫码
    async initXianList() {
      let { data } = await this.$api.homeApi.getXianList();
      if (!data) return;
      this.xianList = data;
    },
  },
};
</script>
<style lang="scss">
.page-home_xian {
  position: absolute;
  top: 17%;
  right: 64px;
  width: 420px;
  .xian_block_bac img {
    width: 100%;
  }
  .xian_title {
    position: absolute;
    top: -10px;
    left: 25px;
    font-size: 18px;
  }
  .xian_list {
    position: absolute;
    width: 100%;
    height: 90%;
    top: 23px;
    left: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    .xian_item {
      text-align: center;
      width: 50%;
      p {
        font-size: 14px;
      }
      h4 {
        font-size: 35px;
        color: #fe9d36;
      }
    }
  }
}
</style>
