document.onkeydown = checkKey;
document.onclick = checkMouse;

function checkKey(e) {
  e = e || window.event;
  switch (e.keyCode) {
    case 13:
      // enter pressed
      e.preventDefault();
      var input = document.getElementById("input").value;
      document.getElementById("input").value = "";
      //console.log(input);
      addtolist("User:- " + input);
      funcchecker(input);
      break;
  }
}

function funcchecker(input) {
  /* The aim here is to follow the
  UNIX standard command structure
  https://www.le.ac.uk/oerresources/bdra/unix/page_17.htm*/
  var command = input.split(" ", 1); //gets command
  var oprands = input.substr(command[0].length + 1);
  switch (command[0]) {
    case "add":
      add(oprands);
      break;
    case "comment":
      comment(oprands);
      break;
    case "print":
      print(oprands);
      break;
  }
}

function checkMouse(e) {
  document.getElementById("input").focus();
}

function addtolist(input, format) {
  if (!format) {
    format = "body";
  }
  var ul = document.getElementById("output");
  var li = document.createElement("li");
  var elm = document.createElement(format);
  var txt = document.createTextNode(input);
  elm.appendChild(txt);
  li.appendChild(elm);
  li.setAttribute("id", "element4"); // added line
  ul.appendChild(li);
  //alert(li.id);
  //scrolling to end
  document.getElementById("input").scrollIntoView(false);
}
