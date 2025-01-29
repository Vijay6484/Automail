// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Validate form fields
  const name = document.querySelector('input[type="text"]').value;
  const email = document.querySelector('input[type="email"]').value;
  
  if (name && email) {
    // Redirect to the new page
    window.location.href = "/machine.html";
  } else {
    alert("Please fill in all fields.");
  }
});

// Handle email form submission (only runs on machine.html)
document.addEventListener("DOMContentLoaded", function () {
  const emailForm = document.getElementById('emailForm');
  if (emailForm) {
    emailForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simulate email sending
      const sampleLogs = [
        { email: 'test1@example.com', status: 'success', message: 'Email sent successfully' },
        { email: 'test2@example.com', status: 'error', message: 'Failed to send email' }
      ];
      
      showLogs(sampleLogs);
    });
  }
});

// Function to display logs
function showLogs(logs) {
  const logsList = document.getElementById('logsList');
  if (!logsList) return;

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
  const logsDialog = document.getElementById('logsDialog');
  if (logsDialog) logsDialog.classList.remove('active');
}
