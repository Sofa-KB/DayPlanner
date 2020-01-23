//Variable defining current time-stamp for header
var now = moment().format('llll');

//Variable defining the current hour to populate on page
var nowHour = moment().format('H');

//Set header date
var today = $('#date');
today.text(now);

//Pull data from local storage
var storedPlans = JSON.parse(localStorage.getItem("storedPlans"));

//If stored plans are found, push to page, else create new array.
if (storedPlans !== null) {
    plannerText = storedPlans;
  } else {
    plannerText = new Array;
  }

//Variable defining plannerContainer
var plannerContainer = $('#plannerContainer');

//Clearing plannerContainer Data
plannerContainer.empty();

//For loop defining hours between 9AM and 5PM (or 8 array slots)
for (var hour = 9; hour <= 17; hour++) {
  var index = hour - 9;

  //Creating the input area
  var inputArea = $('<div>');
  inputArea.addClass('row');
  inputArea.addClass('plannerRow');
  inputArea.attr('hour-index', hour);

  //Creating the hours list on left hand side of page
  var timeBox = $('<div>');
  timeBox.addClass('col-md-2');

  //Populates the hours text (i.e 9AM)
  var timeBoxText = $('<span>');
  timeBoxText.attr('class', 'timeBox');

  //Variable to help modify current hour
  var displayHour = 0;

  //Variable to hold whether an hour is AM or PM
  var ampm = "";

  //If/Else statement to define AM and PM
  if (hour > 12) {
    displayHour = hour - 12;
    ampm = "PM";
  }
  else if (hour === 12) {
    displayHour = hour
    ampm = "PM"
  }
  else {
    displayHour = hour;
    ampm = "AM";
  }

  //Append hours information to the page
  timeBoxText.text(`${displayHour} ${ampm}`);
  inputArea.append(timeBox);
  timeBox.append(timeBoxText);

  //Creating the text input area to store plans
  var textInput = $('<input>');
  textInput.attr('id', `input-${index}`);
  textInput.attr('hour-index', index);
  textInput.attr('type', 'text');
  textInput.attr('class', 'dailyPlan');
  textInput.val(plannerText[index]);

  //Column fix to maintain proper width
  var fix = $('<div>');
  fix.addClass('col-md-9');
  inputArea.append(fix);
  fix.append(textInput);

  //Creating the saveBox column
  var saveBox = $('<div>');
  saveBox.addClass('col-md-1');
  var save = $('<i>');
  save.attr('id', `saveid-${index}`);
  save.attr('save-id', index);
  save.attr('class', "far fa-save saveIcon");

  //Push saveBox column to the page
  inputArea.append(saveBox);
  saveBox.append(save);
  plannerContainer.append(inputArea);

  //Run the activeTime function with params inputArea and hour
  activeTime(inputArea, hour);
};

//Function to display active time to the input area
function activeTime(plannedTime, hour) {
  if (hour < nowHour) {
    plannedTime.css("background-color", "lightgrey")
  } else if (hour > nowHour) {
    plannedTime.css("background-color", "lightgreen")
  } else {
    plannedTime.css("background-color", "tomato")
  }
};

//Click handler function to save data in input area to local storage
$(document).on('click', 'i', function (event) {
  event.preventDefault();
  var index = $(this).attr('save-id');
  var input = '#input-' + index;
  var value = $(input).val();
  plannerText[index] = value;
  localStorage.setItem("storedPlans", JSON.stringify(plannerText));
});  