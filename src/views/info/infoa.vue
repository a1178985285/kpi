<template>
  <div class="basicsa">
    <div class="serach">
      <div class="serach-left">绩效等级设置</div>
      <div class="serach-right">
        <div>
          <el-button type="danger" size="mini" @click="modeClick('add')"    v-if="hasQx('aph2_pfm_DJXZ-QX-C11')">新增</el-button>
        </div>
      </div>
    </div>
    <div class="seach-form">
      <el-table :data="tableBasicsa" border style="width: 100%">
        <el-table-column label="序号" width="60" type="index"></el-table-column>

        <el-table-column prop="leveName" label="级别名称"></el-table-column>
        <el-table-column prop="modulusLeve" label="系数等级"></el-table-column>
        <el-table-column prop="modulusValue" label="系数值"></el-table-column>

        <el-table-column label="操作" class="active-com">
          <template slot-scope="scope">
            <el-button type="text" @click="modeClick(scope.row)"   v-if="hasQx('aph2_pfm_DJXG-QX-C14')">修改</el-button>
            <el-button type="text" @click="deleClick(scope.row)"   v-if="hasQx('aph2_pfm_DJSC-QX-C12')">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="绩效等级设置" :visible="dialogFormVisible" :showClose="false">
      <el-form :model="basicsForm" class="basi-a" :rules="searchFrom" ref="searchFrom">
        <el-form-item label="级别名称" label-width="80px" prop="leveName">
          <el-input v-model="basicsForm.leveName" size="mini" placeholder="请输入级别名称"></el-input>
        </el-form-item>
        <el-form-item label="绩效等级" label-width="120px" prop="modulusLeve">
          <el-select v-model="basicsForm.modulusLeve" placeholder="请选择绩效等级" size="mini" filterable
               remote>
            <el-option
              v-for="item in optionsReg"
              :key="item.value"
              :label="item.label"
              :value="item.value"
               
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="绩效值" label-width="120px " prop="modulusValue">
          <el-input v-model="basicsForm.modulusValue" size="mini" placeholder="请输入绩效值"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelClick" size="mini">取 消</el-button>
        <el-button type="danger" @click="goClick('searchFrom')" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableBasicsa: [],
      sessid: sessionStorage.getItem("sso_sessionid"),
      dialogFormVisible: false,
      basicsForm: {
        name: "",
      },
      searchFrom: {
        leveName: [
          { required: true, message: "请输入级别名称", trigger: "blur" },
        ],
        modulusLeve: [
          { required: true, message: "请输入绩效等级", trigger: "blur" },
        ],
        modulusValue: [
          { required: true, message: "请输入绩效值", trigger: "blur" },
        ],
      },
      optionsReg: [
        {
          value: "A",
          label: "A",
        },
        {
          value: "B",
          label: "B",
        },
        {
          value: "C",
          label: "C",
        },
        {
          value: "D",
          label: "D",
        },
          {
          value: "E",
          label: "E",
        },
      ],
    };
  },
  mounted() {
    this.$store.commit("modifyindexSi", "1-1");
    let sessid = this.sessid;
    // getRelationSetList
    // this.api.getRelationSetList(sessid).then((res) => {
    //   let data = res.data;
    //   if (data.status == 200) {
    //     this.tableBasicsa = data.data;
    //   }
    // });
    this.getclick();
  },
  methods: {
  hasQx(value) {
      return this.commonFn.hasQx(value, this);
    },
    cancelClick(){
 this.dialogFormVisible = false;
       this.$refs.searchFrom.resetFields();
    },
    goClick(searchFrom) {
      let sessid = this.sessid;
      let data = this.basicsForm;
      data.status = "Y";
      this.$refs[searchFrom].validate((valid) => {
        if (valid) {
          this.api.insertOrUpdateRelationSet(sessid, data).then((res) => {
            if (res.data.status == 200) {
              this.$message.success("保存成功")
              this.dialogFormVisible = false;
              this.getclick();
              this.$refs.searchFrom.resetFields();
            }
          });
        } else {
          return false;
        }
      });
    },

    getclick() {
      let sessid = this.sessid;
      // getRelationSetList
      this.api.getRelationSetList(sessid).then((res) => {
        let data = res.data;
        if (data.status == 200) {
          this.tableBasicsa = data.data;
        }
      });
    },
    modeClick(data) {
      this.dialogFormVisible = true;
      if (data == "add") {
        this.basicsForm = {};
      } else {
        let datas = {};
        datas.status = "Y";
        datas.leveName = data.leveName;
        datas.modulusLeve = data.modulusLeve;
        datas.modulusValue = data.modulusValue;
        datas.setId = data.setId;
        this.dialogFormVisible = true;
        this.basicsForm = datas;
      }
    },
    deleClick(data) {
      let sessid = this.sessid;

      let datas = {};
      datas.status = "N";
      datas.leveName = data.leveName;
      datas.modulusLeve = data.modulusLeve;
      datas.modulusValue = data.modulusValue;

      datas.setId = data.setId;
      this.$confirm("是否删除?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.api.insertOrUpdateRelationSet(sessid, datas).then((res) => {
            if (res.data.status == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getclick();
            }
          });
        })
        .catch(() => {
        
        });
    },
  },
};
</script>

<style lang="less" >
@import url("../../assets/utils.less");

.basicsa {
  .width-auto();
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