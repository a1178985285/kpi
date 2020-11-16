<template>
  <div class="basicse">
    <div class="serach">
      <div class="serach-left">组织绩效导入</div>
      <div class="serach-right">
        <div>
          <el-button
            type="danger"
            size="mini"
            v-if="hasQx('aph2_pfm_ZZJXQR-QX-C30')"
            @click="modeClick('ok')"
            :disabled="isbuttons"
            >确认</el-button
          >
          <el-button
            type="primary"
            size="mini"
            v-if="hasQx('aph2_pfm_ZZJXDR-QX-C22')"
            @click="modeClick('impor')"
            >导入</el-button
          >
          <el-button
            type="primary"
            size="mini"
            v-if="hasQx('aph2_pfm_ZZJXDC-QX-C45')"
            @click="modeClick('expor')"
            >导出</el-button
          >
        </div>
      </div>
    </div>
    <div class="seach-form">
      <el-form ref="SearchFrom" :model="getForm" class="flex-form">
        <div class="seach-flex">
          <el-form-item
            label="机构名称"
            style="display: flex"
            prop="companyName"
          >
            <el-input
              size="mini"
              v-model="getForm.orgName"
              placeholder="请输入机构名称"
              @keyup.enter.native="serchClickF('react')"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="查询日期"
            style="display: flex"
            class="data-form-inpu"
            prop="companyName"
          >
            <el-date-picker
              size="mini"
              v-model="getForm.selectDate"
              type="month"
              placeholder="请选择查询日期"
              @change="changDm"
              value-format="yyyy-MM"
            ></el-date-picker>
          </el-form-item>
        </div>

        <div class="button">
          <div>
            <el-button
              size="mini"
              @click="resetClickF"
              v-if="hasQx('aph2_pfm_ZZJXCX-QX-C19')"
              >重置</el-button
            >
          </div>
          <div>
            <el-button
              size="mini"
              type="danger"
              @click="serchClickF('react')"
              color="red"
              v-if="hasQx('aph2_pfm_ZZJXCX-QX-C19')"
            >
              查询</el-button
            >
          </div>
        </div>
      </el-form>
    </div>

    <div class="seach-form">
      <el-table :data="tableBasicsa" border style="width: 100%">
        <el-table-column label="序号" width="60" type="index"></el-table-column>
        <el-table-column prop="orgName" label="机构名称"></el-table-column>
        <el-table-column
          width="120px"
          v-for="(item, index) in tableList"
          :key="index"
          :prop="item.dimensionCode"
          :label="item.dimensionName"
        ></el-table-column>
        <el-table-column
          prop="status"
          label="绩效得分状态"
          width="120px"
        ></el-table-column>
      </el-table>
    </div>

    <el-dialog
      title="导入"
      :visible="importvisible"
      width="30%"
      class="impor-log"
      :showClose="false"
    >
      <div class="impo-l">
        <div class="impo-l-title">模板下载</div>
        <el-button
          type="primary"
          size="mini"
          @click="muClick"
          :disabled="isbuttonsTwo"
          >模板下载</el-button
        >
      </div>
      <div class="impo-l">
        <div class="impo-l-title">上传文件</div>
        <el-upload
          class="upload-demo"
          ref="upload"
          :action="uploadAction"
          :on-success="successClick"
          :file-list="fileList"
          :auto-upload="false"
          :data="importDateObj"
          :limit="1"
          :before-upload="beforeAvatarUpload"
        >
          <el-button slot="trigger" size="mini" type="primary"
            >选取文件</el-button
          >
        </el-upload>
      </div>
      <div class="impo-l">
        <span style="color: red; margin: auto 0 auto -6px">*</span>
        <div class="impo-l-title">绩效日期</div>
        <el-date-picker
          @change="changeDate"
          :clearable="true"
          size="mini"
          v-model="importDate"
          type="month"
          placeholder="请选择查询日期"
          value-format="yyyy-MM"
        ></el-date-picker>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="importvisible = false" size="mini">取 消</el-button>
        <el-button type="danger" @click="exporClick" size="mini"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import base from "../../api/base";
