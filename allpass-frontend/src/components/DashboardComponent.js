import React, { Component } from 'react';
import { connect } from 'react-redux';

class DashboardComponent extends Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    return (
        <div>Dashboard</div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
  };
};

const mapStateToProps = state => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardComponent);
