<template>
  <div class="header-box">
    <div class="header-me">
      <div class="header-left">
        <div class="left">
          <img class="left-img" src="../assets/logo1.png" alt />
          <img class="left-img2" src="../assets/APH2.png" alt />
        </div>

        <span class="left-span">绩效管理</span>

        <div class="header-open">
          <i class="el-icon-s-operation" @click="clickOpen"></i>
        </div>
      </div>
      <div class="header-right">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <img class="hader-img" :src="imgurl" alt />
            <span class="hader-span">{{ name }}</span>
            <i class="el-icon-arrow-right hader-i"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div @click="tologoutUrl">退出登录</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <div class="menu">
      <el-row class="tac">
        <el-col :span="24">
          <el-menu
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :default-active="indexSi"
            :collapse="isCollapse"
            @select="selectItems"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-s-unfold"></i>
                <span>基础信息</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  index="1-1"
                  @click="goRouter('infoa')"
                  v-if="hasQx('aph2_pfm_DJCD-QX-M10')"
                  >绩效等级设置</el-menu-item
                >
                <el-menu-item
                  index="1-2"
                  @click="goRouter('infoc')"
                  v-if="hasQx('aph2_pfm_DJXZ-QX-C11')"
                  >绩效考核维度管理</el-menu-item
                >
                <el-menu-item
                  index="1-3"
                  @click="goRouter('infoe')"
                  v-if="hasQx('aph2_pfm_KHSJCD-QX-M10')"
                  >绩效考核时间设置</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-s-tools"></i>
                <span>绩效设置</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  index="2-1"
                  @click="goRouter('basicsa')"
                  v-if="hasQx('aph2_pfm_JGCD-QX-M10')"
                  >绩效机构管理</el-menu-item
                >
                <el-menu-item
                  index="2-2"
                  @click="goRouter('basicsc')"
                  v-if="hasQx('aph2_pfm_ZZJXCD-QX-M10')"
                  >组织绩效导入</el-menu-item
                >
                <el-menu-item
                  index="2-3"
                  @click="goRouter('basicse')"
                  v-if="hasQx('aph2_pfm_GXCD-QX-M10')"
                  >绩效关系管理</el-menu-item
                >
                <el-menu-item
                  index="2-4"
                  @click="goRouter('basicsg')"
                  v-if="hasQx('aph2_pfm_BDPZCD-QX-M10')"
                  >绩效表单模板配置</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>绩效管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  index="3-1"
                  @click="goRouter('admina')"
                  v-if="hasQx('aph2_pfm_JDCD-QX-M10')"
                  >绩效进度查询</el-menu-item
                >
                <el-menu-item
                  index="3-2"
                  @click="goRouter('adminc')"
                  v-if="hasQx('aph2_pfm_CXYHJXCD-QX-M10')"
                  >查询用户绩效</el-menu-item
                >
                <el-menu-item
                  index="3-3"
                  @click="goRouter('admine')"
                  v-if="hasQx('aph2_pfm_JXFBCD-QX-M10')"
                  >绩效系数调整</el-menu-item
                >
                <el-menu-item
                  index="3-5"
                  @click="goRouter('adminp')"
                  v-if="hasQx('aph2_pfm_ZZJXCXCD-QX-M10')"
                  >组织绩效查询</el-menu-item
                >
                <el-menu-item
                  index="3-6"
                  @click="goRouter('minee')"
                  v-if="hasQx('aph2_pfm_DSPJXCD-QX-M10')"
                  >待审批绩效</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span>我的绩效</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="4-1" @click="goRouter('minea')"
                  >我的绩效</el-menu-item
                >
                <el-menu-item index="4-2" @click="goRouter('minec')"
                  >制定绩效任务</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import base from "../api/base";
