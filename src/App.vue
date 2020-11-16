<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
import base from "./api/base";
export default {
  name: "App",
  provide() {
    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      reload: this.reload,
    };
  },

  data() {
    return {
      isRouterAlive: true,
    };
  },

  created() {
    //在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("messageStore", JSON.stringify(this.$store.state));
    });
    //在页面加载时读取localStorage里的状态信息
    sessionStorage.getItem("messageStore") &&
      this.$store.replaceState(
        Object.assign(
          this.$store.state,
          JSON.parse(sessionStorage.getItem("messageStore"))
        )
      );
    var urlV = window.location.href;
    var switchV = urlV.indexOf("sso");
    var sso_sessionid = sessionStorage.getItem("sso_sessionid");

    if (urlV.indexOf("formUserCode=") == -1) {
    } else {
      if (!this.$store.state.formcodeuss) {
        var last = urlV.indexOf("noticeCode=");
        var ppp = urlV.substring(urlV.indexOf("formUserCode=") + 13, last);
        this.$store.commit("getformcodeuss", ppp);
      }
    }

    // var lll= "https://devpfm.firstcare.com.cn/#/kpiTaskT?username=wangqian06&formDate=sssss&noticeCode=6666"

    if (urlV.indexOf("formDate=") == -1) {
    } else {
      if (!this.$store.state.oadate) {
        var last = urlV.indexOf("noticeCode=");
        var ppp = urlV.substring(urlV.indexOf("formDate=") + 9, last);
        // console.log(ppp);
        this.$store.commit("getoadate", ppp);
      }
    }

    if (urlV.indexOf("username=") == -1) {
    } else {
      if (!this.$store.state.oauser) {
        var last = urlV.indexOf("formDate=");
        var ppp = urlV.substring(urlV.indexOf("username=") + 9, last);
        // console.log(ppp);
        this.$store.commit("getoauser", ppp);
      }
    }

    var kpiGrade = urlV.indexOf("kpiGrade");
    var kpiDimen = urlV.indexOf("kpiDimen");
    var kpiTime = urlV.indexOf("kpiTime");
    var kpiMech = urlV.indexOf("kpiMech");
    var kpiImport = urlV.indexOf("kpiImport");
    var kpiRela = urlV.indexOf("kpiRela");
    var kpiRelaNo = urlV.indexOf("kpiRelaNo");
    var kpiForm = urlV.indexOf("kpiForm");
    var kpiFormAdd = urlV.indexOf("kpiFormAdd");
    var kpiFormList = urlV.indexOf("kpiFormList");
    var kpisatiform = urlV.indexOf("kpisatiform");
    var kpipreview = urlV.indexOf("kpipreview");
    var kpispeed = urlV.indexOf("kpispeed");
    var kpiuser = urlV.indexOf("kpiuser");
    var kpicoef = urlV.indexOf("kpicoef");
    var kpiorgan = urlV.indexOf("kpiorgan");
    var kpiPend = urlV.indexOf("kpiPend");
    var kpime = urlV.indexOf("kpime");
    // var kpiTask = urlV.indexOf("kpiTask");
    var kpimineform = urlV.indexOf("kpimineform");
    var kpiTaskT = urlV.indexOf("kpiTaskT");

    if (kpiGrade != -1) {
      sessionStorage.setItem("kpiGrade", "1");
    }

    if (kpiDimen != -1) {
      sessionStorage.setItem("kpiDimen", "1");
    }
    if (kpiTime != -1) {
      sessionStorage.setItem("kpiTime", "1");
    }
    if (kpiMech != -1) {
      sessionStorage.setItem("kpiMech", "1");
    }
    if (kpiImport != -1) {
      sessionStorage.setItem("kpiImport", "1");
    }
    if (kpiRela != -1) {
      sessionStorage.setItem("kpiRela", "1");
    }
    if (kpiRelaNo != -1) {
      sessionStorage.setItem("kpiRelaNo", "1");
    }
    if (kpiForm != -1) {
      sessionStorage.setItem("kpiForm", "1");
    }
    if (kpiFormAdd != -1) {
      sessionStorage.setItem("kpiFormAdd", "1");
    }
    if (kpiFormList != -1) {
      sessionStorage.setItem("kpiFormList", "1");
    }
    if (kpisatiform != -1) {
      sessionStorage.setItem("kpisatiform", "1");
    }
    if (kpipreview != -1) {
      sessionStorage.setItem("kpipreview", "1");
    }
    if (kpispeed != -1) {
      sessionStorage.setItem("kpispeed", "1");
    }
    if (kpiuser != -1) {
      sessionStorage.setItem("kpiuser", "1");
    }
    if (kpicoef != -1) {
      sessionStorage.setItem("kpicoef", "1");
    }
    if (kpiorgan != -1) {
      sessionStorage.setItem("kpiorgan", "1");
    }
    if (kpiPend != -1) {
      sessionStorage.setItem("kpiPend", "1");
    }
    if (kpime != -1) {
      sessionStorage.setItem("kpime", "1");
    }
    // if (kpiTask != -1) {
    //   sessionStorage.setItem("kpiTask", "1");
    // }
    if (kpimineform != -1) {
      sessionStorage.setItem("kpimineform", "1");
    }
    if (kpiTaskT != -1) {
      sessionStorage.setItem("kpiTaskT", "1");
    }

    if (switchV == -1) {
      if (!sso_sessionid) {
        // if(sessionStorage.getItem("kpiGrade") == 1 ){
        //   window.location.href = base.headerUrl + 'sso.firstcare.com.cn/login?redirect_url='+ base.headerUrl +'pfm.firstcare.com.cn/#/kpiGrade' ;
        // }
        window.location.href = base.base.tologinUrl;
      } else {
        this.getUser(sso_sessionid);
      }
    } else {
      if (!sso_sessionid) {
        var sso_sessionid2 = urlV.substring(
          urlV.indexOf("sso_sessionid=") + 14,
          urlV.indexOf("#/")
        );
        sessionStorage.setItem("sso_sessionid", sso_sessionid2);
        this.getUser(sso_sessionid2);
      } else {
        var sso_sessionid = sessionStorage.getItem("sso_sessionid");
        this.getUser(sso_sessionid);
      }
    }
    // }
  },
  methods: {
    reload() {
      this.isRouterAlive = false; //先关闭，
      this.$nextTick(function () {
        this.isRouterAlive = true; //再打开
      });
    },
    getUser(seeid) {
      console.log(seeid, "PPPP");
      this.api.getUser(seeid).then((res) => {
        if (res.data.status == 200) {
          let data = res.data.data.userInfo;
          this.$store.commit("userInfo", data);
          console.log(this.$store.state.userInfo);
          var kpiGrade = sessionStorage.getItem("kpiGrade"),
            kpiDimen = sessionStorage.getItem("kpiDimen"),
            kpiTime = sessionStorage.getItem("kpiTime"),
            kpiTime = sessionStorage.getItem("kpiTime"),
            kpiImport = sessionStorage.getItem("kpiImport"),
            kpiRela = sessionStorage.getItem("kpiRela"),
            kpiRelaNo = sessionStorage.getItem("kpiRelaNo"),
            kpiForm = sessionStorage.getItem("kpiForm"),
            kpiFormAdd = sessionStorage.getItem("kpiFormAdd"),
            kpiFormList = sessionStorage.getItem("kpiFormList"),
            kpisatiform = sessionStorage.getItem("kpisatiform"),
            kpipreview = sessionStorage.getItem("kpipreview"),
            kpispeed = sessionStorage.getItem("kpispeed"),
            kpiuser = sessionStorage.getItem("kpiuser"),
            kpicoef = sessionStorage.getItem("kpicoef"),
            kpiorgan = sessionStorage.getItem("kpiorgan"),
            kpiPend = sessionStorage.getItem("kpiPend"),
            kpime = sessionStorage.getItem("kpime"),
            // kpiTask = sessionStorage.getItem("kpiTask"),
            kpimineform = sessionStorage.getItem("kpimineform"),
            kpiTaskT = sessionStorage.getItem("kpiTaskT"),
            kpiMech = sessionStorage.getItem("kpiMech");

          if (kpiGrade == 1) {
            sessionStorage.removeItem("kpiGrade");
            this.$router.push({
              path: "/kpiGrade",
            });
          } else if (kpiDimen == 1) {
            sessionStorage.removeItem("kpiDimen");

            this.$router.push({
              path: "/kpiDimen",
            });
          } else if (kpiTime == 1) {
            sessionStorage.removeItem("kpiTime");

            this.$router.push({
              path: "/kpiTime",
            });
          } else if (kpiMech == 1) {
            sessionStorage.removeItem("kpiMech");
            this.$router.push({
              path: "/kpiMech",
            });
          } else if (kpime == 1) {
            sessionStorage.removeItem("kpime");
            this.$router.push({
              path: "/kpime",
            });
          } else if (kpiImport == 1) {
            sessionStorage.removeItem("kpiImport");
            this.$router.push({
              path: "/kpiImport",
            });
          } else if (kpiRela == 1) {
            sessionStorage.removeItem("kpiRela");
            this.$router.push({
              path: "/kpiRela",
            });
          } else if (kpiRelaNo == 1) {
            sessionStorage.removeItem("kpiRelaNo");
            this.$router.push({
              path: "/kpiRelaNo",
            });
          } else if (kpiForm == 1) {
            sessionStorage.removeItem("kpiForm");
            this.$router.push({
              path: "/kpiForm",
            });
          } else if (kpiFormAdd == 1) {
            sessionStorage.removeItem("kpiFormAdd");
            this.$router.push({
              path: "/kpiFormAdd",
            });
          } else if (kpiFormList == 1) {
            sessionStorage.removeItem("kpiFormList");
            this.$router.push({
              path: "/kpiFormList",
            });
          } else if (kpisatiform == 1) {
            sessionStorage.removeItem("kpisatiform");
            this.$router.push({
              path: "/kpisatiform",
            });
          } else if (kpipreview == 1) {
            sessionStorage.removeItem("kpipreview");
            this.$router.push({
              path: "/kpipreview",
            });
          } else if (kpispeed == 1) {
            sessionStorage.removeItem("kpispeed");
            this.$router.push({
              path: "/kpispeed",
            });
          } else if (kpiuser == 1) {
            sessionStorage.removeItem("kpiuser");
            this.$router.push({
              path: "/kpiuser",
            });
          } else if (kpicoef == 1) {
            sessionStorage.removeItem("kpicoef");
            this.$router.push({
              path: "/kpicoef",
            });
          } else if (kpiorgan == 1) {
            sessionStorage.removeItem("kpiorgan");
            this.$router.push({
              path: "/kpiorgan",
            });
          } else if (kpiPend == 1) {
            sessionStorage.removeItem("kpiPend");
            this.$router.push({
              path: "/kpiPend",
            });
          }
          //  else if (kpiTask == 1) {
          //   sessionStorage.removeItem("kpiTask");
          //   this.$router.push({
          //     path: "/kpiTask",
          //   });
          // }
          else if (kpiTaskT == 1) {
            sessionStorage.removeItem("kpiTaskT");
            this.$router.push({
              path: "/kpiTaskT",
            });
          } else if (kpimineform == 1) {
            sessionStorage.removeItem("kpimineform");
            if (this.$store.state.formcodeuss) {
              this.$router.push({
                path: "/kpimineform",
                query: {
                  formUserCode: this.$store.state.formcodeuss,
                },
              });
            } else {
              this.$router.push({
                path: "/kpimineform",
              });
            }
          }
        }
      });
    },
  },
};
</script>


