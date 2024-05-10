// Define the successNotification function
function successNotification(message, timeout) {
    const successDiv = document.getElementById("success-message");
    if (successDiv) {
        successDiv.innerHTML = message;

        // Optionally, hide the success message after a timeout
        setTimeout(() => {
            successDiv.innerHTML = "";
        }, timeout * 1000); // Convert seconds to milliseconds
    } else {
        console.error("Element with ID 'success-message' not found.");
    }
}

// Define the errorNotification function
function errorNotification(message, timeout) {
    const errorDiv = document.getElementById("error-message");
    if (errorDiv) {
        errorDiv.innerHTML = message;

        // Optionally, hide the error message after a timeout
        setTimeout(() => {
            errorDiv.innerHTML = "";
        }, timeout * 1000); // Convert seconds to milliseconds
    } else {
        console.error("Element with ID 'error-message' not found.");
    }
}

// Your existing code
import { supabase } from "../main";

document.addEventListener("DOMContentLoaded", () => {
    const form_login = document.getElementById("form_login");

    form_login.onsubmit = async (e) => {
        e.preventDefault();

        // Disable the submit button and show loading spinner
        const submitButton = document.querySelector("#form_login button[type='submit']");
        submitButton.disabled = true;
        submitButton.innerHTML = '<div class="spinner-border me-2" role="status"></div><span>Loading...</span>';

        // get All values from input, select, textarea under form tag    
        const formData = new FormData(form_login);

        // supabase login
        let { data, error } = await supabase.auth.signInWithPassword({
            email: formData.get("email"),
            password: formData.get("password"),
        });

        console.log(data);

        let session = data.session;
        let user = data.user;

        // If user can be accessed; Or user is already verified
        if(session != null){
            localStorage.setItem("access_token", session.access_token);
            localStorage.setItem("refresh_token", session.refresh_token);
            
        //     // for role based authentication
        // let { data: users_information, error } = await supabase
        // .from('users_information')
        // .select('*') // you can specifically set what column, read docu for more info
        // .eq('user_id', user.id);

        //     console.log(users_information);
        //     localStorage.setItem("role",users_information.role);
        }

        // show notification
        if (error == null) {
            successNotification("Login Successfully");
            // reset form
            form_login.reset();
            window.location.pathname = "/home.html";

        } else {
            errorNotification("email or password is incorrect",10);
            console.log(error);
        }

        // Enable submit button after form submission
        submitButton.disabled = false;
        submitButton.innerHTML = 'Sign In';
    };
});
