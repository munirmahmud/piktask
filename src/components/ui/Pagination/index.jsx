import { Pagination } from "@material-ui/lab";
import React from "react";
import Spacing from "../../Spacing";
import useStyles from "./Pagination.style";

const Paginations = (props) => {
  const classes = useStyles();
  const { pageCount, setPageCount } = props;

  const handleClick = (value) => {
    window.scrollTo(0, 0);
    setPageCount(value);
  }

  return (
    <>
      <Spacing space={{ height: "3rem" }} />
      <div className={classes.pagination}>
        <Pagination
          onChange={(event, value) => handleClick(value)}
          count={10}
          defaultPage={pageCount}
          variant="outlined"
          shape="rounded"
          color="primary"
          size="medium"
          showFirstButton
          showLastButton
          pageCount={pageCount}
        />
      </div>
    </>
  );
};

export default Paginations;
