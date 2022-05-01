/**
 * 
 */

window.onload = function() {
  const button = document.querySelector('.button-task4')
  const outputArea = document.querySelector('.output')
  button.addEventListener('click', showInfo)
  
  function showInfo() {
    outputArea.innerHTML = ''
    getLocation()
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        getTimezone(position.coords.latitude, position.coords.longitude)
      }, error => {
        output('Информация о местоположении недоступна.')
      })
    }
  }

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

  function output(text) {
    outputArea.insertAdjacentHTML('beforeend', `<p>${text}</p>`)
  }
}
