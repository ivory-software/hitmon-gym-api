import { container } from '@test/utility/ioc/inversifyConfigTests';
import { ResendAccountVerificationCodeUseCase } from '@business/useCases/user/resendAccountVerificationCodeUseCase';
import { InputResendAccountVerificationCodeDto } from '@business/dto/user/resendAccountVerificationCodeDto';
import { userRepositoryMock } from '@test/utility/mocks/repository/userRepository.mock';
import { resendAccountVerificationCodeGeneralError, userIsNotFoundError } from '@business/module/errors/user/user';
import { randomCodeServiceMock } from '@test/utility/mocks/service/randomCodeService.mock';

describe('2-business.useCases.user.resendAccountVerificationCodeUseCase', () => {
  beforeEach(() => {
    container.snapshot();
  });

  afterEach(() => {
    container.restore();
  });

  const useCase = container.get(ResendAccountVerificationCodeUseCase);
  const input: InputResendAccountVerificationCodeDto = {
    email: 'email@mail.com',
  };

  it('should is not be able to resend code because exception in findByEmail method', async () => {
    jest.spyOn(userRepositoryMock, 'findByEmail').mockImplementationOnce(() => {
      throw new Error('mocked error');
    });

    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(resendAccountVerificationCodeGeneralError);
  });

  it('should calls findByEmail method with correct value', async () => {
    const spy = jest.spyOn(userRepositoryMock, 'findByEmail');

    await useCase.exec(input);

    expect(spy).toHaveBeenCalledWith(input.email);
  });

  it('should return left if user is not found', async () => {
    jest.spyOn(userRepositoryMock, 'findByEmail').mockImplementationOnce(async () => null);

    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(userIsNotFoundError);
  });

  it('should is not be able to create user because exception in generateCode method', async () => {
    jest.spyOn(randomCodeServiceMock, 'generateCode').mockImplementationOnce(() => {
      throw new Error('mocked error');
    });

    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(resendAccountVerificationCodeGeneralError);
  });

  it('should calls generateCode method', async () => {
    const spy = jest.spyOn(randomCodeServiceMock, 'generateCode');

    await useCase.exec(input);

    expect(spy).toHaveBeenCalled();
  });

  it('should is not be able to update user because exception in update method', async () => {
    jest.spyOn(userRepositoryMock, 'update').mockImplementationOnce(() => {
      throw new Error('mocked error');
    });

    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(resendAccountVerificationCodeGeneralError);
  });

  it('should calls update method with correct values', async () => {
    jest.useFakeTimers().setSystemTime(new Date('2023-01-01T00:00:00.000Z'));

    const spy = jest.spyOn(userRepositoryMock, 'update');

    await useCase.exec(input);

    expect(spy).toHaveBeenCalledWith('string', {
      accountVerificationCode: '001',
      accountVerificationCodeExpiresAt: new Date('2023-01-01T00:03:00.000Z'),
    });
  });

  // it('should create user on success', async () => {
  //   jest.spyOn(userRepositoryMock, 'findByEmail').mockImplementationOnce(async () => null);

  //   const result = await useCase.exec(input);

  //   expect(result.isLeft()).toBeFalsy();
  //   expect(result.isRight()).toBeTruthy();
  //   expect(result.value).toEqual(fakeUserEntity);
  // });
});
