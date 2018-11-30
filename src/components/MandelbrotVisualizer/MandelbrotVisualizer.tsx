import React, { Component } from "react";

import classes from './MandelbrotVisualizer.module.css'
import { MandelbrotSet } from "../../domain_ts/MandelbrotSet";
import { CanvasPixelDrawer } from "./utils/CanvasPixelDrawer";
import RegionSelectableCanvas from "../RegionSelectableCanvas/RegionSelectableCanvas";
import { Color } from "../../domain_ts/Color";

interface MandelbrotVisualizerProps {
  maxIterations: number
  renderingKey: number
  onChangeBounds: (minCornerA: string, minCornerB: string, maxCornerA: string, maxCornerB: string) => void
}

class MandelbrotVisualizer extends Component<MandelbrotVisualizerProps> {
  private mandelbrotSet: MandelbrotSet
  private canvasPixelDrawer: CanvasPixelDrawer
  private canvasCtx: CanvasRenderingContext2D

  constructor (props: any) {
    super(props)

    this.mandelbrotSet = null as any as MandelbrotSet
    this.canvasPixelDrawer = null as any as CanvasPixelDrawer
    this.canvasCtx = null as any as CanvasRenderingContext2D
  }

  componentDidUpdate (previousProps: MandelbrotVisualizerProps) {
    if(previousProps.renderingKey !== this.props.renderingKey) {
      this.refreshCanvas()
    }
  }

  onRef = (canvas: HTMLCanvasElement) => {
    this.canvasPixelDrawer = new CanvasPixelDrawer(canvas)
    this.canvasCtx = canvas.getContext('2d') as CanvasRenderingContext2D 
    this.mandelbrotSet = new MandelbrotSet(canvas.width, canvas.height)
    this.refreshCanvas()    
  };

  private onChangeSelectedRegion = (startXPx: number, endXPx: number, startYPx: number, endYPx: number) => {
    this.mandelbrotSet.zoomCanvas(startXPx, endXPx, startYPx, endYPx)
    this.refreshCanvas()
  }

  private refreshCanvas () {
    this.props.onChangeBounds(
      this.mandelbrotSet.minCornerA(), 
      this.mandelbrotSet.minCornerB(),
      this.mandelbrotSet.maxCornerA(), 
      this.mandelbrotSet.maxCornerB()
    )
    setTimeout(() => {
      console.time("RENDER")
      this.mandelbrotSet.render(this.canvasPixelDrawer, {
        maxIterations: this.props.maxIterations
      })
      console.timeEnd("RENDER")
      this.canvasCtx.putImageData(this.canvasPixelDrawer.toImageData(), 0, 0);
    }, 50)
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
