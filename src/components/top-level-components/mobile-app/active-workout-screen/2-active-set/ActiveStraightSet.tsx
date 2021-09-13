import React from 'react';
import BaseSet from './BaseSet';
import { Grid } from '@material-ui/core';
import {
  BuiltSets,
  ActiveSetInfo,
} from '../../../../../configs/models/AppInterfaces';
import CrushedItButton from './components/CrushedItButton';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: '11.5vh',
      marginBottom: 8,
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
        {setInfo.map((info: ActiveSetInfo) => {
          segmentId = info.segmentId;
          setNumber = info.setNumber;
          const crushedItHandler = () => {
            props.didItClickHandler(
              segmentId,
              setNumber,
              lastSet,
              props.lastSegment
            );
          };
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
                <BaseSet
                  superset={false}
                  activeSet={activeSet}
                  markedDone={markedDone}
                  scrollToSetNumber={info.setNumber}
                  info={{
                    reps: info.reps,
                    weight: info.weight,
                    parameterTypeId: info.exercise.parameterTypeId,
                  }}
                />

                <Grid item xs={4} style={{ height: '100%', paddingLeft: 4 }}>
                  <CrushedItButton
                    activeSet={activeSet}
                    markedDone={markedDone}
                    crushedItClickHandler={crushedItHandler}
                  />
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
