import moment from "moment";

// tab切换分类
export function tabType(tab) {
    switch (tab) {
        case '1':
            tab = "chart";
            break;
        default:
            tab = "table";
    }
    return tab;
}
// 按月、年tab切换
export function tabType2(tab) {
    switch (tab) {
        case '1':
            tab = "month";
            break;
        default:
            tab = "year";
    }
    return tab;
}
// 特征分箱结果排序
export function sortBucket(list) {
    const age = []; //年龄
    const amount_max = []; //借款金额
    const record_phone_days = [];//手机号记录天数
    const record_idcard_days = [];//身份证号记录天数
    const sn_order2_blacklist_routers_cnt = [];//认识间接黑人的直接联系人个数
    const sn_order2_blacklist_contacts_cnt = [];//间接联系人在黑名单中数量(间接黑人)
    const sn_order1_blacklist_contacts_cnt = [];//直接联系人在黑名单中数量(直接黑人)
    const sn_order1_contacts_cnt = [];//直接联系人
    const sn_order2_blacklist_routers_pct = [];//认识间接黑人的直接联系人比例
    const sn_score = [];//葫芦分
    const offline_cash_loan_cnt = [];//线下现金贷出现次数
    const online_cash_loan_cnt = [];//线上现金贷出现次数
    const online_installment_cnt = [];//线上消费分期出现次数
    const payday_loan_cnt = [];//小额快速贷出现次数
    const others_cnt = [];//    其他
    const search_cnt_recent_180_days = [];//最近180天查询次数
    const org_cnt_recent_180_days = [];//最近180天查询机构数
    const search_cnt_recent_7_days = [];//最近7天查询次数
    const search_cnt_recent_90_days = [];//最近90天查询次数
    const org_cnt_recent_60_days = [];////最近60天查询机构数
    const search_cnt_recent_30_days = [];//最近30天查询次数
    const search_cnt_recent_14_days = [];//最近14天查询次数
    const org_cnt_recent_14_days = [];//最近14天查询机构数
    const org_cnt_recent_30_days = [];//最近30天查询机构数
    const org_cnt_recent_7_days = [];//最近7天查询机构数
    const org_cnt_recent_90_days = [];//最近90天查询机构数
    const org_cnt = [];//历史查询总机构数
    const search_cnt_recent_60_days = [];//最近60天查询次数
    const search_cnt = [];//历史查询总次数
    const idcardmptimestype = [];//证件查询次数级别
    const phonemptimestype = [];//手机查询次数级别
    const recent_6m_avg_call_cnt = [];//近6个月月均呼叫次数
    const recent_6m_avg_call_out_time = [];//近6个月月均主叫时间
    const recent_6m_avg_call_in_cnt = [];//近6个月月均被叫次数
    const recent_6m_avg_call_in_time = [];//近6个月月均被叫时间
    const recent_6m_avg_net_flow = [];//近6个月月均流量
    const recent_6m_avg_sms_cnt = [];//近6个月月均短信数目
    const recent_6m_avg_total_amount = [];//
    const searched_org_cnt = [];//查询过该用户的相关企业数量
    const phone_gray_score = [];//用户号码联系黑中介分数
    const contacts_class2_blacklist_cnt = [];//间接联系人中黑名单人数
    const contacts_class1_cnt = [];//直接联系人人数
    const contacts_router_cnt = [];//引起间接黑名单人数
    const contacts_router_ratio = [];//直接联系人中引起间接黑名单占比
    const top1_call_len_call_cnt = [];//近六个月通话时长TOP1通话次数
    const recent_6m_avg_call_out_cnt = [];//近6个月月均主叫次数
    const top1_call_len_ = [];//近六个月通话时长TOP1
    const top1_call_len_call_out_cnt = [];//近六个月通话时长TOP1呼出次数
    const top1_call_len_call_out_len = [];//近六个月通话时长TOP1呼出时间
    const top1_call_len_call_in_cnt = [];//近六个月通话时长TOP1呼入次数
    const top1_call_len_call_in_len = [];//近六个月通话时长TOP1呼入时间
    const top2_call_len_call_cnt = [];//近六个月通话时长TOP2通话次数
    const top2_call_len_ = [];//近六个月通话时长TOP2
    const top2_call_len_call_out_cnt = [];//近六个月通话时长TOP2呼出次数
    const top2_call_len_call_out_len = [];//近六个月通话时长TOP2呼出时间
    const top2_call_len_call_in_cnt = [];//近六个月通话时长TOP2呼入次数
    const top2_call_len_call_in_len = [];//近六个月通话时长TOP2呼入时间
    const top3_call_len_call_cnt = [];//近六个月通话时长TOP3通话次数
    const top3_call_len_ = [];//近六个月通话时长TOP3
    const top3_call_len_call_out_cnt = [];//近六个月通话时长TOP3呼出次数
    const top3_call_len_call_out_len = [];//近六个月通话时长TOP3呼出时间
    const top3_call_len_call_in_cnt = [];//近六个月通话时长TOP3呼入次数
    const top3_call_len_call_in_len = [];//近六个月通话时长TOP3呼入时间
    const other = [];
    list.forEach((item, index) => {
        if (item.featureField === "age") {
            age.push(item);
        } else if (item.featureField === "amount_max") {
            amount_max.push(item);
        } else if (item.featureField === "record_phone_days") {
            record_phone_days.push(item);
        } else if (item.featureField === "record_idcard_days") {
            record_idcard_days.push(item);
        } else if (item.featureField === "sn_order2_blacklist_routers_cnt") {
            sn_order2_blacklist_routers_cnt.push(item);
        } else if (item.featureField === "sn_order2_blacklist_contacts_cnt") {
            sn_order2_blacklist_contacts_cnt.push(item);
        } else if (item.featureField === "sn_order1_blacklist_contacts_cnt") {
            sn_order1_blacklist_contacts_cnt.push(item);
        } else if (item.featureField === "sn_order1_contacts_cnt") {
            sn_order1_contacts_cnt.push(item);
        } else if (item.featureField === "sn_order2_blacklist_routers_pct") {
            sn_order2_blacklist_routers_pct.push(item);
        } else if (item.featureField === "sn_score") {
            sn_score.push(item);
        } else if (item.featureField === "offline_cash_loan_cnt") {
            offline_cash_loan_cnt.push(item);
        } else if (item.featureField === "online_cash_loan_cnt") {
            online_cash_loan_cnt.push(item);
        } else if (item.featureField === "online_installment_cnt") {
            online_installment_cnt.push(item);
        } else if (item.featureField === "payday_loan_cnt") {
            payday_loan_cnt.push(item);
        } else if (item.featureField === "others_cnt") {
            others_cnt.push(item);
        } else if (item.featureField === "org_cnt_recent_180_days") {
            org_cnt_recent_180_days.push(item);
        } else if (item.featureField === "search_cnt_recent_180_days") {
            search_cnt_recent_180_days.push(item);
        } else if (item.featureField === "search_cnt_recent_7_days") {
            search_cnt_recent_7_days.push(item);
        } else if (item.featureField === "search_cnt_recent_90_days") {
            search_cnt_recent_90_days.push(item);
        } else if (item.featureField === "org_cnt_recent_60_days") {
            org_cnt_recent_60_days.push(item);
        } else if (item.featureField === "search_cnt_recent_30_days") {
            search_cnt_recent_30_days.push(item);
        } else if (item.featureField === "search_cnt_recent_14_days") {
            search_cnt_recent_14_days.push(item);
        } else if (item.featureField === "org_cnt_recent_14_days") {
            org_cnt_recent_14_days.push(item);
        } else if (item.featureField === "org_cnt_recent_30_days") {
            org_cnt_recent_30_days.push(item);
        } else if (item.featureField === "org_cnt_recent_7_days") {
            org_cnt_recent_7_days.push(item);
        } else if (item.featureField === "org_cnt_recent_90_days") {
            org_cnt_recent_90_days.push(item);
        } else if (item.featureField === "org_cnt") {
            org_cnt.push(item);
        } else if (item.featureField === "search_cnt_recent_60_days") {
            search_cnt_recent_60_days.push(item);
        } else if (item.featureField === "search_cnt") {
            search_cnt.push(item);
        } else if (item.featureField === "idcardmptimestype") {
            idcardmptimestype.push(item);
        } else if (item.featureField === "phonemptimestype") {
            phonemptimestype.push(item);
        } else if (item.featureField === "recent_6m_avg_call_cnt") {
            recent_6m_avg_call_cnt.push(item);
        } else if (item.featureField === "recent_6m_avg_call_out_time") {
            recent_6m_avg_call_out_time.push(item);
        } else if (item.featureField === "recent_6m_avg_call_in_cnt") {
            recent_6m_avg_call_in_cnt.push(item);
        } else if (item.featureField === "recent_6m_avg_call_in_time") {
            recent_6m_avg_call_in_time.push(item);
        } else if (item.featureField === "recent_6m_avg_net_flow") {
            recent_6m_avg_net_flow.push(item);
        } else if (item.featureField === "recent_6m_avg_sms_cnt") {
            recent_6m_avg_sms_cnt.push(item);
        } else if (item.featureField === "recent_6m_avg_total_amount") {
            recent_6m_avg_total_amount.push(item);
        } else if (item.featureField === "searched_org_cnt") {
            searched_org_cnt.push(item);
        } else if (item.featureField === "phone_gray_score") {
            phone_gray_score.push(item);
        } else if (item.featureField === "contacts_class2_blacklist_cnt") {
            contacts_class2_blacklist_cnt.push(item);
        } else if (item.featureField === "contacts_class1_cnt") {
            contacts_class1_cnt.push(item);
        } else if (item.featureField === "contacts_router_cnt") {
            contacts_router_cnt.push(item);
        } else if (item.featureField === "contacts_router_ratio") {
            contacts_router_ratio.push(item);
        } else if (item.featureField === "top1_call_len_call_cnt") {
            top1_call_len_call_cnt.push(item);
        } else if (item.featureField === "recent_6m_avg_call_out_cnt") {
            recent_6m_avg_call_out_cnt.push(item);
        } else if (item.featureField === "top1_call_len_") {
            top1_call_len_.push(item);
        } else if (item.featureField === "top1_call_len_call_out_cnt") {
            top1_call_len_call_out_cnt.push(item);
        } else if (item.featureField === "top1_call_len_call_out_len") {
            top1_call_len_call_out_len.push(item);
        } else if (item.featureField === "top1_call_len_call_in_cnt") {
            top1_call_len_call_in_cnt.push(item);
        } else if (item.featureField === "top1_call_len_call_in_len") {
            top1_call_len_call_in_len.push(item);
        } else if (item.featureField === "top2_call_len_call_cnt") {
            top2_call_len_call_cnt.push(item);
        } else if (item.featureField === "top2_call_len_") {
            top2_call_len_.push(item);
        } else if (item.featureField === "top2_call_len_call_out_cnt") {
            top2_call_len_call_out_cnt.push(item);
        } else if (item.featureField === "top2_call_len_call_out_len") {
            top2_call_len_call_out_len.push(item);
        } else if (item.featureField === "top2_call_len_call_in_cnt") {
            top2_call_len_call_in_cnt.push(item);
        } else if (item.featureField === "top2_call_len_call_in_len") {
            top2_call_len_call_in_len.push(item);
        } else if (item.featureField === "top3_call_len_call_cnt") {
            top3_call_len_call_cnt.push(item);
        } else if (item.featureField === "top3_call_len_") {
            top3_call_len_.push(item);
        } else if (item.featureField === "top3_call_len_call_out_cnt") {
            top3_call_len_call_out_cnt.push(item);
        } else if (item.featureField === "top3_call_len_call_out_len") {
            top3_call_len_call_out_len.push(item);
        } else if (item.featureField === "top3_call_len_call_in_cnt") {
            top3_call_len_call_in_cnt.push(item);
        } else if (item.featureField === "top3_call_len_call_in_len") {
            top3_call_len_call_in_len.push(item);
        }
        else {
            other.push(item);
        }
    });
    age.sort(compare("bucket"));
    amount_max.sort(compare("bucket"));
    record_phone_days.sort(compare("bucket"));
    record_idcard_days.sort(compare("bucket"));
    sn_order2_blacklist_routers_cnt.sort(compare("bucket"));
    sn_order2_blacklist_contacts_cnt.sort(compare("bucket"));
    sn_order1_blacklist_contacts_cnt.sort(compare("bucket"));
    sn_order1_contacts_cnt.sort(compare("bucket"));
    sn_order2_blacklist_routers_pct.sort(compare("bucket"));
    sn_score.sort(compare("bucket"));
    offline_cash_loan_cnt.sort(compare("bucket"));
    online_cash_loan_cnt.sort(compare("bucket"));
    online_installment_cnt.sort(compare("bucket"));
    payday_loan_cnt.sort(compare("bucket"));
    others_cnt.sort(compare("bucket"));
    org_cnt_recent_180_days.sort(compare("bucket"));
    search_cnt_recent_180_days.sort(compare("bucket"));
    search_cnt_recent_7_days.sort(compare("bucket"));
    search_cnt_recent_90_days.sort(compare("bucket"));
    org_cnt_recent_60_days.sort(compare("bucket"));
    search_cnt_recent_30_days.sort(compare("bucket"));
    search_cnt_recent_14_days.sort(compare("bucket"));
    org_cnt_recent_14_days.sort(compare("bucket"));
    org_cnt_recent_30_days.sort(compare("bucket"));
    org_cnt_recent_7_days.sort(compare("bucket"));
    org_cnt_recent_90_days.sort(compare("bucket"));
    org_cnt.sort(compare("bucket"));
    search_cnt_recent_60_days.sort(compare("bucket"));
    search_cnt.sort(compare("bucket"));
    idcardmptimestype.sort(compare("bucket"));
    phonemptimestype.sort(compare("bucket"));
    recent_6m_avg_call_cnt.sort(compare("bucket"));
    recent_6m_avg_call_out_time.sort(compare("bucket"));
    recent_6m_avg_call_in_cnt.sort(compare("bucket"));
    recent_6m_avg_call_in_time.sort(compare("bucket"));
    recent_6m_avg_net_flow.sort(compare("bucket"));
    recent_6m_avg_sms_cnt.sort(compare("bucket"));
    recent_6m_avg_total_amount.sort(compare("bucket"));
    searched_org_cnt.sort(compare("bucket"));
    phone_gray_score.sort(compare("bucket"));
    contacts_class2_blacklist_cnt.sort(compare("bucket"));
    contacts_class1_cnt.sort(compare("bucket"));
    contacts_router_cnt.sort(compare("bucket"));
    contacts_router_ratio.sort(compare("bucket"));
    top1_call_len_call_cnt.sort(compare("bucket"));
    recent_6m_avg_call_out_cnt.sort(compare("bucket"));
    top1_call_len_.sort(compare("bucket"));
    top1_call_len_call_out_cnt.sort(compare("bucket"));
    top1_call_len_call_out_len.sort(compare("bucket"));
    top1_call_len_call_in_cnt.sort(compare("bucket"));
    top1_call_len_call_in_len.sort(compare("bucket"));
    top2_call_len_call_cnt.sort(compare("bucket"));
    top2_call_len_.sort(compare("bucket"));
    top2_call_len_call_out_cnt.sort(compare("bucket"));
    top2_call_len_call_out_len.sort(compare("bucket"));
    top2_call_len_call_in_cnt.sort(compare("bucket"));
    top2_call_len_call_in_len.sort(compare("bucket"));
    top3_call_len_call_cnt.sort(compare("bucket"));
    top3_call_len_.sort(compare("bucket"));
    top3_call_len_call_out_cnt.sort(compare("bucket"));
    top3_call_len_call_out_len.sort(compare("bucket"));
    top3_call_len_call_in_cnt.sort(compare("bucket"));
    top3_call_len_call_in_len.sort(compare("bucket"));
    return age.concat(amount_max.concat(record_phone_days.concat(record_idcard_days.concat(sn_order2_blacklist_routers_cnt.concat(
        sn_order2_blacklist_contacts_cnt.concat(sn_order1_blacklist_contacts_cnt.concat(sn_order1_contacts_cnt.concat(
            sn_order2_blacklist_routers_pct.concat(sn_score.concat(offline_cash_loan_cnt.concat(online_cash_loan_cnt.concat(
                online_installment_cnt.concat(payday_loan_cnt.concat(others_cnt.concat(org_cnt_recent_180_days.concat(
                    search_cnt_recent_180_days.concat(search_cnt_recent_7_days.concat(search_cnt_recent_90_days.concat(
                        org_cnt_recent_60_days.concat(search_cnt_recent_30_days.concat(search_cnt_recent_14_days.concat(
                            org_cnt_recent_14_days.concat(org_cnt_recent_30_days.concat(org_cnt_recent_7_days.concat(
                                org_cnt_recent_90_days.concat(org_cnt.concat(search_cnt_recent_60_days.concat(
                                    search_cnt.concat(idcardmptimestype.concat(phonemptimestype.concat(recent_6m_avg_call_cnt.concat(
                                        recent_6m_avg_call_out_time.concat(recent_6m_avg_call_in_cnt.concat(recent_6m_avg_call_in_time.concat(recent_6m_avg_sms_cnt.concat(
                                            recent_6m_avg_total_amount.concat(searched_org_cnt.concat(phone_gray_score.concat(contacts_class2_blacklist_cnt.concat(
                                                contacts_class1_cnt.concat(contacts_router_cnt.concat(contacts_router_ratio.concat(top1_call_len_call_cnt.concat(recent_6m_avg_net_flow.concat(
                                                    recent_6m_avg_call_out_cnt.concat(top1_call_len_.concat(top1_call_len_call_out_cnt.concat(top1_call_len_call_out_len.concat(
                                                        top1_call_len_call_in_cnt.concat(top1_call_len_call_in_len.concat(top2_call_len_call_cnt.concat(top2_call_len_.concat(
                                                            top2_call_len_call_out_cnt.concat(top2_call_len_call_out_len.concat(top2_call_len_call_in_cnt.concat(top2_call_len_call_in_len.concat(top3_call_len_call_cnt.concat(
                                                                top3_call_len_.concat(top3_call_len_call_out_cnt.concat(top3_call_len_call_out_len.concat(top3_call_len_call_in_cnt.concat(top3_call_len_call_in_len.concat(other)))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
}
function getNumber(val) {
    let lists;
    if (val.indexOf("-") != -1) {
        lists = val.split("-");
    } else if (val.indexOf("<=") != -1) {
        lists = val.split("<=");
    } else if (val.indexOf(">") != -1) {
        lists = val.split(">");
    } else {
        lists = [val];
    }
    let num = "";
    let number = ""
    for (let i = 0; i < lists.length; i++) {
        if (lists[i] !== '缺失') {
            if (lists[i] <= 1) {
                number = lists[1] //直接比较后面的数
            } else {
                num += Math.round(lists[i]) + ".";
                number = num.slice(0, num.length - 1);
                if (number.substr(0, 1) == "0") {
                    number = number.substr(2); //删除第一个字符‘0.’
                }
            }
        } else {
        }
    }
    // console.log(number)
    return number;
}
function compare(property) {
    return (a, b) => {
        let value1 = a[property];
        let value2 = b[property];
        return getNumber(value1) - getNumber(value2);
    };
}
