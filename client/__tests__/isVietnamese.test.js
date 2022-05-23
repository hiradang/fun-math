import { isVietnamese } from '../src/utils/ValidateForm';

test('test case 1', () => {
  expect(
    isVietnamese(
      'Bố Loan sở hữu 80% cổ phần công ty A, bố cho Loan 20%. Hỏi bố Loan còn bao nhiêu phần trăm (%) cổ phần?'
    )
  ).toEqual(true);
});

test('test case 2', () => {
  expect(
    isVietnamese(
      'Bình có 10 cái kẹo, Loan có 2 cái kẹo. Vậy số kẹo của Bình > số kẹo của Loan. Hỏi Bình nhiều hơn Loan mấy cái kẹo?'
    )
  ).toEqual(true);
});

test('test case 3', () => {
  expect(isVietnamese('Chứa kí tự đặc biệt không cho phép như: {[]};*&^$#@/~')).toEqual(false);
});
