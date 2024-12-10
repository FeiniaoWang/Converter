import { IDSegment } from './IDSegment';
import { InvalidDocumentError } from './Exception';

describe('IDSegment', () => {
  describe('verifyKeys', () => {
    it('should throw an error if keys do not match the expected pattern', () => {
      const segment = { invalidKey: '1' };
      expect(() => new IDSegment(segment)).toThrow(InvalidDocumentError);
    });

    it('should throw an error if keys do not have the same segment name', () => {
      const segment = { ProductID1: '4', ContactID2: '8' };
      expect(() => new IDSegment(segment)).toThrow(InvalidDocumentError);
    });

    it('should throw an error if index numbers are not consecutive', () => {
      const segment = { ProductID1: '4', ProductID3: '15' };
      expect(() => new IDSegment(segment)).toThrow(InvalidDocumentError);
    });

    it('should not throw an error for valid keys', () => {
      const segment = { ProductID1: '4', ProductID2: '8' };
      expect(() => new IDSegment(segment)).not.toThrow();
    });
  });

  describe('verifyValues', () => {
    it('should throw an error if values are not a single alphabet or an integer', () => {
      const segment = { ProductID1: '4', ProductID2: 'invalid' };
      expect(() => new IDSegment(segment)).toThrow(InvalidDocumentError);
    });

    it('should not throw an error for valid values', () => {
      const segment1 = { ProductID1: '4', ProductID2: '8' };
      const segment2 = { ProductID1: 'a', ProductID2: 'b' };
      expect(() => new IDSegment(segment1)).not.toThrow();
      expect(() => new IDSegment(segment2)).not.toThrow();
    });
  });

  describe('constructor', () => {
    it('should assign segment data to the instance', () => {
      const segment1 = {
        ProductID1: '4',
        ProductID2: '8',
        ProductID3: '15',
        ProductID4: '16',
        ProductID5: '23',
      };
      const segment2 = {
        ProductID1: 'a',
        ProductID2: 'b',
        ProductID3: 'c',
        ProductID4: 'd',
        ProductID5: 'e',
      };
      const idSegment1 = new IDSegment(segment1);
      const idSegment2 = new IDSegment(segment2);
      expect(idSegment1.ProductID1).toBe('4');
      expect(idSegment1.ProductID2).toBe('8');
      expect(idSegment1.ProductID3).toBe('15');
      expect(idSegment1.ProductID4).toBe('16');
      expect(idSegment1.ProductID5).toBe('23');
      expect(idSegment2.ProductID1).toBe('a');
      expect(idSegment2.ProductID2).toBe('b');
      expect(idSegment2.ProductID3).toBe('c');
      expect(idSegment2.ProductID4).toBe('d');
      expect(idSegment2.ProductID5).toBe('e');
    });
  });
});
