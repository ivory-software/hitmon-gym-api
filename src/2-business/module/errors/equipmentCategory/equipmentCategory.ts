import { IError } from '@shared/iError';

export const createEquipmentCategoryGeneralError: IError = {
  code: '001',
  message: 'Create Equipment Category General Error',
  shortMessage: 'createEquipmentCategoryGeneralError',
};

export const equipmentCategoryAlreadyInUseError: IError = {
  code: '002',
  message: 'Equipment Category Is Already In Use',
  shortMessage: 'equipmentCategoryisAlreadyInUse',
};

export const listEquipmentCategoriesGeneralError: IError = {
  code: '003',
  message: 'List Equipment Categories General Error',
  shortMessage: 'listEquipmentCategoriesGeneralError',
};
