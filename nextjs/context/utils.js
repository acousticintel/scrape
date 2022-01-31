import formatDistance from 'date-fns/formatDistance'; // load on demand

export function containsObject(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (JSON.stringify(list[i]) === JSON.stringify(obj)) {
      return true;
    }
  }

  return false;
}

export function getElapsedTime(unix_timestamp) {
  return formatDistance(new Date(), new Date(Number(unix_timestamp)));
}