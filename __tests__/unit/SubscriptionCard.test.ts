import {
  convertCentToDollarString,
  convertByteToGigaByteString,
} from '../../src/components/pages/SubscriptionCard/SubscriptionCard';
import { describe, it, expect } from '@jest/globals';

describe('Test functions in SubscriptionCard', () => {
  describe('convertCentToDollarString', () => {
    it('Price is data', () => {
      const data: number = 200;
      expect(convertCentToDollarString(data)).toEqual(
        `${data / 100} USD in a month`,
      );
    });
    it('Price is Free', () => {
      const data: number = 0;
      expect(convertCentToDollarString(data)).toEqual(`Free`);
    });
  });
  describe('convertByteToGigaByteString', () => {
    it('Convert byte to gigabyte', () => {
      const data = 3;
      const dataInByte = data * 1024 ** 3;
      expect(convertByteToGigaByteString(dataInByte)).toEqual(data);
    });
  });
});
