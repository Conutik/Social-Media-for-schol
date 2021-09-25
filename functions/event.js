var user = null;

history.scrollRestoration = "manual";

async function load() {
  var url_string = window.location.href; //window.location.href
  var url = new URL(url_string);
  var c = url.searchParams.get("id");

  if(!c) return window.location.href = "/invalid";

  axios.post('/validate', {
    id: c
  })
  .then(function (response) {
    if(response.data.name) {
      user = response.data.name
      return;
    }
    if(!response.data.real) return window.location.href = "/invalid";
  })
  .catch(function (error) {
    console.log(error);
  });


  let test = axios.get('/api')
    .then(function (response) {
      let data = response.data.idk;
      data = data.join("<hr>")
      document.getElementById("texts").innerHTML = data;
      window.scrollTo(0,document.body.scrollHeight);
    })

    
  
   
}

async function newText() {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const dateObj = new Date();
  const month = monthNames[dateObj.getMonth()];
  const day = String(dateObj.getDate()).padStart(2, '0');
  const year = dateObj.getFullYear();
  const time = dateObj.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })


  let msg = document.getElementById("msgBox").value;
  if(!msg) return;

  const output = user + ": " + msg + '<span style="float: right">' + "(" + month + '\n' + day + ' - ' + time + ")" + "</span>";


  document.getElementById("msgBox").value = "";
  await axios.post('/message', {
    msg: output
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  refresh()

  window.scrollTo(0,document.body.scrollHeight);

  
 
}

async function refresh() {

  let test = axios.get('/api')
    .then(function (response) {
      let data = response.data.idk;
      if(!data) return;
      data = data.join("<hr>")
      document.getElementById("texts").innerHTML = data;
    })
}

function keyEvent(e) {
  e.preventDefault()
  if(e.keyCode == 13) return newText();
  document.getElementById("msgBox").value = document.getElementById("msgBox").value + e.key;
  document.getElementById("msgBox").focus()
}

setInterval(function () { refresh() }, 2000)


window.onload = function () { load() }

document.getElementById("butn").onclick = function(){ newText() }

document.addEventListener('keypress', keyEvent);