<template>
  <div class="infoc">
    <div class="serach">
      <div class="serach-left">绩效表单配置</div>
      <div class="serach-right">
        <div>
          <el-button
            type="danger"
            size="mini"
            @click="modeClick('xin', 'add')"
            v-if="hasQx('aph2_pfm_BDPZXZ-QX-C11')"
            >新建表单</el-button
          >
        </div>
      </div>
    </div>
    <div class="seach-form">
      <el-form ref="SearchFrom" :model="getForm" class="flex-form">
        <div class="seach-flex-two">
          <el-form-item label="名称" prop="companyName" label-width="40px">
            <el-input
              size="mini"
              v-model="getForm.formName"
              placeholder="请输入名称"
              @keyup.enter.native="serchClickF('react')"
            ></el-input>
          </el-form-item>

          <el-form-item label="状态" prop="modulusLeve" label-width="80px">
            <el-select
              v-model="getForm.status"
              placeholder="请选择状态"
              size="mini"
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

          <el-form-item label="表单类型" prop="formType" label-width="80px">
            <el-select
              v-model="getForm.formType"
              placeholder="请选择表单类型"
              size="mini"
              filterable
              remote
            >
              <el-option
                v-for="item in optionsRelei"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="级别" prop="formLevel" label-width="80px">
            <el-select
              v-model="getForm.formLevel"
              placeholder="请选择级别"
              size="mini"
              filterable
              remote
            >
              <el-option
                v-for="item in optionsRegJi"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="button" v-if="hasQx('aph2_pfm_BDPZCX-QX-C19')">
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
        <el-table-column label="序号" width="60" type="index"></el-table-column>

        <el-table-column
          prop="formName"
          label="流程与标准化名称"
        ></el-table-column>
        <el-table-column
          prop="formType"
          label="表单类型"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="formLeve"
          label="级别"
          width="80"
        ></el-table-column>
        <el-table-column
          prop="cycle"
          label="考核周期"
          width="80"
        ></el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="80"
        ></el-table-column>
        <el-table-column
          prop="createdDate"
          label="创建时间"
          width="180"
        ></el-table-column>

        <el-table-column label="表单结构" class="active-com" width="130">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="modeClick(scope.row, 'look')"
              v-if="hasQx('aph2_pfm_BDPZCK-QX-C20')"
              >查看</el-button
            >
            <el-button
              type="text"
              @click="modeClick(scope.row, 'yu')"
              v-if="hasQx('aph2_pfm_BDPZYL-QX-C78')"
              >预览</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" class="active-com" width="130">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="modeClick(scope.row, 'mode')"
              v-if="hasQx('aph2_pfm_BDPZXG-QX-C14')"
              >修改</el-button
            >
            <el-button
              type="text"
              @click="modeClick(scope.row, 'jin', scope.$index)"
              v-if="
                scope.row.status == '禁用' && hasQx('aph2_pfm_BDPZJYQY-QX-C16')
              "
            >
              启用
            </el-button>
            <el-button
              type="text"
              @click="modeClick(scope.row, 'jin', scope.$index)"
              v-if="
                scope.row.status == '启用' && hasQx('aph2_pfm_BDPZJYQY-QX-C16')
              "
            >
              禁用
            </el-button>
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
import Pagination from "../../components/pagination";

