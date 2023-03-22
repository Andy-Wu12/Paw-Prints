
async function httpGetRandomImage(): Promise<string> {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/dog/get-random`);
    const data = await response.json();

    if(data.status === "success") {
      return data.message;
    } else {
      return '';
    }
};

export {
  httpGetRandomImage
}