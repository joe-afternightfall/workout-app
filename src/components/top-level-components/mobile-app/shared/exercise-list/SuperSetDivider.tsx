import React from 'react';
import {
  Grid,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { State } from '../../../../../configs/redux/store';
import { connect } from 'react-redux';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: 0,
    },
    itemIcon: {
      height: 0,
      width: '13.5vh',
      marginRight: 12,
    },
    dividerWrapper: {
      marginTop: -12,
    },
    link: {
      marginLeft: 8,
      height: 22,
    },
  })
);

const SuperSetDivider = (props: SuperSetDividerProps): JSX.Element => {
  const classes = useStyles();
  const { shrink } = props;

  return (
    <ListItem className={classes.root}>
      <ListItemIcon className={classes.itemIcon} />
      <ListItemText
        disableTypography
        className={classes.dividerWrapper}
        primary={
          <Grid item xs={shrink ? 8 : 12} container alignItems={'center'}>
            <Grid item xs={10}>
              <Divider variant={'fullWidth'} />
            </Grid>
            <Grid item xs={2} container alignItems={'center'}>
              <LinkIcon className={classes.link} />
            </Grid>
          </Grid>
        }
      />
    </ListItem>
  );
};

interface SuperSetDividerProps {
  shrink: boolean;
}

const mapStateToProps = (state: State): SuperSetDividerProps => {
  return {
    shrink: state.workoutState.displayEditPreviewList,
  } as unknown as SuperSetDividerProps;
};

export default connect(mapStateToProps)(SuperSetDivider);
