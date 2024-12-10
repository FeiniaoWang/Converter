import { Adapter } from './Adapter.interface';
import { JSONAdapter } from './JSONAdapter';
import { XMLAdapter } from './XMLAdapter';
import { StringAdapter } from './StringAdapter';

export type DocumentFormat = 'string' | 'json' | 'xml';

export class AdapterFactory {
  /**
   * It's a good practice to have a static method that returns the supported formats.
   */
  static getFormats(): DocumentFormat[] {
    return ['string', 'json', 'xml'];
  }

  static createAdapter(
    format: DocumentFormat,
    lineDelimiter?: string,
    elementDelimiter?: string,
  ): Adapter {
    switch (format) {
      case 'string':
        return new StringAdapter(lineDelimiter, elementDelimiter);
      case 'json':
        return new JSONAdapter();
      case 'xml':
        return new XMLAdapter();
      default:
        throw new Error(`Unsupported format: ${format}`);
    }
  }
}
