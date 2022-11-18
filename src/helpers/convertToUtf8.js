const convertToUtf8 = (str) => {
  const allowed =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@*_+-./,";
  str = str.toString();
  var len = str.length,
    R = "",
    k = 0,
    S,
    chr,
    ord;
  while (k < len) {
    chr = str[k];
    if (allowed.indexOf(chr) != -1) {
      S = chr;
    } else {
      ord = str.charCodeAt(k);
      if (ord < 256) {
        S = "%" + ("00" + ord.toString(16)).toUpperCase().slice(-2);
      } else {
        S = "%u" + ("0000" + ord.toString(16)).toUpperCase().slice(-4);
      }
    }
    R += S;
    k++;
  }
  return decodeURIComponent(R);
};

export default convertToUtf8;
