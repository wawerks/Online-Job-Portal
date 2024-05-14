import { supabase, successNotification, errorNotification } from "../main";

document.addEventListener("DOMContentLoaded", async function() {
    try {
        

        const { data: { user } } = await supabase.auth.getUser();
            
        // Store user ID in local storage
        localStorage.setItem("user_id", user.id);

        // Retrieve appliedJobId from the local storage
        const appliedJobId = localStorage.getItem('appliedJobId');
        
        const form_application = document.getElementById("form_application");

        form_application.onsubmit = async (e) => {
            e.preventDefault();
            const formData = new FormData(form_application);

                    
            // Disable the submit button and show loading spinner
            document.querySelector("#form_application button[type='submit']").disabled = true;
            document.querySelector("#form_application button[type='submit']").innerHTML = '<div class="spinner-border me-2" role="status"></div><span>Loading...</span>';
    
            try {
                // Fetch user information from users_information table
                const { data: userInfo, error: userInfoError } = await supabase
                    .from('users_information')
                    .select('id')
                    .eq('user_id', localStorage.getItem("user_id"))
                    .single();

                if (userInfoError) {
                    throw userInfoError;
                }

                const user_info_id = userInfo.id;
                
                if (user_info_id && appliedJobId) {
                    // Insert application form data into the application_forms table
                    const { data: insertData, error: insertError } = await supabase
                        .from('application_forms')
                        .insert([
                            {
                                social_media_link: formData.get("social_media_link"),
                                resume_link: formData.get("resume"),
                                job_post_id: appliedJobId, // Using appliedJobId retrieved from local storage
                                user_info_id: user_info_id,
                            },
                        ]);

                    if (insertError == null) {
                        successNotification("Application Submitted!", 5);
                    } else {
                        errorNotification("Something went wrong", 5); 
                        console.error('Error inserting application form data:', insertError.message);
                    }
                    document.querySelector("#form_application button[type='submit']").disabled = false;
                    document.querySelector("#form_application button[type='submit']").innerHTML = 'Sign Up';
                    form_application.reset();

                } else {
                    console.error('Error: Invalid user info or job post');
                }   // Enable submit button and restore original text
              
            } catch (error) {
                console.error('Error:', error);
            } 
            
        };
    } catch (error) {
        console.error('Error:', error);
    }
    
});
