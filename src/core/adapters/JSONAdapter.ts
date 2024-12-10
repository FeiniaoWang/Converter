import { Adapter } from './Adapter.interface';
import { IDDocument } from '../IDDocument';

export class JSONAdapter implements Adapter {
  decode(jsonString: string) {
    return new IDDocument(JSON.parse(jsonString));
  }

  encode(document: IDDocument) {
    return JSON.stringify(document);
  }
}
