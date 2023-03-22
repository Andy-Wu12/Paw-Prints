import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Home() {
  return (
    <>
      <h1>View Some Dogs</h1>
      <p> 
        This website uses <Link href="https://dog.ceo/dog-api/" target="_blank" rel='noopener noreferrer'>Dog API</Link>,
        a free REST API that provides access to a large collection of open source dog pictures.
      </p>
      <GitHubIcon /> <Link href="https://github.com/Andy-Wu12/View-Some-Dogs">View on GitHub</Link>
      <h2> Open the menu in the top left to get started. </h2>
      
    </>
  );
}