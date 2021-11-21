import React from "react";
import { Link } from "react-router-dom";
import { getBaseURL } from "./../../../../helpers/index";
import useStyles from "./SearchItem.styles";

const SearchItem = ({ item }) => {
  const classes = useStyles();

  function pikTaskEncodeURI(data) {
    if (data) {
      return (
        "/category" +
        encodeURI(
          `/${data?.category
            .toLowerCase()
            .trim()
            .replace(/\s/g, "-")}/${data?.title
            .toLowerCase()
            .trim()
            .replace(/\s/g, "-")}&id=${data?.image_id}`
        )
      );
    }
  }

  return (
    <Link
      to={encodeURI(pikTaskEncodeURI(item))}
      className={classes.searchItemWrapper}
    >
      <div className={classes.searchLeft}>
        <div className={classes.thumbnail}>
          <img
            src={encodeURI(
              getBaseURL().bucket_base_url + getBaseURL().images + item?.preview
            )}
            alt={item?.title}
          />
        </div>
        <h2>{item?.title}</h2>
      </div>
    </Link>
  );
};

export default SearchItem;
