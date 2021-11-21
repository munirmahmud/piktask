import React, { useEffect } from "react";

const Layout = (props) => {
  const {
    title,
    description = "",
    keywords = "",
    author = "",
    children,
    canonical,
    ogType,
    ogUrl,
    ogImage,
    ...others
  } = props;

  useEffect(() => {
    window.scrollTo(0, 0);

    // Before passing any props for the Layout component please check the relavant meta tags are available in the index.html file that is located in the public folder.
    title && (document.title = `${title} | Piktask`);
    author && (document.querySelector('meta[name="author"]').content = author);
    description &&
      (document.querySelector('meta[name="description"]').content =
        description);
    keywords &&
      (document.querySelector('meta[name="keywords"]').content = keywords);

    canonical &&
      (document.querySelector('link[rel="canonical"]').href = canonical);

    title &&
      (document.querySelector('meta[property="og:title"]').content = title);

    description &&
      (document.querySelector('meta[property="og:description"]').content =
        description);

    title &&
      (document.querySelector('meta[name="twitter:title"]').content = title);

    ogUrl &&
      (document.querySelector('meta[property="og:url"]').content = ogUrl);

    ogImage &&
      (document.querySelector('meta[property="og:image"]').content = ogImage);

    title &&
      (document.querySelector('meta[property="og:image:alt"]').content = title);

    ogImage &&
      (document.querySelector('meta[name="twitter:image:src"]').content =
        ogImage);

    ogUrl &&
      (document.querySelector('meta[name="twitter:url"]').content = ogUrl);

    description &&
      (document.querySelector('meta[name="twitter:description"]').content =
        description);
  }, [title, description, keywords, author, canonical, ogUrl, ogType, ogImage]);

  return <main {...others}>{children}</main>;
};

export default Layout;