<style lang="less">
@import url("./assets/utils.less");
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  touch-action: pan-y;
}
.data-form-inpu {
  .el-form-item__content {
    width: calc(~"100% -  98px") !important;
    .el-input {
      width: 100% !important;
    }
  }
}
.padding-clo {
  padding-left: 10px;
}
html {
  height: 100%;
  width: 100%;
  -webkit-text-size-adjust: none;
}
.el-message__content {
  padding: 0;
  font-size: 14px;
  line-height: 1.4 !important;
}
.el-button--text {
  padding: 0px 0 !important;
}
.el-table td {
  padding: 6px 0 !important;
}
.el-table td,
.el-table th {
  text-align: center !important;
}
.el-table th {
  padding: 6px 0 !important;
}
.flex-form {
  .flex();
  padding-right: 10px;
  .seach-flex-two {
    display: flex;
  }
}
a {
  text-decoration: none;
}
.el-menu-item-group__title {
  padding: 0 !important;
}
.el-submenu .el-menu-item {
  height: 46px !important;
}
.el-menu-item {
  line-height: 46px !important;
  height: 46px !important;
  &:hover {
    background: @color3 !important;
    color: #fff;
  }
}
.is-active {
  background-color: @color3 !important;
  color: #fff !important;
}

.chang-opto {
  width: 94% !important;
  .el-select {
    width: 100% !important;
  }
}
.chang-radio {
  .el-radio-group {
    display: flex;
    margin: auto;
    height: 40px;
  }
  .el-radio {
    margin: auto 10px auto 0 !important;
  }
}
.loding-button {
  display: flex;
  justify-content: flex-end;
  padding: 20px;
}
.el-dialog {
  width: 1100px !important;
}
.el-loading-mask {
  z-index: 99999 !important;
}

