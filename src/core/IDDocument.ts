import { IDSegment } from './IDSegment';
import { InvalidDocumentError } from './Exception';

export interface IDDocumentData {
  [segmentName: string]: IDSegment[];
}

/**
 * Represents a document composed of multiple Segments.
 * This class encapsulates the structure of a document in line with Clean Architecture principles.
 * While this example primarily serves as a data container, all essential business logic related to a document should be implemented here.
 * The class remains isolated from external representations and dependencies, ensuring the domain logic is testable, maintainable, and independent of external systems.
 */
export class IDDocument implements IDDocumentData {
  [segmentName: string]: IDSegment[];

  constructor(document: IDDocumentData) {
    Object.keys(document).forEach((segmentName) => {
      this[segmentName] = document[segmentName].map((segment) => {
        // Ensure the segment name matches the item keys
        if (segmentName !== IDSegment.getSegmentName(segment)) {
          throw new InvalidDocumentError(
            `Invalid segment name: ${segmentName}. It doesn't match item keys in the segment.`,
          );
        }
        return new IDSegment(segment);
      });
    });
  }
}
