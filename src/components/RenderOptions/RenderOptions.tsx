import * as React from 'react';

import classes from './RenderOptions.module.css'

interface RenderOptionsProps {
  onChangeMaxIterations: (maxIterations: number) => void
  maxIterations: number
  minCornerA: string
  minCornerB: string
  maxCornerA: string
  maxCornerB: string
  refresh: () => void
}

export const RenderOptions: React.SFC<RenderOptionsProps> = ({
  onChangeMaxIterations,
  maxIterations,
  minCornerA,
  minCornerB,
  maxCornerA,
  maxCornerB,
  refresh
}) => (
  <form className={classes.container} onSubmit={e => {
    e.preventDefault()
    refresh()
  }}>
    <div>
      <input
        type="text"
        value={minCornerA}
      />
      <input
        type="text"
        value={minCornerB}
      />
    </div>
    <div>
      <input
        type="text"
        value={maxCornerA}
      />
      <input
        type="text"
        value={maxCornerB}
      />
    </div>
    <input
      type="number"
      onChange={e => onChangeMaxIterations(parseInt(e.target.value))}
      value={maxIterations}
    />
    <input type="submit" value="Refresh"/>
  </form>
)
