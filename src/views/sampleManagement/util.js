import moment from "moment";
//手机号加密
export function formatPhone(phone) {
    return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
}
//身份证加密
export function formatIdcard(idcard) {
    return idcard.replace(/(\d{4})\d*([0-9a-zA-Z]{4})/, "$1******$2");
}
//银行卡加密
export function formatBankcard(bankcard) {
    return bankcard.replace(/^(\d{4})\d+(\d{4})$/, "$1***********$2");
}
export function filterMarital(marital) {
    switch (marital) {
        case 1:
            marital = "未婚";
            break;
        case 2:
            marital = "已婚未育";
            break;
        case 3:
            marital = "未婚已育";
            break;
        case 4:
            marital = "离异";
            break;
        default:
            marital = "其他";
    }
    return marital;
}
export function filterCompanyPeriod(companyPeriod) {
    if (companyPeriod === '-1111') {
        companyPeriod = "未知";
    } else {
        companyPeriod = companyPeriod;
    }
    return companyPeriod;
}
export function iscustomer(flag) {
    if (flag === 0) {
        flag = "新客户";
    } else {
        flag = "老客户";
    }
    return flag;
}
export function filterProType(type) {
    return type + '天产品';
}
export function isTrue(flag) {
    if (flag === 0 || flag === 'false' || flag === false) {
        flag = "否";
    } else {
        flag = '是';
    }
    return flag;
}

export function filterTelecomType(flag) {
    if (flag === 0) {
        flag = "聚信立";
    } else {
        flag = '摩羯';
    }
    return flag;
}
// 折叠面板分类
export function filterCollName(colleName) {
    switch (colleName) {
        case '1':
            colleName = "basic";
            break;
        case '2':
            colleName = "contactinfo";
            break;
        case '3':
            colleName = "daihoubang";
            break;
        case '4':
            colleName = "changdaike";
            break;
        case '5':
            colleName = "juxinli_operator_report";
            break;
        case '6':
            colleName = "ds_report";
            break;
        default:
            colleName = "basic";
    }
    return colleName;
}
export function filterinTime(flag) {
    return moment(flag).format("YYYY-MM-DD HH:MM:SS");
}

