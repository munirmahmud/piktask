export const getYear = (date) => {
  return date;
};

export const dateFormat = (time) => {
  // switch(time) {
  //     case time!:
  //     break;
  //     default:
  // }

  return time;
};

export const imageObjSchema = (schemaData) => {
  const schemaObj = {
    ...schemaData,
    "@context": "http://schema.org",
    "@type": "ImageObject",
    datePublished: schemaData.datePublished ? schemaData.datePublished : "05/12/2021",
    fileFormat: schemaData.fileFormat ? schemaData.fileFormat : "image/jpeg",
    license: "https://piktask.com/license-agreement",
  };

  document.querySelector('script[data-test="image-object"]').append(JSON.stringify(schemaObj));
};

export const expiredLoginTime = () => {
  localStorage.removeItem("token");
  return (window.location.href = "/login");
};

export const getBaseURL = () => {
  const clientURL = localStorage.getItem("imageBaseURL");

  if (clientURL) {
    const client = JSON.parse(clientURL);
    return {
      bucket_base_url: client.bucket_base_url,
      profiles: client.profiles,
      images: client.images,
      categories: client.categories,
      blog_images: client.blog_images,
    };
  }
};

export const getWords = (amount, str) => {
  const strArray = str.split(" ");
  const newDescription = strArray.splice(0, amount).join(" ");

  return newDescription;
};
