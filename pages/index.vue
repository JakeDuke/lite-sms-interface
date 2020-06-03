<template>
  <div>
    <b-form @submit.prevent="login">
      <b-form-group
        id="input-group-1"
        label="Please log-in"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="userLogin"
          type="text"
          required
          placeholder="User login"
        />
        <br>
        <b-form-input
          id="input-2"
          v-model="userPW"
          type="password"
          required
          placeholder="Password"
        />
      </b-form-group>
      <b-form-invalid-feedback :state="noError">
        <h3>Wrong Login or Password</h3>
      </b-form-invalid-feedback>
      <b-button type="submit" variant="primary">
        Submit
      </b-button>
    </b-form>
  </div>
</template>

<script>
import md5 from 'js-md5'
import store from 'store2'
export default {
  components: {
  },
  data () {
    return {
      userLogin: '',
      userPW: '',
      noError: null
    }
  },
  methods: {
    login () {
      const { call } = this.$store.state
      const pw = md5(md5(this.userPW) + call)
      this.$axios.$post(`https://api.profisms.cz/index.php?CTRL=user_login&_service=general&_login=${this.userLogin}&_password=${pw}&_call=${call}`)
        .then((res) => {
          if (res.error.code === 0) {
            store.set('login', this.userLogin)
            store.set('password', this.userPW)
            this.$router.push('/userInfo')
          } else {
            this.noError = false
            setTimeout(() => this.noError = null, 3000)
          }
        })
    }
  }
}
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

form {
  min-width: 350px;
}
</style>
