<template>
 <div class="myTable" v-loading="loading" element-loading-text="拼命加载中" style="width:100%!important"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(9, 25, 56, 0.8)">
  <el-table ref="multipleTable" :data="dataSource" @selection-change="handleSelectionChange" border highlight-current-row width="100%"
    :height="height" :header-cell-style="{background:'#F5F7FA'}" stripe>
    <!--多选框-->
      <el-table-column  align="center" v-if="hasSelection" type="selection" width="55"></el-table-column>
      <!--数据源-->
    <el-table-column v-for="column in columns"
                     v-if="column.isShow"
                     :sortable="column.isSort"
                     :key="column.prop"
                     :prop="column.prop"
                     :label="column.label"
                      align="center"
                      :width="column.width">
                    <template slot-scope="scope">
                       <my-render v-if="column.render" :row="scope.row" :render="column.render"></my-render>
                       <span v-else>
                         {{Array.isArray(scope.row[column.prop])?(scope.row[column.prop]).join(''):scope.row[column.prop]}}
                       </span>
                </template>
    </el-table-column>
    <!--操作栏-->
    <slot name="operate"></slot>
  </el-table>
  <!-- 分页 -->
  <el-pagination
         v-if="hasPagination"
         @size-change="handleSizeChange"
         @current-change="handleCurrentChange"
         :currentPage="page.currentPage" 
         :pageSize="page.pageSize"
         :total="total"
         align="right"
         layout="total, prev, pager, next"
         >
  </el-pagination>
 </div>
</template>

<script>
import MyRender from "./MyRender";
export default {
  name: "myTable",
  components: {
    MyRender
  },
  data() {
    return {
      page: {
        currentPage: 1,
        pageSize: 10
      }
    };
  },
  props: {
    height: Number,
    dataSource: Array,
    columns: Array,
    total: Number,
    width: Number,
    loading: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    //是否可以选择
    hasSelection: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    // 是否分页
    hasPagination: {
      type: Boolean,
      default: function() {
        return false;
      }
    }
  },
  methods: {
    //多选
    handleSelectionChange(val) {
      this.$emit("handleSelectionChange", val);
    },
    // 每页条数
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.$emit("pageChange", this.page);
    },
    // 当前页码
    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.$emit("pageChange", this.page);
    },
    // 选中行(父组件调用的方法)
    selectedSon(row) {
      this.$refs.multipleTable.setCurrentRow(row);
    }
  }
};
</script>

<style scoped>
</style>



