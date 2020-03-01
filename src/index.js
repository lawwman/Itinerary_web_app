
var timelineBlockID = []; /* Id of timeline blocks in order. i.e. first in the array is also first on the vertical time line. */

function loadCards() {
    var cards = localStorage.getItem("cards");
    
    if (cards ==null) {
        /* create new timelineblock of date type. */
        document.getElementById("timelineID").insertBefore(timeLineBlock([timelineBlockID.length, "date"]), null);
        var newId = timelineBlockID.length;
        addHoverFunctionToCard(newId);
        timelineBlockID.push(newId); /* Generate ID of timelineBlock */
    }
}

/* For now just concatenate at the end of the timeline. */
function createNewTimeLineBlock(info) {

    var idx = timelineBlockID.indexOf(info[0]);
    
    var newId = generateID();
    console.log(newId);
    info.splice(0, 1, newId); /* Give ID of timelineblock */

    // If appending to end of list
    if (idx+1 > timelineBlockID.length-1) document.getElementById("timelineID").insertBefore(timeLineBlock(info), null);
    // If inserting timeline block in specific index location within the timeline.
    else {
        var nextNode = document.getElementById(timelineBlockID[idx+1] + "-block");
        document.getElementById("timelineID").insertBefore(timeLineBlock(info), nextNode);
    }
    /* Add hovering functionality */
    addHoverFunctionToCard(newId);
    /* update list of events. */
    console.log(timelineBlockID);
    timelineBlockID.splice(idx + 1, 0, newId); /* Generate ID of timelineBlock */
    console.log(timelineBlockID);
    updateDates();
}

function deleteTimeLineBlock(id) {
    console.log(id);
    var timelineToDelete = document.getElementById(id + "-block");
    document.getElementById("timelineID").removeChild(timelineToDelete);

    /* update list of events. */
    console.log(timelineBlockID);
    timelineBlockID.splice(timelineBlockID.indexOf(id), 1);
    console.log(timelineBlockID);

    updateDates();
}

function minimizeTimeLineBlock(id) {
    $("#" + id + "-p").slideToggle();
}

function addHoverFunctionToCard(id) {
    $("#" + id + "-addCard").hide();
    $("#" + id + "-buttonWrapper").hide();

    $("#" + id + "-block").hover(function() {
        $("#" + id + "-addCard").fadeIn();
        $("#" + id + "-buttonWrapper").fadeIn();
    }, function() {
        $("#" + id + "-addCard").fadeOut();
        $("#" + id + "-buttonWrapper").fadeOut();
    });
}

function generateID() {
    return Math.max(...timelineBlockID) + 1;
}

/* Go through all dates in the timelineblock and make sure they are in ascending order. */
function updateDates() {
    var dates = document.getElementsByClassName("timeline-date");
    for (var i = 0; i < dates.length; i++) {
        var innerHTML = dates[i].innerHTML;
        innerHTML = innerHTML.split("id: ")[1].replace("</h2>", "");
        dates[i].innerHTML = "<h2>Day " + String(i + 1) + " id: " + innerHTML + "</h2>";
    }
}

/* Start of the code */
$(window).on('load',function(){
    loadCards();
});