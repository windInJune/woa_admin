<script type="text/javascript">
let localAPI;
// 登录
if (process.env.NODE_ENV == 'development') {
    localAPI = 'http://www.zz-w.cn/ibox';
    // localAPI = 'http://172.16.1.165/ibox';
} else {
    localAPI = 'http://www.zz-w.cn/ibox';
    // localAPI = 'http://172.16.1.165/ibox'; //线上url
}
// 登录
const userlogin = localAPI + '/user/userLogin'
// 超管端
const getUserList = localAPI + '/user/getUserList'
const insertUser = localAPI + '/user/insertUser'
const deleteUser = localAPI + '/user/deleteUser'
const modifyUserPwd = localAPI + '/user/modifyUserPwd'
const disableUser = localAPI + '/user/disableUser'
// 管理端
const getSchoolList = localAPI + '/school/getSchoolList'
const getCustomUserList = localAPI + '/customerUser/getCustomUserList'
const getCustomUserById = localAPI + '/customerUser/getCustomUserById'
const modifyCustomerUserById = localAPI + '/customerUser/modifyCustomerUserById'
const modifyPassword = localAPI + '/customerUser/modifyPassword'
const getSchools = localAPI + '/school/getSchools'
const getGrades = localAPI + '/school/getGrades'
const getClass = localAPI + '/school/getClass'

const insertSchool = localAPI + '/school/insertSchool'
const deleteSchool = localAPI + '/school/deleteSchool'
const editSchool = localAPI + '/school/editSchool'
const getDataStatistics = localAPI + '/school/getDataStatistics'
//修改用户信息
const editSystemUser = localAPI + '/user/editSystemUser'
// ibox
const getIboxList = localAPI + '/iboxInfo/getIboxList'
const getIbox = localAPI + '/iboxInfo/getIbox'
const deleteIboxById = localAPI + '/iboxInfo/deleteIboxById'
const insertIbox = localAPI + '/iboxInfo/insertIbox'
const editIbox = localAPI + '/iboxInfo/editIbox'
const getSearchTexts = localAPI + '/iboxInfo/getSearchTexts'
const getSystembById = localAPI + '/systermb/getSystembById'
const getSystembs = localAPI + '/systermb/getSystembs'
const getUserRecord = localAPI + '/iboxInfo/getUserRecord'

// 课程管理
const getSysCourseList = localAPI + '/sysCourse/getSysCourseList'
const getSectionList = localAPI + '/sectionProfession/getSectionList'
const getProfessionList = localAPI + '/sectionProfession/getProfessionList'
const insertSysCourse = localAPI + '/sysCourse/insertSysCourse'
const deleteSysCourseById = localAPI + '/sysCourse/deleteSysCourseById'
const getSysCourseById = localAPI + '/sysCourse/getSysCourseById'
const insertSectionProfession = localAPI + '/sectionProfession/insertSectionProfession'
const deleteSectionProfession = localAPI + '/sectionProfession/deleteSectionProfession'
const updateSectionProfession = localAPI + '/sectionProfession/updateSectionProfession'
const updateSysCourse = localAPI + '/sysCourse/updateSysCourse'
const getBoxtaskList = localAPI + '/boxtask/getBoxtaskList'
const insertBoxtask = localAPI + '/boxtask/insertBoxtask'
const getBoxtaskById = localAPI + '/boxtask/getBoxtaskById'
const deleteBoxtask = localAPI + '/boxtask/deleteBoxtask'
const updateBoxtask = localAPI + '/boxtask/updateBoxtask'
const modifyUserPwdByOldPwd = localAPI + '/user/modifyUserPwdByOldPwd'
const getSchoolsDrowDown = localAPI + '/school/getSchoolsDrowDown'
 //获取设备设置状态
const getIboxSettingInfo = localAPI + '/iboxInfo/getIboxSettingInfo'
 //设置设备状态
const updateIboxSettingInfo = localAPI + '/iboxInfo/updateIboxSettingInfo'
//查看回放记录
const getVideo = localAPI + '/httpClient/getVideo'
export default
{
  getUserRecord,
  getIboxSettingInfo,
updateIboxSettingInfo,
getVideo,
  getSchoolsDrowDown,
  getSystembById,
  getSystembs,
  modifyUserPwdByOldPwd,
  editSystemUser,
  localAPI,
  userlogin,
  getUserList,
  insertUser,
  deleteUser,
  modifyUserPwd,
  disableUser,
  getSchoolList,
  getCustomUserList,
  insertSchool,
  deleteSchool,
  editSchool,
  getCustomUserById,
  modifyCustomerUserById,
  modifyPassword,
  getSchools,
  getGrades,
  getClass,
  getDataStatistics,
  getIboxList,
  deleteIboxById,
  insertIbox,
  getIbox,
  editIbox,
  getSysCourseList,
  getSectionList,
  getProfessionList,
  insertSysCourse,
  getSearchTexts,
  deleteSysCourseById,
  getSysCourseById,
  insertSectionProfession,
  deleteSectionProfession,
  updateSectionProfession,
  updateSysCourse,
  getBoxtaskList,
  getBoxtaskById,
  insertBoxtask,
  deleteBoxtask,
  updateBoxtask
}
</script>
