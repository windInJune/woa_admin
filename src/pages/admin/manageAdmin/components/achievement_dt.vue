<template>
  <div class="adminList">
    <!-- 表单信息 -->
    <ul class="title-icon">
      <li style="font-size: 14px;
    color: #434343;">
        <span>成绩管理</span>
        <i class="el-icon-caret-right"></i>答题软件
      </li>
    </ul>
    <div class="navBox">
      <div class="scrollLeft" @click="navListScrollLeft">
        <div class="leftfont"></div>
      </div>
      <ul class="navlist" ref="navlist">
        <li
          v-for="(item,index) in projectModuleList"
          :class="[item.id == projectModuleid?'active':'']"
          :key="index"
          @click="choseSystem(item.id)"
        >{{item.name}}</li>
      </ul>
      <div class="scrollRight" @click="navListScrollRight">
        <div class="rightfont"></div>
      </div>
    </div>
    <!-- <ul class="navlist">
      <li
        v-for="(item,index) in projectModuleList"
        :class="[item.id == projectModuleid?'active':'']"
        :key="index"
        @click="choseSystem(item.id)"
      >{{item.name}}</li>
    </ul>-->
    <ul class="search">
      <li>
        <el-select v-model="schoolValue" placeholder="全部机构" @change="schoolChange">
          <el-option
            v-for="item in schoolList"
            :key="item.schoolId"
            :label="item.schoolName"
            :value="item.schoolId"
          ></el-option>
        </el-select>
      </li>
      <li>
        <el-select v-model="GradeValue" placeholder="全部年级" @change="GradeChange">
          <el-option v-for="item in GradeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </li>
      <li>
        <el-select v-model="classValue" placeholder="全部班级" @change="classChange">
          <el-option v-for="item in classList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </li>
      <!-- <li>
        <el-select v-model="kcValue" placeholder="全部课程" @change="kcChange">
          <el-option v-for="item in kc" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </li>
      <li>
        <el-select v-model="rwValue" placeholder="全部任务" @change="rwChange">
          <el-option v-for="item in rw" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </li>-->
      <li>
        <el-input v-model="serarchValue" placeholder="请输入知号、姓名、学号查询" class="serarchValue"></el-input>
      </li>
      <li class="lastLi">
        <div class="searchs_btn" @click="searchSubmit">查找</div>
        <div class="searchs_btn" @click="outer">导出</div>
      </li>
    </ul>
    <el-table
      :data="pageData"
      highlight-current-row
      :header-cell-style="headerClassFn"
      style="width: 100%;border:1px solid rgba(229, 229, 228, 1)"
      v-loading="loading"
    >
      <el-table-column type="index" label="序号" width="80">
        <template slot-scope="scope">{{scope.$index + 1 + (currentPage-1)*10}}</template>
      </el-table-column>
      <el-table-column prop="userName" label="姓名" width="100"></el-table-column>
      <el-table-column prop="schoolName" label="所属机构"></el-table-column>
      <el-table-column prop="gradeName" label="年级"></el-table-column>
      <el-table-column prop="className" label="班级"></el-table-column>
      <el-table-column prop="resultScore" label=" 成绩"></el-table-column>
      <el-table-column prop="resultLevel" label="层级"></el-table-column>
      <el-table-column prop="timeCost" label="考试用时">
        <template slot-scope="scope">
              <span>{{scope.row.timeCost | settimems}}</span>
            </template>
      </el-table-column>
      <el-table-column prop="schoolName" label="考试地点"></el-table-column>
      <el-table-column prop="endTime" label="完成时间"></el-table-column>
      <el-table-column prop="subjectType" label="操作" width="310">
        <template slot-scope="scope" class="handle">
          <el-button
            size="small"
            @click="detail(scope.$index, scope.row)"
            class="iconfont-color-blue"
          >考评汇总</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total, prev, pager, next, jumper"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
