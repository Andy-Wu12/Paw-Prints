import { useCallback } from 'react';

import { httpGetRandomImage } from './requests';

function useRandomDog() {
  const getDog = useCallback(async () => {
    const imageLink: string = await httpGetRandomImage();
    return imageLink;
  }, []);

  return {
    getDog,
  };
}

export default useRandomDog;