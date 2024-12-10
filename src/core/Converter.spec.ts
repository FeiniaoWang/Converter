import { Converter } from './Converter';
import { AdapterFactory } from './adapters';

describe('Converter', () => {
  describe('convert', () => {
    let stringData: string;
    let jsonString: string;
    let xmlString: string;

    beforeAll(() => {
      stringData = `ProductID*4*8*15*16*23~\nProductID*a*b*c*d*e~\nAddressID*42*108*3*14~\nContactID*59*26~`;
      jsonString = `{"ProductID":[{"ProductID1":"4","ProductID2":"8","ProductID3":"15","ProductID4":"16","ProductID5":"23"},{"ProductID1":"a","ProductID2":"b","ProductID3":"c","ProductID4":"d","ProductID5":"e"}],"AddressID":[{"AddressID1":"42","AddressID2":"108","AddressID3":"3","AddressID4":"14"}],"ContactID":[{"ContactID1":"59","ContactID2":"26"}]}`;
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

    it('should convert string data to JSON', () => {
      const stringAdapter = AdapterFactory.createAdapter('string');
      const jsonAdapter = AdapterFactory.createAdapter('json');
      const converter = new Converter(stringAdapter, jsonAdapter);
      expect(converter.convert(stringData)).toBe(jsonString);
    });

    it('should convert JSON data to string', () => {
      const jsonAdapter = AdapterFactory.createAdapter('json');
      const stringAdapter = AdapterFactory.createAdapter('string');
      const converter = new Converter(jsonAdapter, stringAdapter);
      expect(converter.convert(jsonString)).toBe(stringData);
    });

    it('should convert JSON data to XML', () => {
      const jsonAdapter = AdapterFactory.createAdapter('json');
      const xmlAdapter = AdapterFactory.createAdapter('xml');
      const converter = new Converter(jsonAdapter, xmlAdapter);
      expect(converter.convert(jsonString)).toBe(xmlString);
    });

    it('should convert XML data to JSON', () => {
      const xmlAdapter = AdapterFactory.createAdapter('xml');
      const jsonAdapter = AdapterFactory.createAdapter('json');
      const converter = new Converter(xmlAdapter, jsonAdapter);
      expect(converter.convert(xmlString)).toBe(jsonString);
    });

    it('should convert XML data to string', () => {
      const xmlAdapter = AdapterFactory.createAdapter('xml');
      const stringAdapter = AdapterFactory.createAdapter('string');
      const converter = new Converter(xmlAdapter, stringAdapter);
      expect(converter.convert(xmlString)).toBe(stringData);
    });

    it('should convert string data to XML', () => {
      const stringAdapter = AdapterFactory.createAdapter('string');
      const xmlAdapter = AdapterFactory.createAdapter('xml');
      const converter = new Converter(stringAdapter, xmlAdapter);
      expect(converter.convert(stringData)).toBe(xmlString);
    });
  });
});
