import { chance } from 'jest-chance';
import {
  buildMockWorkoutExercise,
  buildMultipleMockWorkouts,
} from '../configs/test-utils/test-vo-builder';
import { findLatestStatsForExercise, findLatestWeight } from './find-latest';
import { UserWeight, Workout, WorkoutExercise } from 'workout-app-common-core';

describe('find latest util', () => {
  describe('finding latest user weight', () => {
    it('should find latest weight', () => {
      const latestUpdatedWeight = {
        id: 'id-4',
        weight: '235',
        lastUpdatedOn: '08/22/2021',
      };
      const weights: UserWeight[] = [
        {
          id: 'id-1',
          weight: '220',
          lastUpdatedOn: '08/10/2021',
        },
        {
          id: 'id-2',
          weight: '210',
          lastUpdatedOn: '08/12/2021',
        },
        {
          id: 'id-3',
          weight: '205',
          lastUpdatedOn: '06/12/2021',
        },
        latestUpdatedWeight,
        {
          id: 'id-5',
          weight: '195',
          lastUpdatedOn: '05/01/2021',
        },
      ];

      const latestWeight = findLatestWeight(weights);

      expect(latestWeight).toEqual(latestUpdatedWeight);
    });

    it('should still find latest with multiple edits on same day', () => {
      const latestUpdatedWeight = {
        id: 'id-4',
        weight: '235',
        lastUpdatedOn: '08/22/2021',
      };
      const weights: UserWeight[] = [
        {
          id: 'id-1',
          weight: '220',
          lastUpdatedOn: '08/10/2021',
        },
        latestUpdatedWeight,
        {
          id: 'id-3',
          weight: '205',
          lastUpdatedOn: '06/12/2021',
        },
        latestUpdatedWeight,
        {
          id: 'id-5',
          weight: '195',
          lastUpdatedOn: '05/01/2021',
        },
      ];

      const latestWeight = findLatestWeight(weights);

      expect(latestWeight).toEqual(latestUpdatedWeight);
    });

    it('should handle when empty', () => {
      const latestWeight = findLatestWeight([]);

      expect(latestWeight).toEqual(undefined);
    });
  });

  describe('finding latest exercise', () => {
    it('should return undefined when not found', () => {
      const mockPastWorkouts = buildMultipleMockWorkouts(5);
      const mockWorkoutExercise = buildMockWorkoutExercise();

      const latest = findLatestStatsForExercise(
        mockWorkoutExercise,
        mockPastWorkouts
      );

      expect(latest).toEqual(undefined);
    });

    it('should find and return latest exercise info', () => {
      const mockPastWorkouts: Workout[] = [];
      buildMultipleMockWorkouts(5).map((workout) =>
        mockPastWorkouts.push(workout)
      );
      const firstExerciseId = chance.string();
      const secondExerciseId = chance.string();
      // const mockWorkoutExercise: WorkoutExercise = [
      //   {
      //     id: chance.string(),
      //     order: 1,
      //     exerciseId: firstExerciseId,
      //     sets: [],
      //   },
      //   {
      //     id: chance.string(),
      //     order: 2,
      //     exerciseId: secondExerciseId,
      //     sets: [],
      //   },
      // ];
      const mockWorkoutExercise: WorkoutExercise = {
        id: chance.string(),
        order: 1,
        exerciseId: firstExerciseId,
        sets: [],
      };

      const exerciseToFind = {
        id: chance.string(),
        order: 1,
        exerciseId: firstExerciseId,
        sets: [
          {
            id: chance.string(),
            setNumber: 1,
            weight: 50,
            reps: 12,
            markedDone: true,
          },
          {
            id: chance.string(),
            setNumber: 2,
            weight: 55,
            reps: 12,
            markedDone: true,
          },
          {
            id: chance.string(),
            setNumber: 3,
            weight: 60,
            reps: 12,
            markedDone: true,
          },
        ],
      };
      const dateToFind = chance.date().toLocaleDateString();
      mockPastWorkouts.push({
        id: chance.string(),
        date: dateToFind,
        startTime: chance.timestamp().toString(),
        endTime: chance.timestamp().toString(),
        routine: {
          id: chance.string(),
          name: chance.string(),
          workoutCategoryId: chance.string(),
          phases: [
            {
              id: chance.string(),
              phaseId: chance.string(),
              order: 1,
              segments: [
                {
                  id: chance.string(),
                  order: 1,
                  trainingSetTypeId: chance.string(),
                  secondsRestBetweenSets: chance.integer({ min: 15, max: 120 }),
                  secondsRestBetweenNextSegment: chance.integer({
                    min: 60,
                    max: 240,
                  }),
                  exercises: [
                    exerciseToFind,
                    {
                      id: chance.string(),
                      order: 2,
                      exerciseId: secondExerciseId,
                      sets: [
                        {
                          id: chance.string(),
                          setNumber: 1,
                          weight: 15,
                          reps: 12,
                          markedDone: true,
                        },
                        {
                          id: chance.string(),
                          setNumber: 2,
                          weight: 20,
                          reps: 12,
                          markedDone: true,
                        },
                        {
                          id: chance.string(),
                          setNumber: 3,
                          weight: 25,
                          reps: 12,
                          markedDone: true,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      });

      const latest = findLatestStatsForExercise(
        mockWorkoutExercise,
        mockPastWorkouts
      );

      expect(latest).toEqual({
        date: dateToFind,
        exercise: exerciseToFind,
      });
    });
  });
});
