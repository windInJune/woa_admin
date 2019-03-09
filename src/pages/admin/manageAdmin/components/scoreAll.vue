<template>
  <div class="resultcollect">
    <ul class="title-icon">
      <li style="font-size: 14px;
    color: #434343;">
        <span>成绩管理</span>
        <i class="el-icon-caret-right"></i>答题软件
      </li>
    </ul>
    <div class="admincent">
      <div class="searchbox clearb">
        <div class="stuimg">
          <img :src="userObj.userPhoto">
        </div>
        <ul class="stuimgUl">
          <li style="font-size:18px;font-weight:bold;">{{userObj.userName}}</li>
          <li>手机：
            <span>{{userObj.userPhone}}</span>
          </li>
          <li>身份证：
            <span>{{userObj.userCard}}</span>
          </li>
        </ul>
        <h3>
          <i class="iconfont icon-bianji"></i>
          <span>考评成绩汇总</span>
        </h3>
        <el-button class="seabtn uploadbtn" type="primary" @click="upload()">导出</el-button>
      </div>
      <div class="module">
        <ol class="cur clearb">
          <li :class="tagind==3?'checkedol':''" @click="tagind=3;tabind=0;search();">魔方任务</li>
          <li :class="tagind==0?'checkedol':''" @click="tagind=0;tabind=1;search();">隐患排查</li>
          <li :class="tagind==1?'checkedol':''" @click="tagind=1;tabind=1;search();">答题软件</li>
          <li :class="tagind==2?'checkedol':''" @click="tagind=2;tabind=1;search();">抢答软件</li>
        </ol>
      </div>
      <div class="tablebox">
        <el-table :data="tableData" highlight-current-row
      :header-cell-style="headerClassFn"
      style="width: 100%;border:1px solid rgba(229, 229, 228, 1)" >
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column show-overflow-tooltip prop="userName" label="姓名"></el-table-column>
          <el-table-column
            v-for="(tag,ind) in tablemodule[tabind]"
            show-overflow-tooltip
            :key="ind"
            :prop="tag.prop"
            :label="tag.name"
          ></el-table-column>
          <el-table-column show-overflow-tooltip prop="hierarchy" label="层级"></el-table-column>
          <el-table-column show-overflow-tooltip prop="timeCost" label="考试用时">
            <template slot-scope="scope">
              <span>{{scope.row.timeCost | settimems}}</span>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="schoolName" label="考试地点"></el-table-column>
          <el-table-column show-overflow-tooltip prop="finishTime" label="完成时间"></el-table-column>
        </el-table>
      </div>
      <div class="block">
          <el-pagination
            background
            layout="total, prev, pager, next, jumper"
            @current-change="handleCurrentChange"
            :current-page="pageObj.pageNum"
            :page-size="pageObj.pageSize"
            :total="total"
          ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import {getScoreManagementListByUserId,generateSheetForScoreByUserId,getResultRecordListByUserId,generateSheetForResultByUserId,getCustomUserById} from "../../../common/api.js";

