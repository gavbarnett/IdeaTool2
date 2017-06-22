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

function print(inputs) {
  var oprands = inputs.split("-");
  var options = [];
  options["key"] = false;
  options["title"] = true;
  options["created"] = false;
  options["modified"] = false;
  options["description"] = false;
  options["thumbs_up"] = false;
  options["thumbs_down"] = false;
  options["comments"] = false;
  oprands.forEach(function(e) {
    if (e.startsWith("v")) {
      //verbose prints everything
      options["key"] = true;
      options["title"] = true;
      options["created"] = true;
      options["modified"] = true;
      options["description"] = true;
      options["thumbs_up"] = true;
      options["thumbs_down"] = true;
      options["comments"] = true;
    }
    if (e.startsWith("k")) {
      options["key"] = true;
    }
    if (e.startsWith("t")) {
      options["title"] = true;
    }
    if (e.startsWith("c")) {
      options["created"] = true;
    }
    if (e.startsWith("m")) {
      options["modified"] = true;
    }
    if (e.startsWith("d")) {
      options["description"] = true;
    }
    if (e.startsWith("p")) {
      options["thumbs_up"] = true;
    }
    if (e.startsWith("n")) {
      options["thumbs_down"] = true;
    }
    if (e.startsWith("c")) {
      options["comments"] = true;
    }
    if (e.startsWith("h")) {
      addtolist("print (-k -t -c -m -d -p -n -c)", "i");
      addtolist("-k key", "i");
      addtolist("-t title", "i");
      addtolist("-c created", "i");
      addtolist("-m modified", "i");
      addtolist("-d description", "i");
      addtolist("-p thumbs_up", "i");
      addtolist("-n thumbs_down", "i");
      addtolist("-c comments", "i");
      return;
    }
  })
  $.ajax({
    url: urlbase + "?apiKey=" + myAPI,
  }).done(function(data) {
    console.log(data);
    $.each(data, function(key, data) {
      console.log(data.title, data._id.$oid);
      if (options["key"]) {
        addtolist("#" + data._id.$oid);
      }
      if (options["title"]) {
        addtolist(data.title, "b");
      }
      if (options["created"]) {
        addtolist("> Created: " + data.created);
      }
      if (options["modified"]) {
        addtolist("> Last modified: " + data.modified, "i");
      }
      if (options["description"]) {
        addtolist("> " + data.description);
      }
      if (options["thumbs_up"]) {
        addtolist("> Thumbs up: " + data.thumbs_up);
      }
      if (options["thumbs_down"]) {
        addtolist("> Thumbs down: " + data.thumbs_down);
      }
      if (options["comments"]) {
        if (data.comments.length > 0) {
          addtolist("********** comments *********");
          (data.comments).forEach(function(c) {
            addtolist("-> " + c[1] + " - (" + c[0] + ")");
          })
          addtolist("****** end of comments ******")
        }
      }
      addtolist("---------------------------");
    });
  })
}

function add(inputs) {
  var oprands = inputs.split("-");
  var title = "";
  var description = "";
  oprands.forEach(function(e) {
    if (e.startsWith("t")) {
      $.trim(title = e.substr(2));
    }
    if (e.startsWith("d")) {
      $.trim(description = e.substr(2));
    }
    if (e.startsWith("h")) {
      addtolist("add -t [title] -d [description]", "i");
      return;
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

function comment(inputs) {
  var oprands = inputs.split("-");
  var id = "";
  var comment = "";
  oprands.forEach(function(e) {
    if (e.startsWith("i")) {
      id = $.trim(e.substr(2));
    }
    if (e.startsWith("c")) {
      comment = $.trim(e.substr(2));
    }
    if (e.startsWith("h")) {
      addtolist("comment -i [id] -c [comment]", "i");
      return;
    }
  })
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
