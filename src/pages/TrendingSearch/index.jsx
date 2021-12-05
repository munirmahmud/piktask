import React from "react";
import thumbnail from "../../assets/banner/hero-banner.jpg";
import CallToAction from "../../components/ui/CallToAction";
import Footer from "../../components/ui/Footer";
import Header from "../../components/ui/Header";
import HeroSection from "../../components/ui/Hero";
import PopularKeyWords from "../../components/ui/PopularKeyWords";
import Layout from "../../Layout";

const TrendingSearch = () => {
  return (
    <Layout
      title="Trending Search result"
      description="Piktask provides millions of stock photos, creatives, backgrounds and illustrations for free to fullfil your graphic design needs."
      canonical={document.URL}
      ogUrl={document.URL}
      ogImage={thumbnail}
    >
      <Header />
      <HeroSection size="large" creativeWorksDone title="Graphic Resource for Free Download" />
      <PopularKeyWords />
      <CallToAction title="Join Piktask team" subtitle="Upload your first copyrighted design. Get $5 designer coupon packs" buttonText="Join Us" uppercase />
      <Footer />
    </Layout>
  );
};

export default TrendingSearch;
