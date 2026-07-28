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