// Add listener to create event form
document.getElementById("create_event").addEventListener('submit', add_event);

// Add function to save changes to trip settings
function saveChangesToTripSettings() {

    // Handle date
    if (document.getElementById('startDate').value == "" || document.getElementById('endDate').value == "") alert("Please fill in both start and end date.");

    else {
        var start_date = document.getElementById('startDate').value.split("-");
        var start_year = start_date[0];
        var start_month = start_date[1];
        var start_day = start_date[2];
        var end_date = document.getElementById('endDate').value.split("-");
        var end_year = end_date[0];
        var end_month = end_date[1];
        var end_day = end_date[2];

        if (start_year > end_year) alert("Please make sure year of start date is before year of end date.");
        else if (start_month > end_month) alert("Please make sure month of start date is before month of end date.");
        else if (start_day > end_day) alert("Please make sure day of start date is before day of end date.");
        else {
            var trip_duration = start_date + "-" + end_date;
            window.localStorage.setItem("trip_duration", trip_duration);
        }
    }
}

function clearAllSettings() {
    window.localStorage.clear();
}

// Add new event
function add_event(e) {

    // Prevent page from refreshing
    e.preventDefault();

    // Get event information
    var event_name = document.getElementById('eventInput').value;
    var event_location = document.getElementById('locationInput').value;
    var duration = document.getElementById('durationInput').value;
}

$(window).on('load',function(){
    $('#myModal').modal('show');
});