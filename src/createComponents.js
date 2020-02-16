function createEventForm() {
    const form = document.createElement('form');
    form.id = "create_event";
    form.innerHTML = `
    <div class="form-row">
        <div class="form-group col-md-4">
            <label for="eventInput">Event Name</label>
            <input type="text" class="form-control" id="eventInput" placeholder="Name of event. E.g. Going to Nara Park.">
        </div>
        <div class="form-group col-md-4">
            <label for="locationInput">Location</label>
            <input type="text" class="form-control" id="locationInput" placeholder="Location. E.g. Nara Park">
        </div>
        <div class="form-group col-md-4">
            <label for="descriptionInput">Event Description</label>
            <input type="text" class="form-control" id="descriptionInput" placeholder="look at deers.">
        </div>
    </div>
    <div class="form-group  col-md-4">
        <label for="durationInput">Duration</label>
        <select id="durationInput" class="form-control">
            <option selected>1 hour</option>
            <option>2 hours</option>
            <option>3 hours</option>
            <option>4 hours</option>
            <option>5 hours</option>
            <option>6 hours</option>
            <option>7 hours</option>
            <option>8 hours</option>
            <option>9 hours</option>
            <option>10 hours</option>
            <option>11 hours</option>
            <option>12 hours</option>
        </select>
    </div>
  <button type="submit" class="btn btn-primary">Add new event</button>`

  return form;
}

function createDateInput(date) {
    const div = document.createElement('div');
    div.className = "form-group";
    div.innerHTML = `
    <div class="form-group col-md-6">
        <input id="dateInput" type="text" class="form-control" id="formGroupExampleInput" placeholder="` + date + `">
    </div>
    `
    return div;
}