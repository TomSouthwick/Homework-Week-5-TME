// Goal: create a task schedule

// when I visit this page
// time
// show the current date in the header

// Load in information from the local storage
// Create function to render the table by passing in the data from the local storage

// table
// the tasks table will have 9 rows, from 9am - 5pm
// we need to have 3 cols in the table
// 1st - time (hourly format)
// 2nd col - input box for the user to enter their tasks
// 3rd col - button
// when we click on the button, we want to save the user input to the local storage

// each table row will have colour:
// red - current timeslot
// grey - past
// green - future

// Troll Mode

////////////////////////////////////////////////////////////////
var trollMode = true;
var dayEl = document.getElementById("currentDay");
var tableEl = document.getElementById("tableElement");

calendar = JSON.parse(localStorage.getItem("calendar"));
if (calendar === null) {
  calendar = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];
}

// Creating dynamic HTML element
function saveTask(taskIndex) {
  var taskEl = document.getElementById(`task-${taskIndex}`);
  calendar[taskIndex] = taskEl.value;
  localStorage.setItem("calendar", JSON.stringify(calendar));
}

function saveAll() {
  for (var i = 0; i < calendar.length; i++) {
    saveTask(i);
  }
}

setInterval(() => {
  var timeNow = moment().format("MMMM Do YYYY, h:mm:ss a");
  dayEl.innerText = timeNow;
  var currentHour = moment().hour();
  // var currentHour = 12;
  calendar.forEach((calendarTask, index) => {
    var rowEl = document.getElementById(`row-${index}`);
    if (index + 9 < currentHour) {
      rowEl.style.backgroundColor = "#C6C4C3";
    } else if (index + 9 === currentHour) {
      rowEl.style.backgroundColor = "#CBFDD3";
    } else {
      rowEl.style.backgroundColor = "#FFFFFF";
    }
  });
}, 1000);

if (trollMode) {
  randomEl = document.getElementById("randomMovement");
  randomEl.addEventListener("mouseenter", function (event) {
    randomEl.style.position = "absolute";
    randomEl.style.top = Math.random() * window.innerHeight + "px";
    randomEl.style.left = Math.random() * window.innerHeight + "px";
  });
}

calendar.forEach((calendarTask, index) => {
  tableEl.innerHTML += `<tr id="row-${index}">
    <td>${index + 9}:00</td>
    <td><input type="text" value="${calendarTask}" id="task-${index}" /></td>
    <td><button id="random-${index}" onclick="saveTask(${index})">Save</button></td>
  </tr>`;

  if (trollMode) {
    setTimeout(() => {
      const randSave = document.getElementById(`random-${index}`);
      randSave.addEventListener("mouseenter", function (event) {
        randSave.style.position = "absolute";
        randSave.style.top = Math.random() * window.innerHeight + "px";
        randSave.style.left = Math.random() * window.innerHeight + "px";
        // dayEl.classList.add("rotating");
        randSave.classList.add("rotating");
        randomMovement.classList.add("rotating");
      });
    }, 0);
  }
});
