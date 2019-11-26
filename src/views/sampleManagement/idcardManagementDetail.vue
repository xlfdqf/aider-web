<!-- 身份证详情页面-->
<template>
 <div class="table">
   <el-card class="box-card" style="margin-bottom:40px;height:138px;">
      <h4 style="text-align:center;color:#7ECBE0;margin-top:40px;"><span style="margin-right:30px">用户姓名：{{username}}</span> <span>身份证号:{{idcard | formatIdcard}}</span></h4>
   </el-card>

   <el-card  class="box-card2">
     <div class="box" style="height:600px;overflow-y:auto;margin-left:10px;">
       <el-collapse v-model="activeNames"  @change="handleChange">
          <el-collapse-item title="基本信息" name="1" v-for="item in basic" :key="item.mobile">
            <template slot="title">
               基本信息 
            </template>
            <el-row>
                <el-col :span="6"><div class="blod">手机号:{{item.mobile | formatPhone}}</div></el-col>
                <el-col :span="6"><div class="blod">借款金额:{{item.amount_max}}</div></el-col>
                <el-col :span="6"><div class="blod">银行卡号:{{item.bank_no | formatBankcard}}</div></el-col>
                <el-col :span="6"><div class="blod">民族:{{item.race}}</div></el-col>
                <el-col :span="6"><div class="blod">工作时长:{{item.company_period | filterCompanyPeriod}}</div></el-col>
                <el-col :span="6"><div class="blod">是否新客户:{{item.customer_type | iscustomer}}</div></el-col>
                <el-col :span="6"><div class="blod">借款发生时间:{{item.date}}</div></el-col>
                <el-col :span="6"><div class="blod">婚姻状况:{{item.marital_status | filterMarital}}</div></el-col>
                <el-col :span="6"><div class="blod">居住地:{{item.location}}</div></el-col>
                <el-col :span="6"><div class="blod">居住时长:{{item.present_period | filterCompanyPeriod}}</div></el-col>
                <el-col :span="6"><div class="blod">产品编号:{{item.product_id}}</div></el-col>
                <el-col :span="6"><div class="blod">产品类型:{{item.product_type | filterProType}}</div></el-col>
                <el-col :span="6"><div class="blod">是否为推广渠道:{{item.promotion_channel | isTrue}}</div></el-col>
                <!-- <el-col :span="6"><div class="blod">运营商类型:{{item.telecom_type | filterTelecomType}}</div></el-col> -->
                <el-col :span="6"><div class="blod">入库时间:{{item.ins_time | filterinTime}}</div></el-col>
            </el-row>
          </el-collapse-item>

        <el-collapse-item title="贷后邦" name="3" v-for="item in daihoubang" :key="item.name">
            <template slot="title">
               贷后邦<span style="margin-left:20px;padding:5px;background-color:#08284E;border-radius:5px;" v-if="daihoubangSource">来源：{{daihoubangSource}}</span>
            </template>
             <el-row> 
               <el-col :span="6"><div class="blod">身份证号码:{{item.idcard}}</div></el-col>
                <el-col :span="6"><div class="blod">姓名:{{item.name}}</div></el-col>
                <el-col :span="6"><div class="blod">性别:{{item.gender}}</div></el-col>
                <el-col :span="6"><div class="blod">年龄:{{item.age}}</div></el-col>
                <el-col :span="6"><div class="blod">查询人手机号:{{item.mobile}}</div></el-col>
                <el-col :span="6"><div class="blod">手机号最近出现时间:{{item.last_appear_phone}}</div></el-col>
                <el-col :span="6"><div class="blod">生日日期:{{item.birthday}}</div></el-col>
                <!-- <el-col :span="6"><div class="blod">手机运营商:{{item.phone_operator}}</div></el-col> -->
                <el-col :span="6"><div class="blod">身份证最近出现时间:{{item.last_appear_idcard}}</div></el-col>
                <el-col :span="6"><div class="blod">手机号记录天数:{{item.record_phone_days}}</div></el-col>
                <el-col :span="6"><div class="blod">身份证户籍城市:{{item.idcard_city}}</div></el-col>
                <el-col :span="6"><div class="blod">身份证户籍地区:{{item.idcard_region}}</div></el-col>
                <el-col :span="6"><div class="blod">关联手机号数量:{{item.used_phones_cnt}}</div></el-col>
           
                <el-col :span="6"><div class="blod">身份证户籍省份:{{item.idcard_province}}</div></el-col>
                <el-col :span="6"><div class="blod">手机归属地省份:{{item.phone_province}}</div></el-col>
                <el-col :span="6"><div class="blod">身份证是否是有效身份证:{{item.idcard_validate}}</div></el-col>
                <el-col :span="6"><div class="blod">关联身份证数量:{{item.used_idcards_cnt}}</div></el-col>
                <el-col :span="6"><div class="blod">手机归属地城市:{{item.phone_city}}</div></el-col>
                <el-col :span="6"><div class="blod">身份证号记录天数:{{item.record_idcard_days}}</div></el-col>
                <el-col :span="6"><div class="blod">认识间接黑人的直接联系人个数:{{item.sn_order2_blacklist_routers_cnt}}</div></el-col>
                <el-col :span="6"><div class="blod">间接联系人在黑名单中数量(间接黑人):{{item.sn_order2_blacklist_contacts_cnt}}</div></el-col>
                <el-col :span="6"><div class="blod">直接联系人在黑名单中数量(直接黑人):{{item.sn_order1_blacklist_contacts_cnt}}</div></el-col>
                <el-col :span="6"><div class="blod">直接联系人:{{item.sn_order1_contacts_cnt}}</div></el-col>
                <el-col :span="6"><div class="blod">认识间接黑人的直接联系人比例:{{item.sn_order2_blacklist_routers_pct}}</div></el-col>
                <el-col :span="6"><div class="blod">葫芦分:{{item.sn_score}}</div></el-col>
                <el-col :span="6"><div class="blod">最近该身份证出现在黑名单中时间:{{item.last_appear_idcard_in_blacklist}}</div></el-col>
                <el-col :span="6"><div class="blod">是否命中法院黑名单:{{item.in_court_blacklist | isTrue}}</div></el-col>
                <el-col :span="6"><div class="blod">是否命中网贷黑名单:{{item.in_p2p_blacklist | isTrue}}</div></el-col>
                <el-col :span="6"><div class="blod">身份证是否命中黑名单:{{item.idcard_in_blacklist | isTrue}}</div></el-col>
                <el-col :span="6"><div class="blod">手机号是否命中黑名单:{{item.phone_in_blacklist | isTrue}}</div></el-col>
                <el-col :span="6"><div class="blod">是否命中银行黑名单:{{item.in_bank_blacklist | isTrue}}</div></el-col>
         
                <el-col :span="6"><div class="blod">最近该手机号出现在黑名单中时间:{{item.last_appear_phone_in_blacklist}}</div></el-col>
                <el-col :span="6"><div class="blod">线下现金贷出现次数:{{item.offline_cash_loan_cnt}}</div></el-col>
                <el-col :span="6"><div class="blod">线上现金贷出现次数:{{item.online_cash_loan_cnt}}</div></el-col>
                <el-col :span="6"><div class="blod">线上消费分期出现次数:{{item.online_installment_cnt}}</div></el-col>
                <el-col :span="6"><div class="blod">小额快速贷出现次数:{{item.payday_loan_cnt}}</div></el-col>     
                <el-col :span="6"><div class="blod">信用卡代还出现次数:{{item.credit_card_repayment_cnt}}</div></el-col>
                <el-col :span="6"><div class="blod">线下消费分期出现次数:{{item.offline_installment_cnt}}</div></el-col>
                <el-col :span="6"><div class="blod">其他:{{item.others_cnt}}</div></el-col>
                <el-col :span="6"><div class="blod">最近180天查询次数:{{item.search_cnt_recent_180_days}}</div></el-col>
                <el-col :span="6"><div class="blod">最近7天查询次数:{{item.search_cnt_recent_7_days}}</div></el-col>
                <el-col :span="6"><div class="blod">最近180天查询机构数:{{item.org_cnt_recent_180_days}}</div></el-col>
                <el-col :span="6"><div class="blod">最近90天查询次数:{{item.search_cnt_recent_90_days}}</div></el-col>
                <el-col :span="6"><div class="blod">最近60天查询机构数:{{item.org_cnt_recent_60_day}}</div></el-col>
                <el-col :span="6"><div class="blod">最近30天查询次数:{{item.search_cnt_recent_30_days}}</div></el-col>
                <el-col :span="6"><div class="blod">最近14天查询次数:{{item.search_cnt_recent_14_days}}</div></el-col>
                <el-col :span="6"><div class="blod">最近14天查询机构数:{{item.org_cnt_recent_14_days}}</div></el-col>
                <el-col :span="6"><div class="blod">最近30天查询机构数:{{item.org_cnt_recent_30_days}}</div></el-col>
                <el-col :span="6"><div class="blod">最近7天查询机构数:{{item.org_cnt_recent_7_days}}</div></el-col>
                <el-col :span="6"><div class="blod">最近90天查询机构数:{{item.org_cnt_recent_90_days}}</div></el-col>
                <el-col :span="6"><div class="blod">最近60天查询次数:{{item.search_cnt_recent_60_days}}</div></el-col>
                <el-col :span="6"><div class="blod">历史查询总机构数:{{item.org_cnt}}</div></el-col>
                <el-col :span="6"><div class="blod">入库时间:{{item.ins_time | filterinTime}}</div></el-col> 
                <el-col :span="24"><div class="blod">绑定身份证情况:
                    <myTable :columns="bindidCardColumns" :dataSource="bindidCardTable" :hasIndex="false" 
                     :hasSelection="false" :hasPagination="false"> </myTable>
                   </div>
                </el-col> 
                <el-col :span="24"><div class="blod">绑定手机号码情况:
                     <myTable :columns="bindMobileColumns" :dataSource="bindMobileTable" :hasIndex="false" 
                        :hasSelection="false" :hasPagination="false"  style="margin-top:20px"> </myTable>
                   </div>
                </el-col>
             </el-row> 
           </el-collapse-item>  
     

       <el-collapse-item title="常贷客" name="4" v-for="item in changdaike" :key="item.idcard">
            <template slot="title">
               常贷客<span style="margin-left:20px;padding:5px;background-color:#08284E;border-radius:5px;" v-if="changdaikeSource">来源：{{changdaikeSource}}</span>
            </template>
             <el-row>
                <el-col :span="6"><div class="blod">证件最近出现日期:{{item.idCardEndTime}}</div></el-col>
                <el-col :span="6"><div class="blod">证件最早出现日期:{{item.idCardFirstTime}}</div></el-col>
                <el-col :span="6"><div class="blod">证件查询平台数:{{item.idCardMpTimesRange}}</div></el-col>
                <el-col :span="6"><div class="blod">证件查询次数级别:{{item.idCardMpTimesType}}</div></el-col>
                <el-col :span="6"><div class="blod">证件1个月内查询平台数:{{item.lastAMonthIdCardApplicationTimeRange}}</div></el-col>
                <el-col :span="6"><div class="blod">证件1个月内查询次数级别:{{item.lastAMonthIdCardApplicationTimeType}}</div></el-col>
                <el-col :span="6"><div class="blod">手机1个月内查询平台数:{{item.lastAMonthPhoneApplicationTimeRange}}</div></el-col>
                <el-col :span="6"><div class="blod">手机1个月内查询次数级别:{{item.lastAMonthPhoneApplicationTimeType}}</div></el-col>
                <el-col :span="6"><div class="blod">证件15天内查询平台数:{{item.lastFifteenDayIdCardApplicationTimeRange}}</div></el-col>
                <el-col :span="6"><div class="blod">证件15天内查询次数级别:{{item.lastFifteenDayIdCardApplicationTimeType}}</div></el-col>
                <el-col :span="6"><div class="blod">手机15天内查询平台数:{{item.lastFifteenDayPhoneApplicationTimeRange}}</div></el-col>
                <el-col :span="6"><div class="blod">手机15天内查询次数级别:{{item.lastFifteenDayPhoneApplicationTimeType}}</div></el-col>
                <el-col :span="6"><div class="blod">证件7天内查询平台数:{{item.lastSevenDayIdCardApplicationTimeRange}}</div></el-col>
                <el-col :span="6"><div class="blod">证件7天内查询次数级别:{{item.lastSevenDayIdCardApplicationTimeType}}</div></el-col>
                <el-col :span="6"><div class="blod">手机7天内查询平台数:{{item.lastSevenDayPhoneApplicationTimeRange}}</div></el-col>
                <el-col :span="6"><div class="blod">手机7天内查询次数级别:{{item.lastSevenDayPhoneApplicationTimeType}}</div></el-col>
                <el-col :span="6"><div class="blod">证件3天内查平台数:{{item.lastThreeDayIdCardApplicationTimeRange}}</div></el-col>
                <el-col :span="6"><div class="blod">证件3天内查询次数级别:{{item.lastThreeDayIdCardApplicationTimeType}}</div></el-col>
                <el-col :span="6"><div class="blod">手机3天内查询平台数:{{item.lastThreeDayPhoneApplicationTimeRange}}</div></el-col>
                <el-col :span="6"><div class="blod">手机3天内查询次数级别:{{item.lastThreeDayPhoneApplicationTimeType}}</div></el-col>
                <el-col :span="6"><div class="blod">证件3个月内平台数:{{item.lastThreeMonthIdCardApplicationTimeType}}</div></el-col>
                <el-col :span="6"><div class="blod">手机3个月内查询平台数:{{item.lastThreeMonthPhoneApplicationTimeRange}}</div></el-col>
                <el-col :span="6"><div class="blod">手机3个月内查询次数级别:{{item.lastThreeMonthPhoneApplicationTimeType}}</div></el-col>
                <el-col :span="6"><div class="blod">证件2个月内查询平台数:{{item.lastTwoMonthIdCardApplicationTimeRange}}</div></el-col>
                <el-col :span="6"><div class="blod">证件2个月内查询次数级别:{{item.lastTwoMonthIdCardApplicationTimeType}}</div></el-col>
                <el-col :span="6"><div class="blod">手机2个月内查询平台数:{{item.lastTwoMonthPhoneApplicationTimeRange}}</div></el-col>
                <el-col :span="6"><div class="blod">手机2个月内查询次数级别:{{item.lastTwoMonthPhoneApplicationTimeType}}</div></el-col>
                <el-col :span="6"><div class="blod">手机最近出现日期:{{item.phoneEndTime}}</div></el-col>
                <el-col :span="6"><div class="blod">手机最早出现日期:{{item.phoneFirstTime}}</div></el-col>
                <el-col :span="6"><div class="blod">手机查询平台数:{{item.phoneMpTimesRange}}</div></el-col>
                <el-col :span="6"><div class="blod">手机查询次数级别:{{item.phoneMpTimesType}}</div></el-col>
                <!-- <el-col :span="6"><div class="blod">平台详情:{{item.platformDetails}}</div></el-col> -->
                <el-col :span="6"><div class="blod">证件当日查询平台数:{{item.todayIdCardApplicationTimeRange}}</div></el-col>
                <el-col :span="6"><div class="blod">证件当日查询次数级别:{{item.todayIdCardApplicationTimeType}}</div></el-col>
                <el-col :span="6"><div class="blod">手机当日查询平台数:{{item.todayPhoneApplicationTimeRange}}</div></el-col>
               <el-col :span="24"><div class="blod">平台详情: 
                 <myTable :columns="platformDetailsColumns" :dataSource="platformDetails" :hasIndex="false" 
                  :hasSelection="false" :hasPagination="false"> </myTable></div>
                </el-col>
            </el-row>
       </el-collapse-item>

       <!-- <el-collapse-item title="聚信立分析报告" name="5"  element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" 
         element-loading-background="rgba(9, 25, 56, 0.8)" v-loading="loading">
            <template slot="title">
               聚信立分析报告<span style="margin-left:20px;padding:5px;background-color:#08284E;border-radius:5px;" v-if="juxinliSource">来源：{{juxinliSource}}</span>
            </template>
            <div class="jxlreport" v-for="item in report" :key="item.token">
              <h4 style="text-align:center">报告基本信息</h4>
              <el-row>
                  <el-col :span="8"><div class="blod">报告编号:{{item.rpt_id}}</div></el-col>
                  <el-col :span="8"><div class="blod">报告版本:{{item.version}}</div></el-col>
                  <el-col :span="8"><div class="blod">报告生成时间:{{item.update_time|filterinTime}}</div></el-col>
              </el-row>
             </div>

            <div  class="jxlreport">
              <h4 style="text-align:center">用户申请表检测</h4>
              <el-row>
                  <el-col :span="12"><div class="blod tit">姓名：{{username}}</div></el-col>
                  <el-col :span="12"><div class="blod">身份证号{{idcard | formatIdcard}}</div></el-col>
                  <el-col :span="12"><div class="blod">{{id_card.gender}}/{{id_card.age}}/出生地：{{id_card.province}}{{id_card.city}}{{id_card.region}}</div></el-col>
                  <el-col :span="12"><div class="blod">姓名+身份证出现在法院黑名单:{{court_blacklist.black_type}}</div></el-col>
                  <el-col :span="12"><div class="blod">姓名+身份证出现在金融服务类机构黑名单:{{financial_blacklist.black_type}}</div></el-col>
                  <el-col :span="24"><div class="blod tit">手机号码:{{cell_phone.key_value}}</div></el-col>
                  <el-col :span="12"><div class="blod">{{cell_phone.website}},{{cell_phone.reliability}},注册时间:{{cell_phone.reg_time}}</div></el-col>
                  <el-col :span="12"><div class="blod">{{cell_phone.check_name}}</div></el-col>
                  <el-col :span="12"><div class="blod">{{cell_phone.check_idcard}}</div></el-col>
                  <el-col :span="12"><div class="blod">申请人姓名+手机号码出现在金融服务类机构黑名单:{{financial_blacklist.black_type}}</div></el-col>
                 <el-col :span="24"><div class="blod tit">居住地址：{{home_addr.key_value}}</div></el-col>
                 <el-col :span="12"><div class="blod">居住地址可通过地图定位技术精确定位到:{{home_addr.check_addr}}</div></el-col>
                 <el-col :span="12"><div class="blod">居住地址可通过地图定位技术精确定位到:{{home_addr.check_addr}}</div></el-col>
                 <el-col :span="12"><div class="blod">{{home_addr.check_ebusiness}}</div></el-col>
                  <el-col :span="24"><div class="blod tit">家庭电话：{{home_phone.key_value}}</div></el-col>
                  <el-col :span="12"><div class="blod">{{home_phone.check_mobile}}</div></el-col>
              </el-row>
             </div>

             <div  class="jxlreport" v-if="check_search_info || check_black_info">
              <h4 style="text-align:center">用户信息检测</h4>
                <el-row>
                    <el-col :span="24"><div class="blod">用户查询信息:</div></el-col>
                    <el-col :span="12" >查询过该用户的相关企业数量:<span class="blod">{{check_search_info.register_org_cnt}}</span></el-col>
                    <el-col :span="12">查询过该用户的相关企业类型：<span class="blod">{{check_search_info.searched_org_cnt}}</span></el-col>
                    <el-col :span="12">电话号码组合过其他姓名：<span class="blod" v-for="item in check_search_info.phone_with_other_names" :key="item.idcard">{{item}}</span></el-col>
                    <el-col :span="12">电话号码出现过的公开网站：<span class="blod" v-for="item in check_search_info.arised_open_web" :key="item.idcard">{{item}}</span></el-col>
                    <el-col :span="12">身份证组合过其他电话：<span class="blod" v-for="item in check_search_info.idcard_with_other_phones" :key="item.idcard">{{item}}</span></el-col>
                    <el-col :span="12">电话号码组合过其他身份证：<span class="blod" v-for="item in check_search_info.phone_with_other_idcards" :key="item.idcard">{{item}}</span></el-col>
                    <el-col :span="24">身份证组合过的其他姓名：<span class="blod" v-for="item in check_search_info.idcard_with_other_names" :key="item.idcard">{{item}}</span></el-col>
                    <el-col :span="24">查询过该用户的相关企业类型：<span class="blod" v-for="item in check_search_info.searched_org_type" :key="item.idcard">{{item}}、</span></el-col>
                    <el-col :span="24">电话号码注册过的相关企业类型：<span class="blod" v-for="item in check_search_info.register_org_type" :key="item.idcard">{{item}}</span></el-col>
                </el-row>
                <el-row>
                    <el-col :span="24"><div class="blod tit" style="margin-top:10px;">用户黑名单信息:</div></el-col>
                    <el-col :span="8"><div class="blod">直接联系人人数:{{check_black_info.contacts_class1_cnt}}</div></el-col>
                    <el-col :span="8"><div class="blod">直接联系人中黑名单人数:{{check_black_info.contacts_class1_blacklist_cnt}}</div></el-col>
                    <el-col :span="8"><div class="blod">间接联系人中黑名单人数:{{check_black_info.contacts_class2_blacklist_cnt}}</div></el-col>
                    <el-col :span="8"><div class="blod">引起间接黑名单人数:{{check_black_info.contacts_router_cnt}}</div></el-col>
                    <el-col :span="8"><div class="blod">直接联系人中引起间接黑名单占比:{{check_black_info.contacts_router_ratio}}</div></el-col>
                    <el-col :span="8"><div class="blod">用户号码联系黑中介分数:{{check_black_info.phone_gray_score}}</div></el-col>
                </el-row>
             </div>

            <div  class="jxlreport">
              <h4 style="text-align:center">用户行为检测</h4>
                <myTable :columns="behavior_checkColumns" :dataSource="behavior_check" :hasIndex="false" 
                :hasSelection="false" :hasPagination="false"  style="margin-top:20px"> </myTable>
             </div> 

              <div  class="jxlreport">
              <h4 style="text-align:center">运营商数据整理</h4>
                <myTable :columns="cell_behaviorColumns" :dataSource="cell_behavior" :hasIndex="false" 
                :hasSelection="false" :hasPagination="false"  style="margin-top:20px"> </myTable>
             </div> 

               <div  class="jxlreport">
              <h4 style="text-align:center">联系人区域汇总</h4>
                <myTable :columns="contact_regionColumns" :dataSource="contact_region" :hasIndex="false" 
                :hasSelection="false" :hasPagination="false"  style="margin-top:20px"> </myTable>
             </div> 

             
              <h4 style="text-align:center">常用服务</h4>
              <div  class="jxlreport">
                <myTable :columns="main_serviceColumns" :dataSource="main_service" :hasIndex="false" 
                :hasSelection="false" :hasPagination="false"  style="margin-top:20px"> </myTable>
             </div> 

             <div  class="jxlreport">
              <h4 style="text-align:center">出行分析</h4>
                <myTable :columns="trip_infoColumns" :dataSource="trip_info" :hasIndex="false" 
                :hasSelection="false" :hasPagination="false"  style="margin-top:20px"> </myTable>
             </div> 

              <div  class="jxlreport">
              <h4 style="text-align:center">运营商联系人通话详情</h4>
                <myTable :columns="contact_listColumns" :dataSource="contact_list" :hasIndex="false" 
                :hasSelection="false" :hasPagination="false"  style="margin-top:20px"> </myTable>
             </div> 
          </el-collapse-item> -->
         
         <el-collapse-item title="贷后上报" name="6">
            <template slot="title">
               贷后上报<span style="margin-left:20px;padding:5px;background-color:#08284E;border-radius:5px;" v-if="ds_reportSource">来源：{{ds_reportSource}}</span>
            </template>
              <myTable :columns="ds_reportColumns" :dataSource="ds_report" :hasIndex="false" 
              :hasSelection="false" :hasPagination="false"  style="margin-top:20px"> </myTable>
          </el-collapse-item>
     
     </el-collapse>
     </div>
   </el-card>
    <el-tooltip placement="top" content="回到顶部">
      <nx-back-to-top transitionName="fade" :customStyle="myBackToTopStyle" :visibilityHeight="300" :backPosition="50"></nx-back-to-top>
    </el-tooltip>
 </div>
