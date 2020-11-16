<template>
  <div class="mineform admine">
    <div class="serach">
      <div class="serach-left">绩效系数调整</div>
      <div class="serach-right">
        <el-button size="mini" v-if="nextCick" @click="$router.go(-1)"
          >返回</el-button
        >
      </div>
    </div>
    <div class="seach-form">
      <el-form ref="SearchFrom" :model="getForm" class="flex-form">
        <div class="seach-flex">
          <el-form-item
            label="绩效机构"
            prop="orgCode"
            style="display: flex"
            class="form-chang"
          >
            <el-select
              v-model="getForm.orgCode"
              placeholder="请选择绩效机构"
              size="mini"
              @change="changDimens"
              filterable
              remote
            >
              <el-option
                v-for="item in optionsReg"
                :key="item.orgCode"
                :label="item.orgName"
                :value="item.orgCode"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="层级" prop="objectRole" style="display: flex">
            <el-select
              v-model="getForm.objectRole"
              placeholder="请选择层级"
              size="mini"
              @change="changDimens"
              filterable
              remote
            >
              <el-option
                v-for="item in optionsCen"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="签订日期"
            style="display: flex"
            prop="formDate"
            class="form-date-p data-form-inpu"
          >
            <el-date-picker
              size="mini"
              v-model="getForm.formDate"
              type="month"
              placeholder="请选择签订日期"
              value-format="yyyy-MM"
              @change="changDm"
            ></el-date-picker>
          </el-form-item>
        </div>

        <div class="button" v-if="hasQx('aph2_pfm_JXFBCX-QX-C19')">
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

    <div class="title-alter" v-if="!isClick">
      <div>
        {{ ruleDes }}
      </div>

      <div class="button-end" v-if="!isData">
        <div>
          <el-button
            type="danger"
            size="mini"
            @click="adjustUserForm(0)"
            :disabled="isbuttons"
            >保存</el-button
          >
        </div>
        <div>
          <el-button
            type="danger"
            size="mini"
            @click="adjustUserForm(1)"
            :disabled="isbuttons"
            >提交</el-button
          >
        </div>
      </div>
    </div>

    <div v-if="isData" class="zan-wu-p">暂无数据</div>

    <div class="form-boxsds">
      <el-form :model="formHead" v-if="!isData">
        <table class="jixiao">
          <tbody>
            <!-- colspan="2"  -->
            <!-- rowspan="10" 列 -->
            <tr class="text-al">
              <td rowspan="2" colspan="2">绩效考核结果</td>
              <td colspan="12">
                （绩效考核结果确定（月2-3日完成本组织职员绩效系数确认）
              </td>
            </tr>

            <tr class="text-al">
              <td rowspan="2" style="width: 60px">人数</td>
              <td colspan="12">职员列表</td>
            </tr>

            <tr class="text-al">
              <td style="width: 82px">级别</td>
              <td style="width: 82px">系数区间</td>
              <td style="width: 14%">姓名</td>
              <td style="width: 14%">层级</td>
              <td style="width: 14%">绩效等级</td>
              <td>绩效系数</td>
              <td style="width: 14%">绩效评星</td>
            </tr>

            <template v-if="adjustVOListresQ.length > 0">
              <tr class="text-al">
                <td :rowspan="1 + adjustO">{{ adjustVOListQ.leveName }}</td>
                <td :rowspan="1 + adjustO">{{ adjustVOListQ.modulusValue }}</td>
                <td :rowspan="1 + adjustO">{{ adjustVOListQ.peopleNum }}</td>
              </tr>

              <tr
                class="text-al thick"
                v-for="(item, index) in adjustVOListresQ"
                :key="index + item.objectUserName"
              >
                <td>{{ item.objectUserName }}</td>
                <td>{{ item.objectRole }}</td>
                <td>{{ adjustVOListQ.leveName }}</td>
                <td>
                  <el-input
                    v-model.number="item.kpiScore"
                    placeholder
                    disabled
                    v-if="
                      item.isSystemKpi == 'Y' ||
                      item.status != 'SCORE_ADJUST_TOBE'
                    "
                    class="input-borrrs"
                  ></el-input>
                  <el-input
                    :disabled="isClick"
                    v-model.number="item.kpiScore"
                    placeholder
                    class="input-borrrs"
                    v-else
                    @change="changeAdW(item)"
                    onkeyup="if(isNaN(value)) {value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)} "
                    @blur="onInput0_100"
                    @input="
                      (val) => {
                        item.kpiScore = val
                          .replace(/[^0-9.]/g, '')
                          .replace('.', '#*')
                          .replace(/\./g, '')
                          .replace('#*', '.');
                      }
                    "
                  ></el-input>
                </td>
                <td>
                  <el-rate
                    v-model="item.taskAllStar"
                    :allow-half="true"
                    disabled
                    class="dis"
                    :disabled-void-color="colorRate"
                  ></el-rate>
                </td>
              </tr>
            </template>

            <template v-else>
              <tr class="text-al">
                <td :rowspan="2">{{ adjustVOListQ.leveName }}</td>
                <td :rowspan="2">{{ adjustVOListQ.modulusValue }}</td>
                <td :rowspan="2">{{ adjustVOListQ.peopleNum }}</td>
              </tr>
              <tr class="text-al thick">
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <el-input
                    v-model="falseSHUIn"
                    placeholder
                    disabled
                    class="disa-kong"
                  ></el-input>
                </td>
                <td></td>
              </tr>
            </template>

            <template v-if="adjustVOListresW.length > 0">
              <tr class="text-al">
                <td :rowspan="1 + adjustW">{{ adjustVOListW.leveName }}</td>
                <td :rowspan="1 + adjustW">{{ adjustVOListW.modulusValue }}</td>
                <td :rowspan="1 + adjustW">{{ adjustVOListW.peopleNum }}</td>
              </tr>

              <tr
                class="text-al thick"
                v-for="(item, index2) in adjustVOListresW"
                :key="index2 + item.objectUserName"
              >
                <td>{{ item.objectUserName }}</td>
                <td>{{ item.objectRole }}</td>
                <td>{{ adjustVOListW.leveName }}</td>
                <td>
                  <el-input
                    v-model.number="item.kpiScore"
                    placeholder
                    disabled
                    class="input-borrrs"
                    v-if="
                      item.isSystemKpi == 'Y' ||
                      item.status != 'SCORE_ADJUST_TOBE'
                    "
                  ></el-input>
                  <el-input
                    v-model.number="item.kpiScore"
                    placeholder
                    :disabled="isClick"
                    v-else
                    class="input-borrrs"
                    @change="changeAdW(item)"
                    onkeyup="if(isNaN(value)) {value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)} "
                    @blur="onInput0_100"
                    @input="
                      (val) => {
                        item.kpiScore = val
                          .replace(/[^0-9.]/g, '')
                          .replace('.', '#*')
                          .replace(/\./g, '')
                          .replace('#*', '.');
                      }
                    "
                  ></el-input>
                </td>
                <td>
                  <el-rate
                    v-model="item.taskAllStar"
                    :allow-half="true"
                    disabled
                    class="dis"
                    :disabled-void-color="colorRate"
                  ></el-rate>
                </td>
              </tr>
            </template>

            <template v-else>
              <tr class="text-al">
                <td :rowspan="2">{{ adjustVOListW.leveName }}</td>
                <td :rowspan="2">{{ adjustVOListW.modulusValue }}</td>
                <td :rowspan="2">{{ adjustVOListW.peopleNum }}</td>
              </tr>
              <tr class="text-al thick">
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <el-input
                    v-model.number="falseSHUIn"
                    placeholder
                    disabled
                    class="disa-kong"
                  ></el-input>
                </td>
                <td></td>
              </tr>
            </template>

            <template v-if="adjustVOListresE.length > 0">
              <tr class="text-al">
                <td :rowspan="1 + adjustE">{{ adjustVOListE.leveName }}</td>
                <td :rowspan="1 + adjustE">{{ adjustVOListE.modulusValue }}</td>
                <td :rowspan="1 + adjustE">{{ adjustVOListE.peopleNum }}</td>
              </tr>

              <tr
                class="text-al thick"
                v-for="(item, index3) in adjustVOListresE"
                :key="index3 + item.objectUserName"
              >
                <td>{{ item.objectUserName }}</td>
                <td>{{ item.objectRole }}</td>
                <td>{{ adjustVOListE.leveName }}</td>
                <td>
                  <el-input
                    v-model.number="item.kpiScore"
                    placeholder
                    disabled
                    class="input-borrrs"
                    v-if="
                      item.isSystemKpi == 'Y' ||
                      item.status != 'SCORE_ADJUST_TOBE'
                    "
                  ></el-input>
                  <el-input
                    v-model.number="item.kpiScore"
                    placeholder
                    v-else
                    class="input-borrrs"
                    :disabled="isClick"
                    @change="changeAdW(item)"
                    onkeyup="if(isNaN(value)) {value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)} "
                    @blur="onInput0_100"
                    @input="
                      (val) => {
                        item.kpiScore = val
                          .replace(/[^0-9.]/g, '')
                          .replace('.', '#*')
                          .replace(/\./g, '')
                          .replace('#*', '.');
                      }
                    "
                  ></el-input>
                </td>
                <td>
                  <el-rate
                    v-model="item.taskAllStar"
                    :allow-half="true"
                    disabled
                    class="dis"
                    :disabled-void-color="colorRate"
                  ></el-rate>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr class="text-al">
                <td :rowspan="2">{{ adjustVOListE.leveName }}</td>
                <td :rowspan="2">{{ adjustVOListE.modulusValue }}</td>
                <td :rowspan="2">{{ adjustVOListE.peopleNum }}</td>
              </tr>
              <tr class="text-al thick">
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <el-input
                    v-model.number="falseSHUIn"
                    placeholder
                    disabled
                    class="disa-kong"
                  ></el-input>
                </td>
                <td></td>
              </tr>
            </template>

            <template v-if="adjustVOListresR.length > 0">
              <tr class="text-al">
                <td :rowspan="1 + adjustR">{{ adjustVOListR.leveName }}</td>
                <td :rowspan="1 + adjustR">{{ adjustVOListR.modulusValue }}</td>
                <td :rowspan="1 + adjustR">{{ adjustVOListR.peopleNum }}</td>
              </tr>
              <tr
                class="text-al thick"
                v-for="(item, index4) in adjustVOListresR"
                :key="index4 + item.objectUserName"
              >
                <td>{{ item.objectUserName }}</td>
                <td>{{ item.objectRole }}</td>
                <td>{{ adjustVOListR.leveName }}</td>
                <td>
                  <el-input
                    v-model.number="item.kpiScore"
                    placeholder
                    disabled
                    class="input-borrrs"
                    v-if="
                      item.isSystemKpi == 'Y' ||
                      item.status != 'SCORE_ADJUST_TOBE'
                    "
                  ></el-input>
                  <el-input
                    v-model.number="item.kpiScore"
                    placeholder
                    v-else
                    :disabled="isClick"
                    class="input-borrrs"
                    @change="changeAdW(item)"
                    onkeyup="if(isNaN(value)) {value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)} "
                    @blur="onInput0_100"
                    @input="
                      (val) => {
                        item.kpiScore = val
                          .replace(/[^0-9.]/g, '')
                          .replace('.', '#*')
                          .replace(/\./g, '')
                          .replace('#*', '.');
                      }
                    "
                  ></el-input>
                </td>
                <td>
                  <el-rate
                    v-model="item.taskAllStar"
                    :allow-half="true"
                    disabled
                    class="dis"
                    :disabled-void-color="colorRate"
                  ></el-rate>
                </td>
              </tr>
            </template>

            <template v-else>
              <tr class="text-al">
                <td :rowspan="2">{{ adjustVOListR.leveName }}</td>
                <td :rowspan="2">{{ adjustVOListR.modulusValue }}</td>
                <td :rowspan="2">{{ adjustVOListR.peopleNum }}</td>
              </tr>
              <tr class="text-al thick">
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <el-input
                    v-model.number="falseSHUIn"
                    placeholder
                    disabled
                    class="disa-kong"
                  ></el-input>
                </td>
                <td></td>
              </tr>
            </template>

            <template v-if="adjustVOListresT.length > 0">
              <tr class="text-al">
                <td :rowspan="1 + adjustT">{{ adjustVOListT.leveName }}</td>
                <td :rowspan="1 + adjustT">{{ adjustVOListT.modulusValue }}</td>
                <td :rowspan="1 + adjustT">{{ adjustVOListT.peopleNum }}</td>
              </tr>

              <tr
                class="text-al thick"
                v-for="(item, index5) in adjustVOListresT"
                :key="index5 + item.objectUserName"
              >
                <td>{{ item.objectUserName }}</td>
                <td>{{ item.objectRole }}</td>
                <td>{{ adjustVOListT.leveName }}</td>

                <td>
                  <el-input
                    v-model.number="item.kpiScore"
                    placeholder
                    disabled
                    class="input-borrrs"
                    v-if="
                      item.isSystemKpi == 'Y' ||
                      item.status != 'SCORE_ADJUST_TOBE'
                    "
                  ></el-input>

                  <el-input
                    v-model.number="item.kpiScore"
                    placeholder
                    v-else
                    :disabled="isClick"
                    @change="changeAdW(item)"
                    class="input-borrrs"
                    onkeyup="if(isNaN(value)) {value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)} "
                    @blur="onInput0_100"
                    @input="
                      (val) => {
                        item.kpiScore = val
                          .replace(/[^0-9.]/g, '')
                          .replace('.', '#*')
                          .replace(/\./g, '')
                          .replace('#*', '.');
                      }
                    "
                  ></el-input>
                </td>
                <td>
                  <el-rate
                    v-model="item.taskAllStar"
                    :allow-half="true"
                    disabled
                    class="dis"
                    :disabled-void-color="colorRate"
                  ></el-rate>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr class="text-al">
                <td :rowspan="2">{{ adjustVOListT.leveName }}</td>
                <td :rowspan="2">{{ adjustVOListT.modulusValue }}</td>
                <td :rowspan="2">{{ adjustVOListT.peopleNum }}</td>
              </tr>
              <tr class="text-al thick">
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <el-input
                    v-model.number="falseSHUIn"
                    placeholder
                    disabled
                    class="disa-kong"
                  ></el-input>
                </td>
                <td></td>
              </tr>
            </template>
          </tbody>
        </table>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sessid: sessionStorage.getItem("sso_sessionid"),
      formHead: {},
      formType: "",
      orgList: [],
      isData: true,
      isorgList: false,
      rowspanZhi: 5,
      isrowspanZhi: false,
      isbuttons: false,
      nextCick: false,
      getForm: {
        formDate: "",
        objectRole: "",
        orgCode: "",
        orgName: "",
      },
      zhiList: {},
      ruleDes: "",
      optionsCen: [
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
      optionsReg: [],

      isrowspanChange: false,
      isrowspanGuan: false,
      changList: {},
      guanList: {},
      falseSHU: 0,
      falseSHUIn: "",
      value1: 0,
      orgType: [],
      isXian: false,
      isXianGuan: false,
      isXianZhi: false,
      isXianChang: false,
      standardName: "",
      executorName: "",
      companyName: "",
      xiNum: 1.6,
      rateult: 0,
      colorRate: "#c2c2c2",
      arrList: [
        {
          name: "张某",
          name: "张某",
          name: "张某",
          name: "张某",
        },
      ],
      adjustVOListQ: {},
      adjustVOListW: {},
      adjustVOListE: {},
      adjustVOListR: {},
      adjustVOListT: {},
      adjustVOListresQ: [],
      adjustVOListresW: [],
      adjustVOListresE: [],
      adjustVOListresR: [],
      adjustVOListresT: [],
      adjustO: 0,
      adjustW: 0,
      adjustE: 0,
      adjustR: 0,
      adjustT: 0,
      dataLite: [],
      setTimes: null,
      isClick: false,
    };
  },
  created() {
    if (this.$store.state.adminechangDm == "") {
      var myDate = new Date();
      var tYear = myDate.getFullYear();
      var tMonth = myDate.getMonth();
      var m = tMonth + 1;
      if (m.toString().length == 1) {
        m = "0" + m;
      }
      this.getForm.formDate = tYear + "-" + m;
    } else {
      this.getForm.formDate = this.$store.state.adminechangDm;
    }

    this.getOrgInfoListByLiabler();
  },

  //
  mounted() {
    this.$store.commit("modifyindexSi", "3-3");
    if (this.$route.query.type == "look") {
      this.isClick = true;
    }
    // console.log(this.$store.state.codeName);
  },
  beforeDestroy() {
    clearInterval(this.setTimes);
    this.setTimes = null;
    this.$store.commit("getcodeName", {});
  },
  methods: {
    onInput0_100(e) {
      // this.$message.closeAll();
      if (e.target.value < 0.9 || e.target.value > 1.1) {
        this.$message.warning("只能输入[0.90-1.10]区间的数");
        e.target.value = null;
      }
    },
    changDm(e) {
      this.getForm.formDate = e;
      this.$store.commit("getadminechangDm", e);
    },
    hasQx(value) {
      return this.commonFn.hasQx(value, this);
    },
    changeAdW(data) {
      // console.log(data);
      let item = {
        objectUserName: data.objectUser,
        formUserCode: data.formUserCode,
        kpiScore: data.kpiScore,
      };

      var dataLites = this.dataLite;
      dataLites.unshift(item);
      let hash = {};
      const data2 = dataLites.reduce((preVal, curVal) => {
        hash[curVal.formUserCode]
          ? ""
          : (hash[curVal.formUserCode] = true && preVal.push(curVal));
        return preVal;
      }, []);

      this.dataLite = data2;
    },

    adjustUserForm(submitType) {
      let sessid = this.sessid;
      if (sessid == null) {
        sessid = "";
      }
      let pmFormUsers = this.dataLite;
      let orgCode = this.getForm.orgCode;
      this.isbuttons = true;
      this.setTimes = setTimeout(() => {
        this.isbuttons = false;
      }, 5000);
      if (pmFormUsers.length == 0) {
        this.$message.error("您还没有操作，请调整后在操作");
        return false;
      }
      this.api
        .adjustUserForm(sessid, submitType, pmFormUsers, orgCode)
        .then((res) => {
          if (res.data.status == 200) {
            this.dataLite = [];
            this.$message.success("操作成功");
            this.getclick();
          } else {
            // console.log(this.dataLite);
          }
        });
    },
    changDimens(e) {
      var that = this;
      that.optionsReg.map((item, i) => {
        // if (item.formCode == e) {
        //   that.basicsForm.formCode = item.formCode;
        // }
      });
    },
    getOrgInfoListByLiabler() {
      let sessid = this.sessid;
      if (sessid == null) {
        sessid = "";
      }
      let params = this.$store.state.userInfo.username;
      this.api.getOrgInfoListByLiabler(sessid, params).then((res) => {
        if (res.data.status == 200) {
          if (res.data.data.length == 0) {
            // this.isData = true;
          } else {
            let statecCode = this.$store.state.codeName;
            if (statecCode.orgCode) {
              this.nextCick = true;
              this.$store.commit("modifyindexSi", "3-5");
              this.optionsReg = res.data.data;
              this.getForm.orgCode = statecCode.orgCode;
              this.getForm.orgName = statecCode.orgName;
              this.getclick();
            } else {
              // console.log(8888);
              this.nextCick = false;
              this.$store.commit("modifyindexSi", "3-3");
              // this.isData = false;
              this.optionsReg = res.data.data;
              this.getForm.orgCode = res.data.data[0].orgCode;
              this.getForm.orgName = res.data.data[0].orgName;
              this.getclick();
            }
            // console.log(this.getForm.orgName);
          }
        }
      });
    },
    getclick() {
      let getForm = JSON.parse(JSON.stringify(this.getForm));
      let sessid = this.sessid;
      if (sessid == null) {
        sessid = "";
      }
      // console.log(getForm.orgCode);
      let params = {
        orgCode: getForm.orgCode,
        formDate: getForm.formDate,
        username: this.$store.state.userInfo.username,
        objectRole: getForm.objectRole,
      };

      this.api.getAdjustFormList(sessid, params).then((res) => {
        // console.log(res.data.data.adjustVOList);
        if (res.data.status == 200) {
          if (res.data.data.adjustVOList == undefined) {
            this.isData = true;
          } else {
            this.isData = false;
            this.ruleDes = res.data.data.ruleDes;
            this.adjustVOListQ = res.data.data.adjustVOList[0];
            this.adjustVOListW = res.data.data.adjustVOList[1];
            this.adjustVOListE = res.data.data.adjustVOList[2];
            this.adjustVOListR = res.data.data.adjustVOList[3];
            this.adjustVOListT = res.data.data.adjustVOList[4];
            this.adjustO =
              res.data.data.adjustVOList[0].formAdjustVOList.length;
            this.adjustW =
              res.data.data.adjustVOList[1].formAdjustVOList.length;
            this.adjustE =
              res.data.data.adjustVOList[2].formAdjustVOList.length;
            this.adjustR =
              res.data.data.adjustVOList[3].formAdjustVOList.length;
            this.adjustT =
              res.data.data.adjustVOList[4].formAdjustVOList.length;
            let formAdjustVOListQ =
              res.data.data.adjustVOList[0].formAdjustVOList;
            let formAdjustVOListW =
              res.data.data.adjustVOList[1].formAdjustVOList;

            let formAdjustVOListE =
              res.data.data.adjustVOList[2].formAdjustVOList;

            let formAdjustVOListR =
              res.data.data.adjustVOList[3].formAdjustVOList;
            let formAdjustVOListT =
              res.data.data.adjustVOList[4].formAdjustVOList;

            if (formAdjustVOListQ.length > 0) {
              this.typeStoe(formAdjustVOListQ);
            }
            if (formAdjustVOListW.length > 0) {
              this.typeStoe(formAdjustVOListW);
            }
            if (formAdjustVOListE.length > 0) {
              this.typeStoe(formAdjustVOListE);
            }
            if (formAdjustVOListR.length > 0) {
              this.typeStoe(formAdjustVOListR);
            }
            if (formAdjustVOListT.length > 0) {
              this.typeStoe(formAdjustVOListT);
            }
            // this.typeStoe(formAdjustVOListW);
            // this.typeStoe(formAdjustVOListE);
            // this.typeStoe(formAdjustVOListR);
            // this.typeStoe(formAdjustVOListT);
            this.adjustVOListresQ = formAdjustVOListQ;
            this.adjustVOListresW = formAdjustVOListW;
            this.adjustVOListresE = formAdjustVOListE;
            this.adjustVOListresR = formAdjustVOListR;
            this.adjustVOListresT = formAdjustVOListT;
          }
        }
      });
    },
    typeStoe(formAdjustVOList) {
      for (let i in formAdjustVOList) {
        formAdjustVOList[i].taskAllStar = Number(
          formAdjustVOList[i].taskAllStar
        );
        formAdjustVOList[i].kpiScore = Number(formAdjustVOList[i].kpiScore);
      }
    },
    //获取列表页
    serchClickF() {
      if (this.getForm.orgCode == "") {
        this.$message.error("请选择绩效机构");
        return false;
      } else if (this.getForm.formDate == "") {
        this.$message.error("请选择签订日期");
        return false;
      }
      this.getclick();
    },
    resetClickF() {
      this.getForm = {
        formDate: "",
        orgCode: "",
        objectRole: "",
      };
      //   this.$refs.SearchFrom.resetFields();
      //   this.getclick();
    },
    changeInput(data) {},
  },
};
</script>

