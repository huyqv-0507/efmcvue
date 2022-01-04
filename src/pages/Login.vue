<template>
  <div class="login-body">
    <div class="login-wrapper">
      <div class="login-panel">
        <a @click="goDashboard" class="logo">
          <img
            style="width: 300px; height: 100px"
            src="../assets/icons/logo.png"
            alt="e-famedic logo"
          />
        </a>
        <InputText
          v-model="state.userName"
          placeholder="Tên tài khoản"
          @blur="v$.userName.$touch()"
        />
        <span class="error-field" v-if="v$.userName.$error"
          >Vui lòng nhập tài khoản</span
        >

        <Password
          @blur="v$.password.$touch()"
          v-model="state.password"
          placeholder="Mật khẩu"
          :feedback="false"
        />
        <span
          class="error-field" v-if="v$.password.$error">Vui lòng nhâp mật khẩu</span>
        <Button
          label="Đăng nhập"
          type="button"
          style="height: 50px"
          @click="handleLogin()"
        ></Button>
        <span
          class="error-field">{{error.message}}</span>
        <a href="#">Quên mật khẩu?</a>
        <p>Bạn chưa có tài khoản, <a href="#">Đăng ký</a></p>
      </div>
      <div class="login-footer">
        <h4>e-Famedic</h4>
        <h6>Copyright Ⓒ eFamedic Systems</h6>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { computed, reactive } from 'vue'
import { mapActions, mapState } from 'vuex'
export default {
  computed: {
    ...mapState('authentication', ['error'])
  },
  setup () {
    const state = reactive({
      userName: '',
      password: ''
    })

    const rules = computed(() => {
      return {
        userName: { required },
        password: { required }
      }
    })

    const v$ = useVuelidate(rules, state)
    return {
      state,
      v$
    }
  },
  methods: {
    goDashboard () {
      window.location = '/#/'
    },
    ...mapActions('authentication', ['login']),
    handleLogin () {
      this.v$.$validate()
      this.login({ userName: this.state.userName, password: this.state.password })
    }
  }
}
</script>
<style lang="scss" scoped>
.error-field {
  color: red;
  margin-bottom: 0.5em;
}
</style>
