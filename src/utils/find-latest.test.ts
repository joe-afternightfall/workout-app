import { UserWeight } from '../configs/models/UserProfileDAO';
import { findLatestWeight } from './find-latest';

describe('find latest util', () => {
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
