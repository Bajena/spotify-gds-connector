import DateUtils from '../src/DateUtils';

test('getDatePart', () => {
  const date = new Date('2018-07-09');

  expect(DateUtils.getDatePart(date)).toBe('2018-07-09');
});

test('getDashlessDatePart', () => {
  const date = new Date('2018-07-09');

  expect(DateUtils.getDashlessDatePart(date)).toBe('20180709');
});

test('getDashlessDateWithHour', () => {
  let date = new Date('2018-06-01 16:34');

  expect(DateUtils.getDashlessDateWithHour(date)).toBe('2018060116');

  date = new Date('2018-06-01 7:34');
  expect(DateUtils.getDashlessDateWithHour(date)).toBe('2018060107');
});
