import React, { FC, useState } from "react"
import { MandelbrotVisualizer } from "../MandelbrotVisualizer/MandelbrotVisualizer"
import { RenderOptions } from "../RenderOptions/RenderOptions"

export const App: FC = () => {
  const [maxIterations, setMaxIterations] = useState(100)
  const [renderingKey, setRenderingKey] = useState(Math.random())
  const [corners, setCorners] = useState({
    minCornerA: "",
    minCornerB: "",
    maxCornerA: "",
    maxCornerB: "",
  })

  return (
    <div>
      <MandelbrotVisualizer
        renderingKey={renderingKey}
        maxIterations={maxIterations}
        onChangeBounds={setCorners}
      />
      <RenderOptions
        onChangeMaxIterations={setMaxIterations}
        maxIterations={maxIterations}
        refresh={() => setRenderingKey(Math.random())}
        corners={corners}
      />
    </div>
  )
}
