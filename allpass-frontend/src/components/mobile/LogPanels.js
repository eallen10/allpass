import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import { connect } from 'react-redux';
import { deleteData} from '../../actions/dataActions.js'
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {openDialog} from '../../actions/dialogActions';
import { DECRYPT_DIALOG, YOU_SURE_DIALOG } from '../../constants/dialogConstants.js';
import aes256 from 'aes256';
import {openVerifyDialog} from '../../actions/dialogActions';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    flexBasis: '95%',
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  content: {
    overflow: 'hidden'
  }
}));

function LogPanels(props) {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  let viewPass = (id, mkey, pass, openDialog) => {
    if (mkey) {
      return [
        <Typography key={id} style={{fontSize: "0.875rem"}}>{aes256.decrypt(mkey, pass)}</Typography>
      ]
    } else {
      return [
        <Button key={id} color="primary" style={{fontSize: "0.7rem", marginTop: "-3px", marginLeft: "-7.7px"}} onClick={() => {
          openDialog(DECRYPT_DIALOG);
        }}>decrypt</Button>
      ]
    }
  }
  return (
    <div className={classes.root}>
      {props.records.map(row => (
        <ExpansionPanel
          key={row.id} 
          elevation={3} 
          expanded={expanded === row.id} 
          onChange={handleChange(row.id)}
          style={{marginBottom: '8px'}}
        >
          <ExpansionPanelSummary
            classes={{
              content: classes.content
            }}
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography className={classes.heading} style={{textOverflow: "ellipsis", overflow: "hidden"}}>
              {row.account}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{paddingBottom: "9px"}}>
            <Grid container spacing={3}>
              <Grid item xs={6} style={{paddingTop: 0}}>
                <List style={{padding: 0}}>
                  <ListItem style={{padding: 0, overflowWrap: 'break-word'}}>
                    <ListItemText primary={'Username'} secondary={row.username} />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={6} style={{paddingTop: 0}}>
                <List style={{padding: 0}}>
                  <ListItem style={{padding: 0, overflowWrap: 'break-word'}}>
                    <ListItemText primary={'Password'} secondary={viewPass(row.id, props.mkey, row.pass, props.openDialog)} />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
          <ExpansionPanelActions>
            <Button size="small" color="primary" onClick={() => {
              props.openVerifyDialog('Delete Record', 'Are you sure you wish to delete ' + row.account + "?", props.deleteData, row)
            }}
              >
              Delete
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      ))}
    </div>
  );
}

const mapDispatchToProps = dispatch => {
    return {
      deleteData: id => dispatch(deleteData(id)),
      openDialog: dialog => dispatch(openDialog(dialog)),
      openVerifyDialog: (title, message, action, object) => dispatch(openVerifyDialog(title, message, action, object))
    };
  };
  
  const mapStateToProps = state => ({
    mkey: state.data.mkey
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(LogPanels);