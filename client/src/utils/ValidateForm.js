export function removeVietnameseTones(str) {
  if (str === null || str === undefined) return str;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  return str;
}
export function isVietnamese(str) {
  var re = /^[a-zA-Z0-9!%?><)( +=:,.-]{2,}$/g; // regex here
  return re.test(removeVietnameseTones(str));
}

export function isFormatQuestion(str) {
  var re = /^[x0-9?+=:-]{2,}$/g; // regex here
  return re.test(str);
}

export function isAnswers(str) {
  var re = /^[0-9,]{2,}$/g; // regex here
  return re.test(str);
}

export function isNumber(str) {
  var reg = /^\d+$/;
  return reg.test(str);
}
