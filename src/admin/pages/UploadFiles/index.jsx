import {
  faCloudUploadAlt,
  faExclamationTriangle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextareaAutosize, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Spacing from "../../../components/Spacing";
import Footer from "../../../components/ui/Footer";
import Layout from "../../../Layout";
import AdminHeader from "../../components/Header";
import Heading from "../../components/Heading";
import Sidebar from "../../components/Sidebar";
import useStyles from "./UploadFiles.styles";

const ItemForSale = [
  { value: "free", label: "Free" },
  { value: "sale", label: "Premium" },
];

const usePhoto = [
  { value: "free", label: "Free for commercial use" },
  { value: "free_personal", label: "Free for personal use" },
  { value: "editorial_only", label: "Editorial use only" },
  { value: "web_only", label: "Use only on website" },
];

const typeOfImageItem = [
  { label: "Image (JPG, PNG, GIF)" },
  { label: "Image and Vector graphic (AI, EPS, PSD,SVG)" },
];

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

const UploadFiles = () => {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const classes = useStyles();
  const categoryRef = useRef();
  // const iconClass = customStyles();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(1);
  const [item_for_sale, setItem_for_sale] = useState("free");
  const [price, setPrice] = useState("0");
  const [image, setImage] = useState("");
  const [additional_image, setAdditional_image] = useState("");
  const [usages, setUsages] = useState("free");
  const [typeOfImage, setTypeOfImage] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [itemForSaleError, setItemForSaleError] = useState(false);
  const [imageError, setImageError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [categoryItems, setcategoryItems] = useState([]);

  //item for sale
  const [itemSale, setItemSale] = useState(false);

  //Type of Image
  const [imageType, setImageType] = useState(false);

  //for tag element
  const [tags, setTags] = useState([]);

  const [files, setFiles] = useState([]);
  const [thumbImage, setThumbImage] = useState("");
  const [thumbWidth, setThumbWidth] = useState("");
  const [thumbHeight, setThumbHeight] = useState("");
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [menuSate, setMenuSate] = useState({ mobileView: false });
  const [isImageDimensionOkay, setImageDimensionOkay] = useState(false);

  const { mobileView } = menuSate;
  // 200 x 200
  useEffect(
    () => () => {
      let image = new Image();
      image.onload = () => {
        if (image.width !== 850 || image.height !== 531) {
          setImageDimensionOkay(true);
        } else {
          setImageDimensionOkay(false);
        }
      };
      image.src = thumbImage.preview;

      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files, thumbImage]
  );

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setMenuSate((prevState) => ({ ...prevState, mobileView: true }))
        : setMenuSate((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setThumbImage(acceptedFiles[0]);

      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} alt="thumbnail" style={img} />
      </div>
    </div>
  ));

  const isActive = isDragActive && "2px dashed #26AA10";

  const addTags = (event) => {
    event.preventDefault();
    if (
      event.target.value !== " " &&
      tags.length < 10 &&
      event.target.value !== "  " &&
      event.target.value !== ","
    ) {
      setTags([...tags, event.target.value]);
      event.target.value = "";
    }
    if (tags.length > 9) {
      toast.error("Tag is full / No more tags");
    }
  };

  const removeTags = (indexToRemove) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };

  const handleUsagesChange = (event) => {
    setUsages(event.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const loadCategories = (e) => {
    if (categoryItems.length === 0) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/categories`)
        .then(({ data }) => {
          if (data?.status) {
            const sortedData = data?.categories.sort((a, b) => a.id - b.id);
            setcategoryItems(sortedData);
          }
        })
        .catch((error) => console.log("Categories loading error: ", error));
    }
  };

  const handleSaleChange = (e) => {
    setItem_for_sale(e.target.value);
    setItemSale(!itemSale);
    if (e.target.value === "sale") {
      setPrice("5");
    } else {
      setPrice("0");
    }
  };

  const handleTypeOfImage = (e) => {
    setTypeOfImage(e.target.value);
    setImageType(!imageType);
  };

  const handleFileChange = (e) => {
    const additionalFile = e.target.files[0];
    setAdditional_image(additionalFile);

    if (!additionalFile.name.match(/\.(psd|svg|eps|ai)$/)) {
      setImageError("Select valid file.");
      return false;
    } else {
      setImageError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTitleError(false);

    if (!user.token) {
      toast.error("You have no authorizatoin");
      return;
    }

    if (thumbs.length === 0) {
      setLoading(false);
      toast.error(
        "Please upload a thumbnail preview with the dimention of 850 x 531"
      );
      return;
    } else if (!title) {
      setLoading(false);
      toast.error("The Title field is required.");
      return;
    } else if (title.length < 3 || title.length > 200) {
      setLoading(false);
      toast.error("Title must be between 3 and 200 characters");
      return;
    } else if (tags.length === 0) {
      setLoading(false);
      toast.error("The tag field is required");
      return;
    } else if (category === "0") {
      toast.error("Please select your item category");
      setLoading(false);
      return;
    }

    // if (item_for_sale === ("free" || 'premium') ) {
    //   toast.error("Item for sale status must be Free or Sale");
    //   setLoading(false);
    //   return;
    // }
    // else if (price) {
    //   toast.error("Item for sale status must be Free or Sale");
    //   setLoading(false);
    //   return;
    // }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("tags", tags.toString());
    formData.append("category", category);
    formData.append("item_for_sale", item_for_sale);
    formData.append("price", price);
    formData.append("usages", usages);
    formData.append("description", description);
    formData.append("image", thumbImage);
    formData.append("additional_image", additional_image);

    const url = `${process.env.REACT_APP_API_URL}/images/upload`;
    axios({
      method: "post",
      url,
      data: formData,
      headers: {
        Authorization: user.token,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        if (res?.status === 200) {
          toast.success(res.data.message);
          setLoading(false);
          setTitle("");
          setDescription("");
          setImage("");
          setAdditional_image("");
          setTags([]);
          setCategory("");
          setPrice("");
          setUsages("");
          setItem_for_sale("");
        }
        if (res?.status === 401) {
          localStorage.removeItem("token");
          toast.success("Please login Again");
          history.replace("/login");
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("error", error.response);
        toast.error(error.response.data.errors.image);
        setLoading(false);
      });
  };

  return (
    <Layout>
      <AdminHeader />
      <div className={classes.adminRoot}>
        {mobileView ? null : <Sidebar className={classes.adminSidebar} />}

        <main className={classes.content}>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className={classes.uploadContainer}>
              <div className={classes.basicInfo}>
                <ul>
                  <li>
                    <FontAwesomeIcon
                      className={classes.basicInfoIcon}
                      icon={faExclamationTriangle}
                    />
                    Please read the terms and conditions to avoid sanctions
                  </li>
                  <li>
                    <FontAwesomeIcon
                      className={classes.basicInfoIcon}
                      icon={faInfoCircle}
                    />
                    You can upload 2 photos per day
                  </li>
                  <li>
                    <FontAwesomeIcon
                      className={classes.basicInfoIcon}
                      icon={faInfoCircle}
                    />
                    It is not allowed images of violence or pornographic content
                    of any kind
                  </li>
                  <li>
                    <FontAwesomeIcon
                      className={classes.basicInfoIcon}
                      icon={faInfoCircle}
                    />
                    Photos must be of Authoring
                  </li>
                </ul>
              </div>

              <Heading className={classes.headingTop} tag="h2">
                Upload Your Content
              </Heading>

              <label
                htmlFor="btn-upload"
                className={classes.fileUploadContainer}
                {...getRootProps({
                  onClick: (e) =>
                    (e.currentTarget.style.border = "2px dashed #26AA10"),
                })}
                style={{ border: isActive }}
              >
                <div className={classes.uploadIconWrapper}>
                  <input
                    {...getInputProps({
                      multiple: false,
                    })}
                  />
                  <FontAwesomeIcon icon={faCloudUploadAlt} />

                  <h2 className={classes.imageErrorText}>{imageError}</h2>

                  <Typography
                    className={classes.photoUploadText}
                    variant="body1"
                  >
                    Drag and drop or click to upload an photo
                  </Typography>

                  {isImageDimensionOkay ? (
                    <Typography
                      className={classes.subtitle}
                      variant="body1"
                      style={{ color: "red" }}
                    >
                      Your image dimension exceeds the limit. It should be
                      850x531
                    </Typography>
                  ) : (
                    <Typography className={classes.subtitle} variant="body1">
                      The photo must be equal to: 850x531
                    </Typography>
                  )}
                </div>
              </label>

              {!isImageDimensionOkay && thumbs}

              <Heading className={classes.formHeadText} tag="h2">
                What type of content are you going to upload?
              </Heading>

              <Spacing space={{ height: "2.5rem" }} />

              <div className={classes.uploadForm}>
                {/* <h4 className={classes.titleText}>Title</h4> */}
                <TextField
                  InputLabelProps={{ shrink: true }}
                  className={classes.inputField}
                  placeholder="Title"
                  label="Title"
                  variant="outlined"
                  fullWidth
                  error={titleError}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <h4 className={classes.titleText}>Tag</h4>
                <div className={classes.tagsInput}>
                  <ul className={classes.tags}>
                    {tags.map((tag, index) => (
                      <li key={index} className={classes.tag}>
                        <span className={classes.tagTitle}>{tag}</span>
                        <span
                          className={classes.tagCloseIcon}
                          onClick={() => removeTags(index)}
                        >
                          x
                        </span>
                      </li>
                    ))}
                  </ul>
                  <input
                    className={classes.input}
                    type="text"
                    onKeyUp={(event) =>
                      event.code === "Space" || event.key === ","
                        ? addTags(event)
                        : null
                    }
                    placeholder="Add Tag"
                  />
                </div>
                <p className={classes.helperText}>
                  * Press Space or comma to add tag (Maximum 10 tags)
                </p>

                <div onClick={loadCategories}>
                  <h4 className={classes.titleText}>Category</h4>
                  <TextField
                    id="standard-select-currency-native"
                    className={classes.categoryInput}
                    variant="outlined"
                    select
                    value={category}
                    onChange={handleCategoryChange}
                    SelectProps={{
                      native: true,
                    }}
                  >
                    {categoryItems.length ? (
                      categoryItems?.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))
                    ) : (
                      <option>Uncategorized</option>
                    )}
                  </TextField>
                </div>

                <div>
                  <h4 className={classes.titleText}>Item for sale?</h4>
                  <TextField
                    id="standard-select-currency-native"
                    className={classes.itemSaleInput}
                    variant="outlined"
                    select
                    value={item_for_sale}
                    onChange={handleSaleChange}
                    SelectProps={{
                      native: true,
                    }}
                  >
                    {ItemForSale.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </div>

                <div>
                  <h4 className={classes.titleText}>
                    How they can use this photo
                  </h4>
                  <TextField
                    id="standard-select-currency-native"
                    className={classes.usagesInput}
                    select
                    label=""
                    variant="outlined"
                    value={usages}
                    onChange={handleUsagesChange}
                    SelectProps={{
                      native: true,
                    }}
                  >
                    {usePhoto.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </div>

                <h4 className={classes.titleText}>Type of Image?</h4>
                <TextField
                  id="standard-select-currency-native"
                  className={classes.typeOfImageInput}
                  select
                  label=""
                  variant="outlined"
                  value={typeOfImage}
                  onChange={handleTypeOfImage}
                  SelectProps={{
                    native: true,
                  }}
                >
                  {typeOfImageItem.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>

                {imageType && (
                  <div className={classes.imageFileUploadBox}>
                    <div className={classes.uploadIconImage}>
                      <input
                        id="additionalImageUpload"
                        name="additionalImageUpload"
                        // style={{ display: "none" }}
                        type="file"
                        files={additional_image}
                        onChange={handleFileChange}
                      />
                      <label htmlFor="additionalImageUpload">
                        <FontAwesomeIcon icon={faCloudUploadAlt} />
                      </label>
                      <p className={classes.selectFileText}>
                        Select a file (AI,EPS,PSD,SVG)
                      </p>
                    </div>
                  </div>
                )}

                <h4 className={classes.titleText}>Description (Optional)</h4>
                <TextareaAutosize
                  className={classes.description}
                  aria-label="minimum height"
                  minRows={5}
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div className={classes.singleBorder}></div>
                <button
                  variant="contained"
                  className={classes.uploadBtn}
                  type="submit"
                  disabled={isLoading}
                >
                  <FontAwesomeIcon
                    icon={faCloudUploadAlt}
                    className={classes.uploadIcon}
                  />
                  Upload
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>
      <Footer addminFooter />
    </Layout>
  );
};

export default UploadFiles;
