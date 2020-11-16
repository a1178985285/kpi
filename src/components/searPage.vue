<template>
  <div class="pagination">
    <el-dialog
      title="选择人员"
      class="dialog-header"
      :showClose="false"
      :visible="innerVisible"
      append-to-body
    >
      <div class="header"></div>
      <div class="header-flex">
        <div class="header-left">
          <div class="left-input">
            <el-input size="mini"  v-if="ispeople" v-model="searchCheck" @keyup.enter.native="searchClick('react')"
            placeholder="请输入姓名"
            ></el-input>
            <el-input size="mini"  v-if="!ispeople" v-model="searchCheck" @keyup.enter.native="searchClick('react')"
            placeholder="请输入机构名称"
            ></el-input>
            <el-button size="small" type="danger" @click="searchReset('react')">重置</el-button>
            <el-button size="small" type="danger" @click="searchClick('react')">搜索</el-button>
          </div>
          <div class="left-radio">
            <el-radio-group v-model="checkList" v-if="isWuPhone">
              <div class="left-check-xian" v-for="(item,index4) in listImg" :key="index4">
                <el-radio :label="item.username" @change="changeRadio($event,item)">
                  <div class="left-check">
                    <div class="left-img">
                      <!-- <img
                        v-if="item.img=='' || !item.img "
                        class="left-img-img"
                        src="../assets/tou.png"
                        alt
                      />
                      <img v-else class="left-img-img" :src="item.img" alt /> -->
                      <div class="left-check-tilte" v-if="ispeople">
                        <div>姓名：{{item.staffName}}</div>
                      </div>
                      <div class="left-check-tilte" v-if="!ispeople">
                        <div>{{item.staffName}}</div>
                      </div>
                    </div>

                    <div class="left-check-dan" v-if="ispeople">工号：{{item.staffNumber}}</div>
                    <div class="left-check-zhi" v-if="ispeople">部门：{{item.departmentName}}</div>
                    <div v-if="!ispeople">责任人：{{item.fuNamep}}</div>
                    <!-- <div>{{item.idNumberName}}</div> -->
                  </div>
                </el-radio>
              </div>
              <Pagination
                v-if="isPage"
                :currentPage="currentPage"
                :total="total"
                @changePage="changePage"
              ></Pagination>
            </el-radio-group>
            <div v-if="!isWuPhone" class="check-zan">
              <div>
                <!-- <img src="../assets/zanwu.png" alt /> -->
              </div>
              <div>暂无数据</div>
            </div>
          </div>
        </div>
        <!-- <div class="header-right">
          <div class="right-box">
            <div v-if="listImgRight.staffName =='' ||  !listImgRight.staffName "></div>

            <div class="left-check-xian" v-else>
              <div class="left-check">
                <div class="left-img">
                  <img class="left-img-img" src="../assets/tou.png" alt />
                  <div class="left-check-tilte">
                    <div>{{listImgRight.staffName}}</div>
                  </div>
                </div>
                <div class="left-check-dan">{{listImgRight.staffNumber}}</div>
                <div class="left-check-zhi">{{listImgRight.departmentName}}</div>
              </div>
            </div>
          </div>
        </div>-->
      </div>
      <div class="loding-button">
        <el-button size="small" @click="cancelLod">取消</el-button>
        <el-button size="small" type="danger" @click="deterLod">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "../components/pagination";

