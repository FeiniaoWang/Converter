import { StringAdapter } from './StringAdapter';
import { IDDocument } from '../IDDocument';

describe('StringAdapter', () => {
  let document: IDDocument;
  let stringData: string;

  beforeAll(() => {
    document = {
      ProductID: [
        {
          ProductID1: '4',
          ProductID2: '8',
          ProductID3: '15',
          ProductID4: '16',
          ProductID5: '23',
        },
        {
          ProductID1: 'a',
          ProductID2: 'b',
          ProductID3: 'c',
          ProductID4: 'd',
          ProductID5: 'e',
        },
      ],
      AddressID: [
        {
          AddressID1: '42',
          AddressID2: '108',
          AddressID3: '3',
          AddressID4: '14',
        },
      ],
      ContactID: [
        {
          ContactID1: '59',
          ContactID2: '26',
        },
      ],
    };

    stringData = `ProductID*4*8*15*16*23~\nProductID*a*b*c*d*e~\nAddressID*42*108*3*14~\nContactID*59*26~`;
  });

  describe('encode', () => {
    it('should return a string representation of the document', () => {
      const adapter = new StringAdapter();
      const result = adapter.encode(document);
      expect(result).toEqual(stringData);
    });

    it('should return a string representation of the document with custom delimiters', () => {
      const adapter = new StringAdapter(';', ',');
      const result = adapter.encode(document);
      expect(result).toEqual(
        `ProductID,4,8,15,16,23;\nProductID,a,b,c,d,e;\nAddressID,42,108,3,14;\nContactID,59,26;`,
      );
    });

    it('should return an empty string when the document has no groups', () => {
      const adapter = new StringAdapter();
      const result = adapter.encode(new IDDocument({}));
      expect(result).toEqual('');
    });
  });

  describe('decode', () => {
    it('should return a Document instance from a string', () => {
      const adapter = new StringAdapter();
      const result = adapter.decode(stringData);
      expect(result).toEqual(document);
    });

    it('should return a Document instance from a string with custom delimiters', () => {
      const adapter = new StringAdapter(';', ',');
      const result = adapter.decode(
        `ProductID,4,8,15,16,23;\nProductID,a,b,c,d,e;\nAddressID,42,108,3,14;\nContactID,59,26;`,
      );
      expect(result).toEqual(document);
    });

    it('should return an empty Document instance when the string is empty', () => {
      const adapter = new StringAdapter();
      const result = adapter.decode('');
      expect(result).toEqual(new IDDocument({}));
    });
  });
});
