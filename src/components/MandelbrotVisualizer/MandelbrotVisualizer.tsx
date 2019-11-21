import React, { Component } from "react"

import { sleep } from "./utils/sleep"
import { RegionSelectableCanvas } from "../RegionSelectableCanvas/RegionSelectableCanvas"
import { IMandelbrotSet } from "../../MandelbrotSet/domain/MandelbrotSet"
import { MandelbrotSetWasm } from "../../MandelbrotSet/infrastructure/MandelbrotSetWasm/MandelbrotSetWasm"
import { MandelbrotSetTypescript } from "../../MandelbrotSet/infrastructure/MandelbrotSetTypescript/MandelbrotSetTypescript"

import classes from "./MandelbrotVisualizer.module.css"

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
  private mandelbrotSet: IMandelbrotSet
  private canvas: HTMLCanvasElement
  private canvasCtx: CanvasRenderingContext2D

  constructor(props: any) {
    super(props)

    this.mandelbrotSet = (null as any) as IMandelbrotSet
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
    this.mandelbrotSet = new MandelbrotSetTypescript(canvas.width, canvas.height)
    this.refreshCanvas()
  }

  private onChangeSelectedRegion = (
    startXPx: number,
    endXPx: number,
    startYPx: number,
    endYPx: number,
  ) => {
    this.mandelbrotSet.zoomCanvas(startXPx, endXPx, startYPx, endYPx).then(() => {
      this.refreshCanvas()
    })
  }

  private async refreshCanvas() {
    this.props.onChangeBounds({
      minCornerA: await this.mandelbrotSet.minCornerA(),
      minCornerB: await this.mandelbrotSet.minCornerB(),
      maxCornerA: await this.mandelbrotSet.maxCornerA(),
      maxCornerB: await this.mandelbrotSet.maxCornerB(),
    })
    await sleep(50)

    const clamped: Uint8ClampedArray = await this.mandelbrotSet.render(this.props.maxIterations)
    const imageData = new ImageData(clamped, this.canvas.width, this.canvas.height)
    this.canvasCtx.putImageData(imageData, 0, 0)
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
