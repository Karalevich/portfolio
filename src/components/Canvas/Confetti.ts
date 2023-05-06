import { range } from "src/utils/range"

const COLORS = [[85, 71, 106], [174, 61, 99], [219, 56, 83], [244, 92, 68], [248, 182, 70]]

const PI_2 = 2 * Math.PI

const drawCircle = (x: number, y: number, r: number, style: string, context: CanvasRenderingContext2D) => {
  // console.log(style)
  context.beginPath()
  context.arc(x, y, r, 0, PI_2, false)
  context.fillStyle = style
  context.fill()
}

export class Confetti {
  private style: number[]
  private rgb: string
  private r: number
  private r2: number
  private opacity!: number
  private dop!: number
  private x!: number
  private y!: number
  private xmax!: number
  private ymax!: number
  private vx!: number
  private vy!: number
  private readonly context: CanvasRenderingContext2D

  constructor(context: CanvasRenderingContext2D, xpos: number, w:number, h:number) {
    this.style = COLORS[~~range(0, 5)]
    this.rgb = `rgba(${this.style[0]},${this.style[1]},${this.style[2]}`
    this.r = ~~range(2, 6)
    this.r2 = 2 * this.r
    this.replace(xpos, w, h)
    this.context = context
  }

  private replace(xpos: number, w:number, h: number): void {
    this.opacity = 0
    this.dop = 0.03 * range(1, 4)
    this.x = range(-this.r2, w - this.r2)
    this.y = range(-20, h - this.r2)
    this.xmax = w - this.r
    this.ymax = h - this.r
    this.vx = range(0, 2) + 8 * xpos - 5
    this.vy = 0.7 * this.r + range(-1, 1)
  }

  public draw(xpos:number, w:number, h: number): void {
    this.x += this.vx
    this.y += this.vy
    this.opacity += this.dop
    if (this.opacity > 1) {
      this.opacity = 1
      this.dop *= -1
    }
    if (this.opacity < 0 || this.y > this.ymax) {
      this.replace(xpos, w, h)
    }
    if (!(0 < this.x && this.x < this.xmax)) {
      this.x = (this.x + this.xmax) % this.xmax
    }
    drawCircle(~~this.x, ~~this.y, this.r, `${this.rgb},${this.opacity}`, this.context)
  }
}