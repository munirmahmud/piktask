import {
  Button,
  Container,
  // Menu,
  // MenuItem,
  Tab,
  Tabs,
  Toolbar,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import signInIcon from "../../../../assets/icons/signInIcon.svg";
// import crownIcon from "../../../../assets/icons/crown.svg";
import logo from "../../../../assets/Logo/piktask-6.png";
import { getBaseURL } from "../../../../helpers";
// import enterpriseCrownIcon from "../../../../assets/icons/crownEnterpriseIcon.svg";
import SignUpModal from "../../../../pages/Authentication/SignUpModal";
import CustomPopper from "../../CustomPopper";
import useStyles from "./DesktopMenu.styles";

const DesktopMenu = ({ history }) => {
  const classes = useStyles();
  const anchorRef = useRef(null);
  const user = useSelector((state) => state.user);

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [role, setRole] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [user, history]);

  const handleChange = (event, index) => {
    setValue(index);
  };
  const handleToggle = () => {
    setOpen((prevState) => !prevState);
  };

  const handleClose = (e) => {
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListKeyDown = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    }
  };

  // const [anchorEl, setAnchorEl] = useState(null);
  // const openSubMenu = Boolean(anchorEl);
  // const handleHoverMenu = (event) => {
  //   // if (anchorEl !== event.currentTarget) {
  //   //   setAnchorEl(event.currentTarget);
  //   // }
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleCloseSubMenu = () => {
  //   setAnchorEl(null);
  // };

  const handleClick = (e) => {
    setRole(e.target.closest("button").value);
    setOpenAuthModal(true);
  };

  return (
    <>
      <Container className={classes.container}>
        <Toolbar disableGutters className={classes.headerBottomToolbar}>
          <Button
            component={Link}
            to="/"
            className={classes.logoWrapper}
            disableRipple
          >
            <img src={logo} className={classes.logo} alt="Dev" />
          </Button>

          <Tabs
            value={value}
            className={classes.menuTab}
            classes={{ indicator: classes.menuUnderline }}
            onChange={handleChange}
            aria-label="main navigation"
          >
            <Tab
              className={classes.menuItem}
              disableRipple
              component={NavLink}
              to={`/category/business-card-mockup`}
              label="Business Card Mockup"

              // id="Sports"
              // aria-controls="Sports"
              // aria-haspopup="true"
              // aria-expanded={openSubMenu ? 'true' : undefined}
              // onClick={handleHoverMenu}
              // onMouseOver={handleHoverMenu}
            />

            {/* <Menu
              id="Sports"
              anchorEl={anchorEl}
              open={openSubMenu}
              MenuListProps={{ 'aria-labelledby': 'Sports', onMouseLeave: handleCloseSubMenu }}
              onClose={handleCloseSubMenu}
            >
              <div className={classes.subMenuItem}>
                <MenuItem onClick={handleCloseSubMenu}>Profile</MenuItem>
                <MenuItem onClick={handleCloseSubMenu}>My account</MenuItem>
                <MenuItem onClick={handleCloseSubMenu}>Logout</MenuItem>
              </div>
            </Menu> */}

            <Tab
              className={classes.menuItem}
              disableRipple
              component={NavLink}
              to="/category/text-effect"
              label="Text Effect"

              // id="Travel"
              // aria-controls="Travel"
              // aria-haspopup="true"
              // aria-expanded={openSubMenu ? 'true' : undefined}
              // onClick={handleHoverMenu}
              // onMouseOver={handleHoverMenu}
            />

            {/* <Menu
              id="Travel"
              anchorEl={anchorEl}
              open={openSubMenu}
              MenuListProps={{ 'aria-labelledby': 'Travel', onMouseLeave: handleCloseSubMenu }}
              onClose={handleCloseSubMenu}
            >
              <div className={classes.subMenuItem}>
                <MenuItem onClick={handleCloseSubMenu}>Profile account</MenuItem>
                <MenuItem onClick={handleCloseSubMenu}>My Favorite</MenuItem>
                <MenuItem onClick={handleCloseSubMenu}>Downloads</MenuItem>
              </div>
            </Menu> */}

            <Tab
              className={classes.menuItem}
              disableRipple
              component={NavLink}
              to="/category/social-media-banner"
              label="Social Media Banner"
            />
            <Tab
              className={classes.menuItem}
              disableRipple
              component={NavLink}
              to="/category/game"
              label="Game"
            />
            <Tab
              className={classes.menuItem}
              disableRipple
              component={NavLink}
              to="/category/logo-mockup"
              label="Logo Mockup"
            />
          </Tabs>
          <Toolbar disableGutters className={classes.toolBarContainer}>
            {user?.isLoggedIn && user?.role === "contributor" ? (
              <Button
                className={classes.sellContentBtn}
                component={Link}
                to="/contributor/dashboard"
              >
                Sell Your Content
              </Button>
            ) : (
              <Button
                className={classes.sellContentBtn}
                component={Link}
                to="/contributor/join"
              >
                Sell Your Content
              </Button>
            )}

            {/* <Button disableRipple className={classes.enterprise}>
              <img
                className={classes.crownIcon}
                src={enterpriseCrownIcon}
                alt="Crown"
              />
              Enterprise
            </Button> */}

            {/* <Button className={classes.premium}>
              <img className={classes.crownIcon} src={crownIcon} alt="Crown" />
              Premium
            </Button> */}

            {user?.isLoggedIn && user?.role === "user" ? (
              <div
                className={classes.userAvatarArea}
                onClick={handleToggle}
                aria-controls={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                ref={anchorRef}
              >
                {user?.isLoggedIn && user?.avatar && user?.avatar !== "null" ? (
                  <>
                    {user?.avatar_from === "own" ? (
                      <img
                        className={classes.avatar}
                        src={
                          getBaseURL().bucket_base_url +
                          getBaseURL().profiles +
                          user?.avatar
                        }
                        alt="UserPhoto"
                      />
                    ) : (
                      <img
                        className={classes.avatar}
                        src={user?.avatar}
                        alt="UserPhoto"
                      />
                    )}
                  </>
                ) : (
                  <AccountCircleIcon className={classes.avatar} />
                )}
                <ArrowDropDownIcon className={classes.arrowDown} />
              </div>
            ) : (
              <Button
                className={classes.signInBtn}
                onClick={handleClick}
                value="user"
              >
                <img
                  className={classes.crownIcon}
                  src={signInIcon}
                  alt="Crown"
                />
                Sign In
              </Button>
            )}
          </Toolbar>
        </Toolbar>
      </Container>

      <CustomPopper
        open={open}
        handleToggle={handleToggle}
        anchorRef={anchorRef}
        handleClose={handleClose}
        handleListKeyDown={handleListKeyDown}
      />

      <SignUpModal
        openAuthModal={openAuthModal}
        setOpenAuthModal={setOpenAuthModal}
        role={role}
      />
    </>
  );
};

export default DesktopMenu;