.el-range-separator {
  width: auto !important;
}
.el-button--danger {
  color: #fff;
  background-color: @color3 !important;
  border-color: @color3 !important;
}
.el-select-dropdown__item.selected {
  color: @color3 !important;
}
.el-date-table td.today span {
  color: @color3 !important;
  font-weight: 700;
}
.el-date-table td.available:hover {
  color: @color3 !important;
}
.el-date-table td.current:not(.disabled) span {
  background-color: @color3 !important;
}
.el-table {
  margin: 0 0 20px 0;
}
.has-gutter tr th {
  background: @color1;
}
.el-loading-spinner i {
  color: #fff !important ;
}
.el-loading-text {
  color: #fff !important ;
}

.serach {
  border-bottom: 1px solid #ccc;
  height: 45px;
  background: #ffffff;
  .flex();
  padding: 0 16px 0 16px;
  overflow: hidden;
  .serach-left {
    margin: auto 0;
    font-size: 15px;
    padding: 0 10px;
    height: 20px;
  }
  .serach-right {
    display: flex;
    align-items: center;
    & > div {
      margin-left: 20px;
    }
  }
}
.el-textarea__inner {
  resize: none !important;
  min-height: 80px !important;
}
.button {
  .flex(flex-end);
  align-items: center;
  margin-left: 18px;
  & > div:nth-child(1) {
    margin: 0 20px;
  }
}
.el-form-item__error {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top: 100%;
  left: 0;
  top: 92% !important;
}

