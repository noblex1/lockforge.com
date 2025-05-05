const lengthRange = document.getElementById('lengthRange');
const lengthValue = document.getElementById('lengthValue');
const passwordOutput = document.getElementById('passwordOutput');
const savedList = document.getElementById('savedList');
const savedPasswords = JSON.parse(localStorage.getItem('passwords')) || [];
const themeIcon = document.getElementById('themeIcon');

const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lower = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+{}[]<>?';

lengthRange.addEventListener('input', () => {
  lengthValue.textContent = lengthRange.value;
});

function generatePassword() {
  const length = +lengthRange.value;
  const includeUpper = document.getElementById('includeUpper').checked;
  const includeLower = document.getElementById('includeLower').checked;
  const includeNumbers = document.getElementById('includeNumbers').checked;
  const includeSymbols = document.getElementById('includeSymbols').checked;

  let chars = '';
  if (includeUpper) chars += upper;
  if (includeLower) chars += lower;
  if (includeNumbers) chars += numbers;
  if (includeSymbols) chars += symbols;

  if (!chars) return alert('Please select at least one character type.');

  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }

  passwordOutput.textContent = password;
}

function savePassword() {
  const pw = passwordOutput.textContent;
  // Avoid saving the placeholder or empty strings
  if (!pw || pw === "YourPassword123") return alert('Generate a password first before saving.');
  savedPasswords.push(pw);
  localStorage.setItem('passwords', JSON.stringify(savedPasswords));
  updateSavedList();
}

function updateSavedList() {
  savedList.innerHTML = ''; // Clear existing list
  savedPasswords.forEach((pw) => {
    const li = document.createElement('li');
    li.textContent = pw;
    savedList.appendChild(li);
  });
}

function downloadPasswords() {
  if (savedPasswords.length === 0) return alert('No saved passwords to download.');
  const blob = new Blob([savedPasswords.join('\n')], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'saved_passwords.txt';
  document.body.appendChild(link); // Append link to body
  link.click(); // Programmatically click the link to trigger download
  document.body.removeChild(link); // Remove link from body
  URL.revokeObjectURL(link.href); // Clean up the object URL
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme); // Save theme preference
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Initialize theme and load saved passwords on page load
(function () {
  // Set initial theme based on saved preference or default to light
  const storedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', storedTheme);
  updateThemeIcon(storedTheme);

  // Populate saved passwords list
  updateSavedList();

  // Generate an initial password on load if desired (optional)
  // generatePassword();
})();