import { create } from 'xmlbuilder';
import { parseString } from 'xml2js';
import { Adapter } from './Adapter.interface';
import { IDDocument } from '../IDDocument';

export class XMLAdapter implements Adapter {
  decode(xmlString: string) {
    let idDoc: IDDocument;

    parseString(xmlString, { explicitArray: false }, (err, result) => {
      if (err) {
        throw new Error(err.message);
      }
      idDoc = result.root;
      if (!idDoc) {
        idDoc = {};
        return;
      }

      for (const key in idDoc) {
        if (!Array.isArray(idDoc[key])) {
          idDoc[key] = [idDoc[key]];
        }
      }
    });

    return idDoc;
  }

  encode(document: IDDocument) {
    const xmlHeader = '<?xml version="1.0" encoding="UTF-8" ?>\n';
    const xmlDoc = create({ root: document }, { headless: true }).end({
      pretty: true,
    });
    return xmlHeader + xmlDoc;
  }
}
