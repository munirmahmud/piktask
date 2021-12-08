import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { getBaseURL } from "./../../../../helpers/index";
import useStyles from "./SearchItem.styles";

const SearchItem = ({ item, active }) => {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    const listener = (event) => {
      if (active) {
        if (event.keyCode === 13) {
          // console.log("image_id", item?.image_id);
          // console.log("Enter key was pressed. Run your function.");
          history.push(
            "/category" +
              encodeURI(
                `/${item?.category.toLowerCase().trim().replace(/\s/g, "-")}/${item?.title.toLowerCase().trim().replace(/\s/g, "-")}&id=${item?.image_id}`
              )
          );
          event.preventDefault();
        }
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [history, item, active]);

  function pikTaskEncodeURI(data) {
    if (data) {
      return (
        "/category" +
        encodeURI(`/${data?.category.toLowerCase().trim().replace(/\s/g, "-")}/${data?.title.toLowerCase().trim().replace(/\s/g, "-")}&id=${data?.image_id}`)
      );
    }
  }

  return (
    <Link to={encodeURI(pikTaskEncodeURI(item))} className={classes.searchItemWrapper}>
      <div className={classes.searchLeft}>
        <div className={classes.thumbnail}>
          <img src={encodeURI(getBaseURL().bucket_base_url + getBaseURL().images + item?.preview)} alt={item?.title} />
        </div>
        <h2>{item?.title}</h2>
      </div>
    </Link>
  );
};

export default SearchItem;
