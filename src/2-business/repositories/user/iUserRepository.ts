import { IUserEntity, RegistrationStep } from '@domain/entities/userEntity';

export const IUserRepositoryToken = Symbol.for('IUserRepositoryToken');

export type OutputFindById = IUserEntity | null;

export type OutputFindByEmail = IUserEntity | null;

export type InputCreateUser = {
  id: string;
  email: string;
  password: string;
  userName: string;
  registrationStep: RegistrationStep;
  accountVerificationCode: string;
  accountVerificationCodeExpiresAt: Date;
};

export type OutputFindByAccountVerificationCode = IUserEntity | null;

export interface IUserRepository {
  create(input: InputCreateUser): Promise<IUserEntity>;
  findById(id: string): Promise<OutputFindById>;
  findByEmail(email: string): Promise<OutputFindByEmail>;
  findByAccountVerificationCode(code: string): Promise<OutputFindByAccountVerificationCode>;
  update(id: string, params: Partial<IUserEntity>): Promise<IUserEntity>;
}
