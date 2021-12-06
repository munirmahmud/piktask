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

export const imageObjSchema = (schemaObjData) => {
  const script = document.createElement("script");
  script.dataset.test = "image-object";
  script.type = "application/ld+json";

  const schemaObj = {
    ...schemaObjData,
    "@context": "http://schema.org",
    "@type": "ImageObject",
    datePublished: schemaObjData.datePublished ? schemaObjData.datePublished : "05/12/2021",
    fileFormat: schemaObjData.fileFormat ? schemaObjData.fileFormat : "image/jpeg",
    license: "https://piktask.com/license-agreement",
  };

  script.innerHTML = JSON.stringify(schemaObj);
  // const body = document.querySelector("body");
  const body = (document.querySelector('script[data-test="image-object"]').innerHTML = script);
  console.log("body", body);
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
