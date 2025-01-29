// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Validate form fields (you can also improve validation logic here)
  const name = document.querySelector('input[type="text"]').value;
  const email = document.querySelector('input[type="email"]').value;
  
  if (name && email) {
    // Hide login page and show email page
    document.getElementById('loginPage').classList.remove('active'); // Hide login page
    document.getElementById('emailPage').classList.add('active');   // Show email page
  } else {
    alert("Please fill in all fields.");
  }
});

// Handle email form submission
document.getElementById('emailForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Simulate email sending
  const sampleLogs = [
    { email: 'test1@example.com', status: 'success', message: 'Email sent successfully' },
    { email: 'test2@example.com', status: 'error', message: 'Failed to send email' }
  ];
  
  showLogs(sampleLogs);
});

// Function to display logs
function showLogs(logs) {
  const logsList = document.getElementById('logsList');
  logsList.innerHTML = '';
  
  logs.forEach(log => {
    const logItem = document.createElement('div');
    logItem.className = `log-item ${log.status}`;
    
    const emailP = document.createElement('p');
    emailP.textContent = log.email;
    
    const messageP = document.createElement('p');
    messageP.textContent = log.message;
    
    logItem.appendChild(emailP);
    logItem.appendChild(messageP);
    logsList.appendChild(logItem);
  });
  
  document.getElementById('logsDialog').classList.add('active');
}

// Function to close the log dialog
function closeDialog() {
  document.getElementById('logsDialog').classList.remove('active');
}
