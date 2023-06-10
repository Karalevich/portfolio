export const throttle = (func: (...args: Array<any>) => void, wait: number) => {
  let timerId: ReturnType<typeof setTimeout> | null = null
  let called: Array<any> | null = null
  const check = () => {
    timerId = null
    if (called) {
      func.apply(called[0], called[1])
      called = null
    }
  }

  return function trottled(this: any, ...args: Array<any>) {
    if (timerId) {
      called = [this, args]
    } else {
      func.apply(this, args)
      timerId = setTimeout(check, wait)
    }
  }
}