<style lang="less">
@import url("../../assets/utils.less");

.admine {
  .width-auto();

  .form-boxsds {
    width: 100%;
    background: #fff;
  }
  .input-borrrs {
    width: 90%;
    height: 40%;
    margin: auto;
    .el-input__inner {
      height: 20px !important;
      line-height: 0px !important;
      // margin: 10px 0 !important;
    }
  }
  .el-form {
    // width: 96% !important;
    margin: 0 auto !important;
  }
  .flex-form {
    padding: 0 !important;
    border: none;
  }
  .flex-form-p();

  .title-alter {
    background: #fff;
    .flex();

    & > div:nth-child(1) {
      padding: 0 0 0 25px;
      height: 48px;
    }
    // line-height: 48px !important;
    width: 100%;
    // border-top: 1px solid #ccc;
    color: @color3;
    font-size: 13px;
    //  margin: 10px auto 10px auto;
    padding: 0 4px 0 0;
    .button-end {
      border: none;
      padding: 10px 1.4% 10px 0 !important;
    }
  }

  .button-end {
    & > div:nth-child(1) {
      margin: 0 19px;
    }
  }

  .disa-kong {
    .el-input__inner {
      background-color: #fff !important;
      border-color: #fff !important;
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }

  .zan-wu-p {
    line-height: 60px;
    width: 50%;
    color: #909399;
    margin: 0 auto;
    text-align: center;
  }

  .width-auto();
  // background: #ffffff;

  .seach-flex {
    display: flex;

    .el-form-item__label {
      line-height: 40px !important;
    }
  }

  .text-al {
    text-align: center;

    .el-input__inner {
      text-align: center;
    }
  }

  .form-date-p {
    .el-input--prefix .el-input__inner {
      padding-left: 30px !important;
    }
  }
}
</style>
