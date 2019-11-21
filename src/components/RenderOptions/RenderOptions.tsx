import React, { FC } from "react"

import classes from "./RenderOptions.module.css"

interface RenderOptionsProps {
  onChangeMaxIterations: (maxIterations: number) => void
  maxIterations: number
  corners: {
    minCornerA: string
    minCornerB: string
    maxCornerA: string
    maxCornerB: string
  }
  refresh: () => void
}

export const RenderOptions: FC<RenderOptionsProps> = ({
  onChangeMaxIterations,
  maxIterations,
  corners,
  refresh,
}) => (
  <form
    className={classes.container}
    onSubmit={e => {
      e.preventDefault()
      refresh()
    }}
  >
    <div>
      <input type="text" value={corners.minCornerA} />
      <input type="text" value={corners.minCornerB} />
    </div>
    <div>
      <input type="text" value={corners.maxCornerA} />
      <input type="text" value={corners.maxCornerB} />
    </div>
    <input
      type="number"
      onChange={e => onChangeMaxIterations(parseInt(e.target.value))}
      value={maxIterations}
    />
    <input type="submit" value="Refresh" />
  </form>
)
