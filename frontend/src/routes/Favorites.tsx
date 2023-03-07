import { ImageList } from "../components/ImageList"

export default function FavoriteImages() {
  return (
    <>
      <h1> Favorites </h1> <br/>
      <ImageList images={[]} desiredLength={0}/>
    </>
  )
}