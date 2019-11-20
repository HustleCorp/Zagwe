import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import {IRoute} from './IRoute';
import {Map} from 'immutable';

export class PrivateRoute extends Component<IRoute, any> {
  render() {
    const {authed, path, component, onUpdate} = this.props;
    return (
      <Route
        onUpdate={onUpdate}
        path={path}
        render={() => {
          return authed ? (() => component)() : <Redirect to="/login" />;
        }}
      />
    );
  }
}

const mapStateToProps = (state: Map<string, any>, nexProps: IRoute) => {
  return {
    authed: state.getIn(['authorize', 'authed']),
  };
};

export default connect(mapStateToProps)(PrivateRoute as any);
