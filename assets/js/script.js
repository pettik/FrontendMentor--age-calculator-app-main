'use strict';
// Function to calculate age and update the display
const inputBox = document.querySelector('.input-box');
const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');
const errorMessageDay = document.getElementById('error-day');
const errorMessageMonth = document.getElementById('error-month');
const errorMessageYear = document.getElementById('error-year');

let dayOK= false;
let monthOK= false;
let yearOK = false;



function setError(input, errorMessage) {
  const closestInputBox = input.closest(".input-box");
  closestInputBox.classList.add('red');
  input.classList.add('red-border');
  errorMessage.style.opacity = 1;
}

function clearError(input, errorMessage) {
  const closestInputBox = input.closest(".input-box");
  closestInputBox.classList.remove('red');
  input.classList.remove('red-border');
  errorMessage.style.opacity = 0;
}



function calculateAge() {
   // set no erros
   clearError(dayInput, errorMessageDay);
   clearError(monthInput, errorMessageMonth);
   clearError(yearInput, errorMessageYear);
 
   // check empty fields
  const birthDay = dayInput.value;
  const birthMonth = monthInput.value;
  const birthYear = yearInput.value;

  console.log(`birthDay = ${birthDay},birthMonth = ${birthMonth},birthYear = ${birthYear}`)

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const birthDate = new Date(birthYear, birthMonth - 1, birthDay);

  const timeDiff = currentDate - birthDate;
  const years = Math.floor(timeDiff / (365 * 24 * 60 * 60 * 1000));
  const months = Math.floor((timeDiff % (365 * 24 * 60 * 60 * 1000)) / (30 * 24 * 60 * 60 * 1000));
  const days = Math.floor((timeDiff % (30 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));
 
  const maxDaysInMonth = new Date(birthYear, birthMonth, 0).getDate();
  console.log(`maxDaysInMonth = ${maxDaysInMonth}, ${dayOK}`);


   if(birthDay === '' || birthMonth === '' || birthYear === ''){
    
     if (birthDay === '') {
       setError(dayInput, errorMessageDay);
     }
 
     if (birthMonth === '') {
       setError(monthInput, errorMessageMonth);
     }
   
     if (birthYear === '') {
       setError(yearInput, errorMessageYear);
     }
 
     
     console.log(birthYear,currentYear);
     if (birthYear > currentYear) {
       setError(yearInput, errorMessageYear);
       errorMessageYear.textContent = 'Must be in the past';
 
     }
   
     
     
   
     // check date 1-31
   
     // check month 1-12
   
     // check year 0-today
   
     // check  year from future
     if (birthDay > maxDaysInMonth) {
       setError(dayInput, errorMessageDay);
     }
   }


   if(birthMonth >maxDaysInMonth){
     errorMessageMonth.textContent = 'Must be a valid day';
    setError(dayInput, errorMessageDay);
   }else if(birthDay > 0 && birthDay <= 31){
     dayOK = true;
   }
     
   monthOK = true;
   yearOK = true;

   if(dayOK && monthOK && yearOK){
    document.querySelector('.years span').textContent = years;
    document.querySelector('.months span').textContent = months;
    document.querySelector('.days span').textContent = days;
   }
}

// Add an event listener to the button to calculate the age
const button = document.querySelector('.middle-btn');
button.addEventListener('click', calculateAge);
