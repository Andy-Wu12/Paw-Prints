import Button from '@mui/material/Button';

interface LightModeButtonProps {
  isLight: boolean,
  setIsLight: React.Dispatch<React.SetStateAction<boolean>>
}

function LightModeButton({isLight, setIsLight}: LightModeButtonProps): React.ReactElement {
  function handleClick(e: any) {
    setIsLight(!isLight);
  }

  return (
    <Button variant="contained" onClick={handleClick}> {isLight ? "Dark Mode" : "Light Mode"} </Button>
  )
}

export default LightModeButton;