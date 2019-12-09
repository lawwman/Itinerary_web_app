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

// Add listener to create event form
document.getElementById("create_event").addEventListener('submit', add_event);