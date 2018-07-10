var DateUtils = {
  /*
  * Converts Date object to a String containing the date part (with dashes).
  *
  * @return {String} Date part. E.g. '2018-07-10'.
  */
  getDatePart: function(dateObject) {
    return dateObject.toISOString().slice(0, 10);
  },

  getDashlessDatePart: function(dateObject) {
    return DateUtils.getDatePart(dateObject).replace(/-/g, "");
  },

  getDashlessDateWithHour: function(dateObject) {
    var hours = dateObject.getHours();
    var hourPart = (hours < 10 ? '0' : '') + hours;
    return DateUtils.getDashlessDatePart(dateObject) + hourPart;
  }
}

var module = module || {};
module.exports = DateUtils;
