import { supabase, successNotification, errorNotification } from "../main";

document.addEventListener("DOMContentLoaded", function() {
    const form_application = document.getElementById("form_application");

    form_application.onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(form_application);

        const { data, error } = await supabase
            .from('application_forms')
            .insert([
                {
                    social_media_link: formData.get("social_media_link"),
                    resume: formData.get("resume"),
                },
            ])
            .select();

        if (error == null) {
            successNotification("Application Submitted!", 5);
        } else {
            errorNotification("Something went wrong", 5); 
        }
        
        form_application.reset();
        console.log(data);
        console.log(error);
    }
});
