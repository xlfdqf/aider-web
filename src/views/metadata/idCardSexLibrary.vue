<!--身份证号段性别库-->
<template>
 <div class="table">
   <!-- 表格 -->
   <el-card class="box-card2">
     <myTable :columns="columns" :dataSource="dataSource" :hasSelection="false" :hasPagination="false"
      :total="total" @pageChange="pageChange" :loading="loading"></myTable>
</el-card>
 </div>
</template>

<script>
import myTable from "@/components/myTable";
import { getidCardProvinceLibrary } from "@/api/login.js";

export default {
  components: { myTable },
  data() {
    return {
      loading: false,
      current: 1,
      size: 10,
      total: 0,
      dataSource: [
        { code: "单数", result: "男" },
        { code: "双数", result: "女" }
      ],
      columns: [
        {
          prop: "code",
          label: "号段",
          isShow: true
        },
        {
          prop: "result",
          label: "结果",
          isShow: true
        }
      ]
    };
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

.el-button--text {
  color: #7ecbe0;
}
</style>
