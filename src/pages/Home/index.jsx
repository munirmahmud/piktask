import { Button, Container } from "@material-ui/core";
import { lazy, Suspense, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spacing from "../../components/Spacing";
import { CategoryCarousel } from "../../components/ui/Carousel";
import Header from "../../components/ui/Header";
import SectionHeading from "../../components/ui/Heading";
import HeroSection from "../../components/ui/Hero";
import Loader from "../../components/ui/Loader";
import Layout from "../../Layout";
import useStyles from "./Home.styles";

const Blog = lazy(() => import("../../components/ui/Blog"));
const Footer = lazy(() => import("../../components/ui/Footer"));
const Products = lazy(() => import("../../components/ui/Products"));
const CallToAction = lazy(() => import("../../components/ui/CallToAction"));

const Home = () => {
  const classes = useStyles();
  const categories = useSelector((state) => state.popularCategories);
  const [popularCats, setPopularCats] = useState([]);
  const [scrolling, setScrolling] = useState(0);
  let [index, setIndex] = useState(1);

  //onScroll data load function
  window.onscroll = () => {
    setScrolling(window.pageYOffset);
    let currentPosition = scrolling;

    if (
      categories.length &&
      currentPosition % 50 > 30 &&
      index < categories.length
    ) {
      const category = categories[index];
      setIndex((index) => index + 1);
      popularCats.push(category);
    }
  };

  return (
    <Layout
      title="Graphic Resources for Free Download | Piktask"
      description="Graphic Resources for Free Download"
    >
      <Header />
      {/* <Suspense fallback={<h1>Loading...</h1>}> */}
      <HeroSection
        size="large"
        popularKeywords
        heroButton
        title="Graphic Resources for Free Download"
      />
      {/* </Suspense> */}
      <Container>
        <Spacing space={{ height: "3rem" }} />
        <SectionHeading title="Popular Album Collection" large>
          <Button
            className={classes.headingButton}
            component={Link}
            to="/categories"
          >
            See More
          </Button>
        </SectionHeading>
      </Container>

      <Spacing space={{ height: "1.2rem" }} />

      {/* Carousel with Categories */}
      <CategoryCarousel />

      <Suspense fallback={<Loader />}>
        <Container>
          <Products category={categories[0]} showHeading count={8} />
        </Container>
      </Suspense>

      <Suspense fallback={<Loader />}>
        {popularCats?.length &&
          popularCats.map((category, index) => (
            <Container key={category?.id}>
              <Products
                key={category?.id}
                category={category}
                showHeading
                count={8}
              />
            </Container>
          ))}
      </Suspense>

      <Suspense fallback={<Loader />}>
        <CallToAction
          title="Daily 10 image/photos Download"
          subtitle="Top website templates with the highest sales volume."
          // buttonLink="/subscription"
          buttonText="Get Started"
        />
      </Suspense>

      <Spacing space={{ height: "2.5rem" }} />
      {/* <Container>
        <SectionHeading title="Top Selling Author" large>
        <Button
        className={classes.headingButton}
        component={Link}
            to="/sellers"
            >
            See More
            </Button>
            </SectionHeading>
            </Container>
            Top selling author 
          <TopSeller homeTopSeller /> */}
      {/* BLOG SECTION */}
      <Suspense fallback={<Loader />}>
        <Blog />
      </Suspense>

      <Suspense fallback={<Loader />}>
        <Footer />
      </Suspense>
    </Layout>
  );
};

export default Home;
