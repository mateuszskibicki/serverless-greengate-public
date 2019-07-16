const TextHelper = object => {
  if (object && object[0] && object[0].text && object[0].text.length > 0)
    return object[0].text;
  return null;
};

//number helper
const NumberHelper = object => {
  if (object && typeof object === "number") return object;
  return null;
};

//short information helper like date/uid/dropdown/color
const SmallTextHelper = object => {
  if (
    object &&
    object.length > 0 &&
    object !== null &&
    typeof object === "string"
  )
    return object;
  return null;
};

//url helper
const UrlHelper = object => {
  if (object && object.url && object.url.length > 0) return object.url;
  return null;
};

//img helper
const ImgHelper = object => {
  if (object && object.url && object.url.length > 0)
    return { url: object.url, alt: SmallTextHelper(object.alt) };
  return null;
};

//rich text helper
const ArrayHelper = object => {
  if (object && Array.isArray(object) && object[0] && object.length > 0)
    return object;
  return null;
};

//short information helper like date/uid/dropdown/color
const EmbedHelper = object => {
  if (object) return object;
  return null;
};

module.exports = {
  TextHelper,
  NumberHelper,
  SmallTextHelper,
  UrlHelper,
  ImgHelper,
  ArrayHelper,
  EmbedHelper
};
