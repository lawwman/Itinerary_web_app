colNum = 17
dates = []
/* id of the currently selected eventDate. Only one eventDate can be selected at anytime. */
selectedEventDates = -1 

/* Flag for when event detail is selected. */
selectedEventDetail = []

/* Arrays to store id of event detail. Used to coordinate between the many features of event detail. */
currentlyEditingEventDetail = [] /* id is in the array when the user has clicked on the "edit" button of the event detail */
justDoneEditing = [] /* id is in the array when the user has clicked on the submit button of the edit event form. */

/* Add new role to the table. */
function addRow(id) {
    const tr = document.createElement('tr');
    var innerHTML = `<th id="` + id + `" class="eventDate">23-03-1995</th>`
    for(var i = 0; i < colNum; i++) {
        var eventDetailID = id.toString() + "-" + i.toString();
        innerHTML += `<td id="` + eventDetailID + `"></td>`;
    }

    tr.innerHTML = innerHTML
    document.getElementById('scheduleBody').appendChild(tr);
    initEventDate(id.toString());

    for(var i = 0; i < colNum; i++) {
        var eventDetailID = id.toString() + "-" + i.toString();
        initEventDetail(eventDetailID);
    }
}

/* Make the table resizable. */
function resizable() {
    var row = document.getElementById("schedule").getElementsByTagName('tr')[0];
    var cols = row.children;
    for (var i = 0;i < cols.length; i++) {
        var div = createResizableDiv(document.getElementById("schedule").offsetHeight);
        cols[i].appendChild(div);
        cols[i].style.position = 'relative';
        setListeners(div);
    }
}

function setListeners(div){
    var pageX, curCol, nxtCol, curColWidth, nxtColWidth;

    /* On mousedown, record the variable information. */
    div.addEventListener('mousedown', function (e) {
        curCol = e.target.parentElement; // parent = th elements with scope="col".
        nxtCol = curCol.nextElementSibling;
        pageX = e.pageX; // pageX refers to the coordinate of the mouse in the x axis.
        curColWidth = curCol.offsetWidth; // the width of the element's borders
        if (nxtCol) nxtColWidth = nxtCol.offsetWidth;
    });

    document.addEventListener('mousemove', function (e) {
        if (curCol) {
            var diffX = e.pageX - pageX;
            if (nxtCol) nxtCol.style.width = (nxtColWidth - (diffX)) + 'px';
            curCol.style.width = (curColWidth + diffX) + 'px';
        }
    });

    document.addEventListener('mouseup', function (e) { 
    curCol = undefined;
    nxtCol = undefined;
    pageX = undefined;
    nxtColWidth = undefined;
    curColWidth = undefined;
    });
}


function setupSchedule() {
    /* Add rows  */
    if (dates.length == 0) addRow(1);

    /* Set up resizable. */
    resizable();
}


function selectEventDate(id) {
    if (selectedEventDates == id) { // Unselect the eventDate. Remove dateInputForm.
        selectedEventDates = -1;
        var innerHTML = document.getElementById(id).innerHTML;
        /* Get the input date from the innerHTML. */
        document.getElementById(id).innerHTML = innerHTML.split(`placeholder="`)[1].replace(/\n| /g, "").replace(`"></div></div>`, "");
        return;
    }

    /* Create date input form for user to enter new date. */
    selectedEventDates = id;
    var date = document.getElementById(id).innerHTML; // store the current date to be placed in the placeholder later.
    document.getElementById(id).innerHTML = "";
    document.getElementById(id).appendChild(createDateInput(date));

    document.getElementById("dateInput").select();
    $("#dateInput").bind("keypress", inputNewDate);
}


function inputNewDate(e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) { //Enter keycode                        
        e.preventDefault();
        var date = document.getElementById('dateInput').value;
        document.getElementById(selectedEventDates).innerHTML = date;
        selectedEventDates = -1;
    }
}

function submitNewEventDetail(id) {
    /* Get new detail from form. */
    var event_location = document.getElementById(id+'-locationInput').value;
    var duration = document.getElementById(id+'-durationInput').value; // have to reflect the change in the time table.
    var event_description = document.getElementById(id+'-descriptionInput').value;

    /* Remove the form. */
    currentlyEditingEventDetail.splice(currentlyEditingEventDetail.indexOf(id), 1);
    document.getElementById(id).innerHTML = "";

    /* Set flag for the selectEventDetail */
    justDoneEditing.push(id);

    /* Fill in new details */
    var eventDetails = "Location: " + event_location + "\n Description: " + event_description;
    document.getElementById(id).innerText = eventDetails;
}

function selectEventDetail(id) {
    if (selectedEventDetail.includes(id)) {
        selectedEventDetail.splice(selectedEventDetail.indexOf(id), 1);
        document.getElementById(id).innerHTML = "";

        /* When unselecting the eventDetail, it is also possible that the user has clicked on the edit event option. If so, create the event form. */
        if (currentlyEditingEventDetail.includes(id)) {
            document.getElementById(id).append(createEventForm(id));
            $("#"+id+"-submitEditForm").click(function() { // submit form of event detail
                submitNewEventDetail(id);
            });
        }
    }
    else if (justDoneEditing.includes(id)) {
        justDoneEditing.splice(justDoneEditing.indexOf(id), 1);
    }
    /* Trigger the 3 buttons (edit, delete and duplicate) to appear. The event detail in this state is considered to be unselected. */
    else if (!currentlyEditingEventDetail.includes(id)) {
        selectedEventDetail.push(id);
        var buttons = createEventDetailButtons(id);
        document.getElementById(id).append(buttons);

        /* When user clicks on the edit button, he also clicks on the div. This function (.click()) gets called first before the div (selectEventDetail()). */
        $("#"+id+"-edit").click(function() { 
            currentlyEditingEventDetail.push(id);
        });
    }
}

/* Start point of the code. */
$(window).on('load',function(){
    setupSchedule();
});

/* The td element in the table. Basically the table cell that stores the event details. */
function initEventDetail(id) {
    $("#"+id).click(function() {
        selectEventDetail(id);
    });
}

/* The th element in the table. Basically the table cell that stores the date. */
function initEventDate(id) {
    $("#"+id).click(function() {
        selectEventDate(id);
    });
}