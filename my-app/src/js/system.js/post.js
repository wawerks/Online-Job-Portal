import { supabase, successNotification, errorNotification } from "../main";

document.addEventListener("DOMContentLoaded", async function() {    
    try {
        // Fetch session data
        const { data: { user } } = await supabase.auth.getUser();
            
        // Store user ID in local storage
        localStorage.setItem("user_id", user.id);

        // // Retrieve foreign key information from job_posts table
        // const Fetchdata = async () => {
        //     try {
        //         let { data: job_posts, error } = await supabase
        //             .from('job_posts')
        //             .select(`
        //                 *,
        //                 users_information (
        //                     *
        //                 )
        //             `);
                        
        //         // Log the job posts data, including related data from other tables
        //         if(job_posts){
        //             console.log(job_posts);
        //         }
        //     } catch (error) {
        //         console.error('Error fetching job posts:', error.message);
        //     }
        // };

        // Call Fetchdata function to fetch job posts data
        // Fetchdata();

    } catch (error) {
        console.error('Error:', error);
    }
});

document.addEventListener("DOMContentLoaded", async function() {
    // JavaScript code here

    const form_post = document.getElementById("form_post");

    form_post.onsubmit = async (e) => {
        e.preventDefault();

        // Disable the submit button and show loading spinner
        const submitButton = document.querySelector("#form_post button[type='submit']");
        submitButton.disabled = true;
        submitButton.innerHTML = '<div class="spinner-border me-2" role="status"></div><span>Loading...</span>';

        try {
            // Get all values from the form_post
            const formData = new FormData(form_post);
            
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
                console.error('Error posting job:', error.message);
            }
            form_post.reset();

        } catch (error) {
            console.error('Error:', error);
        } finally {
            // Enable submit button after form submission
            submitButton.disabled = false;
            submitButton.innerHTML = 'Post';
        }
    };
});
