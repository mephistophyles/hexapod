import React, {Component} from 'react';

const LegPoseInputField = props => {
  return (
    <div className="input-field-widget">
      <label htmlFor={props.name} className="label">{props.name}</label>
      <input
        type="number"
        id={props.name}
        value={props.value}
        className="input"
        onChange={e => props.handleChange(props.name, e.target.value)}
        min={-180}
        max={180}
        step={0.5}
      />
    </div>
  );
}


const TranslateSlider = props => {
  return (
    <div className="slider-container">
      <label htmlFor={props.name} className="label">{props.name}: {props.value}</label>
      <input
        type="range"
        min={-1.0}
        max={1.0}
        step={0.01}
        value={props.value}
        onChange={e => props.handleChange(props.name, e.target.value)}
        className="slider"
      />
    </div>
  );
}


const StanceSlider = props => {
  return (
    <div className="slider-container">
      <label htmlFor="rotx" className="label">rotx</label>
      <input type="range" min={-90} max={90} step={0.5} value={0.0} className="slider"/>
    </div>
  );
}

class LegPoseWidgets extends Component {

  state = {
    alpha: 0,
    beta: 0,
    gamma: 0,
  }

  updateFieldState = (name, value) => {
    value = Math.min(Math.max(value, -180), 180)
    this.setState({ [name]: value })
  }

  render() {
    const inputFields = Object.keys(this.state).map(name => {
      return <LegPoseInputField key={name} name={name} value={this.state[name]} handleChange={this.updateFieldState}/>
    });

    return (
      <div className="column-container">
        <h3>{this.props.name}</h3>
        <form className="row-container">{inputFields}</form>
      </div>
    );
  }
}


class ForwardKinematicsWidgets extends Component {
  render() {
    return (
      <>
        <h2>Forward Kinematics</h2>
        <div className="row-container">
          <LegPoseWidgets name="left-front"/>
          <LegPoseWidgets name="right-front"/>
        </div>
        <div className="row-container">
        <LegPoseWidgets name="left-middle"/>
          <LegPoseWidgets name="right-middle"/>
        </div>
        <div className="row-container">
        <LegPoseWidgets name="left-back"/>
          <LegPoseWidgets name="right-back"/>
        </div>
      </>
    );
  }
}


class InverseKinematicsWidgets extends Component {
  state = {
    tx: 0,
    ty: 0,
    tz: 0,
  }

  updateFieldState = (name, value) => {
    this.setState({ [name]: value })
  }
  render() {
    return (
      <>
        <h2>Inverse Kinematics</h2>
        <div className="row-container">
          <TranslateSlider name="tx" handleChange={this.updateFieldState} value={this.state.tx}/>
          <TranslateSlider name="ty" handleChange={this.updateFieldState} value={this.state.ty}/>
          <TranslateSlider name="tz" handleChange={this.updateFieldState} value={this.state.tz}/>
        </div>
        <div className="row-container"><StanceSlider/><StanceSlider/></div>
      </>
      );
  }
}

export {ForwardKinematicsWidgets, InverseKinematicsWidgets };
