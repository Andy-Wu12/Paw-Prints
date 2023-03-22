import { Button } from '@mui/material';

export interface ActionButtonProps {
  onClick: () => void,
  text?: string,
  isDisabled?: boolean,
  className?: string,
  type?: "button" | "submit" | "reset" | undefined,
  variant?: "text" | "contained" | "outlined" | undefined
}

export default function ActionButton({
  onClick, 
  text = undefined,
  isDisabled = false,
  className = undefined,
  type = undefined,
  variant = undefined
}: ActionButtonProps): React.ReactElement {

  return (
    <>
      <Button className={className} onClick={onClick} type={type} variant={variant} disabled={isDisabled}>
        {text}
      </Button>
    </>
  )
}