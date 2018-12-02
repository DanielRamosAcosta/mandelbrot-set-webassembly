import React, { Component } from "react";

import { sleep } from "./utils/sleep";
import { MandelbrotSet } from "../../domain_ts/MandelbrotSet";
import RegionSelectableCanvas from "../RegionSelectableCanvas/RegionSelectableCanvas";
import classes from './MandelbrotVisualizer.module.css'

interface MandelbrotVisualizerProps {
  maxIterations: number
  renderingKey: number
  onChangeBounds: (minCornerA: string, minCornerB: string, maxCornerA: string, maxCornerB: string) => void
}

class MandelbrotVisualizer extends Component<MandelbrotVisualizerProps> {
  private mandelbrotSet: MandelbrotSet
  private canvasCtx: CanvasRenderingContext2D

  constructor (props: any) {
    super(props)

    this.mandelbrotSet = null as any as MandelbrotSet
    this.canvasCtx = null as any as CanvasRenderingContext2D
  }

  componentDidUpdate (previousProps: MandelbrotVisualizerProps) {
    if(previousProps.renderingKey !== this.props.renderingKey) {
      this.refreshCanvas()
    }
  }

  onRef = (canvas: HTMLCanvasElement) => {
    this.canvasCtx = canvas.getContext('2d') as CanvasRenderingContext2D 
    this.mandelbrotSet = new MandelbrotSet(canvas.width, canvas.height)
    this.refreshCanvas()    
  };

  private onChangeSelectedRegion = (startXPx: number, endXPx: number, startYPx: number, endYPx: number) => {
    this.mandelbrotSet.zoomCanvas(startXPx, endXPx, startYPx, endYPx)
    this.refreshCanvas()
  }

  private async refreshCanvas () {
    this.props.onChangeBounds(
      this.mandelbrotSet.minCornerA(), 
      this.mandelbrotSet.minCornerB(),
      this.mandelbrotSet.maxCornerA(), 
      this.mandelbrotSet.maxCornerB()
    )
    await sleep(50)
    console.time("RENDER")
    this.mandelbrotSet.render(this.canvasCtx, this.props.maxIterations)
    console.timeEnd("RENDER")
  }

  render() {
    return (
      <RegionSelectableCanvas
        innerRef={this.onRef}
        className={classes.canvas}
        onChangeSelectedRegion={this.onChangeSelectedRegion}
      />
    );
  }
}

export default MandelbrotVisualizer
