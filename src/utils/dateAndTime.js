const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', options);
}
  
const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
}

const dateToString = (date) => {
  const dateString = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
  return dateString;
}

const dateToKoreanString = (initialString) => {
  const dayToKorean = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

  const dateObj = new Date(initialString);

  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const date = dateObj.getDate();
  const day = dateObj.getDay();

  const hour = dateObj.getHours();
  const minute = dateObj.getMinutes();

  const isAfternoon = ( hour > 12 ? true : false )

  const result = year + '년 ' + month + '월 ' + date + '일 ' + dayToKorean[day] + '(' + (isAfternoon ? '오후 ' : '오전 ')
                  + (isAfternoon ? (hour === 12 ? hour : (hour - 12)) : hour) + ':' 
                  + (0 + minute.toString()).slice(-2) + ")";

  return result;
}

export { formatDate, formatTime, dateToString, dateToKoreanString };