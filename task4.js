/**
 * Сверстайте кнопку, по клику на которую будет отправляться запрос к Timezone API. 
 * В запросе нужно отправить координаты местоположения пользователя, полученные с помощью Geolocation API. 
 * В ответ на запрос придёт объект, из которого нужно вывести на экран следующую информацию:
 * временная зона, в которой находится пользователь: параметр timezone;
 * местные дата и время: параметр date_time_txt.
 */

window.onload = function() {
  const button = document.querySelector('.button-task4')
  const outputArea = document.querySelector('.output')
  button.addEventListener('click', showInfo)
  
  /**
	 * Обновление данных в поле вывода
	 */
  function showInfo() {
    outputArea.innerHTML = ''
    getLocation()
  }

	/**
	 * Получение координат
	 */
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        getTimezone(position.coords.latitude, position.coords.longitude)
      }, error => {
        output('Информация о местоположении недоступна.')
      })
    }
  }

	/**
	 * Получение временной зоны
	 * @param {String} latitude 
	 * @param {String} longitude 
	 */
  function getTimezone(latitude, longitude) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', `https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${latitude}&long=${longitude}`, false);

    xhr.send();

    if (xhr.status != 200) {
      console.error( xhr.status + ': ' + xhr.statusText )
    } else {
      let response = JSON.parse(xhr.responseText)
      output(response.timezone)
      output(response.date_time_txt)
    }
    
  }

	/**
	 * Вывод текста
	 * @param {String} text 
	 */
  function output(text) {
    outputArea.insertAdjacentHTML('beforeend', `<p>${text}</p>`)
  }
}