.seach-form {
  //  margin-top: 10px;
  .big();
  .option-labe {
    .el-form-item__label {
      float: inherit !important;
    }
    .el-select {
      width: 100% !important;
      .el-input__inner {
        width: 100% !important;
      }
    }
  }
  .el-form {
    .el-form-item {
      margin: auto 18px;
    }
    .seach-form-flex {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
    }
  }
}
.el-form-item::after,
.el-form-item::before {
  display: none !important;
}
.el-form-item__content::after,
.el-form-item__content::before {
  display: none !important;
}

//表单
.mineform {
  .el-form {
    border: 2px solid #000;
    margin: 10px auto 10px auto;
    width: 98%;
  }
  .el-form-item__label {
    line-height: 28px !important;
  }
  .el-input__inner {
    padding: 0 6px !important;
  }
  .width-auto();
  overflow: auto !important;
  .jixiao {
    width: 100%;
    border-collapse: collapse;
    // border: 2px solid #000;
    // margin: 10px auto 10px auto;
    background: #fff;
    // border: none;
    .change {
      width: 100% !important;
      .el-form-item__content {
        width: 86% !important;
      }
      .el-form-item__label {
        width: 65px;
      }
    }
    .section {
      font-weight: 600;
    }
    .tabl-flex {
      display: flex;
      width: 100%;
      & > div {
        margin-right: 20px;
      }
    }
    .form-el {
      margin-bottom: 0 !important;
      display: flex;
      .el-form-item__label {
        text-align: right;
        vertical-align: middle;
        float: left;
        font-size: 9pt !important;
        color: #000 !important;
        // line-height: 0px !important;
        padding: 0 !important;
        box-sizing: border-box;
      }
      .el-form-item__content {
        line-height: 0px !important;
        margin: auto 0 !important;
      }
    }
    td {
      min-height: 20px;
      height: 28px;
      line-height: 18px;
      font-family: simSong;
      font-size: 9pt;
      border: 1px solid #999;
      // padding: 2px;
      color: #000 !important;
    }
    .td_list {
      height: 28px;
      line-height: 0;
      font-family: simSong;
      font-size: 9pt;
      border: none;
      color: #000 !important;
    }
    .thick {
      // font-weight: bold;
      text-align: center;
    }
    .header {
      height: 45px;
      padding: 0px;
      margin: 5px auto;
      text-align: center;
      background: #fff;
      img {
        width: 120px;
        // height: 28px;
        margin-left: 15px;
        float: left;
        margin: 10px;
      }
      .title {
        font-family: simHei;
        font-weight: bold;
        line-height: 30px;
        margin-bottom: 0 !important;
        display: flex;
        padding-left: 400px;
        .el-form-item__label {
          text-align: right;
          vertical-align: middle;
          float: left;
          font-size: 20pt !important;
          color: #000 !important;
          // line-height: 0px !important;
          padding: 0 !important;
          box-sizing: border-box;
        }
      }
    }
    .baseinfo {
      font-size: 10pt;
      font-family: simHei;
    }
  }
}

