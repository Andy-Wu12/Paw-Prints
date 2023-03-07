import { ActionButtonProps } from "./generic/ActionButton";

export interface FavoriteButtonProps extends ActionButtonProps {
  isLiked: boolean,
}

export default function FavoriteButton(props: FavoriteButtonProps): React.ReactElement {
  return (
    <>
      <button onClick={() => { } } className="favorite-button">
        {props.text}
      </button>
    </>
  )
}