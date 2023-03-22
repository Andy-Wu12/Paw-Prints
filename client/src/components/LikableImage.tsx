import { useEffect, useState } from "react"

import { ClickableImage, ClickableImageProps } from "./ClickableImage"
import FavoriteButton from "./FavoriteButton"
import LikeManager from "../likeManager"


export interface LikableImageProps {
  imageProps: ClickableImageProps,
  className?: string
}

export default function LikableImage(props: LikableImageProps): React.ReactElement {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const url = props.imageProps.href;
    
    setIsLiked(LikeManager.imageIsLiked(url));
  }, [props.imageProps.href])

  const handleClick = () => {
    const url = props.imageProps.href;
    LikeManager.toggleLikedStatus(url);
    setIsLiked(LikeManager.imageIsLiked(url))
  }

  return (
    <div className={props.className}>
      <ClickableImage {...props.imageProps} />
      <FavoriteButton isLiked={isLiked} onClick={handleClick} 
        className={isLiked ? "favorite-button-filled" : "favorite-button-unfilled"}/>
    </div>
  )
}
