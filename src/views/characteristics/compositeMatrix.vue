<!--特征来源页面 -->
<template>
  <div class="table">
      <el-card class="box-card2">
        <el-table
            :data="dataSource"
            stripe
            :height="600"
            style="width: 100%">
            <el-table-column
            v-for="(item, index) in tableLabel"
            :key="index" 
            :prop="item.prop" 
            :label="item.label">
           </el-table-column>
        </el-table>
      </el-card>
  </div>
</template>

<script>
import { searchCompositeMatrix } from "@/api/login.js";
export default {
  data() {
    return {
      loading: false,
      // 表头
      tableLabel: [],
      //表格数据
      dataSource: []
    };
  },
  created() {
    this.query();
  },
  methods: {
    query() {
      this.loading = true;
      let params = { current: 1, size: 10 };
      searchCompositeMatrix(params)
        .then(res => {
          this.loading = false;
          const tableHeader = res.data[0];
          tableHeader.unshift({
            label: "特征字段",
            prop: "feature_name"
          });
          this.tableLabel = tableHeader;
          const tableData = res.data[1];
          this.dataSource = tableData;
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
  background-size: 100% 100%;
}
.table >>> .box-card2 {
  background-image: url("../../assets/images/home/btmBg.png");
  background-size: 100% 100%;
}
.table >>> .el-card {
  background-color: #080920;
  border: none;
}

.search:hover {
  cursor: pointer;
}
</style>
