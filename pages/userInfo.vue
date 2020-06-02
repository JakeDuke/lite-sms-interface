<template>
  <div>
    <div class="user-main-info my-5">
      <h3>{{ login }}</h3>
      <img src="https://via.placeholder.com/150" alt="">
    </div>
    <b-tabs content-class="mt-3">
      <b-tab title="Account" active>
        <b-table hover :fields="accountFields" :items="accounts" :responsive="true" outlined />
      </b-tab>
      <b-tab title="Payment Info">
        <b-table hover :items="getPaymentInfo" :responsive="true" outlined :stacked="true" />
      </b-tab>
      <b-tab title="Address">
        <b-table hover :items="addresses" :responsive="true" outlined :stacked="true" />
      </b-tab>
      <b-tab title="Contact">
        <b-table hover :items="contacts" :responsive="true" outlined />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
/*eslint-disable */
import md5 from 'js-md5'
import store from 'store2'
export default {
  data () {
    return {
      noError: true,
      login: '',
      accounts: [],
      addresses: [],
      contacts: []
    }
  },

  computed: {
    accountFields () {
      if (this.accounts && this.accounts.length > 0) {
        const fields = Object.keys(this.accounts[0])
        fields.pop()
        return fields
      } else {
        return []
      }
    },
    getPaymentInfo () {
      if (this.accounts && this.accounts.length > 0) {
        let payInfo = []
        this.accounts.map(a => {
          a.payment_info['number'] = a.number
          payInfo.push(a.payment_info)
        })
        return payInfo
      } else {
        return []
      }
    },
  },

  methods: {
    getInfo () {
      const { call } = this.$store.state
      const login = store.get('login')
      const password = store.get('password')
      const pw = md5(md5(password) + call)
      this.$axios.$get(`https://api.profisms.cz/index.php?CTRL=user_info&_service=general&_login=${login}&_password=${pw}&_call=${call}`)
        .then((res) => {
          console.log(res)
          this.accounts = res.data.account
          this.addresses = res.data.address
          this.contacts = res.data.contact
          this.login = res.data.login
        })
    }
  },

  mounted () {
    this.getInfo()
  }
}
</script>

<style>
.user-main-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