export default {
  inject: ["reload"],
  data() {
    return {
      tableBasicsa: [],
      setTimes: null,
      setTimesTwo: null,
      fileList: [],
      tableList: [],
      importvisible: false,
      isbuttons: false,
      isbuttonsTwo: false,
      sessid: sessionStorage.getItem("sso_sessionid"),
      basicsForm: {},
      uploadAction:
        base.headerUrl +
        "pfm.firstcare.com.cn/base/importORGRelation" +
        "?sso_sessionid=" +
        sessionStorage.getItem("sso_sessionid") +
        "&selectDate=",

      importDate: "",
      importDateObj: {},
      getForm: {
        orgName: "",
        selectDate: "",
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
    if (this.$store.state.basicscchangDm == "") {
      var myDate = new Date();
      var tYear = myDate.getFullYear();
      var tMonth = myDate.getMonth();
      var m = tMonth + 1;
      if (m.toString().length == 1) {
        m = "0" + m;
      }
      this.getForm.selectDate = tYear + "-" + m;
    } else {
      this.getForm.selectDate = this.$store.state.basicscchangDm;
    }
  },

  beforeDestroy() {
    clearInterval(this.setTimes);
    this.setTimes = null;
    clearInterval(this.setTimesTwo);
    this.setTimesTwo = null;
  },
  mounted() {
    this.$store.commit("modifyindexSi", "2-2");
    let sessid = this.sessid;
    this.getclick();
  },
  methods: {
    hasQx(value) {
      return this.commonFn.hasQx(value, this);
    },
    changDm(e) {
      this.getForm.selectDate = e;
      this.$store.commit("getbasicscchangDm", e);
    },
    changeDate(event) {
      this.uploadAction =
        base.headerUrl +
        "pfm.firstcare.com.cn/base/importORGRelation" +
        "?sso_sessionid=" +
        sessionStorage.getItem("sso_sessionid") +
        "&selectDate=" +
        event;
    },
    bolo(res) {
      let blob = new Blob([res], {
        type: "application/vnd.ms-excel;charset=utf-8",
      });
      var name = res.fileName;
      // 兼容ie
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        //ie&&edge
        window.navigator.msSaveOrOpenBlob(blob, name);
      } else {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = name;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    },

    beforeAvatarUpload(file) {
      this.uploadAction =
        base.headerUrl +
        "pfm.firstcare.com.cn/base/importORGRelation" +
        "?sso_sessionid=" +
        this.sessid +
        "&selectDate=" +
        this.getForm.selectDate;
      // file.type == "image/jpeg" ||
      //       file.type == "image/png" ||
      //       file.type == "image/jpg"
      if (
        file.type == "application/vnd.ms-excel" ||
        file.type ==
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
      } else {
        this.$message.error("请上传正确的文件形式!");
        return false;
      }

      if (file.size >= 52428800) {
        this.$message.error("文件大小不能大于50MB");
        return false;
      }
    },

    successClick(res, file, fileList) {
      if (res.status == 200) {
        this.$message({
          type: "success",
          message: "导入成功!",
        });

        this.reload();
        this.importvisible = false;
      } else {
        this.fileList = [];
        this.$message({
          type: "error",
          message: res.msg,
          dangerouslyUseHTMLString: true,
          duration: "5000",
        });
      }
    },
    muClick() {
      this.isbuttonsTwo = true;

      location.href =
        base.headerUrl +
        "pfm.firstcare.com.cn/base/exportORGRelationModel?sso_sessionid=" +
        this.sessid;
      this.setTimesTwo = setTimeout(() => {
        this.isbuttonsTwo = false;
      }, 5000);
      // let sessid = this.sessid;
      // this.api.exportORGRelationModel(sessid).then((res) => {
      //   console.log(res.data);
      //   if(res.status==200){
      //       this.bolo(res.data)
      //       this.$message.success("下载成功")
      //   }
      // });
    },
    exporClick() {
      if (this.importDate == "") {
        this.$message({
          type: "error",
          message: "请选择绩效日期!",
        });
        return false;
      }

      this.$refs.upload.submit();
    },
    serchClickF() {
      this.getclick();
    },
    resetClickF() {
      this.getForm.orgName = "";
      this.getForm.selectDate = "";
      this.$refs.SearchFrom.resetFields();
      // this.getclick();
    },
    //导出
    modeClick(type) {
      let sessid = this.sessid;
      this.importDate = "";
      if (type == "expor") {
        this.$confirm("是否导出该数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          let sessid = this.sessid;
          let params = {
            orgName: this.getForm.orgName,
            selectDate: this.getForm.selectDate,
          };
          location.href =
            base.headerUrl +
            "pfm.firstcare.com.cn/base/exportORGRelationData?orgName=" +
            params.orgName +
            "&selectDate=" +
            params.selectDate;
        });
      } else if (type == "impor") {
        this.importvisible = true;
        this.fileList = [];
      } else if (type == "ok") {
        this.isbuttons = true;
        this.setTimes = setTimeout(() => {
          this.isbuttons = false;
        }, 5000);
        let pdDate = this.getForm.selectDate;
        this.api.confirmOrgScore(sessid, pdDate).then((res) => {
          if (res.data.status == 200) {
            this.$message.success("操作成功")
            this.getclick();
            // this.reload();
          }
        });
      }
    },

    getclick() {
      let sessid = this.sessid;
      let params = {
        orgName: this.getForm.orgName,
        selectDate: this.getForm.selectDate,
      };
      this.api.getRelationDimensionList(sessid, params).then((res) => {
        let data = res.data;

        if (data.status == 200) {
          let orgList = data.data.orgList;
          let dnList = data.data.dnList;
          this.tableList = dnList;

          for (let i in orgList) {
            if (orgList[i].status == "Y") {
              orgList[i].status = "已确认";
            } else {
              orgList[i].status = "未确认";
            }
            for (let j in dnList) {
              if (orgList[i][dnList[j].dimensionCode] == undefined) {
                orgList[i][dnList[j].dimensionCode] = 0;
              }
            }
          }
          this.tableBasicsa = orgList;
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