const username = document.getElementById('username');
const password = document.getElementById('password');
const loginWarning = document.getElementById('loginWarning');
const login = document.getElementById('login');
const signup = document.getElementById('signup');


login.addEventListener('click', () => {
    fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        username: username.value,
        password: password.value
    })
    })
    .then(response => response.json())
    .then(data => {
    if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = 'index.html';
    } else {
        loginWarning.textContent = data.message;
    }
    })
    .catch(err => console.error(err));
})
signup.addEventListener('click', () => {
    fetch('/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        username: username.value,
        password: password.value
    })
    })
    .then(response => response.json())
    .then(data => {
        loginWarning.textContent = data.message;
    })
    .catch(err => console.error(err));
})