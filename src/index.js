$(window).on('load',function(){

    // check local storage if trip duration is set
    if (localStorage.getItem("trip_duration") == null) {
        console.log("duration not set.");
        $('#schedule').hide();
    } else {
        $('#no_duration_warning').hide();
    }

    $('#myModal').modal('show');
}); 