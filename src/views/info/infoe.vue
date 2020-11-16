<template>
  <div class="infoe">
    <div class="serach">
      <div class="serach-left">绩效考核时间设置</div>
      <div class="serach-right">
        <!-- <div>
          <el-button type="danger" size="mini" @click="modeClick('add')">新增</el-button>
        </div> -->
      </div>
    </div>
    <div class="seach-form">
      <el-table :data="tableBasicsa" border style="width: 100%">
        <el-table-column label="序号" width="60" type="index"></el-table-column>

        <el-table-column
          prop="timedName"
          label="定时任务名称"
        ></el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="60"
        ></el-table-column>

        <!-- <el-table-column prop="cronExpression" label="cron表达式"></el-table-column> -->

        <el-table-column
          prop="timedStartDate"
          label="开始日期"
          width="130"
        ></el-table-column>
        <el-table-column
          prop="timedEndDate"
          label="结束日期"
          width="130"
        ></el-table-column>
        <el-table-column prop="description" label="任务描述"></el-table-column>
        <el-table-column
          prop="createdDate"
          label="创建时间"
          width="130"
        ></el-table-column>
        <el-table-column label="操作" class="active-com" width="140">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="modeClick('mode', scope.row)"
              v-if="hasQx('aph2_pfm_KHSJXG-QX-C14')"
              >修改</el-button
            >
            <el-button
              type="text"
              @click="modeClick('qi', scope.row)"
              v-if="hasQx('aph2_pfm_KHSJQYJY-QX-C16')"
              >启用</el-button
            >
            <el-button
              type="text"
              @click="modeClick('dele', scope.row)"
              v-if="hasQx('aph2_pfm_KHSJQYJY-QX-C16')"
              >禁用</el-button
            >

            <el-button
              type="text"
              @click="modeClick('go', scope.row)"
              v-if="hasQx('aph2_pfm_KHSJZX-QX-C62')"
              >立即执行</el-button
            >

          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      title="绩效考核时间修改"
      :visible="dialogFormVisible"
      :showClose="false"
    >
      <el-form
        :model="basicsForm"
        :rules="searchFrom"
        ref="searchFrom"
        class="basicsForm-felx"
      >
        <el-form-item label="定时任务名称" label-width="120px" prop="timedName">
          <el-input
            v-model="basicsForm.timedName"
            size="mini"
            placeholder="请输入定时任务名称"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="定时任务描述"
          label-width="120px"
          prop="description"
        >
          <el-input
            v-model="basicsForm.description"
            size="mini"
            placeholder="请输入定时任务描述"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="任务分组"
          label-width="120px"
          prop="jobGroup"
          v-if="isAdd"
        >
          <el-input
            v-model="basicsForm.jobGroup"
            size="mini"
            placeholder="请输入任务分组"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="类路径"
          label-width="120px"
          prop="beanClass"
          v-if="isAdd"
        >
          <el-input
            v-model="basicsForm.beanClass"
            size="mini"
            placeholder="请输入类路径"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="开始日期"
          label-width="120px"
          prop="createDate"
          class="picker-data"
        >
          <el-select
            v-model="basicsForm.createDate"
            placeholder="请输入开始日期"
            size="mini"
            filterable
               remote
          >
            <el-option
              v-for="item in optionsReg"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="开始时间"
          label-width="120px"
          prop="createTime"
          class="picker-data"
        >
          <el-time-picker
            size="mini"
            v-model="basicsForm.createTime"
            value-format="HH:mm"
            format="HH:mm"
            placeholder="选择开始时间"
          ></el-time-picker>
        </el-form-item>

        <el-form-item
          label="结束日期"
          label-width="120px"
          prop="endDate"
          class="picker-data"
        >
          <el-select
            v-model="basicsForm.endDate"
            placeholder="请选择结束日期"
            size="mini"
            filterable
               remote
          >
            <el-option
              v-for="item in optionsReg"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="结束时间"
          label-width="120px"
          prop="endTiem"
          class="picker-data"
        >
          <el-time-picker
            size="mini"
            v-model="basicsForm.endTiem"
            value-format="HH:mm"
            format="HH:mm"
            placeholder="选择结束时间"
          ></el-time-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelClick" size="mini">取 消</el-button>
        <el-button type="danger" @click="goClick('searchFrom')" size="mini"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableBasicsa: [],
      basicsForm: {},
      createTime: "",
      endTiem: "",
      createDate: "",
      endDate: "",
      isAdd: false,
      optionsReg: [],
      dialogFormVisible: false,
      sessid: sessionStorage.getItem("sso_sessionid"),
      searchFrom: {
        timedName: [
          { required: true, message: "请输入定时任务名称", trigger: "blur" },
        ],

        endTiem: [
          { required: true, message: "请输入结束时间", trigger: "change" },
        ],
        createTime: [
          { required: true, message: "请输入开始时间", trigger: "change" },
        ],
        createDate: [
          { required: true, message: "请输入开始日期", trigger: "change" },
        ],
        endDate: [
          { required: true, message: "请输入结束日期", trigger: "change" },
        ],
      },
    };
  },
  mounted() {
    // this.$store.commit("modifyindexSi", "1-3");
    let sessid = this.sessid;
    // getRelationSetList
    // this.api.getRelationSetList(sessid).then((res) => {
    //   let data = res.data;
    //   if (data.status == 200) {
    //     this.tableBasicsa = data.data;
    //   }
    // });

    let arroptionsReg = [];
    for (let i = 1; i <= 31; i++) {
      let item = {
        value: i,
        label: i,
      };
      arroptionsReg.push(item);
    }

    this.optionsReg = arroptionsReg;
    this.getclick();
  },
  methods: {
    hasQx(value) {
      return this.commonFn.hasQx(value, this);
    },
    cancelClick() {
      this.dialogFormVisible = false;
      this.$refs.searchFrom.resetFields();
    },
    goClick(searchFrom) {
      let sessid = this.sessid;
      let data = JSON.parse(JSON.stringify(this.basicsForm));
      let params = {
        timedName: data.timedName,
        description: data.description,
        status: data.status,
        timedId: data.timedId,
        timedCode: data.timedCode,
        timedStartDate: data.createDate + "," + data.createTime,
        timedEndDate: data.endDate + "," + data.endTiem,
        jobGroup: data.jobGroup,
        beanClass: data.beanClass,
      };
      if (!data.status) {
        params.status = "Y";
      }

      // if (!data.status) {
      //   params.status = "Y";
      // }
      // if (!data.status) {
      //   params.status = "Y";
      // }
      this.$refs[searchFrom].validate((valid) => {
        this.api.insertOrUpdateFormTime(sessid, params).then((res) => {
          if (res.data.status == 200) {
            this.$message.success("保存成功");
            this.dialogFormVisible = false;
            this.getclick();
          }
        });
      });
    },
    modeClick(type, data) {
      let sessid = this.sessid;
      if (type == "add") {
        this.dialogFormVisible = true;
        this.isAdd = true;
      } else if (type == "mode") {
        this.isAdd = false;
        let timedId = data.timedId;

        this.dialogFormVisible = true;
        this.api.getTimedPlanDetail(sessid, timedId).then((res) => {
          if (res.data.status == 200) {
            let datas = res.data.data;
            //  timedStartDate: data.createDate + "," + data.createTime,
            //         timedEndDate: data.endDate + "," + data.endTiem,
            if (datas.timedStartDate !== null || datas.timedStartDate !== "") {
              datas.createDate = datas.timedStartDate.split(",")[0];
              datas.createTime = datas.timedStartDate.split(",")[1];
            }
            if (datas.timedEndDate !== null || datas.timedEndDate !== "") {
              datas.endDate = datas.timedEndDate.split(",")[0];
              datas.endTiem = datas.timedEndDate.split(",")[1];
            }

            this.basicsForm = datas;
            // this.basicsForm.createDate
          }
        });
      } else if (type == "go") {
        let timedId = data.timedId;
        this.$confirm("是否立即执行", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.api.runJobNow(sessid, timedId).then((res) => {
              if (res.data.status == 200) {
                this.$message.success("操作成功");
              } else {
                this.$message.error("操作失败");
              }
            });
          })
          .catch(() => {});
      } else if (type == "qi") {
        let timedId = data.timedId;
        this.api.addJob(sessid, timedId).then((res) => {
          if (res.data.status == 200) {
            this.$message.success("操作成功");
            this.getclick();
          } else {
            this.$message.error("操作失败");
          }
        });
      } else if (type == "dele") {
        let timedId = data.timedId;
        this.api.deleteJob(sessid, timedId).then((res) => {
          if (res.data.status == 200) {
            this.$message.success("操作成功");
            this.getclick();
          } else {
            this.$message.error("操作失败");
          }
        });
      }
    },

    getclick() {
      let sessid = this.sessid;
      // getRelationSetList
      this.api.getTimedPlanList(sessid).then((res) => {
        let data = res.data;
        if (data.status == 200) {
          let tableBasicsa = data.data;
          for (let i in tableBasicsa) {
            if (tableBasicsa[i].status == "Y") {
              tableBasicsa[i].status = "是";
            } else if (tableBasicsa[i].status == "N") {
              tableBasicsa[i].status = "否";
            }
            if (tableBasicsa[i].createdDate) {
              tableBasicsa[i].createdDate = tableBasicsa[
                i
              ].createdDate.substring(0, 10);
            }

            if (tableBasicsa[i].timedStartDate) {
              tableBasicsa[i].timedStartDate =
                "每月" + tableBasicsa[i].timedStartDate.replace(",", "日");
            }
            if (tableBasicsa[i].timedEndDate) {
              tableBasicsa[i].timedEndDate =
                "每月" + tableBasicsa[i].timedEndDate.replace(",", "日");
            }
          }
          this.tableBasicsa = data.data;
        }
      });
    },
  },
};
</script>

<style lang="less" >
@import url("../../assets/utils.less");

.infoe {
  .width-auto();
  .is-active {
    background-color: #f5f7fa !important;
  }
  .basicsForm-felx {
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      width: 30% !important;
    }
    .picker-data {
      .el-form-item__content {
        width: calc(100% - 120px) !important;
      }
      .el-input {
        width: 100% !important;
      }
    }
  }
  .basi-a {
    .flex();
    .el-dialog__body {
      padding: 10px !important ;
    }
    .el-form-item {
      margin: 0 !important;
    }
  }
}
</style>