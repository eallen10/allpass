import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import PersonIcon from '@material-ui/icons/Person';
import { withCookies } from 'react-cookie';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import { deleteUser } from '../../actions/adminActions';
import { openVerifyDialog } from '../../actions/dialogActions';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    flexBasis: '95%',
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  content: {
    overflow: 'hidden'
  }
}));
function UserList(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const date = timestamp => {
    if (props.users.length > 0) {
      return new Date(timestamp).toLocaleString();
    } else {
      return null;
    }
  };
  return (
    <div className={classes.root}>
      {props.users
        ? props.users.map(row => (
            <ExpansionPanel
              elevation={3}
              expanded={expanded === row.id}
              onChange={handleChange(row.id)}
              style={{ marginBottom: '8px' }}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                classes={{
                  content: classes.content
                }}>
                <PersonIcon style={{ paddingRight: '12px' }} />
                <Typography
                  style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                  {row.email}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails style={{ paddingBottom: '9px' }}>
                <Grid container spacing={3}>
                  <Grid item xs={6} style={{ paddingTop: 0 }}>
                    <List style={{ padding: 0 }}>
                      <ListItem style={{ padding: 0 }}>
                        <ListItemText
                          primary={'First Name'}
                          secondary={row.fname}
                        />
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item xs={6} style={{ paddingTop: 0 }}>
                    <List style={{ padding: 0 }}>
                      <ListItem style={{ padding: 0 }}>
                        <ListItemText
                          primary={'Last Name'}
                          secondary={row.lname}
                        />
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item xs={6} style={{ paddingTop: 0 }}>
                    <List style={{ padding: 0 }}>
                      <ListItem style={{ padding: 0 }}>
                        <ListItemText
                          primary={'Username'}
                          secondary={row.username}
                        />
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item xs={6} style={{ paddingTop: 0 }}>
                    <List style={{ padding: 0 }}>
                      <ListItem style={{ padding: 0 }}>
                        <ListItemText
                          primary={'Created On'}
                          secondary={date(row.timestamp)}
                        />
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
              <ExpansionPanelActions>
                <Button
                  size='small'
                  color='primary'
                  onClick={() => {
                    props.openVerifyDialog(
                      'Delete User',
                      'Are you sure you wish to delete ' + row.fname + '?',
                      props.deleteUser,
                      row
                    );
                  }}>
                  Delete
                </Button>
              </ExpansionPanelActions>
            </ExpansionPanel>
          ))
        : null}
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    deleteUser: id => dispatch(deleteUser(id)),
    openVerifyDialog: (title, message, action, object) =>
      dispatch(openVerifyDialog(title, message, action, object))
  };
};

const mapStateToProps = state => ({});

export default withCookies(
  connect(mapStateToProps, mapDispatchToProps)(UserList)
);
