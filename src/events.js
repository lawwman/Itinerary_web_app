// Add new event
function add_event(e) {

    // Prevent page from refreshing
    e.preventDefault();

    // Get event information
    var event_name = document.getElementById('eventInput').value;
    var event_location = document.getElementById('locationInput').value;
    var duration = document.getElementById('durationInput').value;
    var event_description = document.getElementById('descriptionInput').value;

    create_event_card(event_name, event_location, duration, event_description);
}

function create_event_card(name, location, duration, description) {

  const div = document.createElement('div');

  div.className = 'col-auto mb-3';
  div.id = 3;

  div.innerHTML = `
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">` + name + `</h5>
        <h6 class="card-subtitle mb-2 text-muted">` + location + `</h6>
        <p class="card-text">` + description + `</p>
        <h6 class="card-subtitle mb-2 text-muted">` + duration + `</h6>
        <button type="button" class="btn btn-danger btn-sm float-right"  onclick="remove_event_card('` + div.id + `')">Delete event</button>
      </div>
    </div>`

  document.getElementById('event_card_container').appendChild(div);
}

function remove_event_card(event_id) {
  var element = document.getElementById(event_id);
  element.parentNode.removeChild(element);
}


$(window).on('load',function(){
  // $('#myModal').modal('show');
});

// Add listener to create event form
document.getElementById("create_event").addEventListener('submit', add_event);

