import React, { Component } from 'react';
import MandelbrotVisualizer from './MandelbrotVisualizer/MandelbrotVisualizer';
import { RenderOptions } from './RenderOptions/RenderOptions';

class App extends Component {
  state = {
    maxIterations: 500,
    renderingKey: Math.random(),
    minCornerA: "",
    minCornerB: "",
    maxCornerA: "",
    maxCornerB: "",
  }

  onChangeMaxIterations = (maxIterations: number) => {
    this.setState({
      maxIterations
    })
  }

  refresh = () => {
    this.setState({
      renderingKey: Math.random()
    })
  }

  render() {
    return (
      <div>
        <MandelbrotVisualizer
          renderingKey={this.state.renderingKey}
          maxIterations={this.state.maxIterations}
          onChangeBounds={(minCornerA, minCornerB, maxCornerA, maxCornerB) => this.setState({
            minCornerA,
            minCornerB,
            maxCornerA,
            maxCornerB
          })}
        />
        <RenderOptions
          onChangeMaxIterations={this.onChangeMaxIterations}
          maxIterations={this.state.maxIterations}
          refresh={this.refresh}
          minCornerA={this.state.minCornerA}
          minCornerB={this.state.minCornerB}
          maxCornerA={this.state.maxCornerA}
          maxCornerB={this.state.maxCornerB}
        />
      </div>
    );
  }
}

export default App;
