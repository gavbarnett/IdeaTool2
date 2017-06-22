//THIS IS SUPER INSECURE!!!!!
//but it's only a test, :-D
var myAPI = ""
var urlbase = "https://api.mlab.com/api/1/databases/ideadb/collections/test"
var objecttracker = [];
$(document).ready(function() {
  var title = Math.floor(Math.random() * 100);
  var description = Math.floor(Math.random() * 1000);
  console.log("Please enter myAPI value...");
  addtolist("DB:- " + "Please enter myAPI value...");
  //add_data(title, description);
});

function get_data() {
  $.ajax({
    url: urlbase + "?apiKey=" + myAPI,
  }).done(function(data) {
    console.log(data);
    $.each(data, function(key, data) {
      console.log(data.title, data._id.$oid);
      addtolist(data.title, "b");
      addtolist(".  " + data.description);
    });
  })
}

function add_data(inputs) {
  var oprands = inputs.split("-");
  var title = "";
  var description = "";
  console.log(oprands);
  oprands.forEach(function(e) {
    if (e.startsWith("t")) {
      title = e.substr(2);
    }
    if (e.startsWith("d")) {
      description = e.substr(2);
    }
  })
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
