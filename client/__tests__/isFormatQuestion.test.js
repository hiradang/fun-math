import { isFormatQuestion } from '../src/utils/ValidateForm';
test('test case 1', () => {
  expect(isFormatQuestion('100x?=?')).toEqual(true);
});

test('test case 2', () => {
  expect(isFormatQuestion('100+?=?')).toEqual(true);
});

test('test case 3', () => {
  expect(isFormatQuestion('100-?=?')).toEqual(true);
});

test('test case 4', () => {
  expect(isFormatQuestion('100:?=?')).toEqual(true);
});

test('test case 5', () => {
  expect(isFormatQuestion('Chứa kí tự đặc biệt không cho phép như: {[]};*&^$#@/~')).toEqual(false);
});
