/* eslint-disable @typescript-eslint/no-explicit-any */

import { StatusCodes } from 'src/enums';
import { format } from 'date-fns';

/**
 * Check fetch Response HTTP Status
 */
export function checkStatus(response: Response): any {
  if (hasErrorOrEmptyResult(response.status)) {
    let error = {
      status: response.status,
    };
    throw error;
  }

  if (response.ok) {
    return response;
  }

  return response.json().then(data => {
    throw data;
  });
}

function hasErrorOrEmptyResult(statusCode: number): boolean {
  return (
    statusCode === StatusCodes.NoContent ||
    statusCode === StatusCodes.Unauthorized ||
    statusCode === StatusCodes.Forbidden
  );
}

const dataRateRegexForUnspecifiedKind = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(.\d+)?$/;
const iso8601DateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:((\.\d+)?Z)|((\.\d+)?\+\d{2}:\d{2}))?$/;
// Примеры для проверки
//2018-02-14T23:32:56.5987719+03:00
//2018-02-10T09:42:14.4575689Z
//2018-03-12T10:46:32.123

/**
 * Resursively replace all strings like "yyyy-MM-ddThh:mm:ss.xxxZ" to `Date` objects
 */
export function parseJsonDates<T>(data: T): T {
  if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      data[i] = parseJsonDates(data[i]);
    }
  } else if (typeof data === 'object') {
    // eslint-disable-next-line guard-for-in
    for (const key in data) {
      data[key] = parseJsonDates(data[key]);
    }
  } else if (typeof data === 'string' && dataRateRegexForUnspecifiedKind.test(data)) {
    return new Date(`${data}${format(new Date(), "xxx")}`) as any;
  } else if (typeof data === 'string' && iso8601DateRegex.test(data)) {
    return new Date(data) as any;
  }
  return data;
}

export function parseStringToObject<T>(data: string): T {
  const dataObj = parseJsonDates(JSON.parse(data));
  
  return dataObj;
}
