import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Layout from '@/views/layout/Layout'
//所有权限通用路由表，不用权限的公用页面 
export const constantRouterMap = [
  {
    path: '/',
    hidden: true,
    component: Layout,
    redirect: '/dashboard/dashboard'
  },
  { path: '/login', hidden: true, component: () => import('@/views/login'), name: '登录NxAdmin', hidden: true },
  { path: '/404', hidden: true, component: () => import('@/views/errorPage/404'), hidden: true },
  { path: '/401', hidden: true, component: () => import('@/views/errorPage/401'), hidden: true },
  // 首页
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/dashboard',
    // name: 'dashboard',
    meta: { title: 'dashboard', icon: 'dashboard' },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/dashboard'),
        meta: { title: '首页', icon: 'dashboard' }
      }
    ]
  },
  // 样本管理
  // {
  //   path: '/sampleManagement',
  //   component: Layout,
  //   redirect: '/sampleManagement/telManagement',
  //   name: 'sampleManagement',
  //   meta: {
  //     title: '数据湖管理',
  //     icon: 'sampleManagement'
  //   },
  //   children: [
  //     {
  //       path: 'idcardManagement',//身份证管理
  //       name: 'idcardManagement',
  //       component: () => import('@/views/sampleManagement/idcardManagement'),
  //       meta: { title: '身份证管理' }
  //     },
  //     {
  //       path: 'idcardManagementDetail', //身份证管理详情
  //       name: 'idcardManagementDetail',
  //       component: () => import('@/views/sampleManagement/idcardManagementDetail'),
  //       meta: { title: '身份证管理详情' },
  //       hidden: true
  //     },
  //     {
  //       path: 'telManagement',//手机号管理
  //       name: 'telManagement',
  //       component: () => import('@/views/sampleManagement/telManagement'),
  //       meta: { title: '手机号管理' }
  //     },
  //     {
  //       path: 'telManagementDetail', //手机号管理详情
  //       name: 'telManagementDetail',
  //       component: () => import('@/views/sampleManagement/telManagementDetail'),
  //       meta: { title: '手机号管理详情' },
  //       hidden: true
  //     },
  //   ]
  // },
  // //数据工程
  // {
  //   path: '/dataEngineering',
  //   component: Layout,
  //   redirect: '/dataEngineering/discreteAnalysis',
  //   name: 'dataEngineering',
  //   meta: {
  //     title: '数据工程',
  //     icon: 'characteristics'
  //   },
  //   children: [
  //     {
  //       path: 'discreteAnalysis',//特征离散分析
  //       name: 'discreteAnalysis',
  //       component: () => import('@/views/dataEngineering/discreteAnalysis'),
  //       meta: { title: '特征离散分析' }
  //     }, {
  //       path: 'IVvalue',//特征iv值
  //       name: 'IVvalue',
  //       component: () => import('@/views/dataEngineering/IVvalue'),
  //       meta: { title: '特征iv值' }
  //     }]
  // },
  // // 特征工程
  // {
  //   path: '/characteristics',
  //   component: Layout,
  //   redirect: '/characteristics/characteristicSource',
  //   name: 'characteristics',
  //   meta: {
  //     title: '特征工程',
  //     icon: 'characteristics'
  //   },
  //   children: [
  //     {
  //       path: 'characteristicSource',//特征来源
  //       name: 'characteristicSource',
  //       component: () => import('@/views/characteristics/characteristicSource'),
  //       meta: { title: '特征来源' }
  //     }, {
  //       path: 'featureBox',//特征分箱
  //       name: 'featureBox',
  //       component: () => import('@/views/characteristics/featureBox'),
  //       meta: { title: '特征分箱' }
  //     }, {
  //       path: 'analysisDistribution',//特征分布分析
  //       name: 'analysisDistribution',
  //       component: () => import('@/views/characteristics/analysisDistribution'),
  //       meta: { title: '特征分布分析' }
  //     }, {
  //       path: 'correlationModel',//特征关联模型
  //       name: 'correlationModel',
  //       component: () => import('@/views/characteristics/correlationModel'),
  //       meta: { title: '特征关联模型' }
  //     }
  //   ]
  // },
  // // 模型管理
  // {
  //   path: '/modelManagement',
  //   component: Layout,
  //   redirect: '/modelManagement/scoreCard',
  //   name: 'modelManagement',
  //   meta: {
  //     title: '模型管理',
  //     icon: 'characteristics'
  //   },
  //   children: [
  //     {
  //       path: 'scoreCard',//评分卡
  //       name: 'scoreCard',
  //       component: () => import('@/views/modelManagement/scoreCard'),
  //       meta: { title: '评分卡' }
  //     }, {
  //       path: 'similarityRatio',//相似度比对
  //       name: 'similarityRatio',
  //       component: () => import('@/views/modelManagement/similarityRatio'),
  //       meta: { title: '相似度比对' }
  //     }, {
  //       path: 'transferMatrix',//转移矩阵
  //       name: 'transferMatrix',
  //       component: () => import('@/views/modelManagement/transferMatrix'),
  //       meta: { title: '转移矩阵' }
  //     }
  //   ]
  // },
  // //模型结果展示
  // {
  //   path: '/modelResults',
  //   component: Layout,
  //   redirect: '/modelResults/scoreCard2',
  //   name: 'modelResults',
  //   meta: {
  //     title: '模型结果展示',
  //     icon: 'characteristics'
  //   },
  //   children: [
  //     {
  //       path: 'scoreCard2',//评分卡
  //       name: 'scoreCard2',
  //       component: () => import('@/views/modelResults/scoreCard2'),
  //       meta: { title: '评分卡' }
  //     }, {
  //       path: 'scoreCardDetails',//评分卡详情
  //       name: 'scoreCardDetails',
  //       component: () => import('@/views/modelResults/scoreCardDetails'),
  //       meta: { title: '评分卡详情' },
  //       hidden: true
  //     }, {
  //       path: 'transferMatrix2',//转移矩阵
  //       name: 'transferMatrix2',
  //       component: () => import('@/views/modelResults/transferMatrix2'),
  //       meta: { title: '转移矩阵' }
  //     }, {
  //       path: 'similarityRatio2',//相似度比对
  //       name: 'similarityRatio2',
  //       component: () => import('@/views/modelResults/similarityRatio2'),
  //       meta: { title: '相似度比对' }
  //     }
  //   ]
  // },
  // //模型评价
  // {
  //   path: '/modelEvaluation',
  //   component: Layout,
  //   redirect: '/modelEvaluation/thresholdValue',
  //   name: 'modelEvaluation',
  //   meta: {
  //     title: '模型评价',
  //     icon: 'characteristics'
  //   },
  //   children: [
  //     {
  //       path: 'thresholdValue',//阈值
  //       name: 'thresholdValue',
  //       component: () => import('@/views/modelEvaluation/thresholdValue'),
  //       meta: { title: '阈值' }
  //     },
  //     {
  //       path: 'mxpj',//模型评价
  //       name: 'mxpj',
  //       component: () => import('@/views/modelEvaluation/mxpj'),
  //       meta: { title: '模型评价' }
  //     }, {
  //       path: 'modelWarning',//模型预警
  //       name: 'modelWarning',
  //       component: () => import('@/views/modelEvaluation/modelWarning'),
  //       meta: { title: '模型预警' },
  //     }
  //   ]
  // },
  //元数据管理
  // {
  //   path: '/metadata',
  //   component: Layout,
  //   redirect: '/metadata/idBlacklistDatabase',
  //   name: 'metadata',
  //   meta: {
  //     title: '元数据管理',
  //     icon: 'characteristics'
  //   },
  //   children: [
  //     {
  //       path: 'idBlacklistDatabase',//身份证黑名单库
  //       name: 'idBlacklistDatabase',
  //       component: () => import('@/views/metadata/idBlacklistDatabase'),
  //       meta: { title: '身份证黑名单库' }
  //     }, {
  //       path: 'phoneBlacklistDatabase',//手机号黑名单库
  //       name: 'phoneBlacklistDatabase',
  //       component: () => import('@/views/metadata/phoneBlacklistDatabase'),
  //       meta: { title: '手机号黑名单库' }
  //     }, {
  //       path: 'bankCardBlacklistDatabase',//银行卡黑名单库
  //       name: 'bankCardBlacklistDatabase',
  //       component: () => import('@/views/metadata/bankCardBlacklistDatabase'),
  //       meta: { title: '银行卡黑名单库' }
  //     }, {
  //       path: 'operatorSegmentLibrary',//运营商号段库
  //       name: 'operatorSegmentLibrary',
  //       component: () => import('@/views/metadata/operatorSegmentLibrary'),
  //       meta: { title: '运营商号段库' }
  //     }, {
  //       path: 'phoneProvinceLibrary',//手机号段省级归属库
  //       name: 'phoneProvinceLibrary',
  //       component: () => import('@/views/metadata/phoneProvinceLibrary'),
  //       meta: { title: '手机号段省级归属库' }
  //     }, {
  //       path: 'phoneCityLibrary',//手机号段市级归属库
  //       name: 'phoneCityLibrary',
  //       component: () => import('@/views/metadata/phoneCityLibrary'),
  //       meta: { title: '手机号段市级归属库' }
  //     }, {
  //       path: 'idCardProvinceLibrary',//身份证号段省级归属库
  //       name: 'idCardProvinceLibrary',
  //       component: () => import('@/views/metadata/idCardProvinceLibrary'),
  //       meta: { title: '身份证号段省级归属库' }
  //     }, {
  //       path: 'idCardCityLibrary',//身份证号段市级归属库
  //       name: 'idCardCityLibrary',
  //       component: () => import('@/views/metadata/idCardCityLibrary'),
  //       meta: { title: '身份证号段市级归属库' }
  //     }, {
  //       path: 'idCardSexLibrary',//身份证号段性别库
  //       name: 'idCardSexLibrary',
  //       component: () => import('@/views/metadata/idCardSexLibrary'),
  //       meta: { title: '身份证号段性别库' }
  //     }, {
  //       path: 'bankCardLibrary',//银行卡开卡行归属库
  //       name: 'bankCardLibrary',
  //       component: () => import('@/views/metadata/bankCardLibrary'),
  //       meta: { title: '银行卡开卡行归属库' }
  //     },
  //   ]
  // },

]

