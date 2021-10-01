import { UserWeight } from 'workout-app-common-core';

export const findLatestWeight = (
  weights: UserWeight[]
): UserWeight | undefined => {
  if (weights.length > 0) {
    return weights.reduce(
      (accum: UserWeight, current: UserWeight, index: number) =>
        current.lastUpdatedOn > accum.lastUpdatedOn && index ? current : accum
    );
  }
  return undefined;
};
