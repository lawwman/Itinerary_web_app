colNum = 17
dates = []
/* id of the currently selected eventDate. Only one eventDate can be selected at anytime. */
selectedEventDates = -1 

selectedEventDetail = []

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


function setupSchedule() {
    if (dates.length == 0) addRow(1);
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
};

function selectEventDetail(id) {
    /* Create date input form for user to enter new date. */
    selectedEventDetail.push(id);
    var form = createEventForm();
    document.getElementById(id).append(form)
}


$(window).on('load',function(){
    setupSchedule();
});


  function initEventDetail(id) {
    var idHash = "#" + id.toString();
    $(idHash).click(function() {
        selectEventDetail(id);
    });
  }

/* The th element in the table. Basically the table cell that stores the date. */
  function initEventDate(id) {
    var idHash = "#" + id.toString();
    $(idHash).click(function() {
        selectEventDate(id);
    });
  }