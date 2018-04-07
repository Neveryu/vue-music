function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
  let _arr = arr.slice()
  for(let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

export function debounce(func, delay) {
  let timer
  // 返回一个函数a，函数a会延迟执行我们传入的函数
  // 如果在这个delay期间，这个函数又被调用了，那之前的这个定时器就被清空了
  // 我们又会在delay时间后去执行我们新的函数
  return function (...args) {
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
