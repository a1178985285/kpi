<template>
  <div class="adminc">
    <div class="serach">
      <div class="serach-left">查询用户绩效</div>
      <div class="serach-right"></div>
    </div>
    <div class="seach-form">
      <el-form ref="SearchFrom" :model="getForm" class="post-form">
        <div class="seach-flex">
          <el-form-item label="机构名称" prop="orgName" label-width="100px">
            <el-select
              v-model="getForm.orgName"
              placeholder="请选择机构名称"
              size="mini"
              @change="changDimens"
              filterable
              remote
            >
              <!-- multiple
              collapse-tags
              clearable -->
              
              <el-option
                v-for="item in optionsReg"
                :key="item.orgCode"
                :label="item.orgName"
                :value="item.orgCode"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="考核对象" prop="userName" label-width="100px">
            <el-input
              size="mini"
              v-model="getForm.userName"
              placeholder="请输入考核对象"
              @keyup.enter.native="serchClickF('react')"
            ></el-input>
          </el-form-item>

          <el-form-item label="绩效月份" prop="formDate" class="data-form-inpu">
            <el-date-picker
              size="mini"
              v-model="getForm.formDate"
              type="month"
              placeholder="请选择绩效月份"
              value-format="yyyy-MM"
              @change="changDm"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div class="button">
          <div>
            <el-button size="mini" @click="resetClickF">重置</el-button>
          </div>
          <div>
            <el-button
              size="mini"
              type="danger"
              @click="serchClickF('react')"
              color="red"
              >查询</el-button
            >
          </div>
        </div>
      </el-form>
    </div>
    <!-- <searPage
      :innerVisible="innerVisibles"
      @closepop="closepop"
      @goNET="goNET"
      ref="refs"
    ></searPage> -->

    <div class="seach-form">
      <el-table :data="tableBasicsa" border style="width: 100%">
        <el-table-column label="序号" width="60" type="index"></el-table-column>
        <el-table-column
          prop="orgName"
          label="所属考核机构名称"
        ></el-table-column>

        <el-table-column
          prop="userName"
          label="姓名"
          class="active-com"
          width="120px"
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
        <!-- <el-table-column
          prop="taskAllScore"
          label="分数"
          width="100"
        ></el-table-column> -->
        <el-table-column label="星级" class="active-com" width="150px">
          <template slot-scope="scope">
            <el-rate
              v-model="scope.row.taskAllStar"
              :allow-half="true"
              disabled
              class="thict-two"
              :disabled-void-color="colorRate"
            ></el-rate>
          </template>
        </el-table-column>
        <el-table-column
          prop="kpiScore"
          label="绩效系数"
          width="120px"
        ></el-table-column>
        <el-table-column
          prop="formDate"
          label="绩效月份"
          width="120px"
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
// import searPage from "../../components/searPage";
export default {
  inject: ["reload"],
  data() {
    return {
      tableBasicsa: [],
      fileList: [],
      tableList: [],
      colorRate: "#c2c2c2",
      sessid: sessionStorage.getItem("sso_sessionid"),
      currentPage: 1,
      total: 1,
      basicsForm: {},
      innerVisibles: false,
      importDate: "",
      optionsReg: [],
      optionsName: [
        {
          value: "A",
          label: "A",
        },
      ],
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
    };
  },
  created() {
    if (this.$store.state.admincchangDm == "") {
      var myDate = new Date();
      var tYear = myDate.getFullYear();
      var tMonth = myDate.getMonth();
      var m = tMonth + 1;
      if (m.toString().length == 1) {
        m = "0" + m;
      }
      this.getForm.formDate = tYear + "-" + m;
    } else {
      this.getForm.formDate = this.$store.state.admincchangDm;
    }
  },
  mounted() {
    this.$store.commit("modifyindexSi", "3-2");
    let sessid = this.sessid;
    this.getclick();
  },
  components: {
    Pagination,
    // searPage,
  },
  methods: {
    goNexX(data) {
      this.$store.commit("getformUserCode", data.formUserCode);
      if (data.formType == "普通表单" && this.$route.path == "/adminc") {
        //普通表单
        this.$router.push({
          path: "/mineform",
          query: {
            type: "chaTwo",
          },
        });
      } else if (
        data.formType == "满意度表单" &&
        this.$route.path == "/adminc"
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
        this.$route.path == "/kpiuser"
      ) {
        //普通表单
        this.$router.push({
          path: "/kpimineform",
          query: {
            type: "chaTwo",
          },
        });
      } else if (
        data.formType == "满意度表单" &&
        this.$route.path == "/kpiuser"
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
    changDm(e) {
      this.getForm.formDate = e;
      this.$store.commit("getadmincchangDm", e);
    },
    clickinner(type) {
      if (type == "ppp") {
        this.$store.commit("getsearPageType", "com");
      } else {
        this.$store.commit("getsearPageType", "people");
      }
      this.innerVisibles = true;
      this.seaType = type;
    },
    goNET(data) {
      this.$refs.refs.listImgRight = {};
      if (this.seaType == "userName") {
        if (data.staffName == null || data.staffName == "") {
          this.getForm.userName = "";
        } else {
          this.getForm.userName = data.staffName;
        }
        // this.getForm.userName = data.staffName;
      }
      this.$refs.refs.checkList = "";
      this.innerVisibles = false;
    },
    closepop() {
      this.innerVisibles = false;
    },
    changDimens(val) {
      return
      var that = this;
      let optionsReg = this.optionsReg;
      if (val.length == 1 && val == "") {
        optionsReg.map((item, i) => {
          this.optionsReg[i].disabled = true;
          this.optionsReg[0].disabled = false;
        });
      } else if (val.length == 0 && val == "") {
        optionsReg.map((item, i) => {
          this.optionsReg[0].disabled = false;
          this.optionsReg[i].disabled = false;
        });
      } else {
        optionsReg.map((item, i) => {
          this.optionsReg[0].disabled = true;
          this.optionsReg[i].disabled = false;
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
      this.currentPage = 1;
      this.$refs.SearchFrom.resetFields();
      this.getclick();
    },

    getclick() {
      let sessid = this.sessid;
      let data = this.getForm;
      let datas = JSON.parse(JSON.stringify(data));
      if (datas.formDate == null) {
        datas.formDate = "";
      }
      let params = {
        pageSize: this.$store.state.pageSize,
        page: this.currentPage,
        orgCode: datas.orgName,
        formDate: datas.formDate,
        status: "",
        userName: datas.userName,
      };
      this.api.getFormTotalList(sessid, params).then((res) => {
        let data = res.data;
        if (data.status == 200) {
          let records = data.data.formTotalVOPage.records;
          let optionsReg = data.data.orgInfoList;
          let item = {
            orgName: "全部",
            orgCode: "",
          };
          optionsReg.unshift(item);
          this.optionsReg = optionsReg;
          // this.getForm.orgName=optionsReg[0].orgName
          for (let i in records) {
            records[i].taskAllStar = Number(records[i].taskAllStar);
          }
          this.changeDatMa(records);
          this.tableBasicsa = records;
          this.total = data.data.formTotalVOPage.total;
        }
      });
    },
  },
};
</script>

<style lang="less" >
@import url("../../assets/utils.less");
.adminc {
  .width-auto();
  .flex-form-p(6px,100%,32%);
  .button {
    // position: absolute;
    right: 18px;
    bottom: 0px;
  }
  .basi-a {
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