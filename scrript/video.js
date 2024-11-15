
// time converter function

function timeConvert(time) 
{
    let hour = parseInt(time/3600);
    let min = parseInt(time%60);
    
    return `${hour} hour ${min} min ago`;
}

const removeActiveClass = () =>
{
    const buttons = document.getElementsByClassName("category-btn");
    for(let btn of buttons)
    {
        btn.classList.remove("active");
    }
}

// load category -> call the display 
const loadCatagories = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((result) => result.json())
    .then((data) => display(data.categories))
    .catch((error) => console.log(error))
}
loadCatagories();

const loadCategoriesVideo = (id) =>{
    // alert(id);
    // fetch("https://openapi.programming-hero.com/api/phero-tube/category/1001")
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {

        removeActiveClass();
        // add active button
        const activeBTN = document.getElementById(`btn-${id}`);
        
        activeBTN.classList.add("active");
        videoDisplay(data.category);
    })
    .catch((error) => console.log(error));
};


// display function
const display = (data) => 
    {
        const categoriesContainer = document.getElementById("categories");
        data.forEach(element => 
            {
                console.log(element);
    
                // for each element create a button
                // const button = document.createElement("button");
                // button.classList = "btn";
                // button.innerText = element.category;
                const buttonContainer = document.createElement("div");
                buttonContainer.innerHTML = 
                `
                <button id="btn-${element.category_id}" onclick="loadCategoriesVideo(${element.category_id})" class="btn category-btn">${element.category}</button>
                `
                // adding button to the container
                categoriesContainer.append(buttonContainer);
                // categoriesContainer.append(button);
            }
        );
        
    }


// load videos
const loadVideo = (searchText = "") => 
    {
    // fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((result) => result.json())
    .then((data) => videoDisplay(data.videos))
    .catch((error) => console.log(error));
};
loadVideo();

// load details function
const loadDetails = async (videoId) =>
{
    console.log(videoId);
    const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(uri);
    const data = await res.json();
    displayDetails(data.video);
}

// display details
const displayDetails = (videoObj) =>
{
    // console.log(videoObj);
    const detailsContainer = document.getElementById("modal-content");
    detailsContainer.innerHTML =    `
    <img src = ${videoObj.thumbnail}/>
    <p>${videoObj.description}<p/>
    `
    // way 1 to show modal
    // document.getElementById("showModalData").click();
    // ?way 2
    document.getElementById("customModal").showModal();

}

// video display function
const videoDisplay = (video) =>{
    const videoContainer = document.getElementById("videos");
    videoContainer.innerHTML = "";

    if(video.length == 0)
    {
        videoContainer.classList.remove("grid");
        videoContainer.innerHTML = 
        `
        <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
        <img src="images/Icon.png"/>
        <h2 class="text-center font-bold text-xl">No Content Here in this Category</h2>
        </div>
        `;
        return;
    }
    else
    {
        videoContainer.classList.add("grid");
    }
    video.forEach(item =>
    {
        console.log(item);
        const card = document.createElement("div");
        card.classList = "card card-compact";
        card.innerHTML = 
        

                 // ${item.others.posted_date?.length == 0 ? "" : `<span class="absolute right-2 bottom-2 text-white bg-black rounded p-1">${item.others.posted_date}</span>`}   
        `
        <figure class="h-[200px] relative">
            <img class="h-full w-full object-cover"
            src="${item.thumbnail}"
            alt="Shoes" />

            ${item.others.posted_date?.length == 0 ? " " : `<span class="absolute text-sm right-2 bottom-2 text-white bg-black rounded p-1">${timeConvert(item.others.posted_date)}</span>`}
            
        </figure>
        <div class="py-2 px-0 flex gap-2">
            <div>
            <img class="w-8 h-8 rounded-full object-cover" src= ${item.authors[0].profile_picture}/>
            </div>

            <div>
            <h2 class="font-bold">${item.title}</h2>

            <div class="flex gap-2 items-center">
                <p class="text-gray-400">${item.authors[0].profile_name}</p>
                ${item.authors[0].verified == true ? `<img class="w-5 h-5 object-cover" src = https://img.icons8.com/?size=100&id=2sZ0sdlG9kWP&format=png&color=000000/>`: " "}
            </div>
                <p><button onclick="loadDetails('${item.video_id}')" class="btn btn-sm btn-error">Details</button></p>
            </div>
            
            </div>
        </div>
        `
        videoContainer.append(card);
    }
        
    )
}

document.getElementById("search-input").addEventListener("keyup",(e) =>
{
    // console.log(e.target.value);
    loadVideo(e.target.value);
    
})
