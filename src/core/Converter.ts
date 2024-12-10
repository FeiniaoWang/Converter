import { Adapter } from './adapters';

export class Converter {
  constructor(
    private from: Adapter,
    private to: Adapter,
  ) {}

  convert(data: string): string {
    const document = this.from.decode(data);
    return this.to.encode(document);
  }
}
