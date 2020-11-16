<template>
  <div class="adminp">
    <div class="serach">
      <div class="serach-left">组织绩效查询</div>
      <div class="serach-right"></div>
    </div>
    <div class="seach-form">
      <el-form ref="SearchFrom" :model="getForm" class="flex-form">
        <div class="seach-flex">
          <el-form-item
            label="机构名称"
            label-width="80px"
            prop="orgName"
            class="form-chang"
          >
            <el-input
              size="mini"
              v-model="getForm.orgName"
              placeholder="请输入机构名称"
              @keyup.enter.native="serchClickF"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="绩效月份"
            style="display: flex"
            prop="formDate"
            class="form-date-p data-form-inpu"
          >
            <el-date-picker
              size="mini"
              v-model="getForm.formDate"
              type="month"
              placeholder="请选择绩效月份"
              @change="changDm"
              value-format="yyyy-MM"
            ></el-date-picker>
          </el-form-item>

          <el-form-item
            label="绩效状态"
            label-width="150px"
            prop="status"
            class="form-date-p data-form-inpu"
          >
            <el-select
              v-model="getForm.status"
              placeholder="请选择绩效状态"
              size="mini"
              @change="changDimens"
              filterable
              remote
            >
              <el-option
                v-for="item in optionsReg"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="button" v-if="hasQx('aph2_pfm_ZZJXCXCX-QX-M11')">
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

    <div class="seach-form">
      <el-table :data="tableBasicsa" border style="width: 100%">
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column label="序号" width="60" type="index"></el-table-column>

        <el-table-column prop="orgName" label="机构名称" class="active-com">
          <template slot-scope="scope" class="active-com">
            <span @click="goNexX(scope.row)" class="active-com">{{
              scope.row.orgName
            }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="checkerName"
          label="责任人"
          width="120px"
        ></el-table-column>

        <el-table-column prop="status" label="绩效状态" width="200px">
          <template slot-scope="scope" class="active-com">
            <span> {{ scope.row.status }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="formDate" label="绩效日期" width="120px">
          <template slot-scope="scope" class="active-com">
            <span> {{ scope.row.formDate }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
// import searPage from "../../components/searPage";

export default {
  inject: ["reload"],
  data() {
    return {
      tableBasicsa: [],
      sessid: sessionStorage.getItem("sso_sessionid"),
      optionsReg: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "APPROVAL_NOTIMPORT",
          label: "待导入得分",
        },
        {
          value: "APPROVAL_IMPORTED",
          label: "已导入得分，待调整",
        },
        {
          value: "APPROVAL_ADJUSTED",
          label: "已调整",
        },
      ],
      multipleSelection: [],
      getForm: {
        formDate: "",
        orgName: "",
        status: "",
      },
    };
  },
  // components: {
  //   searPage,
  // },
  created() {
    if (this.$store.state.adminpchangDm == "") {
      var myDate = new Date();
      var tYear = myDate.getFullYear();
      var tMonth = myDate.getMonth();
      var m = tMonth + 1;
      if (m.toString().length == 1) {
        m = "0" + m;
      }
      this.getForm.formDate = tYear + "-" + m;
    } else {
      this.getForm.formDate = this.$store.state.adminpchangDm;
    }
  },
  mounted() {
    this.$store.commit("modifyindexSi", "3-5");
    this.getclick();
  },
  methods: {
    changDm(e) {
      this.getForm.formDate = e;
      this.$store.commit("getadminpchangDm", e);
    },
    hasQx(value) {
      return this.commonFn.hasQx(value, this);
    },
    goNexX(data) {
      let datas = {
        orgCode: data.orgCode,
        orgName: data.orgName,
      };
      this.$store.commit("getcodeName", datas);
      if (this.$route.path == "/adminp") {
        this.$router.push({
          path: "/admine",
          query: {
            type: "look",
          },
        });
      } else if (this.$route.path == "/kpiorgan") {
        this.$router.push({
          path: "/kpicoef",
          query: {
            type: "look",
          },
        });
      }
    },
    changDimens(e) {
      // this.optionsReg.map((item, i) => {
      //   if (item.formCode == e) {
      //     form.formCode = item.formCode;
      //     form.formName = item.formName;
      //   }
      // });
    },
    getFormModelList() {
      let sessid = this.sessid;
      // let datas = this.basicsForm.objectRole;
      // this.api.getFormModelList(sessid, datas).then((res) => {
      //   if (res.data.status == 200) {
      //     this.optionsReg = res.data.data;
      //   }
      // });
    },

    serchClickF() {
      this.getclick();
    },
    resetClickF() {
      this.getForm = {
        formDate: "",
        orgName: "",
        status: "",
      };
      this.$refs.SearchFrom.resetFields();
      this.getclick();
    },

    getclick() {
      let sessid = this.sessid;
      let params = {
        formDate: this.getForm.formDate,
        orgName: this.getForm.orgName,
        status: this.getForm.status,
      };
      // this.tableBasicsa = [
      // ];
      this.api.getOrgApprovalList(sessid, params).then((res) => {
        // console.log(data);
        if (res.data.status == 200) {
          let data = res.data.data;
          data.map((item, i) => {
            // console.log();
            if (item.status == "APPROVAL_NOTIMPORT") {
              item.status = "待导入得分";
            } else if (item.status == "APPROVAL_IMPORTED") {
              item.status = "已导入得分，待调整";
            } else if (item.status == "APPROVAL_ADJUSTED") {
              item.status = "已调整";
            }
          });
          this.tableBasicsa = data;
        }
      });
    },
  },
};
</script>

<style lang="less" >
@import url("../../assets/utils.less");

.adminp {
.flex-form-p();
 
  .width-auto();
  // background: #ffffff;
  .el-button--text {
    color: @color3;
    font-size: 13px !important;
  }

  .width-auto();
  .seach-flex {
    .flex();
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
  .form-date-p {
    .el-input--prefix .el-input__inner {
      padding-left: 30px !important;
    }
  }
}
</style>