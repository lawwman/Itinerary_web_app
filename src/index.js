
var timelineBlockID = []; /* Id of timeline blocks in order. i.e. first in the array is also first on the vertical time line. */
var selectedTimelineBlock = -1;

function loadCards() {
    var cards = localStorage.getItem("cards");
    
    if (cards ==null) {
        /* create new timelineblock of date type. */
        document.getElementById("timelineID").insertBefore(timeLineBlock([timelineBlockID.length, "date"]), null);
        var newId = timelineBlockID.length;
        addHoverFunctionToCard(newId);
        addClickFunctionOnIcon(newId);
        timelineBlockID.push(newId); /* Generate ID of timelineBlock */
    }
}

/* For now just concatenate at the end of the timeline. */
function createNewTimeLineBlock(info) {

    var idx = timelineBlockID.indexOf(info[0]);
    
    var newId = generateID();
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
    addClickFunctionOnIcon(newId);
    /* update list of events. */
    timelineBlockID.splice(idx + 1, 0, newId); /* Generate ID of timelineBlock */
    console.log(timelineBlockID);
    updateDates();
}

function deleteTimeLineBlock(id) {
    var timelineToDelete = document.getElementById(id + "-block");
    document.getElementById("timelineID").removeChild(timelineToDelete);

    /* update list of events. */
    timelineBlockID.splice(timelineBlockID.indexOf(id), 1);
    console.log(timelineBlockID);
    updateDates();
}

function swapTimeLineBlock(id1, id2) {
    var swap1 = document.getElementById(id1 + "-block");
    var swap2 = document.getElementById(id2 + "-block");

    document.getElementById("timelineID").removeChild(swap1);
    document.getElementById("timelineID").removeChild(swap2);

    var idx1 = timelineBlockID.indexOf(id1);
    var idx2 = timelineBlockID.indexOf(id2);

    /* if id1 is last block */
    if (timelineBlockID.length-1 == idx1) {
        /* if id2 is directly above id1 */
        if (timelineBlockID.length-2 == idx2) {
            document.getElementById("timelineID").append(swap1);
            document.getElementById("timelineID").append(swap2);
        }
        /* if id2 is more than 1 block above id1 */
        else {
            /* Get object of block below id2 */
            var nextNode = document.getElementById(timelineBlockID[idx2+1] + "-block");
            document.getElementById("timelineID").insertBefore(swap1, nextNode);
            document.getElementById("timelineID").append(swap2);
        }
    }
    /* if id2 is last block */
    else if (timelineBlockID.length-1 == idx2) {
        /* if id1 is directly above id2 */
        if (timelineBlockID.length-2 == idx1) {
            document.getElementById("timelineID").append(swap2);
            document.getElementById("timelineID").append(swap1);
        }
        /* if id1 is more than 1 block above id2 */
        else {
            var nextNode = document.getElementById(timelineBlockID[idx1+1] + "-block");
            document.getElementById("timelineID").insertBefore(swap2, nextNode);
            document.getElementById("timelineID").append(swap1);
        }
    }
    /* Neither id1 not id2 is the last block */
    else {

        /* if id1 is directly above id2 */
        if (idx2 == idx1+1) {
            var nextNode = document.getElementById(timelineBlockID[idx2+1] + "-block");
            document.getElementById("timelineID").insertBefore(swap1, nextNode);
            document.getElementById("timelineID").insertBefore(swap2, swap1);
        }
        /* if id2 is directly above id1 */
        else if (idx1 == idx2+1) {
            var nextNode = document.getElementById(timelineBlockID[idx1+1] + "-block");
            document.getElementById("timelineID").insertBefore(swap2, nextNode);
            document.getElementById("timelineID").insertBefore(swap1, swap2);
        }
        /* (if id2 is more than 1 block above id1) or (id1 is more than 1 block above id2) */
        else {
            var nextNode1 = document.getElementById(timelineBlockID[idx1+1] + "-block");
            var nextNode2 = document.getElementById(timelineBlockID[idx2+1] + "-block");
            document.getElementById("timelineID").insertBefore(swap2, nextNode1);
            document.getElementById("timelineID").insertBefore(swap1, nextNode2);
        }
    }
    timelineBlockID[idx1] = id2;
    timelineBlockID[idx2] = id1;
    updateDates();
    console.log(timelineBlockID);
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

function addClickFunctionOnIcon(id) {
    $("#" + id + "-icon").click(function() {

        if (selectedTimelineBlock == id) {
            document.getElementById(selectedTimelineBlock + "-icon").style.filter = "brightness(1)";
            selectedTimelineBlock = -1;
        }
        else if (selectedTimelineBlock == -1) {
            document.getElementById(id + "-icon").style.filter = "brightness(1.5)";
            selectedTimelineBlock = id;
        }
        else {
            document.getElementById(selectedTimelineBlock + "-icon").style.filter = "brightness(1)";
            swapTimeLineBlock(selectedTimelineBlock, id);
            selectedTimelineBlock = -1;
        }
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