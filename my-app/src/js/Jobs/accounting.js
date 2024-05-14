import { supabase, successNotification, errorNotification } from "../main";
import { getAppliedJobId } from "../wala";
// Load data
getDatas();
getAppliedJobId();

// search Form Functionality
document.addEventListener("DOMContentLoaded", () => {
    const form_search = document.getElementById("form_search");

    form_search.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form_search);

        getDatas(formData.get("keyword"));
    });
});

// Load data functionality
async function getDatas(keyword = "") {
    try {
        let { data: job_posts, error } = await supabase
            .from('job_posts')
            .select('*')
            .eq('category_id', 9)
            .or("job_title.ilike.%" + keyword + "%, job_description.ilike.%" + keyword +"%");

        if (error) {
            throw error;
        }

        let container = "";

        // Render job posts
        job_posts.forEach((job_post) => {
            container += `
                <div id="list" data-id="${job_post.id}" class="job-card">
                    <ol style="--length: 10">
                        <li style="--i: 1">
                                <h3>${job_post.job_title}</h3>
                                <p>${job_post.job_description}</p>
                            </aclass=>
                        </li>
                    <a  href="Application.html" > <button type="button" class="applyButton btn btn-dark" data-id="${job_post.id}">Apply Now</button></a>
                    </ol>
                </div>`;
        });

        document.getElementById("get_data").innerHTML = container;

    } catch (error) {
        console.error('Error fetching job posts:', error);
        // Handle error gracefully, such as displaying an error message to the user
        errorNotification("Failed to fetch job posts", 5);
    }
    // Adjust body height after rendering job posts
    adjustBodyHeight();
}
    
function handleApplyButtonClick(id) {
    // Call the function to store the applied job ID in localStorage
    getAppliedJobId(id);
}
// Function to adjust body height based on container's height and navigation bar's height
function adjustBodyHeight() {
    var containerHeight = document.querySelector('.container').offsetHeight;
    var navBarHeight = document.querySelector('.navbar').offsetHeight; // Get height of the navigation bar

    // Calculate the total height required for the body
    var totalHeight = containerHeight + navBarHeight + 350; // Add extra padding (adjust as needed)

    document.body.style.height = totalHeight + 'px';
}


