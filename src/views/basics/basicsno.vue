<template>
  <div class="basicse">
    <div class="serach">
      <div class="serach-left">未配置人员</div>
      <div class="serach-right">
        <div>
          <el-button size="mini" @click="$router.go(-1)">返回</el-button>
        </div>
      </div>
    </div>
    <div class="seach-form">
      <el-form ref="SearchFrom" :model="getForm" class="flex-form">
        <div class="seach-flex">
          <el-form-item label="机构名称" label-width="80px" prop="companyName">
            <el-input
              size="mini"
              v-model="getForm.userName"
              placeholder="请输入机构名称"
              @keyup.enter.native="serchClickF('react')"
            ></el-input>
          </el-form-item>

          <el-form-item label="姓名" label-width="80px" prop="companyName">
            <el-input
              size="mini"
              v-model="getForm.orgName"
              placeholder="请输入姓名"
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

    <div class="button-end">
      <el-button
        type="danger"
        size="mini"
        @click="modeClick('dele', 'dele')"
        v-if="hasQx('aph2_pfm_WPZGXXZ-QX-C11')"
        >绩效关系配置</el-button
      >
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
        <el-table-column prop="companyName" label="机构名称"></el-table-column>
        <el-table-column
          prop="departmentName"
          label="专业"
        ></el-table-column>
        <el-table-column prop="staffName" label="姓名"></el-table-column>
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
          label-width="150px"
          prop="staffNames"
          style="width: 100%"
        >
          <el-input
            v-model="basicsForm.staffNames"
            size="mini"
            readonly
          ></el-input>
        </el-form-item>

        <el-form-item
          label="考核主体："
          label-width="150px "
          prop="subjectName"
          @click.native="clickinner('ji1')"
        >
          <el-input
            v-model="basicsForm.subjectName"
            size="mini"
            readonly
          ></el-input>
        </el-form-item>
        <!-- <el-form-item
          label="责任人：	"
          label-width="150px "
          prop="liablerName"
          @click.native="clickinner('ji2')"
        >
          <el-input
            v-model="basicsForm.liablerName"
            size="mini"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item
          label="控制人："
          label-width="150px "
          prop="controllerName"
          @click.native="clickinner('di')"
        >
          <el-input
            v-model="basicsForm.controllerName"
            size="mini"
            readonly
          ></el-input>
        </el-form-item> -->
        <el-form-item
          label="考核对象所属机构："
          label-width="150px "
          prop="orgName"
        >
          <el-input
            v-model="basicsForm.orgName"
            size="mini"
            readonly
            @click.native="clickinner('gou')"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="考核对象所属角色："
          label-width="150px "
          prop="objectRole"
          class="chang-radio"
          style="width: 100%"
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
          prop="formName"
          class="chang-opto"
        >
          <el-select
            v-model="basicsForm.formName"
            placeholder="请选择"
            size="mini"
            @change="changDimens($event, basicsForm)"
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
import searPage from "../../components/searPage";
import Pagination from "../../components/pagination";

