import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ActiveSetInfo, BuiltSets } from '../../ActiveWorkout';
import { Button, Grid } from '@material-ui/core';
import clsx from 'clsx';
import { isWeightsAndReps } from '../../../../../../utils/active-workout';
import SetTextField from './SetTextField';
import SetDivider from './SetDivider';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: '11.5vh',
      marginBottom: 8,
    },
    bottomRow: {
      borderRadius: '0 0 0 4px',
    },
    inputWrapper: {
      borderRadius: '4px 0 0 4px',
      height: '100%',
      paddingRight: 4,
    },
    baseColor: {
      backgroundColor: '#222323',
    },
    activeOrange: {
      backgroundColor: '#ED440B',
    },
    didItButton: {
      width: '100%',
      height: '100%',
      borderRadius: '0 8px 8px 0',
    },
    done: {
      borderColor: '#ED440B',
      backgroundColor: '#ED440B',
      opacity: 0.6,
    },
  })
);

export default function ActiveStraightSet(
  props: ActiveStraightSetProps
): JSX.Element {
  const classes = useStyles();
  const straightSets: JSX.Element[] = [];
  let segmentId = '';

  Object.values(props.builtSets).map((setInfo: ActiveSetInfo[]) => {
    let activeSet = false;
    let setNumber = -1;
    let markedDone = false;
    let lastSet = false;

    straightSets.push(
      <>
        {setInfo.map((info: ActiveSetInfo, index: number) => {
          segmentId = info.segmentId;
          setNumber = info.setNumber;
          if (info.exercise) {
            activeSet = props.currentSetIndex === info.setNumber;
            markedDone = info.markedDone;
            lastSet = Object.keys(props.builtSets).length === info.setNumber;
            return (
              <Grid
                item
                xs={12}
                container
                alignItems={'center'}
                className={classes.root}
              >
                <Grid
                  item
                  xs={8}
                  container
                  className={clsx(
                    classes.inputWrapper,
                    activeSet ? classes.activeOrange : classes.baseColor,
                    markedDone ? classes.done : undefined
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

                <Grid item xs={4} style={{ height: '100%', paddingLeft: 4 }}>
                  <Button
                    className={clsx(
                      classes.didItButton,
                      activeSet ? classes.activeOrange : classes.baseColor,
                      markedDone ? classes.done : undefined
                    )}
                    onClick={() => {
                      props.didItClickHandler(
                        segmentId,
                        setNumber,
                        lastSet,
                        props.lastSegment
                      );
                    }}
                    disabled={markedDone}
                  >
                    {'Crushed It'}
                  </Button>
                </Grid>
              </Grid>
            );
          }
        })}
      </>
    );
  });

  return <Grid container>{straightSets.map((element) => element)}</Grid>;
}

export interface ActiveStraightSetProps {
  builtSets: BuiltSets;
  currentSetIndex: number;
  didItClickHandler: (
    segmentId: string,
    setNumber: number,
    lastSet: boolean,
    lastSegment: boolean
  ) => void;
  lastSegment: boolean;
}
