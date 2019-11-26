<!-- 模型管理转移矩阵页面 -->
<template>
 <div class="table">
   <el-card class="box-card" style="height:535px;">
   <div class="text item">
<el-table
    :data="tableData"
    style="width: 100%"
    stripe
    element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" 
    element-loading-background="rgba(9, 25, 56, 0.8)" v-loading="loading">
   <el-table-column
      prop="type"
      align="center"
      width="120">
    </el-table-column>
    <el-table-column
      prop="good"
      label="好人"
      align="center"
      :formatter="formatGood">
    </el-table-column>
     <el-table-column
          prop="grey"
          label="灰名单"
          align="center"
          :formatter="formatGrey"
          >
        </el-table-column>
      <el-table-column
        prop="bad"
        label="坏人"
        align="center"
         :formatter="formatBad"
       >
      </el-table-column>
      
  </el-table>
  </div>
</el-card>
 </div>
</template>

<script>
import { getTransferMatrix } from "@/api/login.js";
export default {
  data() {
    return {
      loading: false,
      tableData: [
        //好人
        {
          type: "好人",
          good: "好人保持不变的个数比",
          grey: "从好人到灰名单的个数比",
          bad: "从好人到坏人的个数比"
        },
        {
          type: "计算说明",
          good: "",
          grey: "",
          bad: ""
        },
        //灰名单
        {
          type: "灰名单",
          good: "从灰名单到好人的个数比",
          grey: "保持灰名单不变的个数比",
          bad: "从灰名单到坏人的个数比"
        },
        {
          type: "计算说明",
          good: "",
          grey: "",
          bad: ""
        },
        //坏人
        {
          type: "坏人",
          good: "从坏人到好人的个数比",
          grey: "从坏人到灰名单的个数比",
          bad: "保持坏人不变的个数比"
        },
        {
          type: "计算说明",
          good: "",
          grey: "",
          bad: ""
        }
      ]
    };
  },
  methods: {
    //查询列表
    queryList() {
      this.loading = true;
      getTransferMatrix()
        .then(res => {
          this.loading = false;
          const data = res.data;
          this.tableData[1].good = data.gd2gd;
          this.tableData[1].grey = data.gd2gr;
          this.tableData[1].bad = data.gd2b;
          this.tableData[3].good = data.gr2gd;
          this.tableData[3].grey = data.gr2gr;
          this.tableData[3].bad = data.gr2b;
          this.tableData[5].good = data.b2gd;
          this.tableData[5].grey = data.b2gr;
          this.tableData[5].bad = data.b2b;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //类型格式化
    formatType(row) {
      if (row.type === "计算说明") {
        return <div style="color:red">{row.type}</div>;
      } else {
        return <div>{row.type}</div>;
      }
    },
    // 好人格式化
    formatGood(row) {
      if (typeof row.good === "number" && !isNaN(row.good)) {
        return <div style="color:red">{row.good}</div>;
      } else {
        return <div>{row.good}</div>;
      }
    },
    //灰名单格式化
    formatGrey(row) {
      if (typeof row.grey === "number" && !isNaN(row.grey)) {
        return <div style="color:red">{row.grey}</div>;
      } else {
        return <div>{row.grey}</div>;
      }
    },
    // 坏人格式化
    formatBad(row) {
      if (typeof row.bad === "number" && !isNaN(row.bad)) {
        return <div style="color:red">{row.bad}</div>;
      } else {
        return <div>{row.bad}</div>;
      }
    }
  },
  created() {
    this.queryList();
  }
};
</script>

<style scoped>
.table {
  width: 98%;
  margin: 20px auto;
}
.table >>> .el-card {
  background-color: #080920;
  border: none;
}
.table >>> .el-card {
  background-image: url("../../assets/images/home/btmBg.png");
  background-size: cover;
}
</style>