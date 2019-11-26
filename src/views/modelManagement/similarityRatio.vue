<!--模型管理相似度比对页面 -->
<template>
  <div class="table">
     <!-- 表单 -->
 <el-card class="box-card" style="margin-bottom:20px">
          <el-form :inline="true" :model="testForm" ref="testForm" class="demo-form-inline">
            <el-form-item label="准入规则:">
              <el-select v-model="value" placeholder="请选择" @change="selectVal">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
             
            <el-form-item>
              <div class="search" @click="onSubmit(testForm)" style="float:left"><img src="@/assets/images/home/sbtn.png"/></div>
               <div class="search" @click="add" style="float:left;margin-left:20px;"><img src="@/assets/images/home/sbtn2.png" style="width:140px;height:40px;object-fit:fill;"/><span class="searchBtn">添加非准入规则</span> </div>
            </el-form-item>
          </el-form>
      </el-card>
      
      <el-card class="box-card2">
    <myTable :columns="columns" :dataSource="dataSource"  :hasPagination="true"
      :total="total" @pageChange="pageChange" :loading="loading">
       <el-table-column slot="operate" label="操作"  align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="deletes(scope.row)">删除</el-button>
          </template>
        </el-table-column>
     </myTable>
      </el-card>
     
     <!-- 对话框 -->
     <el-dialog title="添加非准入规则" :visible.sync="dialogFormVisible" center>
        <el-form :model="form">
            <el-form-item>
                <el-checkbox :indeterminate="form.isIndeterminate" v-model="form.checkAll" @change="handleCheckAllChange(form.checkAll)">全选</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="form.checkedCities" @change="handleCheckedCitiesChange(form.checkedCities)">
                    <el-checkbox v-for="city in form.cities" :label="city.id" :key="city.id">{{city.featureName}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="info" @click="cancel">取 消</el-button>
            <el-button type="primary" @click="confirm(form)">确 定</el-button>
        </div>
     </el-dialog>

  </div>
</template>

<script>
import myTable from "@/components/myTable";
import {
  getSimilarityRatio,
  searchSimilarityRatio,
  SimilarityRatioDelete
} from "@/api/login.js";
import { message } from "@/utils/util.js";

const cityOptions = [];
export default {
  components: { myTable },
  data() {
    return {
      dialogFormVisible: false,
      height: 600,
      loading: false,
      total: 0,
      testForm: {
        status: ""
      },
      form: {
        checkAll: false,
        checkedCities: [],
        cities: [],
        isIndeterminate: true
      },
      options: [
        {
          value: "1",
          label: "是"
        },
        {
          value: "2",
          label: "否"
        }
      ],
      value: "",
      formLabelWidth: "120px",
      columns: [
        {
          prop: "featureName",
          label: "特征字段",
          isShow: true,
          width: 300
        },
        {
          prop: "status",
          label: "准入特征",
          isShow: true,
          render: function(v, param) {
            if (param.row.status === 1) {
              return "是";
            } else if (param.row.status === 2) {
              return "否";
            }
          }
        },
        {
          prop: "",
          label: "非准入特征",
          isShow: true,
          render: function(v, param) {
            if (param.row.status === 1) {
              return "否";
            } else if (param.row.status === 2) {
              return "是";
            }
          }
        }
      ],
      dataSource: []
    };
  },
  created() {
    this.query();
  },
  methods: {
    // 查询列表
    query() {
      this.loading = true;
      let params = { current: 1, size: 10 };
      getSimilarityRatio()
        .then(res => {
          this.loading = false;
          this.total = res.data.total;
          this.dataSource = res.data.records;
          const data = this.dataSource;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 页码切换
    pageChange(page) {
      this.loading = true;
      let params = { current: page.currentPage, size: page.pageSize };
      getSimilarityRatio(params)
        .then(res => {
          this.loading = false;
          this.total = res.data.total;
          this.dataSource = res.data.records;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //查询非准入规则
    queryNonAccessRules() {
      this.loading = true;
      searchSimilarityRatio()
        .then(res => {
          this.loading = false;
          const data = res.data.records.map(item => {
            return item.featureName;
          });
          this.form.cities = res.data.records;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //删除
    deletes(row) {
      let params = { id: row.id, status: 0 };
      SimilarityRatioDelete(params)
        .then(res => {
          if (res.code === 0) {
            message("删除成功!", "success");
            this.query();
          } else {
            message("删除失败!", "error");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //全选
    handleCheckAllChange(val) {
      const data = this.form.cities.map(item => {
        return item.id;
      });
      this.form.checkedCities = val ? data : [];
      this.form.isIndeterminate = false;
      // console.log("全选id：", this.form.checkedCities);
    },
    //多选
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.form.checkAll = checkedCount === this.form.cities.length;
      this.form.isIndeterminate =
        checkedCount > 0 && checkedCount < this.form.cities.length;
      // console.log("多选：", value);
    },
    // 提交对话框
    confirm(form) {
      console.log(form.checkedCities);
      //  let params = { id: row.id, status: 0 };
      // SimilarityRatioDelete(params)
      //   .then(res => {
      //     if (res.code === 0) {
      //       message("删除成功!", "success");
      //       this.query();
      //     } else {
      //       message("删除失败!", "error");
      //     }
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
    },
    //添加非准入规则
    add() {
      this.dialogFormVisible = true;
      this.queryNonAccessRules();
    },
    cancel() {
      this.dialogFormVisible = false;
    },
    selectVal(val) {
      this.val = val;
    },
    //搜索
    onSubmit(testForm) {
      this.loading = true;
      let params = { status: this.value };
      searchSimilarityRatio(params)
        .then(res => {
          this.loading = false;
          this.total = res.data.total;
          this.dataSource = res.data.records;
          const data = this.dataSource;
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
  background-image: url("../../assets/images/home/btmBg.png");
  background-size: cover;
}
.table >>> .el-card {
  background-color: #080920;
  border: none;
}
.search {
  position: relative;
  padding-top: 5px;
}
.search:hover {
  cursor: pointer;
}
.searchBtn {
  position: absolute;
  top: 5px;
  left: 20px;
  color: #21e9f5;
}
</style>
