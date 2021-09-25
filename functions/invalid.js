var user = null;

function load() {
    window.location.href = "/events?id=" + document.getElementById("msgBox").value;
}

function keyEvent(e) {
    e.preventDefault()
    if(e.keyCode == 13) return newText();
    document.getElementById("msgBox").value = document.getElementById("msgBox").value + e.key;
    document.getElementById("msgBox").focus()
  }

document.getElementById("butn").onclick = function(){ load() }

document.addEventListener('keypress', keyEvent);