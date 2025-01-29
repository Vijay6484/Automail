document.getElementById('emailForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Simulate email sending
  const sampleLogs = [
    { email: 'test1@example.com', status: 'success', message: 'Email sent successfully' },
    { email: 'test2@example.com', status: 'error', message: 'Failed to send email' }
  ];
  
  showLogs(sampleLogs);
});

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

function closeDialog() {
  document.getElementById('logsDialog').classList.remove('active');
}