<template>
  <div class="basicse">
    <div class="serach">
      <div class="serach-left">绩效机构管理</div>
      <div class="serach-right">
        <!-- <div>
          <el-button type="danger" size="mini" @click="modeClick('add')">新增</el-button>
        </div>-->
      </div>
    </div>
    <div class="seach-form">
      <el-form ref="SearchFrom" :model="getForm">
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

          <div class="button">
            <div>
              <el-button
                size="mini"
                @click="resetClickF"
                v-if="hasQx('aph2_pfm_JGCX-QX-C19')"
                >重置</el-button
              >
            </div>
            <div>
              <el-button
                size="mini"
                type="danger"
                @click="serchClickF('react')"
                color="red"
                v-if="hasQx('aph2_pfm_JGCX-QX-C19')"
                >查询</el-button
              >
            </div>
          </div>
        </div>
      </el-form>
    </div>

    <div class="seach-form">
      <el-table :data="tableBasicsa" border style="width: 100%">
        <el-table-column label="序号" width="60" type="index"></el-table-column>

        <el-table-column prop="orgName" label="机构名称"></el-table-column>
        <el-table-column prop="liablerName" label="责任人"  width="100"></el-table-column>
        <el-table-column
          prop="orgAdminName"
          label="绩效管理员"
          width="100"
        ></el-table-column>
        <el-table-column prop="controllerName" label="控制人"  width="100"></el-table-column>
        <el-table-column
         width="120"
          prop="companyAdminName"
          label="地区公司管理员"
        ></el-table-column>
        <el-table-column
          prop="localAdminName"
          label="本部管理员"
           width="100"
        ></el-table-column>
        <el-table-column
         width="180"
          prop="hrAdminName"
          label="人力资源中心绩效管理员"
        ></el-table-column>
        <el-table-column label="操作" class="active-com"
         width="100"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="modeClick(scope.row)"
              v-if="hasQx('aph2_pfm_JGXG-QX-C14')"
              >修改</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      title="绩效机构管理"
      :visible="dialogFormVisible"
      :showClose="false"
    >
      <!-- 内层 -->
      <!-- <el-dialog width="100%" title="内层 Dialog" :visible.sync="innerVisible" append-to-body>555</el-dialog> -->

      <searPage
        :innerVisible="innerVisibles"
        @closepop="closepop"
        @goNET="goNET"
        ref="refs"
      ></searPage>

      <el-form
        :model="basicsForm"
        class="basi-a"
        :rules="searchFrom"
        ref="searchFrom"
      >
        <el-form-item label="机构名称" label-width="150px" prop="orgName">
          <el-input
            v-model="basicsForm.orgName"
            size="mini"
            required
            readonly
            placeholder="请选择机构名称"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="责任人"
          label-width="150px"
          prop="liablerName"
          @click.native="clickinner('ze')"
        >
          <el-input
            v-model="basicsForm.liablerName"
            size="mini"
            required
            placeholder="请选择责任人"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="绩效机构管理员"
          label-width="150px "
          prop="orgAdminName"
          @click.native="clickinner('ji1')"
        >
          <el-input
            v-model="basicsForm.orgAdminName"
            size="mini"
            required
            placeholder="请选择绩效机构管理员"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="机构控制人"
          label-width="150px "
          prop="controllerName"
          @click.native="clickinner('ji2')"
        >
          <el-input
            v-model="basicsForm.controllerName"
            size="mini"
            required
            placeholder="请选择机构控制人"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          label="地区公司管理员"
          label-width="150px "
          prop="companyAdminName"
          @click.native="clickinner('di')"
        >
          <el-input
            v-model="basicsForm.companyAdminName"
            size="mini"
            placeholder="请选择地区公司管理员"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="本部管理员"
          label-width="150px "
          prop="localAdminName"
        >
          <el-input
            v-model="basicsForm.localAdminName"
            size="mini"
            @click.native="clickinner('ben')"
            required
            placeholder="请选择本部管理员"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="人力资源中心管理员"
          label-width="150px "
          prop="hrAdminName"
        >
          <el-input
            v-model="basicsForm.hrAdminName"
            size="mini"
            @click.native="clickinner('ren')"
            required
            placeholder="请选择人力资源中心管理员"
          ></el-input>
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
// import Pagination from "../../components/pagination";
import searPage from "../../components/searPage";

