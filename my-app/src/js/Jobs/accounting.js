import { supabase, successNotification, errorNotification } from "../main";

// Load data
getDatas();

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
    let { data: job_posts, error } = await supabase
        .from('job_posts')
        .select('*')
        .eq('category_id', 3)
        .or("job_title.ilike.%" + keyword + "%, job_description.ilike.%" + keyword +"%");

    let container = "";

    // Render job posts
    job_posts.forEach((job_post) => {
        container += `
            <div id="list" data-id="${job_post.category_id}">
                <ol style="--length: 10">
                     <li style="--i: 1">
                        <a href="Application.html">
                            <h3>${job_post.job_title}</h3>
                            <p>${job_post.job_description}</p>
                        </a>
                    </li>
                </ol>
            </div>`;
    });

    document.getElementById("get_data").innerHTML = container;
    // Adjust body height after rendering job posts
    adjustBodyHeight();
}

// Function to adjust body height based on container's height and navigation bar's height
function adjustBodyHeight() {
    var containerHeight = document.querySelector('.container').offsetHeight;
    var navBarHeight = document.querySelector('.navbar').offsetHeight; // Get height of the navigation bar

    // Calculate the total height required for the body
    var totalHeight = containerHeight + navBarHeight + 50; // Add extra padding (adjust as needed)

    document.body.style.height = totalHeight + 'px';
}
