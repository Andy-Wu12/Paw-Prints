import { useState, useEffect } from "react"

import { ImageList } from "../components/ImageList"
import LikeManager from "../likeManager"

export default function FavoriteImages() {
  const [links, setLinks] = useState<string[]>([]);

  useEffect(() => {
    setLinks(Object.keys(LikeManager.getLikedImages()));

  }, []);

  return (
    <>
      <h1> Favorites </h1> <br/>
      <ImageList images={links} desiredLength={links.length}/>
    </>
  )
}