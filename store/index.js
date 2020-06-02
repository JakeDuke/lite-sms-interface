export const state = () => ({
  login: '',
  password: '',
  call: '1302885011.45',
  isLoggedIn: false
})

export const mutations = {
  login (state, { login, password }) {
    state.login = login
    state.password = password
    state.isLoggedIn = true
  }
}
