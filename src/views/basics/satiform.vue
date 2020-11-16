<template>
  <div class="satifom">
    <div class="serach">
      <div class="serach-left">{{ titles }}</div>
      <div class="serach-right">
        <el-button size="mini" @click="$router.go(-1)">返回</el-button>
      </div>
    </div>

    <div class="seach-form" v-if="isSearch">
      <el-form ref="SearchFrom" :model="getForm">
        <div class="seach-flex">
          <el-form-item
            label="绩效模板"
            label-width="80px"
            prop="formCode"
            class="form-chang"
          >
            <el-select
              v-model="getForm.formCode"
              placeholder="请选择绩效模板"
              size="mini"
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

          <el-form-item
            label="绩效月份"
            label-width="80px"
            prop="formDate"
            class="form-chang"
          >
            <el-date-picker
              size="mini"
              v-model="getForm.formDate"
              type="month"
              placeholder="请选择绩效月份"
              value-format="yyyy-MM"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div class="button">
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
    <div class="button-end" v-if="isButtons">
      <el-button
        size="mini"
        type="danger"
        @click="modeClick('ok')"
        v-if="isokButton"
        >保存</el-button
      >
      <el-button
        size="mini"
        type="danger"
        @click="modeClick('ti')"
        v-if="isokButton"
        >提交</el-button
      >
    </div>
    <div class="border-none mineform">
      <el-form :model="formHead">
        <table class="jixiao">
          <tbody>
            <tr class="baseinfo">
              <td colspan="10">
                <table style="border: none; width: 100%">
                  <tr>
                    <td style="width: 25%; border: none">
                      <el-form-item
                        label="中心/服务中心/子公司："
                        class="form-el change"
                        label-width="230px"
                        prop="standardName"
                      >
                        <el-input
                          size="mini"
                          v-model="companyName"
                          readonly
                        ></el-input>
                      </el-form-item>
                    </td>
                    <td style="width: 14%; border: none">考核主体：</td>
                    <td style="width: 32%; border: none">考核周期：</td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr class="text-li">
              <td style="width: 6%">工号</td>
              <td style="width: 6%">姓名</td>
              <td style="width: 8%">部门</td>
              <td style="width: 6%">岗位</td>
              <td v-for="(item, index2) in testList" :key="index2">
                {{ item.dimensionName }}
              </td>
              <td>综合评星</td>
            </tr>
            <tr class="text-li" v-for="(item, index4) in listTto" :key="index4">
              <td>{{ item.staffNumber }}</td>
              <td>{{ item.staffName }}</td>
              <td>{{ item.departmentName }}</td>
              <td>{{ item.positionName }}</td>
              <td v-for="(item2, index3) in item.pmFormTasks" :key="index3">
                <el-rate
                  :disabled-void-color="colorRate"
                  v-model="item2.taskStar"
                  :allow-half="true"
                  :disabled="item.displo"
                  class="thick"
                ></el-rate>
              </td>
              <!-- 综合评分 -->
              <td class="thick">
                <el-rate
                  :disabled-void-color="colorRate"
                  v-model="item.taskAllStar"
                  :allow-half="true"
                  disabled
                  class="thick"
                ></el-rate>
              </td>
            </tr>
          </tbody>
        </table>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    return {
      sessid: sessionStorage.getItem("sso_sessionid"),
      formHead: {},
      isSearch: false,
      zhiList: {},
      rateZhiZ: 0,
      isXing: false,
      isButtons: false,
      standardName: "",
      executorName: "",
      isokButton: false,
      companyName: "",
      colorRate: "#c2c2c2",
      titles: "满意度模板表单预览",
      testList: [{}, {}, {}],
      optionsReg: [],
      getForm: {
        formDate: "",
        formCode: "",
      },

      listTto: [
        {
          staffNumber: "MG312**",
          staffName: "张三",
          departmentName: "运营中心",
          positionName: "专业主管",
          pmFormTasks: [],
          
        },
        {
          staffNumber: "MG313**",
          staffName: "李四",
          departmentName: "运营中心",
          positionName: "专业主管",
          pmFormTasks: [],
        },
        {
          staffNumber: "MG314**",
          staffName: "王五",
          departmentName: "运营中心",
          positionName: "专业主管",
          pmFormTasks: [],
        },
      ],
    };
  },

  mounted() {
    let sessid = this.sessid;
    let params = {
      formId: this.$store.state.formId,
    };

    let type = this.$route.query.type;
    if (type == "yu") {
      this.titles = "满意度模板表单预览";
      this.$store.commit("modifyindexSi", "2-4");
      this.getFromModelDeatil(sessid, params);
      this.isSearch = false;
    } else if (type == "dai") {
      // 待审批绩效，可以评分
      this.titles = "满意度表单评分";
      this.$store.commit("modifyindexSi", "3-6");
      this.getSatisfactionFormDetail();
      this.isokButton = true;
      this.isSearch = true;
    } else if (type == "cha") {
      this.isSearch = true;
      this.titles = "满意度表单评分";
      this.$store.commit("modifyindexSi", "3-1");
      this.getSatisfactionFormDetail();
      this.isokButton = false;
    }
  },
  created() {
    // var myDate = new Date();
    // var tYear = myDate.getFullYear();
    // var tMonth = myDate.getMonth();
    // var m = tMonth + 1;
    // if (m.toString().length == 1) {
    //   m = "0" + m;
    // }
    this.getForm.formDate = this.$store.state.okDate;

    this.getForm.formCode = this.$store.state.okDateCode;
  },
  methods: {
    resetClickF() {
      this.getForm = {
        formDate: "",
        formCode: "",
      };
      this.getSatisfactionFormDetail();
    },
    serchClickF() {
      this.getSatisfactionFormDetail();
    },
    getFromModelDeatil(sessid, params) {
      this.api.getFromModelDeatil(sessid, params).then((res) => {
        if (res.data.status == 200) {
          this.testList = res.data.data.taskList;
          var testListle = this.testList.length;
          let listTto = this.listTto;
          let  taskStar=0;
          listTto.map((item, i) => {
            for (let i=0; i<testListle;i++){
              item.pmFormTasks.push({taskStar});
            }
          });
            this.listTto = listTto;
            // console.log(listTto)
        }
      });
    },
    getSatisfactionFormDetail() {
      let sessid = this.sessid;
      let params = {
        formUserCode: this.$store.state.formUserCode,
        formCode: this.getForm.formCode,
        formDate: this.getForm.formDate,
      };
      this.api.getSatisfactionFormDetail(sessid, params).then((res) => {
        if (res.data.status == 200) {
          this.$store.commit("getokDateCode", this.getForm.formCode);
          this.getForm.formCode = this.$store.state.okDateCode;
          this.testList = res.data.data.formDimensions;
          this.optionsReg = res.data.data.pmFormHeads;
          var tasks = JSON.parse(JSON.stringify(res.data.data.tasks));
          // console.log(tasks.length)
          if (
            res.data.data.subjectUser == this.$store.state.userInfo.username
          ) {
            this.isButtons = true;
          } else {
            this.isButtons = false;
          }

          for (var i in tasks) {
            let pmFormTasks = tasks[i].pmFormTasks;
            if (tasks[i].isScore == "N") {
              tasks[i].displo = false;
            } else {
              tasks[i].displo = true;
            }
            for (var j in pmFormTasks) {
              pmFormTasks[j].taskStar = Number(pmFormTasks[j].taskStar);
            }
            tasks[i].taskAllStar = Number(tasks[i].taskAllStar);
          }
          this.listTto = tasks;
          // console.log(this.listTto);
        }
      });
    },

    getApiOk(typeSar) {
      let sessid = this.sessid;
      var arr = [];
      let listTto = this.listTto;

      // console.log(listTto);
      // taskStar
      //  var checkresult = arr.every(function (item, index, array) {
      //   return item == 5;
      // });

      // for(let i in listTto){
      //    listTto[i].pmFormTasks.every(function (item, index, array){
      //       console.log(item)
      //     })
      //   console.log(listTto[i])
      // }
      // return;

      for (let i in listTto) {
        var item = {
          userName: listTto[i].username,
          formDate: this.getForm.formDate,
          formsSores: [],
        };
        if (listTto[i].isScore == "N") {
          arr.push(item);
        }
        var pmFormTasks = listTto[i].pmFormTasks;
        for (let j in pmFormTasks) {
          var item2 = {
            taskCode: pmFormTasks[j].taskCode,
            taskStar: pmFormTasks[j].taskStar,
          };
          item.formsSores.push(item2);
        }
      }

      if (arr.length == 0) {
        this.$message.error("当前表单已评价完成");
        return false;
      }

      // console.log(arr)
      // return;

      //  for(let p in arr){
      //    console.log(arr[p])
      //     for(let j in arr[p].formsSores){
      //       if(arr[p].formsSores[j].taskStar==0){

      //       }
      //     }
      // }

      // return
      this.api.satisfactionFormRating(sessid, arr, typeSar).then((res) => {
        // this.$message.success("保存成功");
        // this.reload();
        this.getSatisfactionFormDetail();
      });
    },
    //提交
    modeClick(type) {
      if (type == "ok") {
        this.getApiOk("0");
      } else if (type == "ti") {
        this.getApiOk("1");
      }
    },
  },
};
</script>

<style lang="less">
@import url("../../assets/utils.less");
.text-li {
  text-align: center;
}
.satifom {
  .button-end {
    & > button:nth-child(1) {
      margin: 0 12px;
    }
    & > button:nth-child(2) {
      margin-right: 8px;
    }
    // padding-right:30px;
  }
  .width-auto();
  .seach-form {
    display: flex;
  }
  .el-form {
    width: 100% !important;
    position: relative;
  }
  .seach-flex {
    display: flex;
    display: -webkit-flex;
    padding-right: 10px;
  }
  .button {
    .flex(flex-end);
    position: absolute;
    align-items: center;
    margin-left: 18px;
    top: 6px;
    right: 10px;
    & > div:nth-child(1) {
      margin: 0 20px;
    }
  }
}
// .thick {
//   .el-rate {
//     .flex(center);
//   }

//   .el-rate__item {
//     margin: auto 0;
//   }
//   .el-rate__icon {
//     margin-right: 2px !important;
//     transform: scale(1.3);
//   }
//   .dis {
//     .el-icon-star-on {
//       color: #c2c2c2 !important;
//     }
//   }
// }
</style>