// 联系人表
export const contactColumns = [
    {
        prop: "name",
        label: "联系人姓名",
        isShow: true
    },
    {
        prop: "contact_phone",
        label: "联系人号码",
        isShow: true,
        render: function (v, param) {
            return formatPhone(param.row.contact_phone);
        }
    }
]
//紧急联系人
export const emergencyColumns = [
    {
        prop: "name",
        label: "紧急联系人姓名",
        isShow: true
    },
    {
        prop: "mobile",
        label: "紧急联系人号码",
        isShow: true,
        render: function (v, param) {
            return formatPhone(param.row.mobile);
        }
    }
]
//常贷客平台详情表
export const platformDetailsColumns = [
    {
        prop: "platformNo",
        label: "平台序号",
        // width: 150,
        isShow: true
    },
    {
        prop: "phoneTime",
        label: "手机出现日期",
        // width: 150,
        isShow: true
    },
    {
        prop: "idCardTime",
        label: "证件出现日期",
        // width: 150,
        isShow: true
    }
]
//绑定身份证情况表
export const bindidCardColumns = [
    {
        prop: "idcard_gender",
        label: "性别",
        width: 80,
        isShow: true
    },
    {
        prop: "idcard_age",
        label: "年龄",
        width: 80,
        isShow: true
    },
    {
        prop: "last_appear_idcard",
        label: "身份证最近出现时间",
        width: 150,
        isShow: true
    },
    {
        prop: "other_names_cnt",
        label: "此号码绑定其他姓名个数",
        width: 200,
        isShow: true
    },
    {
        prop: "idcard_city",
        label: "身份证户籍城市",
        width: 150,
        isShow: true
    },
    {
        prop: "other_idcard",
        label: "绑定其他身份证号码",
        width: 180,
        isShow: true
    },
    {
        prop: "idcard_region",
        label: "身份证户籍地区",
        width: 150,
        isShow: true
    },
    {
        prop: "idcard_validate",
        label: "身份证是否是有效身份证",
        isShow: true,
        render: function (v, param) {
            let html = "";
            if (param.row.idcard_validate == "1") {
                html = "是";
            } else {
                html = "否";
            }
            return html;
        }
    },
    {
        prop: "idcard_province",
        label: "身份证户籍省份",
        width: 150,
        isShow: true
    },
    {
        prop: "search_orgs_cnt",
        label: "查询此手机号的机构数",
        isShow: true
    }
]
//绑定号码情况表
export const bindMobileColumns = [
    {
        prop: "last_appear_phone",
        label: "手机号最近出现时间",
        // width: 150,
        isShow: true
    },
    {
        prop: "phone_province",
        label: "手机归属地省份",
        // width: 150,
        isShow: true
    },
    {
        prop: "phone_operator",
        label: "手机运营商",
        // width: 150,
        isShow: true
    },
    {
        prop: "other_names_cnt",
        label: "此号码绑定其他姓名个数",
        // width: 200,
        isShow: true
    },
    {
        prop: "search_orgs_cnt",
        label: "查询此手机号的机构数",
        // width: 180,
        isShow: true
    },
    {
        prop: "phone_city",
        label: "手机归属地城市",
        // width: 150,
        isShow: true
    },
    {
        prop: "other_phone",
        label: "绑定其他手机号码",
        // width: 150,
        isShow: true
    }
]
//用户行为检测数据表
export const behavior_checkColumns = [
    {
        prop: "result",
        label: "检查结果",
        isShow: true
    },
    {
        prop: "evidence",
        label: "证据",
        isShow: true
    },
    {
        prop: "check_point_cn",
        label: "分析点",
        isShow: true
    }
]
//运营商数据整理表
export const cell_behaviorColumns = [
    {
        prop: "cell_operator_zh",
        label: "运营商（中文）",
        isShow: true
    },
    {
        prop: "net_flow",
        label: "流量",
        isShow: true
    },
    {
        prop: "call_out_time",
        label: "主叫时间",
        isShow: true
    },
    {
        prop: "cell_operator",
        label: "运营商",
        isShow: true
    },
    {
        prop: "call_in_cnt",
        label: "被叫次数",
        isShow: true
    },
    {
        prop: "cell_phone_num",
        label: "号码",
        isShow: true
    },
    {
        prop: "sms_cnt",
        label: "短信数目",
        isShow: true
    },
    {
        prop: "cell_loc",
        label: "归属地",
        isShow: true
    },
    {
        prop: "total_amount",
        label: "话费消费",
        isShow: true
    },
    {
        prop: "cell_mth",
        label: "呼叫次数",
        isShow: true
    },
    {
        prop: "call_out_cnt",
        label: "主叫次数",
        isShow: true
    },
    {
        prop: "call_in_time",
        label: "被叫时间",
        isShow: true
    }
]
//联系人区域汇总表
export const contact_regionColumns = [
    {
        prop: "region_loc",
        label: "地区名称",
        isShow: true
    },
    {
        prop: "region_call_in_time_pct",
        label: "电话呼入时间百分比",
        isShow: true
        // render: function(v, param) {
        //   return param.row.region_call_in_time_pct.toFixed(2);
        // }
    },
    {
        prop: "region_call_in_time",
        label: "电话呼入时间",
        isShow: true
        // render: function(v, param) {
        //   return param.row.region_call_in_time.toFixed(2);
        // }
    },
    {
        prop: "region_call_out_time_pct",
        label: "电话呼出时间百分比",
        isShow: true
        // render: function(v, param) {
        //   return param.row.region_call_out_time_pct.toFixed(2);
        // }
    },
    {
        prop: "region_call_out_cnt_pct",
        label: "电话呼出次数百分比",
        isShow: true
        // render: function(v, param) {
        //   return param.row.region_call_out_cnt_pct.toFixed(2);
        // }
    },
    {
        prop: "region_avg_call_in_time",
        label: "平均电话呼入时间",
        isShow: true
        // render: function(v, param) {
        //   return param.row.region_avg_call_in_time.toFixed(2);
        // }
    },
    {
        prop: "region_avg_call_out_time",
        label: "平均电话呼出时间",
        isShow: true
        // render: function(v, param) {
        //   return param.row.region_avg_call_out_time.toFixed(2);
        // }
    },
    {
        prop: "region_call_in_cnt_pct",
        label: "电话呼入次数百分比",
        isShow: true
        // render: function(v, param) {
        //   return param.row.region_call_in_cnt_pct.toFixed(2);
        // }
    },
    {
        prop: "region_call_out_time",
        label: "电话呼出时间",
        isShow: true
        // render: function(v, param) {
        //   return param.row.region_call_out_time.toFixed(2);
        // }
    },
    {
        prop: "region_call_out_cnt",
        label: "电话呼出次数",
        isShow: true
    },
    {
        prop: "region_call_in_cnt",
        label: "电话呼入次数",
        isShow: true
    }
]
//运营商联系人通话详情表
export const contact_listColumns = [
    {
        prop: "contact_afternoon",
        label: "下午联系次数",
        isShow: true
    },
    {
        prop: "contact_name",
        label: "联系人姓名",
        isShow: true
    },
    {
        prop: "contact_early_morning",
        label: "凌晨联系次数",
        isShow: true
    },
    {
        prop: "call_in_len",
        label: "呼入时间",
        isShow: true,
        render: function (v, param) {
            return param.row.call_in_len.toFixed(2);
        }
    },
    {
        prop: "contact_all_day",
        label: "是否全天联系",
        isShow: true,
        render: function (v, param) {
            let html = "";
            if (param.row.idcard_validate == "1") {
                html = "是";
            } else {
                html = "否";
            }
            return html;
        }
    },
    {
        prop: "call_in_cnt",
        label: "呼入次数",
        isShow: true
    },
    {
        prop: "call_out_len",
        label: "呼出时间",
        isShow: true,
        render: function (v, param) {
            return param.row.call_out_len.toFixed(2);
        }
    },
    {
        prop: "contact_1m",
        label: "最近一月联系次数",
        isShow: true
    },
    {
        prop: "call_len",
        label: "呼叫时长",
        isShow: true,
        render: function (v, param) {
            return param.row.call_len.toFixed(2);
        }
    },
    {
        prop: "contact_3m",
        label: "最近三月联系次数",
        isShow: true
    },
    {
        prop: "phone_num_loc",
        label: "号码归属地",
        isShow: true
    },
    {
        prop: "p_relation",
        label: "关系推测",
        isShow: true
    },
    {
        prop: "call_cnt",
        label: "呼叫次数",
        isShow: true
    },
    {
        prop: "contact_1w",
        label: "最近一周联系次数",
        isShow: true
    },
    {
        prop: "contact_night",
        label: "晚上联系次数",
        isShow: true
    },
    {
        prop: "contact_noon",
        label: "中午联系次数",
        isShow: true
    },
    {
        prop: "contact_weekday",
        label: "周中联系次数",
        isShow: true
    },
    {
        prop: "call_out_cnt",
        label: "呼出次数",
        isShow: true
    },
    {
        prop: "contact_weekend",
        label: "周末联系次数",
        isShow: true
    },
    {
        prop: "phone_num",
        label: "号码",
        isShow: true
    },
    {
        prop: "contact_holiday",
        label: "节假日联系次数",
        isShow: true
    },
    {
        prop: "contact_3m_plus",
        label: "三个月以上联系次数",
        isShow: true
    },
    {
        prop: "needs_type",
        label: "需求类别",
        isShow: true
    },
    {
        prop: "contact_morning",
        label: "上午联系次数",
        isShow: true
    }
]
//常用服务表
export const main_serviceColumns = [
    {
        prop: "company_type",
        label: "服务企业类型",
        isShow: true
    },
    {
        prop: "company_name",
        label: "企业名称",
        isShow: true
    },
    {
        prop: "total_service_cnt",
        label: "总互动次数",
        isShow: true
    },
    {
        prop: "interact_mth",
        label: "互动月份",
        isShow: true
    },
    {
        prop: "interact_cnt",
        label: "互动次数",
        isShow: true
    }
]
//出行分析表
export const trip_infoColumns = [
    {
        prop: "trip_type",
        label: "出行时间类型",
        isShow: true
    },
    {
        prop: "trip_leave",
        label: "出发地",
        isShow: true
    },
    {
        prop: "trip_dest",
        label: "目的地",
        isShow: true
    },
    {
        prop: "trip_start_time",
        label: "出行开始时间",
        isShow: true
    },
    {
        prop: "trip_end_time",
        label: "出行结束时间",
        isShow: true
    }
]
//贷后上报表
export const ds_reportColumns = [
    {
        prop: "name",
        label: "姓名",
        isShow: true
    },
    {
        prop: "mobile",
        label: "手机号码",
        width: 150,
        isShow: true,
        render: function (v, param) {
            return formatPhone(param.row.mobile);
        }
    },
    {
        prop: "idcard",
        label: "身份证号",
        width: 180,
        isShow: true,
        render: function (v, param) {
            return formatIdcard(param.row.idcard);
        }
    },
    {
        prop: "order_no",
        label: "接口返回的唯一订单号",
        width: 180,
        isShow: true
    },
    {
        prop: "extension_periods",
        label: "展期期数",
        isShow: true
    },
    {
        prop: "orderno",
        label: "订单号",
        width: 180,
        isShow: true
    },
    {
        prop: "overdue_day",
        label: "逾期天数",
        isShow: true
    },
    {
        prop: "settle",
        label: "是否已经结清",
        isShow: true
    },
    {
        prop: "ins_time",
        label: "入库时间",
        width: 180,
        isShow: true,
        render: function (v, param) {
            return moment(param.row.ins_time).format("YYYY-MM-DD HH:MM:SS");
        }
    },
    {
        prop: "extension_time",
        label: "发生展期时间（秒）",
        isShow: true
    },
    {
        prop: "unpay",
        label: "未还款金额(分)",
        isShow: true
    },
    {
        prop: "report_time",
        label: "上报的时间",
        width: 180,
        isShow: true
    },
    {
        prop: "extension_pay_due_time",
        label: "展期后应还日期",
        isShow: true
    },
    {
        prop: "pay_finish_time",
        label: "实际还款时间",
        isShow: true
    },
    {
        prop: "pay_due_time",
        label: "应还款时间",
        width: 180,
        isShow: true
    },
    {
        prop: "is_extension",
        label: "是否展期",
        isShow: true
    },
    {
        prop: "payed",
        label: "已经还款金额（分）",
        isShow: true
    },
    {
        prop: "loan_time",
        label: "放款日期",
        width: 180,
        isShow: true
    }
]