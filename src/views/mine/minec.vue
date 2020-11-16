<template>
  <div class="minec" v-if="isbox">
    <div class="serach">
      <div class="serach-left">设置绩效任务</div>
      <div class="serach-right" v-if="isbuttonpp">
        <div>
          <el-button type="danger" size="mini" @click="$router.go(-1)"
            >返回</el-button
          >
        </div>
        <div>
          <el-button type="danger" size="mini" @click="modeClick('add')"
            >确定</el-button
          >
        </div>
      </div>
    </div>

    <div class="minec-box">
      <div class="minec-left">
        <div class="minec-title"></div>
        <div class="minec-left-title">
          绩效任务项
          <span>（{{ leftTable.length }}）</span>
          <!-- <span class="title-font">最多选择9项关键绩效任务</span> -->
        </div>
        <el-table
          ref="seniorTable"
          :data="leftTable"
          tooltip-effect="dark"
          style="width: 100%"
          border
          @selection-change="selsChange"
          :header-cell-class-name="cellClass"
        >
          <el-table-column type="selection" width="100"></el-table-column>
          <el-table-column label="删除" width="40">
            <template slot-scope="scope">
              <i
                class="el-icon-close jia-icon"
                @click="deleqiuy(scope.row, scope.$index)"
              ></i>
            </template>
          </el-table-column>
          <el-table-column
            label="序号"
            width="40"
            type="index"
          ></el-table-column>

          <el-table-column
            label="任务名称"
            prop="taskName"
            width="300"
          ></el-table-column>
          <el-table-column
            label="任务状态"
            prop="taskStatus"
            width="70"
          ></el-table-column>
          <el-table-column
            label="任务计划开始日期"
            prop="taskStartDate"
          ></el-table-column>
          <el-table-column
            label="任务计划结束日期"
            prop="taskEndDate"
          ></el-table-column>
          <el-table-column
            label="任务实际完成日期"
            prop="taskFinishDate"
          ></el-table-column>
        </el-table>
      </div>
      <div class="minec-right">
        <div class="minec-title">设置绩效任务项</div>
        <div class="minec-right-title">
          选择工作任务
          <span class="title-font">点击下列分类可展开或隐藏工作项,</span>
          <span class="title-font-red">红色字体为关键任务</span>
        </div>

        <el-tabs
          v-model="activeName"
          @tab-click="handleClick"
          type="border-card"
        >
          <el-tab-pane label="作为执行人的任务" name="first">
            <ul class="minec-ui">
              <li>
                <div
                  class="minec-li-title"
                  @click="liClick('0')"
                  :class="{ active: current == 0 }"
                >
                  招投标工作计划 （{{ rightTable.length }}）
                </div>
                <el-table
                  ref="maytable"
                  :data="rightTable"
                  tooltip-effect="dark"
                  style="width: 100%"
                  border
                  @selection-change="handleSelectionChangePeople"
                  v-if="isrightTable"
                  :row-style="rowStyleP"
                >
                  <!--  :class="[isclaaRes==true?'clas-red':'']" -->
                  <el-table-column
                    type="selection"
                    :reserve-selection="true"
                  ></el-table-column>
                  <el-table-column
                    label="序号"
                    width="40"
                    type="index"
                  ></el-table-column>
                  <el-table-column
                    label="任务状态"
                    width="70"
                    prop="taskStatus"
                  ></el-table-column>
                  <el-table-column
                    label="执行人"
                    width="70"
                    prop="executorName"
                  ></el-table-column>
                  <el-table-column
                    label="责任人"
                    width="70"
                    prop="liablerName"
                  ></el-table-column>
                  <el-table-column
                    label="关联人"
                    width="70"
                    prop="relationUserName"
                  ></el-table-column>
                  <el-table-column
                    label="任务计划开始日期"
                    prop="taskStartDate"
                  ></el-table-column>
                  <el-table-column
                    label="任务计划结束日期"
                    prop="taskEndDate"
                  ></el-table-column>
                  <el-table-column
                    label="任务实际完成日期"
                    prop="taskFinishDate"
                  ></el-table-column>
                  <el-table-column width="98" label="是否为关键任务">
                    <template slot-scope="scope">
                      <div v-if="scope.row.taskKey == 'Y'">是</div>
                      <div v-else>否</div>
                    </template>
                  </el-table-column>
                </el-table>
              </li>
              <li>
                <div
                  class="minec-li-title"
                  @click="liClick('1')"
                  :class="{ active: current == 1 }"
                >
                  流程与标准化绩效 （{{ rightTableO.length }}）
                </div>
                <el-table
                  ref="maytableO"
                  :data="rightTableO"
                  tooltip-effect="dark"
                  style="width: 100%"
                  border
                  :row-key="getRowKey"
                  @selection-change="handleSelectionChangePeopleO"
                  v-if="isrightTableO"
                  :row-style="rowStyleP"
                >
                  <el-table-column
                    type="selection"
                    :reserve-selection="true"
                  ></el-table-column>
                  <el-table-column
                    label="序号"
                    width="40"
                    type="index"
                  ></el-table-column>
                  <el-table-column
                    label="任务名称"
                    width="300"
                    prop="taskName"
                  ></el-table-column>
                  <el-table-column
                    label="任务状态"
                    width="70"
                    prop="taskStatus"
                  ></el-table-column>
                  <el-table-column
                    label="执行人"
                    width="70"
                    prop="executorName"
                  ></el-table-column>
                  <el-table-column
                    label="责任人"
                    width="70"
                    prop="liablerName"
                  ></el-table-column>
                  <el-table-column
                    label="关联人"
                    width="70"
                    prop="relationUserName"
                  ></el-table-column>
                  <el-table-column
                    label="任务计划开始日期"
                    prop="taskStartDate"
                  ></el-table-column>
                  <el-table-column
                    label="任务计划结束日期"
                    prop="taskEndDate"
                  ></el-table-column>
                  <el-table-column
                    label="任务实际完成日期"
                    prop="taskFinishDate"
                  ></el-table-column>
                  <el-table-column width="98" label="是否为关键任务">
                    <template slot-scope="scope">
                      <div v-if="scope.row.taskKey == 'Y'">是</div>
                      <div v-else>否</div>
                    </template>
                  </el-table-column>
                </el-table>
              </li>
              <li>
                <div
                  class="minec-li-title"
                  @click="liClick('2')"
                  :class="{ active: current == 2 }"
                >
                  里程碑工作计划（{{ rightTableT.length }}）
                </div>
                <el-table
                  ref="maytableT"
                  :data="rightTableT"
                  tooltip-effect="dark"
                  style="width: 100%"
                  border
                  :row-key="getRowKey"
                  @selection-change="handleSelectionChangePeopleT"
                  v-if="isrightTableT"
                  :row-style="rowStyleP"
                >
                  <el-table-column
                    type="selection"
                    :reserve-selection="true"
                  ></el-table-column>
                  <el-table-column
                    label="序号"
                    width="40"
                    type="index"
                  ></el-table-column>
                  <el-table-column
                    label="任务名称"
                    width="300"
                    prop="taskName"
                  ></el-table-column>
                  <el-table-column
                    label="任务状态"
                    width="70"
                    prop="taskStatus"
                  ></el-table-column>
                  <el-table-column
                    label="执行人"
                    width="70"
                    prop="executorName"
                  ></el-table-column>
                  <el-table-column
                    label="责任人"
                    width="70"
                    prop="liablerName"
                  ></el-table-column>
                  <el-table-column
                    label="关联人"
                    width="70"
                    prop="relationUserName"
                  ></el-table-column>
                  <el-table-column
                    label="任务计划开始日期"
                    prop="taskStartDate"
                  ></el-table-column>
                  <el-table-column
                    label="任务计划结束日期"
                    prop="taskEndDate"
                  ></el-table-column>
                  <el-table-column
                    label="任务实际完成日期"
                    prop="taskFinishDate"
                  ></el-table-column>
                  <el-table-column width="98" label="是否为关键任务">
                    <template slot-scope="scope">
                      <div v-if="scope.row.taskKey == 'Y'">是</div>
                      <div v-else>否</div>
                    </template>
                  </el-table-column>
                </el-table>
              </li>
            </ul>
          </el-tab-pane>

          <el-tab-pane label="作为责任人的任务" name="second">
            <ul class="minec-ui">
              <li>
                <div
                  class="minec-li-title"
                  @click="liClick('0')"
                  :class="{ active: current == 0 }"
                >
                  招投标工作计划 （{{ rightTableres.length }}）
                </div>
                <el-table
                  ref="maytableres"
                  :data="rightTableres"
                  tooltip-effect="dark"
                  style="width: 100%"
                  border
                  @selection-change="handleSelectionChangePeopleres"
                  v-if="isrightTableres"
                  :row-style="rowStyleres"
                >
                  <!--  :class="[isclaaRes==true?'clas-red':'']" -->
                  <el-table-column
                    type="selection"
                    :reserve-selection="true"
                  ></el-table-column>
                  <el-table-column
                    label="序号"
                    width="40"
                    type="index"
                  ></el-table-column>
                  <el-table-column
                    label="任务名称"
                    width="300"
                    prop="taskName"
                  ></el-table-column>
                  <el-table-column
                    label="任务状态"
                    width="70"
                    prop="taskStatus"
                  ></el-table-column>
                  <el-table-column
                    label="执行人"
                    width="70"
                    prop="executorName"
                  ></el-table-column>
                  <el-table-column
                    label="责任人"
                    width="70"
                    prop="liablerName"
                  ></el-table-column>
                  <el-table-column
                    label="关联人"
                    width="70"
                    prop="relationUserName"
                  ></el-table-column>
                  <el-table-column
                    label="任务计划开始日期"
                    prop="taskStartDate"
                  ></el-table-column>
                  <el-table-column
                    label="任务计划结束日期"
                    prop="taskEndDate"
                  ></el-table-column>
                  <el-table-column
                    label="任务实际完成日期"
                    prop="taskFinishDate"
                  ></el-table-column>
                  <el-table-column width="98" label="是否为关键任务">
                    <template slot-scope="scope">
                      <div v-if="scope.row.taskKey == 'Y'">是</div>
                      <div v-else>否</div>
                    </template>
                  </el-table-column>
                </el-table>
              </li>
              <li>
                <div
                  class="minec-li-title"
                  @click="liClick('1')"
                  :class="{ active: current == 1 }"
                >
                  流程与标准化绩效 （{{ rightTableresO.length }}）
                </div>
                <el-table
                  ref="maytableresO"
                  :data="rightTableresO"
                  tooltip-effect="dark"
                  style="width: 100%"
                  border
                  :row-key="getRowKey"
                  @selection-change="handleSelectionChangePeopleresO"
                  v-if="isrightTableresO"
                  :row-style="rowStyleres"
                >
                  <el-table-column
                    type="selection"
                    :reserve-selection="true"
                  ></el-table-column>
                  <el-table-column
                    label="序号"
                    width="40"
                    type="index"
                  ></el-table-column>
                  <el-table-column
                    label="任务名称"
                    width="300"
                    prop="taskName"
                  ></el-table-column>
                  <el-table-column
                    label="任务状态"
                    width="70"
                    prop="taskStatus"
                  ></el-table-column>
                  <el-table-column
                    label="执行人"
                    width="70"
                    prop="executorName"
                  ></el-table-column>
                  <el-table-column
                    label="责任人"
                    width="70"
                    prop="liablerName"
                  ></el-table-column>
                  <el-table-column
                    label="关联人"
                    width="70"
                    prop="relationUserName"
                  ></el-table-column>
                  <el-table-column
                    label="任务计划开始日期"
                    prop="taskStartDate"
                  ></el-table-column>
                  <el-table-column
                    label="任务计划结束日期"
                    prop="taskEndDate"
                  ></el-table-column>
                  <el-table-column
                    label="任务实际完成日期"
                    prop="taskFinishDate"
                  ></el-table-column>
                  <el-table-column width="98" label="是否为关键任务">
                    <template slot-scope="scope">
                      <div v-if="scope.row.taskKey == 'Y'">是</div>
                      <div v-else>否</div>
                    </template>
                  </el-table-column>
                </el-table>
              </li>
              <li>
                <div
                  class="minec-li-title"
                  @click="liClick('2')"
                  :class="{ active: current == 2 }"
                >
                  里程碑工作计划（{{ rightTableresT.length }}）
                </div>
                <el-table
                  ref="maytableresT"
                  :data="rightTableresT"
                  tooltip-effect="dark"
                  style="width: 100%"
                  border
                  :row-key="getRowKey"
                  @selection-change="handleSelectionChangePeopleresT"
                  v-if="isrightTableresT"
                  :row-style="rowStyleres"
                >
                  <el-table-column
                    type="selection"
                    :reserve-selection="true"
                  ></el-table-column>
                  <el-table-column
                    label="序号"
                    width="40"
                    type="index"
                  ></el-table-column>
                  <el-table-column
                    label="任务名称"
                    width="300"
                    prop="taskName"
                  ></el-table-column>
                  <el-table-column
                    label="任务状态"
                    width="70"
                    prop="taskStatus"
                  ></el-table-column>
                  <el-table-column
                    label="执行人"
                    width="70"
                    prop="executorName"
                  ></el-table-column>
                  <el-table-column
                    label="责任人"
                    width="70"
                    prop="liablerName"
                  ></el-table-column>
                  <el-table-column
                    label="关联人"
                    width="70"
                    prop="relationUserName"
                  ></el-table-column>
                  <el-table-column
                    label="任务计划开始日期"
                    prop="taskStartDate"
                  ></el-table-column>
                  <el-table-column
                    label="任务计划结束日期"
                    prop="taskEndDate"
                  ></el-table-column>
                  <el-table-column
                    label="任务实际完成日期"
                    prop="taskFinishDate"
                  ></el-table-column>
                  <el-table-column width="98" label="是否为关键任务">
                    <template slot-scope="scope">
                      <div v-if="scope.row.taskKey == 'Y'">是</div>
                      <div v-else>否</div>
                    </template>
                  </el-table-column>
                </el-table>
              </li>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 0,
      isdele: false,
      isTbale: false,
      checkListT: [],
      leftTable: [],
      isrightTable: false,
      isrightTableO: true,
      isrightTableT: true,
      isrightTableres: false,
      isrightTableresO: true,
      isrightTableresT: true,
      rightTable: [],
      rightTableT: [],
      rightTableO: [],
      rightTableres: [],
      rightTableresO: [],
      rightTableresT: [],
      rightTableList: [],
      sessid: sessionStorage.getItem("sso_sessionid"),
      listt: [],
      listtO: [],
      listtT: [],
      listtres: [],
      listtresO: [],
      listtresT: [],
      activeName: "first",
      isbuttonpp: false,
      isbox: false,
    };
  },

  watch: {
    /**
     * 监控表格选中的数据，更新输入框显示的数值
     *
     */
    // rightTableT: {
    //   handler(newval, old) {
    //     this.selectedSize = newval.length;
    //   },
    // },
  },
  created() {
    this.$store.commit("modifyindexSi", "4-2");
    var myDate = new Date();
    console.log(myDate);
    var tYear = myDate.getFullYear();
    var m = myDate.getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    var d = myDate.getDate();
    d = d < 10 ? "0" + d : d;
    let date = tYear + "-" + m + "-" + d;
    var arr = date.split("-");
    var year = arr[0]; //获取当前日期的年份
    var month = arr[1]; //获取当前日期的月份
    var day = arr[2]; //获取当前日期的日
    var days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中的月的天数
    var year2 = year;
    var month2 = parseInt(month) + 1;
    if (month2 == 13) {
      year2 = parseInt(year2) + 1;
      month2 = 1;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
      day2 = days2;
    }

    if (month2 < 10) {
      month2 = "0" + month2;
    }
    var t2 = year2 + "-" + month2;
    var t = year + "-" + month;
    
    var date2 = year2 + "-" + month2 + "-" + day2;
    var date3 = year + "-" + month + "-" + "24";

    let sessid = this.sessid;
    let params = {
      username: this.$store.state.userInfo.username,
      formDate: t,
    };
    //本月25号
    var date4 = year2 + "-" + month2 + "-" + "25";
    var oldDate = this.getPreMonth(date);
    // console.log(oldDate)
    var isDuring = this.isDuringDate(oldDate, date3);
    if (isDuring) {
      // console.log("本月");
      params.formDate = t;
    } else {
      // console.log("下月");
      params.formDate = t2;
    }
    
    // console.log(this.$store.state)

    this.api.checkFormUser(sessid, params).then((res) => {
      // console.log(res)
      if (res.data.status == 200) {
        this.isbuttonpp = true;
        // this.$store.commit("getformUserCode", res.data.data.formUserCode);
        //   if (res.data.data.type == "TASK" && this.$route.path == "/kpiTask") {
        //     this.isbox=true;
        //     // this.$router.push({
        //     //   path: "/kpiTask",
        //     // });
        //   } else if (
        //     res.data.data.type == "FORM" &&
        //     this.$route.path == "/kpiTask"
        //   ) {
        //     this.isbox=false
        //     this.$router.push({
        //       path: "/kpimineform",
        //     });
        //     return false;
        //   }
      } else {
        this.isbuttonpp = false;
      }
    });

    if (this.$route.query.type == "next") {
      let sessid = this.sessid;
      let params = {
        formUserCode: this.$store.state.formUserCode,
        username: "",
        formDate: "",
      };
      this.setTable(sessid, params);
    } else {
      this.getTable();
    }
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    getRowKey(row) {
      return row.taskRelationCode;
    },
    cellClass(row) {
      if (row.columnIndex === 0) {
        return "disabledCheck";
      }
    },
    changzhipp(planList) {
      for (let i in planList) {
        if (planList[i].taskStatus == "NEW") {
          planList[i].taskStatus = "执行中";
        } else if (planList[i].taskStatus == "SUBMIT") {
          planList[i].taskStatus = "已上报";
        } else if (planList[i].taskStatus == "COMPLETE") {
          planList[i].taskStatus = "正常完成";
        } else if (planList[i].taskStatus == "APPLY") {
          planList[i].taskStatus = "申请非正常结束";
        } else if (planList[i].taskStatus == "END") {
          planList[i].taskStatus = "非正常结束";
        } else if (planList[i].taskStatus == "DELAYED") {
          planList[i].taskStatus = "延迟完成";
        } else if (planList[i].taskStatus == "UNFINISH") {
          planList[i].taskStatus = "超时未完成";
        }
        if (
          planList[i].taskStartDate !== null ||
          planList[i].taskStartDate == ""
        ) {
          planList[i].taskStartDate = planList[i].taskStartDate.substring(
            0,
            10
          );
        }
        if (
          planList[i].taskEndDate !== null ||
          planList[i].taskStartDate == ""
        ) {
          planList[i].taskEndDate = planList[i].taskEndDate.substring(0, 10);
        }
        if (
          planList[i].taskFinishDate !== null ||
          planList[i].taskStartDate == ""
        ) {
          planList[i].taskFinishDate = planList[i].taskFinishDate.substring(
            0,
            10
          );
        }
      }
    },
    changeZhi(planList, type) {
      for (let i in planList) {
        planList[i].projectType = type;

        if (
          planList[i].executorName == "" ||
          planList[i].executorName == null
        ) {
          planList[i].executorName = "";
        }
        if (planList[i].executor == "" || planList[i].executor == null) {
          planList[i].executor = "";
        }

        if (
          planList[i].taskLiablerName == "" ||
          planList[i].taskLiablerName == null
        ) {
          planList[i].taskLiablerName = "";
        }
        if (planList[i].taskLiabler == "" || planList[i].taskLiabler == null) {
          planList[i].taskLiabler = "";
        }
        if (
          planList[i].relationUserName == "" ||
          planList[i].relationUserName == null
        ) {
          planList[i].relationUserName = "";
        }
        if (
          planList[i].relationUser == "" ||
          planList[i].relationUser == null
        ) {
          planList[i].relationUser = "";
        }

        // if (
        //   planList[i].executorName == "" ||
        //   planList[i].executorName == null
        // ) {
        // } else {
        //   planList[i].executor = vPinyin.chineseToPinYin(
        //     planList[i].executorName
        //   );
        // }

        // if (planList[i].taskLiabler == "" || planList[i].taskLiabler == null) {
        // } else {
        //   planList[i].taskLiabler = vPinyin.chineseToPinYin(
        //     planList[i].taskLiablerName
        //   );
        // }

        // if (
        //   planList[i].relationUser == "" ||
        //   planList[i].relationUser == null
        // ) {
        // } else {
        //   planList[i].relationUser = vPinyin.chineseToPinYin(
        //     planList[i].relationUserName
        //   );
        // }

        if (planList[i].taskStatus == "NEW") {
          planList[i].taskStatus = "执行中";
        } else if (planList[i].taskStatus == "SUBMIT") {
          planList[i].taskStatus = "已上报";
        } else if (planList[i].taskStatus == "COMPLETE") {
          planList[i].taskStatus = "正常完成";
        } else if (planList[i].taskStatus == "APPLY") {
          planList[i].taskStatus = "申请非正常结束";
        } else if (planList[i].taskStatus == "END") {
          planList[i].taskStatus = "非正常结束";
        } else if (planList[i].taskStatus == "DELAYED") {
          planList[i].taskStatus = "延迟完成";
        } else if (planList[i].taskStatus == "UNFINISH") {
          planList[i].taskStatus = "超时未完成";
        }
      }
      return planList;
    },
    // formatDate(date) {
    //   date = new Date(date);
    //   var y = date.getFullYear();
    //   var m = date.getMonth() + 1;
    //   var d = date.getDate();
    //   m = m < 10 ? "0" + m : m;
    //   d = d < 10 ? "0" + d : d;
    //   return y + "-" + m + "-" + d;
    // },
    getPreMonth(date) {
      var arr = date.split("-");
      var year = arr[0]; //获取当前日期的年份
      var month = arr[1]; //获取当前日期的月份
      var day = arr[2]; //获取当前日期的日
      var days = new Date(year, month, 0);
      days = days.getDate(); //获取当前日期中月的天数
      var year2 = year;
      var month2 = parseInt(month) - 1;
      if (month2 == 0) {
        year2 = parseInt(year2) - 1;
        month2 = 12;
      }
      var day2 = day;
      var days2 = new Date(year2, month2, 0);
      days2 = days2.getDate();
      if (day2 > days2) {
        day2 = days2;
      }
      if (month2 < 10) {
        month2 = "0" + month2;
      }
      var t2 = year2 + "-" + month2 + "-" + day2;
      var t3 = year2 + "-" + month2 + "-" + "24";
      return t3;
    },
    getPreMonthNow(){

    },
    isDuringDate(beginDateStr, endDateStr) {
      var curDate = new Date(),
        beginDate = new Date(beginDateStr),
        endDate = new Date(endDateStr);
      if (curDate >= beginDate && curDate <= endDate) {
        return true;
      }
      return false;
    },
    setTable(sessid, params) {
      this.isbox = true;
      this.api.getFormTaskList(sessid, params).then((res) => {
        if (res.data.status == 200) {
          let data = res.data.data;

          let formTaskList = data.formTaskList;

          let planList = data.extPlanList;
          let milepostList = data.extMilepostList;

          let planListO = data.libLlanList;

          let milepostListT = data.libMilepostList;

          if (milepostList.length > 0) {
            milepostList = this.changeZhi(milepostList, "PROJECT_MILEPOST");
          }

          if (planList.length > 0) {
            planList = this.changeZhi(planList, "PROJECT_PLAN");
          }

          if (milepostListT.length > 0) {
            milepostListT = this.changeZhi(milepostListT, "PROJECT_MILEPOST");
          }

          if (planListO.length > 0) {
            planListO = this.changeZhi(planListO, "PROJECT_PLAN");
          }

          var arr = [
            ...planList,
            ...milepostList,
            ...planListO,
            ...milepostListT,
          ];
          var a2 = [];
          for (let i in formTaskList) {
            for (let j in arr) {
              if (arr[j].taskRelationCode == formTaskList[i].taskRelationCode) {
                let lsi = 0;
                if (a2.length > 0) {
                  for (let a in a2) {
                    if (a2[a].taskRelationCode == arr[j].taskRelationCode) {
                      lsi++;
                    }
                  }
                  if (lsi == 0) {
                    a2.push(arr[j]);
                  }
                } else {
                  a2.push(arr[j]);
                }
              }
            }
          }

          if (planListO.length > 0) {
            for (let a in planListO) {
              for (let b in planList) {
                if (
                  planListO[a].taskRelationCode == planList[b].taskRelationCode
                ) {
                  planListO[a] = {};
                  planListO[a] = planList[b];
                }
              }
            }
          }
          if (milepostListT.length > 0) {
            for (let a in milepostListT) {
              for (let b in milepostList) {
                if (
                  milepostListT[a].taskRelationCode ==
                  milepostList[b].taskRelationCode
                ) {
                  milepostListT[a] = {};
                  milepostListT[a] = milepostList[b];
                }
              }
            }
          }
          this.leftTable = a2;
          this.$nextTick(() => {
            a2.map((item, i) => {
              if (item.projectType == "PROJECT_PLAN") {
                if (planList.length > 0) {
                  this.$refs.maytableO.toggleRowSelection(item);
                }
                if (planListO.length > 0) {
                  this.$refs.maytableresO.toggleRowSelection(item);
                }
              } else if (item.projectType == "PROJECT_MILEPOST") {
                if (milepostList.length > 0) {
                  this.$refs.maytableT.toggleRowSelection(item);
                }
                if (milepostListT.length > 0) {
                  this.$refs.maytableresT.toggleRowSelection(item);
                }
              }
            });
          });

          this.rightTableO = planList;
          this.rightTableT = milepostList;
          this.rightTableresO = planListO;
          this.rightTableresT = milepostListT;
        }
      });
    },
    getTable() {
      this.isbox = true;
      var myDate = new Date();
      var tYear = myDate.getFullYear();
      var m = myDate.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let date = tYear + "-" + m;
      var arr = date.split("-");
      var year = arr[0]; //获取当前日期的年份
      var month = arr[1]; //获取当前日期的月份
      var day = arr[2]; //获取当前日期的日
      var days = new Date(year, month, 0);
      days = days.getDate(); //获取当前日期中的月的天数
      var year2 = year;
      var month2 = parseInt(month) + 1;
      if (month2 == 13) {
        year2 = parseInt(year2) + 1;
        month2 = 1;
      }
      var day2 = day;
      var days2 = new Date(year2, month2, 0);
      days2 = days2.getDate();
      if (day2 > days2) {
        day2 = days2;
      }
      if (month2 < 10) {
        month2 = "0" + month2;
      }
      var t2 = year2 + "-" + month2;
      var t = year + "-" + month;
      let sessid = this.sessid;
      let params = {
        username: this.$store.state.userInfo.username,
        formDate: t,
        formUserCode: "",
      };
      var oldDate = this.getPreMonth(date);
      var date3 = year + "-" + month + "-" + "24";
      var isDuring = this.isDuringDate(oldDate, date3);
      if (isDuring) {
        // console.log("本月");
        params.formDate = t;
      } else {
        // console.log("下月");
        params.formDate = t2;
      }
      this.setTable(sessid, params);
    },
    rowStyleP(row, rowIndex) {
      let styleJson = {};
      if (row.row.taskKey == "Y") {
        styleJson = {
          color: "red !important",
        };
      } else {
        styleJson = {};
      }
      return styleJson;
    },
    rowStyleres(row, rowIndex) {
      let styleJson = {};
      if (row.row.taskKey == "Y") {
        styleJson = {
          color: "red !important",
        };
      } else {
        styleJson = {};
      }
      return styleJson;
    },
    selsChange(val) {
      this.multipleSelection = [];
      if (val) {
        for (let i = 0; i < val.length; i++) {
          this.multipleSelection.push(val[i].taskRelationCode);
        }
      } else {
      }
    },
    modeClick(type) {
      let sessid = this.sessid;

      if (type == "add") {
        let data = JSON.parse(JSON.stringify(this.leftTable));
        let multipleSelection = this.multipleSelection;
        let formUserCode = this.$store.state.formUserCode;

        for (let i in data) {
          if (data[i].taskStatus == "执行中") {
            data[i].taskStatus = "NEW";
          } else if (data[i].taskStatus == "已上报") {
            data[i].taskStatus = "SUBMIT";
          } else if (data[i].taskStatus == "正常完成") {
            data[i].taskStatus = "COMPLETE";
          } else if (data[i].taskStatus == "申请非正常结束") {
            data[i].taskStatus = "APPLY";
          } else if (data[i].taskStatus == "非正常结束") {
            data[i].taskStatus = "END";
          } else if (data[i].taskStatus == "延迟完成") {
            data[i].taskStatus = "DELAYED";
          } else if (data[i].taskStatus == "超时未完成 ") {
            data[i].taskStatus = "UNFINISH";
          }
          // params[j].taskName = data[i].taskName;

          data[i].taskLiabler = data[i].liabler;
          data[i].taskLiablerName = data[i].liablerName;
          delete data[i].liabler;
          delete data[i].liablerName;
          delete data[i].leitype;
          delete data[i].projectName;
          delete data[i].projectStatus;
          delete data[i].projectCode;
        }
        if (multipleSelection != undefined) {
          data.map((item, i) => {
            if (multipleSelection.length == 0) {
              item.taskKey = "N";
            } else {
              item.taskKey = "N";
              multipleSelection.map((item2, j) => {
                if (item.taskRelationCode == item2) {
                  item.taskKey = "Y";
                }
              });
            }
          });
        }
        let datas = {
          formTaskList: data,
          formUserCode,
        };
        if (datas.formTaskList.length == 0) {
          this.$message.error("请至少选择一条任务");
          return false;
        }

        // document.write( JSON.stringify(datas) )
        this.api.insertFormTask(sessid, datas).then((res) => {
          if (res.data.status == 200) {
            if (this.$route.path == "/minec") {
              this.$router.push({
                path: "/mineform",
              });
            } else {
              this.$router.push({
                path: "/kpimineform",
              });
            }
          }
        });
      }
    },
    deleqiuy(data, index) {
      this.listtresO.map((item, id) => {
        if (item.taskRelationCode == data.taskRelationCode) {
          this.$nextTick(() => {
            this.$refs.maytableresO.toggleRowSelection(data);
          });
        }
      });

      this.listtresT.map((item, id) => {
        if (item.taskRelationCode == data.taskRelationCode) {
          this.$nextTick(() => {
            this.$refs.maytableresT.toggleRowSelection(data);
          });
        }
      });

      this.listtO.map((item, id) => {
        if (item.taskRelationCode == data.taskRelationCode) {
          this.$nextTick(() => {
            this.$refs.maytableO.toggleRowSelection(data);
          });
        }
      });

      this.listtT.map((item, id) => {
        if (item.taskRelationCode == data.taskRelationCode) {
          this.$nextTick(() => {
            this.$refs.maytableT.toggleRowSelection(data);
          });
        }
      });
    },
    liClick(index) {
      this.current = index;
    },
    handleSelectionChangePeople(val) {
      // if (val) {
      //   this.listt = val;
      //   let leftTable = this.listtT.concat(this.listtO).concat(this.listt);
      //   this.$nextTick(() => {
      //     leftTable.map((item, i) => {
      //       if (item.taskKey == "Y") {
      //         this.$refs.seniorTable.toggleRowSelection(
      //           this.leftTable[i],
      //           true
      //         );
      //       }
      //     });
      //   });
      //   this.leftTable = leftTable;
      // }
    },
    handleSelectionChangePeopleO(val) {
      if (val) {
        this.listtO = val;
        let leftTable = [
          ...this.listtT,
          ...this.listtO,
          ...this.listtresT,
          ...this.listtresO,
        ];

        for (let i in leftTable) {
          let lsi = 0;
          for (let j in leftTable) {
            if (
              leftTable[j].taskRelationCode == leftTable[i].taskRelationCode
            ) {
              lsi++;
            }
          }
          if (lsi > 1) {
            leftTable.splice(i, 1);
          }
        }

        this.leftTable = leftTable;
        this.$nextTick(() => {
          this.changzhipp(leftTable);
          leftTable.map((item, i) => {
            if (item.taskKey == "Y") {
              this.$refs.seniorTable.toggleRowSelection(leftTable[i], true);
            }
          });
        });
      } else {
        this.$refs.seniorTable.clearSelection();
      }
    },
    handleSelectionChangePeopleT(val) {
      if (val) {
        this.listtT = val;

        let leftTable = [
          ...this.listtT,
          ...this.listtO,
          ...this.listtresT,
          ...this.listtresO,
        ];
        for (let i in leftTable) {
          let lsi = 0;
          for (let j in leftTable) {
            if (
              leftTable[j].taskRelationCode == leftTable[i].taskRelationCode
            ) {
              lsi++;
            }
          }
          if (lsi > 1) {
            leftTable.splice(i, 1);
          }
        }
        this.leftTable = leftTable;
        this.$nextTick(() => {
          this.changzhipp(leftTable);
          leftTable.map((item, i) => {
            if (item.taskKey == "Y") {
              this.$refs.seniorTable.toggleRowSelection(leftTable[i], true);
            }
          });
        });
      }
    },
    handleSelectionChangePeopleres(val) {
      if (val) {
        // this.listtT = val;
        //       let leftTable = [...this.listtT, ...this.listtO,...this.listtresT,...this.listtresO];
        // this.leftTable = leftTable;
        // console.log(leftTable);
        // this.$nextTick(() => {
        //   this.changzhipp(leftTable);
        //   leftTable.map((item, i) => {
        //     console.log();
        //     if (item.taskKey == "Y") {
        //       this.$refs.seniorTable.toggleRowSelection(leftTable[i], true);
        //     }
        //   });
        // });
      }
    },
    handleSelectionChangePeopleresO(val) {
      if (val) {
        this.listtresO = val;
        let leftTable = [
          ...this.listtT,
          ...this.listtO,
          ...this.listtresT,
          ...this.listtresO,
        ];
        for (let i in leftTable) {
          let lsi = 0;
          for (let j in leftTable) {
            if (
              leftTable[j].taskRelationCode == leftTable[i].taskRelationCode
            ) {
              lsi++;
            }
          }
          if (lsi > 1) {
            leftTable.splice(i, 1);
          }
        }
        this.leftTable = leftTable;
        this.$nextTick(() => {
          this.changzhipp(leftTable);
          leftTable.map((item, i) => {
            if (item.taskKey == "Y") {
              this.$refs.seniorTable.toggleRowSelection(leftTable[i], true);
            }
          });
        });
      }
    },
    handleSelectionChangePeopleresT(val) {
      if (val) {
        this.listtresT = val;
        let leftTable = [
          ...this.listtT,
          ...this.listtO,
          ...this.listtresT,
          ...this.listtresO,
        ];
        for (let i in leftTable) {
          let lsi = 0;
          for (let j in leftTable) {
            if (
              leftTable[j].taskRelationCode == leftTable[i].taskRelationCode
            ) {
              lsi++;
            }
          }
          if (lsi > 1) {
            leftTable.splice(i, 1);
          }
        }
        this.leftTable = leftTable;
        this.$nextTick(() => {
          this.changzhipp(leftTable);
          leftTable.map((item, i) => {
            if (item.taskKey == "Y") {
              this.$refs.seniorTable.toggleRowSelection(leftTable[i], true);
            }
          });
        });
      }
    },
  },
};
</script>

