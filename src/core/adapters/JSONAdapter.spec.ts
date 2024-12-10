import { JSONAdapter } from './JSONAdapter';
import { IDDocument } from '../IDDocument';

describe('JSONAdapter', () => {
  let document: IDDocument;
  let jsonString: string;

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

    jsonString = `{"ProductID":[{"ProductID1":"4","ProductID2":"8","ProductID3":"15","ProductID4":"16","ProductID5":"23"},{"ProductID1":"a","ProductID2":"b","ProductID3":"c","ProductID4":"d","ProductID5":"e"}],"AddressID":[{"AddressID1":"42","AddressID2":"108","AddressID3":"3","AddressID4":"14"}],"ContactID":[{"ContactID1":"59","ContactID2":"26"}]}`;
  });

  describe('encode', () => {
    it('should return a JSON string representation of the document', () => {
      const adapter = new JSONAdapter();
      const result = adapter.encode(document);
      expect(result).toEqual(jsonString);
    });

    it('should return an empty JSON object when the document has no groups', () => {
      const adapter = new JSONAdapter();
      const result = adapter.encode(new IDDocument({}));
      expect(result).toEqual('{}');
    });
  });

  describe('decode', () => {
    it('should return a Document instance from a JSON string', () => {
      const adapter = new JSONAdapter();
      const result = adapter.decode(jsonString);
      expect(result).toEqual(document);
    });

    it('should return a Document instance with no groups when the JSON string is empty', () => {
      const adapter = new JSONAdapter();
      const result = adapter.decode('{}');
      expect(result).toEqual(new IDDocument({}));
    });
  });
});
