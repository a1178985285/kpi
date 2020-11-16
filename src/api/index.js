
import axios from '../utils/http'; // 导入http中创建的axios实例
const apiList = {
    //登录人
    getUser(sessid) {
        return axios.getWay(`/base/getLoginUserInfo?sso_sessionid=${sessid}`,)
    },
    //查询人员
    getPageList(sessid, params) {
        return axios.getWay(`/relation/selectStaffListByPage?sso_sessionid=${sessid}&page=${params.page}&pageSize=${params.pageSize}&selectName=${params.selectName}`)
    },
    getRelationSetList(sessid) {
        return axios.getWay(`/base/getRelationSetList?sso_sessionid=${sessid}`,)
    },

    insertOrUpdateRelationSet(sessid, params) {
        return axios.postWay(`/base/insertOrUpdateRelationSet?sso_sessionid=${sessid}`, params)
    },

    // 绩效机构
    getRelationOrgList(sessid, params) {
        return axios.getWay(`/base/getRelationOrgList?sso_sessionid=${sessid}&orgName=${params}`)
    },
    // id
    getRelationOrgDetail(sessid, params) {
        return axios.getWay(`/base/getRelationOrgDetail?sso_sessionid=${sessid}&orgInfoId=${params}`)
    },
    // 修改
    insertOrUpdateRelationOrg(sessid, params) {
        return axios.postWay(`/base/insertOrUpdateRelationOrg?sso_sessionid=${sessid}`, params)
    },
    //组织绩效
    getRelationDimensionList(sessid, params) {
        return axios.getWay(`/base/getRelationDimensionList?sso_sessionid=${sessid}&orgName=${params.orgName}&selectDate=${params.selectDate}`, params)
    },
    //导入
    //维度
    dimensionList(sessid, params) {
        return axios.getWay(`/base/getDimensionList?sso_sessionid=${sessid}&dnName=${params.dnName}&type=${params.type}&status=${params.status}`)
    },

    adddimensionList(sessid, params) {
        return axios.postWay(`/base/insertOrUpdateDimension?sso_sessionid=${sessid}`, params)
    },
    // 表单
    getFormHeadListByPage(sessid, params) {
        return axios.getWay(`/form/getFormHeadListByPage?sso_sessionid=${sessid}&page=${params.page}&pageSize=${params.pageSize}&formName=${params.formName}&status=${params.status}&formType=${params.formType}&formLevel=${params.formLevel}`)
    },
    //表单预览
    getFromModelDeatil(sessid, params) {
        return axios.getWay(`/form/getFromModelDeatil?sso_sessionid=${sessid}&formId=${params.formId}`)
    },
    //表单维度查看
    getFormDimensionListByPage(sessid, params) {
        return axios.getWay(`/form/getFormDimensionListByPage?sso_sessionid=${sessid}&page=${params.page}&pageSize=${params.pageSize}&dimensionName=${params.dimensionName}&formCode=${params.formCode}`)
    },

    //维度获取值
    getFormDimensionDetail(sessid, params) {
        return axios.getWay(`/form/getFormDimensionDetail?sso_sessionid=${sessid}&formDimensionId=${params.formDimensionId}`,)
    },
    //下拉
    getFormDimensionList(sessid, params) {
        return axios.getWay(`/form/getFormDimensionList?sso_sessionid=${sessid}&formType=${params.formType}&showType=${params.showType}`,)
    },
    //维度新增/修改、删除
    insertOrUpdateFormDimension(sessid, params) {
        return axios.post(`/form/insertOrUpdateFormDimension?sso_sessionid=${sessid}`, params)
    },
    //维度删除
    deleteFormDimension(sessid, params) {
        return axios.postWay(`/form/deleteFormDimension?sso_sessionid=${sessid}&fmId=${params.fmId}&status=${params.status}`)
    },
    //启用
    updateFormHeadStatus(sessid, params) {
        return axios.post(`/form/updateFormHeadStatus?sso_sessionid=${sessid}&formId=${params.formId}&status=${params.status}`)
    },
    //表头新增
    insertOrUpdateFormHead(sessid, params) {
        return axios.postWay(`/form/insertOrUpdateFormHead?sso_sessionid=${sessid}`, params)
    },
    //关系
    getBasicse(sessid, params) {
        return axios.getWay(`/relation/getRelationUserList?sso_sessionid=${sessid}&page=${params.page}&pageSize=${params.pageSize}&userName=${params.userName}&orgName=${params.orgName}`)
    },
    //关系详情
    getRelationUserDetail(sessid, params) {
        return axios.getWay(`/relation/getRelationUserDetail?sso_sessionid=${sessid}&rnUserId=${params}`,)
    },

    //未配置
    selectUnRelationUserList(sessid, params) {
        return axios.getWayTwo(`/relation/selectUnRelationUserList?sso_sessionid=${sessid}&departmentName=${params.departmentName}&staffName=${params.staffName}&page=${params.page}&pageSize=${params.pageSize}`,)
    },

    //删除
    deleteRelationSetUsers(sessid, params) {
        return axios.postWay(`/relation/deleteRelationSetUsers?sso_sessionid=${sessid}&userIds=${params.userIds}`)
    },
    //关系新增·xiugai
    insertOrUpdateRelationUser(sessid, params) {
        return axios.post(`/relation/insertOrUpdateRelationUser?sso_sessionid=${sessid}`, params,)
    },
    //根据用户查询
    getFormModelList(sessid, params) {
        return axios.getWay(`/form/getFormModelList?sso_sessionid=${sessid}&userRole=${params}`,)
    },
    //未配置修改
    insertRelationUsers(sessid, params) {
        return axios.post(`/relation/insertRelationUsers?sso_sessionid=${sessid}&usernames=${params.usernames}&staffNames=${params.staffNames}&staffNums=${params.staffNums}&status=${params.status}&departmentNames=${params.departmentNames}&subjectUser=${params.subjectUser}&subjectUserNumber=${params.subjectUserNumber}&subjectName=${params.subjectName}`,params)
    },
    //模板下载
    exportORGRelationModel(sessid, params) {
        return axios.getWayTwo(`/base/exportORGRelationModel?sso_sessionid=${sessid}`,)
    },
    //上传
    importORGRelation(sessid, params) {
        return axios.postWay(`/base/importORGRelation?sso_sessionid=${sessid}`, params)
    },
    //导出
    exportORGRelationData(sessid, params) {
        return axios.getWayTwo(`/base/exportORGRelationData?sso_sessionid=${sessid}&orgName=${params.orgName}&selectDate=${params.selectDate}`,)
    },
    confirmOrgScore(sessid, params) {
        return axios.getWayTwo(`/base/confirmOrgScore?sso_sessionid=${sessid}&pdDate=${params}`,)
    },
    //指定绩效任务表头
    checkFormUser(sessid, params) {
        return axios.get(`/task/checkFormUser?sso_sessionid=${sessid}&username=${params.username}&formDate=${params.formDate}`,)
    },
    getFormTaskList(sessid, params) {
        return axios.getWay(`/task/getFormTaskList?sso_sessionid=${sessid}&username=${params.username}&formDate=${params.formDate}&formUserCode=${params.formUserCode}`,)
    },
    // getFormTaskListTwo(sessid, params) {
    //     return axios.getWay(`/task/getFormTaskList?sso_sessionid=${sessid}`,)
    // },
    //新增任务
    insertFormTask(sessid, params) {
        return axios.post(`/task/insertFormTask?sso_sessionid=${sessid}`, params)
    },
    //表单预览任务
    getUserFormDetail(sessid, params) {
        return axios.getWay(`/examine/getUserFormDetail?sso_sessionid=${sessid}&formUserCode=${params.formUserCode}`,)
    },
    //我的绩效
    getMyPerformance(sessid, params) {
        return axios.postWay(`/examine/getMyPerformance?sso_sessionid=${sessid}&pageSize=${params.pageSize}&page=${params.page}&formDate=${params.formDate}`, params)
    },
    //绩效进度查询
    getPerformanceProgressQuery(sessid, params) {
        return axios.getWay(`/examine/getPerformanceProgressQuery?sso_sessionid=${sessid}&formDate=${params.formDate}&orgCodes=${params.orgCodes}&page=${params.page}&pageSize=${params.pageSize}&status=${params.status}&subjectName=${params.subjectName}&userName=${params.userName}`)
    },
    // //待审批绩效】【查询用户绩效
    getFormTotalList(sessid, params) {
        return axios.postWay(`/examine/getFormTotalList?sso_sessionid=${sessid}&formDate=${params.formDate}&orgCode=${params.orgCode}&page=${params.page}&pageSize=${params.pageSize}&status=${params.status}&userName=${params.userName}`)
    },
    getPendingApprovalTask(sessid, params) {
        return axios.postWay(`/examine/getPendingApprovalTask?sso_sessionid=${sessid}&formDate=${params.formDate}&orgName=${params.orgName}&page=${params.page}&pageSize=${params.pageSize}&status=${params.status}&userName=${params.userName}`,)
    },
    //定时任务
    getTimedPlanList(sessid, params) {
        return axios.getWay(`/timed/getTimedPlanList?sso_sessionid=${sessid}`,)
    },
    //定时任务详情
    getTimedPlanDetail(sessid, params) {
        return axios.getWay(`/timed/getTimedPlanDetail?sso_sessionid=${sessid}&timedId=${params}`,)
    },
    //新增修改
    insertOrUpdateFormTime(sessid, params) {
        return axios.postWay(`/timed/insertOrUpdateFormTime?sso_sessionid=${sessid}`, params)
    },

    //执行
    runJobNow(sessid, params) {
        return axios.getWay(`/timed/runJobNow?sso_sessionid=${sessid}&timedId=${params}`,)
    },
    //启用
    addJob(sessid, params) {
        return axios.getWay(`/timed/addJob?sso_sessionid=${sessid}&timedId=${params}`,)
    },
    //删除
    deleteJob(sessid, params) {
        return axios.getWay(`/timed/deleteJob?sso_sessionid=${sessid}&timedId=${params}`,)
    },


    // 表单头修改
    updateFormUser(sessid, params) {
        return axios.post(`/task/updateFormUser?sso_sessionid=${sessid}&formId=${params.formId}&status=${params.status}&backContent=${params.backContent}`, params)
    },
    // 绩效评分接口
    gradeFormScore(sessid, params) {
        return axios.post(`/score/gradeFormScore?sso_sessionid=${sessid}`, params)
    },

    getSatisfactionFormDetail(sessid, params) {
        return axios.postWay(`/examine/getSatisfactionFormDetail?sso_sessionid=${sessid}&formUserCode=${params.formUserCode}&formCode=${params.formCode}&formDate=${params.formDate}`, params)
    },


    //满意度评分
    satisfactionFormRating(sessid, params, type) {
        return axios.postWay(`/score/satisfactionFormRating?sso_sessionid=${sessid}&submitType=${type}`, params)
    },

    //绩效系数，绩效机构
    getOrgInfoListByLiabler(sessid, params) {
        return axios.getWay(`/base/getOrgInfoListByLiabler?sso_sessionid=${sessid}&username=${params}`,)
    },
    //绩效系数列表
    getAdjustFormList(sessid, params) {
        return axios.get(`/adjust/getAdjustFormList?sso_sessionid=${sessid}&orgCode=${params.orgCode}&formDate=${params.formDate}&username=${params.username}&objectRole=${params.objectRole}`,)
    },

    //系数调整
    adjustUserForm(sessid,submitType, params,orgCode) {
        return axios.postCode(`/adjust/adjustUserForm?sso_sessionid=${sessid}&submitType=${submitType}&orgCode=${orgCode}`,params)
    },

    //绩效进度里绩效机构查询
    getOrgInfoList(sessid) {
        return axios.getWay(`/base/getOrgInfoList?sso_sessionid=${sessid}`)
    },


    //组织机构查询
    getOrgApprovalList(sessid,params) {
        return axios.postWay(`/examine/getOrgApprovalList?sso_sessionid=${sessid}&formDate=${params.formDate}&orgName=${params.orgName}&status=${params.status}`)
    },


}
export default apiList;
