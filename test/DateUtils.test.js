const DateUtils = require('../src/DateUtils.js');

test('getDatePart', () => {
  const date = new Date('2018-07-09');

  expect(DateUtils.getDatePart(date)).toBe('2018-07-09');
});