.border-none {
  background: #fff;
  .el-input__inner {
    border: none;
    color: #000 !important;
    height: 20px !important;
  }
  .jixiao td {
    color: #000 !important;
  }
  .font-weigh {
    .el-form-item__label {
      font-weight: 600;
    }
    .el-input__inner {
      font-weight: 600;
    }
  }
}
.mineform {
  .border-input {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
  }
  .el-tag {
    height: 26px !important;
    line-height: 23px !important;
    margin: 2px 6px !important;
  }
  .el-input__inner {
    padding: 0 6px !important;
  }
  .el-rate {
    .flex(center);
  }
  .el-rate__item {
    margin: auto 0;
    //  transform: scale(1.1);
  }
  .el-icon-star-on {
    margin-right: 2px !important;
  }
  .el-icon-star-off {
    margin-right: 2px !important;
    //  transform: scale(1.1);
    color: #c2c2c2 !important;
  }
  .el-rate__icon {
    font-size: 24px !important;
  }
}

.button-end {
  border-top: 1px solid #ccc;
  .flex(flex-end);
  padding: 10px;
}
.input-end-flex {
  .el-form-item__content {
    .flex();
    .el-input__inner {
      width: 94%;
    }
  }
}
.el-table {
  & td {
    border-right: 1px solid #ddd !important;
    border-bottom: 1px solid #ddd !important;
  }
}
.active-com {
  color: @color3;
  &:hover {
    cursor: pointer;
    color: @color3;
  }
}

.thick {
  .el-rate {
    .flex(center);
  }

  .el-rate__item {
    margin: auto 0;
  }
  .el-rate__icon {
    margin-right: 2px !important;
    transform: scale(1.2);
  }
}

.el-button--primary {
  color: #fff !important;
  background: @color3 !important;
  border-color: @color3 !important;
}

.thict-two {
  .el-rate {
    .flex(center);
  }

  .el-rate__item {
    margin: auto 0;
  }
  .el-rate__icon {
    margin-right: 2px !important;
    transform: scale(1.3);
  }
}
</style>
