import { createClient } from '@supabase/supabase-js';
import { successNotification,errorNotification } from './main';
import { Alert } from 'bootstrap';
// Initialize Supabase client
const supabaseUrl = 'https://gvxqhcvidjwviuwdpeiw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2eHFoY3ZpZGp3dml1d2RwZWl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4ODUzMjcsImV4cCI6MjAyODQ2MTMyN30.Aaqtv9hplEn6AhqdUF7tGbXIoJOgxww4UtEr4gbqldc';
const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', async function () {
  // Retrieve user_id from localStorage
  const userId = localStorage.getItem("user_id");

  if (!userId) {
    console.error('User ID not found in localStorage');
    return;
  }

  // Fetch user data from Supabase based on the user_id
  const { data: userData, error: userError } = await supabase
    .from('users_information')
    .select('first_name, last_name, middle_name, phone_num')
    .eq('user_id', userId)
    .single();

  if (userError) {
    console.error('Error fetching user data:', userError.message);
    return;
  }

  if (!userData) {
    console.error('No user data found');
    return;
  }

  // Populate form fields with user data
  const firstNameInput = document.getElementById('first_name');
  const lastNameInput = document.getElementById('last_name');
  const middleNameInput = document.getElementById('middle_name');
  const phoneNumInput = document.getElementById('phone_num');
//   const imagePath = document.getElementById('image_path');

  firstNameInput.value = userData.first_name;
  lastNameInput.value = userData.last_name;
  middleNameInput.value = userData.middle_name;
  phoneNumInput.value = userData.phone_num;
//   imagePath.value = userData.image_path;

  // Event listener for form submission
  const form = document.getElementById('form_edit');
    form.addEventListener('submit', async function (event) {
    event.preventDefault();
    alert("Hello");
  });

        // const formData = new FormData(form);
    //  // Disable the submit button and show loading spinner
    //  document.querySelector("#form_edit button[type='submit']").disabled = true;
    //  document.querySelector("#form_edit button[type='submit']").innerHTML = '<div class="spinner-border me-2" role="status"></div><span>Loading...</span>';

    //     const image = formData.get("image_path");
    //     const { data, error } = await supabase
    //     .storage
    //     .from("image")
    //     .upload("public/"+image.name, image, {
    //         cacheControl: '3600',
    //         upsert: true,
    //     });

    //     const image_data = data;
    //     if(error == null){
    //         successNotification("Information Updated!", 5);

    //     }else{
    //         errorNotification("Something went wrong, file image might bigger than 5mb",5);
    //     }
    //     console.log(data);
    //     document.querySelector("#form_edit button[type='submit']").disabled = false;
    //     document.querySelector("#form_edit button[type='submit']").innerHTML = 'Updated!';

    // // Get updated user information from form
    // const updatedData = {
    //   first_name: firstNameInput.value,
    //   last_name: lastNameInput.value,
    //   middle_name: middleNameInput.value,
    //   phone_num: phoneNumInput.value,
    //   image_path: image_data == null ? null : image_data.path,
    // };
    // form.reset();

    // // Update user information in Supabase based on the user_id
    // const { error: updateError } = await supabase
    //   .from('users_information')
    //   .update(updatedData)
    //   .eq('user_id', userId);

    // if (updateError) {
    //   console.error('Error updating user data:', updateError.message);
    //   return;
    // }

    // Display alert
    // window.location.reload();
  // });
});