$(document).ready(function() {
  // Getting references to our form and inputs
  var loginForm = $("form.login");
  var email = $("input#login_email");
  var password = $("input#login_password");

  $.get("/artist_login/api/user_data").then(function(data) {
    $(".member_name").text(data.name);
  });

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: email.val().trim(),
      password: password.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    email.val("");
    password.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/artist_login/artist_login", {
      email: email,
      password: password
    }).then(function() {
        location.assign("/");
        // If there's an error, log the error
      })
      .catch(function(err) {
        console.log(err);
      });
  }
});