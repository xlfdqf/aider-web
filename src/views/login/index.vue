<template>
  <div class="login-container pull-height" @keyup.enter.native="handleLogin">
   
    <div class="login-info text-white animated fadeInLeft">
      <div class="logo">
          <!-- <img src="../../assets/images/home/logo2.png" width="300px" height="100px" alt="logo" style="object-fit:contain;vertical-align: middle;" /> -->
          <img src="../../assets/images/home/peitu.png" alt="logo" style="width:400px;height:500px;" />
      </div>
      <!-- <h2 class="login-info-title" style="text-align:center">{{website.info.title}}</h2> -->
    </div>
    <div class="login-border  animated fadeInRight">
      <div class="login-main">
          <userLogin></userLogin>
        <!-- <el-tabs v-model="activeName">
          <el-tab-pane label="用户密码" name="user">
            <userLogin></userLogin>
          </el-tab-pane>
          <el-tab-pane label="短信验证码" name="code">
            <codeLogin></codeLogin>
          </el-tab-pane>
        </el-tabs> -->
      </div>
    </div>
   <p class="tit">智能大数据中台辅助决策系统</p>
  </div>
</template>
<script>
import userLogin from "./userlogin";
import codeLogin from "./codelogin";
import { mapGetters } from "vuex";
export default {
  name: "login",
  components: {
    userLogin,
    codeLogin
  },
  data() {
    return {
      activeName: "user"
    };
  },
  created() {},
  mounted() {},
  computed: {
    ...mapGetters(["website"])
  },
  props: [],
  methods: {}
};
</script>

<style lang="scss">
.tit {
  background: linear-gradient(to bottom, #9be2f1, #60b2cd);
  -webkit-background-clip: text;
  color: transparent;
  font-weight: bold;
  font-size: 40px;
  position: absolute;
  top: 0px;
}
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.2);
  position: relative;
  // height: 900px;
  width: 100%;
  height: 100%;
}
.login-container::before {
  // z-index: -999;
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  // background-image: url("../../assets/images/top_images/login.png");
  background-image: url("../../assets/images/top_images/loginBg.jpg");
  background-size: cover;
}
.login-info {
  z-index: 9;
  margin-right: 50px;
  margin-top: 50px;
  // padding-left: 60px;
}
.login-info-title {
  line-height: 90px;
}
.login-info-item {
  font-size: 14px;
}
.login-border {
  background-image: url("../../assets/images/home/login-box2.png");
  display: flex;
  justify-content: center;
  flex-direction: column;
  // padding: 30px 50px 25px 50px;
  border-radius: 6px;
  width: 650px;
  height: 630px;
  position: relative;
  margin-top: 50px;
  margin-left: 25px;
}
.login-main {
  border-radius: 3px;
  box-sizing: border-box;
  position: absolute;
  top: 90px;
  left: 180px;
}
.login-main > h3 {
  margin-bottom: 20px;
}
.login-main > p {
  color: #76838f;
}
.login-title {
  margin: 0 0 20px;
  text-align: center;
  color: #21baa9;
  letter-spacing: 3px;
}
.login-submit {
  margin-top: 20px;
  width: 100%;
  border-radius: 28px;
}
.login-form {
  margin: 10px 0;
  .el-form-item__content {
    width: 270px;
  }
  .el-form-item {
    margin-bottom: 12px;
  }
  .el-input {
    input {
      text-indent: 5px;
      border-color: #dcdcdc;
      border-radius: 3px;
    }
    .el-input__prefix {
      i {
        padding: 0 5px;
        font-size: 16px !important;
      }
    }
  }
}
.login-code {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 0 0 10px;
}
.login-code-img {
  margin-top: 2px;
  width: 100px;
  height: 32px;
  background-color: #fdfdfd;
  border: 1px solid #f0f0f0;
  color: #333;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 5px;
  line-height: 32px;
  text-indent: 5px;
  text-align: center;
}
</style>