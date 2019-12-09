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
            var trip_duration = document.getElementById('startDate').value + "_" + document.getElementById('endDate').value;
            window.localStorage.setItem("trip_duration", trip_duration);

            if (document.getElementById("no_duration_warning") != null) {
                $('#schedule').show();
                $('#no_duration_warning').hide();
            }
        }
    }
}

function displayTripSettings() {
    console.log("hello")
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

    if (document.getElementById("no_duration_warning") != null) {
        $('#schedule').hide();
        $('#no_duration_warning').show();
    }
}

displayTripSettings();