<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      sessid: sessionStorage.getItem("sso_sessionid"),
    };
  },

  created() {
    // console.log(this.$store.state.oauser, this.$store.state.oadate);
    // console.log(this.$route.query.username, this.$route.query.formDate);
    var sessid = this.sessid;
    if (sessid == null) {
      sessid = "";
    }
    if (this.$route.query.username && this.$route.query.formDate) {
      var params = {
        username: this.$route.query.username,
        formDate: this.$route.query.formDate,
      };
    } else if (this.$store.state.oauser && this.$store.state.oadate) {
      var params = {
        username: this.$store.state.oauser,
        formDate: this.$store.state.oadate,
      };
    } else {
      var myDate = new Date();
      // console.log(myDate);
      var tYear = myDate.getFullYear();
      var m = myDate.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = myDate.getDate();
      d = d < 10 ? "0" + d : d;
      let date = tYear + "-" + m + "-" + d;
      var arr = date.split("-");
      var year = arr[0]; //获取当前日期的年份
      var month = arr[1]; //获取当前日期的月份
      var day = arr[2]; //获取当前日期的日
      var days = new Date(year, month, 0);
      days = days.getDate(); //获取当前日期中的月的天数
      var year2 = year;
      var month2 = parseInt(month) + 1;
      if (month2 == 13) {
        year2 = parseInt(year2) + 1;
        month2 = 1;
      }
      var day2 = day;
      var days2 = new Date(year2, month2, 0);
      days2 = days2.getDate();
      if (day2 > days2) {
        day2 = days2;
      }

      if (month2 < 10) {
        month2 = "0" + month2;
      }
      var t2 = year2 + "-" + month2;
      var t = year + "-" + month;
      var date2 = year2 + "-" + month2 + "-" + day2;

      var params = {
        username: this.$store.state.userInfo.username,
        formDate: t,
      };
      //本月25号
      var date3 = year + "-" + month + "-" + "24";
      var date4 = year2 + "-" + month2 + "-" + "25";
      var oldDate = this.getPreMonth(date);
      var isDuring = this.isDuringDate(oldDate, date3);
      if (isDuring) {
        // console.log("本月");
        params.formDate = t;
      } else {
        // console.log("下月");
        params.formDate = t2;
      }
    }
    // console.log(this.$router)
    this.api.checkFormUser(sessid, params).then((res) => {
      // console.log(res)
      if (res.data.status == 200) {
        // this.isbuttonpp = true;
        this.$store.commit("getformUserCode", res.data.data.formUserCode);
        if (res.data.data.type == "TASK" && this.$route.path == "/kpiTaskT") {
          //   this.isbox = true;
          this.$router.push({
            path: "/kpiTask",
          });
          //  { path: '/a', redirect: '/b' }
        } else if (
          res.data.data.type == "FORM" &&
          this.$route.path == "/kpiTaskT"
        ) {
          this.isbox = false;
          this.$router.push({
            path: "/kpimineform",
          });
          return false;
        }
      } else {
        // this.isbuttonpp = false;
      }
    });
  },
  methods: {
    getPreMonth(date) {
      var arr = date.split("-");
      var year = arr[0]; //获取当前日期的年份
      var month = arr[1]; //获取当前日期的月份
      var day = arr[2]; //获取当前日期的日
      var days = new Date(year, month, 0);
      days = days.getDate(); //获取当前日期中月的天数
      var year2 = year;
      var month2 = parseInt(month) - 1;
      if (month2 == 0) {
        year2 = parseInt(year2) - 1;
        month2 = 12;
      }
      var day2 = day;
      var days2 = new Date(year2, month2, 0);
      days2 = days2.getDate();
      if (day2 > days2) {
        day2 = days2;
      }
      if (month2 < 10) {
        month2 = "0" + month2;
      }
      var t2 = year2 + "-" + month2 + "-" + day2;
      var t3 = year2 + "-" + month2 + "-" + "24";
      return t3;
    },
    isDuringDate(beginDateStr, endDateStr) {
      var curDate = new Date(),
        beginDate = new Date(beginDateStr),
        endDate = new Date(endDateStr);
      if (curDate >= beginDate && curDate <= endDate) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style lang="less" scoped>
</style>