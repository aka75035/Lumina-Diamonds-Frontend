import './App.css';


import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import HomePage from './app/homepage';
import JewelleryPage from './app/Jewellery/page';
import ProductPage from './app/Jewellery/[id]/page';
import CollectionPage from './app/collections/page';
import Cart from './app/cart/page';
import CollectionSlug from './app/collections/[slug]/page';
import CategoryPage from './app/Jewellery/category/page';
// import CategorySlug from './app/Jewellery/category/[slug]/page';


import {BrowserRouter, Routes, Route,} from 'react-router-dom';
import { fetchAllProductsCategoryCollectionsMetalRates } from './lib/api';
import Account from './app/Account/page';



function App() {

  return (
    <BrowserRouter>

      {/* Common Navbar */}
      <Navbar />

      {/* Routes */}
      <Routes>
        
        <Route path="/" element={<HomePage />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Collections" element={<CollectionPage />} />
        <Route path="/Collections/:slug" element={<CollectionSlug />} />
        <Route path="/Jewellery" element={<JewelleryPage />} />
        <Route path="/Jewellery/:id" element={<ProductPage />} />
        <Route path="/Jewellery/category" element={<CategoryPage />} />
        {/* <Route path="/Jewellery/category/:slug" element={<CategorySlug />} /> */}
        <Route path="/Account" element={<Account />} />
      </Routes>

      {/* Common Footer */}
      <Footer />

    </BrowserRouter>
  );
}

export default App;