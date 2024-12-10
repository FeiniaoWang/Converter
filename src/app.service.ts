import { Injectable } from '@nestjs/common';
import { Converter, AdapterFactory, DocumentFormat } from './core';

@Injectable()
export class ConversionService {
  convert(
    doc: string,
    from: DocumentFormat,
    to: DocumentFormat,
    lineDelimiter?: string,
    elementDelimiter?: string,
  ): string {
    const fromAdapter = AdapterFactory.createAdapter(
      from,
      lineDelimiter,
      elementDelimiter,
    );
    const toAdapter = AdapterFactory.createAdapter(
      to,
      lineDelimiter,
      elementDelimiter,
    );
    const converter = new Converter(fromAdapter, toAdapter);
    return converter.convert(doc);
  }
}
