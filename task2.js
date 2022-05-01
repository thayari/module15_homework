/**
 * Задание 2.
 * Сверстайте кнопку, которая будет содержать в себе icon_01. 
 * При клике на кнопку иконка должна меняться на icon_02. 
 * Повторный клик меняет иконку обратно.
 */

window.onload = function() {
  const button = document.querySelector('.button-task2')
  button.addEventListener('click', changeSvg)

  function changeSvg() {
    button.classList.toggle('fill-icon')
  }
}
