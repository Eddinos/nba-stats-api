const querifyArgs = function (args) {
  let query = {};
  for (let key in args) {
    if (args[key] != null && typeof args[key] === 'string') query[key] = new RegExp(args[key], 'i')
    else query[key] = args[key]
  }
  return query;
}

export {querifyArgs}
