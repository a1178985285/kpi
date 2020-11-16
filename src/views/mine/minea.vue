<template>
  <div class="basicse">
    <div class="serach">
      <div class="serach-left">我的绩效</div>
      <div class="serach-right">
        <!-- <el-button type="primary" @click="testClick">测试按钮有</el-button> -->
      </div>
    </div>
    <div class="seach-form">
      <el-form ref="SearchFrom" :model="getForm" class="flex-form">
        <div class="seach-flex">
          <el-form-item label="查询日期"  class="data-form-inpu" style="display: flex" prop="formDate">
            <el-date-picker
              size="mini"
              v-model="getForm.formDate"
             @change="changDm" 
              type="month"
              placeholder="请选择查询日期"
              value-format="yyyy-MM"
            ></el-date-picker>
          </el-form-item>
        </div>

        <div class="button">
          <div>
            <el-button size="mini" @click="resetClickF">重置</el-button>
          </div>
          <div>
            <el-button size="mini" type="danger" @click="serchClickF('react')" color="red">查询</el-button>
          </div>
        </div>
      </el-form>
    </div>

    <div class="seach-form">
      <el-table :data="tableBasicsa" border style="width: 100%">
        <el-table-column label="序号" width="60" type="index"></el-table-column>
<el-table-column prop="connectSubject" label="绩效反馈"></el-table-column>
          <el-table-column label="星级" class="active-com" width="130">
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

         <el-table-column label="系数" class="active-com" width="120px">
          <template slot-scope="scope">
             {{scope.row.kpiScore}} 
          </template>
        </el-table-column>

        <el-table-column prop="formDate" label="绩效月份"  width="120px"></el-table-column>
        <el-table-column prop="status" label="绩效状态"   width="200px"></el-table-column>

        <el-table-column label="操作" class="active-com" width="120px">
          <template slot-scope="scope">
            <el-button type="text" @click="modeClick(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="formName" label="绩效表单名称"></el-table-column>
        <el-table-column prop="standardName" label="流程与标准化名称"></el-table-column>
        <el-table-column prop="objectUserName" label="考核对象中文名"></el-table-column>
        <el-table-column prop="formType" label="用户绩效表单类型"></el-table-column>
        <el-table-column prop="formLeve" label="表单级别"></el-table-column>
      
        <el-table-column prop="ruleDes" label="规则说明"></el-table-column>
        <el-table-column prop="examineDes" label="考核说明"></el-table-column>
        <el-table-column prop="connectObject" label="考核对象绩效沟通"></el-table-column>
        <el-table-column prop="connectSubject" label="考核主体绩效沟通"></el-table-column>
        <el-table-column prop="applyContent" label="是否特别申请内容"></el-table-column>
        <el-table-column prop="createdDate" label="填表日期"></el-table-column>
        <el-table-column prop="status" label="表单状态"></el-table-column> 
        -->
      </el-table>
    </div>
    <Pagination :currentPage="currentPage" :total="total" @changePage="changePage"></Pagination>
  </div>
</template>

<script>
import base from "../../api/base";
import Pagination from "../../components/pagination";
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
      importDate: "",
      getForm: {
        formDate: "",
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
  // created() {
  //   var myDate = new Date();
  //   var tYear = myDate.getFullYear();
  //   var tMonth = myDate.getMonth();
  //   var m = tMonth + 1;
  //   if (m.toString().length == 1) {
  //     m = "0" + m;
  //   }
  //   this.getForm.formDate = tYear + "-" + m;
  // },

    created() {
    if (this.$store.state.mineachangDm == "") {
      var myDate = new Date();
      var tYear = myDate.getFullYear();
      var tMonth = myDate.getMonth();
      var m = tMonth + 1;
      if (m.toString().length == 1) {
        m = "0" + m;
      }
      this.getForm.formDate = tYear + "-" + m;
    } else {
      this.getForm.formDate = this.$store.state.mineachangDm;
    }
  },
  mounted() {
    this.$store.commit("modifyindexSi", "4-1");
    let sessid = this.sessid;
    this.getclick();
  },
  components: {
    Pagination,
  },
  methods: {
    // testClick(){
    //   console.log('关闭按钮')
    //   this.$router.push()
    // },
    changDm(e) {
      this.getForm.formDate = e;
      this.$store.commit("getmineachangDm", e);
    },
    modeClick(data) {
      // console.log(data)
      this.$store.commit("getformUserCode", data.formUserCode);
      if (data.formType == "普通表单" && this.$route.path == "/minea") {
        //普通表单
        this.$router.push({
          path: "/mineform",
           query: {
            type: "me",
          },
        });
  
      } else if (data.formType == "满意度表单" && this.$route.path == "/minea") {
        this.$router.push({
          path: "/satiform",
          query: {
            type: "me",
          },
        });
      }else if(data.formType == "普通表单" && this.$route.path == "/kpime"){
 //普通表单
        this.$router.push({
          path: "/kpimineform",
           query: {
            type: "me",
          },
        });
      }else if(data.formType == "满意度表单" && this.$route.path == "/kpime"){
         this.$router.push({
          path: "/kpisatiform",
          query: {
            type: "me",
          },
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
        formDate: "",
      };
   this.currentPage = 1;
      this.$refs.SearchFrom.resetFields();
      this.getclick();
    },
    getclick() {
      let sessid = this.sessid;
      let datas = JSON.parse(JSON.stringify(this.getForm.formDate));
      if (datas == null) {
        datas = "";
      }
      let params = {
        pageSize: this.$store.state.pageSize,
        page: this.currentPage,
        formDate: datas,
      };
      this.api.getMyPerformance(sessid, params).then((res) => {
        let data = res.data;
        if (res.data.status == 200) {
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
.basicse {
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
}
</style>