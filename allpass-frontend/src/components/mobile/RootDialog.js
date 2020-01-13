import React from 'react';
import { connect } from 'react-redux';
import {
  ADD_LOG_DIALOG
} from '../../constants/dialogConstants';
import AddLogDialog from './AddLogDialog';

class RootDialog extends React.Component {
  getDialog = () => {
    switch (this.props.dialog) {
      case ADD_LOG_DIALOG:
        return <AddLogDialog />;
      default:
        return null; //required because render() must return something
    }
  };

  render() {
    return this.getDialog();
  }
}

const mapStateToProps = state => ({
  dialog: state.dialog.dialog
});

export default connect(mapStateToProps)(RootDialog);