async function httpGetRandomImage(): Promise<string> {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/dog/get-random`);
  const data = await response.json();

  if(data.status === "success") {
    return data.message;
  }

  return '';
};

async function httpGetBreedNames(): Promise<Object> {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/breeds`);
  const data = await response.json();

  if(data.status === "success") {
    return data.message;
  }

  return {};
}

async function httpGetRandomImagesByBreed(count: number, breed: string): Promise<string[]> {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/dog/${breed}/get-images/${count}`);
  const data = await response.json();

  if(data.status === "success") {
    return data.message as string[];
  }

  return [];
};


export {
  httpGetRandomImage,
  httpGetBreedNames,
  httpGetRandomImagesByBreed
}