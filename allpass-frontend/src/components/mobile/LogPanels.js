import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import { connect } from 'react-redux';
import {getData, deleteData} from '../../actions/dataActions.js'
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';

const testData = 
  [
    {account: 'google', username: 'username', pass: 'password' }
  ]


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    flexBasis: '33.33%',
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

function LogPanels(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      {props.data ? props.data.map(row => (
      // {testData ? testData.map(row => ( 
        <ExpansionPanel 
          elevation={3} 
          expanded={expanded === row.id} 
          onChange={handleChange(row.id)}
          style={{marginBottom: '8px'}}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography className={classes.heading}>
              {row.account}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{paddingBottom: "9px"}}>
            <Grid container spacing={3}>
              <Grid item xs={6} style={{paddingTop: 0}}>
                <List style={{padding: 0}}>
                  <ListItem style={{padding: 0}}>
                    <ListItemText primary={'Username'} secondary={row.username} />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={6} style={{paddingTop: 0}}>
                <List style={{padding: 0}}>
                  <ListItem style={{padding: 0}}>
                    <ListItemText primary={'Password'} secondary={row.pass} />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
            {/* <IconButton aria-label="delete" disabled color="primary"  
            onClick={event => event.stopPropagation()
              // props.deleteData(row.id)
          }
          >
            <DeleteIcon  />
          </IconButton> */}
          </ExpansionPanelDetails>
          <ExpansionPanelActions>
            <Button size="small" color="primary" onClick={() => {
              // console.log("delete");
              props.deleteData(row.id)
            }}
              >
              Delete
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      )) : null}
    </div>
  );
}

const mapDispatchToProps = dispatch => {
    return {
      getData: () => dispatch(getData()),
      deleteData: id => dispatch(deleteData(id))
    };
  };
  
  const mapStateToProps = state => ({
    data: state.data.data
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(LogPanels);