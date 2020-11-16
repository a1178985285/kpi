<template>
  <div class="infoc">
    <div class="serach">
      <div class="serach-left">表单维度列表</div>
      <div class="serach-right">
        <div v-if="isOk">
          <el-button size="mini" @click="$router.go(-1)">返回</el-button>
          <el-button type="danger" size="mini" @click="modeClick('yu', 'yu')"
            >预览</el-button
          >
          <el-button
            type="danger"
            size="mini"
            @click="modeClick('pp', 'add')"
            v-if="hasQx('aph2_pfm_BDWDXZ-QX-C11')"
            >新增</el-button
          >
        </div>
        <div v-else>
          <el-button size="mini" @click="$router.go(-1)">返回</el-button>
          <el-button type="danger" size="mini" @click="modeClickOk('yu', 'yu')"
            >预览</el-button
          >
          <el-button
            type="danger"
            size="mini"
            @click="modeClickOk('pp', 'add')"
            v-if="hasQx('aph2_pfm_BDWDXZ-QX-C11')"
            >新增</el-button
          >
        </div>
      </div>
    </div>
    <!-- <div class="seach-form">
      <el-form ref="SearchFrom" :model="getForm" class="flex-form">
        <div class="seach-flex-two">
          <el-form-item label="名称" label-width="80px" prop="companyName">
            <el-input
              size="mini"
              v-model="getForm.dimensionName"
              placeholder="请输入名称"
            ></el-input>
          </el-form-item>
        </div>
        <div class="button"    v-if="hasQx('aph2_pfm_BDPZCX-QX-C19')">
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
    </div> -->

    <div class="seach-form">
      <el-table :data="tableBasicsa" border style="width: 100%">
        <el-table-column label="序号" width="60" type="index"></el-table-column>
        <el-table-column
          prop="dimensionName"
          label="绩效维度"
        ></el-table-column>
        <el-table-column label="绩效权重" width="80">
          <template slot-scope="scope"> {{ scope.row.ratio }}% </template>
        </el-table-column>
        <el-table-column
          prop="showType"
          label="呈现模式"
          width="80"
          v-if="isOk"
        ></el-table-column>
        <el-table-column
          prop="taskFrom"
          label="任务来源"
          width="80"
          v-if="isOk"
        ></el-table-column>
        <el-table-column
          prop="taskType"
          label="任务类别"
          width="80"
          v-if="isOk"
        ></el-table-column>
        <el-table-column
          prop="taskMax"
          label="最大子项数目"
          width="120"
          v-if="isOk"
        ></el-table-column>
        <el-table-column
          prop="formSort"
          label="排列顺序"
          width="80"
        ></el-table-column>
        <el-table-column
          prop="createdDate"
          label="创建时间"
          width="180"
        ></el-table-column>
        <el-table-column
          label="操作"
          class="active-com"
          width="120"
          v-if="isOk"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="modeClick(scope.row, 'mode')"
              v-if="hasQx('aph2_pfm_BDWDXG-QX-C14')"
              >修改</el-button
            >
            <el-button
              type="text"
              @click="modeClick(scope.row, 'dele')"
              v-if="hasQx('aph2_pfm_BDWDSC-QX-C19')"
              >删除</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" class="active-com" width="120" v-else>
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="modeClickOk(scope.row, 'mode')"
              v-if="hasQx('aph2_pfm_BDWDXG-QX-C14')"
              >修改</el-button
            >
            <el-button
              type="text"
              @click="modeClickOk(scope.row, 'dele')"
              v-if="hasQx('aph2_pfm_BDWDSC-QX-C19')"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      title="表单维度配置"
      :visible="dialogFormVisibleOk"
      :showClose="false"
    >
      <el-form
        :model="basicsFormOk"
        class="basi-a"
        :rules="searchFromOk"
        ref="searchFromOk"
      >
        <el-form-item label="绩效维度" label-width="140px" prop="dimensionName">
          <el-select
            v-model="basicsFormOk.dimensionName"
            placeholder="请选择绩效维度"
            size="mini"
            @change="changDimens($event, basicsFormOk)"
            filterable
            remote
          >
            <el-option
              v-for="item in optionsA"
              :key="item.dimensionCode"
              :label="item.dimensionName"
              :value="item.dimensionCode"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="绩效权重"
          label-width="140px"
          prop="ratio"
          class="input-end-flex"
        >
          <el-input
            v-model.number="basicsFormOk.ratio"
            size="mini"
            placeholder="请输入绩效权重"
            @input.native="onInput0_100"
            @input="
              (val) => {
                basicsFormOk.ratio = val
                  .replace(/[^0-9.]/g, '')
                  .replace('.', '#*')
                  .replace(/\./g, '')
                  .replace('#*', '.')
                  .replace(/^0{1,}/g, '')
                  .replace(/^\./g, '');
              }
            "
          ></el-input>
          %
        </el-form-item>

        <el-form-item label="排列顺序" label-width="140px" prop="formSort">
          <el-input
            v-model="basicsFormOk.formSort"
            size="mini"
            type="number"
            placeholder="请输入排列顺序"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelClickOk" size="mini">取 消</el-button>
        <el-button type="danger" @click="goClickOk('searchFromOk')" size="mini"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <el-dialog
      title="表单维度配置"
      :visible="dialogFormVisible"
      :showClose="false"
    >
      <el-form
        :model="basicsForm"
        class="basi-a"
        :rules="searchFrom"
        ref="searchFrom"
      >
        <el-form-item label="呈现模式" label-width="140px" prop="showType">
          <el-select
            v-model="basicsForm.showType"
            placeholder="请选择呈现模式"
            size="mini"
            @change="changeopC"
            filterable
            remote
          >
            <el-option
              v-for="item in optionsC"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="绩效维度" label-width="140px" prop="dimensionName">
          <el-select
            v-model="basicsForm.dimensionName"
            placeholder="请选择绩效维度"
            size="mini"
            @change="changDimens($event, basicsForm)"
            filterable
            remote
          >
            <el-option
              v-for="item in optionsA"
              :key="item.dimensionCode"
              :label="item.dimensionName"
              :value="item.dimensionCode"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="绩效权重"
          label-width="140px"
          prop="ratio"
          class="input-end-flex"
        >
          <el-input
            v-model.number="basicsForm.ratio"
            size="mini"
            placeholder="请输入绩效权重"
            @input.native="onInput0_100"
            @input="
              (val) => {
                basicsForm.ratio = val
                  .replace(/[^0-9.]/g, '')
                  .replace('.', '#*')
                  .replace(/\./g, '')
                  .replace('#*', '.')
                  .replace(/^0{1,}/g, '')
                  .replace(/^\./g, '');
              }
            "
          ></el-input>
          %
        </el-form-item>

        <el-form-item
          label="任务来源"
          label-width="140px"
          prop="taskFrom"
          :rules="
            isshowType
              ? { required: false }
              : { required: true, message: '请选择任务来源', trigger: 'change' }
          "
        >
          <el-select
            v-model="basicsForm.taskFrom"
            :disabled="isshowType"
            placeholder="请选择任务来源"
            size="mini"
            filterable
            remote
          >
            <el-option
              v-for="item in optionsV"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="任务类别"
          label-width="140px"
          prop="taskType"
          :rules="
            isshowType
              ? { required: false }
              : { required: true, message: '请选择任务类别', trigger: 'change' }
          "
        >
          <el-select
            v-model="basicsForm.taskType"
            :disabled="isshowType"
            placeholder="请选择任务类别"
            size="mini"
            filterable
            remote
          >
            <el-option
              v-for="item in optionsB"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="是否合并打分"
          label-width="140px"
          prop="isMerge"
          :rules="
            isshowType
              ? { required: false }
              : {
                  required: true,
                  message: '请选择是否合并打分',
                  trigger: 'change',
                }
          "
        >
          <el-select
            v-model="basicsForm.isMerge"
            :disabled="isshowType"
            placeholder="请选择是否合并打分"
            size="mini"
            filterable
            remote
          >
            <el-option
              v-for="item in optionsN"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="最大子项目数目"
          prop="taskMax"
          label-width="140px"
          :rules="
            isshowType
              ? { required: false }
              : {
                  required: true,
                  message: '请输入绩最大子项目数目',
                  trigger: 'blur',
                }
          "
        >
          <el-input
            v-model.number="basicsForm.taskMax"
            :disabled="isshowType"
            size="mini"
            placeholder="请输入绩最大子项目数目"
            type="number"
            :min="0"
            onkeypress="return(/[\d\.]/.test(String.fromCharCode(event.keyCode)))"
          ></el-input>
        </el-form-item>

        <el-form-item label="排列顺序" label-width="140px" prop="formSort">
          <el-input
            v-model.number="basicsForm.formSort"
            size="mini"
            onkeypress="return(/[\d\.]/.test(String.fromCharCode(event.keyCode)))"
            type="number"
            placeholder="请输入排列顺序"
            :min="0"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="	绩效考核类型" label-width="120px" prop="type">
          <el-select v-model="basicsForm.type" placeholder="请输入绩效考核类型" size="mini">
            <el-option
              v-for="item in optionsReg"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelClick" size="mini">取 消</el-button>
        <el-button type="danger" @click="goClick('searchFrom')" size="mini"
          >确 定</el-button
        >
      </div>
    </el-dialog>

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
      dialogFormVisible: false,
      dialogFormVisibleOk: false,
      innerVisibles: false,
      basicsForm: {},
      basicsFormOk: {},
      searchCheck: "",
      isWuPhone: true,
      sunNum: 0,
      checkList: "",
      currentPage: 1,
      total: 1,
      getForm: {
        dimensionName: "",
      },

      optionsA: [],
      optionsC: [
        {
          value: "绩效任务",
          label: "绩效任务",
        },

        {
          value: "组织绩效",
          label: "组织绩效",
        },
      ],
      optionsV: [
        {
          value: "工作计划",
          label: "工作计划",
        },

        {
          value: "无来源",
          label: "无来源",
        },
      ],
      optionsB: [
        {
          value: "关键任务",
          label: "关键任务",
        },

        {
          value: "常规任务",
          label: "常规任务",
        },

        {
          value: "固定任务",
          label: "固定任务",
        },
      ],

      optionsN: [
        {
          value: "是",
          label: "是",
        },
        {
          value: "否",
          label: "否",
        },
      ],
      isshowType: false,
      optionsReg: [
        {
          value: "已启用",
          label: "已启用",
        },
        {
          value: "已禁用",
          label: "已禁用",
        },
      ],
      listImg: [],
      listImgRight: {},
      seaType: "",
      isOk: false,

      searchFromOk: {
        dimensionName: [
          { required: true, message: "请选择绩效维度", trigger: "change" },
        ],
        ratio: [
          { required: true, message: "请输入绩效权重", trigger: "change" },
        ],
        formSort: [
          { required: true, message: "请输入排列顺序", trigger: "change" },
        ],
      },
      searchFrom: {
        dimensionName: [
          { required: true, message: "请选择绩效维度", trigger: "change" },
        ],
        ratio: [
          { required: true, message: "请输入绩效权重", trigger: "change" },
        ],

        showType: [
          { required: true, message: "请选择呈现模式", trigger: "change" },
        ],

        formSort: [
          { required: true, message: "请输入排列顺序", trigger: "change" },
        ],
      },
    };
  },
  components: {
    Pagination,
  },

  watch: {
    "basicsForm.showType": {
      //  immediate: true,
      deep: true,
      handler(n, o) {
        if (n == "绩效任务") {
          this.$refs["searchFrom"].clearValidate();
          this.isshowType = false;
        } else if (n == "组织绩效") {
          this.$refs["searchFrom"].clearValidate();
          this.isshowType = true;
        }
      },
    },
  },

  mounted() {
    this.$store.commit("modifyindexSi", "2-4");
    let sessid = this.sessid;
    this.getclick();
    if (this.$route.query.type == "ok") {
      this.isOk = false;
    } else {
      this.isOk = true;
    }

    this.getxia();
  },
  methods: {
    hasQx(value) {
      return this.commonFn.hasQx(value, this);
    },
    changeopC(event) {
      this.basicsForm.dimensionName = "";
      // optionsA
      // console.log(this.optionsA)
      var e = JSON.parse(JSON.stringify(event));
      if (e == "绩效任务") {
        e = "SHOW_TASK";
      } else if (e == "组织绩效") {
        e = "SHOW_ORG";
      }
      this.getxia();
    },
    onInput0_100(e) {
      this.$message.closeAll();
      if (e.target.value < 0 || e.target.value > 100) {
        this.$message.warning("只能输入[1-100]区间的数");
      }
      e.target.value =
        (e.target.value >= 0 &&
          e.target.value <= 100 &&
          e.target.value.match(/^\d*/g)[0]) ||
        null;
    },
    getxia() {
      let sessid = this.sessid;
      var showType = this.basicsForm.showType;
      if (showType == "绩效任务") {
        showType = "SHOW_TASK";
      } else if (showType == "组织绩效") {
        showType = "SHOW_ORG";
      } else {
        showType = "";
      }
      let params = {
        formType: this.$store.state.formType,
        showType,
      };
      this.api.getFormDimensionList(sessid, params).then((res) => {
        if (res.data.status == 200) {
          let pdList = res.data.data.pdList;
          this.optionsA = pdList;
        }
      });
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
      this.getForm.dimensionName = "";
      this.currentPage = 1;
      this.$refs.SearchFrom.resetFields();
      this.getclick();
    },
    cancelClick() {
      this.dialogFormVisible = false;
      this.$nextTick(() => {
        this.$refs.searchFrom.resetFields();
      });
    },
    cancelClickOk() {
      this.dialogFormVisibleOk = false;

      this.$nextTick(() => {
        this.$refs.searchFromOk.resetFields();
      });
    },
    goClickOk(searchFromOk) {
      let sessid = this.sessid;
      this.$refs[searchFromOk].validate((valid) => {
        if (valid) {
          var data_obj = JSON.stringify(this.basicsFormOk),
            data = JSON.parse(data_obj);
          data.formCode = this.$store.state.formCode;
          data.formType = this.$store.state.formType;
          data.status = "Y";
          this.goBaoClic(sessid, data);
        } else {
        }
      });
    },

    // 删除
    delegoClick(sessid, datas) {
      this.$confirm("是否删除?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // return;
          this.api.deleteFormDimension(sessid, datas).then((res) => {
            if (res.data.status == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getclick();
            }
          });
        })
        .catch(() => {});
    },
    // changDimensOk(e) {
    //   console.log(e);
    //   this.optionsA.map((item, i) => {
    //     if (item.dimensionCode == e) {
    //       this.basicsFormOk.dimensionCode = item.dimensionCode;
    //       this.basicsFormOk.dimensionName = item.dimensionName;
    //     }
    //   });
    // },
    changDimens(e, form) {
      this.optionsA.map((item, i) => {
        if (item.dimensionCode == e) {
          form.dimensionCode = item.dimensionCode;
          form.dimensionName = item.dimensionName;
        }
      });
    },

    goBaoClic(sessid, data) {
      this.api.insertOrUpdateFormDimension(sessid, data).then((res) => {
        if (res.data.status == 200) {
          this.$message.success("保存成功");
          if (this.dialogFormVisible) {
            this.dialogFormVisible = false;
            // this.$refs.searchFrom.resetFields();
          }
          if (this.dialogFormVisibleOk) {
            this.dialogFormVisibleOk = false;
            // this.$refs.searchFromOk.resetFields();
          }

          this.getclick();
        }
      });
    },
    goClick(searchFrom) {
      var data_obj = JSON.stringify(this.basicsForm),
        data = JSON.parse(data_obj);
      data.status = "Y";
      data.formCode = this.$store.state.formCode;
      data.formType = this.$store.state.formType;
      // dimensionCode
      this.praps(data);
      let sessid = this.sessid;
      this.$refs[searchFrom].validate((valid) => {
        if (valid) {
          if (data.showType == "SHOW_ORG") {
            data.taskFrom = "";
            data.taskType = "";
            data.taskMax = "";
            data.isMerge = "";
          }
          this.goBaoClic(sessid, data);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    prapT(datas) {
      if (datas != null) {
        if (!datas.showType || datas.showType == null) {
        } else if (datas.showType == "SHOW_TASK") {
          datas.showType = "绩效任务";
        } else if (datas.showType == "SHOW_ORG") {
          datas.showType = "组织绩效";
        }

        if (!datas.taskFrom || datas.taskFrom == null) {
        } else if (datas.taskFrom == "FROM_TASK") {
          datas.taskFrom = "工作计划";
        } else if (datas.taskFrom == "FROM_NONE") {
          datas.taskFrom = "无来源";
        }
        if (!datas.taskType || datas.taskType == null) {
        } else if (datas.taskType == "TASK_TYPE_KEY") {
          datas.taskType = "关键任务";
        } else if (datas.taskType == "TASK_TYPE_NORMAL") {
          datas.taskType = "常规任务";
        } else if (datas.taskType == "TASK_TYPE_FIXED") {
          datas.taskType = "固定任务";
        }

        if (!datas.isMerge || datas.isMerge == null) {
        } else if (datas.isMerge == "Y") {
          datas.isMerge = "是";
        } else if (datas.isMerge == "N") {
          datas.isMerge = "否";
        }
      }
    },
    praps(datas) {
      if (datas.showType == "绩效任务") {
        datas.showType = "SHOW_TASK";
      } else if (datas.showType == "组织绩效") {
        datas.showType = "SHOW_ORG";
      }

      if (datas.taskFrom == "工作计划") {
        datas.taskFrom = "FROM_TASK";
      } else if (datas.taskFrom == "无来源") {
        datas.taskFrom = "FROM_NONE";
      }

      if (datas.taskType == "关键任务") {
        datas.taskType = "TASK_TYPE_KEY";
      } else if (datas.taskType == "常规任务") {
        datas.taskType = "TASK_TYPE_NORMAL";
      } else if (datas.taskType == "固定任务") {
        datas.taskType = "TASK_TYPE_FIXED";
      }

      if (datas.isMerge == "是") {
        datas.isMerge = "Y";
      } else if (datas.isMerge == "否") {
        datas.isMerge = "N";
      }
    },
    prap(datas) {
      for (let i in datas) {
        if (datas[i].showType == "SHOW_TASK") {
          datas[i].showType = "绩效任务";
        } else if (datas[i].showType == "SHOW_ORG") {
          datas[i].showType = "组织绩效";
        }

        if (datas[i].taskFrom == "FROM_TASK") {
          datas[i].taskFrom = "工作计划";
        } else if (datas[i].taskFrom == "FROM_NONE") {
          datas[i].taskFrom = "无来源";
        }
        if (datas[i].taskType == "TASK_TYPE_KEY") {
          datas[i].taskType = "关键任务";
        } else if (datas[i].taskType == "TASK_TYPE_NORMAL") {
          datas[i].taskType = "常规任务";
        } else if (datas[i].taskType == "TASK_TYPE_FIXED") {
          datas[i].taskType = "固定任务";
        }

        if (datas[i].status == "Y") {
          datas[i].status = "启用";
        } else if (datas[i].status == "N") {
          datas[i].status = "禁用";
        }
      }
    },
    getclick() {
      let sessid = this.sessid;
      let params = {
        dimensionName: this.getForm.dimensionName,
        formCode: this.$store.state.formCode,
        page: this.currentPage,
        pageSize: this.$store.state.pageSize,
      };

      this.api.getFormDimensionListByPage(sessid, params).then((res) => {
        let data = res.data;
        if (data.status == 200) {
          let datas = data.data.records;
          if (datas.length > 0) {
            this.prap(datas);
          }
          this.total = data.data.total;

          // for (let i in)
          this.tableBasicsa = datas;
        }
      });
    },
    mode(sessid, params) {
      this.api.getFormDimensionDetail(sessid, params).then((res) => {
        if (res.data.status == 200) {
          let data = res.data.data.formDimension;
          //  document.write( JSON.stringify(data) )
          this.prapT(data);
          if (data.formType == "FORM_COMMON") {
            this.basicsForm = data;
          } else {
            this.basicsFormOk = data;
          }
        }
      });
    },
    modeClickOk(data, type) {
      let sessid = this.sessid;
      if (type == "add") {
        // goClick
        this.basicsFormOk = {
          dimensionName: "",
          ratio: "",
          formSort: "",
        };
        this.$nextTick(() => {
          this.$refs.searchFromOk.resetFields();
        });

        this.dialogFormVisibleOk = true;
      } else if (type == "mode") {
        this.dialogFormVisibleOk = true;
        let params = {
          formDimensionId: data.formDimensionId,
        };
        this.mode(sessid, params);
      } else if (type == "dele") {
        let params = {
          status: "N",
          fmId: data.formDimensionId,
        };
        this.delegoClick(sessid, params);
      } else if (type == "yu") {
        if (this.$route.path == "/basicsk") {
          this.$router.push({
            path: "/satiform",
            query: {
              type: "yu",
            },
          });
        } else if (this.$route.path == "/kpiFormList") {
          this.$router.push({
            path: "/kpisatiform",
            query: {
              type: "yu",
            },
          });
        }

        // let params = {
        //   status: "N",
        //   fmId: data.formDimensionId,
        // };
        // this.delegoClick(sessid, params);
      }
    },
    modeClick(data, type) {
      let sessid = this.sessid;

      if (
        data.showType == undefined ||
        data.showType == "绩效任务" ||
        data.showType == null
      ) {
        this.isshowType = false;
      } else {
        this.isshowType = true;
      }
      if (type == "add") {
        this.basicsForm = {
          dimensionName: "",
          ratio: "",
          showType: "",
          taskFrom: "",
          taskType: "",
          isMerge: "",
          taskMax: "",
          formSort: "",
        };
        this.$nextTick(() => {
          this.$refs.searchFrom.resetFields();
        });

        this.dialogFormVisible = true;
      } else if (type == "mode") {
        this.dialogFormVisible = true;
        // this.basicsForm=data
        let params = {
          formDimensionId: data.formDimensionId,
        };
        this.mode(sessid, params);
      } else if (type == "dele") {
        let params = {
          status: "N",
          fmId: data.formDimensionId,
        };
        this.delegoClick(sessid, params);
      } else if (type == "yu") {
        if (this.$route.path == "/basicsk") {
          this.$router.push({
            path: "/preview",
          });
        } else if (this.$route.path == "/kpiFormList") {
          this.$router.push({
            path: "/kpipreview",
          });
        }
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
  .flex-task {
    display: flex;
    .el-form-item__content {
      width: 100%;
    }
    .el-form-item__label {
      width: 200px;
    }
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