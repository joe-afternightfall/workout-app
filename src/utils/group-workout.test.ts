import { groupWorkoutsByMonth } from './group-workouts';
import { Workout } from 'workout-app-common-core';
import { chance } from 'jest-chance';
import { buildMockRoutineTemplateVO } from '../configs/test-utils/test-vo-builder';

describe('group workout util', () => {
  it('should return', () => {
    const mockWorkouts: Workout[] = [
      {
        id: chance.string(),
        date: '11/15/2021',
        startTime: chance.integer().toString(),
        endTime: chance.integer().toString(),
        routine: buildMockRoutineTemplateVO(1, 4),
      },
      {
        id: chance.string(),
        date: '11/10/2021',
        startTime: chance.integer().toString(),
        endTime: chance.integer().toString(),
        routine: buildMockRoutineTemplateVO(1, 4),
      },
      {
        id: chance.string(),
        date: '11/14/2021',
        startTime: chance.integer().toString(),
        endTime: chance.integer().toString(),
        routine: buildMockRoutineTemplateVO(1, 4),
      },
      {
        id: chance.string(),
        date: '11/04/2021',
        startTime: chance.integer().toString(),
        endTime: chance.integer().toString(),
        routine: buildMockRoutineTemplateVO(1, 4),
      },
      {
        id: chance.string(),
        date: '11/14/2021',
        startTime: chance.integer().toString(),
        endTime: chance.integer().toString(),
        routine: buildMockRoutineTemplateVO(1, 4),
      },
      {
        id: chance.string(),
        date: '10/25/2021',
        startTime: chance.integer().toString(),
        endTime: chance.integer().toString(),
        routine: buildMockRoutineTemplateVO(1, 4),
      },
      {
        id: chance.string(),
        date: '10/21/2021',
        startTime: chance.integer().toString(),
        endTime: chance.integer().toString(),
        routine: buildMockRoutineTemplateVO(1, 4),
      },
      {
        id: chance.string(),
        date: '10/05/2021',
        startTime: chance.integer().toString(),
        endTime: chance.integer().toString(),
        routine: buildMockRoutineTemplateVO(1, 4),
      },
      {
        id: chance.string(),
        date: '09/15/2021',
        startTime: chance.integer().toString(),
        endTime: chance.integer().toString(),
        routine: buildMockRoutineTemplateVO(1, 4),
      },

      {
        id: chance.string(),
        date: '06/13/2020',
        startTime: chance.integer().toString(),
        endTime: chance.integer().toString(),
        routine: buildMockRoutineTemplateVO(1, 4),
      },
      {
        id: chance.string(),
        date: '08/28/2020',
        startTime: chance.integer().toString(),
        endTime: chance.integer().toString(),
        routine: buildMockRoutineTemplateVO(1, 4),
      },

      {
        id: chance.string(),
        date: '12/15/2019',
        startTime: chance.integer().toString(),
        endTime: chance.integer().toString(),
        routine: buildMockRoutineTemplateVO(1, 4),
      },
      {
        id: chance.string(),
        date: '12/10/2019',
        startTime: chance.integer().toString(),
        endTime: chance.integer().toString(),
        routine: buildMockRoutineTemplateVO(1, 4),
      },
      {
        id: chance.string(),
        date: '10/10/2019',
        startTime: chance.integer().toString(),
        endTime: chance.integer().toString(),
        routine: buildMockRoutineTemplateVO(1, 4),
      },
      {
        id: chance.string(),
        date: '09/14/2019',
        startTime: chance.integer().toString(),
        endTime: chance.integer().toString(),
        routine: buildMockRoutineTemplateVO(1, 4),
      },
      {
        id: chance.string(),
        date: '07/11/2019',
        startTime: chance.integer().toString(),
        endTime: chance.integer().toString(),
        routine: buildMockRoutineTemplateVO(1, 4),
      },
    ];
    const groupedWorkouts = groupWorkoutsByMonth(mockWorkouts);

    expect(Object.keys(groupedWorkouts['2021']).length).toEqual(3);
    expect(Object.keys(groupedWorkouts['2020']).length).toEqual(2);
    expect(Object.keys(groupedWorkouts['2019']).length).toEqual(4);

    // checks for year 2021
    expect(groupedWorkouts['2021']['November'].length).toEqual(5);
    expect(groupedWorkouts['2021']['November'][0].date).toEqual('11/04/2021');
    expect(groupedWorkouts['2021']['November'][1].date).toEqual('11/10/2021');
    expect(groupedWorkouts['2021']['November'][2].date).toEqual('11/14/2021');
    expect(groupedWorkouts['2021']['November'][3].date).toEqual('11/14/2021');

    expect(groupedWorkouts['2021']['October'].length).toEqual(3);
    expect(groupedWorkouts['2021']['October'][0].date).toEqual('10/05/2021');
    expect(groupedWorkouts['2021']['October'][1].date).toEqual('10/21/2021');
    expect(groupedWorkouts['2021']['October'][2].date).toEqual('10/25/2021');

    expect(groupedWorkouts['2021']['September'].length).toEqual(1);
    expect(groupedWorkouts['2021']['September'][0].date).toEqual('09/15/2021');

    // checks for year 2020
    expect(groupedWorkouts['2020']['June'].length).toEqual(1);
    expect(groupedWorkouts['2020']['June'][0].date).toEqual('06/13/2020');

    expect(groupedWorkouts['2020']['August'].length).toEqual(1);
    expect(groupedWorkouts['2020']['August'][0].date).toEqual('08/28/2020');

    // checks for year 2019
    expect(groupedWorkouts['2019']['July'].length).toEqual(1);
    expect(groupedWorkouts['2019']['July'][0].date).toEqual('07/11/2019');

    expect(groupedWorkouts['2019']['September'].length).toEqual(1);
    expect(groupedWorkouts['2019']['September'][0].date).toEqual('09/14/2019');

    expect(groupedWorkouts['2019']['October'].length).toEqual(1);
    expect(groupedWorkouts['2019']['October'][0].date).toEqual('10/10/2019');

    expect(groupedWorkouts['2019']['December'].length).toEqual(2);
    expect(groupedWorkouts['2019']['December'][0].date).toEqual('12/10/2019');
    expect(groupedWorkouts['2019']['December'][1].date).toEqual('12/15/2019');
  });
});
