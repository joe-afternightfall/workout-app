import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import clsx from 'clsx';
import SetTextField from './SetTextField';
import SetDivider from './SetDivider';
import { isWeightsAndReps } from '../../../../../../utils/active-workout';
import { BuiltSets, ActiveSetInfo } from '../../ActiveWorkout';

// todo: need to handle isDuration param type

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: '25vh',
      marginBottom: 16,
    },
    topRow: {
      marginBottom: '.6vh',
      borderRadius: '4px 0 0 0',
    },
    bottomRow: {
      borderRadius: '0 0 0 4px',
    },
    inputRowWrapper: {
      border: '1px solid',
      borderColor: '#222323',
      // borderRadius: 'inherit',
      height: '12.2vh',
      // backgroundColor: '#222323',
    },
    baseColor: {
      borderColor: '#222323',
      backgroundColor: '#222323',
    },
    activeOrange: {
      borderColor: '#ED440B',
      backgroundColor: '#ED440B',
    },
    didItButton: {
      width: '100%',
      height: '100%',
      borderRadius: '0 8px 8px 0',
      // backgroundColor: '#222323',
    },
  })
);

interface SupersetsArray {
  element: JSX.Element;
}

export default function ActiveSuperset(
  props: ActiveSupersetProps
): JSX.Element {
  const classes = useStyles();
  const supersets: JSX.Element[] = [];

  Object.values(props.builtSets).map((setInfo: ActiveSetInfo[]) => {
    let activeSet = false;
    supersets.push(
      <Grid container alignItems={'center'} className={classes.root}>
        <Grid item xs={8} style={{ paddingRight: 4 }}>
          {setInfo.map((info: ActiveSetInfo, index: number) => {
            if (info.exercise) {
              activeSet = props.currentSetIndex === info.setNumber;
              return (
                <Grid
                  item
                  xs={12}
                  container
                  className={clsx(
                    classes.inputRowWrapper,
                    index === 0 ? classes.topRow : classes.bottomRow,
                    activeSet ? classes.activeOrange : classes.baseColor
                  )}
                >
                  {isWeightsAndReps(info.exercise.parameterTypeId) ? (
                    <>
                      <SetTextField
                        value={info.weight}
                        inputAdornment={'lb'}
                        fullLength={false}
                      />

                      <SetDivider />

                      <SetTextField
                        value={info.reps}
                        inputAdornment={'reps'}
                        fullLength={false}
                      />
                    </>
                  ) : (
                    <SetTextField
                      value={info.reps}
                      inputAdornment={'reps'}
                      fullLength={true}
                    />
                  )}
                </Grid>
              );
            }
          })}
        </Grid>
        <Grid item xs={4} style={{ height: '100%' }}>
          <Button
            className={clsx(
              classes.didItButton,
              activeSet ? classes.activeOrange : classes.baseColor
            )}
          >
            {'Did It'}
          </Button>
        </Grid>
      </Grid>
    );
  });

  return <div>{supersets.map((element) => element)}</div>;
}

export interface ActiveSupersetProps {
  builtSets: BuiltSets;
  currentSetIndex: number;
}
