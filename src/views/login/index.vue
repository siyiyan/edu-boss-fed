<template>
  <div class="login">
    <!--
      1.:model='ruleForm'
      2.:rules='rules'
      3.ref='ruleForm'
      4.el-form-item 绑定 prop 属性
      5.validate 返回 promise，要await一下
    -->
    <el-form
      class="login-form"
      ref="form"
      label-position="top"
      :model="form"
      :rules="rules"
      label-width="80px">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
        type="primary"
        class="login-btn"
        @click="onSubmit"
        :loading="isLoginLoading"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { login } from '@/services/user'

export default Vue.extend({
  name: 'LoginIndex',
  data () {
    return {
      form: {
        phone: '18201288771',
        password: '111111'
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      },
      isLoginLoading: false
    }
  },
  methods: {
    async onSubmit () {
      // 登录按钮 Loading
      this.isLoginLoading = true
      try {
        // 表单验证
        await (this.$refs.form as Form).validate()
        // 验证通过 -》 提交表单
        const { data } = await login(this.form)
        // const { data } = await request({
        //   method: 'POST',
        //   url: '/front/user/login',
        //   headers: { 'content-type': 'application/x-www-form-urlencoded' },
        //   data: qs.stringify(this.form)
        // })
        // console.log(data)
        // 处理请求结果
        // 失败：给出提示
        if (data.state !== 1) {
          return this.$message.error(data.message)
        } else {
          // 1.登录成功，记录登录状态，状态需要能够全局访问 （放到 Vuex 容器中）
          this.$store.commit('setUser', data.content)
          // 2.然后在访问需要登录的页面的时候判断有没有登录状态 （路由拦截器）
          // 成功：跳转回原来页面或首页
          this.$router.push({
            name: 'home'
          })
          this.$message.success('登录成功')
        }
      } catch (error) {
        console.log('', error)
      }

      // 结束登录按钮的 loading
      this.isLoginLoading = false
    }
  }
})
</script>

<style lang="scss" scoped>
  .login{
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-form{
      width: 300px;
      background: #ffffff;
      padding: 20px;
      border-radius: 5px;
    }
    .login-btn{
      width: 100%;
    }
  }
</style>
