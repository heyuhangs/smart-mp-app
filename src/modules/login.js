import { setUser } from '@/store/token'
import { getLoginUserInfo } from '@/service/login'

export async function initUserStore() {
  const { code, data } = await getLoginUserInfo()
  if (code === 200 && data) {
    setUser(data)
    return true
  }

  return false
}

export function loginSuccess() {
  initUserStore()
}
