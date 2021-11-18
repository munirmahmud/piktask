import React from "react";
import { Link } from "react-router-dom";
import { getBaseURL } from "./../../../../helpers/index";
import useStyles from "./SearchItem.styles";

const SearchItem = ({ item }) => {
  const classes = useStyles();

  return (
    <Link
      to={encodeURI(
        `/images/${item?.title.toLowerCase().replace(/\s/g, "-")}&id=${
          item?.image_id
        }`
      )}
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
