//THIS IS SUPER INSECURE!!!!!
var myAPI = "2tm9Xv3INUU5GH_HfSB2V_jelm89by6d"

//on load do:
$(document).ready(function() {

  $.ajax({
    url: "https://api.mlab.com/api/1/databases/ideadb/collections/test?apiKey=" + myAPI,
    data: JSON.stringify({
      "testval1": 1,
      "testval2": "two",
      "testval3": "fart123"
    }),
    type: "POST",
    contentType: "application/json",
    success: function(data) {
      //window.location.href = "index.html";
      console.log("done");
      getdata();
    },
    error: function(xhr, status, err) {
      console.log(err);
    }
  });
});

function getdata() {
  $.ajax({
    url: "https://api.mlab.com/api/1/databases/ideadb/collections/test?apiKey=" + myAPI,
  }).done(function(data) {
    console.log(data);
    return (data);
  })
}
