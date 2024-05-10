import { supabase, successNotification, errorNotification } from "../main";

document.addEventListener("DOMContentLoaded", () => {
    const form_register = document.getElementById("form_register");

    form_register.onsubmit = async (e) => {
        e.preventDefault();

        // Disable the submit button and show loading spinner
        document.querySelector("#form_register button[type='submit']").disabled = true;
        document.querySelector("#form_register button[type='submit']").innerHTML = '<div class="spinner-border me-2" role="status"></div><span>Loading...</span>';

        const formData = new FormData(form_register);

        if (formData.get("password") == formData.get("confirm_password")) {
            try {
                const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                    email: formData.get("email"),
                    password: formData.get("password"),
                });

                if (signUpError) {
                    console.error("Error during sign-up:", signUpError.message);
                    errorNotification("Registration Unsuccessful", 10); // Show error notification
                } else { 
                    const userId = signUpData?.user?.id;
                
                    if (userId) {
                        const { data: insertData, error: insertError } = await supabase
                            .from("users_information")
                            .insert([
                                {
                                    first_name: formData.get("first_name"),
                                    last_name: formData.get("last_name"),
                                    middle_name: formData.get("middle_name"),
                                    phone_num: formData.get("phone_num"),
                                    user_id: userId,
                                },
                            ])
                            .select();

                        console.log("User information insertion response data:", insertData);
                        console.log("User information insertion error:", insertError);
                        
                        successNotification("Registered Successfully", 10);
                    }
                }
            } catch (error) {
                errorNotification("Registration Unsuccessful", 10); // Show error notification
                console.error("Error during sign-up:", error.message);
            }

            // Reset form
            form_register.reset();

            // Enable submit button and restore original text
            document.querySelector("#form_register button[type='submit']").disabled = false;
            document.querySelector("#form_register button[type='submit']").innerHTML = 'Sign Up';

        } else {
            // Code to handle when passwords don't match
            errorNotification("Passwords do not match", 10); // Show error notification
            
            // Enable submit button and restore original text
            document.querySelector("#form_register button[type='submit']").disabled = false;
            document.querySelector("#form_register button[type='submit']").innerHTML = 'Sign Up';
        }
    };
});
    