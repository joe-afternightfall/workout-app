import {
  buildBaseSets,
  deleteSegmentFromPhase,
  updateSet,
} from './edit-object-util';
import {
  buildMockPhase,
  buildMultipleMockPhases,
} from '../configs/test-utils/test-vo-builder';
import { chance } from 'jest-chance';

describe('edit object util', () => {
  it('should delete found segment', () => {
    const mockPhases = buildMultipleMockPhases(2, 4);
    const phases = deleteSegmentFromPhase(
      mockPhases,
      mockPhases[0].segments[0].id
    );
    expect(phases[0].segments.length).toEqual(3);
  });

  describe('update set util', () => {
    it('should update duration value', () => {
      const mockPhase = buildMockPhase(3);
      const setId = mockPhase.segments[0].exercises[0].sets[0].id;
      const value = chance.integer();
      // 'weight' | 'reps' | 'duration' | 'distance';
      updateSet(mockPhase, setId, value, 'duration');

      expect(
        mockPhase.segments[0].exercises[0].sets[0].duration.seconds
      ).toEqual(value);
    });

    it('should update distance value', () => {
      const mockPhase = buildMockPhase(3);
      const setId = mockPhase.segments[0].exercises[0].sets[0].id;
      const value = chance.integer();
      updateSet(mockPhase, setId, value, 'distance');

      expect(mockPhase.segments[0].exercises[0].sets[0].distance.unit).toEqual(
        'miles'
      );
      expect(mockPhase.segments[0].exercises[0].sets[0].distance.value).toEqual(
        value
      );
    });

    it('should update reps value', () => {
      const mockPhase = buildMockPhase(3);
      const setId = mockPhase.segments[0].exercises[0].sets[0].id;
      const value = chance.integer();
      updateSet(mockPhase, setId, value, 'reps');

      expect(mockPhase.segments[0].exercises[0].sets[0].reps).toEqual(value);
    });

    it('should update weight value', () => {
      const mockPhase = buildMockPhase(3);
      const setId = mockPhase.segments[0].exercises[0].sets[0].id;
      const value = chance.integer();
      updateSet(mockPhase, setId, value, 'weight');

      expect(mockPhase.segments[0].exercises[0].sets[0].weight).toEqual(value);
    });
  });

  it('should build base set', () => {
    const builtSets = buildBaseSets(3);

    expect(builtSets.length).toEqual(3);
  });
});
