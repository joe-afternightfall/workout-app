import { v4 as uuidv4 } from 'uuid';
import { UserProfileVO, WorkoutEquipmentVO } from 'workout-app-common-core';

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
