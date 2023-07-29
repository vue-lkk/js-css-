/**
 * @param {持续时间} duration 
 * @param {当前价格} from 
 * @param {打折价格} to 
 * @param {回调函数(参数：string)} onProgress 
 */
function animation(duration, from, to, onProgress) {
  const distance = to - from; //距离
  const speed = distance / duration; // 速度=距离/持续时间 （2999-999)/1000 = -2.7 (负值)

  const startTime = Date.now(); //实时时间
  let value = from //当前的值
  // 调用回调函数，回传参数
  onProgress(value);

  function _run() {
    const now = Date.now(); //实时时间
    const time = now - startTime; // 时间差
    
    // 时间差 > 持续时间
    if (time >= duration) {
      value = to; // 赋予目标数
      // 调用回调函数，回传参数
      onProgress(value)
      return;
    }

    const d = time * speed; 
    value = from + d; // 不断减少
    // 调用回调函数，回传参数
    onProgress(value)
    requestAnimationFrame(_run);
  }
  // window自带函数：请求动画帧
  requestAnimationFrame(_run);
}

