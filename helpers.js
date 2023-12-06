// helpers.js
module.exports = {
  // Safe access to object properties
  safeAccess: function (obj, prop) {
    return obj && obj.hasOwnProperty(prop) ? obj[prop] : '';
  }
};
