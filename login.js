document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  // Here you can add validation if needed
  window.location.href = '/machine';
});