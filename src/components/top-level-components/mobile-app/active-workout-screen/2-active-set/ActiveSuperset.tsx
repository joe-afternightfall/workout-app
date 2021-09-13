import React from 'react';
import BaseSet from './BaseSet';
import { Grid } from '@material-ui/core';
import { ActiveSetInfo } from '../ActiveWorkout';
import { BuiltSets } from '../ActiveWorkoutConnector';
import CrushedItButton from './components/CrushedItButton';
import { createStyles, makeStyles } from '@material-ui/core/styles';

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
  })
);

export default function ActiveSuperset(
  props: ActiveSupersetProps
): JSX.Element {
  const classes = useStyles();
  const supersets: JSX.Element[] = [];
  let segmentId = '';

  Object.values(props.builtSets).map((setInfo: ActiveSetInfo[]) => {
    let activeSet = false;
    let setNumber = -1;
    let markedDone = false;
    let lastSet = false;
    const crushedItHandler = () => {
      props.didItClickHandler(segmentId, setNumber, lastSet, props.lastSegment);
    };

    supersets.push(
      <Grid container alignItems={'center'} className={classes.root}>
        <Grid item xs={8} style={{ paddingRight: 4 }}>
          {setInfo.map((info: ActiveSetInfo, index: number) => {
            segmentId = info.segmentId;
            setNumber = info.setNumber;
            if (info.exercise) {
              activeSet = props.currentSetIndex === info.setNumber;
              markedDone = info.markedDone;
              lastSet = Object.keys(props.builtSets).length === info.setNumber;
              return (
                <BaseSet
                  superset={true}
                  activeSet={activeSet}
                  markedDone={markedDone}
                  scrollToSetNumber={setNumber}
                  extraStyles={index === 0 ? classes.topRow : classes.bottomRow}
                  info={{
                    reps: info.reps,
                    weight: info.weight,
                    parameterTypeId: info.exercise.parameterTypeId,
                  }}
                />
              );
            }
          })}
        </Grid>
        <Grid item xs={4} style={{ height: '100%' }}>
          <CrushedItButton
            activeSet={activeSet}
            markedDone={markedDone}
            crushedItClickHandler={crushedItHandler}
          />
        </Grid>
      </Grid>
    );
  });

  return <div>{supersets.map((element) => element)}</div>;
}

export interface ActiveSupersetProps {
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
