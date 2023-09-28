'use strict';
// Function to calculate age and update the display
function calculateAge() {
  const birthDay = document.getElementById('day').value;
  const birthMonth = document.getElementById('month').value;
  const birthYear = document.getElementById('year').value;

  const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
  const currentDate = new Date();

  const timeDiff = currentDate - birthDate;

  // Calculate age in years, months, and days
  const years = Math.floor(timeDiff / (365 * 24 * 60 * 60 * 1000));
  const months = Math.floor(
    (timeDiff % (365 * 24 * 60 * 60 * 1000)) / (30 * 24 * 60 * 60 * 1000)
  );
  const days = Math.floor(
    (timeDiff % (30 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000)
  );

  // Update the display
  document.querySelector('.years span').textContent = years;
  document.querySelector('.months span').textContent = months;
  document.querySelector('.days span').textContent = days;
}

// Add an event listener to the button to calculate the age
const button = document.querySelector('.middle-btn');
button.addEventListener('click', calculateAge);
