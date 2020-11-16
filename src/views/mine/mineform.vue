<template>
  <div class="formhead border-none mineform">
    <div class="serach">
      <div class="serach-left">绩效表单</div>

      <div class="serach-right">
        <el-button size="mini" @click="$router.go(-1)" v-if="isButtonTui"
          >返回</el-button
        >
        <template v-if="isButton">
          <el-button
            size="mini"
            @click="goNext('zhuok')"
            type="danger"
            v-if="isUsernameTwo && iszhuok"
            >确定</el-button
          >
          <!-- 考核主体 -->
          <el-button
            size="mini"
            @click="goNext('zhuping')"
            type="danger"
            v-if="isUsernameTwo && iszhuTi"
            >提交</el-button
          >
          <!-- 考核主体 -->

          <el-button
            size="mini"
            @click="goNext('tuihui')"
            v-if="isUsernameTwo && iszhuTui"
            plain
            class="plain-dang"
            >退回</el-button
          >

          <!-- <el-button size="mini" @click="goNext('form')" v-if="isButtonTwo"
            >返回</el-button
          > -->
          <el-button
            size="mini"
            @click="goNext('form')"
            type="danger"
            v-if="isTiao && isUsername"
            >调整关键绩效任务项
          </el-button>
          <!-- isstatusO 是否取回 -->
          <el-button
            size="mini"
            @click="goNext('to')"
            type="danger"
            v-if="isduiOk && isUsername"
            >确定</el-button
          >
          <!-- 考核对象 -->
          <el-button
            size="mini"
            @click="goNext('duiping')"
            type="danger"
            v-if="isduiTi && isUsername"
            >提交</el-button
          >
          <!-- 考核对象 -->
          <el-button
            size="mini"
            @click="goNext('qu')"
            plain
            class="plain-dang"
            v-if="isstatusO && isUsername"
            >取回</el-button
          >
        </template>
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
                      prop="standardName"
                    >
                      <el-input
                        size="mini"
                        v-model="formHead.standardName"
                        readonly
                      ></el-input>
                    </el-form-item>
                  </td>
                  <td style="width: 40%; border: none" class="section">
                    <el-form-item
                      label="填表时间："
                      class="form-el change"
                      label-width="120px"
                      prop="createdDate"
                    >
                      <el-input
                        size="mini"
                        v-model="formHead.createdDate"
                        readonly
                      ></el-input>
                    </el-form-item>
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
                      label-width="58px"
                      prop="executorName"
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
                      label-width="58px"
                      prop="liablerName"
                    >
                      <el-input
                        size="mini"
                        v-model="liablerName"
                        readonly
                      ></el-input>
                    </el-form-item>
                  </td>
                  <td style="width: 25%; border: none">
                    <el-form-item
                      label="核算人："
                      class="form-el change font-weigh"
                      label-width="58px"
                      prop="checkerName"
                    >
                      <el-input
                        size="mini"
                        v-model="checkerName"
                        readonly
                      ></el-input>
                    </el-form-item>
                  </td>
                  <td style="width: 25%; border: none">
                    <el-form-item
                      label="控制人："
                      class="form-el change font-weigh"
                      label-width="58px"
                      prop="controllerName"
                    >
                      <el-input
                        size="mini"
                        v-model="controllerName"
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
                      label="中心/服务中心/子公司:"
                      class="form-el change"
                      label-width="220px"
                      prop="companyName"
                    >
                      <el-input
                        size="mini"
                        v-model="companyName"
                        readonly
                      ></el-input>
                    </el-form-item>
                  </td>
                  <td style="width: 15%; border: none">
                    <el-form-item
                      label="职位:"
                      class="form-el change"
                      label-width="130px"
                      prop="position"
                    >
                      <el-input
                        size="mini"
                        v-model="position"
                        readonly
                      ></el-input>
                    </el-form-item>
                  </td>
                  <td style="width: 14%; border: none">
                    <el-form-item
                      label="考核对象:"
                      class="form-el change"
                      label-width="100px"
                    >
                      <el-input
                        size="mini"
                        v-model="formHead.objectUserName"
                        readonly
                      ></el-input>
                    </el-form-item>
                  </td>
                  <td style="width: 14%; border: none">
                    <el-form-item
                      label="考核主体:"
                      class="form-el change"
                      label-width="100px"
                    >
                      <el-input
                        size="mini"
                        v-model="subjectName"
                        readonly
                      ></el-input>
                    </el-form-item>
                  </td>
                  <td style="width: 32%; border: none">
                    <el-form-item
                      label="考核周期："
                      class="form-el change"
                      label-width="100px"
                    >
                      <el-input
                        size="mini"
                        v-model="formHead.cycle"
                        readonly
                      ></el-input>
                    </el-form-item>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr class="thick">
            <td :rowspan="BNumber" style="width: 90px">绩效考核任务</td>
            <td rowspan="2" style="width: 130px">任务类型</td>
            <td colspan="4">
              <el-form-item label="规划说明:" class="form-el change">
                <el-input
                  size="mini"
                  v-model="formHead.ruleDes"
                  readonly
                ></el-input>
              </el-form-item>
            </td>
            <td colspan="4">
              <el-form-item label="考核说明:" class="form-el change">
                <el-input
                  size="mini"
                  v-model="formHead.examineDes"
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
            <td style="width: 130px">工作质量</td>
            <td style="width: 130px">及时性</td>
            <td style="width: 130px">工作态度</td>
          </tr>

          <template>
            <template v-if="isXianG">
              <!-- 关键任务 -->
              <tr class="thick">
                <td :rowspan="gNumber + 1">
                  {{ gName.dimensionName }} ({{ gName.ratio }}%)
                </td>
              </tr>
              <tr
                v-for="(item, index1) in gList"
                :key="index1 + 100"
                class="thick"
              >
                <td style="width: 36%">
                  <el-input
                    v-model="item.taskName"
                    placeholder
                    readonly
                    size="mini"
                  ></el-input>
                </td>
                <td>
                  <el-input
                    size="mini"
                    v-model="item.taskEndDate"
                    :readonly="isokDdui"
                    class="inpu-center"
                  ></el-input>
                </td>
                <td>
                  <div class="bai-flex" v-if="isWanOk">
                    <!-- 
                    <template slot-scope="scope">
                          {{scope.taskRate}}
                    </template> -->
                    <el-input
                      v-model="item.taskRate"
                      class="border-input inpu-center"
                      placeholder
                      :readonly="isBai"
                      size="mini"
                      @input.native="onInput0_100"
                      :class="[isBai ? 'isbai-none-two' : 'isbai-block']"
                      @input="
                        (val) => {
                          item.taskRate = val
                            .replace(/[^0-9]/g, '')
                            .replace('.', '#*')
                            .replace(/\./g, '')
                            .replace('#*', '.')
                            .replace(/^0{1,}/g, '')
                            .replace(/^\./g, '');
                        }
                      "
                    ></el-input>

                    <div
                      v-if="item.taskRate == '' || item.taskRate == null"
                    ></div>
                    <div v-else>%</div>
                  </div>
                </td>
                <td>
                  <el-input
                    v-if="isWanOk"
                    v-model="item.taskDetail"
                    placeholder
                    class="border-input inpu-center"
                    :readonly="isBai"
                    size="mini"
                    :maxlength="200"
                    :class="[isBai ? 'isbai-none' : 'isbai-block']"
                  ></el-input>
                </td>

                <td
                  v-if="gName.isMerge == 'Y' && index1 == 0"
                  :rowspan="gNumber"
                >
                  <el-rate
                    v-model="rateZhiGuo"
                    :allow-half="true"
                    :disabled="isXing"
                    class="dis"
                    :disabled-void-color="colorRate"
                    @change="achngeRate"
                  ></el-rate>
                </td>
                <td
                  v-if="gName.isMerge == 'Y' && index1 == 0"
                  :rowspan="gNumber"
                >
                  <el-rate
                    v-model="rateZhiGut"
                    :allow-half="true"
                    :disabled="isXing"
                    class="dis"
                    :disabled-void-color="colorRate"
                    @change="achngeRate"
                  ></el-rate>
                </td>
                <td
                  v-if="gName.isMerge == 'Y' && index1 == 0"
                  :rowspan="gNumber"
                >
                  <el-rate
                    v-model="rateZhiGus"
                    :allow-half="true"
                    :disabled="isXing"
                    class="dis"
                    :disabled-void-color="colorRate"
                    @change="achngeRate"
                  ></el-rate>
                </td>

                <td v-if="gName.isMerge != 'Y'">
                  <el-rate
                    v-model="item.taskQualityStar"
                    :allow-half="true"
                    :disabled="isXing"
                    class="dis"
                    :disabled-void-color="colorRate"
                    @change="achngeRate"
                  ></el-rate>
                </td>
                <td v-if="gName.isMerge != 'Y'">
                  <el-rate
                    v-model="item.taskTimelyStar"
                    :allow-half="true"
                    :disabled="isXing"
                    class="dis"
                    :disabled-void-color="colorRate"
                    @change="achngeRate"
                  ></el-rate>
                </td>
                <td v-if="gName.isMerge != 'Y'">
                  <el-rate
                    v-model="item.taskAttitudeStar"
                    :allow-half="true"
                    :disabled="isXing"
                    class="dis"
                    :disabled-void-color="colorRate"
                    @change="achngeRate"
                  ></el-rate>
                </td>
              </tr>
            </template>

            <!-- 常规任务 -->
            <template v-if="isXianC">
              <tr class="thick">
                <td :rowspan="cNumber + 1">
                  {{ cName.dimensionName }} ({{ cName.ratio }}%)
                </td>
              </tr>
              <tr
                class="thick"
                v-for="(item, index1) in cList"
                :key="index1 + 40"
              >
                <td style="width: 36%">
                  <el-input
                    v-model="item.taskName"
                    placeholder
                    readonly
                    size="mini"
                  ></el-input>
                </td>
                <td>
                  <el-input
                    v-model="item.taskEndDate"
                    placeholder
                    readonly
                    size="mini"
                    class="inpu-center"
                  ></el-input>
                </td>
                <td>
                  <div class="bai-flex" v-if="isWanOk">
                    <el-input
                      v-model="item.taskRate"
                      placeholder
                      :readonly="isBai"
                      size="mini"
                      class="border-input inpu-center"
                      @input.native="onInput0_100"
                      :class="[isBai ? 'isbai-none-two' : 'isbai-block']"
                      @input="
                        (val) => {
                          item.taskRate = val
                            .replace(/[^0-9.]/g, '')
                            .replace('.', '#*')
                            .replace(/\./g, '')
                            .replace('#*', '.')
                            .replace(/^0{1,}/g, '')
                            .replace(/^\./g, '');
                        }
                      "
                    ></el-input>
                    <div
                      v-if="item.taskRate == '' || item.taskRate == null"
                    ></div>
                    <div v-else>%</div>
                  </div>
                </td>
                <td>
                  <el-input
                    class="border-input inpu-center"
                    v-model="item.taskDetail"
                    placeholder
                    :readonly="isBai"
                    size="mini"
                    :maxlength="200"
                    v-if="isWanOk"
                    :class="[isBai ? 'isbai-none' : 'isbai-block']"
                  ></el-input>
                </td>
                <td
                  v-if="cName.isMerge == 'Y' && index1 == 0"
                  :rowspan="cNumber"
                >
                  <el-rate
                    v-model="rateZhiCho"
                    :allow-half="true"
                    :disabled="isXing"
                    class="dis"
                    :disabled-void-color="colorRate"
                    @change="achngeRate"
                  ></el-rate>
                </td>

                <td
                  v-if="cName.isMerge == 'Y' && index1 == 0"
                  :rowspan="cNumber"
                >
                  <el-rate
                    v-model="rateZhiCht"
                    :allow-half="true"
                    :disabled="isXing"
                    class="dis"
                    :disabled-void-color="colorRate"
                    @change="achngeRate"
                  ></el-rate>
                </td>

                <td
                  v-if="cName.isMerge == 'Y' && index1 == 0"
                  :rowspan="cNumber"
                >
                  <el-rate
                    v-model="rateZhiChs"
                    :allow-half="true"
                    :disabled="isXing"
                    class="dis"
                    :disabled-void-color="colorRate"
                    @change="achngeRate"
                  ></el-rate>
                </td>
                <td v-if="cName.isMerge != 'Y'">
                  <el-rate
                    v-model="item.taskQualityStar"
                    :allow-half="true"
                    :disabled="isXing"
                    class="dis"
                    :disabled-void-color="colorRate"
                    @change="achngeRate"
                  ></el-rate>
                </td>
                <td v-if="cName.isMerge != 'Y'">
                  <el-rate
                    v-model="item.taskTimelyStar"
                    :allow-half="true"
                    :disabled="isXing"
                    class="dis"
                    :disabled-void-color="colorRate"
                    @change="achngeRate"
                  ></el-rate>
                </td>
                <td v-if="cName.isMerge != 'Y'">
                  <el-rate
                    v-model="item.taskAttitudeStar"
                    :allow-half="true"
                    :disabled="isXing"
                    class="dis"
                    :disabled-void-color="colorRate"
                    @change="achngeRate"
                  ></el-rate>
                </td>
              </tr>
            </template>
            <!-- 固定任务 -->
            <template v-if="isXianZ">
              <tr>
                <td rowspan="6" class="thick">
                  {{ zhiName.dimensionName }} ({{ zhiName.ratio }}%)
                </td>
              </tr>
              <!-- <template v-if="zhiName.isMerge=='N'">
                <tr v-for="(item,index7) in orgType" :key="index7+70">
                  <td colspan="4">
                    <el-input v-model="item.name" placeholder readonly size="mini"></el-input>
                  </td>
                  <td class="thick">
                    <el-rate
                      v-model="item.taskQualityStar"
                      :allow-half="true"
                      :disabled="isXing"
                      class="dis"
                    ></el-rate>
                  </td>
                  <td class="thick">
                    <el-rate
                      v-model="item.taskTimelyStar"
                      :allow-half="true"
                      :disabled="isXing"
                      class="dis"
                    ></el-rate>
                  </td>
                  <td class="thick">
                    <el-rate
                      v-model="item.taskAttitudeStar"
                      :allow-half="true"
                      :disabled="isXing"
                      class="dis"
                    ></el-rate>
                  </td>
                </tr>
              </template>-->
              <template>
                <tr>
                  <td colspan="4">
                    <el-input
                      v-model="orgType[0].name"
                      placeholder
                      readonly
                      size="mini"
                    ></el-input>
                  </td>
                  <td rowspan="5" class="thick">
                    <el-rate
                      v-model="rateZhiZ"
                      :allow-half="true"
                      :disabled="isXing"
                      class="dis"
                      :disabled-void-color="colorRate"
                      @change="achngeRate"
                    ></el-rate>
                  </td>
                  <td rowspan="5" class="thick">
                    <el-rate
                      v-model="rateZhiT"
                      :allow-half="true"
                      :disabled="isXing"
                      class="dis"
                      :disabled-void-color="colorRate"
                      @change="achngeRate"
                    ></el-rate>
                  </td>

                  <td rowspan="5" class="thick">
                    <el-rate
                      v-model="rateZhiS"
                      :allow-half="true"
                      :disabled="isXing"
                      class="dis"
                      :disabled-void-color="colorRate"
                      @change="achngeRate"
                    ></el-rate>
                  </td>
                </tr>
                <tr>
                  <td colspan="4">
                    <el-input
                      v-model="orgType[1].name"
                      placeholder
                      readonly
                      size="mini"
                    ></el-input>
                  </td>
                </tr>
                <tr>
                  <td colspan="4">
                    <el-input
                      v-model="orgType[2].name"
                      placeholder
                      readonly
                      size="mini"
                    ></el-input>
                  </td>
                </tr>
                <tr>
                  <td colspan="4">
                    <el-input
                      v-model="orgType[3].name"
                      placeholder
                      readonly
                      size="mini"
                    ></el-input>
                  </td>
                </tr>
                <tr>
                  <td colspan="4">
                    <el-input
                      v-model="orgType[4].name"
                      placeholder
                      readonly
                      size="mini"
                    ></el-input>
                  </td>
                </tr>
              </template>
            </template>
          </template>
          <tr class="thick">
            <td colspan="6">任务维度综合评星结果</td>
            <td colspan="6">
              <el-rate
                v-model="formHead.taskAllStar"
                :allow-half="true"
                disabled
                class="dis"
                :disabled-void-color="colorRate"
                @change="achngeRate"
              ></el-rate>
            </td>
          </tr>
          <!-- v-if="isorgList" -->
          <template>
            <tr
              class="thick"
              v-for="(item, index5) in orgScoreList"
              :key="index5"
            >
              <td colspan="6">{{ item.dimensionName }} ({{ item.ratio }}%)</td>
              <td colspan="6" v-if="item.score == null"></td>
              <td colspan="6" v-else>{{ item.score }}分</td>
            </tr>
          </template>

          <tr class="thick">
            <td rowspan="2">绩效沟通</td>
            <td>
              <span style="color: red" v-if="!isokDdui">*</span> 考核对象自评：
            </td>
            <td colspan="10">
              <el-form-item class="form-el change pading-shen">
                <el-input
                  size="mini"
                  class="border-input"
                  v-model="formHead.connectObject"
                  :readonly="isokDdui"
                  :class="[isokDdui ? 'isbai-none' : 'isbai-block']"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr class="thick">
            <td>
              <span style="color: red" v-if="!isokDduiTo">*</span>
              考核主体评价：
            </td>
            <td colspan="10">
              <el-form-item class="form-el change pading-shen">
                <el-input
                  size="mini"
                  class="border-input"
                  v-model="formHead.connectSubject"
                  :readonly="isokDduiTo"
                  :class="[isokDduiTo ? 'isbai-none' : 'isbai-block']"
                ></el-input>
              </el-form-item>
            </td>
          </tr>

          <tr class="thick">
            <td colspan="2">是否特别申请</td>
            <td colspan="10">
              <el-form-item label class="form-el change pading-shen">
                <el-input
                  size="mini"
                  class="border-input"
                  v-model="formHead.applyContent"
                  placeholder="（说明：该考核对象月度表现优异，向责任人进行特别申请绩效系数，并进行申请理由说明。）"
                  :readonly="isShenp"
                  :class="[isShenp ? 'isbai-none' : 'isbai-block']"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="thick" colspan="2" rowspan="2">
              <span style="color: red" v-if="!isXing">*</span> 个人标签
            </td>
            <td colspan="10">
              【从下方备选择】
              <el-tag
                class="close-tag"
                v-for="tag in userLabelList"
                :key="tag.labelCode"
                closable
                color="#F7BA2A"
                size="mini"
                @close="handleClosetag(tag)"
                >{{ tag.labelName }}</el-tag
              >
            </td>
          </tr>
          <tr>
            <td colspan="12">
              <el-tag
                class="close-tag"
                v-for="tag in labelList"
                :key="tag.labelCode"
                type="info"
                size="mini"
                @click="handleClose(tag)"
                >{{ tag.labelName }}</el-tag
              >
            </td>
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
  inject: ["reload"],
  data() {
    return {
      isXing: true,
      colorRate: "#c2c2c2",
      isShenp: true,
      isWanOk: false,
      isstatusO: false,
      isokDdui: false,
      isokDduiTo: false,
      isQian: false,
      isduiOk: true,
      isTiao: true,
      iszhuok: true,
      iszhuTi: false,
      iszhuTui: false,
      isBai: false,
      isduiTi: false,
      isButtonTui: false,
      rateult: 0,
      rateZhiZ: 0,

      rateZhiS: 0,
      rateZhiT: 0,
      rateZhiCh: 0,
      rateZhiCho: 0,
      rateZhiCht: 0,
      rateZhiChs: 0,
      rateZhiGu: 0,
      rateZhiGuo: 0,
      rateZhiGut: 0,
      colors: ["red", "yellow", "green"],
      rateZhiGus: 0,
      subjectName: "",
      sessid: sessionStorage.getItem("sso_sessionid"),
      formHead: {},
      formType: "",
      orgList: [],
      isorgList: false,
      rowspanZhi: 5,
      isrowspanZhi: false,
      isrowspanChange: false,
      isrowspanGuan: false,
      changList: {},
      guanList: {},
      value1: 0,
      orgType: [],
      isXianG: false,
      isXianZ: false,
      isXianC: false,
      executorName: "",
      liablerName: "",
      checkerName: "",
      controllerName: "",

      position: "",
      companyName: "",
      //组织绩效
      orgScoreList: [],
      formTaskMap: {},
      BNumber: 0,
      cNumber: 0,
      gNumber: 0,
      zNumber: 0,
      zhiName: {},
      gName: {},
      cName: {},
      zhiList: [],
      cList: [],
      gList: [],
      labelList: [],
      userLabelList: [],
      isMergeFiex: false,
      isMergeChage: false,
      isMergeGuan: false,
      //考核对象考核主体
      isUsername: false,
      isUsernameTwo: false,
      isButton: true,
      isDai: true,
      isButtonTwo: true,
      isachngeRate: true,
      closeTiem:"",
    };
  },
  mounted() {
    let sessid = this.sessid;
    console.log(this.$store.state);
    // let params = {
    //   formUserCode: this.$store.state.formUserCode,
    // };
    this.getform();
  },


  //销毁
  beforeDestroy() {
    clearInterval(this.closeTiem);
    this.closeTiem = null;
  },
  methods: {
    achngeRate() {
      this.isachngeRate = false;
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
    handleClose(tag) {
      if (this.isXing) {
        return false;
      }
      var that = this;
      let labelList = this.labelList;
      labelList.map((item, i) => {
        if (item.labelCode == tag.labelCode) {
          labelList.splice(i, 1);
        }
      });
      that.userLabelList.push(tag);
    },
    handleClosetag(tag) {
      if (this.isXing) {
        return false;
      }
      let userLabelList = this.userLabelList;
      userLabelList.map((item, i) => {
        if (item.labelCode == tag.labelCode) {
          userLabelList.splice(i, 1);
        }
      });
      this.labelList.push(tag);
    },
    //提交接口
    goNextApi() {
      let sessid = this.sessid;
      var that = this;
      let userLabelList = JSON.parse(JSON.stringify(this.userLabelList));
      for (let i in userLabelList) {
        delete userLabelList[i].createdBy;
        delete userLabelList[i].createdDate;
        delete userLabelList[i].formUserCode;
        delete userLabelList[i].lastUpdatedBy;
        delete userLabelList[i].lastUpdatedDate;
        delete userLabelList[i].objectUser;
        delete userLabelList[i].objectUserName;
        delete userLabelList[i].userLabelCode;
        delete userLabelList[i].userLabelId;
        delete userLabelList[i].status;
        delete userLabelList[i].labelId;
      }
      // console.log(this.formHead);

      // userLabelList

      // socreUserName
      //考核对象
      // console.log(this.formHead.connectObject,this.formHead.connectSubject)

      // console.log(this.zhiList)

      // 任务维度综合评星结果
      // console.log(this.rateult);

      // if (this.isMergeFiex) {
      //   //智业文化绩效合并提交

      // } else {
      //   //智业文化绩效分开提交
      //   // console.log(this.orgType);wr
      // }
      //  console.log(this.rateZhiZ);
      if (that.rateZhiZ == null) {
        that.rateZhiZ = 0;
      }

      if (that.rateZhiGu == null) {
        that.rateZhiGu = 0;
      }

      if (that.rateZhiGuo == null) {
        that.rateZhiGuo = 0;
      }

      if (that.rateZhiGut == null) {
        that.rateZhiGut = 0;
      }
      if (that.rateZhiGus == null) {
        that.rateZhiGus = 0;
      }

      if (that.rateZhiCh == null) {
        that.rateZhiCh = 0;
      }

      if (that.rateZhiCho == null) {
        that.rateZhiCho = 0;
      }
      if (that.rateZhiCht == null) {
        that.rateZhiCht = 0;
      }
      if (that.rateZhiChs == null) {
        that.rateZhiChs = 0;
      }

      if (that.rateZhiZ == null) {
        that.rateZhiZ = 0;
      }
      if (that.rateZhiT == null) {
        that.rateZhiT = 0;
      }
      if (that.rateZhiT == null) {
        that.rateZhiT = 0;
      }
      var zresList = [];
      var zList = this.zhiList;
      for (let i in zList) {
        var item = {
          taskQualityStar: that.rateZhiZ,
          taskTimelyStar: that.rateZhiT,
          taskAttitudeStar: that.rateZhiS,
          taskCode: zList[i].taskCode,
          taskType: "TASK_TYPE_FIXED",
        };
        zresList.push(item);
      }
      var cresList = [];
      var cList = that.cList;
      if (this.isMergeChage) {
        for (let i in cList) {
          var item = {
            taskQualityStar: that.rateZhiCho,
            taskTimelyStar: that.rateZhiCht,
            taskAttitudeStar: that.rateZhiChs,
            taskCode: cList[i].taskCode,
            taskRate: cList[i].taskRate,
            taskDetail: cList[i].taskDetail,
            taskType: "TASK_TYPE_NORMAL",
          };
          cresList.push(item);
        }
        //常规合并打分提交
      } else {
        //常规分开打分提交
        for (let i in cList) {
          if (cList[i].taskQualityStar == null) {
            cList[i].taskQualityStar = 0;
          }
          if (cList[i].taskTimelyStar == null) {
            cList[i].taskTimelyStar = 0;
          }
          if (cList[i].taskAttitudeStar == null) {
            cList[i].taskAttitudeStar = 0;
          }
          var item = {
            taskQualityStar: cList[i].taskQualityStar,
            taskTimelyStar: cList[i].taskTimelyStar,
            taskAttitudeStar: cList[i].taskAttitudeStar,
            taskCode: cList[i].taskCode,
            taskRate: cList[i].taskRate,
            taskDetail: cList[i].taskDetail,
            taskType: "TASK_TYPE_NORMAL",
          };
          cresList.push(item);
        }
      }

      var gresList = [];
      var gList = that.gList;
      if (that.isMergeGuan) {
        //关键合并打分提交
        for (let i in gList) {
          var item = {
            taskQualityStar: that.rateZhiGuo,
            taskTimelyStar: that.rateZhiGut,
            taskAttitudeStar: that.rateZhiGus,
            taskCode: gList[i].taskCode,
            taskRate: gList[i].taskRate,
            taskDetail: gList[i].taskDetail,
            taskType: "TASK_TYPE_KEY",
          };
          gresList.push(item);
        }
      } else {
        //关键效分开打分提交
        for (let i in gList) {
          if (gList[i].taskQualityStar == null) {
            gList[i].taskQualityStar = 0;
          }
          if (gList[i].taskTimelyStar == null) {
            gList[i].taskTimelyStar = 0;
          }
          if (gList[i].taskAttitudeStar == null) {
            gList[i].taskAttitudeStar = 0;
          }
          var item = {
            taskQualityStar: gList[i].taskQualityStar,
            taskTimelyStar: gList[i].taskTimelyStar,
            taskAttitudeStar: gList[i].taskAttitudeStar,
            taskCode: gList[i].taskCode,
            taskRate: gList[i].taskRate,
            taskDetail: gList[i].taskDetail,
            taskType: "TASK_TYPE_KEY",
          };
          gresList.push(item);
        }
      }
      let params = {
        userLabelList,
        formScoreList: [...gresList, ...cresList, ...zresList],
        socreUserName: that.$store.state.userInfo.username,
        applyContent: that.formHead.applyContent,
        connectObject: that.formHead.connectObject,
        connectSubject: that.formHead.connectSubject,
        formUserCode: that.formHead.formUserCode,
      };
      let formlistp = params.formScoreList;
      let arr = [];
      for (let i in formlistp) {
        arr.push(formlistp[i].taskAttitudeStar);
        arr.push(formlistp[i].taskQualityStar);
        arr.push(formlistp[i].taskTimelyStar);
      }
      var checkresult = arr.every(function (item, index, array) {
        return item == 5;
      });

      var checkresultTwo = arr.every(function (item, index, array) {
        return item == 0;
      });

      if (params.userLabelList.length == 0) {
        this.$message.error("您未进行标签评价，请您完成评价后提交");
        return false;
      }

      if (this.isUsername && !this.isUsernameTwo) {
        if (
          that.formHead.connectObject == "" ||
          that.formHead.connectObject == null
        ) {
          this.$message.error("您未对自己进行主观评价，请您完成评价后提交");
          return false;
        }
        if (checkresultTwo) {
          this.chaeval("自己", sessid, params);
        } else if (checkresult) {
          this.goodeval("自己", sessid, params);
        } else if (arr.indexOf(0) != -1) {
          this.weigoodval("自己", sessid, params);
        } else {
          this.getokZ(sessid, params);
        }
      } else if (this.isUsernameTwo && !this.isUsername) {
        if (
          that.formHead.connectSubject == "" ||
          that.formHead.connectSubject == null
        ) {
          this.$message.error("您未对该职员进行主观评价，请您完成评价后提交");
          return false;
        }
        if (checkresult) {
          this.goodeval("该职员", sessid, params);
        } else if (checkresultTwo) {
          this.chaeval("该职员", sessid, params);
        } else if (arr.indexOf(0) != -1) {
          this.weigoodval("该职员", sessid, params);
        } else if (this.isachngeRate) {
          this.$confirm(
            "您未对该职员自评结果进行调整，您是否完全认可该职员自评结果，并以此为该职员绩效得分？",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }
          )
            .then(() => {
              this.getokZ(sessid, params);
            })
            .catch(() => {
              return false;
            });
        } else {
          this.getokZ(sessid, params);
        }
      } else if (this.isUsernameTwo && this.isUsername) {
        if (
          that.formHead.connectObject == "" ||
          that.formHead.connectObject == null
        ) {
          this.$message.error("您未对自己进行主观评价，请您完成评价后提交");
          return false;
        }
        if (checkresultTwo) {
          this.chaeval("自己", sessid, params);
        } else if (checkresult) {
          this.goodeval("自己", sessid, params);
        } else if (arr.indexOf(0) != -1) {
          this.weigoodval("自己", sessid, params);
        } else {
          this.getokZ(sessid, params);
        }
      }
    },

    weigoodval(text, sessid, params) {
      this.$confirm(
        "您对" + text + "的绩效评价有未填写/选择部分，您是否继续提交",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.getokZ(sessid, params);
        })
        .catch(() => {});
    },

    chaeval(text, sessid, params) {
      this.$confirm(
        "您对" +
          text +
          "本周期绩效评价为'极不理想'，连续两次被评价为极不理想将会优先考虑对职员进行优化，您是否可此结论",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          // console.log(55);
          this.getokZ(sessid, params);
        })
        .catch(() => {});
    },
    goodeval(text, sessid, params) {
      this.$confirm(
        "您对" +
          text +
          "本周期绩效评价为'卓越榜样'，近100名职员才会出现1名满分职员，您是否确认提交",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.getokZ(sessid, params);
        })
        .catch(() => {
          return false;
        });
    },
    getokZ(sessid, params) {
      // console.log((JSON.stringify(params)))
      // console.log("成功");
      // return;
      this.api.gradeFormScore(sessid, params).then((res) => {
        if (res.data.status == 200) {
          this.$message.success("评分成功");
          this.closeTiem=setTimeout(() => {
            window.location.href = "about:blank";
            window.close();
            window.opener = window;
          }, 3000);
          this.getform();
        }
      });
    },
    //提交
    goNext(type) {
      let sessid = this.sessid;
      let formHead = this.formHead;
      var formId = formHead.formId;
      var that = this;
      if (type == "form") {
        if (this.$route.path == "/mineform") {
          this.$router.push({
            path: "/minec",
            query: {
              type: "next",
            },
          });
        } else if (this.$route.path == "/kpimineform")
          this.$router.push({
            path: "/kpiTask",
            query: {
              type: "next",
            },
          });
      } else if (type == "zhuping") {
        //考核主体评分
        this.goNextApi();
      } else if (type == "zhuok") {
        //考核主体确定
        this.updateFoem(formId, "PLAN_CONFIRM", "提交成功，待考核对象自评", "");
      } else if (type == "tuihui") {
        //考核主体退回
        this.$prompt("请输入退回意见", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          showInput: true,
          inputErrorMessage: "请输入退回意见",
          inputValidator(e) {
            if (e == null) {
              return false;
            }
          },
        })
          .then(({ value }) => {
            // console.log(value);
            this.updateFoem(
              formId,
              "PLAN_RETURN",
              "退回成功，待考核对象重新制定",
              value
            );
          })
          .catch(() => {});
      } else if (type == "qu") {
        // 考核对象取回
        let status = formHead.status;
        this.updateFoem(formId, "PLAN_BACK", "取回成功，请重新制定", "");
      } else if (type == "duiping") {
        // 考核对象自评
        this.goNextApi();
      } else if (type == "to") {
        // 考核对象确定
        let status = formHead.status;
        this.updateFoem(formId, "PLAN_SUBMIT", "提交成功，待考核主体确认", "");
      }
    },
    updateFoem(formId, status, chu, backContent) {
      let sessid = this.sessid;
      let params = {
        status,
        formId,
        backContent,
      };
      this.api.updateFormUser(sessid, params).then((res) => {
        if (res.data.status == 200) {
          this.$message.success(chu);
          this.getform();
        }
      });
    },
    changzhi(formUser) {
      if (formUser.cycle == "CYCLE_MONTH") {
        formUser.cycle = "月度考核";
      } else if (formUser.cycle == "CYCLE_QUARTER") {
        formUser.cycle = "季度考核";
      } else if (formUser.cycle == "CYCLE_YEAR:") {
        formUser.cycle = "半年考核";
      }
    },
    getform() {
      if (this.$route.query.type == "dai") {
        this.isButtonTui = true;
        this.isButton = true;
        this.$store.commit("modifyindexSi", "3-6");
      } else if (this.$route.query.type == "cha") {
        this.isButtonTui = true;
        this.isButton = false;
        this.$store.commit("modifyindexSi", "3-1");
        this.isBai = true;
      } else if (this.$route.query.type == "chaTwo") {
        this.isButtonTui = true;
        this.isButton = false;
        this.$store.commit("modifyindexSi", "3-2");
        this.isBai = true;
      } else if (this.$route.query.type == "me") {
        this.isButtonTui = true;
        this.isButton = true;
        this.$store.commit("modifyindexSi", "4-1");
      } else {
        this.isButton = true;
        this.$store.commit("modifyindexSi", "4-2");
      }
      let sessid = this.sessid;

      if (sessid == null) {
        sessid = "";
      }
      let params = {
        formUserCode: this.$store.state.formUserCode,
      };
      if (
        !this.$route.query.formUserCode ||
        this.$route.query.formUserCode == null ||
        this.$route.query.formUserCode == ""
      ) {
        params.formUserCode = this.$store.state.formUserCode;
      } else {
        params.formUserCode = this.$route.query.formUserCode;
      }
      this.api.getUserFormDetail(sessid, params).then((res) => {
        if (res.data.status == 200) {
          let data = res.data.data;
          let formUser = data.formUser;
          this.changzhi(formUser);
          if (data.labelList == null) {
            this.labelList = [];
          } else {
            this.labelList = data.labelList;
          }
          if (data.userLabelList == null) {
            this.userLabelList = [];
          } else {
            this.userLabelList = data.userLabelList;
          }
          //判断是登录对象还是考核主体
          formUser.createdDate = formUser.createdDate.slice(0, 11);
          formUser.taskAllStar = Number(formUser.taskAllStar);
          if (formUser.connectSubject == "undefined") {
            formUser.connectSubject = "";
          }
          this.formHead = formUser;
          let relationUser = data.relationUser;

          if (this.$route.query.username) {
            //考核对象
            if (relationUser.objectUser == this.$route.query.username) {
              this.isUsername = true;
            }
            //考核主体
            if (relationUser.subjectUser == this.$route.query.username) {
              this.isUsernameTwo = true;
            }
          } else {
            //考核对象
            if (
              relationUser.objectUser == this.$store.state.userInfo.username
            ) {
              this.isUsername = true;
            }
            //考核主体
            if (
              relationUser.subjectUser == this.$store.state.userInfo.username
            ) {
              this.isUsernameTwo = true;
            }
          }

          console.log(this.$store.state.userInfo.username);

          console.log(
            "考核对象" + relationUser.objectUser + this.isUsername,
            "考核主体" + relationUser.subjectUser + this.isUsernameTwo
          );
          console.log(this.formHead.status);
          if (this.isUsernameTwo) {
            this.isUsernameTwo = true;
          } else if (this.isUsername) {
            this.isUsername = true;
          }
          if (
            this.formHead.status == "PLAN_NOTSUBMIT" ||
            this.formHead.status == null
          ) {
            //未提交
            this.isShenp = true;
            this.isWanOk = false;
            this.isokDduiTo = true;
            this.isokDdui = true;
            this.isQian = false;
            this.isBai = true;
            this.isduiTi = false;
            this.isstatusO = false;
            this.iszhuok = false;
            this.iszhuTi = false;
            this.iszhuTui = false;
            this.isXing = true;
            if (this.isUsernameTwo) {
              this.isduiOk = false;
              this.isTiao = false;
            } else if (this.isUsername) {
              this.isTiao = true;
              this.isduiOk = true;
            }
            if (this.isUsernameTwo && this.isUsername) {
              this.isTiao = true;
              this.isduiOk = true;
            }
            if (
              this.$route.query.type == "cha" ||
              this.$route.query.type == "chaTwo"
            ) {
              this.isXing = true;
              this.isokDdui = true;
              this.isokDduiTo = true;
              this.isBai = true;
            }
          } else if (this.formHead.status == "PLAN_SUBMIT") {
            //考核对象提交表,单核主体未确认
            this.isWanOk = false;
            this.isShenp = true;

            this.isokDduiTo = true;
            this.isokDdui = true;
            this.isBai = true;
            this.isduiOk = false;
            this.isduiTi = false;
            this.isstatusO = true;
            // ;;
            this.iszhuok = true;
            this.iszhuTi = false;
            this.iszhuTui = true;
            this.isXing = true;

            if (this.isUsernameTwo) {
              this.isTiao = false;
            } else if (this.isUsername) {
              this.isTiao = true;
            }

            if (this.isUsernameTwo && this.isUsername) {
              this.iszhuok = true;
              this.iszhuTui = true;
              this.isstatusO = true;
            }

            if (
              this.$route.query.type == "cha" ||
              this.$route.query.type == "chaTwo"
            ) {
              this.isXing = true;
              this.isokDdui = true;
              this.isokDduiTo = true;
              this.isBai = true;
            }
          } else if (this.formHead.status == "PLAN_BACK") {
            //考核对象已取回
            this.isWanOk = false;
            this.isShenp = true;
            this.isBai = true;
            this.isduiTi = false;
            this.isstatusO = false;
            this.iszhuok = false;
            this.iszhuTi = false;
            this.iszhuTui = false;
            this.isXing = true;
            this.isokDduiTo = true;
            this.isokDdui = true;
            if (this.isUsernameTwo) {
              this.isduiOk = false;
              this.isTiao = false;
              // this.isUsername = false;
            } else if (this.isUsername) {
              this.isduiOk = true;
              this.isTiao = true;
              // this.isUsername = true;
            }
            if (this.isUsernameTwo && this.isUsername) {
              this.isTiao = true;
              this.isduiOk = true;
            }
            if (
              this.$route.query.type == "cha" ||
              this.$route.query.type == "chaTwo"
            ) {
              this.isXing = true;
              this.isokDdui = true;
              this.isokDduiTo = true;
              this.isBai = true;
            }
          } else if (this.formHead.status == "PLAN_CONFIRM") {
            //考核主体已确认 考核对象自评分
            this.isShenp = true;
            this.isduiOk = false;
            this.isduiTi = true;
            this.isstatusO = false;
            this.iszhuok = false;
            this.iszhuTi = false;
            this.iszhuTui = false;
            this.isTiao = false;
            this.isButtonTwo = false;
            if (this.isUsernameTwo) {
              this.isXing = true;
              this.isBai = true;
              this.isWanOk = false;
            } else if (this.isUsername) {
              this.isBai = false;
              this.isWanOk = true;
              this.isokDdui = false;
              this.isXing = false;
            }
            if (this.isXing == false) {
              this.isokDdui = false;
              this.isokDduiTo = true;
            } else {
              this.isokDduiTo = true;
              this.isokDdui = true;
            }
            if (this.isUsernameTwo && this.isUsername) {
              this.isTiao = false;
              this.isXing = false;
              this.isduiOk = false;
              this.iszhuTi = false;
              this.isduiTi = true;
              this.isWanOk = true;
              this.isBai = false;
              // 	考核对象自评
              this.isokDdui = false;
              this.isokDduiTo = false;
              this.isShenp = false;
            }
            if (
              this.$route.query.type == "cha" ||
              this.$route.query.type == "chaTwo"
            ) {
              this.isXing = true;
              this.isokDdui = true;
              this.isokDduiTo = true;
              this.isBai = true;
            }
          } else if (this.formHead.status == "PLAN_RETURN") {
            //考核主体退回
            this.isBai = true;
            this.isShenp = true;
            this.isWanOk = false;
            this.isduiOk = true;
            this.isduiTi = false;
            this.isstatusO = false;
            this.iszhuok = false;
            this.iszhuTi = false;
            this.iszhuTui = false;
            this.isokDdui = true;
            this.isokDduiTo = true;
            if (this.isUsernameTwo) {
              this.isTiao = false;
              this.isXing = true;
            } else if (this.isUsername) {
              this.isTiao = true;
              this.isXing = true;
            }
            if (this.isUsernameTwo && this.isUsername) {
              this.isTiao = true;
              this.isXing = true;
            }
            if (
              this.$route.query.type == "cha" ||
              this.$route.query.type == "chaTwo"
            ) {
              this.isXing = true;
              this.isokDdui = true;
              this.isokDduiTo = true;
              this.isBai = true;
            }
          } else if (this.formHead.status == "SCORE_OBJECT_SUBMIT") {
            //考核对象已评分
            this.isWanOk = true;
            this.isShenp = false;
            this.isBai = true;
            this.isduiOk = false;
            this.isduiTi = false;
            this.isstatusO = false;
            this.iszhuok = false;
            this.iszhuTi = true;
            this.iszhuTui = false;
            if (this.isUsernameTwo) {
              this.isTiao = false;
              this.isXing = false;
              this.isokDdui = true;
              this.isokDduiTo = false;
            } else if (this.isUsername) {
              this.isTiao = false;
              this.isXing = true;
              this.isokDdui = true;
              this.isokDduiTo = true;
            }
            if (
              this.$route.query.type == "cha" ||
              this.$route.query.type == "chaTwo"
            ) {
              this.isXing = true;
              this.isokDdui = true;
              this.isokDduiTo = true;
              this.isBai = true;
            }
            if (this.isUsernameTwo && this.isUsername) {
              this.isTiao = false;
              this.isXing = true;
              this.isokDdui = true;
              this.isokDduiTo = true;
            }
          } else if (this.formHead.status == "SCORE_SUBJECT_SUBMIT") {
            //考核主体已评分
            this.isShenp = true;
            this.isWanOk = true;
            this.isokDdui = true;
            this.isokDduiTo = true;
            this.isBai = true;
            this.isduiOk = false;
            this.isduiTi = false;
            this.isstatusO = false;
            this.iszhuok = false;
            //修改
            this.isXing = true;
            this.iszhuTi = false;
            this.iszhuTui = false;
            this.isButtonTwo = false;
            if (this.isUsernameTwo) {
              this.isTiao = false;
            } else if (this.isUsername) {
              this.isTiao = false;
            }

            if (this.isUsernameTwo && this.isUsername) {
              this.isTiao = false;
            }
            if (
              this.$route.query.type == "cha" ||
              this.$route.query.type == "chaTwo"
            ) {
              this.isXing = true;
              this.isokDdui = true;
              this.isokDduiTo = true;
              this.isBai = true;
            }
          } else {
            this.isShenp = true;
            this.isWanOk = true;
            this.isokDdui = true;
            this.isokDduiTo = true;
            this.isBai = true;
            this.isduiOk = false;
            this.isduiTi = false;
            this.isstatusO = false;
            this.iszhuok = false;
            this.iszhuTi = false;
            this.iszhuTui = false;
            this.isXing = true;
            this.isButtonTwo = false;
            if (this.isUsernameTwo) {
              this.isTiao = false;
            } else if (this.isUsername) {
              this.isTiao = false;
            }
            if (this.isUsernameTwo && this.isUsername) {
              this.isTiao = false;
            }
            if (
              this.$route.query.type == "cha" ||
              this.$route.query.type == "chaTwo"
            ) {
              this.isXing = true;
              this.isokDdui = true;
              this.isokDduiTo = true;
              this.isBai = true;
            }
          }
          // 组织得分
          this.orgScoreList = data.orgScoreList;
          this.executorName = data.executorName;
          this.liablerName = data.liablerName;
          this.checkerName = data.checkerName;
          this.controllerName = data.controllerName;
          this.companyName = data.companyName;
          let position = data.position;
          this.subjectName = data.subjectName;
          //对象
          let taskTypeList = data.taskTypeList;
          if (formUser.formLeve == "LEVE_BASIC") {
            this.orgType = [
              { name: "持续学习" },
              { name: "主动创新" },
              { name: "自我驱动" },
              { name: "高效执行" },
              { name: "乐于宣传并积极践行智业文化或准则" },
            ];
          } else if (formUser.formLeve == "LEVE_MANAGER") {
            this.orgType = [
              { name: "主动创新" },
              { name: "团队管理" },
              { name: "自我驱动" },
              { name: "系统思考及执行" },
              { name: "乐于宣传并积极践行智业文化或准则" },
            ];
          } else if (formUser.formLeve == "LEVE_LEADER") {
            this.orgType = [
              { name: "团队领导" },
              { name: "胸怀格局" },
              { name: "全局意识" },
              { name: "主动创新" },
              { name: "乐于宣传并积极践行智业文化或准则" },
            ];
          }
          this.position = position;
          let BNumber = 0;
          let gList = [];
          let cList = [];

          for (let i in taskTypeList) {
            if (taskTypeList[i].normalTaskType) {
              this.cNumber =
                taskTypeList[i].normalTaskType.normalTaskList.length;
              this.cName = taskTypeList[i].normalTaskType;
              var normalTaskType =
                taskTypeList[i].normalTaskType.normalTaskList;

              for (let j in normalTaskType) {
                normalTaskType[j].taskQualityStar = Number(
                  normalTaskType[j].taskQualityStar
                );
                normalTaskType[j].taskTimelyStar = Number(
                  normalTaskType[j].taskTimelyStar
                );
                normalTaskType[j].taskAttitudeStar = Number(
                  normalTaskType[j].taskAttitudeStar
                );
              }
              cList = normalTaskType;
              this.isXianC = true;

              if (taskTypeList[i].normalTaskType.isMerge == "Y") {
                this.isMergeChage = true;

                for (let j in normalTaskType) {
                  this.rateZhiCho = Number(normalTaskType[j].taskQualityStar);
                  this.rateZhiCht = Number(normalTaskType[j].taskTimelyStar);
                  this.rateZhiChs = Number(normalTaskType[j].taskAttitudeStar);
                }
              } else {
                this.isMergeChage = false;
              }
            } else if (taskTypeList[i].keyTaskType) {
              this.gNumber = taskTypeList[i].keyTaskType.keyTaskList.length;
              this.gName = taskTypeList[i].keyTaskType;

              var keyTaskList = taskTypeList[i].keyTaskType.keyTaskList;
              for (let j in keyTaskList) {
                keyTaskList[j].taskQualityStar = Number(
                  keyTaskList[j].taskQualityStar
                );
                keyTaskList[j].taskTimelyStar = Number(
                  keyTaskList[j].taskTimelyStar
                );
                keyTaskList[j].taskAttitudeStar = Number(
                  keyTaskList[j].taskAttitudeStar
                );
              }
              gList = keyTaskList;
              this.isXianG = true;

              if (taskTypeList[i].keyTaskType.isMerge == "Y") {
                this.isMergeGuan = true;
                for (let j in keyTaskList) {
                  this.rateZhiGuo = Number(keyTaskList[j].taskQualityStar);
                  this.rateZhiGut = Number(keyTaskList[j].taskTimelyStar);
                  this.rateZhiGus = Number(keyTaskList[j].taskAttitudeStar);
                }
              } else {
                this.isMergeGuan = false;
              }
            } else if (taskTypeList[i].fixedTaskType) {
              this.zNumber = taskTypeList[i].fixedTaskType.fixedTaskList.length;

              this.zhiList = taskTypeList[i].fixedTaskType.fixedTaskList;
              this.zhiName = taskTypeList[i].fixedTaskType;
              this.isXianZ = true;

              var fixedTaskList = taskTypeList[i].fixedTaskType.fixedTaskList;
              for (let j in fixedTaskList) {
                this.rateZhiZ = Number(fixedTaskList[j].taskQualityStar);
                this.rateZhiT = Number(fixedTaskList[j].taskTimelyStar);
                this.rateZhiS = Number(fixedTaskList[j].taskAttitudeStar);
              }
            }
          }
          for (let i in gList) {
            gList[i].taskEndDate = gList[i].taskEndDate.substring(0, 10);
          }
          for (let i in cList) {
            cList[i].taskEndDate = cList[i].taskEndDate.substring(0, 10);
          }
          this.gList = gList;
          this.cList = cList;

          if (this.zNumber == 0 || this.zNumber == null) {
            this.BNumber = this.cNumber + this.gNumber + Number(4);
            this.isXianZ = false;
          } else if (this.cNumber == 0 && this.gNumber == 0) {
            this.isXianZ = true;
            this.BNumber = Number(8);
          } else if (this.gNumber == 0 && this.zNumber != 0) {
            this.isXianZ = true;
            this.BNumber = this.cNumber + Number(9);
          } else {
            this.BNumber = this.cNumber + this.gNumber + Number(10);
            this.isXianZ = true;
          }
          if (this.gNumber == 0) {
            this.isXianG = false;
          } else {
            this.isXianG = true;
          }
          if (this.cNumber == 0) {
            this.isXianC = false;
          } else {
            this.isXianC = true;
          }
        }
      });
    },
  },
};
</script>

<style lang="less">
@import url("../../assets/utils.less");
.el-tag {
  color: #fff !important;
}
.pading-shen {
  margin: auto 6px !important;
}
.isbai-block {
}
.isbai-none {
  border: none !important;
}
.isbai-none-two {
  border: none !important;
  width: 45% !important;
}

.plain-dang {
  &:hover {
    background: #fff;
    border-color: @color3 !important;
    color: @color3 !important;
  }

  color: @color3 !important;
  border: 1px solid @color3;
}
.bai-flex {
  display: flex;
  .flex(center);
  .el-input {
    width: 80%;
  }
  & > div:nth-child(2) {
    line-height: 20px;
    margin-left: 2px;
  }
}
.inpu-center {
  .el-input__inner {
    text-align: center !important;
  }
}
.el-tag.el-tag--info {
  color: #909399 !important;
}
</style>