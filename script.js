// ===== CONTACT FORM WITH REAL-TIME VALIDATION =====
// This version works immediately without any external service

// DOM Elements
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('fullname');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');

// Error message elements
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

// Form group elements
const nameGroup = document.getElementById('nameGroup');
const emailGroup = document.getElementById('emailGroup');
const messageGroup = document.getElementById('messageGroup');

// Validation functions
function validateName() {
  const name = nameInput.value.trim();
  
  if (name === '') {
    nameError.textContent = '❌ Name is required';
    nameGroup.classList.add('error');
    nameGroup.classList.remove('success');
    return false;
  }
  
  if (name.length < 2) {
    nameError.textContent = '❌ Name must be at least 2 characters';
    nameGroup.classList.add('error');
    nameGroup.classList.remove('success');
    return false;
  }
  
  if (name.length > 50) {
    nameError.textContent = '❌ Name must be less than 50 characters';
    nameGroup.classList.add('error');
    nameGroup.classList.remove('success');
    return false;
  }
  
  nameError.textContent = '✓ Looks good!';
  nameGroup.classList.remove('error');
  nameGroup.classList.add('success');
  return true;
}

function validateEmail() {
  const email = emailInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (email === '') {
    emailError.textContent = '❌ Email address is required';
    emailGroup.classList.add('error');
    emailGroup.classList.remove('success');
    return false;
  }
  
  if (!emailPattern.test(email)) {
    emailError.textContent = '❌ Please enter a valid email (e.g., name@example.com)';
    emailGroup.classList.add('error');
    emailGroup.classList.remove('success');
    return false;
  }
  
  emailError.textContent = '✓ Valid email address';
  emailGroup.classList.remove('error');
  emailGroup.classList.add('success');
  return true;
}

function validateMessage() {
  const message = messageInput.value.trim();
  
  if (message === '') {
    messageError.textContent = '❌ Message cannot be empty';
    messageGroup.classList.add('error');
    messageGroup.classList.remove('success');
    return false;
  }
  
  if (message.length < 10) {
    messageError.textContent = '❌ Message must be at least 10 characters';
    messageGroup.classList.add('error');
    messageGroup.classList.remove('success');
    return false;
  }
  
  if (message.length > 1000) {
    messageError.textContent = '❌ Message must be less than 1000 characters';
    messageGroup.classList.add('error');
    messageGroup.classList.remove('success');
    return false;
  }
  
  messageError.textContent = '✓ Message looks good!';
  messageGroup.classList.remove('error');
  messageGroup.classList.add('success');
  return true;
}

// Real-time validation listeners
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
messageInput.addEventListener('input', validateMessage);

// Clear validation styles on focus
nameInput.addEventListener('focus', () => {
  nameGroup.classList.remove('error', 'success');
  nameError.textContent = '';
});

emailInput.addEventListener('focus', () => {
  emailGroup.classList.remove('error', 'success');
  emailError.textContent = '';
});

messageInput.addEventListener('focus', () => {
  messageGroup.classList.remove('error', 'success');
  messageError.textContent = '';
});

// Validate all fields before submission
function validateForm() {
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isMessageValid = validateMessage();
  
  return isNameValid && isEmailValid && isMessageValid;
}

// Show loading state
function setLoading(isLoading) {
  if (isLoading) {
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    const span = submitBtn.querySelector('span:first-child');
    if (span) span.textContent = 'Sending';
  } else {
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
    const span = submitBtn.querySelector('span:first-child');
    if (span) span.textContent = 'Send Message';
  }
}

// Show success message and reset form
function showSuccess() {
  successMessage.classList.add('show');
  
  // Clear form
  nameInput.value = '';
  emailInput.value = '';
  subjectInput.value = '';
  messageInput.value = '';
  
  // Clear validation styles
  nameGroup.classList.remove('success', 'error');
  emailGroup.classList.remove('success', 'error');
  messageGroup.classList.remove('success', 'error');
  nameError.textContent = '';
  emailError.textContent = '';
  messageError.textContent = '';
  
  // Hide success message after 5 seconds
  setTimeout(() => {
    successMessage.classList.remove('show');
  }, 5000);
}

// Display form data in console (for demo purposes)
function displayFormData(formData) {
  console.log('📋 Form Data Submitted:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  for (let [key, value] of formData.entries()) {
    console.log(`   ${key}: ${value}`);
  }
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ Form would be sent to email in production');
}

// Handle form submission (DEMO MODE - no external service needed)
async function handleSubmit(e) {
  e.preventDefault();
  
  // Validate all fields
  if (!validateForm()) {
    // Scroll to first error
    const firstError = document.querySelector('.form-group.error');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }
  
  // Show loading state
  setLoading(true);
  
  // Get form data
  const formData = new FormData(form);
  
  // Display form data in console for debugging
  displayFormData(formData);
  
  // Simulate network delay (like sending to server)
  setTimeout(() => {
    // Show success message
    showSuccess();
    
    // Log success
    console.log('✅ Form submitted successfully! (Demo Mode)');
    console.log('💡 To send real emails, replace with actual backend or Formspree endpoint');
    
    // Stop loading
    setLoading(false);
  }, 1500); // 1.5 second delay to simulate network request
}

// Alternative: For REAL email sending, uncomment this version and comment the one above
/*
async function handleSubmit(e) {
  e.preventDefault();
  
  if (!validateForm()) {
    const firstError = document.querySelector('.form-group.error');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }
  
  setLoading(true);
  
  const formData = new FormData(form);
  
  try {
    // Replace with your actual Formspree endpoint
    const response = await fetch('https://formspree.io/f/YOUR_ACTUAL_ENDPOINT', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (response.ok) {
      showSuccess();
      console.log('✅ Form submitted successfully!');
    } else {
      const errorData = await response.json();
      console.error('Form submission error:', errorData);
      alert('❌ Something went wrong. Please try again later.');
    }
  } catch (error) {
    console.error('Network error:', error);
    alert('❌ Network error. Please check your connection and try again.');
  } finally {
    setLoading(false);
  }
}
*/

// Add submit event listener
form.addEventListener('submit', handleSubmit);

// Optional: Auto-focus on name input
nameInput.focus();

// Log initialization
console.log('✅ Contact form initialized with real-time validation!');
console.log('📝 This is DEMO MODE - Form data is logged to console');
console.log('🔧 To enable real email sending:');
console.log('   1. Go to https://formspree.io');
console.log('   2. Create a free account');
console.log('   3. Get your form endpoint URL');
console.log('   4. Replace the endpoint in script.js');