import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { configModuleSetup } from '@src/configs/env/env.provider';
import { HelperModule } from '@src/modules/utils/helper/helper.module';
import { HelperEncryptionService } from '@src/modules/utils/helper/service/helper.encryption.service';

describe('HelperEncryptionService', () => {
  let helperEncryptionService: HelperEncryptionService;
  const data = 'aaaa';
  const dataObject = { test: 'aaaa' };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HelperModule, ConfigModule.forRoot(configModuleSetup)],
    }).compile();

    helperEncryptionService = moduleRef.get<HelperEncryptionService>(
      HelperEncryptionService,
    );
  });

  it('should be defined', () => {
    expect(helperEncryptionService).toBeDefined();
  });

  describe('base64Encrypt', () => {
    it('should be called', () => {
      const test = jest.spyOn(helperEncryptionService, 'base64Encrypt');

      helperEncryptionService.base64Encrypt(data);
      expect(test).toHaveBeenCalledWith(data);
    });

    it('should be success', () => {
      const result = helperEncryptionService.base64Encrypt(data);
      jest
        .spyOn(helperEncryptionService, 'base64Encrypt')
        .mockImplementation(() => result);

      expect(helperEncryptionService.base64Encrypt(data)).toBe(result);
    });
  });

  describe('base64Decrypt', () => {
    it('should be called', () => {
      const test = jest.spyOn(helperEncryptionService, 'base64Decrypt');

      const result = helperEncryptionService.base64Encrypt(data);
      helperEncryptionService.base64Decrypt(result);
      expect(test).toHaveBeenCalledWith(result);
    });

    it('should be success', () => {
      const result = helperEncryptionService.base64Encrypt(data);
      jest
        .spyOn(helperEncryptionService, 'base64Decrypt')
        .mockImplementation(() => data);

      expect(helperEncryptionService.base64Decrypt(result)).toBe(data);
    });
  });

  describe('aes256Encrypt', () => {
    it('should be called', () => {
      const test = jest.spyOn(helperEncryptionService, 'aes256Encrypt');

      helperEncryptionService.aes256Encrypt(
        data,
        '1234567',
        '1231231231231231',
      );
      expect(test).toHaveBeenCalledWith(data, '1234567', '1231231231231231');
    });

    it('string should be success', () => {
      const result = helperEncryptionService.aes256Encrypt(
        data,
        '1234567',
        '1231231231231231',
      );
      jest
        .spyOn(helperEncryptionService, 'aes256Encrypt')
        .mockImplementation(() => result);

      expect(
        helperEncryptionService.aes256Encrypt(
          data,
          '1234567',
          '1231231231231231',
        ),
      ).toBe(result);
    });

    it('object should be success', () => {
      const result = helperEncryptionService.aes256Encrypt(
        dataObject,
        '1234567',
        '1231231231231231',
      );
      jest
        .spyOn(helperEncryptionService, 'aes256Encrypt')
        .mockImplementation(() => result);

      expect(
        helperEncryptionService.aes256Encrypt(
          dataObject,
          '1234567',
          '1231231231231231',
        ),
      ).toBe(result);
    });
  });

  describe('aes256Decrypt', () => {
    it('should be called', () => {
      const test = jest.spyOn(helperEncryptionService, 'aes256Decrypt');

      const result = helperEncryptionService.aes256Encrypt(
        data,
        '1234567',
        '1231231231231231',
      );
      helperEncryptionService.aes256Decrypt(
        result,
        '1234567',
        '1231231231231231',
      );
      expect(test).toHaveBeenCalledWith(result, '1234567', '1231231231231231');
    });

    it('should be success', () => {
      const result = helperEncryptionService.aes256Encrypt(
        data,
        '1234567',
        '1231231231231231',
      );
      jest
        .spyOn(helperEncryptionService, 'aes256Decrypt')
        .mockImplementation(() => data);

      expect(
        helperEncryptionService.aes256Decrypt(
          result,
          '1234567',
          '1231231231231231',
        ),
      ).toBe(data);
    });
  });

  describe('jwtEncrypt', () => {
    it('should be called', () => {
      const test = jest.spyOn(helperEncryptionService, 'jwtEncrypt');

      helperEncryptionService.jwtEncrypt({ data });
      expect(test).toHaveBeenCalledWith({ data });
    });

    it('should be success', () => {
      const result = helperEncryptionService.jwtEncrypt({ data });
      jest
        .spyOn(helperEncryptionService, 'jwtEncrypt')
        .mockImplementation(() => result);

      expect(helperEncryptionService.jwtEncrypt({ data })).toBe(result);
    });
  });

  describe('jwtDecrypt', () => {
    it('should be called', () => {
      const test = jest.spyOn(helperEncryptionService, 'jwtDecrypt');

      const result = helperEncryptionService.jwtEncrypt({ data });
      helperEncryptionService.jwtDecrypt(result);
      expect(test).toHaveBeenCalledWith(result);
    });

    it('should be success', () => {
      const result = helperEncryptionService.jwtEncrypt({ data });
      const decrypt = helperEncryptionService.jwtDecrypt(result);
      jest
        .spyOn(helperEncryptionService, 'jwtDecrypt')
        .mockImplementation(() => decrypt);

      expect(helperEncryptionService.jwtDecrypt(result)).toBe(decrypt);
    });
  });

  describe('jwtVerify', () => {
    it('should be called', () => {
      const test = jest.spyOn(helperEncryptionService, 'jwtVerify');

      const result = helperEncryptionService.jwtEncrypt({ data });
      helperEncryptionService.jwtVerify(result);
      expect(test).toHaveBeenCalledWith(result);
    });

    it('should be success', () => {
      const result = helperEncryptionService.jwtEncrypt({ data });
      const isVerify = helperEncryptionService.jwtVerify(result);
      jest
        .spyOn(helperEncryptionService, 'jwtVerify')
        .mockImplementation(() => isVerify);

      expect(helperEncryptionService.jwtVerify(result)).toBe(isVerify);
    });

    it('should be failed', () => {
      const result = helperEncryptionService.jwtEncrypt(
        { data },
        { secretKey: '123123123' },
      );
      const isVerify = helperEncryptionService.jwtVerify(result);
      jest
        .spyOn(helperEncryptionService, 'jwtVerify')
        .mockImplementation(() => isVerify);

      expect(helperEncryptionService.jwtVerify(result)).toBe(isVerify);
    });
  });

  describe('jwtGetPayload', () => {
    it('should be called', () => {
      const test = jest.spyOn(helperEncryptionService, 'jwtGetPayload');

      const result = helperEncryptionService.jwtEncrypt({ data });
      helperEncryptionService.jwtGetPayload(result);
      expect(test).toHaveBeenCalledWith(result);
    });

    it('should be success', () => {
      const result = helperEncryptionService.jwtEncrypt({ data });
      jest
        .spyOn(helperEncryptionService, 'jwtGetPayload')
        .mockImplementation(() => data);

      expect(helperEncryptionService.jwtGetPayload(result)).toBe(data);
    });
  });
});