export default {
  inject: ["reload"],
  data() {
    return {
      tableBasicsa: [],
      total: 1,
      currentPage: 1,

      sessid: sessionStorage.getItem("sso_sessionid"),
      dialogFormVisible: false,
      innerVisibles: false,
      optionsReg: [],
      basicsForm: {
        staffNames: "",
        subjectName: "",
        orgName: "",
        objectRole: "",
        formName: "",
        orgCode: "",
      },
      multipleSelection: [],
      multipleSelectionN: [],
      multipleSelectionGong: [],
      departmentNameList: [],
      checkList: "",
      getForm: {
        userName: "",
        orgName: "",
      },
      listImg: [],
      listImgRight: {},
      seaType: "",
      searchFromP: {
        staffNames: [
          {
            required: true,
            message: "请选择考核对象",
            trigger: "change",
          },
        ],
    
        subjectName: [
          { required: true, message: "请选择考核主体", trigger: "change" },
        ],
        

        orgName: [
          {
            required: true,
            message: "请选择考核对象所属机构",
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
        formName: [
          {
            required: true,
            message: "请选择考核对象所属表单",
            trigger: "change",
          },
        ],
      },
    };
  },
  components: {
    Pagination,
    searPage,
  },

  mounted() {
    this.$store.commit("modifyindexSi", "2-3");
    let sessid = this.sessid;
    this.getclick();
  },
  methods: {
     changePage(page) {
      //  console.log(page)
      this.currentPage = page;
      this.getclick();
    },
    hasQx(value) {
      return this.commonFn.hasQx(value, this);
    },
    changDimens(e, form) {
      this.optionsReg.map((item, i) => {
        if (item.formCode == e) {
          this.basicsForm.formCode = item.formCode;
          this.basicsForm.formName = item.formName;
        }
      });
    },
    getFormModelList() {
      let sessid = this.sessid;
      let datas = this.basicsForm.objectRole;
      this.api.getFormModelList(sessid, datas).then((res) => {
        if (res.data.status == 200) {
          this.optionsReg = res.data.data;
        }
      });
    },
    changeradio(e) {
      // console.log(e)
      this.basicsForm.formName = "";
      this.basicsForm.formCode = "";
      this.basicsForm.objectRole = e;
      this.getFormModelList();
    },
    handleSelectionChangePeople(val) {
      this.multipleSelection = [];
      this.multipleSelectionN = [];
      this.multipleSelectionGong = [];
      this.departmentNameList = [];
      for (let i = 0; i < val.length; i++) {
        if (this.multipleSelection.indexOf(val[i].staffName) === -1) {
          this.multipleSelection.push(val[i].staffName);
        }

        this.departmentNameList.push(val[i].departmentName);

        //  if (this.departmentNameList.indexOf(val[i].departmentName) === -1) {
        //     this.departmentNameList.push(val[i].departmentName);
        //   }

        if (this.multipleSelectionN.indexOf(val[i].staffName) === -1) {
          this.multipleSelectionN.push(val[i].username);
        }

        if (this.multipleSelectionGong.indexOf(val[i].staffName) === -1) {
          this.multipleSelectionGong.push(val[i].staffNumber);
        }
      }
    },
    goNET(data) {
      this.$refs.refs.listImgRight = {};
      if (this.seaType == "ji1") {
        this.basicsForm.subjectName = data.staffName;
        this.basicsForm.subjectUserNumber = data.staffNumber;
        if (data.username == null || data.username == "") {
          this.basicsForm.subjectUser = "";
        } else {
          this.basicsForm.subjectUser = data.username;
        }
      }    
      else if (this.seaType == "gou") {
        this.basicsForm.orgName = data.staffName;
        this.basicsForm.orgCode = data.orgCode;
      }
      this.$refs.refs.checkList = "";
      this.innerVisibles = false;
    },
    closepop() {
      this.innerVisibles = false;
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
          this.api.insertRelationUsers(sessid, data).then((res) => {
            if (res.data.status == 200) {
              this.$message.success("保存成功");
              this.dialogFormVisible = false;
              this.reload();
              // this.getclick();
              // this.$refs.searchFrom.resetFields();
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    getclick() {
      let sessid = this.sessid;
      let params = {
        departmentName: this.getForm.userName,
        staffName: this.getForm.orgName,
  page: this.currentPage,
        pageSize: this.$store.state.pageSize,
      };
      this.api.selectUnRelationUserList(sessid, params).then((res) => {
        let data = res.data;
        // console.log(data.data)
        if (data.status == 200) {
          this.total=data.data.total
          this.tableBasicsa = data.data.records;
        }
      });
    },
    modeClick(data, type) {
      if (this.multipleSelection.length <= 0) {
        this.$message.error("请至少选择一个");
        return false;
      }
      this.dialogFormVisible = true;
      this.basicsForm.staffNames = this.multipleSelection.join(",");
      this.basicsForm.usernames = this.multipleSelectionN.join(",");
      this.basicsForm.departmentNames = this.departmentNameList.join(",");
      this.basicsForm.staffNums = this.multipleSelectionGong.join(",");
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