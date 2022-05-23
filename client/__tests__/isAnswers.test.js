import { isAnswers } from '../src/utils/ValidateForm';

test('test case 1', () => {
  expect(isAnswers('1,100,2')).toEqual(true);
});

test('test case 2', () => {
  expect(isAnswers('120')).toEqual(true);
});

test('test case 3', () => {
  expect(isAnswers('Chứa kí tự đặc biệt không cho phép như: {[]};*&^$#@/~')).toEqual(false);
});