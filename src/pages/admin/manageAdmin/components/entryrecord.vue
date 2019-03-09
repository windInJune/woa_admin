<template>
  <div class="adminList">
    <!-- 表单信息 -->
    <ul class="title-icon">
      <li style="font-size: 14px;
    color: #434343;">学员列表
        <!-- <i class="el-icon-caret-right"></i> -->
      </li>
    </ul>
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
      <li>
        <el-input v-model="serarchValue" placeholder="请输入知号、姓名、学号查询" class="serarchValue"></el-input>
      </li>
      <li>
        <div class="searchs_btn" @click="searchSubmit">查找</div>
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
      <el-table-column prop="userName" label="姓名" width="120"></el-table-column>
      <el-table-column prop="schoolName" label="所属机构"></el-table-column>
      <el-table-column prop="gradeName" label="年级"></el-table-column>
      <el-table-column prop="className" label="班级"></el-table-column>
      <el-table-column prop="inOutTime" label="进出时间" width="260"></el-table-column>
      <el-table-column prop="duration" label="活动时长"></el-table-column>
      <el-table-column prop="iboxName" label="IBOX" width="180"></el-table-column>

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
import { getEntryrecordList} from "../../../common/api.js";
export default {
  name: "AdminList",
  data() {
    return {
      total: 0,
      currentPage: 1,
      pageSize: 10,
      pageData: [],
      loading: false,
      schoolList: "",
      schoolValue: "",
      GradeList: "",
      GradeValue: "",
      classList: "",
      classValue: "",
      serarchValue: "",
      statusValue: "",
      statusDetail: ""
    };
  },
  methods: {
    headerClassFn(row, column, rowIndex, columnIndex) {
      return "color:#434343;background:rgba(245,245,245,1);font-size:12px;";
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.loadData();
    },
    loadData() {
      this.loading = true;
      let _data = {
        systembId:localStorage.getItem("systembId"),
        classId: this.classValue, //班级编号
        searchName: this.serarchValue, //学员姓名
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        schoolId:this.schoolValue,
        gradeId:this.GradeValue
      };
      getEntryrecordList(_data).then(res => {
        if (res.data.status === 200) {
          this.pageData = res.data.resultObject.data;
          this.total = res.data.resultObject.totalCount;
        } else if (res.data.status === 511) {
          this.$router.push({ path: "/" });
        } else {
          alert(res.data.errorMessage);
        }
        this.loading = false;
      });
    },
    getSchools() {
      Vue.http.headers.common["userToken"] = getCookie("userToken");
      this.$http.get(this.global.getSchools).then(res => {
        if (res.data.status === 200) {
          this.schoolList = res.data.resultObject.data;
        }
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
    searchSubmit() {
      this.loadData();
    }
  },
  created() {
    this.loadData()
    this.getSchools();
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
