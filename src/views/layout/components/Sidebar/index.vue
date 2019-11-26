<template>
<div  class="imgs">
  <el-scrollbar wrapClass="scrollbar-wrapper" style="margin-top:35px;">
    <!-- <logo :isCollapse="isCollapse"></logo> -->
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#04142F"
      text-color="#7ecbe0"
      active-text-color="aqua"
    >
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
  </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";
import logo from "./logo";
export default {
  components: { SidebarItem, logo },
  computed: {
    ...mapGetters(["sidebar", "permission_routers"]),
    isCollapse() {
      return !this.sidebar.opened;
    }
  }
};
</script>
<style scoped>
.imgs {
  /* z-index: 999999 !important; */
  /* background: url("~@/assets/images/home/sideBar.png") no-repeat; */
  /* background-size: contain; */
  height: 1200px;
  /* margin-top: 100px; */
  /* margin-left: 20px; */
}
</style>

