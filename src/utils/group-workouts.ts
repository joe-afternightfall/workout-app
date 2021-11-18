import { Workout } from 'workout-app-common-core';

export interface GroupedWorkouts {
  [key: string]: {
    [key: string]: Workout[];
  };
}

export const groupWorkoutsByMonth = (workouts: Workout[]): GroupedWorkouts => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const groupedWorkouts: GroupedWorkouts = {};
  workouts &&
    workouts.map((workout) => {
      const month = monthNames[new Date(workout.date).getMonth()];
      console.log('month: ' + month);
      const year = new Date(workout.date).getFullYear();
      if (year in groupedWorkouts) {
        if (groupedWorkouts[year][month]) {
          groupedWorkouts[year][month].push(workout);
          groupedWorkouts[year][month].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          );
        } else {
          groupedWorkouts[year] = {
            ...groupedWorkouts[year],
            [month]: [workout],
          };
        }
      } else {
        groupedWorkouts[year] = {
          ...groupedWorkouts[year],
          [month]: [workout],
        };
      }
    });
  return groupedWorkouts;
};
