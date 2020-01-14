import React from 'react';
import { connect } from 'react-redux';
import {
  ADD_LOG_DIALOG,
  CREATE_USER_DIALOG
} from '../../constants/dialogConstants';
import AddLogDialog from './AddLogDialog';
import CreateUserDialog from './CreateUserDialog';

class RootDialog extends React.Component {
  getDialog = () => {
    switch (this.props.dialog) {
      case ADD_LOG_DIALOG:
        return <AddLogDialog />;
      case CREATE_USER_DIALOG:
        return <CreateUserDialog />;
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