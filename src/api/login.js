import request from '@/utils/request'
import { get, post, deletes, put } from '@/utils/request'

const api = process.env.NODE_ENV == "development" ? 'api' : 'http://ai.dsdatas.com';
// const api = "api"
export function login(username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

//登录
export function getLogin(params) {
  return post(`${api}/auth/login`, params);
}
//根据userid查询动态路由
export function getInfo(params) {
  return post(`${api}/sysrole/menu`, params);
}
//身份证、手机号管理 
export function getNewsList(params) {
  return post(`${api}/dsai/list`, params);
}
//身份证、手机号管理详情
export function getNewsDetail(params) {
  return post(`${api}/dsai/detail`, params);
}
// 特征来源
export function getFeatureSource(params) {
  return get(`${api}/featureconfig/page`, params);
}
// 特征离散分析表格
export function getDiscreteAnalysis(params) {
  return get(`${api}/aidiscrete/page`, params);
}
// 特征分箱报表
export function getFeatureBox(params) {
  return get(`${api}/aibin/search`, params);
}
//特征分箱图表
export function getFeatureBoxChart(params) {
  return get(`${api}/aibin/search`, params);
}
// 特征分箱搜索
export function searchFeatureBox(params) {
  return post(`${api}/aibin/searchByFeatureBin`, params);
}
// 特征IV值
export function getIVvalue(params) {
  return get(`${api}/aibin/searchByIv`, params);
}
//特征iv值搜索
export function searchIVvalue(params) {
  return post(`${api}/aibin/searchByFeatureIv`, params);
}
// 特征分布分析
export function getAnalysisDistribution(params) {
  return get(`${api}/aibin/analysis`, params);
}
//组合矩阵
export function searchCompositeMatrix(params) {
  return post(`${api}/Feature/correlationMatrix`, params);
}
// 特征分布分析搜索
export function searchAnalysisDistribution(params) {
  return post(`${api}/aibin/searchAnalysisByFeature`, params);
}
// 特征关联模型
export function getCorrelationModel(params) {
  return get(`${api}/featureconfig/modellist`, params);
}
//模型管理评分卡
export function getScoreCard(params) {
  return get(`${api}/featureconfig/modelpage`, params);
}
//模型管理相似度对比查询列表
export function getSimilarityRatio(params) {
  return get(`${api}/featureconfig/list`, params);
}
//模型管理相似度对比搜索、非准入规则查询
export function searchSimilarityRatio(params) {
  return get(`${api}/featureconfig/page`, params);
}
//模型管理相似度对比删除、添加（修改状态）
export function SimilarityRatioDelete(params) {
  return put(`${api}/featureconfig`, params);
}
//模型管理转移矩阵
export function getTransferMatrix(params) {
  return get(`${api}/aitransfer/list`, params);
}

//模型结果展示相似度比对结果展示
export function getSimilarityRatio2(params) {
  return post(`${api}/ScoreCard/Literacy`, params);
}
//模型结果展示转移矩阵结果展示
export function getTransferMatrix2(params) {
  return post(`${api}/ScoreCard/TransferMatrixF`, params);
}
//模型结果展示评分卡结果展示
export function getScoreCard2(params) {
  return get(`${api}/aiorderinfo/page`, params);
}
//模型结果展示评分卡展示详情
export function getScoreCard2Details(params) {
  return post(`${api}/ScoreCard/ScoreDetail`, params);
}
//模型阈值
export function getThresholdValue(params) {
  return get(`${api}/aithreshold/page`, params);
}
//模型评价报表
export function getMxpjTable(params) {
  return get(`${api}/airoc/page`, params);
}
//模型评价曲线图表
export function getMxpjChart(params) {
  // return get(`${api}/aitransfer/list`, params);
}
//权限管理 用户列表
export function getUserList(params) {
  return get(`${api}/user/page`, params);
}
//添加用户
export function AddUser(params) {
  return post(`${api}/user`, params);
}
//查询角色列表
export function getRoleList(params) {
  return get(`${api}/sysrole/page`, params);
}
//添加角色
export function addRoleList(params) {
  return post(`${api}/sysrole`, params);
}
//查询所有菜单
export function getAllRouters(params) {
  return get(`${api}/sysrole/Role`, params);
}
//根据角色id查菜单
export function getRoleTree(params) {
  return get(`${api}/sysrole/Role`, params);
}
//编辑角色
export function editRole(params) {
  return post(`${api}/sysrole/update`, params);
}
//编辑用户、修改密码
export function editUser(params) {
  return put(`${api}/user`, params);
}
// 系统日志
export function getLog(params) {
  return get(`${api}/log/page`, params);
}
// 元数据管理 身份证黑名单库
export function getidBlacklistDatabase(params) {
  return get(`${api}/blacklist/page`, params);
}
// 手机号段省（市）级归属库
export function getphoneProvinceLibrary(params) {
  return get(`${api}/mobile/page`, params);
}
// 身份证号段省（市）级归属库
export function getidCardProvinceLibrary(params) {
  return get(`${api}/region/page`, params);
}
// 银行卡开卡行归属库
export function getbankCardLibrary(params) {
  return get(`${api}/banks/page`, params);
}
// 运营商号段库
export function getoperatorSegmentLibrary(params) {
  return get(`${api}/carrier/page`, params);
}
