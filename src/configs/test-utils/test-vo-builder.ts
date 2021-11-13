import { v4 as uuidv4 } from 'uuid';
import {
  Phase,
  RoutineTemplateVO,
  WorkoutCategoryVO,
  WorkoutEquipmentVO,
} from 'workout-app-common-core';
import { chance } from 'jest-chance';

// export const buildUserProfile = (): UserProfileVO => {
//   return {
//     firebaseId: uuidv4(),
//     id: uuidv4(),
//     email: 'test-email@gmail.com',
//     profileIcon: uuidv4(),
//     displayName: 'test-display',
//     height:
//   };
// };

export const buildWorkoutEquipment = (amount: number): WorkoutEquipmentVO[] => {
  let i = 0;
  const equipmentList: WorkoutEquipmentVO[] = [];
  while (amount > i) {
    i++;
    equipmentList.push({
      firebaseId: uuidv4(),
      id: uuidv4(),
      name: uuidv4(),
      description: uuidv4(),
      iconId: uuidv4(),
      active: true,
    });
  }

  return equipmentList;
};

export const buildRoutineTemplateVO = (): RoutineTemplateVO => {
  return new RoutineTemplateVO(
    chance.string(),
    chance.string(),
    chance.string(),
    chance.string(),
    [],
    chance.bool()
  );
};

export const buildWorkoutCategoryVO = (): WorkoutCategoryVO => {
  return new WorkoutCategoryVO(
    chance.string(),
    chance.string(),
    chance.string(),
    chance.string(),
    [chance.string(), chance.string()],
    chance.bool()
  );
};

export const buildPhase = (): Phase => {
  return {
    id: chance.string(),
    phaseId: chance.string(),
    order: chance.d4(),
    segments: [],
  };
};

export const buildMultiplePhases = (n: number): Phase[] => {
  let i = 0;
  const phases: Phase[] = [];
  while (n > i) {
    i++;
    phases.push(buildPhase());
  }
  return phases;
};
