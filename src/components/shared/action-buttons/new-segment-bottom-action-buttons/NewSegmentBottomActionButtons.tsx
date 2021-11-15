import React from 'react';
import { Grid } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import BaseActionButton from './components/BaseActionButton';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: '6vh',
      width: '100%',
      zIndex: 5,
      position: 'fixed',
      bottom: 0,
      left: 0,
      background: '#313131',
    },
    rightWrapper: {
      height: '100%',
      paddingLeft: '4px',
    },
    leftWrapper: {
      height: '100%',
      paddingRight: '4px',
    },
  })
);

export default function NewSegmentBottomActionButtons(
  props: NewSegmentBottomActionButtonsProps
): JSX.Element {
  const classes = useStyles();
  const { straightSetClickHandler, superSetClickHandler } = props;
  return (
    <Grid container className={classes.root}>
      <Grid item xs={6} className={classes.leftWrapper}>
        <BaseActionButton
          icon={FitnessCenterIcon}
          buttonTitle={'+ Exercise'}
          clickHandler={straightSetClickHandler}
        />
      </Grid>
      <Grid item xs={6} className={classes.rightWrapper}>
        <BaseActionButton
          icon={LinkIcon}
          buttonTitle={'+ Superset'}
          clickHandler={superSetClickHandler}
        />
      </Grid>
    </Grid>
  );
}

interface NewSegmentBottomActionButtonsProps {
  straightSetClickHandler: () => void;
  superSetClickHandler: () => void;
}
