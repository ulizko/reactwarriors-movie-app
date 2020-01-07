import React from 'react';
import { AppContext } from '../App';

export default Component =>
  class AppConextHOC extends React.Component {
    render() {
      return (
        <AppContext.Consumer>
          {context => {
            return <Component {...this.props} {...context} />;
          }}
        </AppContext.Consumer>
      );
    }
  };
