import React from 'react';
import { connect } from 'react-redux';
import {
  ADD_LOG_DIALOG,
  CREATE_USER_DIALOG,
  DECRYPT_DIALOG,
  YOU_SURE_DIALOG
} from '../../constants/dialogConstants';
import AddLogDialog from './AddLogDialog';
import CreateUserDialog from './CreateUserDialog';
import DecryptDialog from './DecryptDialog';
import YouSureDialog from './YouSureDialog';

class RootDialog extends React.Component {
  getDialog = () => {
    switch (this.props.dialog) {
      case ADD_LOG_DIALOG:
        return <AddLogDialog />;
      case CREATE_USER_DIALOG:
        return <CreateUserDialog />;
      case DECRYPT_DIALOG:
        return <DecryptDialog />;
      case YOU_SURE_DIALOG:
        return <YouSureDialog />;
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