<style lang="less" >
@import url("../../assets/utils.less");
.minec {
  background: #fff;
  .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
    color: @color3;
  }
  .el-tabs--border-card
    > .el-tabs__header
    .el-tabs__item:not(.is-disabled):hover {
    color: @color3;
  }
  .el-tabs__item {
    padding: 0 18px !important;
    height: 30px !important;
    line-height: 30px !important;
  }
  .el-tabs--border-card > .el-tabs__content {
    padding: 0 !important;
  }
  .el-tabs {
    margin-left: 16px;
    margin-right: 16px;
  }
  .clas-red {
    color: @color3;
  }
  .jia-icon {
    font-size: 16px;
    color: @color3;
  }
  .cell {
    font-size: 12px !important;
    padding-left: 6px !important;
    padding-right: 6px !important;
  }
  .width-auto();
  .minec-title {
    font-weight: bold;
    font-size: 16px;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    height: 41px;
  }
  .minec-box {
    .minec-ui {
      width: 100%;
      & > li {
        list-style-type: none;
        margin: 5px;
        padding: 5px;
        border: solid 0px #ccc;
        .active {
          background: #eee;
        }
        .minec-li-title {
          color: #666;
          padding: 5px 5px 2px 5px;
          margin-bottom: 5px;
          border-bottom: 1px dashed #ccc;
          font-weight: bold;
          font-size: 13px;
          cursor: pointer;
          &:hover {
            background: #eee;
          }
        }
      }
    }
    display: flex;
    & > div:nth-child(1) {
      width: 42%;
    }
    & > div:nth-child(2) {
      width: 60%;
    }
    .minec-left-title,
    .minec-right-title {
      color: #666;
      padding: 10px 5px 10px 5px;
      margin-bottom: 5px;
      border-bottom: 1px dashed #ccc;
      font-weight: bold;
      font-size: 13px;
      cursor: pointer;
      .title-font {
        font-size: 12px;
        font-weight: normal;
      }
      .title-font-red {
        color: @color3;
        font-weight: bold;
      }
    }
    .minec-left {
      .el-table .disabledCheck .cell .el-checkbox__inner {
        display: none !important;
      }

      .el-table .disabledCheck .cell::before {
        content: "是否为关键任务";
        text-align: center;
        line-height: 37px;
      }
    }
    .minec-right {
    }
  }
}
</style>