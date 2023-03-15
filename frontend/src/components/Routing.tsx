import { Routes, Route } from 'react-router-dom';

import { RandomDogImage } from '../routes/RandomDogImage';
import QueryBreedSection from '../routes/QueryBreedSection';
import Error404 from '../routes/404';
import Home from '../routes/Home';
import FavoriteImages from '../routes/Favorites';


export const Routing = () => {
  return (
    <Routes>
      {/* NS_BINDING_ABORTED error occurs for every image 
      received in first fetch after every page (re)load
      The same images then load successfully immediately afterward.
      NOTE: Error seems to only be occurring on Firefox */}
      <Route path="/" element={<Home />} />
        <Route path="/get-breed" element={<QueryBreedSection />} />
        <Route path="/get-random" element={<RandomDogImage />} />
        <Route path="/favorites" element={<FavoriteImages />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  )
}

export default Routing;