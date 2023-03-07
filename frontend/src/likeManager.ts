
// Images should be stored as Obj {} with urls as keys, boolean as value
const favoriteImagesKey = "favorites";

function getLikedImages(): any {
  const json = localStorage.getItem(favoriteImagesKey);
  if(json === null) {
    return {}
  }
  return JSON.parse(json);
}

function setLikedImages(imageJSON: Object): void {
  localStorage.setItem(favoriteImagesKey, JSON.stringify(imageJSON));
}

function imageDataExists(imageURL: string): boolean {
  return imageURL in getLikedImages();
}

function imageIsLiked(imageURL: string): boolean {
  const favorites = getLikedImages();

  return (imageURL in favorites && favorites[imageURL]);
}

function toggleLikedStatus(imageURL: string): void {
  const json = getLikedImages();

  // Add new image key if it doesn't exist
  if(!(imageURL in json)) {
    json[imageURL] = true;
  } else {
    // Toggle value if image key does exist
    json[imageURL] = !json[imageURL];
  }
  setLikedImages(json);
}

const Manager = {
  favoriteImagesKey, 
  getLikedImages, 
  imageDataExists, 
  imageIsLiked, 
  toggleLikedStatus
};

export default Manager;