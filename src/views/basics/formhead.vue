<template>
  <div class="formhead mineform">
    <div class="serach">
      <div class="serach-left">添加表单</div>
      <div class="serach-right"></div>
    </div>

    <el-form :model="searchForm" :rules="searchFrom" ref="searchFrom">
      <table class="jixiao">
        <tbody>
          <tr>
            <td colspan="10" style="width: 100%">
              <div class="tabl-flex">
                <el-form-item
                  label="表单类型："
                  class="form-el section padding-clo padding-clopp"
                  prop="formType"
                >
                  <el-select
                    placeholder="请选择表单类型"
                    size="mini"
                    v-model="searchForm.formType"
                    filterable
                    remote
                  >
                    <el-option
                      v-for="item in optionsTy"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="表单级别："
                  class="form-el section padding-clo padding-clopp"
                  prop="formLeve"
                >
                  <el-select
                    placeholder="请选择表单级别"
                    size="mini"
                    v-model="searchForm.formLeve"
                    filterable
                    remote
                  >
                    <el-option
                      v-for="item in optionsJ"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="考核周期："
                  class="form-el section padding-clo padding-clopp"
                  prop="cycle"
                >
                  <el-select
                    placeholder="请选择考核周期："
                    size="mini"
                    v-model="searchForm.cycle"
                    filterable
                    remote
                  >
                    <el-option
                      v-for="item in optionsZ"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="10" class="header">
              <table style="border: none; width: 100%">
                <tr>
                  <img src="../../assets/img/form.png" alt />
                  <td style="border: none" class="section">
                    <!-- <el-form-item
                      label="标题："
                      class="title change"
                      prop="formName"
                    >
                      <el-input
                        size="mini"
                        v-model="searchForm.formName"
                      ></el-input>
                    </el-form-item> -->
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr class="section">
            <td colspan="10" class="padding-clo">一、作业标准原则</td>
          </tr>
          <tr class="baseinfo">
            <td colspan="10">
              <table style="border: none; width: 100%">
                <tr>
                  <td style="border: none" class="section">
                    <el-form-item
                      label="流程与标准化名称："
                      class="form-el change"
                      label-width="130px"
                      prop="formName"
                    >
                      <el-input
                        size="mini"
                        v-model="searchForm.formName"
                      ></el-input>
                      <!-- searchForm.standardName -->
                    </el-form-item>
                  </td>
                  <td class="section" style="width: 40%; border: none">
                    填表时间：
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr class="section">
            <td colspan="10" class="padding-clo">二、作业标准范围</td>
          </tr>
          <tr class="section">
            <td colspan="10" class="padding-clo">三、作业标准职责</td>
          </tr>
          <tr>
            <td colspan="10">
              <table style="border: none; width: 100%">
                <tr>
                  <td style="width: 25%; border: none">
                    <el-form-item
                      label="执行人："
                      class="form-el change"
                      label-width="130px"
                      prop="standardName"
                    >
                      <el-input
                        size="mini"
                        readonly
                        class="border-nn"
                      ></el-input>
                    </el-form-item>
                  </td>
                  <td style="width: 25%; border: none">
                    <el-form-item
                      label="责任人："
                      class="form-el change"
                      label-width="130px"
                      prop="standardName"
                    >
                      <el-input
                        size="mini"
                        readonly
                        class="border-nn"
                      ></el-input>
                    </el-form-item>
                  </td>
                  <td style="width: 25%; border: none">
                    <el-form-item
                      label="核算人："
                      class="form-el change"
                      label-width="130px"
                      prop="standardName"
                    >
                      <el-input
                        size="mini"
                        readonly
                        class="border-nn"
                      ></el-input>
                    </el-form-item>
                  </td>
                  <td style="width: 25%; border: none">
                    <el-form-item
                      label="控制人："
                      class="form-el change"
                      label-width="130px"
                      prop="standardName"
                    >
                      <el-input
                        size="mini"
                        readonly
                        class="border-nn"
                      ></el-input>
                    </el-form-item>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr class="section">
            <td colspan="10" class="padding-clo">四、作业标准指引</td>
          </tr>
          <tr class="section">
            <td colspan="10" class="padding-clo">
              优秀：四星至五星（含），良好：三星至四星（含），合格：三星，不足：一星至三星，差：零星至一星（含）
            </td>
          </tr>

          <tr class="baseinfo">
            <td colspan="10">
              <table style="border: none; width: 100%">
                <tr>
                  <td style="width: 25%; border: none" class="padding-clo">
                    中心/服务中心/子公司：
                  </td>
                  <td style="width: 15%; border: none">职位：</td>
                  <td style="width: 14%; border: none">考核对象：</td>
                  <td style="width: 14%; border: none">考核主体：</td>
                  <td style="width: 32%; border: none">考核周期：</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr class="thick">
            <td rowspan="2" style="width: 135px">绩效考核任务</td>
            <td rowspan="2">任务类型</td>
            <td colspan="4" style="padding: 2px">
              <el-form-item label="规划说明：" class="form-el change">
                <el-input
                  size="mini"
                  v-model="searchForm.ruleDes"
                  prop="ruleDes"
                ></el-input>
              </el-form-item>
            </td>
            <td colspan="4">
              <el-form-item label="考核说明：" class="form-el change">
                <el-input
                  size="mini"
                  v-model="searchForm.examineDes"
                  prop="examineDes"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr class="thick">
            <td>考核维度</td>
            <td>计划完成时间</td>
            <td>完成率（%）</td>
            <td>绩效说明</td>
            <td>工作质量</td>
            <td>及时性</td>
            <td>工作态度</td>
          </tr>
        </tbody>
      </table>
    </el-form>

    <div class="loding-button">
      <el-button size="small" @click="deterLodre">返回</el-button>
      <el-button size="small" type="danger" @click="addclick('searchFrom')"
        >确定</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sessid: sessionStorage.getItem("sso_sessionid"),
      searchForm: {
        formName: "",
        formType: "",
        formLeve: "",
        cycle: "",
        status: "",
        examineDes: "（月末25-30日考核对象填写完成情况、考核主体完成评分）",
        ruleDes: "绩效规划（月25-27日完成）",
        standardName: "",
        status: "Y",
      },
      searchFrom: {
        formType: [
          { required: true, message: "请选择表单类型", trigger: "change" },
        ],

        formLeve: [
          { required: true, message: "请选择表单级别", trigger: "change" },
        ],
        cycle: [
          { required: true, message: "请选择考核周期", trigger: "change" },
        ],
        formName: [
          {
            required: true,
            message: "请输入流程与标准化名称",
            trigger: "blur",
          },
        ],
      },
      optionsTy: [
        {
          value: "普通表单",
          label: "普通表单",
        },
        {
          value: "满意度表单",
          label: "满意度表单",
        },
      ],
      optionsJ: [
        {
          value: "中坚层",
          label: "中坚层",
        },
        {
          value: "管理层",
          label: "管理层",
        },
        {
          value: "领导层",
          label: "领导层",
        },
      ],
      optionsZ: [
        {
          value: "月度考核",
          label: "月度考核",
        },
        {
          value: "季度考核",
          label: "季度考核",
        },
        {
          value: "半年考核",
          label: "半年考核",
        },
      ],
    };
  },
  mounted() {
    this.$store.commit("modifyindexSi", "2-4");
    let sessid = this.sessid;
    if (this.$route.query.type == "mode") {
      this.searchForm = this.$store.state.toForm;
    } else {
    }
  },
  methods: {
    deterLodre() {
      this.$router.go(-1);
    },
    //确定
    addclick(searchFrom) {
      let sessid = this.sessid;

      var data_obj = JSON.stringify(this.searchForm),
        data = JSON.parse(data_obj);

      data.status = "N";
      if (data.createdBy) {
        delete data.createdBy;
        delete data.createdDate;
        delete data.lastUpdatedBy;
        delete data.lastUpdatedDate;
      }

      if (data.formType == "普通表单") {
        data.formType = "FORM_COMMON";
      } else if (data.formType == "满意度表单") {
        data.formType = "FORM_FIXED";
      }

      if (data.formLeve == "中坚层") {
        data.formLeve = "LEVE_BASIC";
      } else if (data.formLeve == "管理层") {
        data.formLeve = "LEVE_MANAGER";
      } else if (data.formLeve == "领导层") {
        data.formLeve = "LEVE_LEADER";
      }

      if (data.cycle == "月度考核") {
        data.cycle = "CYCLE_MONTH";
      } else if (data.cycle == "季度考核") {
        data.cycle = "CYCLE_QUARTER";
      } else if (data.cycle == "半年考核") {
        data.cycle = "CYCLE_YEAR";
      }

      this.$refs[searchFrom].validate((valid) => {
        if (valid) {
          this.api.insertOrUpdateFormHead(sessid, data).then((res) => {
            if (res.data.status == 200) {
              this.$message.success("保存成功");
              if (this.$route.path == "/formhead") {
                this.$router.push({
                  path: "/basicsg",
                });
              } else if (this.$route.path == "/kpiFormAdd") {
                this.$router.push({
                  path: "/kpiForm",
                });
              }
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="less">
@import url("../../assets/utils.less");
.formhead {
  .width-auto();
  .padding-clopp {
    .el-input__inner {
      height: 24px;
      line-height: 24px;
    }
    .el-input__icon {
      line-height: 24px;
    }
  }
  background: #ffffff;
  .border-nn {
    .el-input__inner {
      border: none !important;
    }
  }
  .title {
    .el-form-item__label {
      line-height: 40px !important;
    }
  }
}
</style>