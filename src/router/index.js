import Vue from 'vue'
import Router from 'vue-router'
import Admin from '@/pages/admin/index'
import ManageAdmin from '@/pages/admin/manageAdmin/manageAdmin'
import ManageList from '@/pages/admin/manageAdmin/components/manageList'
import scoreAll from '@/pages/admin/manageAdmin/components/scoreAll'
import SchoolList from '@/pages/admin/manageAdmin/components/schoolList'
import AdministratorsList from '@/pages/admin/manageAdmin/components/administratorsList'
import achievement from '@/pages/admin/manageAdmin/components/achievement'
import achievementyh from '@/pages/admin/manageAdmin/components/achievement_yh'
import achievementdt from '@/pages/admin/manageAdmin/components/achievement_dt'
import achievementqd from '@/pages/admin/manageAdmin/components/achievement_qd'
import entryrecord from '@/pages/admin/manageAdmin/components/entryrecord'
import userInfo from '@/pages/admin/userinfo'
// import IBOXList from '@/pages/admin/manageAdmin/components/IBOXList'
// import CourseList from '@/pages/admin/manageAdmin/components/CourseList'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/manageAdmin',
      name: 'ManageAdmin',
      component: ManageAdmin,
      redirect: '/manageAdmin/manageList',
      children: [
        {
          path: 'entryrecord',
          name: 'entryrecord',
          component: entryrecord
        },
        {
          path: 'userinfo',
          name: 'userinfo',
          component: userInfo
        },
        {
          path: 'scoreAll',
          name: 'scoreAll',
          component: scoreAll
        },
        {
          path: 'manageList',
          name: 'ManageList',
          component: ManageList
        },
        {
          path: 'schoolList',
          name: 'SchoolList',
          component: SchoolList
        },
        {
          path: 'administratorsList',
          name: 'AdministratorsList',
          component: AdministratorsList
        },
        {
          path: 'achievement',
          name: 'achievement',
          component: achievement
        },
        {
          path: 'achievementyh',
          name: 'achievementyh',
          component: achievementyh
        },
        {
          path: 'achievementdt',
          name: 'achievementdt',
          component: achievementdt
        },
        {
          path: 'achievementqd',
          name: 'achievementqd',
          component: achievementqd
        },
      ]
    }
  ]
})
