import React from 'react';
import { Grid } from '@material-ui/core';
import CrushedItButton from './components/CrushedItButton';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
  NightfallBlinker,
  BuiltSets,
  ActiveSetInfo,
} from 'workout-app-common-core';
import BaseSet from '../../../shared/set-fields/BaseSet';
import { buildSetFieldInfo } from '../../../../utils/info-builder';

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

export default function ActiveSuperset({
  builtSets,
  currentSetIndex,
  didItClickHandler,
  lastSegment,
}: ActiveSupersetProps): JSX.Element {
  const classes = useStyles();
  const supersets: JSX.Element[] = [];
  let segmentId = '';

  Object.values(builtSets).map((setInfo: ActiveSetInfo[], index: number) => {
    let activeSet = false;
    let setNumber = -1;
    let markedDone = false;
    let lastSet = false;
    const crushedItHandler = () => {
      didItClickHandler(segmentId, setNumber, lastSet, lastSegment);
    };

    supersets.push(
      <NightfallBlinker
        key={index}
        shouldBlink={currentSetIndex === index + 1}
        component={
          <Grid container alignItems={'center'} className={classes.root}>
            <Grid item xs={8} style={{ paddingRight: 4 }}>
              {setInfo.map((info: ActiveSetInfo, index: number) => {
                segmentId = info.segmentId;
                setNumber = info.setNumber;
                if (info.exercise) {
                  activeSet = currentSetIndex === info.setNumber;
                  markedDone = info.markedDone;
                  lastSet = Object.keys(builtSets).length === info.setNumber;
                  return (
                    <BaseSet
                      key={info.setId}
                      superset={true}
                      activeSet={activeSet}
                      markedDone={markedDone}
                      scrollToSetNumber={setNumber}
                      extraStyles={
                        index === 0 ? classes.topRow : classes.bottomRow
                      }
                      info={buildSetFieldInfo(
                        info,
                        info.exercise.parameterTypeId,
                        info.exercise.alternateSides,
                        true
                      )}
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
        }
      />
    );
  });

  return <div>{supersets.map((element) => element)}</div>;
}

interface ActiveSupersetProps {
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
