const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

//global variables
let photoarray = [];
let imagesLoaded = 0;
let ready = false;
let totalimages = 0;

//check if all images are loaded
function imageLoaded() {
  console.log("images loaded");
  imagesLoaded++;
  if (imagesLoaded === totalimages) {
    ready = true;
    loader.hidden = true;
    console.log("ready=", ready);
  }
}

//helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//create elements for links & photos, ADD TO DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalimages = photoarray.length;
  console.log("totalimages=", totalimages);
  photoarray.forEach((photo) => {
    //creating anchor element<a> to link to unsplash
    const item = document.createElement("a");
    //  item.setAttribute('href',photo.links.html);
    //  item.setAttribute('target', '_blank');
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    //create <img> for photo
    const img = document.createElement("img");
    //  img.setAttribute('src',photo.urls.regular)
    //  img.setAttribute('alt', photo.alt_description)
    //  img.setAttribute('title', photo.alt_description)
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    //Event Listener, check when each is finished loading
    img.addEventListener("load", imageLoaded);
    //put <img> inside <a>, then put both inside image container
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

//unsplash API
const count = 30;
const apikey = "cWmL4C7OcDxKDJdEfeqbAob5cB4XmOstHxpn_-ofoBU";
const apiurl = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;

//get photos from unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiurl);
    photoarray = await response.json();
    displayPhotos();
  } catch (error) {
    console.log("API call failed: " + error);
  }
}
//check to see if scrolling near bottom of page, load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1500 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});
getPhotos();
