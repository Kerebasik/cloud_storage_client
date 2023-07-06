import { convertUsedSpace } from '../../src/components/pages/UserProfile/UserProfile';

describe('UserProfile', () => {
  describe('convertUserSpace', () => {
    it('usedStorage is 0', () => {
      const usedStorage = 0;
      const diskStorage = 100;
      expect(convertUsedSpace(usedStorage, diskStorage)).toEqual(0);
    });
    it('usedStorage is 50', () => {
      const usedStorage = 50;
      const diskStorage = 100;
      expect(convertUsedSpace(usedStorage, diskStorage)).toEqual(50);
    });
  });
});
