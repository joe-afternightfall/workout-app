import * as ramda from 'ramda';
import { v4 as uuidv4 } from 'uuid';
import { Phase, Set } from 'workout-app-common-core';
import { SetTextFieldTypes } from '../configs/types';

export const deleteSegmentFromPhase = (
  phases: Phase[],
  segmentId: string
): Phase[] => {
  const clonedPhases = ramda.clone(phases);
  clonedPhases.map((phase) => {
    phase.segments.map((segment) => {
      if (segment.id === segmentId) {
        const foundIndex = phase.segments.indexOf(segment);
        phase.segments.splice(foundIndex, 1);
        phase.segments.map((segment, index) => {
          segment.order = index + 1;
        });
      }
    });
  });
  return clonedPhases;
};

export const updateSet = (
  phase: Phase | undefined,
  setId: string,
  value: number,
  name: SetTextFieldTypes
): void => {
  phase &&
    phase.segments.map((segment) => {
      segment.exercises.map((exercise) => {
        exercise.sets.map((set) => {
          if (set.id === setId) {
            if (name === 'duration') {
              if (set.duration) {
                set.duration.seconds = value;
              }
            } else if (name === 'distance') {
              if (set.distance) {
                set.distance.value = value;
                // todo: come back and start to pass in or retrieve distance unit
                // todo: get this value from ExerciseVO itself, start to ask for unit type in admin center
                set.distance.unit = 'miles';
              }
            } else {
              set[name] = value;
            }
          }
        });
      });
    });
};

export const buildBaseSets = (amount: number): Set[] => {
  let i = 0;
  const baseSets: Set[] = [];

  while (amount > i) {
    i++;
    baseSets.push({
      id: uuidv4(),
      setNumber: i,
      weight: 0,
      reps: 0,
      distance: {
        unit: 'miles',
        value: 0,
      },
      duration: {
        seconds: 0,
      },
      markedDone: false,
    });
  }
  return baseSets;
};
