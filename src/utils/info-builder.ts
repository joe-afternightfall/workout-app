import { SetTextFieldInfoProps } from '../components/shared/set-fields/SetTextField';
import { ActiveSetInfo } from 'workout-app-common-core';

export const buildSetFieldInfo = (
  setInfo: ActiveSetInfo,
  parameterTypeId: string,
  alternateSides: boolean,
  shouldDisplayTimer: boolean
): SetTextFieldInfoProps => {
  return {
    setId: setInfo.setId,
    reps: setInfo.reps,
    weight: setInfo.weight,
    duration: setInfo.duration,
    distance: setInfo.distance,
    parameterTypeId: parameterTypeId,
    alternateSides: alternateSides,
    timers: setInfo.timers,
    shouldDisplayTimer: shouldDisplayTimer,
  };
};
