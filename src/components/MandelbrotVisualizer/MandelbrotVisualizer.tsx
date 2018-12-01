import React, { Component } from "react";

import classes from './MandelbrotVisualizer.module.css'
import RegionSelectableCanvas from "../RegionSelectableCanvas/RegionSelectableCanvas";

import { MandelbrotSet } from '../../domain_wasm/mandelbrot';
const MandelbrotModule = import('../../domain_wasm/mandelbrot')

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

    MandelbrotModule.then(({ MandelbrotSet }) => {
      this.mandelbrotSet = new MandelbrotSet(canvas.width, canvas.height)
      this.refreshCanvas()
    })    
  };

  private onChangeSelectedRegion = (startXPx: number, endXPx: number, startYPx: number, endYPx: number) => {
    this.mandelbrotSet.zoom_canvas(startXPx, endXPx, startYPx, endYPx)
    this.refreshCanvas()
  }

  private refreshCanvas () {
    this.props.onChangeBounds(
      this.mandelbrotSet.min_corner_a(), 
      this.mandelbrotSet.min_corner_b(),
      this.mandelbrotSet.max_corner_a(), 
      this.mandelbrotSet.max_corner_b()
    )
    setTimeout(() => {
      console.time("RENDER")
      this.mandelbrotSet.render(this.canvasCtx, this.props.maxIterations)
      console.timeEnd("RENDER")
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
