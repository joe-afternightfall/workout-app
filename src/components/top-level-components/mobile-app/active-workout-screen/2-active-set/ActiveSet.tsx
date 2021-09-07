import clsx from 'clsx';
import React from 'react';
import { Button, Grid } from '@material-ui/core';
import SetDivider from './components/SetDivider';
import SetTextField from './components/SetTextField';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ActiveSetInfo } from '../ActiveWorkout';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: '25vh',
      marginBottom: 16,
    },
    didItButton: {
      width: '100%',
      height: '100%',
      borderRadius: '0 8px 8px 0',
      // backgroundColor: '#222323',
    },
    inputRowWrapper: {
      border: '1px solid',
      borderColor: '#222323',
      borderRadius: 'inherit',
      height: '12.2vh',
    },
    topRow: {
      marginBottom: '.6vh',
      borderRadius: '4px 0 0 0',
    },
    bottomRow: {
      borderRadius: '0 0 0 4px',
    },
    baseColor: {
      borderColor: '#222323',
      backgroundColor: '#222323',
    },
    activeOrange: {
      borderColor: '#ED440B',
      backgroundColor: '#ED440B',
    },
  })
);

export default function ActiveSet(props: ActiveSetProps): JSX.Element {
  const classes = useStyles();

  // const displayColor = props.currentSet
  //   ? classes.activeOrange
  //   : classes.baseColor;
  const displayColor = false;

  return (
    <Grid container alignItems={'center'} className={classes.root}>
      <Grid item xs={8} style={{ paddingRight: 4 }}>
        <Grid
          item
          xs={12}
          container
          className={clsx(
            classes.inputRowWrapper,
            classes.topRow,
            displayColor
          )}
        >
          <SetTextField value={22} inputAdornment={'lb'} fullLength={false} />

          <SetDivider />

          <SetTextField value={22} inputAdornment={'reps'} fullLength={false} />
        </Grid>

        <Grid
          item
          xs={12}
          container
          className={clsx(
            classes.inputRowWrapper,
            classes.bottomRow,
            displayColor
          )}
        >
          <SetTextField value={77} inputAdornment={'lb'} fullLength={false} />

          <SetDivider />

          <SetTextField value={22} inputAdornment={'reps'} fullLength={false} />
        </Grid>
      </Grid>
      <Grid item xs={4} style={{ height: '100%' }}>
        <Button
          className={clsx(classes.didItButton, displayColor)}
          onClick={props.didItClickHandler}
        >
          {'Did It'}
        </Button>
      </Grid>
    </Grid>
  );
}

export interface ActiveSetProps {
  didItClickHandler: () => void;
  activeSetInfo: ActiveSetInfo;
}
