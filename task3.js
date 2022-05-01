/**
 * Сверстайте кнопку, клик на которую будет выводить 
 * на экран следующие данные:
 * Размеры экрана пользователя (ширина и высота).
 * Координаты местонахождения пользователя. Если пользователь отказался дать доступ 
 * к местоположению или данная функция недоступна в бразуере, 
 * вывести вместо координат сообщение «Информация о местоположении недоступна».
 */

window.onload = function() {
  const button = document.querySelector('.button-task3')
  const outputArea = document.querySelector('.output')
  button.addEventListener('click', showInfo)
  
  /**
	 * Обновление данных в поле вывода
	 */
  function showInfo() {
    outputArea.innerHTML = ''

    output(`Размер вашего экрана: ${window.screen.width} x ${window.screen.height}.`)
    getLocation()
  }

  /**
	 * Получение координат
	 */
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        output(`Ваши координаты: ${position.coords.latitude} широты, ${position.coords.longitude} долготы.`)
      }, error => {
        output('Информация о местоположении недоступна.')
      })
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
