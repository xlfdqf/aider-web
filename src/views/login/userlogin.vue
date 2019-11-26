<template>
  <el-form class="login-form" status-icon :rules="loginRules" ref="loginForm" :model="loginForm" label-width="0">
    <el-form-item prop="username" style="position:relative">
      <el-input size="small" @keyup.enter.native="handleLogin" v-model="loginForm.username" auto-complete="off" placeholder="请输入用户名">
        <i slot="prefix" class="icon-yonghu" style="color:#40B1F9"></i>
      </el-input>
       <!-- <img class="pwdimg" src="../../assets/images/toux.png"/> -->
        <!-- <el-select size="small" v-model="loginForm.username" placeholder="请选择用户" auto-complete="off">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select> -->
    </el-form-item>
    <el-form-item prop="password" style="position:relative">
      <el-input size="small" @keyup.enter.native="handleLogin" :type="passwordType" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码">
        <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword" style="color:#40B1F9"></i>
         <i slot="prefix" class="icon-mima" style="color:#40B1F9"></i> 
      </el-input>
    </el-form-item>
    <el-form-item style="margin-bottom:0px;">
    <el-checkbox v-model="record" @change="recordOpen" style="float:right;">录制片头</el-checkbox>
    <el-checkbox v-model="checked" @change="remenberPwd" style="float:right;margin-right:20px;">记住密码</el-checkbox>
    </el-form-item>
    <el-form-item class="login-btn" @click.native.prevent="handleLogin">
      <img src="@/assets/images/home/login-btn2.png" style="margin-top:20px;" /><span style="position:absolute;top:26px;left:126px;color:#1BC2D6;font-size:18px"></span>
    </el-form-item>
  </el-form>
</template>

<script>
import { isvalidUsername } from "@/utils/validate";
export default {
  name: "userlogin",
  data() {
    const validateCode = (rule, value, callback) => {
      if (this.code.value !== value) {
        this.loginForm.code = "";
        this.refreshCode();
        callback(new Error("请输入正确的验证码"));
      } else {
        callback();
      }
    };
    const validatePwd = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入密码"));
      } else {
        // if (
        //   this.loginForm.username !== "payee" ||
        //   this.loginForm.password !== "cGF5ZWU="
        // ) {
        //   callback(new Error("用户名或密码错误"));
        // }
        callback();
      }
    };
    return {
      options: [
        {
          value: "admin",
          label: "admin"
        },
        {
          value: "editor",
          label: "editor"
        },
        {
          value: "payee",
          label: "payee"
        }
      ],
      loginForm: {
        username: localStorage.getItem("username"),
        password: localStorage.getItem("password"),
        code: ""
      },
      checked: JSON.parse(localStorage.getItem("checked")),
      record: false,
      code: {
        src: "",
        value: "",
        len: 4,
        type: "text"
      },
      loginRules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            validator: validatePwd
          }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "验证码长度为4位", trigger: "blur" },
          { required: true, trigger: "blur", validator: validateCode }
        ]
      },
      passwordType: "password"
    };
  },
  methods: {
    showPassword() {
      this.passwordType === ""
        ? (this.passwordType = "password")
        : (this.passwordType = "");
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store
            .dispatch("Login", this.loginForm)
            .then(res => {
              this.remenberPwd();
              this.$router.push({ path: "/dashboard/dashboard" });
            })
            .catch(err => {
              this.$message.error(err.msg);
            });
        }
      });
    },
    remenberPwd() {
      let username = this.loginForm.username;
      let password = this.loginForm.password;
      if (this.checked) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        localStorage.setItem("checked", this.checked);
      } else {
        localStorage.setItem("username", "");
        localStorage.setItem("password", "");
        localStorage.setItem("checked", false);
      }
    },
    recordOpen() {
      // console.log(this.record);
    }
  }
};
</script>
<style scoped>
.login-btn {
  position: relative;
}
.login-btn:hover {
  cursor: pointer;
}
.pwdimg {
  border-style: none;
  position: absolute;
  z-index: 1000;
  top: 100;
  top: 12px;
  left: 4px;
}
.login-form >>> .el-input--suffix .el-input__inner {
  padding-right: 100px !important;
}
.login-form >>> .el-input__inner {
  background-color: #152c6f !important;
  border: 1px solid #2060a2 !important;
  color: #40b1f9 !important;
}
.login-form >>> .el-checkbox__inner {
  background-color: #152c6f;
  border: 1px solid #2060a2;
  color: #40b1f9;
}
.login-form >>> .el-checkbox {
  color: #ccc;
}
.login-form >>> .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #40b1f9;
}
</style>
