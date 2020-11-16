<template>
  <div class="minee">
    <div class="serach">
      <div class="serach-left">待审批绩效</div>
      <div class="serach-right"></div>
    </div>
    <div class="seach-form">
      <el-form ref="SearchFrom" :model="getForm" class="post-form">
        <div class="seach-flex">
          <!-- <el-form-item label="机构名称" label-width="80px" prop="orgName" class="form-chang">
            <el-select
              v-model="getForm.orgName"
              placeholder="请选择机构名称"
              size="mini"
              @change="changDimens('name',$event)"
            >
              <el-option
                v-for="item in optionsName"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>-->
          <el-form-item
            label="考核对象"
            style="display: flex"
            prop="userName"
            class="form-chang"
            label-width="100px"
          >
            <el-input
              size="mini"
              v-model="getForm.userName"
              placeholder="请输入考核对象"
              @keyup.enter.native="serchClickF"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="绩效月份"
            style="display: flex"
            prop="formDate"
            class="data-form-inpu"
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
            label-width="50px"
          >
            <el-select
              v-model="getForm.status"
              placeholder="请选择状态"
              size="mini"
              @change="changDimens('status', $event)"
            >
              <el-option
                v-for="item in optionsReg"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <!-- <el-form-item label="考核主体" label-width="80px" prop="subjectName">
            <el-input size="mini" v-model="getForm.subjectName" placeholder="请输入考核主体"></el-input>
          </el-form-item>-->

          <!-- <el-form-item label="考核对象" label-width="80px" prop="userName">
            <el-input size="mini" v-model="getForm.userName" placeholder="请输入考核对象"></el-input>
          </el-form-item>-->
        </div>
        <div class="button" v-if="hasQx('aph2_pfm_DSPJXCX-QX-C19')">
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
        <el-table-column
          prop="orgName"
          label="所属考核机构名称"
        ></el-table-column>
        <el-table-column
          prop="departmentName"
          label="考核对象所属部门名称"
        ></el-table-column>
        <el-table-column
          prop="userName"
          label="考核对象名称"
          width="120px"
        ></el-table-column>

        <el-table-column
          prop="formType"
          label="表单类型"
          width="120px"
        ></el-table-column>

        <el-table-column
          prop="userRole"
          label="考核对象角色"
          width="120px"
        ></el-table-column>
        <el-table-column
          prop="status"
          label="绩效状态"
          width="200px"
        ></el-table-column>
        <el-table-column
          prop="formDate"
          label="绩效日期"
          width="120px"
        ></el-table-column>
        <!-- <el-table-column prop="subjectName" label="考核主体名称"></el-table-column>
        <el-table-column prop="createDate" label="创建日期"></el-table-column>
        <el-table-column prop="kpiScore" label="绩效系数"></el-table-column>
        <el-table-column prop="taskAllScore" label="任务综合评分"></el-table-column>-->
        <el-table-column label="操作" class="active-com" width="120px">
          <template slot-scope="scope">
            <el-button type="text" @click="modeClick(scope.row)"
              >查看详情</el-button
            >
          </template>
        </el-table-column>
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
      sessid: sessionStorage.getItem("sso_sessionid"),
      currentPage: 1,
      total: 1,
      basicsForm: {},
      importDate: "",
      optionsReg: baseVar.optionsRegS,
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
    if (this.$store.state.changDm == "") {
      var myDate = new Date();
      var tYear = myDate.getFullYear();
      var tMonth = myDate.getMonth();
      var m = tMonth + 1;
      if (m.toString().length == 1) {
        m = "0" + m;
      }
      this.getForm.formDate = tYear + "-" + m;
    } else {
      this.getForm.formDate = this.$store.state.changDm;
    }
  },
  mounted() {
    this.$store.commit("modifyindexSi", "3-6");
    let sessid = this.sessid;
    this.getclick();
  },
  components: {
    Pagination,
  },
  methods: {
    hasQx(value) {
      return this.commonFn.hasQx(value, this);
    },
    changDm(e) {
      this.getForm.formDate = e;
      this.$store.commit("getchangDm", e);
    },
    modeClick(data) {
      this.$store.commit("getformUserCode", data.formUserCode);
      if (data.formType == "普通表单" && this.$route.path == "/minee") {
        //普通表单
        this.$router.push({
          path: "/mineform",
          query: {
            type: "dai",
          },
        });
      } else if (
        data.formType == "满意度表单" &&
        this.$route.path == "/minee"
      ) {
        this.$store.commit("getokDateCode", data.formCode);
        this.$store.commit("getokDate", data.formDate);
        this.$router.push({
          path: "/satiform",
          query: {
            type: "dai",
          },
        });
      } else if (
        data.formType == "普通表单" &&
        this.$route.path == "/kpiPend"
      ) {
        //普通表单
        this.$router.push({
          path: "/kpimineform",
          query: {
            type: "dai",
          },
        });
      } else if (
        data.formType == "满意度表单" &&
        this.$route.path == "/kpiPend"
      ) {
        this.$store.commit("getokDateCode", data.formCode);
        this.$store.commit("getokDate", data.formDate);
        this.$router.push({
          path: "/kpisatiform",
          query: {
            type: "dai",
          },
        });
      }
    },
    changDimens(type, e) {
      var that = this;
      if (type == "name") {
        that.optionsName.map((item, i) => {
          // if (item.formCode == e) {
          //   that.basicsForm.formCode = item.formCode;
          // }
        });
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
      (this.getForm = {
        orgName: "",
        formDate: "",
        status: "",
        subjectName: "",
        userName: "",
      }),
        (this.currentPage = 1);
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
        // pageSize: 10,
        page: this.currentPage,
        orgName: datas.orgName,
        formDate: datas.formDate,
        status: datas.status,
        userName: datas.userName,
      };
      this.api.getPendingApprovalTask(sessid, params).then((res) => {
        // console.log(res)
        let data = res.data;
        if (data.status == 200) {
          let records = data.data.records;
          this.changeDatMa(records);
          this.tableBasicsa = records;
          this.total = data.data.total;
        }
      });
    },
  },
};
</script>

<style lang="less" >
@import url("../../assets/utils.less");
.minee {
  .width-auto();
  .flex-form-p(6px,100%,30%);
  .form-chang {
    .el-form-item__content {
      width: calc(100% - 80px);
      .el-select {
        width: 100%;
      }
      // margin-left: 0 !important;
    }
  }
  .post-form {
    position: relative;
  }
  

  // .seach-flex {
  //   display: flex;
  //   width: 100%;
  //   flex-wrap: wrap;
  //   .el-form-item {
  //     // width: 18%;
  //   }
  // }
  .button {
    position: absolute;
    right: 18px;
    bottom: 5px;
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