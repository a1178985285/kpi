<template>
  <div class="infoc">
    <div class="serach">
      <div class="serach-left">绩效考核维度管理</div>
      <div class="serach-right">
        <div>
          <el-button type="danger" size="mini" @click="modeClick('add')" v-if="hasQx('aph2_pfm_KHWDXZ-QX-C11')">新增</el-button>
        </div>
      </div>
    </div>
    <div class="seach-form">
      <el-form ref="SearchFrom" :model="getForm" class="flex-form">
        <div class="seach-flex-two">
          <el-form-item label="绩效维度" style="display: flex" prop="dnName">
            <el-input size="mini" v-model="getForm.dnName" placeholder="请输入绩效维度"
            @keyup.enter.native="serchClickF('react')"
            ></el-input>
          </el-form-item>
          <el-form-item label="绩效考核类型" style="display: flex" prop="type">
            <el-select v-model="getForm.type" placeholder="请输入绩效考核类型" size="mini"  filterable
               remote>
              <el-option
                v-for="item in optionsReg"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="button">
          <div>
            <el-button size="mini" @click="resetClickF"  v-if="hasQx('aph2_pfm_KHWDCX-QX-C19')">重置</el-button>
          </div>
          <div>
            <el-button size="mini" type="danger" @click="serchClickF('react')" color="red"  v-if="hasQx('aph2_pfm_KHWDCX-QX-C19')">查询</el-button>
          </div>
        </div>
      </el-form>
    </div>

    <div class="seach-form">
      <el-table :data="tableBasicsa" border style="width: 100%">
        <el-table-column label="序号" width="60" type="index"></el-table-column>
        <el-table-column prop="dimensionName" label="绩效维度名称"></el-table-column>
        <el-table-column prop="type" label="绩效考核类型"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="createdDate" label="创建时间"></el-table-column>
        <el-table-column label="操作" class="active-com">
          <template slot-scope="scope">
            <el-button type="text" @click="modeClick(scope.row)" v-if="hasQx('aph2_pfm_KHWDXG-QX-C14')">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="绩效考核维度管理" :visible="dialogFormVisible" :showClose="false">
      <el-form :model="basicsForm" class="basi-a" :rules="searchFrom" ref="searchFrom">
        <el-form-item label="绩效维度名称" label-width="120px" prop="dimensionName">
          <el-input v-model="basicsForm.dimensionName" size="mini" placeholder="请输入绩效维度名称"></el-input>
        </el-form-item>
        <el-form-item label="	绩效考核类型" label-width="120px" prop="type">
          <el-select v-model="basicsForm.type" placeholder="请输入绩效考核类型" size="mini"
          filterable
               remote
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
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
// import Pagination from "../../components/pagination";

export default {
  data() {
    return {
      tableBasicsa: [],
      sessid: sessionStorage.getItem("sso_sessionid"),
      dialogFormVisible: false,
      innerVisibles: false,
      basicsForm: {},
      searchCheck: "",
      isWuPhone: true,
      checkList: "",
      currentPage: 1,
      total: 1,
      getForm: {
        dnName: "",
        type: "",
        status: "Y",
      },
      options:[
        {
          value: "组织维度",
          label: "组织维度",
        },
        {
          value: "固定维度",
          label: "固定维度",
        },
        {
          value: "绩效任务",
          label: "绩效任务",
        },
      ],
      optionsReg: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "ORG",
          label: "组织维度",
        },
        {
          value: "FIXED",
          label: "固定维度",
        },
        {
          value: "TASK",
          label: "绩效任务",
        },
      ],
      listImg: [],
      listImgRight: {},
      seaType: "",
      searchFrom: {
        dimensionName: [
          { required: true, message: "请输入绩效维度名称", trigger: "blur" },
        ],
        type: [
          { required: true, message: "请输入绩效维度类型", trigger: "change" },
        ],
      },
    };
  },
  components: {},
  mounted() {
    // this.$store.commit("modifyindexSi", "1-2");
    let sessid = this.sessid;
    this.getclick();
  },
  methods: {
      hasQx(value) {
      return this.commonFn.hasQx(value, this);
    },

    // 弹框重置
    serchClickF() {
      this.getclick();
    },
    resetClickF() {
      this.getForm.dnName = "";
      this.getForm.type = "";
      this.$refs.SearchFrom.resetFields();
      this.getclick();
    },
    cancelClick() {
      this.dialogFormVisible = false;
      this.$refs.searchFrom.resetFields();
    },
    goClick(searchFrom) {
      let sessid = this.sessid;
      var data_obj = JSON.stringify(this.basicsForm),
        data = JSON.parse(data_obj);
      data.status = "Y";
      if (data.type == "组织维度") {
        data.type = "ORG";
      } else if (data.type == "固定维度") {
        data.type = "FIXED";
      } else if (data.type == "绩效任务") {
        data.type = "TASK";
      }
      this.$refs[searchFrom].validate((valid) => {
        if (valid) {
          this.api.adddimensionList(sessid, data).then((res) => {
            if (res.data.status == 200) {
              this.$message.success("保存成功");
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
      let params = {
        dnName: this.getForm.dnName,
        type: this.getForm.type,
        status: "Y",
      };

      var data_obj = JSON.stringify(params),
        data = JSON.parse(data_obj);
      // if (data.type == "组织维度") {
      //   data.type = "ORG";
      // } else if (data.type == "固定维度") {
      //   data.type = "FIXED";
      // } else if (data.type == "绩效任务") {
      //   data.type = "TASK";
      // }
      //  else if (data.type == "全部") {
      //   data.type = "";
      // }

      this.api.dimensionList(sessid, data).then((res) => {
        let data = res.data;
        if (data.status == 200) {
          let datas = data.data;
          for (let i in datas) {
            if (datas[i].type == "ORG") {
              datas[i].type = "组织维度";
            } else if (datas[i].type == "FIXED") {
              datas[i].type = "固定维度";
            }else if (datas[i].type == "TASK") {
              datas[i].type = "绩效任务";
            }

            if (datas[i].status == "Y") {
              datas[i].status = "有效";
            } else if (datas[i].status == "N") {
              datas[i].status = "无效";
            }

          //  datas[i].createdDate= datas[i].createdDate.slice(0,10)
          }
          this.tableBasicsa = datas;
        }
      });
    },
    modeClick(data) {
      this.dialogFormVisible = true;
      let sessid = this.sessid;
      if (data == "add") {
        this.basicsForm = {
          dimensionName:"",
          type:""
        };
      } else {
        let datas = {};
        datas.dimensionName = data.dimensionName;
        datas.type = data.type;
        datas.status = "Y";
        datas.dimensionId = data.dimensionId;
        this.basicsForm = datas;
      }
    },
  },
};
</script>

<style lang="less" >
@import url("../../assets/utils.less");

.infoc {
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