<template>
  <div class="page-home_total">
    <div class="county_block_bac">
      <img src="@/assets/home/top1.png" alt="" />
    </div>
    <div class="total_title">全国防疫情况统计</div>
    <div class="total_list" v-if="chinaTotal && isShow">
      <div class="total_item">
        <h4 style="color: #ffdb0c">
          <animate-number
            from="0"
            :to="chinaTotal.total.confirm"
            duration="2000"
          ></animate-number>
        </h4>
        <p>累计确诊人数</p>
      </div>
      <div class="total_item">
        <h4>
          <animate-number
            from="0"
            :to="chinaTotal.total.heal"
            duration="2000"
          ></animate-number>
        </h4>
        <p>累计治愈人数</p>
      </div>
      <div class="total_item">
        <h4>
          <animate-number
            from="0"
            :to="chinaTotal.total.dead"
            duration="2000"
          ></animate-number>
        </h4>
        <p>累计死亡人数</p>
      </div>
      <div class="total_item">
        <h4>
          <animate-number
            from="0"
            :to="chinaTotal.today.confirm"
            duration="500"
          ></animate-number>
        </h4>
        <p>较上日新增确诊人数</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 全国统计
      chinaTotal: null,
      isShow: true,
    };
  },
  mounted() {
    this.initCountryTotal();
    setInterval(() => {
      this.isShow = false;
      this.$nextTick(() => {
        this.isShow = true;
      });
      this.initCountryTotal();
    }, 10000);
  },
  methods: {
    // 全国统计接口
    async initCountryTotal() {
      let { data } = await this.$api.homeApi.getCountryTotal();
      if (!data) return;
      this.chinaTotal = data.chinaTotal;
    },
  },
};
</script>
<style lang="scss">
// 报表1
.page-home_total {
  position: absolute;
  top: 17%;
  left: 64px;
  width: 420px;
  .county_block_bac img {
    width: 100%;
  }
  .total_title {
    position: absolute;
    top: 16px;
    left: 40px;
    font-size: 18px;
  }
  .total_list {
    position: absolute;
    width: 100%;
    height: 86%;
    top: 35px;
    left: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    .total_item {
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
