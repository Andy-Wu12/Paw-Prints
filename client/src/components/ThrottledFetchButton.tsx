import Button from '@mui/material/Button';

interface ThrottledFetchButtonProps {
  text: string,
  isDisabled: boolean,
  onClick?: () => void,
  type?: "button" | "submit" | "reset" | undefined,
  variant?: "text" | "contained" | "outlined" | undefined
}

function ThrottledFetchButton({text, isDisabled, onClick, type = undefined, variant = "contained"}: ThrottledFetchButtonProps): React.ReactElement {
  return (
    <Button type={type} variant={variant} onClick={onClick} disabled={isDisabled ? true : false}>
      {text}
    </Button>
  )
}

export default ThrottledFetchButton;