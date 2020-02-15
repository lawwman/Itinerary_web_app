// Add function to save changes to trip settings
function saveChangesToTripSettings() {

    // Handle date
    if (document.getElementById('startDate').value == "" || document.getElementById('endDate').value == "") alert("Please fill in both start and end date.");

    else {
        var start_date_input = document.getElementById('startDate').value.split("-");
        var start = {year: start_date_input[0], month: start_date_input[1], day: start_date_input[2]};
        var end_date_input = document.getElementById('endDate').value.split("-");
        var end = {year: end_date_input[0], month: end_date_input[1], day: end_date_input[2]};

        if (start.year > end.year) alert("Please make sure year of start date is before year of end date.");
        else if (start.month > end.month) alert("Please make sure month of start date is before month of end date.");
        else if (start.day > end.day) alert("Please make sure day of start date is before day of end date.");
        else {
            var trip_duration = document.getElementById('startDate').value + "_" + document.getElementById('endDate').value;
            window.localStorage.setItem("trip_duration", trip_duration);

            // Since the dates are set, we can show the schedule now. This only applies to index.html.
            if (document.getElementById("no_duration_warning") != null) {
                $('#schedule').show();
                $('#no_duration_warning').hide();
            }
        }
    }
}

function displayTripSettings() {

    if (localStorage.getItem("trip_duration") != null) {

        var trip_duration = localStorage.getItem("trip_duration").split("_"); 
        var start_date = trip_duration[0];
        var end_date = trip_duration[1];

        document.querySelector("#startDate").value = start_date;
        document.querySelector("#endDate").value = end_date;
    }
}

function clearAllSettings() {
    window.localStorage.clear();

    // It is the index.html calling
    if (document.getElementById("no_duration_warning") != null) {
        $('#schedule').hide();
        $('#no_duration_warning').show();
    }
    location.reload();
}

displayTripSettings();