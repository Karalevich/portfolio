export const debounce = (func: (...args: Array<any>) => void, wait: number) => {
  let timerId: ReturnType<typeof setTimeout> | null = null

  return function (this: any, ...args: Array<any>) {
    clearTimeout(timerId!)

    timerId = setTimeout(() => {
      func.apply(this, args)
      timerId = null
    }, wait)
  }
}
