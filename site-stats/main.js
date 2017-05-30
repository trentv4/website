window.get = (e) => document.getElementById(e)
window.httpGet = (url, callback) => {
  let request = new XMLHttpRequest()
  request.onreadystatechange = () => {
    if(request.readyState == 4 & request.status == 200) {
      callback(request.responseText)
    }
  }
  request.open("GET", url, true)
  request.send()
}

httpGet("/api/site-stats", (d) => {
  let data = JSON.parse(d)
  console.log(data)
  for (let i in data) {
      if(data.hasOwnProperty(i)) {
        let dat = data[i]

        let total = 0
        for (let q in dat) {
          if(dat.hasOwnProperty(q)) {
            total += dat[q]
          }
        }

        let container = `
        <div class="data-container">
          <h4><a href="`+i+`">`+i+` : `+total+`</a></h4>
          <div class="data-list">
        `
        for (let q in dat) {
          if(dat.hasOwnProperty(q)) {
            container += `<li>`+q+` : `+dat[q]+`</li>`
          }
        }

        container += `</div></div>`

        get("page").innerHTML += container
      }
  }
})
