// Get credentials from login page
const credentials = JSON.parse(sessionStorage.getItem('credentials') || '{}');

// Email sending configuration
let emailConfig = {
  smtpDomain: '',
  smtpPort: '',
  subject: '',
  body: '',
  attachment: null
};

// Store CSV data
let emailList = [];

// Handle CSV file upload
document.querySelector('input[type="file"][accept=".csv"]').addEventListener('change', async function(e) {
  const file = e.target.files[0];
  if (file) {
    try {
      const text = await file.text();
      emailList = parseCSV(text);
      console.log(`Loaded ${emailList.length} email addresses`);
    } catch (err) {
      console.error('Error reading CSV:', err);
    }
  }
});

// Parse CSV content - matching Python implementation
function parseCSV(text) {
  const rows = text.split('\n');
  const headers = rows[0].split(',').map(h => h.trim());
  const nameIndex = headers.indexOf('NAME');
  const emailIndex = headers.indexOf('EMAILID');
  
  if (nameIndex === -1 || emailIndex === -1) {
    alert('CSV must contain NAME and EMAILID columns');
    return [];
  }
  
  return rows.slice(1) // Skip header row
    .map(row => {
      const columns = row.split(',').map(col => col.trim());
      return {
        name: columns[nameIndex],
        email: columns[emailIndex]
      };
    })
    .filter(person => person.name && isValidEmail(person.email));
}

// Email validation
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Handle form submission
document.getElementById('emailForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(e.target);
  emailConfig = {
    smtpDomain: formData.get('smtpDomain'),
    smtpPort: formData.get('smtpPort'),
    subject: formData.get('subject'),
    body: formData.get('body'),
    attachment: document.querySelector('input[type="file"]:not([accept=".csv"])').files[0]
  };

  if (emailList.length === 0) {
    alert('Please upload a CSV file with email addresses');
    return;
  }

  // Process emails
  console.log(emailConfig)
  // const results = await sendEmails();
  // showLogs(results);
});

// Send emails - matching Python implementation
async function sendEmails() {
  try {
    const emailBody = `Dear Founder,\n\n` +
      `Building a successful startup is challenging—but you don't have to do it alone.\n\n` +
      `I'm personally inviting you to join Primewise Founders Club's exclusive networking session where founders connect with other like-minded entrepreneurs who've walked or are walking the path you're on.\n\n` +
      `📅 Date: February 1st, 2025\n` +
      `⏰ Time: 12:00 PM - 1:30 PM (IST)\n` +
      `📍 Format: Online/Hybrid\n\n` +
      `What's in it for you:\n` +
      `\t- Premium Networking Sessions: Bi-monthly networking sessions with seasoned entrepreneurs in different fields.\n` +
      `\t- Strategic Partnerships: Collaborate with fellow founders on new ventures.\n` +
      `\t- Scaling Discussions: Exchange ideas on growth and market expansion.\n` +
      `\t- Investment Opportunities: Be the first to discover promising startups.\n` +
      `\t- A Supportive Community: Celebrate wins and overcome challenges together.\n\n` +
      `Expand your influence while contributing to the startup ecosystem. Be part of a tribe of ambitious founders making their mark.\n\n` +
      `Early Bird Bonus:\n` +
      `5 Early Birds will get a chance to win premium membership to the Founders Club and exclusive access to our Founders' WhatsApp community.\n\n` +
      `Limited to 20 participants to ensure quality interactions.\n` +
      `👉Reserve your spot now: https://forms.gle/dP1B1ohMcCfMov2P8\n` +
      `More Info: https://primewiseconsulting.com/founders-club/\n\n` +
      `Questions? Just reply to this email—I'm here to help!\n\n` +
      `Best regards,\n` +
      `Vijay Tiwari\n` +
      `Primewise Founders' Club\n\n` +
      `P.S. Bring another founder friend and get access to our exclusive resources library!`;


    console.log(JSON.stringify({
  subject: emailConfig.subject,
  body: emailConfig.body,
  smtp_server: emailConfig.smtpDomain,
  smtp_port: emailConfig.smtpPort,
  sender_email: credentials.email,
  sender_password: credentials.password,
  sendees: emailList
}));
    // Make API call to send email
  //   const response = await fetch('https://automailer-flask.onrender.com/send-email', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       subject: emailConfig.subject,
  //       body:emailConfig.body,
  //       smtp_server: emailConfig.smtpDomain,
  //       smtp_port: emailConfig.smtpPort,
  //       sender_email: credentials.email,
  //       sender_password: credentials.password,
  //       sendees: [
  //   {
  //     "name": "Vijay",
  //     "email": "v99919699@gmail.com"
  //   },
  //   {
  //     "name": "Chandan",
  //     "email": "chandandpu@gmail.com"
  //   },
  //   {
  //     "name": "Ramesh",
  //     "email": "rt75547@gmail.com"
  //   }
  // ] // Send the entire email list directly
  //     })
  //   });

    if (!response.ok) {
      throw new Error('Failed to send emails');
    }
    return [{ status: 'success', message: 'Emails sent successfully' }];

  } catch (error) {
    return [{ status: 'error', message: error.message || 'Failed to send emails' }];
  }
}


// Show logs dialog
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

// Close logs dialog
function closeDialog() {
  document.getElementById('logsDialog').classList.remove('active');
}
