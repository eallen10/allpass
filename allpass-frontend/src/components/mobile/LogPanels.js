import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { connect } from 'react-redux';
import {getData} from '../../actions/dataActions.js'
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
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
        <ExpansionPanel 
          elevation={3} 
          expanded={expanded === row.website} 
          onChange={handleChange(row.website)}
          style={{marginBottom: '8px'}}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography className={classes.heading}>
              {row.website}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {row.pass}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )) : null}
    </div>
  );
}

const mapDispatchToProps = dispatch => {
    return {
      getData: () => dispatch(getData())
    };
  };
  
  const mapStateToProps = state => ({
    data: state.data.data
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(LogPanels);