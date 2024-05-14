// Function to handle the action when the "Apply Now" button is clicked
const handleApplyButtonClick = (id) => {
    // Set the applied job ID in localStorage
    localStorage.setItem('appliedJobId', id);

    // Perform other actions related to applying for the job post
    console.log(id);
};

// Function to handle clicking on job cards
const cardAction = async (e) => {
    if (!e.target.classList.contains('applyButton')) {
        return; // If the clicked element is not the "Apply Now" button, return early
    }
    console.log(e.target); // Add this line for debugging
    const id = e.target.getAttribute("data-id");
    handleApplyButtonClick(id); // Call handleApplyButtonClick with the ID
};

// assign click event on cards using event delegation
document.getElementById("get_data").addEventListener("click", (e) => {
    cardAction(e); // Call cardAction function
});

export function getAppliedJobId() {
    return localStorage.getItem('appliedJobId');
}

export function jobId() {
    // You may want to return the ID from localStorage if it's set
    return localStorage.getItem('appliedJobId');
}
