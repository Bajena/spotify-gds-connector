import DateUtils from '../src/DateUtils';

test('getDatePart', () => {
  const date = new Date('2018-07-09');

  expect(DateUtils.getDatePart(date)).toBe('2018-07-09');
});