export default {
  name: "resultcollect",
  data() {
    return {
      name: "考评成绩汇总",
      // seachobj: {},
      pageObj: {
        pageNum: 1,
        pageSize: 10
      },
      tableData: [],
      total: 0,
      tagind: 3,
      userObj: {},
      tabind: 0,
      tablemodule: [
        [
          { prop: "gradeName", name: "年级" },
          { prop: "className", name: "班级" },
          { prop: "courseName", name: "课程名称" },
          { prop: "taskName", name: "任务名称" },
          { prop: "trainingScore", name: "操作分" },
          { prop: "expandScore", name: "拓展分" }
        ],
        [
          { prop: "projectName", name: "考核模块" },
          { prop: "resultScore", name: "成绩" }
        ]
      ]
    };
  },
  components: {
    // Navrouter
  },
  // computed:{
  // 	...mapGetters({
  // 		getuser:'getuser'
  // 	})
  // },
  mounted() {
    let that = this;
    // this.seachobj["schoolId"] = this.getuser.schoolId;
    this.tagind = this.$route.query.moduleType;
    if (this.tagind < 3) {
      this.tabind = 1;
    } else {
      this.tabind = 0;
    }
    this.search();
    getCustomUserById(this.$route.query.userId).then(res => {
      this.userObj = res.data.resultObject.data;
    });
  },
  methods: {
    headerClassFn(row, column, rowIndex, columnIndex) {
      return "color:#434343;background:rgba(245,245,245,1);font-size:12px;";
    },
    goback() {
      if (this.$route.query.type == 0) {
        this.$router.push({
          path: "/achievement"
        });
      } else {
        this.$router.push({
          path: "/adachievement"
        });
      }
    },
    search() {
      let obj = {
        userId: this.$route.query.userId
      };
      if (this.tagind < 3) {
        let newobj = {
          systembId: localStorage.getItem("systembId"),
          moduleType: this.tagind
        };
        let tag = Object.assign(obj, newobj, this.pageObj);
        getResultRecordListByUserId(tag).then(res => {
          if (res.status == 200) {
            this.tableData = res.data.resultObject.data || [];
            this.total = res.data.resultObject.totalCount;
          }
        });
      } else {
        getScoreManagementListByUserId(obj).then(res => {
            this.tableData = res.data.resultObject.data || [];
            this.total = res.data.resultObject.totalCount;
        });
      }
    },
    handleSizeChange(val) {
      this.pageObj["pageSize"] = val;
      this.search();
    },
    handleCurrentChange(val) {
      this.pageObj["pageNum"] = val;
      this.search();
    },
    //导出
    upload() {
      if (this.tableData.length == 0) {
        this.$message({
          type: "warning",
          message: "没有内容"
        });
        return;
      }
      if (this.tagind < 3) {
        let obj = {
          userId: this.$route.query.userId,
          userName: this.userObj.userName,
          moduleType: this.tagind
        };
        generateSheetForResultByUserId(obj).then(res => {
          if (res.status == 200) {
            window.open(res.data.resultObject);
            this.$message({
              type: "success",
              message: "导出成功"
            });
          }
        });
      } else {
        let obj = {
          userId: this.$route.query.userId,
          userName: this.userObj.userName
        };
        generateSheetForScoreByUserId(obj).then(res => {
          if (res.status == 200) {
            window.open(res.data.resultObject);
            this.$message({
              type: "success",
              message: "导出成功"
            });
          }
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.resultcollect {
  margin: 0 auto;
  .admincent {
    .inpbox {
      width: 360px;
      float: right;
    }
    .seabtn {
      float: right;
      width: 86px;
      height: 36px;
      line-height: 36px;
      padding: 0;
      font-size: 16px;
      margin-top: 120px;
      margin-right: 20px;
      border-radius: 2px;
    }
    .searchbox {
      height: 170px;
      background: #f0f3f5;
      ul {
        float: left;
        width: 236px;
        margin-left: 10px;
        position: relative;
        li {
          line-height: 30px;
          &:first-child {
            font-size: 20px;
            line-height: 44px;
            margin-top: 28px;
          }
        }
        &:after {
          content: "";
          position: absolute;
          top: 35px;
          right: 0;
          width: 1px;
          height: 100px;
          background: #ccc;
        }
      }
      h3 {
        font-size: 30px;
        float: left;
        line-height: 50px;
        margin: 60px 90px;
        i {
          font-size: 30px;
          margin-right: 10px;
        }
      }
    }
    .stuimg {
      width: 76px;
      height: 76px;
      border-radius: 50%;
      float: left;
      margin: 38px 30px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    
    }
      .stuimgUl{
        font-size: 16px;
        margin: 0 !important;
        li{
          text-align: left;
        }
      }
  }
  .tabletit {
    height: 56px;
    background: #f5f5f5;

    p {
      width: 50%;
      float: left;
      line-height: 56px;
      font-size: 16px;
    }
    .pleft {
      color: #434343;
      text-indent: 15px;
    }
    .pright {
      text-align: right;
    }
    .titbtn {
      width: 90px;
      height: 33px;
      line-height: 33px;
      padding: 0;
      border-radius: 4px;
      background: #30b44f;
      border: 0;
      margin-left: 3px;
    }
    .nockeckbtn {
      background: #c6c6c6;
      border-color: #30b44f;
    }
  }
  .tablebox {
    margin-top: 13px;
    td {
      font-size: 12px;
      padding: 8px 0;
    }
  }
  .operation {
    cursor: pointer;
    color: #0090ff;
    line-height: 30px;
    img {
      width: 16px;
      height: 16px;
      margin-top: 7px;
    }
  }
  .del {
    color: #da373b;
  }
  .oper1 {
    margin-right: 15px;
  }
  .module {
    width: 100%;
    height: 54px;
    border: 1px solid rgba(229, 229, 228, 1);
    margin: 14px 0;
    ol {
      height: 54px;
      line-height: 54px;
      background: rgba(245, 245, 245, 1);
      border-bottom: 1px solid rgba(229, 229, 228, 1);
      font-size: 16px;
      li {
        float: left;
        width: 25%;
        position: relative;
        text-align: center;
        cursor: pointer;
        &:before {
          content: "";
          width: 1px;
          height: 35px;
          background: #e5e5e4;
          right: 0;
          top: 9px;
          position: absolute;
        }
        &:last-child {
          &:before {
            width: 0;
          }
        }
      }
      i {
        margin-right: 10px;
        font-size: 18px;
      }
      .checkedol {
        position: relative;
        color: #0090ff;
        &:after {
          position: absolute;
          left: 0;
          bottom: 0;
          content: "";
          width: 100%;
          height: 2px;
          background: #0090ff;
        }
      }
    }
  }
}
</style>
<style lang="less">
.block{
  text-align:right;
  margin:30px 0;
}
#app .resultcollect {
  .el-select {
    width: 120px;
  }
  .uploadbtn {
    background: #30b44f;
    border-color: #30b44f;
  }
}
.title-icon {
    display: flex;
    justify-content: space-between;
    margin-bottom:15px;
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
</style>
