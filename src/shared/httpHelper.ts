import { HttpResponse } from '@business/services/iController';
import { IError } from './iError';

export const serverError = (error: any): HttpResponse => {
  return {
    statusCode: 500,
    body: error,
  };
};

export const badRequest = (error: IError): HttpResponse => {
  return {
    statusCode: 400,
    body: error,
  };
};

export const created = (data: any): HttpResponse => {
  return {
    statusCode: 201,
    body: data,
  };
};

export const ok = (data: any): HttpResponse => {
  return {
    statusCode: 200,
    body: data,
  };
};

export const unauthorized = (error: IError): HttpResponse => {
  return {
    statusCode: 401,
    body: error,
  };
};

export const notFound = (error: IError): HttpResponse => {
  return {
    statusCode: 404,
    body: error,
  };
};
