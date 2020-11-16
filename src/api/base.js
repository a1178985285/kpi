/**
  * 接口域名的管理
  */
//  开发
 var headerUrl = 'https://dev';

//  生产
//  var headerUrl = 'https://';

 const base = {
    // 本地环境
    tologinUrl:headerUrl+ 'sso.firstcare.com.cn/login?redirect_url=http://10.200.18.67:8084/',
    tologoutUrl:headerUrl+ 'sso.firstcare.com.cn/logout?redirect_url=http://10.200.18.67:8084/',
    imgUrl:headerUrl+"hr.firstcare.com.cn/upload/staffHead/"

    // // 开发环境
    // tologinUrl: headerUrl + 'sso.firstcare.com.cn/login?redirect_url='+ headerUrl +'pfm.firstcare.com.cn/index.html',
    // tologoutUrl: headerUrl + 'sso.firstcare.com.cn/logout?redirect_url='+ headerUrl +'pfm.firstcare.com.cn/index.html',
    // imgUrl:headerUrl+"hr.firstcare.com.cn/upload/staffHead/"
}

export default {base ,headerUrl};
