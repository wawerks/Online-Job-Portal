import { supabase, successNotification, errorNotification } from "../main";

// Get the logout button
const logoutButton = document.getElementById("btn_logout");
console.log("logoutButton:", logoutButton); // Debugging statement

// Check if the logout button exists
if (logoutButton) {
    // Set up click event handler for the logout button
    logoutButton.addEventListener("click", async () => {
        console.log("Logout button clicked"); // Debugging statement

        // Disable the button and show loading spinner
        logoutButton.disabled = true;
        logoutButton.innerHTML = '<div class="spinner-border me-3 " role="status"></div>';

        // Perform logout operation
        let { error } = await supabase.auth.signOut();
        console.log("Logout error:", error); // Debugging statement

        // Handle logout result
        if (error == null) {
            successNotification("Logout Successfully!");
            localStorage.clear(); // Clear local Storage
            window.location.pathname = "/index.html"; // Redirect to login page
        } else {
            errorNotification("Logout Failed!", 10);
            
            // Re-enable the button and set its text back to "Log Out"
            logoutButton.disabled = false;
            logoutButton.innerHTML = 'Log Out';
        }
    });
} else {
    console.error("Logout button not found."); // Debugging statement
}
