import { useCallback, useState, useEffect } from "react";

import { httpGetBreedNames, httpGetRandomImagesByBreed } from "./requests";

function useDogQuery() {
  const [breeds, setBreeds] = useState<any>({});
  const [isPendingData, setPendingData] = useState(false);

  // Config number of images to pull from API
  const minImages = 1;
  const maxImages = 50;

  const getBreeds = useCallback(async () => {
    const breedNames = await httpGetBreedNames();
    setBreeds(breedNames);
  }, []);

  const getDogs = useCallback(async (e: React.SyntheticEvent): Promise<string[]> => {
    e.preventDefault();
    setPendingData(true);
    const data = new FormData(e.target as HTMLFormElement);
    let imageCount: number = parseInt(data.get('imageCount') as string);
    const breedName: string = (data.get('breeds') as string).trim().toLowerCase();

    if(isNaN(imageCount) || imageCount < 0) {
      imageCount = 1;
    }
    else if(imageCount > maxImages) {
      imageCount = 50;
    }

    if(!breedName) {
      throw new Error('Breed name not selected');
    }

    const links = await httpGetRandomImagesByBreed(imageCount, breedName);
    setPendingData(false);
    return links;

  }, []);

  useEffect(() => {
    getBreeds();
  }, [getBreeds]);

  return {
    breeds,
    getDogs,
    isPendingData,
    minImages,
    maxImages
  };
}

export default useDogQuery;