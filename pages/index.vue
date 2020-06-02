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
          type="text"
          required
          placeholder="Password"
        />
      </b-form-group>
      <b-form-invalid-feedback :state="noError">
        Wrong Login or Password
      </b-form-invalid-feedback>
      <b-button type="submit" variant="primary">
        Submit
      </b-button>
    </b-form>
  </div>
</template>

<script>
/*eslint-disable */
import md5 from 'js-md5'
export default {
  components: {
  },
  data () {
    return {
      userLogin: '',
      userPW: '',
      noError: true
    }
  },
  methods: {
    login () {
      const { call } = this.$store.state
      const pw = md5(md5(this.userPW) + call)
      this.$axios.$post(`https://api.profisms.cz/index.php?CTRL=user_login&_service=general&_login=${this.userLogin}&_password=${pw}&_call=${call}`)
      .then(res => {
        if (res.error.code === 0) {
          this.$store.commit('login', { login: this.userLogin, password: this.userPW })
          this.$router.push('/userInfo')
        } else {
          console.log(res.error)
          this.noError = false
        }
      })
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
