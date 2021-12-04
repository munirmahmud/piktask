import { Container } from "@material-ui/core";
import { lazy, Suspense, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductDetails from "../../components/Partials/ProductDetails";
import Spacing from "../../components/Spacing";
import Header from "../../components/ui/Header";
import SectionHeading from "../../components/ui/Heading";
import Loader from "../../components/ui/Loader";
import RelatedImage from "../../components/ui/RelatedImage";
import TagButtons from "../../components/ui/TagButtons";
import Layout from "../../Layout";
import useStyles from "./SingleProductDetails.styles";

const Footer = lazy(() => import("../../components/ui/Footer"));
const HeroSection = lazy(() => import("../../components/ui/Hero"));

const SingleProductDetails = () => {
  const classes = useStyles();
  const location = useLocation();
  const shareUrl = window.location.href;
  const imageID = location.pathname.split("=").pop();

  const [productTitle, setProductTitle] = useState("");
  const [allTags, setAllTags] = useState([]);
  const [thumbnail, setThumbnail] = useState("");

  return (
    <Layout title={`${productTitle}`} canonical={document.URL} ogUrl={document.URL} ogImage={thumbnail}>
      <Header />

      <Suspense fallback={<Loader />}>
        <HeroSection size="medium" heroTitle title="Graphic Resources for Free Download" />
      </Suspense>

      <Suspense fallback={<Loader />}>
        <Container className={classes.containerWrapper}>
          <ProductDetails
            location={location}
            setAllTags={setAllTags}
            imageID={imageID}
            shareUrl={shareUrl}
            setProductTitle={setProductTitle}
            setThumbnail={setThumbnail}
          />

          <Spacing space={{ height: "2.5rem" }}></Spacing>

          <SectionHeading title="Related Products" subtitle="Top website templates with the highest sales volume." size="large" />

          <RelatedImage imageID={imageID} />

          <TagButtons allTags={allTags} />
        </Container>
      </Suspense>

      <Suspense fallback={<Loader />}>
        <Footer />
      </Suspense>
    </Layout>
  );
};

export default SingleProductDetails;
