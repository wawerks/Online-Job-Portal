// Import our custom CSS
import '../scss/styles.scss'

//Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

// import router
import { setRouter } from './Router/router.js';

// import supabase
import { createClient } from '@supabase/supabase-js'

// setRouter
setRouter();

// Create a single supabase client for interacting with your database
const supabase = createClient('https://gvxqhcvidjwviuwdpeiw.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2eHFoY3ZpZGp3dml1d2RwZWl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4ODUzMjcsImV4cCI6MjAyODQ2MTMyN30.Aaqtv9hplEn6AhqdUF7tGbXIoJOgxww4UtEr4gbqldc');

// notification
function successNotification(message, seconds = 0) {
    const successAlert = document.querySelector(".alert-success");
    successAlert.innerHTML = message;
    successAlert.classList.remove("d-none");
    successAlert.classList.add("d-block");

    if (seconds !== 0) {
        setTimeout(function() {
            successAlert.classList.remove("d-block");
            successAlert.classList.add("d-none");
        }, seconds * 1000);
    }
}

function errorNotification(message, seconds = 0) {
    const errorAlert = document.querySelector(".alert-danger");
    errorAlert.innerHTML = message;
    errorAlert.classList.remove("d-none");
    errorAlert.classList.add("d-block");

    if (seconds !== 0) {
        setTimeout(function() {
            errorAlert.classList.remove("d-block");
            errorAlert.classList.add("d-none");
        }, seconds * 1000);
    }
}

export{supabase, successNotification, errorNotification };