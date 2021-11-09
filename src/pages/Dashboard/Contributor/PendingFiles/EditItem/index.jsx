import { Button, Chip, TextField } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getBaseURL } from "../../../../../helpers";
import useStyles from "./EditItem.styles";

const EditItem = (props) => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const {
    products,
    setOpenModal,
    setSelectedProducts,
    setAddProductDetails,
    pendingProducts,
    setSuccessProduct,
  } = props;

  const [categoryName, setCategoryName] = useState("");
  const [tagsValue, setTagsValue] = useState([]);
  const [category, setCategory] = useState([]);
  const [title, setTitle] = useState("");

  const handleCategoryItem = () => {
    if (user?.isLoggedIn && user?.role === "contributor") {
      axios
        .get(`${process.env.REACT_APP_API_URL}/categories?limit=50`)
        .then(({ data }) => {
          if (data?.status) {
            const sortedData = data?.categories.sort((a, b) => a.id - b.id);
            setCategory(sortedData);
          }
        })
        .catch((error) => console.log("Categories loading error: ", error));
    }
  };

  const keyWords = [
    // { title: "Business Card" },
  ];

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const action = e.currentTarget.value;

    const images = [];
    products.forEach((element) => {
      images.push(element.token_id);
    });

    if (!categoryName) {
      toast.error("Please select a category");
      return;
    } else if (!title) {
      toast.error("The Title field is required.");
      return;
    } else if (title.length < 3 || title.length > 200) {
      toast.error("Title must be between 3 and 200 characters");
      return;
    } else if (tagsValue.length === 0) {
      toast.error("The tag field is required");
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
          // setSuccessProduct(pendingProducts)
          toast.success(
            response.data.message || "Product updated successfully",
            { autoClose: 2200 }
          );
        }
      } catch (error) {
        if (error.response?.data?.errors) {
          Object.entries(error.response.data.errors).forEach(([key, value]) => {
            console.log(`${key} ${value}`);
            toast.error(value, { autoClose: 500 });
          });
        } else if (error.response?.data?.message) {
          toast.error(error.response.data.message, { autoClose: 500 });
        }
      }
    }
    setSelectedProducts([]);
    setOpenModal(false);
  };

  const getTags = () => {
    // tagsValue.length > 0 ? (
    //   <>
    //   return tagsValue.map((tag, index) => {
    //     return <li key={index}>{tag}</li>;
    //   });
    //   </>
    // ) : (
    //   null
    // )
  };

  return (
    <div className={classes.editItemWrapper}>
      <form
        onSubmit={handleProductSubmit}
        className={classes.formRoot}
        noValidate
        autoComplete="off"
      >
        <div className={classes.imgWrapper}>
          {products?.length > 0 &&
            products?.map((product) => (
              <div key={product?.id} className={classes.productItem}>
                <img
                  className={classes.editItemImage}
                  src={
                    getBaseURL().bucket_base_url +
                    getBaseURL().images +
                    product?.original_file
                  }
                  alt={product?.original_name}
                />
              </div>
            ))}
        </div>

        <div className={classes.fieldGroup}>
          <label htmlFor="category">Select Category</label>
          <select
            id="category"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            onClick={handleCategoryItem}
          >
            {category.length > 0 ? (
              category.map((categoryItem) => (
                <option key={categoryItem.id} value={categoryItem.id}>
                  {categoryItem?.name}
                </option>
              ))
            ) : (
              <option aria-label="None" value="">
                Select Category
              </option>
            )}
          </select>
        </div>

        <div className={classes.fieldGroup}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className={`${classes.fieldGroup}`}>
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
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="filled"
                placeholder="Card Design"
              />
            )}
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
        </div>

        {/* {getTags()} */}

        <hr className={classes.seperator} />

        <div className={classes.buttonsWrapper}>
          <Button
            onClick={handleProductSubmit}
            value="submit"
            type="submit"
            className={`${classes.actionBtn} ${classes.submitBtn}`}
          >
            Submit
          </Button>
          <Button
            onClick={handleProductSubmit}
            value="save"
            className={`${classes.actionBtn} ${classes.saveBtn}`}
          >
            Save
          </Button>
          <Button
            className={`${classes.actionBtn} ${classes.cancelBtn}`}
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditItem;
