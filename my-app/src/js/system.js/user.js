import { supabase, successNotification, errorNotification } from "../main";

const itemImageUrl = 'https://gvxqhcvidjwviuwdpeiw.supabase.co/storage/v1/object/public/image/';

async function getDatas() {
    try {
        // Fetch user information from users_information table
        const { data: userInfo, error: userInfoError } = await supabase
            .from('users_information')
            .select('*')
            .eq('user_id', localStorage.getItem("user_id"))
            .single();

        if (userInfoError) {
            throw userInfoError;
        }

        // Check if user information exists
        if (userInfo) {
            const user_info_id = userInfo.id;

            let container = "";

            // Render users_information
            container += `
            <div class="row" data-id="${userInfo.id}">
                <div class="col-lg-4">
                    <div class="card mb-4">
                        <div class="card-body text-center">
                            <img src="${itemImageUrl + userInfo.image_path}"
                                alt="upload img" class="rounded-circle img-fluid" style="width: 150px; height: 150px;">
                            <h5 id="fullName" class="my-3">${userInfo.first_name} ${userInfo.last_name}</h5>
                            <div class="d-flex justify-content-center mb-2">
                                <button type="button" class="btn btn-dark" data-bs-toggle="modal"
                                    data-bs-target="#editModal">Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-8">
                    <div class="card mb-4">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-sm-3">
                                    <p class="mb-0">First Name</p>
                                </div>
                                <div class="col-sm-9">
                                    <p id="displayFullName" class="text-muted mb-0">${userInfo.first_name}</p>
                                </div>
                            </div>
                            <hr> 
                            <div class="row">
                                <div class="col-sm-3">
                                    <p class="mb-0">Last Name</p>
                                    <p>${userInfo.last_name}</p>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <p class="mb-0">Middle Name</p>
                                    <p>${userInfo.middle_name}</p>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <p class="mb-0">Phone</p>
                                    <p>${userInfo.phone_num}</p>
                                </div>
                            </div>
                            <hr>
                            <!-- Repeat similar structure for other details (Phone, Mobile, Address) -->
                        </div>
                    </div>
                </div>
            </div>`;

            document.getElementById("get_data").innerHTML = container;
        } else {
            console.error('Error: User information not found');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call the getDatas function to fetch and render user information
getDatas();

//     const formData = new FormData (form_edit);

// // for update users_information supabase
//         const { data, error } = await supabase
//         .from('users_information')
//         .update({
//         first_name: formData.get("first_name"),
//         last_name: formData.get("last_name"),
//         middle_name: formData.get("middle_name"),
//         phone_num: formData.get("phone_num"),
//         // image_path: formData.get("image_path"),
//         })
//         .eq('id', for_update_id)
//         .select();

//         if (error == null) {
//             successNotification("Information Updated!", 5);
//             // reset storage update
//             getDatas();
//         } else {
//             errorNotification("Something went wrong", 5); 
//             console.log(error);
//         }
//         form_post.reset();
    
 
// // Function to adjust body height based on container's height and navigation bar's height
// function adjustBodyHeight() {
//     var containerHeight = document.querySelector('.container').offsetHeight;
//     var navBarHeight = document.querySelector('.navbar').offsetHeight; // Get height of the navigation bar

//     // Calculate the total height required for the body
//     var totalHeight = containerHeight + navBarHeight + 50; // Add extra padding (adjust as needed)

//     document.body.style.height = totalHeight + 'px';
// }