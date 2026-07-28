"use client";

import { useState, useEffect } from "react";
import CategoryClient from "../components/Categories/categoryClient";
import { getAllCategories, getAllCollections, getParentChildCategories } from "../lib/api";
import CollectionClient from "../components/Collections/collectionClient";
import Hero from "../components/home/Hero/Hero";
import FeaturedCollections from "../components/home/FeaturedCollections/FeaturedCollections";
import CategorySection from "../components/home/Categories/CategorySection";
import LuxuryBanner from "../components/home/LuxuryBanner/LuxuryBanner";
import SignatureProducts from "../components/home/SignatureProducts/SignatureProducts";
import WhyChooseLumina from "../components/home/WhyChooseLumina/WhyChooseLumina";
import CustomerTestimonials from "../components/home/CustomerTestimonials/CustomerTestimonials";
import InstagramGallery from "../components/home/Instagram/Instagram";
import Newsletter from "../components/home/Newsletter/Newsletter";
export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [homeCollections, setHomeCollections] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop",
      title: "Discover Timeless Elegance",
      subtitle: "Handcrafted diamond jewelry that tells your unique story",
    },
    {
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070&auto=format&fit=crop",
      title: "Exquisite Diamond Rings",
      subtitle: "Celebrate life's precious moments with stunning designs",
    },
    {
      image:
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop",
      title: "Luxury Wedding Collection",
      subtitle: "Make your special day unforgettable with our exclusive pieces",
    },
  ];

  useEffect(()=> {
    async function fetchData() {
      const { parentCategories } = await getParentChildCategories();
      
      setCategories(parentCategories);
      console.log(categories)
    }

  fetchData();

  },[])

  useEffect(() => {
  
  const timer = setInterval(() => {
    setCurrentSlide(
      (prev) => (prev + 1) % slides.length
    );
  }, 3000);

  return () => clearInterval(timer);

}, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <>
    <Hero />
    <FeaturedCollections />
    <CategorySection />
    <LuxuryBanner />
    <SignatureProducts />
    <WhyChooseLumina />
    <CustomerTestimonials />
    <InstagramGallery />
    <Newsletter />
    </>
  );
}