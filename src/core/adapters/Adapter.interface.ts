import { IDDocument } from '../IDDocument';

/**
 * Represents an adapter that can encode and decode documents.
 * Adapters are responsible for translating documents to and from external representations.
 * This interface defines the contract that all Document adapters must implement.
 */
export interface Adapter {
  decode(data: string): IDDocument;
  encode(document: IDDocument): string;
}
