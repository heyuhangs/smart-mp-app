let tokenCache = null
let userCache = null
let wxUserCache = null

export function getToken() {
  if (tokenCache) {
    return tokenCache
  }

  try {
    const tokenString = uni.getStorageSync('token')
    tokenCache = JSON.parse(tokenString)
  } catch (err) {}

  return tokenCache
}

export function setToken(token) {
  tokenCache = token
  uni.setStorageSync('token', JSON.stringify(token))
}

export function getUser() {
  if (userCache) {
    return userCache
  }

  try {
    const userString = uni.getStorageSync('user')
    userCache = JSON.parse(userString)
  } catch (err) {}

  return userCache
}

export function setUser(user) {
  userCache = user
  uni.setStorageSync('user', JSON.stringify(user))
}

export function getWxUserInfo() {
  if (wxUserCache) {
    return wxUserCache
  }

  try {
    const wxUserString = uni.getStorageSync('wxUser')
    wxUserCache = JSON.parse(wxUserString)
  } catch (err) {}

  return wxUserCache
}

export function setWxUserInfo(wxUser) {
  wxUserCache = wxUser
  uni.setStorageSync('wxUser', JSON.stringify(wxUser))
}

export function clear() {
  tokenCache = null
  userCache = null

  uni.removeStorageSync('token')
  uni.removeStorageSync('session')
}
