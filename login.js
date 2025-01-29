// Store credentials globally
let credentials = {
  email: '',
  password: '',
  name: ''
};

document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const form = e.target;
  credentials = {
    name: form.querySelector('input[type="text"]').value,
    email: form.querySelector('input[type="email"]').value,
    password: form.querySelector('input[type="password"]').value
  };
  
  // Store credentials in sessionStorage for machine.js to access
  sessionStorage.setItem('credentials', JSON.stringify(credentials));
  
  window.location.href = '/machine';
});