import { XMLAdapter } from './XMLAdapter';
import { IDDocument } from '../IDDocument';

describe('XMLAdapter', () => {
  let document: IDDocument;
  let xmlString: string;

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

    xmlString = `<?xml version="1.0" encoding="UTF-8" ?>
<root>
  <ProductID>
    <ProductID1>4</ProductID1>
    <ProductID2>8</ProductID2>
    <ProductID3>15</ProductID3>
    <ProductID4>16</ProductID4>
    <ProductID5>23</ProductID5>
  </ProductID>
  <ProductID>
    <ProductID1>a</ProductID1>
    <ProductID2>b</ProductID2>
    <ProductID3>c</ProductID3>
    <ProductID4>d</ProductID4>
    <ProductID5>e</ProductID5>
  </ProductID>
  <AddressID>
    <AddressID1>42</AddressID1>
    <AddressID2>108</AddressID2>
    <AddressID3>3</AddressID3>
    <AddressID4>14</AddressID4>
  </AddressID>
  <ContactID>
    <ContactID1>59</ContactID1>
    <ContactID2>26</ContactID2>
  </ContactID>
</root>`;
  });

  describe('encode', () => {
    it('should return an XML string representation of the document', () => {
      const adapter = new XMLAdapter();
      const result = adapter.encode(document);
      expect(result).toEqual(xmlString);
    });

    it('should return an empty XML string when the document has no groups', () => {
      const adapter = new XMLAdapter();
      const result = adapter.encode(new IDDocument({}));
      expect(result).toEqual(
        '<?xml version="1.0" encoding="UTF-8" ?>\n<root/>',
      );
    });
  });

  describe('decode', () => {
    it('should return a Document instance from an XML string', () => {
      const adapter = new XMLAdapter();
      const result = adapter.decode(xmlString);
      expect(result).toEqual(document);
    });

    it('should return an empty Document instance when the XML string is empty', () => {
      const adapter = new XMLAdapter();
      const result = adapter.decode(
        '<?xml version="1.0" encoding="UTF-8" ?><root></root>',
      );
      expect(result).toEqual(new IDDocument({}));
    });
  });
});
