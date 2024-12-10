import { Adapter } from './Adapter.interface';
import { IDDocument } from '../IDDocument';
import { IDSegment } from '../IDSegment';

export class StringAdapter implements Adapter {
  constructor(
    private lineDelimiter = '~',
    private elementDelimiter = '*',
  ) {}

  decode(strData: string) {
    const singleLineData = strData.replace(/\n/g, '');
    const lines = singleLineData
      .split(this.lineDelimiter)
      .filter((line) => line.length > 0);
    const document: IDDocument = {};
    for (const line of lines) {
      const [group, ...values] = line.split(this.elementDelimiter);
      if (!document[group]) {
        document[group] = [];
      }
      const segment: IDSegment = {};
      for (let i = 0; i < values.length; i++) {
        segment[`${group}${i + 1}`] = values[i];
      }
      document[group].push(segment);
    }
    return document;
  }

  encode(document: IDDocument) {
    const lines: string[] = [];
    for (const group of Object.keys(document)) {
      const groupData = document[group];
      for (const segment of groupData) {
        lines.push(
          `${group}${this.elementDelimiter}${Object.values(segment).join(this.elementDelimiter)}${this.lineDelimiter}`,
        );
      }
    }
    return lines.join('\n');
  }
}
