/**
 * 解析歌词字符串
 * 得到一个歌词对象数组
 * 每个歌词对象：
 * {time:开始时间，words:歌词内容}
 */
function parseLrc() {
  var lines = lrc.split('\n');
  var result = []  // 歌词对象数组
  for (var i = 0; i < lines.length; i++) {
    var str = lines[i];
    // 以 ']'来分割
    var parts = str.split(']')
    // 拿到时间字符串
    var timeStr = parts[0].substring(1)
    var obj = {
      time: parseTime(timeStr),
      words: parts[1],
    };
    result.push(obj)
  }
  return result
}



/**将一个时间字符串解析为数字（秒）
 * 
 * @param {string} timeStr 时间字符串
 * @return 
 */
function parseTime(timeStr) {
  var parts = timeStr.split(':');
  // 前面的 + 是将字符串转换为数字，或者*1也可以
  return +parts[0] * 60 + +parts[1]
}
var lrcData = parseLrc()



// 获取需要的dom
var doms = {
  audio: document.querySelector('audio'),
  ul: document.querySelector('.container ul'),
  container: document.querySelector('.container')
}

/**
 * 计算出，在当前播放器播放到第几秒的情况下
 * lrcData数组中，应该高亮显示歌词下标
 * 如果没有任何一句歌词需要显示，则得到-1
 */
function findIndex() {
  // 播放器当前播放时间
  var curTime = doms.audio.currentTime;
  for (var i = 0; i < lrcData.length; i++) {
    if (curTime < lrcData[i].time) {
      // 小于歌词-1
      return  i -1 
    }
  }
  // 找遍的都没有找到（说明播放到最后一句）
  return lrcData.length - 1;
}




// 创建歌词元素li
function createLrcElements() {
  // 文档片段
  var frag = document.createDocumentFragment()
  for (var i = 0; i < lrcData.length; i++) {
    var li = document.createElement('li');
    li.textContent = lrcData[i].words
    frag.appendChild(li);
  }
  doms.ul.appendChild(frag)
}
createLrcElements()




// 容器高度
var containerHeight = doms.container.clientHeight;
// 每个li的高度
var liHeight = doms.ul.children[0].clientHeight;
// 最大偏移量
var maxOffset = doms.ul.clientHeight - containerHeight
console.log(containerHeight, liHeight, maxOffset)
/**
 * 设置ul元素的偏移量
 */
function setOffset() {
  // 获取播放到第几条歌词
  var index = findIndex()
  // 计算ul偏移量
  var offset = liHeight * index + liHeight / 2 - containerHeight / 2
  // 偏移量为负数
  if (offset < 0) {
    offset = 0
  }
  // 最大偏移量
  if (offset > maxOffset) {
    offset = maxOffset
  }
  doms.ul.style.transform = `translateY(-${offset}px)`;
  // 排他
  var li = doms.ul.querySelector('.active')
  if (li) {
    li.classList.remove('active')
  }
  // 这里li存在-1的情况
  li = doms.ul.children[index]
  if (li) {
    li.classList.add('active')
  }
}
// 监听音频播放时间
doms.audio.addEventListener('timeupdate', setOffset)