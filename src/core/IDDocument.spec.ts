import { IDDocument } from './IDDocument';
import { IDSegment } from './IDSegment';
import { InvalidDocumentError } from './Exception';

describe('IDDocument', () => {
  it('should create an IDDocument instance with valid segments', () => {
    const productSeg1 = {
      ProductID1: '4',
      ProductID2: '8',
      ProductID3: '15',
      ProductID4: '16',
      ProductID5: '23',
    };
    const productSeg2 = {
      ProductID1: 'a',
      ProductID2: 'b',
      ProductID3: 'c',
      ProductID4: 'd',
      ProductID5: 'e',
    };
    const addressSeg = {
      AddressID1: '42',
      AddressID2: '108',
      AddressID3: '3',
      AddressID4: '14',
    };
    const contactSeg = {
      ContactID1: '59',
      ContactID2: '26',
    };
    const documentData = {
      ProductID: [productSeg1, productSeg2],
      AddressID: [addressSeg],
      ContactID: [contactSeg],
    };
    const document = new IDDocument(documentData);

    expect(document.ProductID).toHaveLength(2);
    expect(document.ProductID[0] instanceof IDSegment).toBe(true);
    expect(document.ProductID[1] instanceof IDSegment).toBe(true);

    expect(document.AddressID).toHaveLength(1);
    expect(document.AddressID[0] instanceof IDSegment).toBe(true);

    expect(document.ContactID).toHaveLength(1);
    expect(document.ContactID[0] instanceof IDSegment).toBe(true);
  });

  it('should throw InvalidDocumentError for invalid segment names', () => {
    const addressSeg = {
      AddressID1: '42',
      AddressID2: '108',
      AddressID3: '3',
      AddressID4: '14',
    };
    const documentData = {
      differentSegName: [addressSeg],
    };

    expect(() => new IDDocument(documentData)).toThrow(InvalidDocumentError);
  });
});