/*eslint-disable */
import Vue from "vue";
import { setCookie, getCookie } from "../../../../assets/js/cookie.js";
import {
  generateSheetForResultList,
  getResultRecordList,
  getProjectModuleList,
  generateSheetForScoreListCJ,
  getBoxtaskInfoIdList,
  getSysCourseList,
  getScoreManagementList
} from "../../../common/api.js";
export default {
  name: "AdminList",
  data() {
    return {
      total: 0,
      currentPage: 1,
      pageSize: 10,
      pageData: [],
      loading: false,
      detailData: {},
      useId: "",
      schoolList: "",
      schoolValue: "",
      GradeList: "",
      GradeValue: "",
      classList: "",
      classValue: "",
      serarchValue: "",
      statusList: [
        { name: "未激活", id: 0 },
        { name: "已激活", id: 1 },
        { name: "已冻结", id: 2 },
        { name: "已停用", id: 3 },
        { name: "全部账号状态", id: -1 }
      ],
      statusValue: "",
      projectModuleid: null,
      statusDetail: "",
      projectModuleList: []
    };
  },
  methods: {
     navListScrollLeft(){
      this.$refs.navlist.scrollLeft <= 0?this.$refs.navlist.scrollLeft == 0 : this.$refs.navlist.scrollLeft = this.$refs.navlist.scrollLeft - 100
    },
    navListScrollRight(){
      this.$refs.navlist.scrollLeft = this.$refs.navlist.scrollLeft + 100
    },
    headerClassFn(row, column, rowIndex, columnIndex) {
      return "color:#434343;background:rgba(245,245,245,1);font-size:12px;";
    },
    // 处理页号改变
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.loadData();
    },
    // 加载分页数据 userGradeid userClassid isDisable searchText
    loadData() {
      this.loading = true;
      let _data = {
        systembId: localStorage.getItem("systembIdWah"),
        classId: this.classValue, //班级编号
        gradeId: this.GradeValue, //当前用户id
        schoolId: this.schoolValue,
        searchText: this.serarchValue, //学员姓名
        moduleId: this.projectModuleid,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      };
      getResultRecordList(_data).then(res => {
        this.total = res.data.resultObject.totalCount;
        this.pageData = res.data.resultObject.data;
        this.loading = false;
      });
    },
    // 详情
    detail(index, row) {
      this.$router.push({
        path: "/manageAdmin/scoreAll",
        query: { userId: row.userId, moduleType: 1 }
      });
    },
    // 修改状态
    changeState(index, row, n) {
      this.$confirm("您确定要进行" + n + "操作？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(row.isDisable);
          var isDisableNum;
          if (row.isDisable == 0) {
            isDisableNum = 1;
          } else if (row.isDisable == 1 && row.isFreeze == 1) {
            isDisableNum = 3;
          } else if (row.isDisable == 1 && row.isFreeze == 0) {
            isDisableNum = 2;
          }
          console.log(isDisableNum);
          Vue.http.headers.common["userToken"] = getCookie("userToken");
          this.$http
            .post(
              this.global.modifyCustomerUserById,
              { userId: row.userId, type: isDisableNum },
              { emulateJSON: true }
            )
            .then(
              res => {
                console.log(res);
                this.loadData();
              },
              err => {
                console.log(err);
              }
            );
        })
        .catch(() => {});
    },
    getSchools() {
      Vue.http.headers.common["userToken"] = getCookie("userToken");
      this.$http.get(this.global.getSchools).then(res => {
        if (res.data.status === 200) {
          this.schoolList = res.data.resultObject.data;
        }
      });
    },
    getBoxtaskInfoIdListFn() {
      getBoxtaskInfoIdList(localStorage.getItem("systembIdWah")).then(res => {
        console.log(res);
      });
    },
    getSysCourseListFn() {
      getSysCourseList(localStorage.getItem("systembIdWah")).then(res => {
        this.kc = res.data.resultObject.data;
      });
    },
    schoolChange() {
      console.log(this.schoolValue);
      this.GradeValue = "";
      this.classValue = "";
      Vue.http.headers.common["userToken"] = getCookie("userToken");
      this.$http
        .get(this.global.getGrades + "?schoolId=" + this.schoolValue)
        .then(res => {
          if (res.data.status === 200) {
            console.log(res);
            this.GradeValue = "";
            this.classValue = "";
            this.GradeList = res.data.resultObject.data;
            console.log(this.GradeList);
          }
        });
      this.loadData();
    },
    GradeChange() {
      console.log(this.schoolValue);
      Vue.http.headers.common["userToken"] = getCookie("userToken");
      this.$http
        .get(this.global.getClass + "?userGradeid=" + this.GradeValue)
        .then(res => {
          if (res.data.status === 200) {
            console.log(res);
            this.classValue = "";
            this.classList = res.data.resultObject.data;
            console.log(this.classList);
          }
        });
      this.loadData();
    },
    classChange() {
      this.loadData();
    },
    statusChange() {
      this.loadData();
    },
    searchSubmit() {
      this.loadData();
    },
    outer() {
      generateSheetForResultList({
        moduleId: this.projectModuleid,
        moduleType: 1
      }).then(res => {
        if(res.status == 200){
           window.open(res.data.resultObject);
        }
      });
    },
    choseSystem(id) {
      this.projectModuleid = id;
      this.loadData();
    }
  },
  created() {
    this.getSchools();
    this.getBoxtaskInfoIdListFn();
    this.getSysCourseListFn();
    getProjectModuleList(1).then(res => {
      this.projectModuleList = res.data.resultObject;
      this.projectModuleid = res.data.resultObject[0].id;
      this.loadData();
    });
  }
};
</script>
<style scoped lang="less">
.adminList {
  padding-bottom: 80px;
  .title-icon {
    display: flex;
    justify-content: space-between;
    li {
      flex-basis: 200px;
      font-size: 16px;
    }
    li:first-child {
      padding-top: 10px;
      text-align: left;
      font-weight: bolder;
    }
  }
  .search {
    overflow: hidden;
    margin-top: 13px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .serarchValue {
      width: 300px;
    }
    .search-button {
      width: 110px;
    }
  }
  .lastLi {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-table {
    margin-top: 15px;
    border-radius: 5px;
  }
  .el-pagination {
    margin-top: 20px;
    text-align: right;
  }
  .detailData {
    h2 {
      text-align: left;
      font-size: 18px;
      color: #409eff;
      margin-bottom: 20px;
      text-indent: 20px;
    }
  }
  .navBox {
    margin-top: 20px;
    position: relative;
    .scrollLeft {
      position: absolute;
      height: 100%;
      left: 0;
      top: 0;
      width: 28px;
      cursor: pointer;
      z-index: 999;
      display: flex;
      align-items: center;
      background: rgba(238, 238, 238, 1);
      .leftfont {
        width: 18px;
        height: 16px;
        margin-left: 8px;
        background: url("../../../../assets/images/left.png") no-repeat center;
      }
    }
    .scrollRight {
      position: absolute;
      height: 100%;
      right: 0;
      top: 0;
      width: 28px;
      cursor: pointer;
      z-index: 999;
      display: flex;
      align-items: center;
      background: rgba(238, 238, 238, 1);
      .rightfont {
        width: 18px;
        height: 16px;
        background: url("../../../../assets/images/right.png") no-repeat center;
      }
    }
    .navlist {
      width: 100%;
      padding: 12px 30px 0;
      overflow-x: auto;
      overflow-y: hidden;
      text-align: left;
      white-space: nowrap;
      margin-bottom: 30px;
      -moz-box-sizing: border-box;
      background: rgba(245, 245, 245, 1);
      border: 1px solid rgba(229, 229, 228, 1);
      position: relative;
      box-sizing: border-box;
      li {
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(201, 201, 201, 1);
        border-radius: 10px;
        display: inline-block;
        font-size: 14px;
        margin-left: 5px;
        padding: 10px 20px;
        margin-bottom: 12px;
        cursor: pointer;
        &.active {
          color: #fff;
          background: #0090ff;
          border: 0;
        }
      }
    }
  }

  .wrongTips {
    display: inline-block;
    text-align: left;
    color: #f56c6c;
    width: 100%;
  }
  .green {
    color: #30b44f;
  }
  .el-table {
    font-size: 12px;
  }
  .iconfont-color-blue {
    font-size: 12px;
  }
  .el-button--primary {
    background: #0090ff;
  }
}
</style>
