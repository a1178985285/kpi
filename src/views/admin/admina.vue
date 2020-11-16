<template>
  <div class="admina">
    <div class="serach">
      <div class="serach-left">绩效进度查询</div>
      <div class="serach-right">
        <!-- <el-button type="primary" @click="testclickks">测试按钮</el-button> -->
      </div>
    </div>
    <div class="seach-form">
      <el-form ref="SearchFrom" :model="getForm" class="post-form" style="">
        <div class="seach-flex flex-30">
          <el-form-item
            label="机构名称"
            style="display: flex"
            prop="orgName"
            class="form-chang"
          >
            <el-select
              v-model="getForm.orgName"
              placeholder="请选择机构名称"
              multiple
              filterable
              remote
              size="mini"
              collapse-tags
              clearable
              @change="changDimens('name', $event)"
            >
              <el-option
                v-for="item in optionsName"
                :key="item.orgCode"
                :label="item.orgName"
                :value="item.orgCode"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="绩效月份"
            style="display: flex"
            prop="formDate"
            class="form-chang form-chang-date"
          >
            <el-date-picker
              size="mini"
              v-model="getForm.formDate"
              type="month"
              placeholder="请选择绩效月份"
              value-format="yyyy-MM"
              @change="changDm"
            ></el-date-picker>
          </el-form-item>

          <el-form-item
            label="状态"
            style="display: flex"
            prop="status"
            class="form-chang"
          >
            <el-select
              v-model="getForm.status"
              placeholder="请选择状态"
              size="mini"
              @change="changDimens('status', $event)"
              filterable
              remote
            >
              <el-option
                v-for="item in optionsReg"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                @click="clickselect"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="考核主体"
            prop="subjectName"
            style="display: flex"
            class="form-chang"
          >
            <el-input
              size="mini"
              v-model="getForm.subjectName"
              placeholder="请输入考核主体"
              @keyup.enter.native="serchClickF"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="考核对象"
            style="display: flex"
            prop="userName"
            class="form-chang"
          >
            <el-input
              size="mini"
              v-model="getForm.userName"
              placeholder="请输入考核对象"
              @keyup.enter.native="serchClickF"
            ></el-input>
          </el-form-item>
        </div>
        <div class="button" v-if="hasQx('aph2_pfm_CXYHJXCX-QX-M11')">
          <div>
            <el-button size="mini" @click="resetClickF">重置</el-button>
          </div>
          <div>
            <el-button
              size="mini"
              type="danger"
              @click="serchClickF"
              color="red"
              >查询</el-button
            >
          </div>
        </div>
      </el-form>
    </div>

    <div class="seach-form">
      <el-table :data="tableBasicsa" border style="width: 100%">
        <el-table-column label="序号" width="60" type="index"></el-table-column>
        <el-table-column prop="orgName" label="所属考核机构"></el-table-column>

        <el-table-column
          prop="userName"
          label="考核对象"
          class="active-com"
          width="100px"
        >
          <template slot-scope="scope" class="active-com">
            <span @click="goNexX(scope.row)" class="active-com">{{
              scope.row.userName
            }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="formType"
          label="表单类型"
          width="120px"
        ></el-table-column>

        <el-table-column
          prop="userRole"
          label="角色"
          width="120px"
        ></el-table-column>
        <el-table-column
          prop="subjectName"
          label="考核主体"
          width="120px"
        ></el-table-column>

        <el-table-column
          prop="formDate"
          label="绩效日期"
          width="120px"
        ></el-table-column>
        <el-table-column
          prop="status"
          label="绩效状态"
          width="200px"
        ></el-table-column>
      </el-table>
    </div>
    <Pagination
      :currentPage="currentPage"
      :total="total"
      @changePage="changePage"
    ></Pagination>
  </div>
</template>

<script>
import base from "../../api/base";
import Pagination from "../../components/pagination";
import baseVar from "../../utils/baseVar";
export default {
  inject: ["reload"],
  data() {
    return {
      tableBasicsa: [],
      fileList: [],
      tableList: [],
      innerVisibles: false,
      sessid: sessionStorage.getItem("sso_sessionid"),
      currentPage: 1,
      total: 1,
      basicsForm: {},
      importDate: "",
      optionsReg: baseVar.optionsRegS,
      seaType: "",
      optionsName: [],
      getForm: {
        orgName: "",
        formDate: "",
        status: "",
        subjectName: "",
        userName: "",
      },
      searchFrom: {
        liablerName: [
          { required: true, message: "请输入责任人", trigger: "blur" },
        ],
        orgAdminName: [
          { required: true, message: "请输入绩效机构管理员", trigger: "blur" },
        ],
      },
      selectedArray: [],
    };
  },
  created() {
    // getadminachangDm
    if (this.$store.state.adminachangDm == "") {
      var myDate = new Date();
      var tYear = myDate.getFullYear();
      var tMonth = myDate.getMonth();
      var m = tMonth + 1;
      if (m.toString().length == 1) {
        m = "0" + m;
      }
      this.getForm.formDate = tYear + "-" + m;
    } else {
      this.getForm.formDate = this.$store.state.adminachangDm;
    }
    this.getOrgInfoList();
  },
  mounted() {
    this.$store.commit("modifyindexSi", "3-1");
    this.getclick();
  },
  components: {
    Pagination,
  },
  methods: {
    testclickks() {
      window.open("http://10.200.18.80:8084/#/test");
      // window.location.href = "about:blank";
      // window.close();
      // window.opener = window;

      // var win = window.open("", "_self");
      // win.close();
    },
    hasQx(value) {
      return this.commonFn.hasQx(value, this);
    },
    changDm(e) {
      this.getForm.formDate = e;
      this.$store.commit("getadminachangDm", e);
    },
    goNexX(data) {
      this.$store.commit("getformUserCode", data.formUserCode);

      if (data.formType == "普通表单" && this.$route.path == "/admina") {
        //普通表单
        this.$router.push({
          path: "/mineform",
          query: {
            type: "cha",
          },
        });
      } else if (
        data.formType == "满意度表单" &&
        this.$route.path == "/admina"
      ) {
        this.$store.commit("getokDateCode", data.formCode);
        this.$store.commit("getokDate", data.formDate);
        //满意度表单
        this.$router.push({
          path: "/satiform",
          query: {
            type: "cha",
          },
        });
      } else if (
        data.formType == "普通表单" &&
        this.$route.path == "/kpispeed"
      ) {
        this.$router.push({
          path: "/kpimineform",
          query: {
            type: "cha",
          },
        });
      } else if (
        data.formType == "满意度表单" &&
        this.$route.path == "/kpispeed"
      ) {
        this.$store.commit("getokDateCode", data.formCode);
        this.$store.commit("getokDate", data.formDate);
        //满意度表单
        this.$router.push({
          path: "/kpisatiform",
          query: {
            type: "cha",
          },
        });
      }
    },
    getOrgInfoList() {
      let sessid = this.sessid;
      if (sessid == null) {
        sessid = "";
      }
      this.api.getRelationOrgList(sessid, "").then((res) => {
        if (res.data.status == 200) {
          let datas = res.data.data;
          let item = {
            orgName: "全部",
            orgCode: "",
          };
          datas.unshift(item);
          this.optionsName = datas;
        }
      });
    },

    goNET(data) {
      this.$refs.refs.listImgRight = {};
      if (this.seaType == "zhu") {
        if (data.staffName == null || data.staffName == "") {
          this.getForm.subjectName = "";
        } else {
          this.getForm.subjectName = data.staffName;
        }
      } else if (this.seaType == "dui") {
        if (data.userName == null || data.userName == "") {
          this.getForm.userName = "";
        } else {
          this.getForm.userName = data.staffName;
        }
      }

      this.$refs.refs.checkList = "";
      this.innerVisibles = false;
    },
    closepop() {
      this.innerVisibles = false;
    },
    clickselect() {},
    changDimens(type, val) {
      // console.log(val);
      var that = this;
      if (type == "name") {
        let optionsName = this.optionsName;
        if (val.length == 1 && val == "") {
          optionsName.map((item, i) => {
            this.optionsName[i].disabled = true;
            this.optionsName[0].disabled = false;
          });
        } else if (val.length == 0 && val == "") {
          optionsName.map((item, i) => {
            this.optionsName[0].disabled = false;
            this.optionsName[i].disabled = false;
          });
        } else {
          optionsName.map((item, i) => {
            this.optionsName[0].disabled = true;
            this.optionsName[i].disabled = false;
          });
        }
      } else if (type == "status") {
        that.optionsReg.map((item, i) => {
          // if (item.formCode == e) {
          //   that.basicsForm.formCode = item.formCode;
          // }
        });
      }
    },
    changePage(page) {
      this.currentPage = page;
      this.getclick();
    },
    serchClickF() {
      this.currentPage = 1;
      this.getclick();
    },
    resetClickF() {
      this.getForm = {
        orgName: "",
        formDate: "",
        status: "",
        subjectName: "",
        userName: "",
      };
      this.optionsName.map((item, i) => {
        this.optionsName[i].disabled = false;
      });
      this.currentPage = 1;
      this.$refs.SearchFrom.resetFields();
      this.getclick();
    },

    getclick() {
      let sessid = this.sessid;
      if (sessid == null) {
        sessid = "";
      }
      let data = this.getForm;
      let datas = JSON.parse(JSON.stringify(data));
      if (datas.formDate == null) {
        datas.formDate = "";
      }
      let params = {
        pageSize: this.$store.state.pageSize,
        // pageSize:10,
        page: this.currentPage,
        // orgName: datas.orgName,
        formDate: datas.formDate,
        status: datas.status,
        subjectName: datas.subjectName,
        userName: datas.userName,
        orgCodes: datas.orgName,
      };
      this.api.getPerformanceProgressQuery(sessid, params).then((res) => {
        let data = res.data;
        if (data.status == 200) {
          if (data.data == null) {
          } else {
            let records = data.data.records;
            this.changeDatMa(records);
            this.tableBasicsa = records;
            this.total = data.data.total;
          }
        }
      });
    },
  },
};
</script>

<style lang="less" >
@import url("../../assets/utils.less");

.form-chang-date {
  .el-date-editor {
    width: 100% !important;
  }
}
.el-upload-list {
  display: flex;
  flex-wrap: wrap;
  width: 345px !important;
}
.el-message--info {
  width: 80% !important;
}
.impor-log {
  .el-dialog {
    width: 500px !important;
  }
  .impo-l {
    display: flex;
    margin: 14px;
    .impo-l-title {
      margin: auto 20px auto 10px;
    }
  }
  .el-dialog__body {
    padding: 10px 20px !important;
  }
}

.admina {
  .width-auto();

  .el-select__tags {
    // flex-wrap: nowrap;
  }
  .form-chang {
    .el-form-item__content {
      width: calc(100% - 80px);
      .el-select {
        width: 100%;
      }
    }
  }
  .post-form {
    position: relative;
  }
  .seach-flex {
    display: flex;
    width: 100%;
    flex-wrap: wrap;

    .el-form-item {
      width: 28%;
    }
  }
  .button {
    position: absolute;
    right: 18px;
    bottom: 0px;
  }
  .basi-a {
    // .flex();
    display: flex;
    flex-wrap: wrap;
    .el-dialog__body {
      padding: 10px !important ;
    }
    .el-form-item {
      width: 30%;
      margin-left: 20px !important;
      margin-bottom: 10px !important;
    }
  }
}
</style>