<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
            style="max-width: 600px"
            :model="loginFormData"
            :rules="rules"
            status-icon
            label-width="auto"
            class="login_form"
            ref="checkForm"
        >
          <h1>哈哈臻品</h1>
          <h2>真正的优质选品平台</h2>
          <el-form-item label="用户名" prop="username">
            <el-input :prefix-icon="User" v-model="loginFormData.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
                type="password"
                :prefix-icon="Lock"
                v-model="loginFormData.password"
                show-password
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="loading" class="login_btn" @click="Login">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>

    </el-row>
  </div>
</template>

<script setup lang="ts">
import {User, Lock} from "@element-plus/icons-vue";
import {reactive, ref} from "vue";
import {reqLogin} from "../../api/user";
import useUserStore from "../../store/modules/user";
import {useRoute, useRouter} from "vue-router";
import {ElMessage, ElNotification} from "element-plus";
import {getTime} from "../../utils/time";
import {validate_email, validate_password} from "../../utils/validate";
//userStore 是通过 useUserStore 初始化的，但 useUserStore 是一个函数而非实例
const userStore = useUserStore();
const $router = useRouter();
//收集账号和密码数据
const loginFormData = reactive({
  username: 'admin@qq.com',
  password: 'admin123',
})
//登录按钮加载状态
const loading = ref(false);
/**
 *
 * @param rule 校验规则对象
 * @param value 表单元素文本内容
 * @param callback 函数:如果符合条件callBack放行，不符合注入错误信息
 */
//校验用户名
const validate_name_rules = (rule: any, value: any, callback: any) => {
//封装utils的函数validate_email
  let regEmail = validate_email(value);
  if (value === "") {
    callback(new Error("请输入用户名"));
  } else if (!regEmail) {
    callback(new Error("用户名格式不正确"));
  } else {
    callback();
  }
};
//校验密码
const validate_password_rules = (rule: any, value: any, callback: any) => {
  let regPassword = validate_password(value);
  if (value === "") {
    callback(new Error("请输入密码"));
  } else if (!regPassword) {
    callback(new Error("请输入>=6并且<=20位的密码，包含数字、字母"));
  } else {
    callback();
  }
};
//定义表单校验需要的配置对象
const rules = {
  username: [{validator: validate_name_rules, trigger: "change"}],
  password: [{validator: validate_password_rules, trigger: "change"}]
}
//获取表单组件实例用于校验
const checkForm = ref();
//获取路由对象
const $route = useRoute();
/**
 * 登录
 * @constructor
 */
const Login = async () => {
  //保证所有的表单项校验通过再发请求
  await checkForm.value.validate();
  loading.value = true;
  try {
    await userStore.userLogin(loginFormData);
    //登录的时候判断路由路劲中是否有query参数
    let redirect: any = $route.query.redirect;
    //编程式导航跳转到数据展示页面
    await $router.push({path: redirect || "./"});
    ElNotification({
      type: 'success',
      message: "欢迎回来",
      title: `Hi,${getTime()}`
    })
    loading.value = false;
  } catch (error) {
    loading.value = false;
    ElMessage.error("登录失败,用户名或密码错误！");
  }
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background-size: cover;
  position: fixed;
  background: url('src/assets/loginBackground.svg') no-repeat 45vh 15vh;

  .login_form {
    position: relative;
    width: 60%;
    top: 25vh;
    left: 0vw;
    padding: 10px;
    background: transparent;

    h1 {
      background: linear-gradient(to right, blue, rgb(35, 60, 70));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 45px;
      text-align: center;
      font-weight: 700;
      margin-bottom: 30px;
      margin-top: -10px;
    }

    h2 {
      font-size: 20px;
      margin: 20px 0px;
      text-align: center;
    }

    .login_btn {
      width: 100%;
    }
  }
}

.el-card {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}

@media screen and (max-width: 768px) {
  .login_container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;

    .login_form {
      width: 100%;
      max-width: 400px;
      padding: 40px;
      background: rgba(255, 255, 255, 0.8);
      border-radius: 10px;
      position: static;
      top: auto;
      left: auto;

      h1 {
        font-size: 32px;
        margin-bottom: 30px;
        margin-top: 0;
      }
    }
  }
}
</style>
