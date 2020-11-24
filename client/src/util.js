import moment from 'moment'

export function isVietnamesePhoneNumber(number) {
    return /(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(number);
}
export function upperCaseFirstName(name)  {
    let regex = /(\b[a-z](?!\s))/g;
    return name.replace(regex, function(x){return x.toUpperCase();});
}

export function regexPassword(password) {
    let regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/
    return regex.test(password)
}

export function changeTimeStamp(time){
  return  moment(time).locale('vi').startOf("seconds").fromNow()
}
export function truncate(str){
    return str.length>20 ? str.substr(0,19) + '...' : str;
}