import { Collapse, List, ListItem, ListItemText } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useStyles from "./MobileSidebarMenu.styles";

const MobileSidebarMenu = () => {
  const user = useSelector((state) => state.user);
  const classes = useStyles();
  const anchorRef = useRef(null);
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  useEffect(() => {
    if (window.location.pathname === "/contributor/dashboard" && value !== 0) {
      setValue(0);
    } else if (window.location.pathname === "/contributor/upload" && value !== 1) {
      setOpen(true);
      setValue(1);
      setSelectedItem(1);
    } else if (window.location.pathname === "/contributor/pending" && value !== 2) {
      setOpen(true);
      setValue(1);
      setSelectedItem(2);
    } else if (window.location.pathname === "/contributor/revision" && value !== 3) {
      setOpen(true);
      setValue(1);
      setSelectedItem(3);
    } else if (window.location.pathname === "/contributor/reject" && value !== 4) {
      setOpen(true);
      setValue(1);
      setSelectedItem(4);
    } else if (window.location.pathname === "/contributor/publish" && value !== 5) {
      setOpen(true);
      setValue(1);
      setSelectedItem(5);
    } else if (window.location.pathname === "/contributor/earnings" && value !== 6) {
      setValue(6);
    } else if (window.location.pathname === "/contributor/contributor-price-plan" && value !== 7) {
      setValue(7);
    } else if (window.location.pathname === "/contributor/guidLine" && value !== 8) {
      setValue(8);
    } else if (window.location.pathname === "/contributor/settings" && value !== 9) {
      setValue(9);
    }
  }, [value]);

  // const handleChange = (e, index) => {
  //   setValue(index);
  // };

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <List component="nav" aria-labelledby="nested-sidebar-nav" className={classes.mobileSidebarMenu}>
        <ListItem
          classes={{
            gutters: classes.gutters,
            selected: classes.selectedItem,
          }}
          component={Link}
          to="/contributor/dashboard"
          selected={value === 0}
        >
          <ListItemText primary="dashboard" />
        </ListItem>
        <ListItem
          classes={{
            gutters: classes.gutters,
            selected: classes.selectedItem,
          }}
          className={classes.dropdownMenu}
          onClick={handleClick}
          component={Link}
          to="/contributor/upload"
          selected={value === 1}
        >
          <ListItemText primary="Files" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding className={classes.submenuContainer}>
            <ListItem component={Link} to="/contributor/pending" className={classes.nested} selected={value === 0}>
              <ListItemText primary="Not yet submitted" />
            </ListItem>

            <ListItem component={Link} to="/contributor/revision" className={classes.nested} selected={value === 1 && selectedItem === 3}>
              <ListItemText primary="Under Revision" />
            </ListItem>

            <ListItem component={Link} to="/contributor/reject" className={classes.nested} selected={value === 1 && selectedItem === 4}>
              <ListItemText primary="Rejections" />
            </ListItem>

            <ListItem component={Link} to="/contributor/publish" className={classes.nested} selected={value === 1 && selectedItem === 5}>
              <ListItemText primary="Published" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem
          classes={{
            gutters: classes.gutters,
            selected: classes.selectedItem,
          }}
          onClick={handleClick}
          component={Link}
          to="/contributor/earnings"
          selected={value === 6}
        >
          <ListItemText primary="Earning Management" />
        </ListItem>
        <ListItem
          classes={{
            gutters: classes.gutters,
            selected: classes.selectedItem,
          }}
          onClick={handleClick}
          component={Link}
          to="/contributor/contributor-price-plan"
          selected={value === 7}
        >
          <ListItemText primary="Contributor Price Plan" />
        </ListItem>
        <ListItem
          classes={{
            gutters: classes.gutters,
            selected: classes.selectedItem,
          }}
          onClick={handleClick}
          component={Link}
          to="/contributor/guidLine"
          selected={value === 8}
        >
          <ListItemText primary="Guideline" />
        </ListItem>

        <ListItem
          classes={{
            gutters: classes.gutters,
            selected: classes.selectedItem,
          }}
          onClick={handleClick}
          component={Link}
          to="/contributor/settings"
          selected={value === 9}
        >
          <ListItemText primary="Account Setting" />
        </ListItem>
      </List>
    </>
  );
};

export default MobileSidebarMenu;
