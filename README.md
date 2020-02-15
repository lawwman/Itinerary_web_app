# A web app for managing itinerary

## notes about local storage
keys = [trip_duration, events_list]

## Technologies used

Bootstrap CSS for style.
Gulp, browser-sync for development convenience.
Jquery - For client side code and it is also a requirement of Bootstrap.

## Setting up

Install Node JS. NPM comes with node.
run "npm install --global gulp cli" to install gulp globally (it also sets it in the path variable). We are now able to run the "gulp" command.
run "npm install" in the same folder as the package.json to install the required packages.


## Bootstrap 4

I used bootstrap for the styling of the web app.

### Resources I used:
https://getbootstrap.com/docs/4.4/getting-started/introduction/
https://getbootstrap.com/docs/4.4/components/alerts/
https://www.digitalocean.com/community/tutorials/an-introduction-to-jquery


## Gulp

Gulp is used to help automate many of the tedious tasks in developing the web app (such as converting the SASS to CSS, refreshing browser etc).
Not neccesary but helpful in development.

The "gulp" command from the command prompt will search for gulpfile.js and run it.

### Resources I used:
https://gulpjs.com/docs/en/getting-started/quick-start  - useful to quickly get into development

https://gulpjs.com/docs/en/api/concepts                 - API and concepts.

https://www.youtube.com/watch?v=LYbt50dhTko             - useful video is summarizing uses of gulp and using it with SASS. However do not follow too closely. The code used is a little deprecated. Just follow the API on the gulpjs website.

