import React, { Component } from "react"

import { sleep } from "./utils/sleep"
import { MandelbrotSetJavaScript } from "../../domain_ts/MandelbrotSetJavascript"
import { RegionSelectableCanvas } from "../RegionSelectableCanvas/RegionSelectableCanvas"
import classes from "./MandelbrotVisualizer.module.css"
import { CanvasPixelDrawer } from "./utils/CanvasPixelDrawer"
import { Color } from "../../domain_ts/Color"
import { MandelbrotSet } from "../../pkg"

let foo: MandelbrotSet
let classss: any

import("../../pkg").then(({ MandelbrotSet }) => {
  classss = MandelbrotSet
})

type Corners = {
  minCornerA: string
  minCornerB: string
  maxCornerA: string
  maxCornerB: string
}

type MandelbrotVisualizerProps = {
  maxIterations: number
  renderingKey: number
  onChangeBounds: (corners: Corners) => void
}

export class MandelbrotVisualizer extends Component<MandelbrotVisualizerProps> {
  private mandelbrotSet: MandelbrotSetJavaScript
  private canvas: HTMLCanvasElement
  private canvasCtx: CanvasRenderingContext2D

  constructor(props: any) {
    super(props)

    this.mandelbrotSet = (null as any) as MandelbrotSetJavaScript
    this.canvasCtx = (null as any) as CanvasRenderingContext2D
    this.canvas = (null as any) as HTMLCanvasElement
  }

  componentDidUpdate(previousProps: MandelbrotVisualizerProps) {
    if (previousProps.renderingKey !== this.props.renderingKey) {
      this.refreshCanvas()
    }
  }

  onRef = (canvas: HTMLCanvasElement) => {
    this.canvas = canvas
    this.canvasCtx = canvas.getContext("2d") as CanvasRenderingContext2D
    this.mandelbrotSet = new MandelbrotSetJavaScript(canvas.width, canvas.height)
    this.refreshCanvas()
  }

  private onChangeSelectedRegion = (
    startXPx: number,
    endXPx: number,
    startYPx: number,
    endYPx: number,
  ) => {
    // this.mandelbrotSet.zoomCanvas(startXPx, endXPx, startYPx, endYPx)
    if (classss) {
      if (foo) {
        foo.zoom_canvas(startXPx, endXPx, startYPx, endYPx)
      }
    }
    this.refreshCanvas()
  }

  private async refreshCanvas() {
    this.props.onChangeBounds({
      minCornerA: this.mandelbrotSet.minCornerA(),
      minCornerB: this.mandelbrotSet.minCornerB(),
      maxCornerA: this.mandelbrotSet.maxCornerA(),
      maxCornerB: this.mandelbrotSet.maxCornerB(),
    })
    await sleep(50)
    console.log("foo", foo)
    if (classss) {
      if (!foo) {
        foo = new classss(this.canvas.width, this.canvas.height)
      }
      console.time("RENDER")
      const something = foo.render(this.canvasCtx, this.props.maxIterations)
      console.log(something)
      console.timeEnd("RENDER")
      var idata = new ImageData(something, this.canvas.width, this.canvas.height)
      this.canvasCtx.putImageData(idata, 0, 0)
    }
    /* const matrix = this.mandelbrotSet.render2(this.props.maxIterations)
    const dataStorage = new CanvasPixelDrawer(this.canvasCtx, this.canvas.width, this.canvas.height)

    for (let y = 0; y < this.canvas.height; y++) {
      for (let x = 0; x < this.canvas.width; x++) {
        const color = matrix.getColor(x, y)
        dataStorage.setColor(x, y, Color.fromRGB(color.r, color.g, color.b))
      }
    }

    this.canvasCtx.putImageData(dataStorage.toImageData(), 0, 0)*/
  }

  render() {
    return (
      <RegionSelectableCanvas
        innerRef={this.onRef}
        className={classes.canvas}
        onChangeSelectedRegion={this.onChangeSelectedRegion}
      />
    )
  }
}
