import { axiosfn } from '../../router/http'
//学员列表
const  getCustomUserList = (data) => {
   return  axiosfn('customerUser/getCustomUserList',data)
}
//登录
const  userLogin = (data) => {
   return  axiosfn('user/userLogin',data,'POST')
}
///获取任务 
const  getBoxtaskInfoIdList = (systembId) => {
   return  axiosfn('boxtaskInfo/getBoxtaskInfoIdList',{
      systembId
   })
}
//获取课程
const  getSysCourseList = (systembId) => {
   return  axiosfn('sysCourse/getSysCourseList',{
         systembId,
         pageNum:1,
         pageSize:10000
   })
}
//获取成绩列表
const  getScoreManagementList = (data) => {
   return  axiosfn('scoreManagement/getScoreManagementListByCJ',data)
}
//获取成绩导出
const  generateSheetForScoreListCJ = (systembId) => {
   return  axiosfn('scoreManagement/generateSheetForScoreListCJ',{
      systembId
   })
}
//进场记录
const  getEntryrecordList = (data) => {
   return  axiosfn('entryrecord/getEntryrecordList',data)
}
//成绩汇总
const  getScoreManagementListByUserId = (data) => {
   return  axiosfn('scoreManagement/getScoreManagementListByUserId',data)
}
//导出汇总
const  generateSheetForScoreByUserId = (data) => {
   return  axiosfn('/scoreManagement/generateSheetForScoreByUserId',data)
}
//获取用户信息
const  getCustomUserById = (userId) => {
   return  axiosfn('/customerUser/getCustomUserById',{ userId})
}
//获取工程列表
const  getProjectModuleList = (moduleType) => {
   return  axiosfn('/resultRecord/getProjectModuleList',{ moduleType})
}
//获取成绩列表
const  getResultRecordList = (data) => {
   return  axiosfn('/resultRecord/getResultRecordList',data)
}
//导出成绩列表
const  generateSheetForResultList = (data) => {
   return  axiosfn('/resultRecord/generateSheetForResultList',data)
}
const  getResultRecordListByUserId = (data) => {
   return  axiosfn('/resultRecord/getResultRecordListByUserId',data)
}
const  generateSheetForResultByUserId = (data) => {
   return  axiosfn('/resultRecord/generateSheetForResultByUserId',data)
}
export {getResultRecordListByUserId,generateSheetForResultByUserId,generateSheetForResultList,getResultRecordList,getProjectModuleList,getCustomUserById,getScoreManagementListByUserId,generateSheetForScoreByUserId,generateSheetForScoreListCJ, getEntryrecordList,getScoreManagementList,getCustomUserList,userLogin,getBoxtaskInfoIdList,getSysCourseList}