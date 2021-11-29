import { Button } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import CloseIcon from "@material-ui/icons/Close";
// import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getBaseURL } from "../../../../../helpers";
import useStyles from "./EditItem.styles";

const EditItem = (props) => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const { products, setOpenModal, setSelectedProducts, setAddProductDetails, pendingProducts, setSuccessProduct } = props;

  const [categoryName, setCategoryName] = useState("");
  const [tagsValue, setTagsValue] = useState([]);
  const [category, setCategory] = useState([]);
  const [title, setTitle] = useState("");

  const [tag, setTag] = useState([]);
  // const [keywords, setKeywords] = useState([]);
  const keyWordRef = useRef(null);

  useEffect(() => {
    if (user?.isLoggedIn && user?.role === "contributor") {
      axios
        .get(`${process.env.REACT_APP_API_URL}/categories?limit=50`)
        .then(({ data }) => {
          if (data?.status) {
            const sortedData = data?.categories.sort((a, b) => a.id - b.id);
            // setCategory(sortedData);
            setCategory((prevState) => [{ id: "0", name: "Select Category" }, ...sortedData]);
          }
        })
        .catch((error) => console.log("Categories loading error: ", error));
    }
  }, [user]);

  // const keyWords = [
  //   // { title: "Business Card" },
  // ];

  const images = [];
  products.forEach((element) => {
    images.push(element.token_id);
  });

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const action = e.currentTarget.value;

    if (!categoryName) {
      toast.error("Please select a category", { autoClose: 2200 });
      return;
    } else if (!title) {
      toast.error("The Title field is required.", { autoClose: 2200 });
      return;
    } else if (title.length < 3 || title.length > 200) {
      toast.error("Title must be between 3 and 200 characters", {
        autoClose: 2200,
      });
      return;
    } else if (tagsValue.length === 0) {
      toast.error("The tag field is required", { autoClose: 2200 });
      return;
    }

    // API integration for set product details
    if (user?.isLoggedIn && user?.role === "contributor") {
      const url = `${process.env.REACT_APP_API_URL}/images?action=${action}`;
      try {
        const response = await axios({
          method: "put",
          url,
          headers: {
            Authorization: user?.token,
            "Content-Type": "application/json",
          },
          data: {
            images,
            title,
            categories_id: categoryName,
            tags: tagsValue,
          },
        });
        if (response.data?.status) {
          setCategoryName("");
          setTitle("");
          setTagsValue([]);
          setAddProductDetails(pendingProducts);
          products.forEach((element) => {
            if (element.isSelected === true) {
              setSuccessProduct((element.isSelected = false));
            }
          });
          toast.success(response.data.message || "Product update successfully");
        }
      } catch (error) {
        if (error.response?.data?.errors) {
          Object.entries(error.response.data.errors).forEach(([key, value]) => {
            console.log(`${key} ${value}`);
            toast.error(value);
          });
        } else if (error.response?.data?.message) {
          toast.error(error.response.data.message);
        }
      }
    }
    setSelectedProducts([]);
    setOpenModal(false);
  };

  const handleDeleteItem = (id) => {
    setSelectedProducts(products.filter((item) => item.token_id !== id));
    return;
  };

  const removeKeyword = (keyword, index, e) => {
    tagsValue.splice(index, 1);
    setTagsValue([...tagsValue]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setTagsValue((prevState) => {
        const isInArray = prevState?.find((item) => e.target.value.includes(item));
        if (isInArray) {
          toast.error("Tag already exist");
          return [...prevState];
        } else {
          return [...tag.split(","), ...prevState];
        }
      });
      setTag("");
    }
  };

  // const handleKeywords = (e) => {
  //   // console.log(keyWordRef.current.which);
  //   setTag(e.target.value);
  // };

  // keyWordRef?.current?.addEventListener("keyup", (e) => {
  //   if (e.key === "Enter" || e.key === 13) {
  //     console.log(e.target.value);
  //     setKeywords((prevTag) => [e.target.value, ...prevTag]);
  //     setTag("");
  //   }
  // });

  const getTags = () => {
    return (
      <div className={classes.tags}>
        {tagsValue?.length > 0 &&
          tagsValue?.map((tag, index) => (
            <li key={index} className="keyword">
              {tag}
              <ClearIcon onClick={(e) => removeKeyword(tag, index, e)} />
            </li>
          ))}
      </div>
    );
  };

  return (
    <div className={classes.editItemWrapper}>
      <div className={classes.formRoot}>
        <div className={classes.imgWrapper}>
          {products?.length > 0 &&
            products?.map((product) => (
              <div key={product?.id} className={classes.productItem}>
                <img
                  className={classes.editItemImage}
                  src={getBaseURL().bucket_base_url + getBaseURL().images + product?.original_file}
                  alt={product?.original_name}
                />
                <div className={classes.closeIcon}>
                  <CloseIcon onClick={() => handleDeleteItem(product?.token_id)} />
                </div>
              </div>
            ))}
        </div>

        <div className={classes.fieldGroup}>
          <label htmlFor="category">Select Category</label>
          <select id="category" value={categoryName} onChange={(e) => setCategoryName(e.target.value)}>
            {category?.length > 0 &&
              category?.map((categoryItem) => (
                <option key={categoryItem.id} value={categoryItem.id}>
                  {categoryItem?.name}
                </option>
              ))}
          </select>
        </div>

        <div className={classes.fieldGroup}>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className={`${classes.fieldGroup}`}>
          <label htmlFor="tag">Keyword</label>
          <input type="text" id="tag" ref={keyWordRef} value={tag} onChange={(e) => setTag(e.target.value)} onKeyPress={handleKeyPress} />
        </div>

        {/* <div className={`${classes.fieldGroup}`}>
          <label htmlFor="keyword">Keyword</label>
          <Autocomplete
            value={tagsValue}
            onChange={(event, newValue) => {
              setTagsValue(newValue);
            }}
            multiple
            id="keyword"
            options={keyWords.map((option) => option.title)}
            // defaultValue={[keyWords[13].title]}
            fullWidth
            freeSolo
            renderTags={(value, getTagProps) => value.map((option, index) => <Chip variant="outlined" label={option} {...getTagProps({ index })} />)}
            renderInput={(params) => <TextField {...params} variant="filled" placeholder="Card Design" />}
            closeIcon={<ClearIcon />}
            classes={{
              inputRoot: classes.inputRoot,
              inputFocused: classes.inputFocused,
              tag: classes.tag,
              clearIndicator: classes.clearIndicator,
              input: classes.input,
              focused: classes.focused,
            }}
          />
        </div> */}

        {getTags()}

        <hr className={classes.seperator} />

        <div className={classes.buttonsWrapper}>
          <Button onClick={handleProductSubmit} value="submit" type="submit" className={`${classes.actionBtn} ${classes.submitBtn}`}>
            Submit
          </Button>
          <Button onClick={handleProductSubmit} value="save" className={`${classes.actionBtn} ${classes.saveBtn}`}>
            Save
          </Button>
          <Button className={`${classes.actionBtn} ${classes.cancelBtn}`} onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditItem;

// const Input = ({ setKeywords }) => {
//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       console.log("do validate");
//       setKeywords((prev) => {
//         console.log("prev", prev);

//         return [e.target.value, ...prev];
//       });
//     }
//   };

//   return <input type="text" onKeyDown={handleKeyDown} />;
// };
