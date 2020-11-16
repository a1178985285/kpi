<template>
  <div class="border-none mineform">
    <div class="serach">
      <div class="serach-left">普通表单模板预览</div>
      <div class="serach-right">
        <el-button size="mini" @click="$router.go(-1)">返回</el-button>
      </div>
    </div>
    <el-form :model="formHead">
      <table class="jixiao">
        <tbody>
          <tr>
            <td class="header" colspan="10">
              <img src="../../assets/img/form.png" alt />
              <!-- <el-form-item class="title change">
                <el-input size="mini" v-model="formHead.formName" prop="formName" readonly></el-input>
              </el-form-item>-->
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
                      label-width="120px"
                    >
                      <el-input
                        size="mini"
                        v-model="formHead.formName"
                        prop="formName"
                        readonly
                      ></el-input>
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
                      class="form-el change font-weigh"
                      label-width="60px"
                      prop="standardName"
                    >
                      <el-input
                        size="mini"
                        v-model="executorName"
                        readonly
                      ></el-input>
                    </el-form-item>
                  </td>
                  <td style="width: 25%; border: none">
                    <el-form-item
                      label="责任人："
                      class="form-el change font-weigh"
                      label-width="130px"
                      prop="standardName"
                    >
                      <el-input
                        size="mini"
                        v-model="executorName"
                        readonly
                      ></el-input>
                    </el-form-item>
                  </td>
                  <td style="width: 25%; border: none">
                    <el-form-item
                      label="核算人："
                      class="form-el change font-weigh"
                      label-width="130px"
                      prop="standardName"
                    >
                      <el-input
                        size="mini"
                        v-model="executorName"
                        readonly
                      ></el-input>
                    </el-form-item>
                  </td>
                  <td style="width: 25%; border: none">
                    <el-form-item
                      label="控制人："
                      class="form-el change font-weigh"
                      label-width="130px"
                      prop="standardName"
                    >
                      <el-input
                        size="mini"
                        v-model="executorName"
                        readonly
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
                  <td style="width: 15%; border: none">职位：</td>
                  <td style="width: 14%; border: none">考核对象：</td>
                  <td style="width: 14%; border: none">考核主体：</td>
                  <td style="width: 32%; border: none">考核周期：</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr class="thick">
            <td
              rowspan="11"
              v-if="isXianGuan && isXianChang && isXianZhi"
              style="width: 90px"
            >
              绩效考核任务
            </td>

            <td
              rowspan="2"
              v-if="!isXianGuan && !isXianChang && !isXianZhi"
              style="width: 90px"
            >
              绩效考核任务
            </td>
            <td
              rowspan="7"
              v-if="!isXianGuan && !isXianChang && isXianZhi"
              style="width: 90px"
            >
              绩效考核任务
            </td>

            <td
              rowspan="9"
              v-if="!isXianGuan && isXianChang && isXianZhi"
              style="width: 90px"
            >
              绩效考核任务
            </td>

            <td
              rowspan="9"
              v-if="isXianGuan && !isXianChang && isXianZhi"
              style="width: 90px"
            >
              绩效考核任务
            </td>

            <td
              rowspan="9"
              v-if="isXianGuan && isXianChang && !isXianZhi"
              style="width: 90px"
            >
              绩效考核任务
            </td>

            <td
              rowspan="4"
              v-if="isXianGuan && !isXianZhi && !isXianChang"
              style="width: 90px"
            >
              绩效考核任务
            </td>

            <td
              rowspan="4"
              v-if="isXianChang && !isXianZhi && !isXianGuan"
              style="width: 90px"
            >
              绩效考核任务
            </td>

            <td rowspan="2" style="width: 130px">任务类型</td>
            <td colspan="4">
              <el-form-item label="规划说明：" class="form-el change">
                <el-input
                  size="mini"
                  v-model="formHead.ruleDes"
                  prop="ruleDes"
                  readonly
                ></el-input>
              </el-form-item>
            </td>
            <td colspan="4">
              <el-form-item label="考核说明：" class="form-el change">
                <el-input
                  size="mini"
                  v-model="formHead.examineDes"
                  prop="examineDes"
                  readonly
                ></el-input>
              </el-form-item>
            </td>
          </tr>

          <tr class="thick">
            <td>考核维度</td>
            <td style="width: 90px">计划完成时间</td>
            <td style="width: 88px">完成率（%）</td>
            <td style="width: 90px">绩效说明</td>
            <td>工作质量</td>
            <td>及时性</td>
            <td>工作态度</td>
          </tr>

          <!-- 关键任务 -->
          <template v-if="isXian">
            <template v-if="isXianGuan">
              <tr class="thick" v-if="isrowspanGuan">
                <td rowspan="2">
                  {{ guanList.dimensionName }} ({{ guanList.ratio }}%)
                </td>
                <td style="width: 26%">关键任务1</td>
                <td></td>
                <td></td>
                <td></td>
                <td v-for="(item, index) in guanlist2" :key="index + 1">
                  <el-rate
                    v-model="item.value1"
                    :disabled="isBdisabled"
                    :disabled-void-color="colorRate"
                    :allow-half="true"
                    class="dis"
                  ></el-rate>
                </td>
              </tr>

              <tr class="thick" v-if="!isrowspanGuan">
                <td rowspan="2">
                  {{ guanList.dimensionName }} ({{ guanList.ratio }}%)
                </td>
                <td style="width: 26%">关键任务1</td>
                <td></td>
                <td></td>
                <td></td>
                <td
                  rowspan="2"
                  v-for="(item, index2) in guanlist3"
                  :key="index2 + 20"
                >
                  <el-rate
                    v-model="item.value1"
                    :disabled="isBdisabled"
                    :disabled-void-color="colorRate"
                    :allow-half="true"
                    class="dis"
                  ></el-rate>
                </td>
              </tr>
              <tr class="thick" v-if="isrowspanGuan">
                <td style="width: 26%">关键任务2</td>
                <td></td>
                <td></td>
                <td></td>
                <td v-for="(item, index4) in guanlist4" :key="index4 + 40">
                  <el-rate
                    v-model="item.value1"
                    :disabled="isBdisabled"
                    :disabled-void-color="colorRate"
                    :allow-half="true"
                    class="dis"
                  ></el-rate>
                </td>
              </tr>
              <tr class="thick" v-if="!isrowspanGuan">
                <td style="width: 26%">关键任务2</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </template>
            <template v-if="isXianChang">
              <!-- 常规任务 -->
              <tr class="thick" v-if="isrowspanChange">
                <td rowspan="2">
                  {{ changList.dimensionName }}({{ changList.ratio }}%)
                </td>
                <td style="width: 26%">常规任务1</td>
                <td></td>
                <td></td>
                <td></td>

                <td v-for="(item, index5) in changlist2" :key="index5 + 30">
                  <el-rate
                    v-model="item.value1"
                    :disabled="isBdisabled"
                    :allow-half="true"
                    class="dis"
                    :disabled-void-color="colorRate"
                  ></el-rate>
                </td>
              </tr>

              <tr class="thick" v-if="!isrowspanChange">
                <td rowspan="2">
                  {{ changList.dimensionName }}({{ changList.ratio }}%)
                </td>
                <td style="width: 26%">常规任务1</td>
                <td></td>
                <td></td>
                <td></td>
                <td
                  rowspan="2"
                  v-for="(item, index6) in changlist3"
                  :key="index6 + 30"
                >
                  <el-rate
                    v-model="item.value1"
                    :disabled="isBdisabled"
                    :allow-half="true"
                    class="dis"
                    :disabled-void-color="colorRate"
                  ></el-rate>
                </td>
              </tr>
              <tr class="thick" v-if="isrowspanChange">
                <td style="width: 26%">常规任务2</td>
                <td></td>
                <td></td>
                <td></td>
                <td v-for="(item, index7) in changlist4" :key="index7 + 30">
                  <el-rate
                    v-model="item.value1"
                    :disabled="isBdisabled"
                    :allow-half="true"
                    class="dis"
                    :disabled-void-color="colorRate"
                  ></el-rate>
                </td>
              </tr>
              <tr class="thick" v-if="!isrowspanChange">
                <td style="width: 26%">常规任务2</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </template>
            <!-- 00 -->
            <template v-if="isXianZhi">
              <tr v-if="!isrowspanZhi">
                <td rowspan="5" class="thick">
                  {{ zhiList.dimensionName }} ({{ zhiList.ratio }}%)
                </td>

                <td colspan="4">
                  <el-input
                    v-model="orgType[0]"
                    placeholder
                    readonly
                    size="mini"
                  ></el-input>
                </td>

                <td
                  class="thick"
                  v-for="(item, index8) in zhilist2"
                  :key="index8 + 30"
                >
                  <el-rate
                    v-model="item.value1"
                    :disabled="isBdisabled"
                    :allow-half="true"
                    class="dis"
                    :disabled-void-color="colorRate"
                  ></el-rate>
                </td>
              </tr>

              <tr v-if="isrowspanZhi">
                <td rowspan="5" class="thick">
                  {{ zhiList.dimensionName }} ({{ zhiList.ratio }}%)
                </td>
                <td colspan="4">
                  <el-input
                    v-model="orgType[0]"
                    placeholder
                    readonly
                    size="mini"
                  ></el-input>
                </td>
                <td
                  class="thick"
                  :rowspan="rowspanZhi"
                  v-for="(item, index9) in zhilist3"
                  :key="index9 + 30"
                >
                  <el-rate
                    v-model="item.value1"
                    :disabled="isBdisabled"
                    :allow-half="true"
                    class="dis"
                    :disabled-void-color="colorRate"
                  ></el-rate>
                </td>
              </tr>
              <!-- rowspanZhi -->
              <tr>
                <td colspan="4">
                  <el-input
                    v-model="orgType[1]"
                    placeholder
                    readonly
                    size="mini"
                  ></el-input>
                </td>

                <template v-if="!isrowspanZhi">
                  <td
                    class="thick"
                    v-for="(item, index10) in zhilist4"
                    :key="index10 + 30"
                  >
                    <el-rate
                      v-model="item.value1"
                      :disabled="isBdisabled"
                      :allow-half="true"
                      class="dis"
                      :disabled-void-color="colorRate"
                    ></el-rate>
                  </td>
                </template>
              </tr>

              <tr>
                <td colspan="4">
                  <el-input
                    v-model="orgType[2]"
                    placeholder
                    readonly
                    size="mini"
                  ></el-input>
                </td>
                <template v-if="!isrowspanZhi">
                  <td
                    class="thick"
                    v-for="(item, index11) in zhilist5"
                    :key="index11 + 30"
                  >
                    <el-rate
                      v-model="item.value1"
                      :disabled="isBdisabled"
                      :allow-half="true"
                      class="dis"
                      :disabled-void-color="colorRate"
                    ></el-rate>
                  </td>
                </template>
              </tr>
              <tr>
                <td colspan="4">
                  <el-input
                    v-model="orgType[3]"
                    placeholder
                    readonly
                    size="mini"
                  ></el-input>
                </td>
                <template v-if="!isrowspanZhi">
                  <td
                    class="thick"
                    v-for="(item, index12) in zhilist6"
                    :key="index12 + 30"
                  >
                    <el-rate
                      v-model="item.value1"
                      :disabled="isBdisabled"
                      :allow-half="true"
                      class="dis"
                      :disabled-void-color="colorRate"
                    ></el-rate>
                  </td>
                </template>
              </tr>
              <tr>
                <td colspan="4">
                  <el-input
                    v-model="orgType[4]"
                    placeholder
                    readonly
                    size="mini"
                  ></el-input>
                </td>
                <template v-if="!isrowspanZhi">
                  <td
                    class="thick"
                    v-for="(item, index13) in zhilist7"
                    :key="index13 + 30"
                  >
                    <el-rate
                      v-model="item.value1"
                      :allow-half="true"
                      class="dis"
                      :disabled-void-color="colorRate"
                      :disabled="isBdisabled"
                    ></el-rate>
                  </td>
                </template>
              </tr>
            </template>
          </template>

          <tr class="thick">
            <td colspan="6">任务维度综合评星结果</td>
            <td colspan="6">
              <el-rate
                v-model="value100"
                :allow-half="true"
                class="dis"
                :disabled="isBdisabled"
                :disabled-void-color="colorRate"
              ></el-rate>
            </td>
          </tr>

          <!-- v-if="isorgList" -->
          <template>
            <tr class="thick" v-for="(item, index5) in orgList" :key="index5">
              <td colspan="6">{{ item.dimensionName }} ({{ item.ratio }}%)</td>
              <td colspan="6"></td>
            </tr>
          </template>

          <tr class="thick">
            <td rowspan="2">绩效沟通</td>
            <td>考核对象：</td>
            <td colspan="10"></td>
          </tr>
          <tr class="thick">
            <td>考核主体：</td>
            <td colspan="10"></td>
          </tr>

          <tr class="thick">
            <td colspan="2">是否特别申请</td>
            <td colspan="10">
              （说明：该考核对象月度表现优异，向责任人进行特别申请绩效系数，并进行申请理由说明。）
            </td>
          </tr>
          <tr>
            <td class="thick" colspan="2" rowspan="2">个人标签</td>
            <td colspan="10">【从下方备选择】</td>
          </tr>
          <tr>
            <td colspan="12">&thinsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
          </tr>

          <tr class="section">
            <td colspan="10" class="padding-clo">五、作业标准图片</td>
          </tr>
          <tr class="section">
            <td colspan="10" class="padding-clo">六、作业标准文件</td>
          </tr>
          <tr class="section">
            <td colspan="10" class="padding-clo">七、作业标准成本</td>
          </tr>
          <tr class="section">
            <td colspan="10" class="padding-clo">八、作业标准评估</td>
          </tr>
        </tbody>
      </table>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sessid: sessionStorage.getItem("sso_sessionid"),
      formHead: {},
      colorRate: "#c2c2c2",
      formType: "",
      orgList: [],
      isBdisabled: false,
      isorgList: false,
      rowspanZhi: 5,
      value100: 0,
      isrowspanZhi: false,
      zhiList: {},
      isrowspanChange: false,
      isrowspanGuan: false,
      changList: {},
      guanList: {},
      value1: 0,
      guanlist2: [
        {
          value1: 0,
        },
        {
          value1: 0,
        },
        {
          value1: 0,
        },
      ],

      guanlist3: [
        {
          value1: 0,
        },
        {
          value1: 0,
        },
        {
          value1: 0,
        },
      ],

      guanlist4: [
        {
          value1: 0,
        },
        {
          value1: 0,
        },
        {
          value1: 0,
        },
      ],
      changlist2: [
        {
          value1: 0,
        },
        {
          value1: 0,
        },
        {
          value1: 0,
        },
      ],
      changlist3: [
        {
          value1: 0,
        },
        {
          value1: 0,
        },
        {
          value1: 0,
        },
      ],
      changlist4: [
        {
          value1: 0,
        },
        {
          value1: 0,
        },
        {
          value1: 0,
        },
      ],
      zhilist2: [
        {
          value1: 0,
        },
        {
          value1: 0,
        },
        {
          value1: 0,
        },
      ],
      zhilist3: [
        {
          value1: 0,
        },
        {
          value1: 0,
        },
        {
          value1: 0,
        },
      ],
      zhilist4: [
        {
          value1: 0,
        },
        {
          value1: 0,
        },
        {
          value1: 0,
        },
      ],
      zhilist5: [
        {
          value1: 0,
        },
        {
          value1: 0,
        },
        {
          value1: 0,
        },
      ],
      zhilist6: [
        {
          value1: 0,
        },
        {
          value1: 0,
        },
        {
          value1: 0,
        },
      ],
      zhilist7: [
        {
          value1: 0,
        },
        {
          value1: 0,
        },
        {
          value1: 0,
        },
      ],
      orgType: [],
      isXian: false,
      isXianGuan: false,
      isXianZhi: false,
      isXianChang: false,
      standardName: "",
      executorName: "",
      companyName: "",
    };
  },
  methods: {},
  mounted() {
    this.$store.commit("modifyindexSi", "2-4");
    let sessid = this.sessid;
    let params = {
      formId: this.$store.state.formId,
    };
    this.api.getFromModelDeatil(sessid, params).then((res) => {
      let data = res.data.data;
      let task = data.taskList;
      let org = data.orgList;
      if (res.data.status == 200) {
        if (task.length <= 0) {
          this.isXian = false;
        } else {
          this.isXian = true;
        }
        if (org.length <= 0) {
          this.isorgList = false;
        } else {
          this.isorgList = true;
        }

        var result = task.some((item) => {
          if (item.taskType == "TASK_TYPE_FIXED") {
            this.zhiList = item;
            this.isXianZhi = true;
          } else if (item.taskType == "TASK_TYPE_KEY") {
            this.guanList = item;
            this.isXianGuan = true;
          } else if (item.taskType == "TASK_TYPE_NORMAL") {
            this.changList = item;
            this.isXianChang = true;
          }
        });
        if (this.zhiList.isMerge == "Y") {
          this.isrowspanZhi = true;
        } else if (this.zhiList.isMerge == "N") {
          this.isrowspanZhi = false;
        }
        if (this.guanList.isMerge == "Y") {
          this.isrowspanGuan = false;
        } else if (this.guanList.isMerge == "N") {
          this.isrowspanGuan = true;
        }
        if (this.changList.isMerge == "Y") {
          this.isrowspanChange = false;
        } else if (this.changList.isMerge == "N") {
          this.isrowspanChange = true;
        }
        this.formHead = data.formHead;
        this.orgList = org;
        if (data.formHead.formLeve == "LEVE_BASIC") {
          this.orgType = [
            "持续学习",
            "主动创新",
            "自我驱动",
            "高效执行",
            "乐于宣传并积极践行智业文化或准则",
          ];
          this.isorgList = false;
        } else if (data.formHead.formLeve == "LEVE_MANAGER") {
          this.orgType = [
            "主动创新",
            "团队管理",
            "自我驱动",
            "系统思考及执行",
            "乐于宣传并积极践行智业文化或准则",
          ];
          this.isorgList = true;
        } else if (data.formHead.formLeve == "LEVE_LEADER") {
          this.isorgList = true;
          this.orgType = [
            "团队领导",
            "胸怀格局",
            "全局意识",
            "主动创新",
            "乐于宣传并积极践行智业文化或准则",
          ];
        }
      }
    });
  },
};
</script>

<style lang="less">
@import url("../../assets/utils.less");
</style>