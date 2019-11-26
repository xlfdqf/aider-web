<!--顶部导航部分 -->
<template>
  <!-- style="background-color:#080920" -->
  <el-menu class="navbar" mode="horizontal" style="background-color:#09163F;border-bottom:none;">
    <!-- 收起/展开左侧导航按钮 -->
    <nx-hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened" style="margin-top:12px;"></nx-hamburger>
    <img src="@/assets/images/home/logo2.png" width="180" height="50" style="object-fit:contain;margin-top:10px;float:left"/> 
    <p class="tit-logo">智能大数据中台辅助决策系统</p>
    <!-- <img src="@/assets/images/home/logotit.png" style="margin-top:20px;float:left;"/>  -->
    <div class="right-menu">
     
     <!-- <error-log class="errLog-container right-menu-item"></error-log> -->
      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <nx-full-screen class="screenfull right-menu-item"></nx-full-screen>
      </el-tooltip>

      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <!-- <img class="user-avatar" :src="avatar"> -->
          <div style="float:right">
            <div style="color:#7ecbe0;margin-left:10px">{{name}}</div>
          </div>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item >
            <span @click="logout" style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
import nxBreadcrumb from "@/components/nx-breadcrumb";
import nxHamburger from "@/components/nx-hamburger";
import nxFullScreen from "@/components/nx-full-screen/index";
import nxLangSelect from "@/components/nx-lang-select/index";
import nxSkin from "@/components/nx-skin/index";
export default {
  name: "navBar",
  components: {
    nxBreadcrumb,
    nxHamburger,
    nxFullScreen,
    nxLangSelect,
    nxSkin
  },
  computed: {
    ...mapGetters(["sidebar", "name", "avatar"])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("ToggleSideBar");
    },
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload();
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 70px;
  line-height: 70px;
  border-radius: 0px !important;
  .tit-logo{
    background: linear-gradient(to bottom, #9be2f1, #60b2cd);
    -webkit-background-clip: text;
    color: transparent;
    font-weight: bold;
    font-size: 20px;
    height: 50px;
    margin: 0;
    padding: 0;
    float: left;
  }
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container {
    float: left;
  }
  .nx-help {
    display: inline-block;
    vertical-align: top;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international {
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 60px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
