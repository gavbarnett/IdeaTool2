//THIS IS SUPER INSECURE!!!!!
var myAPI = "2tm9Xv3INUU5GH_HfSB2V_jelm89by6d"

//on load do:
$(document).ready(function() {
  var title = Math.floor(Math.random() * 100);
  var description = Math.floor(Math.random() * 1000);
  add_data(title, description);
  get_data();
});

function get_data() {
  $.ajax({
    url: "https://api.mlab.com/api/1/databases/ideadb/collections/test?apiKey=" + myAPI,
  }).done(function(data) {
    console.log(data);
    $.each(data, function(key, data) {
      console.log(data.title, data._id.$oid);
    });
  })
}

function add_data(title, description) {
  $.ajax({
    url: "https://api.mlab.com/api/1/databases/ideadb/collections/test?apiKey=" + myAPI,
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
    url: "https://api.mlab.com/api/1/databases/ideadb/collections/test/" + id + "?apiKey=" + myAPI,
  }).done(function(data) {
    var pos = data["comments"].length
    data["comments"][pos] = [];
    data["comments"][pos] = [new Date(), comment];
    $.ajax({
      url: "https://api.mlab.com/api/1/databases/ideadb/collections/test/" + id + "?apiKey=" + myAPI,
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
  })
}

function thumbs_up(id) {
  $.ajax({
    url: "https://api.mlab.com/api/1/databases/ideadb/collections/test/" + id + "?apiKey=" + myAPI,
  }).done(function(data) {
    data["thumbs_up"] += 1;
    $.ajax({
      url: "https://api.mlab.com/api/1/databases/ideadb/collections/test/" + id + "?apiKey=" + myAPI,
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
  })
}

function thumbs_down(id) {
  $.ajax({
    url: "https://api.mlab.com/api/1/databases/ideadb/collections/test/" + id + "?apiKey=" + myAPI,
  }).done(function(data) {
    data["thumbs_down"] += 1;
    $.ajax({
      url: "https://api.mlab.com/api/1/databases/ideadb/collections/test/" + id + "?apiKey=" + myAPI,
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
  })
}
