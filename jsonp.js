/**
 * jsonp函数
 * @param {String} url 请求的地址
 * @param {Object} params 请求地址携带的params参数
 * @param {Function} callback jsonp执行的回调函数名
 */
function jsonp(url, params, callback) {
  return new Promise((resolve, reject) => {
    // 创建一个script标签
    let script = document.createElement('script')
    // 处理params
    params = JSON.parse(JSON.stringify(params))
    let arrs = []
    for (const key in params) {
      arrs.push(`${key}=${params[key]}`)
    }

    // 拼接JSONP的函数
    arrs.push(`callback=${callback}`)
    // 设置script标签的src
    script.src = `${url}?${arrs.join('&')}`
    // 添加script标签到document中
    document.body.appendChild(script)

    // 在全局window环境中注册一个函数，待服务器调用这个函数，执行Promise的resolve
    window[callback] = (data) => {
      resolve(data)
      // 从body中删除原先添加的script标签
      document.body.removeChild(script)
    }
  })
}

export default jsonp
