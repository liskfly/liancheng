<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">登录</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.employeeName"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.docManagerUser"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { findEmployeeRoles, info } from "@/api/index";
export default {
  name: "Login",
  data() {
    return {
      // loginForm: {
      //   username: "111",
      //   password: "123456",
      // },
      loginForm: {
        employeeName: "",
        docManagerUser: "",
      },
      loginRules: {
        employeeName: [{ required: true, trigger: "blur" }],
        docManagerUser: [{ required: true, trigger: "blur" }],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    ...mapMutations(["SET_ROUTE", "SET_NAMEID"]),
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          if (
            this.loginForm.employeeName === "valor" &&
            this.loginForm.docManagerUser === "lckt"
          ) {
            this.$store
              .dispatch("user/login", this.loginForm)
              .then((data) => {
                console.log(1);
            this.$router.push({ path: "/" });
            this.loading = false;
                // info(this.loginForm.employeeName).then(({ data }) => {
                //   // console.log(data.EmployeeId);
                //   findEmployeeRoles(data.EmployeeId).then((res) => {
                //     // console.log(data.content);
                //     let a = [];
                //     res.data.content.forEach((item) => {
                //       a.push(item.xyRoleId);
                //     });
                //     a = a.join(",");
                //     //  console.log(a);
                //     localStorage.setItem("employeeId", a);
                //   });
                // });
                // console.log(this.loginForm.employeeName);
                //  this.$store.dispatch("user/getinfo",this.loginForm.employeeName)
                // console.log(111111);
                // if (data.code == 100200) {
                // let a = this. dataPro(data.content);
                //  this.$store.dispatch("user/getRoute",a);
                // } else {
                //   this.$message({
                //     type: "error",
                //     message: data.msg,
                //   });
                // }
              })
              .catch((data) => {
                console.log(data);
                this.$message({
                  type: "error",
                  message: data,
                });
                this.loading = false;
              });
          }else {
        this.$message.error('账号或密码错误');
                this.loading = false;
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    dataPro(data) {
      let item = [];
      data.map((list, i) => {
        let newData = {};
        newData.path = list.path;
        newData.title = list.title;
        newData.name = list.xyClientMenuName;
        newData.component = list.component;
        // console.log(list.childs);
        newData.children = list.childs ? this.dataPro(list.childs) : []; //如果还有子集，就再次调用自己
        item.push(newData);
      });
      return item;
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
