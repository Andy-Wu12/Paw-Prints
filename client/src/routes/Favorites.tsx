import { useState, useEffect } from "react"

import SectionedImageList from "../components/SectionedImageList";
import LikeManager from "../likeManager"

type tImagesByBreed = {
  [breedName: string]: {
    [imageUrls: string]: boolean
  }
}

export default function FavoriteImages() {
  const [imagesByBreed, setImagesByBreed] = useState<tImagesByBreed>({});

  useEffect(() => {
    setImagesByBreed(LikeManager.getLikedImages());

  }, []);

  return (
    <>
      <h1> Favorites </h1> <br/>
      {Object.keys(imagesByBreed).map((breedName) => {
        return (
          <SectionedImageList key={breedName}
            sectionName={breedName} 
            imageURLs={Object.keys(imagesByBreed[breedName])} />
          )
        })
      }
    </>
  )
}