import { mapState } from "vuex";
var moment = require("moment");
export default Vue.component("header-me", {
  inject: ["reload"],
  name: "haderMe",
  data() {
    return {
      isCollapse: false,
      name: "",
      imgurl: "",
      perlist: [],
      sessid: sessionStorage.getItem("sso_sessionid"),
    };
  },
  watch: {
    // 利用watch方法检测路由变化：
    // 　　'$route': function (to, from) {
    //   console.log(to)
    // 　　　　// 拿到目标参数 to.query.id 去再次请求数据接口
    // 　　　　this.loadPageData(to.query.id)
    // 　　}
  },
  mounted() {
    this.getUser();

    let data = this.$store.state.userInfo;
    this.name = data.realName;
    this.imgurl = base.base.imgUrl + data.shPicture;
    let permissionList = data.permissionList;
    this.perlist = data.permissionList;
  },
  methods: {
    selectItems(index) {
      // console.log(index)
      // this.$store.commit("modifyindexSi",index);
    },
    hasQx(value) {
      return this.commonFn.hasQx(value, this);
    },
    goRouter(type) {
      // this.reload();
      if (type == "basicsa") {
        this.$router.push({
          path: "/basicsa",
        });
      } else if (type == "infoa") {
        this.$router.push({
          path: "/infoa",
        });
      } else if (type == "infoc") {
        this.$router.push({
          path: "/infoc",
        });
      } else if (type == "infoe") {
        this.$router.push({
          path: "/infoe",
        });
      } else if (type == "basicsc") {
        this.$router.push({
          path: "/basicsc",
        });
      } else if (type == "basicse") {
        this.$router.push({
          path: "/basicse",
        });
      } else if (type == "basicsg") {
        this.$router.push({
          path: "/basicsg",
        });
      } else if (type == "home") {
        this.$router.push({
          path: "/",
        });
      } else if (type == "admina") {
        this.$router.push({
          path: "/admina",
        });
      } else if (type == "adminc") {
        this.$router.push({
          path: "/adminc",
        });
      } else if (type == "admine") {
        this.$router.push({
          path: "/admine",
        });
      } else if (type == "adming") {
        this.$router.push({
          path: "/adming",
        });
      } else if (type == "adminp") {
        this.$router.push({
          path: "/adminp",
        });
      } else if (type == "minea") {
        this.$router.push({
          path: "/minea",
        });
      } else if (type == "minee") {
        this.$router.push({
          path: "/minee",
        });
      } else if (type == "minec") {
        var myDate = new Date();
        console.log(myDate);
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
        console.log(day, day2);
        let sessid = this.sessid;
        let params = {
          username: this.$store.state.userInfo.username,
          formDate: t,
        };
        //本月25号
        var date3 = year + "-" + month + "-" + "24";
        var date4 = year2 + "-" + month2 + "-" + "25";
        var oldDate = this.getPreMonth(date);
        var isDuring = this.isDuringDate(oldDate, date3);
        if (isDuring) {
          console.log("本月");
          params.formDate = t;
        } else {
          console.log("下月");
          params.formDate = t2;
        }
        this.api.checkFormUser(sessid, params).then((res) => {
          console.log(res);
          if (res.data.status == 200) {
            // this.reload();
            this.$store.commit("getformUserCode", res.data.data.formUserCode);
            if (res.data.data.type == "TASK") {
              this.$router.push({
                path: "/minec",
              });
            } else if (res.data.data.type == "FORM") {
              this.$router.push({
                path: "/mineform",
              });
            }
          }
        });
      }
    },
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
    getUser() {
      let seeid = sessionStorage.getItem("sso_sessionid");
      this.api.getUser(seeid).then((res) => {
        if (res.data.status == 200) {
          let data = res.data.data.userInfo;
          this.name = data.realName;
          this.imgurl = base.base.imgUrl + data.shPicture;
          let permissionList = data.permissionList;
          this.perlist = data.permissionList;
          // this.$store.commit("userInfo", data);
        }
      });
    },

    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickOpen() {
      this.isCollapse = !this.isCollapse;
    },
    tologoutUrl() {
      sessionStorage.removeItem("sso_sessionid");
      sessionStorage.removeItem("messageStore");
      setTimeout(() => {
        window.location.href = base.base.tologoutUrl;
      }, 200);
    },
  },
  computed: {
    ...mapState({
      indexSi: "indexSi",
    }),
  },
});
</script>

<style lang="less">
@import url("../assets/utils.less");
// .el-dropdown-menu__item:hover {
//   background: @color3 !important;
//   color: #fff !important;
// }
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 173px;
  min-height: 400px;
}
.header-box {
  .menu {
    .el-submenu__title {
      color: #fff !important;
      background: @color2 !important;
    }
    .el-submenu__title:hover {
      background-color: #fff !important;
      background: @color4 !important;
    }
    .el-menu-item-group__title {
      padding-left: 0px !important;
    }
    .el-menu-item {
      min-width: 100% !important;
      font-size: 13px !important;
    }
    .el-submenu__title {
      font-size: 13px !important;
    }
  }
  .header-open {
    color: #ffffff;
    font-size: 24px;
    margin: auto 20px;
    height: 32px;
  }

  min-height: calc(~"100vh - 50px") !important;
  background: #263238;
  .el-menu {
    border-right: none;
    background: #263238;
    color: #ffffff !important;
  }
  .el-menu-item {
    color: #ffffff !important;
    & span {
      font-size: 13px !important;
    }
  }
  .el-menu-item.is-active {
    background-color: @color4 !important;
  }
  .el-menu-item:focus,
  .el-menu-item:hover {
    background-color: @color4 !important;
  }

  .header-me {
    width: 100%;
    height: 50px;
    left: 0px;
    right: 0px;
    top: 0px;
    position: absolute;
    background: @color2;
    border-bottom: 1px solid #333;
    .flex();
    padding: 0 20px;
    .header-left {
      display: flex;
      .left {
        display: block;
        height: 50px;
        text-align: center;
        .left-img {
          width: 35px;
          height: 25px;
          margin: 13px 3px;
        }
        .left-img2 {
          width: 65px;
          height: 13px;
          margin-top: 25px;
          margin: 17px 3px;
        }
      }

      .left-span {
        display: block;
        height: 18px;
        border-color: #5d9cec;
        display: inline-block;
        font-weight: 500;
        background: #5d9cec;
        padding: 1px 4px 0px 4px;
        line-height: 1.5384616;
        border: 1px solid transparent;
        text-transform: uppercase;
        font-size: 12px;
        letter-spacing: 0.1px;
        border-radius: 2px;
        font-size: 10px;
        margin: auto 0;
        color: #ffffff;
        margin-left: 10px;
      }
    }
    .header-right {
      color: #ffffff;

      .hader-img {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        margin: auto 0;
      }
      .hader-span {
        margin: auto 0;
        color: #ffffff;
        padding: 0 4px 0 7px;
        height: 20px;
        display: block;
      }
      .hader-i {
        margin: auto 0;
        color: #ffffff;
        height: 14px;
      }
      .el-dropdown {
        display: block;
        color: #cccccc !important;
        font-size: 14px;
        height: 100%;
      }
      .el-dropdown-selfdefine {
        height: 100%;

        display: flex;
      }
    }
  }
}
</style>