colNum = 17
dates = []
selectedEventDates = []

function addRow(id) {
    const tr = document.createElement('tr');
    var innerHTML = `<th id="` + id + `" class="eventDate">insert date</th>`
    for(var i = 0; i < colNum; i++) innerHTML += "<td></td>";
    tr.innerHTML = innerHTML
    document.getElementById('scheduleBody').appendChild(tr);
    initEventDate(id.toString());
}


function setupSchedule() {
    if (dates.length == 0) addRow(1);
}


function createDateSelector(id) {
    if (selectedEventDates.includes(id)) return;
    selectedEventDates.push(id);

    const div = document.createElement('div');
    div.className = "form-row";
    div.id = "dateSelector";
    document.getElementById(id).appendChild(div);

    const dayDiv = document.createElement('div');
    dayDiv.className = "form-group col-md-6";
    var innerHTML = `<label for="inputState">Day</label><select id="inputState" class="form-control"><option selected>Choose...</option>`;
    for(var i = 1; i < 32; i++) {
        innerHTML += `<option>` + i + `</option>`;
    }
    innerHTML += `</select>`;
    dayDiv.innerHTML = innerHTML;

    document.getElementById("dateSelector").appendChild(dayDiv);

    // const monthDiv = document.createElement('div');
    // monthDiv.className = "form-group col-md-4";

    // const yearDiv = document.createElement('div');
    // yearDiv.className = "form-group col-md-4";
}



$(window).on('load',function(){
    setupSchedule();
});


  function initEventDetail() {
    $('td').click(function() {
        console.log("hi");
    });
  }


  function initEventDate(id) {
    var idHash = "#" + id.toString();
    $(idHash).click(function() {
        createDateSelector(id);
    });
  }