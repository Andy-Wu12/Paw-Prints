import { ClickableImage, ClickableImageProps } from "./ClickableImage"
import FavoriteButton, { FavoriteButtonProps } from "./FavoriteButton"

export interface LikableImageProps {
  imageProps: ClickableImageProps,
  buttonProps: FavoriteButtonProps,
  className?: string
}

export default function LikableImage(props: LikableImageProps): React.ReactElement {

  return (
    <div className={props.className}>
      <ClickableImage {...props.imageProps} />
      <FavoriteButton {...props.buttonProps} />
    </div>
  )
}
