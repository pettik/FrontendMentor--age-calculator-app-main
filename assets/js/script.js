'use strict';

const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');
const errorMessageDay = document.getElementById('error-day');
const errorMessageMonth = document.getElementById('error-month');
const errorMessageYear = document.getElementById('error-year');

let yearsSpan = document.querySelector('.years span');
let monthsSpan =document.querySelector('.months span');
let daysSpan = document.querySelector('.days span');

let allOK = true;

function setError(input, errorMessage, message) {
  input.parentElement.classList.add('red');
  errorMessage.textContent = message;
  errorMessage.style.opacity = '1';
  allOK = false;
}



function clearError(input, errorMessage) {
  input.parentElement.classList.remove('red');
  errorMessage.style.opacity = '0';
  allOK = true;
}

function clearTexts(){
  yearsSpan.textContent= '--';
  monthsSpan.textContent= '--';
  daysSpan.textContent = '--';
}

function calculateAge() {
  // Reset errors first
  clearError(dayInput, errorMessageDay);
  clearError(monthInput, errorMessageMonth);
  clearError(yearInput, errorMessageYear);

  clearTexts();

  const birthDay = parseInt(dayInput.value, 10);
  const birthMonth = parseInt(monthInput.value, 10);
  const birthYear = parseInt(yearInput.value, 10);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  // Check empty fields
  if (!birthDay) setError(dayInput, errorMessageDay, 'This field is required');
  if (!birthMonth)
    setError(monthInput, errorMessageMonth, 'This field is required');
  if (!birthYear)
    setError(yearInput, errorMessageYear, 'This field is required');

  // Validate day based on month
  const maxDaysInMonth = new Date(birthYear, birthMonth, 0).getDate();
  if (birthDay < 1 || birthDay > maxDaysInMonth) {
    setError(dayInput, errorMessageDay, 'Must be a valid day');
  }

  // Validate month (1-12)
  if (birthMonth < 1 || birthMonth > 12) {
    setError(monthInput, errorMessageMonth, 'Must be a valid month');
  }

  // Validate year (0-currentYear)
  if (birthYear <= 0 || birthYear > currentYear) {
    setError(yearInput, errorMessageYear, 'Must be in the past');
  }

  if (birthDay && birthMonth && birthYear) {

    if (allOK){
      const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
      const timeDiff = currentDate - birthDate;
      const years = Math.floor(timeDiff / (365.25 * 24 * 60 * 60 * 1000));
      const months = Math.floor(
        (timeDiff % (365.25 * 24 * 60 * 60 * 1000)) /
          (30.44 * 24 * 60 * 60 * 1000)
      );
      const days = Math.floor(
        (timeDiff % (30.44 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000)
      );
  
      yearsSpan.textContent = years;
      monthsSpan.textContent = months;
      daysSpan.textContent  = days; 
        }
    }
  
}

const button = document.querySelector('.middle-btn');
button.addEventListener('click', e => {
  e.preventDefault(); // Prevent default behavior
  calculateAge();
});

window.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    calculateAge();
  }
});
