<template>
  <div class="basicse">
    <div class="serach">
      <div class="serach-left">绩效关系管理</div>
      <div class="serach-right">
        <div>
          <el-button
            type="primary"
            size="mini"
            @click="modeClick('wei', 'wei')"
            v-if="hasQx('aph2_pfm_WPZGXCK-QX-C20')"
            >未配置人员关系</el-button
          >
          <el-button
            type="danger"
            size="mini"
            @click="modeClick('add', 'add')"
            v-if="hasQx('aph2_pfm_GXXZ-QX-C11')"
            >新增绩效关系</el-button
          >
          <el-button
            type="danger"
            size="mini"
            @click="modeClick('dele', 'dele')"
            v-if="hasQx('aph2_pfm_GXSC-QX-C12')"
            >删除绩效关系</el-button
          >
        </div>
      </div>
    </div>
    <div class="seach-form">
      <el-form ref="SearchFrom" :model="getForm" class="flex-form">
        <div class="seach-flex">
          <el-form-item label="考核对象" style="display: flex">
            <el-input
              size="mini"
              v-model="getForm.userName"
              placeholder="请输入考核对象"
              @keyup.enter.native="serchClickF('react')"
            ></el-input>
          </el-form-item>

          <el-form-item label="机构名称" style="display: flex">
            <el-input
              size="mini"
              v-model="getForm.orgName"
              placeholder="请输入机构名称"
              @keyup.enter.native="serchClickF('react')"
            ></el-input>
          </el-form-item>
        </div>
        <div class="button">
          <div>
            <el-button
              size="mini"
              @click="resetClickF"
              v-if="hasQx('aph2_pfm_GXCX-QX-C19')"
              >重置</el-button
            >
          </div>
          <div>
            <el-button
              size="mini"
              type="danger"
              @click="serchClickF('react')"
              color="red"
              v-if="hasQx('aph2_pfm_GXCX-QX-C19')"
              >查询</el-button
            >
          </div>
        </div>
      </el-form>
    </div>

    <div class="seach-form">
      <el-table
        :data="tableBasicsa"
        border
        style="width: 100%"
        @selection-change="handleSelectionChangePeople"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="序号" width="60" type="index"></el-table-column>
        <el-table-column
          prop="userName"
          label="考核对象名称"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="userRole"
          label="角色"
          width="100"
        ></el-table-column>
        <el-table-column prop="orgName" label="所属考核机构"></el-table-column>
        <el-table-column prop="companyName" label="所属公司"></el-table-column>
        <el-table-column
          prop="departmentName"
          label="所属部门"
        ></el-table-column>
        <el-table-column
          prop="subjectName"
          label="考核主体"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="createDate"
          label="创建日期"
          width="130"
        ></el-table-column>
        <el-table-column label="操作" class="active-com" width="80">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="modeClick(scope.row, 'mode')"
              v-if="hasQx('aph2_pfm_GXXG-QX-C14')"
              >修改</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      title="绩效关系管理"
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
        :rules="searchFromP"
        ref="searchFrom"
      >
        <el-form-item
          label="考核对象："
          label-width="150px "
          prop="objectUserName"
          @click.native="clickinner('xiang')"
        >
          <el-input
            v-model="basicsForm.objectUserName"
            size="mini"
            required
          ></el-input>
        </el-form-item>

        <!-- <el-form-item
          label="考核对象工号："
          label-width="150px "
          prop="objectUserNumber"
          @click.native="clickinner('hao')"
        >
          <el-input v-model="basicsForm.objectUserNumber" size="mini" required></el-input>
        </el-form-item> -->

        <el-form-item
          label="考核主体："
          label-width="100px "
          prop="subjectName"
          @click.native="clickinner('ti')"
        >
          <el-input
            v-model="basicsForm.subjectName"
            size="mini"
            required
          ></el-input>
        </el-form-item>
        <!-- <el-form-item
          label="责任人："
          label-width="150px "
          prop="liablerName"
          @click.native="clickinner('ze')"
        >
          <el-input v-model="basicsForm.liablerName" size="mini" required></el-input>
        </el-form-item>
        <el-form-item
          label="控制人："
          label-width="150px "
          prop="controllerName"
          @click.native="clickinner('kong')"
        >
          <el-input v-model="basicsForm.controllerName" size="mini" required></el-input>
        </el-form-item> -->

        <el-form-item
          label="考核对象所属机构："
          label-width="150px "
          prop="orgName"
        >
          <el-input
            v-model="basicsForm.orgName"
            size="mini"
            @click.native="clickinner('gou')"
            required
          ></el-input>
        </el-form-item>

        <el-form-item
          label="考核对象所属角色："
          label-width="150px "
          prop="objectRole"
          class="chang-radio"
        >
          <el-radio-group v-model="basicsForm.objectRole" @change="changeradio">
            <el-radio label="ROLE_BASIC">中坚层</el-radio>
            <el-radio label="ROLE_MANAGER">管理层</el-radio>
            <el-radio label="ROLE_LEADER">领导层</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="考核对象所属表单："
          label-width="150px"
          prop="formCode"
          class="chang-opto"
        >
          <el-select
            v-model="basicsForm.formCode"
            placeholder="请选择"
            size="mini"
            @change="changDimens($event)"
            filterable
            remote
          >
            <el-option
              v-for="item in optionsReg"
              :key="item.formCode"
              :label="item.formName"
              :value="item.formCode"
            ></el-option>
          </el-select>
        </el-form-item>
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
import searPage from "../../components/searPage";

