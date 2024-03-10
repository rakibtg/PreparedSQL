/**
 * Prepares an SQL query by replacing named placeholders with "?" and collects the corresponding parameter values.
 *
 * @param {string} sql The SQL query string with named placeholders (e.g., ":name").
 * @param {Object.<string, any>} params An object mapping placeholders to their values. Values can be arrays or single values.
 * @returns {[string, Array.<any>]} A tuple where the first element is the new SQL query with "?" placeholders,
 *                                  and the second element is an array of the corresponding parameter values.
 */
function SqlPilot(sql, params) {
  var newParams = [];

  var newSql = sql.replace(/:([a-zA-Z0-9_]+)/g, function (match, key) {
    if (params.hasOwnProperty(key)) {
      var value = params[key];
      if (Array.isArray(value)) {
        var placeholders = value
          .map(function () {
            return "?";
          })
          .join(", ");
        value.forEach(function (item) {
          newParams.push(item);
        });
        return "(" + placeholders + ")";
      } else {
        newParams.push(value);
        return "?";
      }
    }

    return match;
  });

  return [newSql, newParams];
}
