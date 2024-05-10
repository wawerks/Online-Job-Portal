import { supabase, successNotification, errorNotification} from "../main";

document.addEventListener("DOMContentLoaded", function() {
    // JavaScript code here

    const form_post = document.getElementById("form_post");

  
    form_post.onsubmit = async (e) => {
        e.preventDefault();

          // Disable the submit button and show loading spinner
    const submitButton = document.querySelector("#form_post button[type='submit']");
    submitButton.disabled = true;
    submitButton.innerHTML = '<div class="spinner-border me-2" role="status"></div><span>Loading...</span>';


        // Get all values from the form_post
        const formData = new FormData(form_post);
        let user_info_id  = 8;

        // Input data to Supabase
        const { data, error } = await supabase
            .from('job_posts')
            .insert([
                {
                    job_description: formData.get("job_description"), 
                    job_title: formData.get("job_title"),
                    category_id: formData.get("category_id"),
                    user_info_id: user_info_id,
                },
            ])
            .select();

        if (error == null) {
            successNotification("Job Posted!", 5);
        } else {
            errorNotification("Something went wrong", 5); 
        }
        form_post.reset();

        // Enable submit button after form submission
        submitButton.disabled = false;
        submitButton.innerHTML = 'Post';
    }
});
