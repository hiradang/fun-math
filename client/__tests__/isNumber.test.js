import { isNumber } from '../src/utils/ValidateForm';

test('test case 1', () => {
  expect(isNumber('2021')).toEqual(true);
});

test('test case 2', () => {
  expect(isNumber('my text')).toEqual(false);
});

test('test case 3', () => {
  expect(isNumber('năm học 2022 - 2023 ')).toEqual(false);
});

test('test case 4', () => {
  expect(isNumber('Chứa kí tự đặc biệt không cho phép như: {[]};*&^$#@/~')).toEqual(false);
});