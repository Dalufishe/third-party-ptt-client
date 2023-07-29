import _ from "lodash";

function serializeCookie(object: object) {
  let serializeCookie = "";

  _.forEach(object, (value, key) => {
    let serializeKey = encodeURIComponent(key);
    let serializeValue = encodeURIComponent(value);
    serializeCookie += serializeKey + "=" + serializeValue + "; ";
  });

  return serializeCookie;
}

export default serializeCookie;
