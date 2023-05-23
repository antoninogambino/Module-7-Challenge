$(document).ready(function() {
    // Display current day at the top of the calendar
    var currentDay = moment().format("dddd, MMMM Do");
    $("#currentDay").text(currentDay);

    // Timeblocks
    var timeBlocks = [
      { hour: 9, time: "09", meridiem: "AM", event: "" },
      { hour: 10, time: "10", meridiem: "AM", event: "" },
      { hour: 11, time: "11", meridiem: "AM", event: "" },
      { hour: 12, time: "12", meridiem: "PM", event: "" },
      { hour: 1, time: "01", meridiem: "PM", event: "" },
      { hour: 2, time: "02", meridiem: "PM", event: "" },
      { hour: 3, time: "03", meridiem: "PM", event: "" },
      { hour: 4, time: "04", meridiem: "PM", event: "" },
      { hour: 5, time: "05", meridiem: "PM", event: "" },
    ];

    // Create timeblocks
    for (var i = 0; i < timeBlocks.length; i++) {
      var timeBlock = timeBlocks[i];
      var row = $("<div>").addClass("row time-block");
      var hourCol = $("<div>").addClass("col-md-1 hour").text(timeBlock.hour + timeBlock.meridiem);
      var eventCol = $("<textarea>").addClass("col-md-10 description").attr("data-hour", timeBlock.hour).val(timeBlock.event);
      var saveBtn = $("<button>").addClass("col-md-1 saveBtn").html('<i class="fas fa-save"></i>');

      // Set timeblock color based on past, present, future
      var currentHour = moment().hour();
      if (timeBlock.hour < currentHour) {
        eventCol.addClass("past");
      } else if (timeBlock.hour === currentHour) {
        eventCol.addClass("present");
      } else {
        eventCol.addClass("future");
      }

      // Append elements to row
      row.append(hourCol, eventCol, saveBtn);

      // Append row to container
      $(".container").append(row);
    }

    // Save event in local storage when save button is clicked
    $(".saveBtn").on("click", function() {
      var hour = $(this).siblings(".description").attr("data-hour");
      var event = $(this).siblings(".description").val();

      localStorage.setItem(hour, event);
    });

    // Load events from local storage
    for (var i = 0; i < timeBlocks.length; i++) {
      var savedEvent = localStorage.getItem(timeBlocks[i].hour);
      if (savedEvent) {
        $(".description[data-hour='" + timeBlocks[i].hour + "']").val(savedEvent);
      }
    }
  });