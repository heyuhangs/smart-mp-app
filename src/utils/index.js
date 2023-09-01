let safeAreaInsertInfo = {
  scaleFactor: 0,
  windowHeight: 0,
  windowWidth: 0,
  statusBarHeight: 0,
  windowContentHeight: 0,
  menuButtonHeight: 0,
  menuButtonWidth: 0,
  menuButtonTop: 0,
  menuButtonRight: 0,
  menuButtonBottom: 0,
  menuButtonLeft: 0,
  navHeight: 0,
  systemInfo: {}
}

export const getUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * uni.getSystemInfoSync() 会阻塞主进程的渲染，getSystemInfoSync不会改变没必要每次都调用
 */
export const initSafeAreaInsertInfo = () => {
  let navHeight = 0
  /****************** 所有平台共有的系统信息 ********************/
  // 设备系统信息
  const systemInfo = uni.getSystemInfoSync()
  // 机型适配比例系数
  const scaleFactor = 750 / systemInfo.windowWidth
  // 当前机型-屏幕高度
  const windowHeight = systemInfo.windowHeight * scaleFactor
  // 当前机型-屏幕宽度
  const windowWidth = systemInfo.windowWidth * scaleFactor
  // 状态栏高度
  const statusBarHeight = systemInfo.statusBarHeight || 1 * scaleFactor

  /****************** 微信小程序头部胶囊信息 ********************/
  // #ifdef MP-WEIXIN
  const safeAreaInserts = uni.getMenuButtonBoundingClientRect()
  // 胶囊高度
  const menuButtonHeight = safeAreaInserts.height * scaleFactor
  // 胶囊宽度
  const menuButtonWidth = safeAreaInserts.width * scaleFactor
  // 胶囊上边界的坐标
  const menuButtonTop = safeAreaInserts.top * scaleFactor
  // 胶囊右边界的坐标
  const menuButtonRight = safeAreaInserts.right * scaleFactor
  // 胶囊下边界的坐标
  const menuButtonBottom = safeAreaInserts.bottom * scaleFactor
  // 胶囊左边界的坐标
  const menuButtonLeft = safeAreaInserts.left * scaleFactor

  // 微信小程序中导航栏高度 = 胶囊高度 + (顶部距离 - 状态栏高度) * 2
  // ** 其他平台如自定义导航栏请使用：状态栏高度+自定义文本高度
  navHeight = menuButtonHeight + (menuButtonTop - statusBarHeight) * 2
  // #endif

  // 除去headerBar内容的高度
  const windowContentHeight = windowHeight - navHeight

  safeAreaInsertInfo = {
    scaleFactor,
    windowHeight,
    windowWidth,
    windowContentHeight,
    statusBarHeight,
    menuButtonHeight,
    menuButtonWidth,
    menuButtonTop,
    menuButtonRight,
    menuButtonBottom,
    menuButtonLeft,
    navHeight,
    systemInfo
  }

  return safeAreaInsertInfo
}

export const getSafeAreaInsertInfo = () => {
  const { windowHeight, menuButtonWidth, menuButtonHeight } = safeAreaInsertInfo

  if (windowHeight === 0 || menuButtonWidth === 0 || menuButtonHeight === 0) {
    return initSafeAreaInsertInfo()
  }

  return safeAreaInsertInfo
}
