import { InvalidDocumentError } from './Exception';

export interface IDSegmentData {
  [key: string]: string;
}

/**
 * Represents a segment of an ID document.
 * This class encapsulates the structure of a segment in line with Clean Architecture principles.
 * While this example primarily serves as a data container, all essential business logic related to a segment should be implemented here.
 * The class remains isolated from external representations and dependencies, ensuring the domain logic is testable, maintainable, and independent of external systems.
 */
export class IDSegment implements IDSegmentData {
  [key: string]: string;

  private static verifyKeys(segment: IDSegmentData): void {
    let segmentName;
    let lastIndex = 0;
    Object.keys(segment).forEach((key) => {
      // split they key into two parts, the segment name and index number
      const parts = key.match(/^([a-zA-Z]+)(\d+)$/);
      if (!parts) {
        throw new InvalidDocumentError(
          `Invalid key: ${key}. Expected a string with a number at the end.`,
        );
      }

      // Ensure all keys have the same segment name
      if (!segmentName) {
        segmentName = parts[1];
      } else if (segmentName !== parts[1]) {
        throw new InvalidDocumentError(
          `Invalid key: ${key}. Expected all keys to have the same segment name.`,
        );
      }

      // Ensure the index numbers are consecutive integers starting from 1
      const index = parseInt(parts[2]);
      if (index !== lastIndex + 1) {
        throw new InvalidDocumentError(
          `Invalid key: ${key}. Expected consecutive integers starting from 1.`,
        );
      } else {
        lastIndex = index;
      }
    });
  }

  private static verifyValues(segment: IDSegmentData): void {
    // the values must be either a integer or a single alphabet
    Object.values(segment).forEach((value) => {
      if (!/^[a-zA-Z]$|^\d+$/.test(value)) {
        throw new InvalidDocumentError(
          `Invalid value: ${value}. Expected a single alphabet or an integer.`,
        );
      }
    });
  }

  public static getSegmentName(segment: IDSegmentData): string {
    const key = Object.keys(segment)[0];
    return key.match(/^([a-zA-Z]+)\d+$/)[1];
  }

  constructor(segment: IDSegmentData) {
    IDSegment.verifyKeys(segment);
    IDSegment.verifyValues(segment);
    Object.assign(this, segment);
  }
}
