import { getBreedNameFromURL } from "./util";

// Images should be stored as Obj {} with breed name as keys, {url: isLiked} as value
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

function breedDataExists(breedName: string): boolean {
  return breedName in getLikedImages();
}

function getBreedData(breedName: string): any {
  if (breedDataExists(breedName)) {
    return getLikedImages()[breedName];
  }

  return {};
}

function imageDataExists(imageURL: string): boolean {
  try {
    const breedName = getBreedNameFromURL(new URL(imageURL));
      return breedDataExists(breedName) && (imageURL in getLikedImages()[breedName]);
  } catch {
    return false;
  }
}

function imageIsLiked(imageURL: string): boolean {
  try {
    const breedName = getBreedNameFromURL(new URL(imageURL));
    const breedData = getBreedData(breedName);
    return (imageURL in breedData && breedData[imageURL]);
  } catch {
    return false;
  }
}

function toggleLikedStatus(imageURL: string): void {
  const imageJson = getLikedImages();
  const breedName = getBreedNameFromURL(new URL(imageURL));

  // Add new breed key if it doesn't exist
  if(!(breedName in imageJson)) {
    imageJson[breedName] = {}
  }

  const breedData = imageJson[breedName];

  // Add new image key if it doesn't exist
  if(!(imageURL in breedData)) {
    breedData[imageURL] = true;
  } else {
    // Delete property if image key does exist
    delete breedData[imageURL];

    // Delete breed key if no more images exist
    if(Object.keys(imageJson[breedName]).length === 0) {
      delete imageJson[breedName];
    }
  }
  setLikedImages(imageJson);
}

const Manager = {
  favoriteImagesKey, 
  getLikedImages,
  breedDataExists,
  getBreedData,
  imageDataExists, 
  imageIsLiked, 
  toggleLikedStatus
};

export default Manager;