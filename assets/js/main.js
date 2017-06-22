//THIS IS SUPER INSECURE!!!!!
//but it's only a test, :-D
var myAPI = "2tm9Xv3INUU5GH_HfSB2V_jelm89by6d"
var urlbase = "https://api.mlab.com/api/1/databases/ideadb/collections/test"
var objecttracker = [];
//on load do:
$(document).ready(function() {
  var title = Math.floor(Math.random() * 100);
  var description = Math.floor(Math.random() * 1000);
  //add_data(title, description);
  load_canvas();
});

function load_canvas() {
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  get_data(1);
}

function get_data(draw) {
  $.ajax({
    url: urlbase + "?apiKey=" + myAPI,
  }).done(function(data) {
    console.log(data);
    $.each(data, function(key, data) {
      console.log(data.title, data._id.$oid);
    });
    if (draw) {
      var c = document.getElementById("myCanvas");
      var ctx = c.getContext("2d");
      ctx.clearRect(0, 0, c.width, c.height);
      var counter = 0;
      $.each(data, function(key, data) {
        counter += 1;
        objecttracker["id"] = data._id.$oid
        objecttracker["x"] = (20)
        objecttracker["y"] = (counter * 50)
        ctx.fillStyle = "#0000FF";
        ctx.fillRect(objecttracker["x"], objecttracker["y"], 400, 30);
        ctx.font = "22px Arial";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(data.title, objecttracker["x"] + 10, objecttracker["y"] + 25);
        ctx.fillStyle = "#eeeeee";
        ctx.fillRect(objecttracker["x"], objecttracker["y"] + 30, 400, 170);
        ctx.font = "16px Arial";
        ctx.fillStyle = "#333333";
        ctx.fillText(data.description, objecttracker["x"] + 10, objecttracker["y"] + 45);
      });
    }
  })
}

function add_data(title, description) {
  $.ajax({
    url: urlbase + "?apiKey=" + myAPI,
    data: JSON.stringify({
      "title": title,
      "created": new Date(),
      "modified": new Date(),
      "description": description,
      "thumbs_up": 0,
      "thumbs_down": 0,
      "comments": []
    }),
    type: "POST",
    contentType: "application/json",
    success: function(data) {
      //window.location.href = "index.html";
      console.log("done");
    },
    error: function(xhr, status, err) {
      console.log(err);
    }
  })
}

function add_comment(id, comment) {
  $.ajax({
    url: urlbase + "/" + id + "?apiKey=" + myAPI,
  }).done(function(data) {
    data["comments"][data["comments"].length] = [new Date(), comment];
    updateDB(id, data);
  })
}

function thumbs_up(id) {
  $.ajax({
    url: urlbase + "/" + id + "?apiKey=" + myAPI,
  }).done(function(data) {
    data["thumbs_up"] += 1;
    updateDB(id, data);
  })
}

function thumbs_down(id) {
  $.ajax({
    url: urlbase + "/" + id + "?apiKey=" + myAPI,
  }).done(function(data) {
    data["thumbs_down"] += 1;
    updateDB(id, data);
  })
}

function updateDB(id, data) {
  $.ajax({
    url: urlbase + "/" + id + "?apiKey=" + myAPI,
    data: JSON.stringify({
      "title": data["title"],
      "created": data["created"],
      "modified": data["modified"],
      "description": data["description"],
      "thumbs_up": data["thumbs_up"],
      "thumbs_down": data["thumbs_down"],
      "comments": data["comments"]
    }),
    type: "PUT",
    contentType: "application/json",
    success: function(data) {
      //window.location.href = "index.html";
      console.log("done");
    },
    error: function(xhr, status, err) {
      console.log(err);
    }
  })
}
