<template>
  <div>

  </div>
</template>

<script>
/*eslint-disable */
export default {
  data () {
    return {
      smsText: '',
      phoneNumber: '',
      call: '1302885011.45',
      noError: true
    }
  },
  methods: {
    getInfo () {
      this.$axios.$get(`https://api.profisms.cz/index.php?CTRL=sms&_service=sms&_login=user&_password=67060092181f11e9a41ea8789a111415&_call=${this.call}`)
        .then((res) => {
          console.log(res)
        })
    },

    sendSms () {
      // const pw = md5(md5(this.userPW) + this.call)
      // console.log(pw)
      this.$axios.$post(`https://api.profisms.cz/index.php?CTRL=sms&_login=user&_password=67060092181f11e9a41ea8789a111415&_service=sms&_call=${this.call}&text=Ahoj%2C+jak+seeeeee+m%C3%A1%C5%A1%3F&msisdn=%2B420605582922`)
    }
  },

  mounted () {
    this.getInfo()
    // this.sendSms()
  }
}
</script>

<style>

</style>
