import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { ConversionService } from './app.service';
import { Request } from './app.controller';

// Here only test if the plumbing is working. Most test cases are in the core module.
describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [ConversionService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should convert string to JSON', () => {
      const req = {
        doc: 'ProductID*4*8*15*16*23~\nProductID*a*b*c*d*e~\nAddressID*42*108*3*14~\nContactID*59*26~',
        from: 'string',
        to: 'json',
      } as Request;
      const expectedJson = `{"ProductID":[{"ProductID1":"4","ProductID2":"8","ProductID3":"15","ProductID4":"16","ProductID5":"23"},{"ProductID1":"a","ProductID2":"b","ProductID3":"c","ProductID4":"d","ProductID5":"e"}],"AddressID":[{"AddressID1":"42","AddressID2":"108","AddressID3":"3","AddressID4":"14"}],"ContactID":[{"ContactID1":"59","ContactID2":"26"}]}`;
      expect(appController.convertFormat(req)).toBe(expectedJson);
    });
  });
});
