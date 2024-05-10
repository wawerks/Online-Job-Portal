// profile.js

document.addEventListener('DOMContentLoaded', function () {
    // Get elements
    const fullNameInput = document.getElementById('editFullName');
    const emailInput = document.getElementById('editEmail');
    const phoneInput = document.getElementById('editPhone');
    const addressInput = document.getElementById('editAddress');
    const saveChangesBtn = document.getElementById('saveChangesBtn');

    // Get display elements
    const displayFullName = document.getElementById('displayFullName');
    const displayEmail = document.getElementById('displayEmail');
    const displayPhone = document.getElementById('displayPhone');
    const displayAddress = document.getElementById('displayAddress');

    // Event listener for Save Changes button
    saveChangesBtn.addEventListener('click', function () {
        // Update display elements with new values
        displayFullName.textContent = fullNameInput.value;
        displayEmail.textContent = emailInput.value;
        displayPhone.textContent = phoneInput.value;
        displayAddress.textContent = addressInput.value;

        // Display alert
        alert('Changes saved successfully!');

        // Redirect back to profile (you can replace 'profile.html' with the actual URL)
        window.location.href = 'profile.html';
    });
});