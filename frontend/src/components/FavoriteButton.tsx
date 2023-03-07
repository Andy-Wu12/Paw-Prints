import { Button } from "@mui/material";
import { ActionButtonProps } from "./generic/ActionButton";

export interface FavoriteButtonProps extends ActionButtonProps {
  isLiked: boolean,
}

export default function FavoriteButton(props: FavoriteButtonProps): React.ReactElement {
  return (
    <>
      <Button onClick={() => { } } className="favorite-button">
        {props.text}
      </Button>
    </>
  )
}