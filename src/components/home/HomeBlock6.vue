<template>
  <div class="page-home_attendance">
    <div class="attendance_block_bac">
      <img src="@/assets/home/bottom3.png" alt="" />
    </div>
    <div class="attendance_title">执勤卡点进出人员统计</div>
    <div class="attendance_list">
      <table>
        <thead>
          <tr>
            <th>乡镇名称</th>
            <th>扫码人数</th>
            <th>异常人数</th>
          </tr>
        </thead>
        <tbody v-if="statisticsList.length > 0 && isShow">
          <tr v-for="(item, index) in statisticsList" :key="index">
            <td>{{ item.townname }}</td>
            <td>{{ item.num }}</td>
            <td>{{ item.exception_num }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 全国统计
      statisticsList: [],
      isShow: true,
    };
  },
  mounted() {
    this.initStatisticsList();
    setInterval(() => {
      this.isShow = false;
      this.$nextTick(() => {
        this.isShow = true;
      });
      this.initStatisticsList();
    }, 10000);
  },
  methods: {
    // 执勤卡点进出人员统计
    async initStatisticsList() {
      let { data } = await this.$api.homeApi.getStatisticsList();
      if (!data) return;
      this.statisticsList = data;
    },
  },
};
</script>
<style lang="scss">
// 报表6
.page-home_attendance {
  position: absolute;
  top: 54%;
  right: 64px;
  width: 420px;
  .attendance_block_bac img {
    width: 100%;
  }
  .attendance_title {
    position: absolute;
    top: 16px;
    left: 40px;
    font-size: 18px;
  }
  .attendance_list {
    position: absolute;
    width: 95%;
    // left: -20px;
    top: 40px;
    height: 82%;
    table {
      width: 100%;
      margin-top: 25px;
      tbody {
        display: block;
        height: 215px;
        overflow-y: scroll;
      }
      thead,
      tbody tr {
        display: table;
        width: 100%;
        table-layout: fixed;
      }
      tr th {
        font-size: 16px;
        padding-bottom: 10px;
      }
      tr td {
        font-size: 12px;
        text-align: center;
      }
    }
  }
}
</style>