export default {
  data() {
    return {
      tableBasicsa: [],
      sessid: sessionStorage.getItem("sso_sessionid"),
      dialogFormVisible: false,
      innerVisibles: false,
      okdisabled: false,
      basicsForm: {
        objectUserName: "",
        subjectName: "",
        liablerName: "",
        controllerName: "",
        orgName: "",
        objectRole: "",
        formName: "",
        objectUserNumber: "",
        subjectUser: "",
        formCode: "",
      },
      searchCheck: "",
      isWuPhone: true,
      checkList: "",
      currentPage: 1,
      optionsReg: [],
      total: 1,
      getForm: {
        userName: "",
        orgName: "",
      },
      listImg: [],
      multipleSelection: [],
      listImgRight: {},
      seaType: "",
      searchFromP: {
        objectUserName: [
          {
            required: true,
            message: "请输入考核对象",
            trigger: "change",
          },
        ],
        objectUserNumber: [
          {
            required: true,
            message: "请输入考核对象工号",
            trigger: "change",
          },
        ],

        subjectName: [
          { required: true, message: "请输入考核主体", trigger: "change" },
        ],
        liablerName: [
          { required: true, message: "请输入责任人", trigger: "change" },
        ],
        controllerName: [
          { required: true, message: "请输入控制人", trigger: "change" },
        ],
        orgName: [
          {
            required: true,
            message: "请输入考核对象所属机构",
            trigger: "change",
          },
        ],
        objectRole: [
          {
            required: true,
            message: "请选择考核对象所属角色",
            trigger: "change",
          },
        ],
        formCode: [
          {
            required: true,
            message: "请输入考核对象所属表单",
            trigger: "change",
          },
        ],
      },
    };
  },
  components: {
    searPage,
    Pagination,
  },
  created() {
    // this.$store.commit("modifyindexSi", "2-3");
    // let sessid = this.sessid;
    // this.getclick();
  },
  mounted() {
    this.$store.commit("modifyindexSi", "2-3");
    let sessid = this.sessid;
    this.getclick();
    // this.getFormModelList(sessid,this.basicsForm.objectRole);
  },
  methods: {
    hasQx(value) {
      return this.commonFn.hasQx(value, this);
    },
    changeradio(e) {
      let sessid = this.sessid;
      // this.basicsForm.formName = "";
      this.basicsForm.formCode = "";
      this.basicsForm.objectRole = e;
      this.getFormModelList(sessid, "55", e);
    },
    changDimens(e) {
      var that = this;
      that.optionsReg.map((item, i) => {
        if (item.formCode == e) {
          that.basicsForm.formCode = item.formCode;
        }
      });
    },
    goNET(data) {
      this.$refs.refs.listImgRight = {};
      if (this.seaType == "xiang") {
        this.basicsForm.objectUserName = data.staffName;
        // this.basicsForm.objectUser = vPinyin.chineseToPinYin(data.staffName);
        //  this.basicsForm.objectUser = data.username;

        this.basicsForm.objectUserNumber = data.staffNumber;
        if (data.username == null || data.username == "") {
          this.basicsForm.objectUser = "";
        } else {
          this.basicsForm.objectUser = data.username;
        }

        this.basicsForm.departmentName = data.departmentName;
      } else if (this.seaType == "ti") {
        this.basicsForm.subjectName = data.staffName;
        this.basicsForm.staffNumber = data.staffNumber;
        this.basicsForm.subjectUserNumber = data.staffNumber;
        // this.basicsForm.subjectUser = vPinyin.chineseToPinYin(data.staffName);
        //  this.basicsForm.subjectUser = data.username;

        if (data.username == null || data.username == "") {
          this.basicsForm.subjectUser = "";
        } else {
          this.basicsForm.subjectUser = data.username;
        }
      } else if (this.seaType == "ze") {
        this.basicsForm.liablerName = data.staffName;
        // this.basicsForm.liabler = vPinyin.chineseToPinYin(data.staffName);
        // this.basicsForm.liabler = data.username;

        if (data.username == null || data.username == "") {
          this.basicsForm.liabler = "";
        } else {
          this.basicsForm.liabler = data.username;
        }
      } else if (this.seaType == "kong") {
        this.basicsForm.controllerName = data.staffName;
        // this.basicsForm.controller = vPinyin.chineseToPinYin(data.staffName);
        // this.basicsForm.controller = data.username;

        if (data.username == null || data.username == "") {
          this.basicsForm.controller = "";
        } else {
          this.basicsForm.controller = data.username;
        }
      } else if (this.seaType == "gou") {
        this.basicsForm.orgName = data.staffName;
        this.basicsForm.orgCode = data.orgCode;
      } else if (this.seaType == "hao") {
      }
      this.$refs.refs.checkList = "";
      this.innerVisibles = false;
    },
    closepop() {
      this.innerVisibles = false;
      // console.log(this.$store.status.searPageType)
    },
    changePage(page) {
      this.currentPage = page;
      this.getclick();
    },
    // 弹框重置
    clickinner(type) {
      this.innerVisibles = true;
      this.seaType = type;
      if (type == "gou") {
        this.$store.commit("getsearPageType", "com");
      } else {
        this.$store.commit("getsearPageType", "people");
      }
    },
    serchClickF() {
      this.currentPage = 1;
      this.getclick();
    },
    resetClickF() {
      this.getForm.orgName = "";
      this.getForm.userName = "";
      this.currentPage = 1;
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
      data.status = "Y";
      this.$refs[searchFrom].validate((valid) => {
        if (valid) {
          this.api.insertOrUpdateRelationUser(sessid, data).then((res) => {
            if (res.data.status == 200) {
              this.$message.success("保存成功");
              this.dialogFormVisible = false;
              this.getclick();
              this.$refs.searchFrom.resetFields();
              this.okdisabled = false;
            } else {
              this.okdisabled = true;
            }
          });
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },

    getclick() {
      let sessid = this.sessid;
      let params = {
        userName: this.getForm.userName,
        orgName: this.getForm.orgName,
        pageSize: this.$store.state.pageSize,
        page: this.currentPage,
      };
      this.api.getBasicse(sessid, params).then((res) => {
        let data = res.data;
        if (data.status == 200) {
          this.tableBasicsa = data.data.records;
          this.total = data.data.total;
        }
      });
    },
    handleSelectionChangePeople(val) {
      this.multipleSelection = [];
      for (let i = 0; i < val.length; i++) {
        if (this.multipleSelection.indexOf(val[i].userId) === -1) {
          this.multipleSelection.push(val[i].userId);
        }
      }
    },
    getFormModelList(sessid, datas, type) {
      var that = this;
      let code = type;
      this.api.getFormModelList(sessid, code).then((res) => {
        if (res.data.status == 200) {
          that.optionsReg = res.data.data;

          let codes = that.optionsReg;
          codes.map((item, i) => {
            if (item.formCode == datas.formCode) {
              that.basicsForm.formName = item.formName;
              that.basicsForm.formCode = item.formCode;
            }
          });
        }
      });
    },
    getRelatio(sessid, userId) {
      this.api.getRelationUserDetail(sessid, userId).then((res) => {
        let data = res.data;
        if (data.status == 200) {
          var that = this;

          // let formCode = this.basicsForm.formCode;
          // console.log(this.basicsForm);

          this.basicsForm.objectRole = data.data.relationUser.objectRole;

          that.basicsForm = JSON.parse(JSON.stringify(data.data.relationUser));
          // that.basicsForm.formName = "";
          // that.basicsForm.formCode = "";

          this.getFormModelList(
            sessid,
            data.data.relationUser,
            data.data.relationUser.objectRole
          );

          // new Promise(function (resolve, reject) {
          //   setTimeout(function () {
          //     resolve("成功!");

          //   }, 1000);
          // });
        }
      });
    },
    modeClick(data, type) {
      let sessid = this.sessid;
      if (type == "add") {
        this.dialogFormVisible = true;
        this.optionsReg = [];
      } else if (type == "dele") {
        if (this.multipleSelection.length == 0) {
          this.$message.error("请最少选择一个");
          return false;
        }
        let params = {
          userIds: this.multipleSelection.join(","),
        };
        this.$confirm("是否删除?", "删除", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.api.deleteRelationSetUsers(sessid, params).then((res) => {
              let data = res.data;
              if (data.status == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.getclick();
              }
            });
          })
          .catch(() => {});
      } else if (type == "mode") {
        this.dialogFormVisible = true;

        let userId = data.userId;

        this.getRelatio(sessid, userId);
        // // this.getFormModelList(sessid, this.basicsForm.objectRole);
        // let codes = this.optionsReg;
        // console.log(codes);
        // codes.map((item, i) => {
        //   if (item.formCode == formCode) {
        //     this.basicsForm.formName = item.formName;
        //     // this.basicsForm.formCode = item.formCode;
        //   }
        // });
      } else if (type == "wei") {
        if (this.$route.path == "/kpiRela") {
          this.$router.push({
            path: "/kpiRelaNo",
          });
        } else if (this.$route.path == "/basicse")
          this.$router.push({
            path: "/basicsno",
          });
      }
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