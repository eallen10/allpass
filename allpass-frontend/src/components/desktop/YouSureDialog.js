import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { connect } from 'react-redux';
import DialogTitle from '@material-ui/core/DialogTitle';
import { closeDialog } from '../../actions/dialogActions';

class YouSureDialog extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  handleSubmit() {}

  render() {
    return (
      <Dialog
        open={this.props.dialog === 'YOU_SURE_DIALOG'}
        onClose={() => this.props.closeDialog()}
        aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>{this.props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{this.props.message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.props.closeDialog()}>Cancel</Button>
          <Button
            onClick={() => this.props.action(this.props.object.id)}
            color='primary'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeDialog: () => dispatch(closeDialog())
  };
};

const mapStateToProps = state => ({
  dialog: state.dialog.dialog,
  title: state.dialog.title,
  message: state.dialog.message,
  action: state.dialog.action,
  object: state.dialog.object
});

export default connect(mapStateToProps, mapDispatchToProps)(YouSureDialog);
