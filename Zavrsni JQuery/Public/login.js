const username = $('#username');
const password = $('#password');
const loginWarning = $('#loginWarning');

$('#login').on('click', function () {
  $.ajax({
    url: '/api/login',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      username: username.val(),
      password: password.val()
    }),
    success: function (data) {
      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = 'index.html';
      } else {
        loginWarning.text(data.message);
      }
    },
    error: function (err) {
      console.error(err);
    }
  });
});

$('#signup').on('click', function () {
  $.ajax({
    url: '/api/signup',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      username: username.val(),
      password: password.val()
    }),
    success: function (data) {
      if (data.success) {
        window.location.href = 'index.html';
      } else {
        loginWarning.text(data.message);
      }
    },
    error: function (err) {
      console.error(err);
    }
  });
});
