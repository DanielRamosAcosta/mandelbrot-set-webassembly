import React, { Component } from "react"

import { CanvasBackup } from "./utils/CanvasBackup"

interface RegionSelectableCanvasProps {
  innerRef: (element: HTMLCanvasElement) => void
  onChangeSelectedRegion: (
    selectedAreaStartX: number,
    selectedAreaEndX: number,
    selectedAreaStartY: number,
    selectedAreaEndY: number,
  ) => void
  className: string
}

export class RegionSelectableCanvas extends Component<
  RegionSelectableCanvasProps
> {
  private canvas: HTMLCanvasElement
  private canvasCtx: CanvasRenderingContext2D
  private canvasBackup: CanvasBackup
  private canvasRatio: number

  private originX: number
  private originY: number
  private mouseX: number
  private mouseY: number

  private selectedAreaStartX: number
  private selectedAreaEndX: number
  private selectedAreaStartY: number
  private selectedAreaEndY: number

  private mouseIsDown: boolean

  onRef = (canvas: HTMLCanvasElement) => {
    this.canvas = canvas
    this.canvasCtx = this.canvas.getContext("2d") as CanvasRenderingContext2D
    this.canvasBackup = new CanvasBackup(this.canvas)
    this.canvasRatio = this.canvas.height / this.canvas.width

    this.props.innerRef(canvas)
  }

  constructor(props: any) {
    super(props)
    this.canvas = (null as any) as HTMLCanvasElement
    this.canvasCtx = (null as any) as CanvasRenderingContext2D
    this.canvasBackup = (null as any) as CanvasBackup
    this.canvasRatio = (null as any) as number
    this.originX = 0
    this.originY = 0
    this.mouseX = 0
    this.mouseY = 0
    this.selectedAreaStartX = 0
    this.selectedAreaEndX = 0
    this.selectedAreaStartY = 0
    this.selectedAreaEndY = 0
    this.mouseIsDown = false
  }

  handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    this.mouseIsDown = true
    this.originX = e.pageX
    this.originY = e.pageY

    this.canvasBackup.save()
  }

  handleMouseUp = () => {
    this.mouseIsDown = false
    this.props.onChangeSelectedRegion(
      this.selectedAreaStartX,
      this.selectedAreaEndX,
      this.selectedAreaStartY,
      this.selectedAreaEndY,
    )
  }

  calculateSelectionArea() {
    const xWidth = this.mouseX - this.originX
    const yWidth = this.mouseY - this.originY

    const xPreservingAspectRatioWidth = Math.min(
      xWidth,
      yWidth / this.canvasRatio,
    )
    const yPreservingAspectRatioHeight = Math.min(
      yWidth,
      xWidth * this.canvasRatio,
    )

    const offsetX = (xWidth - xPreservingAspectRatioWidth) / 2
    const offsetY = (yWidth - yPreservingAspectRatioHeight) / 2

    const finalWidth = xPreservingAspectRatioWidth
    const finalHeight = yPreservingAspectRatioHeight

    this.selectedAreaStartX = this.originX + offsetX
    this.selectedAreaStartY = this.originY + offsetY
    this.selectedAreaEndX = this.selectedAreaStartX + finalWidth
    this.selectedAreaEndY = this.selectedAreaStartY + finalHeight
  }

  handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (this.mouseIsDown) {
      this.mouseX = e.pageX
      this.mouseY = e.pageY

      this.calculateSelectionArea()
      this.canvasBackup.restore()
      this.drawRawRect()
      this.drawFixedRect()
    }
  }

  drawRawRect() {
    this.drawRect(
      "#00FF00",
      this.originX,
      this.mouseX,
      this.originY,
      this.mouseY,
    )
  }

  drawFixedRect() {
    this.drawRect(
      "#FF0000",
      this.selectedAreaStartX,
      this.selectedAreaEndX,
      this.selectedAreaStartY,
      this.selectedAreaEndY,
    )
  }

  drawRect(
    color: string,
    startX: number,
    endX: number,
    startY: number,
    endY: number,
  ) {
    this.canvasCtx.strokeStyle = color
    this.canvasCtx.strokeRect(startX, startY, endX - startX, endY - startY)
  }

  render() {
    return (
      <canvas
        ref={this.onRef}
        width={window.innerWidth}
        height={window.innerHeight}
        className={this.props.className}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
      />
    )
  }
}
