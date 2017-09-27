import React, { Component } from 'react';

// getComponent is a function that returns a promise for a component
// It will not be called until the first mount
export const asyncComponent = (getComponent) => {
  return class AsyncComponent extends Component {
    static Component = null;
    state = { Component: AsyncComponent.Component };

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(Component => {
          AsyncComponent.Component = Component
          this.setState({ Component })
        });
      }
    }
    render() {
      const { Component } = this.state
      const { component, ...props } = this.props;
      if (Component) {
        return <Component {...props} />
      }
      return null
    }
  }
}
