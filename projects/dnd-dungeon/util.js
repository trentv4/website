window.get = (e) => document.getElementById(e)
window.message = (color, str) => {
  get("message").innerHTML = "<br>"
  setTimeout(() => {
    get("message").style = "color: " + color
    get("message").innerHTML = str
  }, 500)
}
window.make = (e) => document.createElement(e)