export default {
  name: "pagination",
  props: {
    //   总条数
    // total: {
    //   type: Number,
    //   default: 1
    // },
    //显示
    innerVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      sessid: sessionStorage.getItem("sso_sessionid"),
      dialogFormVisible: false,
      basicsForm: {},
      searchCheck: "",
      isWuPhone: true,
      checkList: "",
      currentPage: 1,
      total: 1,
      listImg: [],
      listImgRight: {},
      isPage: true,
      ispeople: false,
    };
  },
  components: {
    Pagination,
  },
  mounted() {
    if (this.$store.state.searPageType == "people") {
      this.getclickP();
    } else if (this.$store.state.searPageType == "com") {
      this.getclickJi();
    }
  },
  computed: {
    listenshowpage1() {
      return this.$store.state.searPageType;
    },
  },
  watch: {
    listenshowpage1: {
      deep: true,
      handler(n, o) {
        if (n == "com") {
          this.getclickJi();
        } else if (n == "people") {
          this.getclickP();
        }
      },
    },
  },

  methods: {
    getclickP() {
      let sessid = this.sessid;
      let params = {
        page: this.currentPage,
        pageSize: this.$store.state.pageSize,
        selectName: this.searchCheck,
      };
      this.api.getPageList(sessid, params).then((res) => {
        let data = res.data;

        if (data.status == 200) {
          // this.tableBasicsa = data.data;
          let datas = data.data.records;
          for (let i in datas) {
            datas[i].companyName = datas[i].companyName;
            datas[i].departmentCode = datas[i].departmentCode;
            datas[i].departmentName = datas[i].departmentName;
            datas[i].staffName = datas[i].staffName;
            datas[i].staffNumber = datas[i].staffNumber;
            datas[i].username = datas[i].username;
          }
          this.listImg = datas;
          this.ispeople = true;
          this.total = data.data.total;
          this.isPage = true;
          //   this.checkList = data.departmentCode;
        }
      });
    },

    getclickJi() {
      let sessid = this.sessid;
      let orgName = this.searchCheck;
      this.api.getRelationOrgList(sessid, orgName).then((res) => {
        let data = res.data;
        if (data.status == 200) {
          this.isPage = false;
          this.tableBasicsa = data.data;
          let datas = data.data;
          for (let i in datas) {
            datas[i].staffName = datas[i].orgName;
            datas[i].username = datas[i].orgInfoId;
            datas[i].fuNamep = datas[i].liablerName;
          }
          this.ispeople = false;
          this.listImg = datas;
        }
      });
    },
    // handleCurrentChange(page) {
    //   this.$emit("changePage", page);
    // },
    changeRadio(code, data) {
      this.listImgRight = data;
      this.checkList = code;
    },
    //取消
    cancelLod() {
      this.$emit("closepop");
      this.searchCheck = "";
      if (this.$store.state.searPageType == "com") {
        this.getclickJi();
      } else {
        this.getclickP();
      }
    },
    //确定
    deterLod() {
      if (!this.listImgRight.staffName) {
        this.$message.error("请选择");
        return false;
      }
      this.currentPage = 1;
      this.$emit("goNET", this.listImgRight);
      this.searchCheck = "";
      if (this.$store.state.searPageType == "com") {
        this.getclickJi();
      } else {
        this.getclickP();
      }
    },
    changePage(page) {
      this.currentPage = page;
      this.getclickP();
    },
    searchClick(type) {
      if (type == "react") {
        this.currentPage = 1;
      }
      if (this.$store.state.searPageType == "com") {
        this.getclickJi();
      } else {
        this.getclickP();
      }
    },
    // 弹框重置
    searchReset(type) {
      // this.currentPage=1,
      if (type == "react") {
        this.currentPage = 1;
      }
      this.searchCheck = "";
      if (this.$store.state.searPageType == "com") {
        this.getclickJi();
      } else {
        this.getclickP();
      }
    },
  },
};
</script>

<style lang="less">
@import url("../assets/utils.less");
.dialog-header {
  .check-zan {
    text-align: center;
    padding: 50px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 180px;
    & > div:nth-child(1) {
      & img {
        width: 50px;
        height: 50px;
      }
    }
  }
  .loding-button {
    padding: 20px 20px 0;
    .flex(flex-end);
  }
  .header {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding: 10px 20px;
    display: flex;
    & > div {
      margin-right: 20px;
    }
  }
  .header-flex {
    display: flex;
    border: 1px solid #ccc;
    .left-img-img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .left-check-tilte {
      // margin: auto 0;

      // left: 50px;
      // position: absolute;
      // top: 13px;
    }

    .left-check {
      font-size: 13px;
      display: flex;
      position: relative;
      & > div:nth-child(1) {
        width: 330px;
      }
      & > div:nth-child(2) {
        // text-align: center;
        width: 330px;
        margin: auto 0;
      }
      & > div:nth-child(3) {
        // width: 20%;
        // position: absolute;
        // right: 0;
        // top: 14px;
      }
      & > div:nth-child(4) {
        position: absolute;
        right: 0;
        top: 14px;
      }
      // .flex(space-between);s

      .left-check-dan {
        margin: auto 0;
      }
      .left-check-zhi {
        margin: auto 0;
        & i {
          font-size: 16px;
        }
      }

      .left-img {
        display: flex;
      }
      .left-img-two {
        width: 100% !important;
        text-align: left !important;
        display: flex;
      }
      .left-check-tilte-two {
        margin: auto 0;
      }
    }
    .left-check-xian {
      border-bottom: 1px solid #ccc;
      padding: 10px 0;
    }
    .left-input {
      .flex(center);
      padding: 16px;
      width: 100%;
      border-bottom: 1px solid #ccc;

      & > button {
        margin-left: 20px;
      }
      & input {
        width: 80% !important;
      }
    }
    .header-left {
      border-right: 1px solid #ccc;
      width: 100%;
      .left-radio {
        padding: 0 16px;
        height: 310px;
        overflow: auto;
        position: relative;
        .el-radio-group {
          width: 100%;
          .el-radio is-checked {
            display: flex;
          }
          .el-radio {
            width: 100%;
            display: flex;
          }
          .el-radio__label {
            width: 100%;
          }
          .el-radio__input {
            margin: auto 0;
          }
        }
        .el-checkbox {
          display: flex;
        }
        .el-checkbox__label {
          display: block;
          width: 100%;
        }
        .el-checkbox__input {
          margin: auto 0;
        }
      }
    }
    .header-right {
      width: calc(~"100% - 60%");
      .right-box {
        // border-top: 1px solid #ccc;
        padding: 0 16px;
      }
    }
  }
}
</style>