export default {
  data() {
    return {
      tableBasicsa: [],
      sessid: sessionStorage.getItem("sso_sessionid"),

      innerVisibles: false,
      basicsForm: {},
      searchCheck: "",
      isWuPhone: true,
      checkList: "",
      currentPage: 1,
      statusP: "禁用",
      total: 1,
      getForm: {
        formName: "",
        status: "",
        formType: "",
        formLevel: "",
      },
      optionsReg: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "Y",
          label: "已启用",
        },
        {
          value: "N",
          label: "已禁用",
        },
      ],
      optionsRegJi: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "LEVE_BASIC",
          label: "中坚层",
        },
        {
          value: "LEVE_MANAGER",
          label: "管理层",
        },
        {
          value: "LEVE_LEADER",
          label: "领导层",
        },
      ],
      optionsRelei: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "FORM_COMMON",
          label: "普通表单",
        },
        {
          value: "FORM_FIXED",
          label: "满意度表单",
        },
      ],
      listImg: [],
      listImgRight: {},
      seaType: "",
    };
  },
  components: {
    Pagination,
  },
  mounted() {
    this.$store.commit("modifyindexSi", "2-4");
    let sessid = this.sessid;
    this.getclick();
  },
  methods: {
    hasQx(value) {
      return this.commonFn.hasQx(value, this);
    },

    changePage(page) {
      this.currentPage = page;
      this.getclick();
    },
    // 弹框重置

    serchClickF() {
      this.currentPage = 1;
      this.getclick();
    },
    resetClickF() {
      this.getForm = {
        formName: "",
        status: "",
        formType: "",
        formLevel: "",
      };
      this.currentPage = 1;
      this.$refs.SearchFrom.resetFields();
      this.getclick();
    },

    getclick() {
      let sessid = this.sessid;
      let params = {
        formName: this.getForm.formName,
        status: this.getForm.status,
        formType: this.getForm.formType,
        formLevel: this.getForm.formLevel,
        page: this.currentPage,
        pageSize: this.$store.state.pageSize,
      };
      var dataParams = JSON.parse(JSON.stringify(params));
      this.api.getFormHeadListByPage(sessid, dataParams).then((res) => {
        let data = res.data;
        if (data.status == 200) {
          let datas = data.data.records;
          if (datas.length > 0) {
            for (let i in datas) {
              if (datas[i].formType == "FORM_COMMON") {
                datas[i].formType = "普通表单";
              } else if (datas[i].formType == "FORM_FIXED") {
                datas[i].formType = "满意度表单";
              }

              if (datas[i].formLeve == "LEVE_BASIC") {
                datas[i].formLeve = "中坚层";
              } else if (datas[i].formLeve == "LEVE_MANAGER") {
                datas[i].formLeve = "管理层";
              } else if (datas[i].formLeve == "LEVE_LEADER") {
                datas[i].formLeve = "领导层";
              }

              if (datas[i].cycle == "CYCLE_MONTH") {
                datas[i].cycle = "月度考核";
              } else if (datas[i].cycle == "CYCLE_QUARTER") {
                datas[i].cycle = "季度考核";
              } else if (datas[i].cycle == "CYCLE_YEAR") {
                datas[i].cycle = "半年考核";
              }

              if (datas[i].status == "Y") {
                datas[i].status = "启用";
              } else if (datas[i].status == "N") {
                datas[i].status = "禁用";
              }
            }
          }
          this.total = data.data.total;
          this.tableBasicsa = datas;
        }
      });
    },
    modeClick(data, type, id) {
      var fomrtype_obj = JSON.stringify(data),
        fomrtypeParams = JSON.parse(fomrtype_obj);
      if (fomrtypeParams.formType == "普通表单") {
        fomrtypeParams.formType = "FORM_COMMON";
      } else if (fomrtypeParams.formType == "满意度表单") {
        fomrtypeParams.formType = "FORM_FIXED";
      }
      if (fomrtypeParams.status == "启用") {
        fomrtypeParams.status = "Y";
      } else if (fomrtypeParams.status == "禁用") {
        fomrtypeParams.status = "N";
      }
      var sessid = this.sessid;
      if (type == "add") {
        if (this.$route.path == "/basicsg") {
          this.$router.push({
            path: "/formhead",
          });
        } else if (this.$route.path == "/kpiForm") {
          this.$router.push({
            path: "/kpiFormAdd",
          });
        }
      } else if (type == "yu") {
        this.$store.commit("getformId", fomrtypeParams.formId);

        if (data.formType == "普通表单" && this.$route.path == "/basicsg") {
          this.$router.push({
            path: "/preview",
          });
        } else if (
          data.formType == "满意度表单" &&
          this.$route.path == "/basicsg"
        ) {
          this.$router.push({
            path: "/satiform",
            query: {
              type: "yu",
            },
          });
        } else if (
          data.formType == "普通表单" &&
          this.$route.path == "/kpiForm"
        ) {
          this.$router.push({
            path: "/kpipreview",
            query: {
              type: "yu",
            },
          });
        } else if (
          data.formType == "满意度表单" &&
          this.$route.path == "/kpiForm"
        ) {
          this.$router.push({
            path: "/kpisatiform",
            query: {
              type: "yu",
            },
          });
        }
        // getFromModelDeatil
      } else if (type == "look") {
        this.$store.commit("getformCode", data.formCode);
        this.$store.commit("getformType", fomrtypeParams.formType);
        this.$store.commit("getformId", fomrtypeParams.formId);
        if (data.formType == "满意度表单") {
          //
          if (this.$route.path == "/basicsg") {
            this.$router.push({
              path: "/basicsk",
              query: {
                type: "ok",
              },
            });
          } else if (this.$route.path == "/kpiForm") {
            this.$router.push({
              path: "/kpiFormList",
              query: {
                type: "ok",
              },
            });
          }
        } else {
          if (this.$route.path == "/basicsg") {
            this.$router.push({
              path: "/basicsk",
              query: {
                type: "pu",
              },
            });
          } else if (this.$route.path == "/kpiForm") {
            this.$router.push({
              path: "/kpiFormList",
              query: {
                type: "pu",
              },
            });
          }
        }
      } else if (type == "mode") {
        this.$store.commit("toForms", data);

        if (this.$route.path == "/basicsg") {
          this.$router.push({
            path: "/formhead",
            query: {
              type: "mode",
            },
          });
        } else if (this.$route.path == "/kpiForm") {
          this.$router.push({
            path: "/kpiFormAdd",
            query: {
              type: "mode",
            },
          });
        }
      } else if (type == "jin") {
        if (fomrtypeParams.status == "N") {
          fomrtypeParams.status = "Y";
        } else if (fomrtypeParams.status == "Y") {
          fomrtypeParams.status = "N";
        }
        var params = {
          formId: fomrtypeParams.formId,
          status: fomrtypeParams.status,
        };
        this.api.updateFormHeadStatus(sessid, params).then((res) => {
          if (res.data.status == 200) {
            this.$message.success("操作成功");
            this.getclick();
          }
        });
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
  .flex-form {
    .flex();
    padding-right: 10px;
    .seach-flex-two {
      display: flex;
    }
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