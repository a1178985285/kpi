exports.install = function (Vue, options) {
    Vue.prototype.changeDatMa = function (records) {
        for (let i in records) {
            if (records[i].status == "PLAN_NOTSUBMIT") {
                records[i].status = "绩效未提交";
            }
            else if (records[i].status == "PLAN_NONE") {
                records[i].status = "绩效未制定";
            }
            else if (records[i].status == "PLAN_SUBMIT") {
                records[i].status = "绩效已提交";
            }
            else if (records[i].status == "PLAN_BACK") {
                records[i].status = "绩效已取回";
            } else if (records[i].status == "PLAN_CONFIRM") {
                records[i].status = "绩效已确认";
            } else if (records[i].status == "PLAN_RETURN") {
                records[i].status = "绩效已退回";
            } else if (records[i].status == "SCORE_OBJECT_SUBMIT") {
                records[i].status = "考核对象已自评";
            } else if (records[i].status == "SCORE_SUBJECT_SUBMIT") {
                records[i].status = "考核主体已评分";
            } else if (records[i].status == "SCORE_ADJUST_TOBE") {
                records[i].status = "已导入，待调整";
            }
            // else if (records[i].status == "SCORE_ADJUST_ADMIN") {
            //   records[i].status = "已导入，待调整";
            // }
            else if (records[i].status == "SCORE_ADJUST_CHECK") {
                records[i].status = "已调整，待确认";
            } else if (records[i].status == "SCORE_OBJECT_TOBESURE") {
                records[i].status = "已生效，待确认";
            } else if (records[i].status == "SCORE_OBJECT_APPEAL") {
                records[i].status = "考核对象已申诉";
            } else if (records[i].status == "SCORE_OBJECT_SURE") {
                records[i].status = "考核对象已确认";
            }
            if (records[i].formType == "FORM_FIXED") {
                records[i].formType = "满意度表单";
            } else if (records[i].formType == "FORM_COMMON") {
                records[i].formType = "普通表单";
            }
            // formType
            records[i].taskAllStar = Number(records[i].taskAllStar)

        }

    };
};



