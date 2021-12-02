import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Container, FormControl, TextareaAutosize, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import thumbnail from "../../assets/banner/lucas-wesney-s-y2HJElONo-unsplash.jpg";
import Spacing from "../../components/Spacing";
import Footer from "../../components/ui/Footer";
import Header from "../../components/ui/Header";
import HeroSection from "../../components/ui/Hero";
import Layout from "../../Layout";
import useStyles from "./Contact.style";

const Contact = () => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [issueItem, setIssueItem] = useState([]);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    axios
      .get(`${process.env.REACT_APP_API_URL}/others/contact_us/issues`, { cancelToken: source.token })
      .then(({ data }) => {
        console.log("data", data);
        if (data?.status) {
          const sortedData = data?.getIssues.sort((a, b) => a.id - b.id);
          setIssueItem((prevState) => [{ id: "0", name: "Select a category" }, ...sortedData]);
        }
      })
      .catch((error) => console.log("Categories loading error: ", error));

    return () => source.cancel();
  }, []);

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const validateEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email && !validateEmail.test(String(email))) {
      toast.error("Your email is invalid", { autoClose: 2200 });
      setLoading(false);
      return;
    } else if (!name) {
      setLoading(false);
      toast.error("The name field is required.", { autoClose: 2200 });
      return;
    } else if (!email) {
      setLoading(false);
      toast.error("The email field is required.", { autoClose: 2200 });
      return;
    } else if (!subject) {
      setLoading(false);
      toast.error("Please select a category.", { autoClose: 2200 });
      return;
    } else if (!message) {
      setLoading(false);
      toast.error("The description field is required.", { autoClose: 2200 });
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("contact_categories_id", subject);
    formData.append("message", message);

    const url = `${process.env.REACT_APP_API_URL}/others/contact_us`;
    axios({
      method: "post",
      url,
      data: formData,
      cancelToken: source.token,
    })
      .then((res) => {
        if (res?.status === 200) {
          toast.success(res.data.message);
          setLoading(false);
          setName("");
          setEmail("");
          setSubject("");
          setMessage("");
        }
      })
      .catch((error) => {
        const { errors } = error.response.data;
        for (let key in errors) {
          toast.error(errors[key]);
        }
        setLoading(false);
      });

    return () => source.cancel();
  };

  return (
    <Layout title=" Contact" canonical={document.URL} ogUrl={document.URL} ogImage={thumbnail}>
      <Header />

      <HeroSection contact isSearch />
      <Spacing space={{ height: "5rem" }} />
      <Container>
        <div className={classes.supportWrapper}>
          <div>
            <div className={classes.supportTitle}>
              <Typography variant="h2">Software and Service :</Typography>
            </div>
            <Spacing space={{ height: "1rem" }} />
            <div>
              <Typography className={classes.description}>
                Our Team piktask 24/7 is dedicated to support our beloved Customers.We have a good support team to the client.if you need any assistance for any
                software or service.You can just Email us directly at : bdtask@gmail.com or info@bdtask.com or submit a ticket. Our Response time is 24 hours
                maximum.
              </Typography>
              <Spacing space={{ height: "3rem" }} />
              <div className={classes.termsTitle}>
                <Typography variant="h2">Submit a request </Typography>
              </div>
              <Spacing space={{ height: "1rem" }} />

              <form autoComplete="off" onSubmit={handleSubmit} className={classes.contactForm}>
                <FormControl fullWidth className={classes.fieldWrapper}>
                  <label htmlFor="name">
                    Name <span>*</span>
                  </label>
                  <TextField
                    id="name"
                    InputLabelProps={{ shrink: true }}
                    className={classes.inputField}
                    placeholder="Name"
                    variant="outlined"
                    fullWidth
                    // error={titleError}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>
                <FormControl fullWidth className={classes.fieldWrapper}>
                  <label htmlFor="email">
                    Email <span>*</span>
                  </label>
                  <TextField
                    id="email"
                    InputLabelProps={{ shrink: true }}
                    className={classes.inputField}
                    placeholder="Email"
                    variant="outlined"
                    fullWidth
                    // error={titleError}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>

                <FormControl fullWidth className={classes.fieldWrapper}>
                  <label htmlFor="license">
                    What your problem is about? <span>*</span>
                  </label>
                  <TextField
                    id="license"
                    className={classes.usagesInput}
                    select
                    label=""
                    variant="outlined"
                    value={subject}
                    onChange={handleSubjectChange}
                    SelectProps={{
                      native: true,
                    }}
                  >
                    {issueItem?.length > 0 &&
                      issueItem?.map((issueItemItem) => (
                        <option key={issueItemItem.id} value={issueItemItem.id}>
                          {issueItemItem?.name}
                        </option>
                      ))}
                  </TextField>
                </FormControl>
                <FormControl fullWidth className={classes.fieldWrapper}>
                  <label htmlFor="description">
                    Description <span>*</span>
                  </label>
                  <TextareaAutosize
                    id="description"
                    className={classes.formDescription}
                    aria-label="minimum height"
                    minRows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </FormControl>
                <Button variant="contained" className={classes.sentBtn} type="submit" disabled={isLoading}>
                  <FontAwesomeIcon icon={faEnvelope} className={classes.sentIcon} />
                  {isLoading ? "Sending..." : "Send"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Container>
      <Spacing space={{ height: "4rem" }} />
      <Footer />
    </Layout>
  );
};

export default Contact;
