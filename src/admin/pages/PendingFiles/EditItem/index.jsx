import { Button, Chip, TextField } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getBaseURL } from "../../../../helpers";
import useStyles from "./EditItem.styles";

const EditItem = (props) => {
  const classes = useStyles();
  const { products, setOpenModal, setSelectedProducts, setProductName, setProductId } = props;
  const user = useSelector((state) => state.user);
  const [category, setCategory] = useState([]);

  const [categoryName, setCategoryName] = useState("");
  const [title, setTitle] = useState("");
  const [tagsValue, setTagsValue] = useState([]);
  // const [value, setValue] = useState([]);
  
  
  const handleCategoryChange = () => {
    axios
    .get(`${process.env.REACT_APP_API_URL}/categories?limit=50`)
    .then(({ data }) => {
      if (data?.status) {
        const sortedData = data?.categories.sort((a, b) => a.id - b.id);
        setCategory(sortedData);
      }
    })
    .catch((error) => console.log("Categories loading error: ", error));
  };
  
  // console.log("products", products);
  
  const keyWords = [
    // { title: "Business Card" },
  ];
  
  
  
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const images = [];
    const action = e.currentTarget.value
    
    products.forEach(element => {
      images.push(element.token_id)
    });

    // if(title)

    // TODO: After successful the form call this function
    if(user?.isLogged){
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
            categories_id:  categoryName,
            tags: tagsValue,
          }
        })
        if (response.data?.status) {
          setCategoryName("");
          setTitle("");
          setTagsValue([]);
          setProductName(title);
          setProductId(images);
          toast.success(response.data.message || "Product update successfully");
        }
      } catch (error) {
        if(error.response?.data?.errors){
          Object.entries(error.response.data.errors).forEach(([key, value]) => {
            console.log(`${key} ${value}`);
            toast.error(value);
          });
        } else if (error.response?.data?.message){
          toast.error(error.response.data.message);
        }
      }
    }
    setSelectedProducts([]);
    setOpenModal(false);
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
          {products.length > 0 &&
            products.map((product) => (
              <div key={product.id} className={classes.productItem}>
                <img
                  className={classes.editItemImage}
                  src={getBaseURL().bucket_base_url + getBaseURL().images + product.original_file}
                  alt={product.title}
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
            onClick={() => handleCategoryChange()}
          >
            {category.length !== 0 ? (
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

        <hr className={classes.seperator} />

        <div className={classes.buttonsWrapper}>
          <Button onClick={handleProductSubmit} value="submit" type="submit" className={`${classes.actionBtn} ${classes.submitBtn}`}>
            Submit
          </Button>
          <Button onClick={handleProductSubmit} value="save" className={`${classes.actionBtn} ${classes.saveBtn}`}>
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