</template>

<script>
import myTable from "@/components/myTable";
import { getNewsDetail } from "@/api/login.js";
import nxBackToTop from "@/components/nx-back-to-top";
import moment from "moment";
import {
  formatBankcard,
  formatPhone,
  formatIdcard,
  contactColumns, //联系人表
  emergencyColumns,
  platformDetailsColumns,
  bindidCardColumns,
  bindMobileColumns,
  behavior_checkColumns,
  cell_behaviorColumns,
  contact_regionColumns,
  contact_listColumns,
  main_serviceColumns,
  trip_infoColumns,
  ds_reportColumns,
  filterMarital, //过滤
  filterCompanyPeriod,
  iscustomer,
  filterProType,
  isTrue,
  filterinTime,
  filterTelecomType,
  filterCollName
} from "./util.js";
export default {
  components: { myTable, nxBackToTop },
  data() {
    return {
      myBackToTopStyle: {
        right: "50px",
        bottom: "50px",
        width: "40px",
        height: "40px",
        "border-radius": "4px",
        "line-height": "45px", // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: "#e7eaf1" // 按钮的背景颜色 The background color of the button
      },
      loading: false,
      activeNames: ["1"],
      username: "",
      idcard: "",
      contactColumns,
      emergencyColumns,
      basic: [], //基本信息
      juxinli: [], //聚信立
      daihoubang: [{}], //贷后邦
      changdaike: [{}], //常贷客
      platformDetailsColumns, //常贷客平台详情表
      platformDetails: [], //常贷可平台详情数据
      bindidCardColumns, //绑定身份证情况表
      bindMobileColumns, //绑定号码情况表
      bindidCardTable: [], //绑定身份证情况表数据
      bindMobileTable: [], //绑定号码情况表数据
      juxinliReport: [], //聚信立分析报告
      report: [], //报告基本信息
      user_info_check: [], //用户信息检测
      home_phone: {}, //用户申请表检测home_phone
      id_card: {},
      court_blacklist: {}, //用户申请表检测court_blacklist
      financial_blacklist: {}, //用户申请表检测court_blacklist
      home_addr: {}, //用户申请表检测home_addr
      cell_phone: {}, //用户申请表检测cell_phone
      check_black_info: {}, //用户申请表检测 用户黑名单查询
      check_search_info: {}, //用户申请表检测 用户信息查询
      behavior_check: [], //用户行为检测数据
      behavior_checkColumns, //用户行为检测数据表
      cell_behavior: [], //运营商数据整理
      cell_behaviorColumns, //运营商数据整理表
      contact_regionColumns, //联系人区域汇总表
      contact_region: [], //联系人区域汇总数据
      contact_list: [], //运营商联系人通话详情
      contact_listColumns, //运营商联系人通话详情表
      main_serviceColumns, //常用服务表
      main_service: [], //常用服务数据
      trip_info: [], //出行分析
      trip_infoColumns, //出行分析表
      ds_reportColumns, //贷后上报表
      ds_report: [], //贷后上报
      contactinSource: localStorage.getItem("contactinSource"), //来源
      daihoubangSource: localStorage.getItem("daihoubangSource"),
      changdaikeSource: localStorage.getItem("changdaikeSource"),
      juxinliSource: localStorage.getItem("juxinliSource"),
      ds_reportSource: localStorage.getItem("ds_reportSource")
    };
  },
  filters: {
    formatBankcard,
    formatPhone,
    formatIdcard,
    filterMarital,
    filterCompanyPeriod,
    iscustomer,
    filterProType,
    isTrue,
    filterTelecomType,
    filterinTime,
    filterCollName
  },
  mounted() {
    let row = JSON.parse(localStorage.getItem("row"));
    this.username = row.name;
    this.idcard = row.idcard;
    this.basic = [row];
  },
  methods: {
    // 折叠面板
    handleChange(val) {
      let coll = val.map(function(value) {
        return value;
      });
      let colleName = filterCollName(coll.pop());
      let params = {
        idCard: this.idcard,
        colleName: colleName
      };
      if (colleName === "juxinli_operator_report") {
        this.loading = true;
      }
      getNewsDetail(params)
        .then(res => {
          if (colleName === "basic") {
            this.loading = false;
          }
          if (colleName === "contactinfo") {
            if (res.data.data) {
              localStorage.setItem("contactinSource", res.data.data[1].source);
              this.contactinSource = localStorage.getItem("contactinSource"); //来源
            } else {
              this.emergency = [];
              this.contact = [];
            }
          } else if (colleName === "daihoubang") {
            if (res.data.data[0]) {
              this.daihoubang = res.data.data;
              localStorage.setItem("daihoubangSource", res.data.data[0].source);
              this.bindidCardTable = res.data.data[0].binding_idcards; //绑定身份证
              this.bindMobileTable = res.data.data[0].binding_phones; //绑定号码
              // console.log(this.bindidCardTable);
              this.daihoubangSource = localStorage.getItem("daihoubangSource"); //来源
            } else {
              this.daihoubang = [{}];
            }
          } else if (colleName === "changdaike") {
            if (res.data.data) {
              localStorage.setItem("changdaikeSource", res.data.data[1].source);
              this.changdaikeSource = localStorage.getItem("changdaikeSource"); //来源
              this.changdaike = [res.data.data[0].content.res];
              this.platformDetails =
                res.data.data[0].content.res.platformDetails; //常贷客平台详情
            } else {
              this.changdaike = [{}];
              this.platformDetails = [];
            }
          } else if (colleName === "juxinli_operator_report") {
            this.loading = false;
            if (res.data.data[0]) {
              let content = res.data.data[0].content;
              localStorage.setItem("juxinliSource", res.data.data[0].source);
              this.juxinliSource = localStorage.getItem("juxinliSource"); //来源
              this.report = [content.report]; //报告基本信息
              this.home_phone = content.home_phone.check_points; //用户申请表检测home_phone
              this.id_card = content.id_card.check_points; //id_card
              this.court_blacklist =
                content.id_card.check_points.court_blacklist; //id_card  court_blacklist
              this.financial_blacklist =
                content.id_card.check_points.financial_blacklist; //id_card   financial_blacklist
              this.home_addr = content.home_addr.check_points; //home_addr
              this.cell_phone = content.cell_phone.check_points; //cell_phone
              if (content.user_info_check instanceof Object) {
                this.check_search_info =
                  content.user_info_check.check_search_info; //用户信息查询
                this.check_black_info =
                  content.user_info_check.check_black_info; //check_black_info 用户黑名单信息
              } else {
                this.check_black_info = {};
                this.user_info_check = {};
              }
              this.behavior_check = content.behavior_check; //用户行为检测
              this.cell_behavior = content.cell_behavior[0].behavior; //运营商数据整理
              this.contact_region = content.contact_region; //联系人区域汇总
              this.contact_list = content.contact_list; //运营商联系人通话详情
              // this.main_service = content.main_service; //常用服务
              this.trip_info = content.trip_info; //出行分析
              let newObj = [];
              content.main_service.forEach(item => {
                item.service_details.forEach(val => {
                  newObj.push(
                    Object.assign(val, {
                      company_type: item.company_type,
                      company_name: item.company_name,
                      total_service_cnt: item.total_service_cnt
                    })
                  );
                });
              });
              this.main_service = newObj;
            } else {
              this.report = [];
              this.home_phone = {};
              this.court_blacklist = {};
              this.financial_blacklist = {};
              this.home_addr = {};
              this.cell_phone = {};
              this.check_black_info = {};
              this.behavior_check = [];
              this.cell_behavior = [];
              this.contact_region = [];
              this.contact_list = [];
              this.main_service = [];
              this.trip_info = [];
            }
          } else if (colleName === "ds_report") {
            if (res.data) {
              localStorage.setItem("ds_reportSource", res.data.data[0].source);
              this.ds_reportSource = localStorage.getItem("ds_reportSource"); //来源
              this.ds_report = res.data.data;
            } else {
              this.ds_report = [];
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.box-card {
  background-image: url("../../assets/images/home/topBg2.png");
  background-size: cover;
}
.table >>> .box-card2 {
  /* background-color: #041334 !important;
  border: 1px solid #0c234c !important; */
  background-image: url("../../assets/images/home/btmBg.png");
  background-size: cover;
}
.table >>> .el-card {
  background-color: #080920;
  border: none;
}
.table >>> .el-collapse-item__header {
  background-color: #041334;
  color: aqua;
  border: none;
}
.table >>> .el-collapse {
  border: none;
}
.table >>> .el-collapse-item__wrap {
  background-color: #041334;
  border: none;
}
.table >>> .el-collapse-item__content {
  color: #7ecbe0;
  border: none;
}
.box {
  width: auto;
  height: auto;
  /* border: 1px solid #dddddd; */
  margin: 0 auto;
  /* padding: 20px; */
  box-sizing: border-box;
  margin-bottom: 30px;
}
.blod {
  /* font-weight: bold; */
  padding-bottom: 20px;
}
.jxlreport {
  /* border: 1px solid#dddddd; */
  margin-bottom: 10px;
}
/* .tit {
  font-weight: bold;
} */
</style>
