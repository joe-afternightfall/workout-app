import React from 'react';
import { Grid } from '@material-ui/core';
import Blinker from '../../shared/Blinker';
import {
  BuiltSets,
  ActiveSetInfo,
} from '../../../../../configs/models/AppInterfaces';
import CrushedItButton from './components/CrushedItButton';
import StraightSetRow from '../../shared/set-fields/StraightSetRow';

export default function ActiveStraightSet(
  props: ActiveStraightSetProps
): JSX.Element {
  const { builtSets, didItClickHandler, currentSetIndex, lastSegment } = props;
  const straightSets: JSX.Element[] = [];
  let segmentId = '';

  Object.values(builtSets).map((setInfo: ActiveSetInfo[]) => {
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
            didItClickHandler(segmentId, setNumber, lastSet, lastSegment);
          };
          if (info.exercise) {
            activeSet = currentSetIndex === info.setNumber;
            markedDone = info.markedDone;
            lastSet = Object.keys(builtSets).length === info.setNumber;
            return (
              <Blinker
                shouldBlink={activeSet}
                component={
                  <StraightSetRow
                    setNumber={info.setNumber}
                    markedDone={markedDone}
                    activeSet={activeSet}
                    info={{
                      setId: info.setId,
                      reps: info.reps,
                      weight: info.weight,
                      parameterTypeId: info.exercise.parameterTypeId,
                      alternateSides: info.exercise.alternateSides,
                    }}
                    actionButton={
                      <CrushedItButton
                        activeSet={activeSet}
                        markedDone={markedDone}
                        crushedItClickHandler={crushedItHandler}
                      />
                    }
                  />
                }
              />
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
