import {
  Button,
  Card,
  FormControl,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import behanceIcon from "../../../assets/icons/behance.svg";
import cardsIcon from "../../../assets/icons/cards.svg";
import cvcIcon from "../../../assets/icons/cvcicon.svg";
import dribbbleIcon from "../../../assets/icons/dribble.svg";
import facebookIcon from "../../../assets/icons/facebook.svg";
import freepikIcon from "../../../assets/icons/freepik.svg";
import instagramIcon from "../../../assets/icons/instagram.svg";
import linkedinIcon from "../../../assets/icons/linkedin.svg";
import shutterstockIcon from "../../../assets/icons/shutterstock.svg";
import twitterIcon from "../../../assets/icons/twitter.svg";
import Footer from "../../../components/ui/Footer";
import Layout from "../../../Layout";
import AdminHeader from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import useStyles from "./AccountSettings.styles";
import allCountry from "../../../data/countryList.json";


const AccountSettings = () => {
  const classes = useStyles();

  const user = useSelector((state) => state.user);

  const [payment, setPayment] = useState("Paypal");
  const [state, setState] = useState("Chittagong");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [locationAddress, setLocationAddress] = useState("");
  const [billingsAddress, setBillingsAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [countryName, setCountryName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [shutterstock, setShutterstock] = useState("");
  const [freepik, setFreepik] = useState("");
  const [behance, setBehance] = useState("");
  const [dribble, setDribble] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  //bank info state
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [branch, setBranch] = useState("");
  const [bankCountry, setBankCountry] = useState("");
  const [swiftCode, setSwiftCode] = useState("");
  const [paypalAccount, setPaypalAccount] = useState("");

  const [countries, setCountries] = useState([]);
  

  const [menuSate, setMenuSate] = useState({ mobileView: false });
  const { mobileView } = menuSate;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setMenuSate((prevState) => ({ ...prevState, mobileView: true }))
        : setMenuSate((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  //load all country name
  // const handleCountryName = (e) => {
  //   const categoryID = e.target.getAttribute("data-id");
  //   const textValue = e.target.textContent;
  //   setCountryName(textValue);
  //   setSearchCategoryID(categoryID);
  // };

  // const loadCategories = () => {
  //   if (categories.length === 0) {
  //     axios
  //     .get(`${process.env.REACT_APP_API_URL}/categories?limit=50`)
  //     .then(({ data }) => {
  //       if (data?.status) {
  //         const sortedData = data?.categories.sort((a, b) => a.id - b.id);
  //         setCategories(sortedData);
  //       }
  //     })
  //     .catch((error) => console.log("Categories loading error: ", error));
  //   }
  // };

  // useEffect(() => {
  //   setCountries(allCountry.countries);
  // },[])

  const handleCountries =()=>{
    setCountries(allCountry.countries);
  };


  // get contributor information
  useEffect(() => {
    setLoading(true);

    if (user?.token) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/contributor/profile`, {
          headers: { Authorization: user.token },
        })
        .then(({ data }) => {
          if (data?.status) {
            setName(data.user.name);
            setUsername(data.user.username);
            setEmail(data.user.email);
            setLocationAddress(data.user.location);
            setPhone(data.user.phone);
            setWebsite(data.user.website);
            setCountryName(data.user.country_name);
            setCity(data.user.city)
            setZipCode(data.user.zip_code);
            setBillingsAddress(data.user.billings_address);
            setAccountName(data.user.account_name);
            setAccountNumber(data.user.account_number);
            setRoutingNumber(data.user.routing_number);
            setBranch(data.user.branch);
            setBankCountry(data.user.bank_country);
            setSwiftCode(data.user.swift_code);
            setPaypalAccount(data.user.paypal_account);
            setShutterstock(data.user.shutterstock);
            setFreepik(data.user.freepik);
            setBehance(data.user.behance);
            setDribble(data.user.dribble);
            setFacebook(data.user.facebook);
            setTwitter(data.user.twitter);
            setLinkedin(data.user.linkedin);
            setInstagram(data.user.instagram);
            setLoading(false);
            console.log("country Name",data.user.country_name);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [user.token]);

  //Update contributor profile
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("location", locationAddress);
    formData.append("phone", phone);
    formData.append("website", website);
    formData.append("billings_address", billingsAddress);
    formData.append("country_name", countryName);
    formData.append("city", city);
    formData.append("zip_code", zipCode);
    formData.append("account_name", accountName);
    formData.append("account_number", accountNumber);
    formData.append("routing_number", routingNumber);
    formData.append("branch", branch);
    formData.append("bank_country", bankCountry);
    formData.append("swift_code", swiftCode);
    formData.append("paypal_account", paypalAccount);
    formData.append("shutterstock", shutterstock);
    formData.append("freepik", freepik);
    formData.append("behance", behance);
    formData.append("dribble", dribble);
    formData.append("facebook", facebook);
    formData.append("twitter", twitter);
    formData.append("instagram", instagram);
    formData.append("linkedin", linkedin);

    const url = `${process.env.REACT_APP_API_URL}/contributor/profile`;
    axios({
      method: "put",
      url,
      headers: {
        Authorization: user.token,
        "Content-Type": "application/json",
      },
      data: formData,
    })
      .then((res) => {
        if (res?.status === 200) {
          toast.success(res.data.message);
          setErrors({});
        }
      })
      .catch((error) => {
        const { errors } = error.response.data;
        setErrors(errors);
      });
  };

  return (
    <Layout title={`Profile | Piktask`}>
      <div className={classes.adminRoot}>
        {mobileView ? null : <Sidebar className={classes.adminSidebar} />}

        <main className={classes.content}>
          <AdminHeader />
          <div className={classes.profileContentWrapper}>
            <div className={classes.settingsHero}>
              <Typography variant="h1">Your Account Dashboard</Typography>
            </div>
            {/* Ends Hero */}

            <div className={classes.settingsFormWrapper}>
              <form
                onSubmit={handleSubmit}
                className={classes.selectPeriodFrom}
              >
                <Card className={classes.cardRoot}>
                  <div className={classes.headingWrapper}>
                    <Typography
                      className={classes.settingsFormTitle}
                      variant="h4"
                    >
                      Personal Information
                    </Typography>
                    <hr className={classes.seperator} />
                  </div>

                  <div className={classes.cardWrapper}>
                    <div className={classes.fieldsGroup}>
                      <FormControl
                        fullWidth
                        classes={{ fullWidth: classes.fullWidth }}
                      >
                        <TextField
                          id="name"
                          label="Name"
                          variant="outlined"
                          className={`${classes.inputField}`}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </FormControl>
                      <FormControl
                        fullWidth
                        classes={{ fullWidth: classes.fullWidth }}
                        className={classes.lastField}
                      >
                        <TextField
                          id="username"
                          label="User Name"
                          variant="outlined"
                          className={`${classes.inputField}`}
                          value={username}
                        />
                      </FormControl>
                    </div>

                    <div className={classes.fieldsGroup}>
                      <FormControl
                        fullWidth
                        classes={{ fullWidth: classes.fullWidth }}
                      >
                        <TextField
                          id="email"
                          label="Email"
                          variant="outlined"
                          className={`${classes.inputField}`}
                          value={email}
                        />
                      </FormControl>
                      <FormControl
                        fullWidth
                        classes={{ fullWidth: classes.fullWidth }}
                      >
                        <TextField
                          error={!!errors.website}
                          helperText={errors.website}
                          fullWidth
                          variant="outlined"
                          label="Website"
                          className={`${classes.inputField}`}
                          name="website"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                        />
                      </FormControl>
                    </div>

                    <div className={classes.fieldsGroup}>
                      <FormControl
                        fullWidth
                        classes={{ fullWidth: classes.fullWidth }}
                        className={classes.lastField}
                      >
                        <TextField
                          id="phonenumber"
                          label="Phone Number"
                          type="number"
                          variant="outlined"
                          className={`${classes.inputField}`}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </FormControl>
                      <FormControl
                        variant="outlined"
                        fullWidth
                        classes={{ fullWidth: classes.fullWidth }}
                      >
                        <TextField
                           SelectProps={{
                            native: true,
                          }}
                          select
                          variant="outlined"
                          label="Country"
                          IconComponent={ExpandMoreIcon}
                          className={`${classes.inputField}`}
                          value={countryName}
                          onChange={(e) => setCountryName(e.target.value)}
                          onClick={handleCountries}
                        >
                          {countries.map((option, index) => (
                            <option key={index} value={option.country}>
                              {option.country}
                              {console.log(option.country)}
                            </option>
                          ))}
                          

                          {/* {countries? (
                            countries?.map((country) => (
                              <option key={country.index} value={country.country}>
                                {country.country}
                              </option>
                            ))
                          ) : (
                            <option>Country</option>
                          )} */}
                        </TextField>
                      </FormControl>
                    </div>

                    <div className={classes.fieldsGroup}>
                      <FormControl
                        fullWidth
                        classes={{ fullWidth: classes.fullWidth }}
                      >
                        <TextField
                          id="city"
                          label="Your State/City"
                          variant="outlined"
                          className={`${classes.inputField}`}
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        >
                        </TextField>
                      </FormControl>

                      <FormControl
                        fullWidth
                        classes={{ fullWidth: classes.fullWidth }}
                        className={classes.lastField}
                      >
                        <TextField
                          id="postalcode"
                          label="Zip/Postal Code"
                          variant="outlined"
                          className={`${classes.inputField}`}
                          value={zipCode}
                          onChange={(e) => setZipCode(e.target.value)}
                        />
                      </FormControl>
                    </div>

                    <div className={classes.fieldsGroup}>
                      <FormControl
                        fullWidth
                        classes={{ fullWidth: classes.fullWidth }}
                      >
                        <TextField
                          id="address"
                          label="Current Address"
                          variant="outlined"
                          className={`${classes.inputField}`}
                          value={locationAddress}
                          onChange={(e) => setLocationAddress(e.target.value)}
                        />
                      </FormControl>
                      <FormControl
                        fullWidth
                        classes={{ fullWidth: classes.fullWidth }}
                        className={classes.lastField}
                      >
                        <TextField
                          id="billingaddress"
                          label="Billing Address"
                          variant="outlined"
                          className={`${classes.inputField}`}
                          value={billingsAddress}
                          onChange={(e) => setBillingsAddress(e.target.value)}
                        />
                      </FormControl>
                    </div>
                  </div>
                  {/* Card Wrapper ends */}
                </Card>

                <Card className={classes.cardRoot}>
                  <div className={classes.headingWrapper}>
                    <Typography
                      className={classes.settingsFormTitle}
                      variant="h4"
                    >
                      Add Payment Method
                    </Typography>
                    <hr className={classes.seperator} />
                  </div>

                  <div className={classes.cardWrapper}>
                    <div className={classes.fieldsGroup}>
                      <FormControl
                        variant="outlined"
                        fullWidth
                        classes={{ fullWidth: classes.fullWidth }}
                      >
                        <Select
                          native
                          value={payment}
                          onChange={(e) => setPayment(e.target.value)}
                          label="Name on Card"
                          IconComponent={ExpandMoreIcon}
                          className={classes.selectArea}
                        >
                          <option value="Paypal">Paypal</option>
                          <option value="Payoneer">Payoneer</option>
                          <option value="Bank">Bank</option>
                        </Select>
                      </FormControl>
                      <FormControl
                        fullWidth
                        classes={{ fullWidth: classes.fullWidth }}
                      >
                        <TextField
                          fullWidth
                          variant="outlined"
                          label="Paypal Email"
                          name="paypalEmail"
                          className={`${classes.inputField}`}
                          value={paypalAccount}
                          onChange={(e) => setPaypalAccount(e.target.value)}
                        />
                      </FormControl>
                     
                    </div>
                    <div className={classes.fieldsGroup}>
                      <FormControl
                        fullWidth
                        classes={{ fullWidth: classes.fullWidth }}
                      >
                        <TextField
                          id="name"
                          label="Account Name"
                          variant="outlined"
                          className={`${classes.inputField}`}
                          placeholder="Account Name"
                          value={accountName}
                          onChange={(e) => setAccountName(e.target.value)}
                        />
                      </FormControl>
                      <FormControl
                        fullWidth
                        classes={{ fullWidth: classes.fullWidth }}
                        className={classes.inputImage}
                      >
                        <TextField
                          type="number"
                          id="accountNumber"
                          label="Account Number"
                          variant="outlined"
                          className={`${classes.inputField}`}
                          placeholder="Account Number"
                          value={accountNumber}
                          onChange={(e) => setAccountNumber(e.target.value)}
                        />
                      </FormControl>
                    </div>
                    <div className={classes.fieldsGroup}>
                      <FormControl
                        fullWidth
                        classes={{ fullWidth: classes.fullWidth }}
                      >
                        <TextField
                          id="routingNumber"
                          type="number"
                          label="Routing Number"
                          variant="outlined"
                          className={`${classes.inputField}`}
                          placeholder="Routing Number"
                          value={routingNumber}
                          onChange={(e) => setRoutingNumber(e.target.value)}
                        />
                      </FormControl>
                      <FormControl
                        fullWidth
                        classes={{ fullWidth: classes.fullWidth }}
                        className={classes.inputImage}
                      >
                        <TextField
                          type="number"
                          id="swiftCode"
                          label="Swift Code"
                          variant="outlined"
                          className={`${classes.inputField}`}
                          placeholder="Swift Code"
                          value={swiftCode}
                          onChange={(e) => setSwiftCode(e.target.value)}
                        />
                      </FormControl>
                    </div>
                    <div className={classes.fieldsGroup}>
                      <FormControl
                        fullWidth
                        classes={{ fullWidth: classes.fullWidth }}
                      >
                        <TextField
                          id="branch"
                          label="Branch"
                          variant="outlined"
                          className={`${classes.inputField}`}
                          placeholder="Branch"
                          value={branch}
                          onChange={(e) => setBranch(e.target.value)}
                        />
                      </FormControl>
                      <FormControl
                        fullWidth
                        classes={{ fullWidth: classes.fullWidth }}
                        className={classes.inputImage}
                      >
                        <TextField
                          id="bankCountry"
                          label="Bank Country"
                          variant="outlined"
                          className={`${classes.inputField}`}
                          placeholder="Bank Country"
                          value={bankCountry}
                          onChange={(e) => setBankCountry(e.target.value)}
                        />
                      </FormControl>
                    </div>
                  </div>
                </Card>
                {/* Add payment method ends */}

                <Card className={classes.cardRoot}>
                  <div className={classes.headingWrapper}>
                    <Typography
                      className={classes.settingsFormTitle}
                      variant="h4"
                    >
                      Professional Portfolio
                    </Typography>
                    <hr className={classes.seperator} />
                  </div>

                  <div className={classes.cardWrapper}>
                    <div
                      className={`${classes.fieldsGroup} ${classes.linkField}`}
                    >
                      <FormControl
                        fullWidth
                        classes={{ fullWidth: classes.fullWidth }}
                        className={classes.portfolioLink}
                      >
                        <label
                          htmlFor="shutterstock"
                          className={classes.portfolioIconWrapper}
                        >
                          <img src={shutterstockIcon} alt="Shutterstock Icon" />
                        </label>
                        <TextField
                          id="shutterstock"
                          error={!!errors.shutterstock}
                          helperText={errors.shutterstock}
                          label="Your Shutterstock Account"
                          variant="outlined"
                          className={`${classes.inputField}`}
                          placeholder="Your Shutterstock Account"
                          value={shutterstock}
                          onChange={(e) => setShutterstock(e.target.value)}
                        />
                      </FormControl>
                    </div>
                    <div
                      className={`${classes.fieldsGroup} ${classes.linkField}`}
                    >
                      <FormControl
                        fullWidth
                        classes={{ fullWidth: classes.fullWidth }}
                        className={classes.portfolioLink}
                      >
                        <label
                          htmlFor="freepik"
                          className={classes.portfolioIconWrapper}
                        >
                          <img src={freepikIcon} alt="Freepik Icon" />
                        </label>
                        <TextField
                          id="freepik"
                          error={!!errors.freepik}
                          helperText={errors.freepik}
                          label="Your Freepik Account"
                          variant="outlined"
                          className={`${classes.inputField}`}
                          placeholder="Your Freepik Account"
                          value={freepik}
                          onChange={(e) => setFreepik(e.target.value)}
                        />
                      </FormControl>
                    </div>
                    <div
                      className={`${classes.fieldsGroup} ${classes.linkField}`}
                    >
                      <FormControl
                        fullWidth
                        classes={{ fullWidth: classes.fullWidth }}
                        className={classes.portfolioLink}
                      >
                        <label
                          htmlFor="behance"
                          className={classes.portfolioIconWrapper}
                        >
                          <img src={behanceIcon} alt="Behance Icon" />
                        </label>
                        <TextField
                          id="behance"
                          error={!!errors.behance}
                          helperText={errors.behance}
                          label="Your Behance Account"
                          variant="outlined"
                          className={`${classes.inputField}`}
                          placeholder="Your Behance Account"
                          value={behance}
                          onChange={(e) => setBehance(e.target.value)}
                        />
                      </FormControl>
                    </div>
                    <div
                      className={`${classes.fieldsGroup} ${classes.linkField}`}
                    >
                      <FormControl
                        fullWidth
                        classes={{ fullWidth: classes.fullWidth }}
                        className={classes.portfolioLink}
                      >
                        <label
                          htmlFor="dribbble"
                          className={classes.portfolioIconWrapper}
                        >
                          <img src={dribbbleIcon} alt="Dribbble Icon" />
                        </label>
                        <TextField
                          id="dribbble"
                          error={!!errors.dribble}
                          helperText={errors.dribble}
                          label="Your Dribbble Account"
                          variant="outlined"
                          className={`${classes.inputField}`}
                          placeholder="Your Dribbble Account"
                          value={dribble}
                          onChange={(e) => setDribble(e.target.value)}
                        />
                      </FormControl>
                    </div>
                  </div>
                </Card>
                {/* Ends Professional Portfolio */}

                <Card className={classes.cardRoot}>
                  <div className={classes.headingWrapper}>
                    <Typography
                      className={classes.settingsFormTitle}
                      variant="h4"
                    >
                      Social Link
                    </Typography>
                    <hr className={classes.seperator} />
                  </div>

                  <div className={classes.cardWrapper}>
                    <div
                      className={`${classes.fieldsGroup} ${classes.linkField}`}
                    >
                      <FormControl
                        fullWidth
                        classes={{ fullWidth: classes.fullWidth }}
                        className={classes.portfolioLink}
                      >
                        <label
                          htmlFor="facebook"
                          className={classes.portfolioIconWrapper}
                        >
                          <img
                            src={facebookIcon}
                            className={classes.facebookIcon}
                            alt="Facebook Icon"
                          />
                        </label>
                        <TextField
                          id="facebook"
                          error={!!errors.facebook}
                          helperText={errors.facebook}
                          label="Your Facebook Account"
                          variant="outlined"
                          className={`${classes.inputField}`}
                          placeholder="Your Facebook Account"
                          value={facebook}
                          onChange={(e) => setFacebook(e.target.value)}
                        />
                      </FormControl>
                    </div>
                    <div
                      className={`${classes.fieldsGroup} ${classes.linkField}`}
                    >
                      <FormControl
                        fullWidth
                        classes={{ fullWidth: classes.fullWidth }}
                        className={classes.portfolioLink}
                      >
                        <label
                          htmlFor="twitter"
                          className={classes.portfolioIconWrapper}
                        >
                          <img src={twitterIcon} alt="Twitter Icon" />
                        </label>
                        <TextField
                          id="twitter"
                          error={!!errors.twitter}
                          helperText={errors.twitter}
                          label="Your Twitter Account"
                          variant="outlined"
                          className={`${classes.inputField}`}
                          placeholder="Your Twitter Account"
                          value={twitter}
                          onChange={(e) => setTwitter(e.target.value)}
                        />
                      </FormControl>
                    </div>
                    <div
                      className={`${classes.fieldsGroup} ${classes.linkField}`}
                    >
                      <FormControl
                        fullWidth
                        classes={{ fullWidth: classes.fullWidth }}
                        className={classes.portfolioLink}
                      >
                        <label
                          htmlFor="linkedin"
                          className={classes.portfolioIconWrapper}
                        >
                          <img src={linkedinIcon} alt="Linkedin Icon" />
                        </label>
                        <TextField
                          id="linkedin"
                          error={!!errors.linkedin}
                          helperText={errors.linkedin}
                          label="Your Linkedin Account"
                          variant="outlined"
                          className={`${classes.inputField}`}
                          placeholder="Your Linkedin Account"
                          value={linkedin}
                          onChange={(e) => setLinkedin(e.target.value)}
                        />
                      </FormControl>
                    </div>
                    <div
                      className={`${classes.fieldsGroup} ${classes.linkField}`}
                    >
                      <FormControl
                        fullWidth
                        classes={{ fullWidth: classes.fullWidth }}
                        className={classes.portfolioLink}
                      >
                        <label
                          htmlFor="instagram"
                          className={classes.portfolioIconWrapper}
                        >
                          <img src={instagramIcon} alt="Instagram Icon" />
                        </label>
                        <TextField
                          id="instagram"
                          error={!!errors.instagram}
                          helperText={errors.instagram}
                          label="Your Instagram Account"
                          variant="outlined"
                          className={`${classes.inputField}`}
                          placeholder="Your Instagram Account"
                          value={instagram}
                          onChange={(e) => setInstagram(e.target.value)}
                        />
                      </FormControl>
                    </div>
                  </div>
                </Card>
                {/* Ends Professional Portfolio */}

                <div className={classes.buttonGroup}>
                  <Button
                    className={`${classes.settingsBtn} ${classes.restoreBtn}`}
                  >
                    Restore All Attributes
                  </Button>
                  <Button
                    type="submit"
                    className={`${classes.settingsBtn} ${classes.saveBtn}`}
                  >
                    Save All Changes
                  </Button>
                </div>
              </form>
            </div>
          </div>
          {/* Ends form wrapper */}
          <Footer addminFooter />
        </main>
      </div>
    </Layout>
  );
};

export default AccountSettings;