//异步挂载的路由
//动态需要根据权限加载的路由表 
// export const asyncRouterMap = [
//   //超级管理员系统管理
//   {
//     path: '/superAdminSet',
//     component: Layout,
//     redirect: '/superAdminSet/thresholdValue',
//     name: 'superAdminSet',
//     meta: {
//       title: '系统管理',
//       icon: 'characteristics',
//       roles: ['admin', 'editor']
//     },
//     children: [
//       {
//         path: 'rightsManagement',//权限管理
//         name: 'rightsManagement',
//         component: () => import('@/views/superAdminSet/rightsManagement'),
//         meta: { title: '权限管理' }
//       }, {
//         path: 'systemLog',//系统日志
//         name: 'systemLog',
//         component: () => import('@/views/superAdminSet/systemLog'),
//         meta: { title: '系统日志' },
//         roles: ['admin']//仅管理员可见
//       }
//     ]
//   },
//   // { path: '*', redirect: '/404', hidden: true }
// ]

// Map路由映射
export const routerMap = {
  layout: () => import('@/views/layout/Layout'), //也需要映射，不然出现空白页

  dashboard: () => import('@/views/dashboard/dashboard'),

  sampleManagement: () => import('@/views/sampleManagement/telManagement'),//数据湖管理
  idcardManagement: () => import('@/views/sampleManagement/idcardManagement'),
  idcardManagementDetail: () => import('@/views/sampleManagement/idcardManagementDetail'),
  telManagement: () => import('@/views/sampleManagement/telManagement'),
  telManagementDetail: () => import('@/views/sampleManagement/telManagementDetail'),

  dataEngineering: () => import('@/views/dataEngineering/discreteAnalysis'),  //数据工程
  discreteAnalysis: () => import('@/views/dataEngineering/discreteAnalysis'),
  IVvalue: () => import('@/views/dataEngineering/IVvalue'),

  characteristics: () => import('@/views/characteristics/characteristicSource'),//特征工程
  characteristicSource: () => import('@/views/characteristics/characteristicSource'),
  featureBox: () => import('@/views/characteristics/featureBox'),
  analysisDistribution: () => import('@/views/characteristics/analysisDistribution'),
  correlationModel: () => import('@/views/characteristics/correlationModel'),
  compositeMatrix: () => import('@/views/characteristics/compositeMatrix'),

  modelManagement: () => import('@/views/modelManagement/scoreCard'),//模型管理
  scoreCard: () => import('@/views/modelManagement/scoreCard'),
  similarityRatio: () => import('@/views/modelManagement/similarityRatio'),
  transferMatrix: () => import('@/views/modelManagement/transferMatrix'),

  modelResults: () => import('@/views/modelResults/scoreCard2'),//模型结果展示
  scoreCard2: () => import('@/views/modelResults/scoreCard2'),
  scoreCardDetails: () => import('@/views/modelResults/scoreCardDetails'),
  transferMatrix2: () => import('@/views/modelResults/transferMatrix2'),
  similarityRatio2: () => import('@/views/modelResults/similarityRatio2'),

  modelEvaluation: () => import('@/views/modelEvaluation/thresholdValue'),//模型评价
  thresholdValue: () => import('@/views/modelEvaluation/thresholdValue'),
  mxpj: () => import('@/views/modelEvaluation/mxpj'),
  modelWarning: () => import('@/views/modelEvaluation/modelWarning'),

  metadata: () => import('@/views/metadata/idBlacklistDatabase'),//元数据
  idBlacklistDatabase: () => import('@/views/metadata/idBlacklistDatabase'),
  phoneBlacklistDatabase: () => import('@/views/metadata/phoneBlacklistDatabase'),
  bankCardBlacklistDatabase: () => import('@/views/metadata/bankCardBlacklistDatabase'),
  operatorSegmentLibrary: () => import('@/views/metadata/operatorSegmentLibrary'),
  phoneProvinceLibrary: () => import('@/views/metadata/phoneProvinceLibrary'),
  phoneCityLibrary: () => import('@/views/metadata/phoneCityLibrary'),
  idCardProvinceLibrary: () => import('@/views/metadata/idCardProvinceLibrary'),
  idCardCityLibrary: () => import('@/views/metadata/idCardCityLibrary'),
  idCardSexLibrary: () => import('@/views/metadata/idCardSexLibrary'),
  bankCardLibrary: () => import('@/views/metadata/bankCardLibrary'),

  superAdminSet: () => import('@/views/superAdminSet/rightsManagement'),
  rightsManagement: () => import('@/views/superAdminSet/rightsManagement'),
  systemLog: () => import('@/views/superAdminSet/systemLog'),
}

const createRouter = () => new Router({
  // mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router