export default {
  data() {
    return {
      tableBasicsa: [],
      sessid: sessionStorage.getItem("sso_sessionid"),
      dialogFormVisible: false,
      innerVisibles: false,
      basicsForm: {
        hrAdminName: "",
        hrAdmin: "",
        liablerName: "",
        orgAdminName: "",
        hrAdminName: "",
      },
      searchCheck: "",
      isWuPhone: true,
      checkList: "",
      currentPage: 1,
      total: 1,
      getForm: {
        orgName: "",
      },
      listImg: [],
      listImgRight: {},
      seaType: "",
      searchFrom: {
        liablerName: [
          { required: true, message: "请选择责任人", trigger: "change" },
        ],
        orgName: [
          { required: true, message: "请选择绩效机构", trigger: "change" },
        ],

        orgAdminName: [
          {
            required: true,
            message: "请选择绩效机构管理员",
            trigger: "change",
          },
        ],
        hrAdminName: [
          {
            required: true,
            message: "请选择人力资源中心管理员",
            trigger: "change",
          },
        ],
      },
    };
  },
  components: {
    searPage,
  },
  mounted() {
    this.$store.commit("modifyindexSi", "2-1");
    let sessid = this.sessid;
    this.getclick();
  },
  methods: {
    hasQx(value) {
      return this.commonFn.hasQx(value, this);
    },
    goNET(data) {
      this.$refs.refs.listImgRight = {};
      if (this.seaType == "ze") {
        this.basicsForm.liablerName = data.staffName;
        if (data.username == null || data.username == "") {
          this.basicsForm.liabler = "";
        } else {
          this.basicsForm.liabler = data.username;
        }
      } else if (this.seaType == "ji1") {
        this.basicsForm.orgAdminName = data.staffName;

        if (data.username == null || data.username == "") {
          this.basicsForm.orgAdmin = "";
        } else {
          this.basicsForm.orgAdmin = data.username;
        }
      } else if (this.seaType == "ji2") {
        this.basicsForm.controllerName = data.staffName;
        if (data.username == null || data.username == "") {
          this.basicsForm.controller = "";
        } else {
          this.basicsForm.controller = data.username;
        }
      } else if (this.seaType == "di") {
        this.basicsForm.companyAdminName = data.staffName;

        if (data.username == null || data.username == "") {
          this.basicsForm.companyAdmin = "";
        } else {
          this.basicsForm.companyAdmin = data.username;
        }
      } else if (this.seaType == "ben") {
        this.basicsForm.localAdminName = data.staffName;

        if (data.username == null || data.username == "") {
          this.basicsForm.localAdmin = "";
        } else {
          this.basicsForm.localAdmin = data.username;
        }
      } else if (this.seaType == "ren") {
        this.basicsForm.hrAdminName = data.staffName;
        if (data.username == null || data.username == "") {
          this.basicsForm.hrAdmin = "";
        } else {
          this.basicsForm.hrAdmin = data.username;
        }
      }

      this.$refs.refs.checkList = "";
      this.innerVisibles = false;
    },
    closepop() {
      this.innerVisibles = false;
    },

  
    // 弹框重置
    clickinner(type) {
      if (type == "gou") {
        this.$store.commit("getsearPageType", "com");
      } else {
        this.$store.commit("getsearPageType", "people");
      }

      this.innerVisibles = true;
      this.seaType = type;
    },
    serchClickF() {
      this.getclick();
    },
    resetClickF() {
      this.getForm.orgName = "";
      this.$refs.SearchFrom.resetFields();
      this.getclick();
      
    },
    cancelClick() {
      this.dialogFormVisible = false;
      this.$refs.searchFrom.resetFields();
    },
    goClick(searchFrom) {
      let sessid = this.sessid;
      let data = this.basicsForm;
      data.orgInfoId = data.orgInfoId;
      this.$refs[searchFrom].validate((valid) => {
        if (valid) {
          this.api.insertOrUpdateRelationOrg(sessid, data).then((res) => {
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
      let orgName = this.getForm.orgName;
      this.api.getRelationOrgList(sessid, orgName).then((res) => {
        let data = res.data;
        if (data.status == 200) {
          this.tableBasicsa = data.data;
        }
      });
    },
    modeClick(data) {
      this.dialogFormVisible = true;
      let sessid = this.sessid;

      let orgInfoId = data.orgInfoId;

      this.api.getRelationOrgDetail(sessid, orgInfoId).then((res) => {
        let data = res.data;
        if (data.status == 200) {
          this.basicsForm = data.data;
        }
      });
    },
  },
};
</script>

<style lang="less" >
@import url("../../assets/utils.less");

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