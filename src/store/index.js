import Vue from 'vue'
import Vuex from 'vuex'
import '@babel/polyfill';
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    pageSize:50,
    codeName:{},
    indexSi: "",
    userInfo: "",
    seeid: "",
    toForm: {},
    formCode: "",
    formType: "",
    formId: "",
    searPageType: "people",
    formUserCode:"",
    changDm:"",
    adminachangDm:"",
    mineachangDm:"",
    basicscchangDm:"",
    admincchangDm:"",
    adminechangDm:"",
    adminpchangDm:"",
    okDate:"",
    okDateCode:"",
    formcodeuss:"",
    oauser:"",
    oadate:""
  },
  mutations: {
    modifyindexSi(state, n) {
      state.indexSi = n
    },
    userInfo(state, params) {
      state.userInfo = params
    },
    usersee(state, params) {
      state.seeid = params
    },
    toForms(state, params) {
      state.toForm = params
    },
    getformCode(state, params) {
      state.formCode = params
    },
    getformType(state, params) {
      state.formType = params
    },
    getformId(state, params) {
      state.formId = params
    },
    getsearPageType(state, params) {
      state.searPageType = params
    },
    getformUserCode(state, params) {
      state.formUserCode = params
    },
    getchangDm(state, params) {
      state.changDm = params
    },
    getadminachangDm(state, params) {
      state.adminachangDm = params
    },
    getmineachangDm(state, params) {
      state.mineachangDm = params
    },
    getbasicscchangDm(state, params) {
      state.basicscchangDm = params
    },
    getadmincchangDm(state, params) {
      state.admincchangDm = params
    },
    getadminechangDm(state, params) {
      state.adminechangDm = params
    },
    getadminpchangDm(state, params) {
      state.adminpchangDm = params
    },

    getokDate(state, params) {
      state.okDate = params
    },
    getokDateCode(state, params) {
      state.okDateCode = params
    },
    
    getcodeName(state, params) {
      state.codeName = params
    },
    getformcodeuss(state, params) {
      state.formcodeuss = params
    },

    getoauser(state, params) {
      state.oauser = params
    },
    getoadate(state, params) {
      state.oadate = params
    },
    
    

  },
  actions: {
  },
  modules: {
  }
})
