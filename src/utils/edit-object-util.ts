import { Phase } from 'workout-app-common-core';
import * as ramda from 'ramda';

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
