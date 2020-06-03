<template>
  <div class="page-wrap">
    <b-row>
      <b-col>
        <div class="user-main-info">
          <img src="https://via.placeholder.com/150" alt="">
          <h3>{{ login }}</h3>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <h3 v-if="infoError" class="danger">Server error</h3>
        <b-tabs v-else class="tabs">
          <b-tab title="Account" active>
            <b-table
              hover
              :fields="accountFields"
              :items="accounts"
              :responsive="true"
              outlined
              :stacked="true"
            />
          </b-tab>
          <b-tab title="Payment Info">
            <b-table hover :items="getPaymentInfo" :responsive="true" outlined :stacked="true" />
          </b-tab>
          <b-tab title="Address">
            <b-table hover :items="addresses" :responsive="true" outlined :stacked="true" />
          </b-tab>
          <b-tab title="Contact">
            <b-table hover :items="contacts" :responsive="true" outlined :stacked="true" />
          </b-tab>
        </b-tabs>
      </b-col>
      <b-col>
        <b-form @submit.prevent="sendSms" class="sms-send-form">
          <b-form-group
            id="input-group-1"
            label="Send SMS"
            label-for="input-phone"
          >
            <b-form-input
              id="input-phone"
              v-model="phoneNumber"
              type="tel"
              required
              placeholder="Phone number"
            />
            <br>
            <b-form-textarea
              id="input-text"
              v-model="smsText"
              rows="3"
              max-rows="6"
              required
              placeholder="SMS text"
            />
          </b-form-group>
          <b-form-invalid-feedback :state="smsSent">
            <h3>Error occurred, try again later</h3>
          </b-form-invalid-feedback>
           <b-form-valid-feedback :state="smsSent">
              <h3>SMS was successfully sent</h3>
            </b-form-valid-feedback>
          <b-button type="submit" variant="primary">
            Send SMS
          </b-button>
        </b-form>
        <br>
        <h3 v-if="smsListError" class="danger">Server error</h3>
        <div v-else>
          <b-table
            hover
            :items="smsList"
            :responsive="true"
            outlined
            small
          />
        </div>
        <div class="d-flex justify-content-between">
          <b-button variant="primary" @click="smsStart -= 10" :disabled="smsStart === 0">
            Prev
          </b-button>
          <b-button variant="primary" @click="smsStart += 10">
            Next
          </b-button>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
/*eslint-disable */
import md5 from 'js-md5'
import store from 'store2'
export default {
  data () {
    return {
      url: 'https://api.profisms.cz/index.php?',
      smsSent: null,
      login: '',
      accounts: [],
      addresses: [],
      contacts: [],
      phoneNumber: '',
      smsText: '',
      smsStart: 0,
      smsList: [],
      smsListError: false,
      infoError: false
    }
  },
  watch : {
    smsStart(val) {
      this.getSmsListing()
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
    getLoginAndPw () {
      const { call } = this.$store.state
      const login = store.get('login')
      const password = store.get('password')
      const pw = md5(md5(password) + call)

      return {
        login,
        pw
      }
    },
    processSmsIds (ids) {
      if (ids && ids.length > 0) {
        const result = []
        ids.forEach((prop,index)=> result.push({ number: index + this.smsStart, id: prop }))
        this.smsList = result
      } else {
        this.smsList = []
      }
    },
    getInfo () {
      const { call } = this.$store.state
      this.$axios.$get(`${this.url}CTRL=user_info&_service=general&_login=${this.getLoginAndPw().login}&_password=${this.getLoginAndPw().pw}&_call=${call}`)
        .then((res) => {
          if (res.data) {
            this.accounts = res.data.account
            this.addresses = res.data.address
            this.contacts = res.data.contact
            this.login = res.data.login
          } else {
            this.infoError = true
          }
        })
    },
    getSmsListing () {
      const { call } = this.$store.state
      this.$axios.$get(`${this.url}CTRL=sms_list&_service=sms&_login=${this.getLoginAndPw().login}&_password=${this.getLoginAndPw().pw}&_call=${call}&count=10&start=${this.smsStart}`)
        .then((res) => {
          if (res.data.length > 0) {
            this.processSmsIds(res.data)
            return res.data
          } else {
            this.smsListError = true
          }
        })
    },
    sendSms () {
      const { call } = this.$store.state
      this.$axios.$post(`${this.url}CTRL=sms&_login=${this.getLoginAndPw().login}&_password=${this.getLoginAndPw().pw}&_service=sms&_call=${call}&text=${this.smsText}&msisdn=${this.phoneNumber}`)
        .then((res) => {
          if (res.error.code === 0) {
            this.smsText = ''
            this.phoneNumber = ''
            this.smsSent = true
            setTimeout(() => this.smsSent = null, 3000)
          } else {
            console.log(res.error)
            this.smsSent = false
            setTimeout(() => this.smsSent = null, 3000)
          }
        })
    }
  },

  mounted () {
    this.getInfo()
    this.getSmsListing()
  }
}
</script>

<style lang="scss" scoped>
.page-wrap {
  width: 100%;
  margin-bottom: auto;
  padding: 30px 0;

  .user-main-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .sms-send-form {
    text-align: center;
    max-width: 70%;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
