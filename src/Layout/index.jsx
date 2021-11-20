import React, { useEffect } from "react";

const Layout = (props) => {
  const {
    title,
    description = "",
    keywords = "",
    author = "",
    children,
    canonical,
    ogTitle,
    ogDescription,
    ogType,
    ogUrl,
    ogImage,
    ogImageAlt,
    ...others
  } = props;

  useEffect(() => {
    window.scrollTo(0, 0);

    // Before passing any props for the Layout component please check the relavant meta tags are available in the index.html file that is located in the public folder.
    title && (document.title = title);
    author && (document.querySelector('meta[name="author"]').content = author);
    description &&
      (document.querySelector('meta[name="description"]').content =
        description);
    keywords &&
      (document.querySelector('meta[name="keywords"]').content = keywords);

    canonical &&
      (document.querySelector('link[rel="canonical"]').href = canonical);

    ogTitle &&
      (document.querySelector('meta[property="og:title"]').content = ogTitle);
    ogTitle &&
      (document.querySelector('meta[property="og:description"]').content =
        ogTitle);
    ogTitle &&
      (document.querySelector('meta[name="twitter:title"]').content = ogTitle);

    ogUrl && (document.querySelector('meta[name="og:url"]').content = ogUrl);

    ogImage &&
      (document.querySelector('meta[name="og:image"]').content = ogImage);

    ogImageAlt &&
      (document.querySelector('meta[name="og:image:alt"]').content =
        ogImageAlt);

    ogImage &&
      (document.querySelector('meta[name="twitter:image:src"]').content =
        ogImage);

    ogImage &&
      (document.querySelector('meta[name="twitter:url"]').content = ogImage);

    ogImage &&
      (document.querySelector('meta[name="twitter:description"]').content =
        ogImage);
  }, [
    title,
    description,
    keywords,
    author,
    canonical,
    ogTitle,
    ogDescription,
    ogUrl,
    ogType,
    ogImage,
    ogImageAlt,
  ]);

  return <main {...others}>{children}</main>;
};

export default Layout;
