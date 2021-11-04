import { MuscleVO, WorkoutEquipmentVO } from 'workout-app-common-core';

export const findMuscle = (
  muscles: MuscleVO[],
  id: string
): MuscleVO | undefined => {
  return muscles.find((muscle) => muscle.id === id);
};

export const findWorkoutEquipment = (
  equipmentList: WorkoutEquipmentVO[],
  id: string
): WorkoutEquipmentVO | undefined => {
  return equipmentList.find((equipment) => equipment.id === id);
};
