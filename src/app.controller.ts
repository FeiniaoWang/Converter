import { Controller, Post, Body } from '@nestjs/common';
import { ConversionService } from './app.service';
import { DocumentFormat } from './core';

export class Request {
  doc: string;
  from: DocumentFormat;
  to: DocumentFormat;
  lineDelimiter?: string;
  elementDelimiter?: string;
}

@Controller()
export class AppController {
  constructor(private readonly conSvc: ConversionService) {}

  @Post()
  convertFormat(@Body() req: Request): string {
    return this.conSvc.convert(
      req.doc,
      req.from,
      req.to,
      req.lineDelimiter,
      req.elementDelimiter,
    );
  }
}
