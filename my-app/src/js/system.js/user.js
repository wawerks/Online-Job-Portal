import { supabase, successNotification, errorNotification } from "../main";
getDatas();

let for_update_id = "";
async function getDatas() {
   
    let { data: users_information, error } = await supabase
    .from('users_information')
    .select('*')
    .eq('id', 8);

    let container = "";

    // Render users_information
    users_information.forEach((users_information) => {
        container += `
        <div class="row" data-id ="${users_information.id}">
            <div class="col-lg-4">
                <div class="card mb-4">
                    <div class="card-body text-center">
                        <img src="images/432369603_797347465573292_1234172152241366030_n.jpg"
                            alt="avatar" class="rounded-circle img-fluid" style="width: 150px; height: 150px;">
                            <h5 id="fullName" class="my-3">${users_information.first_name} ${users_information.last_name}</h5>
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
                                <p id="displayFullName" class="text-muted mb-0">${users_information.first_name}</p>
                            </div>
                        </div>
                        <hr> 
                        <div class="row">
                          <div class="col-sm-3">
                              <p class="mb-0">Last Name</p>
                              <p>${users_information.last_name} </p>
                          </div>
                      </div>
                      <hr>
                      <div class="row">
                          <div class="col-sm-3">
                              <p class="mb-0">Middle Name</p>
                              <p>${users_information.middle_name} </p>
                          </div>
                      </div>
                      <hr>
                        <div class="row">
                          <div class="col-sm-3">
                              <p class="mb-0">Phone</p>
                              <p>${users_information.phone_num} </p>
                          </div>
                      </div>
                      <hr>
                        <!-- Repeat similar structure for other details (Phone, Mobile, Address) -->
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    });

    document.getElementById("get_data").innerHTML = container;
    // Adjust body height after rendering job posts
}

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
