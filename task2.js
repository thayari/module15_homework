window.onload = function() {
  const button = document.querySelector('.button-task2')
  const outputArea = document.querySelector('.output')
  button.addEventListener('click', changeSvg)

  function changeSvg() {
    button.classList.toggle('fill-icon')
  }
}
