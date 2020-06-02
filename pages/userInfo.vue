<template>
  <div>
    <b-tabs content-class="mt-3">
      <b-tab title="Account" active>
        <b-table hover :fields="accountFields" :items="accounts" :responsive="true" />
      </b-tab>
      <b-tab title="Payment Info">
        <b-table hover :items="getPaymentInfo" :responsive="true" />
      </b-tab>
      <b-tab title="Address">
        <b-table hover :items="addresses" :responsive="true" />
      </b-tab>
      <b-tab title="Contact">
        <b-table hover :items="contacts" :responsive="true" />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
/*eslint-disable */
export default {
  data () {
    return {
      userLogin: '',
      userPW: '',
      call: '1302885011.45',
      noError: true,
      accounts: [],
      addresses: [],
      contacts: []
    }
  },

  computed: {
    accountFields () {
      if (this.accounts.length > 0) {
        const fields = Object.keys(this.accounts[0])
        fields.pop()
        return fields
      } else {
        return []
      }
    },
    getPaymentInfo () {
      if (this.accounts.length > 0) {
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
      this.$axios.$get(`https://api.profisms.cz/index.php?CTRL=user_info&_service=general&_login=user&_password=67060092181f11e9a41ea8789a111415&_call=1302885011.45`)
        .then((res) => {
          console.log(res)
          this.accounts = res.data.account
          this.addresses = res.data.address
          this.contacts = res.data.contact
        })
    }
  },

  mounted () {
    this.getInfo()
  }
}
</script>

<style>

</style>
