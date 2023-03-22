import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

interface SPARedirectButtonProps {
  text: string,
  location: string,
  linkClassName?: string,
  onClick?: () => void,
  color?: "secondary" | "inherit" | "primary" | "success" | "error" | "info" | "warning" | undefined,
  variant?: "text" | "contained" | "outlined" | undefined
}

function SPARedirectButton({text, location, linkClassName, color, variant}: SPARedirectButtonProps) {
  return (
    <Link className={linkClassName} to={location} style={{}}>
      <Button variant={variant} color={color}>
        {text}
      </Button>
    </Link>
  )
}

export default SPARedirectButton;