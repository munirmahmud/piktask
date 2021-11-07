import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, CardContent, Grid, Typography } from "@material-ui/core";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { Box, LinearProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import fileThumbnail from "../../../../assets/icons/fileThumpnail.png";
import Footer from "../../../../components/ui/Footer";
import Layout from "../../../../Layout";
import useStyles from "./UploadFiles.styles";
import Sidebar from "../../../../components/ui/dashboard/Contributor/Sidebar";
import AdminHeader from "../../../../components/ui/dashboard/Contributor/Header";
import Heading from "../../../../components/ui/dashboard/Contributor/Heading";
import Spacing from "../../../../components/Spacing";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2">{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const UploadFiles = () => {
  const classes = useStyles();
  const history = useHistory();
  const user = useSelector((state) => state.user);

  const [description, setDescription] = useState("");
  const [imageError, setImageError] = useState("");

  const [isLoading, setLoading] = useState(false);
  let isUploadBtnDisabled = true;

  //for tag element
  const [tags, setTags] = useState([]);
  const [files, setFiles] = useState([]);
  const [thumbImage, setThumbImage] = useState("");
  const [menuSate, setMenuSate] = useState({ mobileView: false });
  const [isImageDimensionOkay, setImageDimensionOkay] = useState(false);
  const [progress, setProgress] = useState(0);

  const { mobileView } = menuSate;

  //mobile responsive
  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setMenuSate((prevState) => ({ ...prevState, mobileView: true }))
        : setMenuSate((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();
    window.addEventListener("resize", setResponsiveness);
  }, []);

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      accept: "image/*, .ai,.eps,.psd,.svg",
      noKeyboard: true,
      onDrop: (acceptedFiles) => {
        setThumbImage(acceptedFiles[0]);
        const fileData = acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );

        if (files.length === 0) {
          setFiles(fileData);
        } else {
          setFiles((prevFiles) => [...fileData, ...prevFiles]);
        }
      },
    });

  //reject file
  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <div className={classes.rejectFile} key={file.path}>
      {errors.map((e) => (
        <div className={classes.rejectFileTitle} key={e.code}>
          {e.message}
        </div>
      ))}
    </div>
  ));

  //upload file
  let tokenMatch = {};
  const uploadFile = (file) => {
    const chunkSize = 5242880;
    const url = `${process.env.REACT_APP_API_URL}/images/upload`;

    const element = file;
    const fileName = element.name.split(".")[0];

    let timer = null;
    // timer = setInterval(() => {
    //   setProgress((prevProgress) =>
    //     prevProgress >= 100 ? 10 : prevProgress + 10
    //   );
    // }, 600);

    return new Promise((resolve, reject) => {
      var fr = new FileReader();
      fr.onload = async (ev) => {
        const fileSize = ev.target.result.byteLength;

        if (fileSize < chunkSize) {
          const headers = {
            Authorization: user.token,
            "content-type": "application/octet-stream",
            "content-length": fileSize,
            start: true,
            end: true,
            "file-name": element.name,
          };

          if (tokenMatch[fileName]) {
            headers["token-id"] = tokenMatch[fileName];
          }

          axios({
            url,
            method: "POST",
            headers,
            data: ev.target.result,

            onUploadProgress: (progressEvent) => {
              const { loaded, total } = progressEvent;

              let percent = Math.round((loaded / total) * 100);
              setProgress(percent);
            },
          })
            .then((response) => {
              if (response.errors) {
                toast.error(response.errors, { autoClose: 500,});
                // return;
              } else if (response.status) {
                tokenMatch[fileName] = response.token_id;
                toast.success(
                  "File uploaded successfully. Please add your files meta."
                );

                setTimeout(() => {
                  setFiles([]);
                }, 600);
                resolve();
              }
            })
            .catch((error) => {
              console.log("Single file upload error", error);
              reject();
            });

          // try {
          //   const data = await fetch(url, {
          //     method: "POST",
          //     headers,
          //     body: ev.target.result,
          //   });

          //   const response = await data.json();

          //   console.log("response", response);
          //   if (response.errors) {
          //     toast.error(response.errors, { autoClose: 500,});
          //     // return;
          //   } else if (response.status) {
          //     tokenMatch[fileName] = response.token_id;
          //     resolve();
          //   }
          // } catch (error) {
          //   console.log("File upload error", error);
          //   reject();
          // }
        } else {
          let uploadId;
          for (let i = 0; i < fileSize / chunkSize + 1; i++) {
            const chunk = ev.target.result.slice(
              i * chunkSize,
              i * chunkSize + chunkSize
            );

            if (!i) {
              console.log("start");
              console.log("token match from 2nd con", tokenMatch);

              const headers = {
                Authorization: user.token,
                "content-type": "application/octet-stream",
                "content-length": chunk.byteLength,
                start: true,
                "file-name": element.name,
              };

              if (tokenMatch[fileName]) {
                headers["token-id"] = tokenMatch[fileName];
              }

              try {
                let response = await fetch(url, {
                  method: "POST",
                  headers,
                  body: chunk,
                });

                response = await response.json();
                tokenMatch[fileName] = response.token_id;
                uploadId = response.upload_id;
                console.log("response token 2nd", tokenMatch);
              } catch (error) {
                console.error(error);
                reject();
              }
            } else if (i === Math.ceil(fileSize / chunkSize + 1) - 1) {
              try {
                let response = await fetch(url, {
                  method: "POST",
                  headers: {
                    Authorization: user.token,
                    "content-type": "application/octet-stream",
                    "content-length": chunk.byteLength,
                    "upload-id": uploadId,
                    "part-number": i + 1,
                    "file-name": element.name,
                    end: true,
                  },
                  body: chunk,
                });
                response = await response.json();
                console.log("last response", response);
              } catch (error) {
                console.error(error);
              }
              console.log("last value", i);
            } else {
              console.log("middle");
              try {
                let response = await fetch(url, {
                  method: "POST",
                  headers: {
                    Authorization: user.token,
                    "content-type": "application/octet-stream",
                    "content-length": chunk.byteLength,
                    "upload-id": uploadId,
                    "part-number": i + 1,
                    "file-name": element.name,
                  },
                  body: chunk,
                });
                response = await response.json();
                console.log("middle response", response);
              } catch (error) {
                console.error(error);
              }
            }
          }
          resolve();
        }
      };
      fr.onerror = reject;
      fr.readAsArrayBuffer(element);
    });
  };

  const handleUpload = async (e) => {
    if (files.length === 0) {
      toast.error("Sorry, you did not upload any files.", { autoClose: 500,});
      return;
    }

    for (let i = 0; i < files.length; i++) {
      await uploadFile(files[i]);
    }
  };

  //ProgressBar
  // useCallback(() => {
  //   const timer = setInterval(() => {
  //     setProgress((prevProgress) =>
  //       prevProgress >= 100 ? 10 : prevProgress + 10
  //     );
  //   }, 800);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [progress]);

  //remove file function
  const removeFile = (file, itemIndex) => {
    const index = files.indexOf(file);
    files.splice(index, 1);
    setFiles((prevFiles) => [...prevFiles]);
  };

  const isActive = isDragActive && "2px dashed #26AA10";

  function checkFileSize(file) {
    let fileStatus = [];

    files?.map((file) => {
      if (
        (file.name.match(/\.(jpg|jpeg|png|gif)$/) && file.size < 524288) ||
        file.size > 83886080 ||
        (file.name.match(/\.(eps)$/) && file.size > 83886080) ||
        (file.name.match(/\.(psd)$/) && file.size < 1572864)
      ) {
        fileStatus.push(true);
        isUploadBtnDisabled = false;
        return;
      } else {
        fileStatus.push(false);
        isUploadBtnDisabled = true;
        return;
      }
    });

    const checkFile = fileStatus.find((item) => item === true);

    if (fileStatus.length > 0) {
      if (checkFile) {
        isUploadBtnDisabled = true;
        return true;
      } else {
        isUploadBtnDisabled = false;
        return false;
      }
    }
  }

  const getUploadFiles = () => {
    checkFileSize();

    return files?.map((file, index) => (
      <div className="files-wrapper" key={file.name}>
        {(file.name.match(/\.(jpg|jpeg|png|gif)$/) && file.size < 524288) ||
        file.size > 83886080 ||
        (file.name.match(/\.(eps)$/) && file.size > 83886080) ||
        (file.name.match(/\.(psd)$/) && file.size < 1572864) ? (
          <div className={classes.thumbError}>
            <div className={classes.thumbInnerError}>
              <div className={classes.thumbImg}>
                {file?.name?.match(/\.(ai|eps|psd|svg)$/) ? (
                  <img
                    src={fileThumbnail}
                    alt="thumbnail"
                    className={classes.fileThumbnail}
                  />
                ) : (
                  <img src={file.preview} alt="thumbnail" />
                )}
              </div>
              <Typography className={classes.imageTitleError}>
                {file.name} <br />{" "}
                <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
              </Typography>

              <Box className={classes.progressBar}>
                <LinearProgressWithLabel value={progress} />
              </Box>
              <div
                className={classes.deleteBtnError}
                onClick={(e) => removeFile(file, index)}
              >
                <FontAwesomeIcon
                  className={classes.deleteIcon}
                  icon={faTrashAlt}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className={classes.thumb}>
            <div className={classes.thumbInner}>
              <div className={classes.thumbImg}>
                {file?.name?.match(/\.(ai|eps|psd|svg)$/) ? (
                  <img
                    src={fileThumbnail}
                    alt="thumbnail"
                    className={classes.fileThumbnail}
                  />
                ) : (
                  <img src={file.preview} alt="thumbnail" />
                )}
              </div>
              <Typography className={classes.imageTitle}>
                {file.name} <br />{" "}
                <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
              </Typography>

              <Box className={classes.progressBar}>
                <LinearProgressWithLabel value={progress} />
              </Box>
              <div
                className={classes.deleteBtn}
                onClick={(e) => removeFile(file, index)}
              >
                <FontAwesomeIcon
                  className={classes.deleteIcon}
                  icon={faTrashAlt}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    ));
  };

  return (
    <Layout title="Upload | Piktask">
      <div className={classes.adminRoot}>
        {mobileView ? null : <Sidebar className={classes.adminSidebar} />}

        <main className={classes.content}>
          <AdminHeader />
          <div className={classes.uploadContainer}>
            <Heading className={classes.contentTypeTitle} tag="h2">
              What type of content are you going to upload?
            </Heading>
            <Card className={classes.cardRoot}>
              <CardContent className={classes.cardContent}>
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    className={classes.imageTypeGrid}
                  >
                    <div className={classes.checkboxCol}>
                      {/* <Heading tag="h4"></Heading> */}
                      <Typography variant="h2">Vectors</Typography>
                      <div className={classes.labelItem}>
                        <CheckCircleRoundedIcon />
                        <Typography>
                          EPS and a JPG preview file (with the same name) up to
                          80MB
                        </Typography>
                      </div>
                      <div className={classes.labelItem}>
                        <CheckCircleRoundedIcon />
                        <Typography>RGB Color</Typography>
                      </div>
                      <div className={classes.labelItem}>
                        <CheckCircleRoundedIcon />
                        <Typography>
                          Preview files must be between 2000px and 10000px on
                          any of the sides.
                        </Typography>
                      </div>
                      <div className={classes.labelItem}>
                        <CheckCircleRoundedIcon />
                        <Typography>
                          Titles and tags can be included in preview file. How
                          can I do this?
                        </Typography>
                      </div>
                    </div>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    className={classes.imageTypeGrid}
                  >
                    <div className={classes.checkboxCol}>
                      <Heading tag="h2">PSD</Heading>

                      <div className={classes.labelItem}>
                        <CheckCircleRoundedIcon />
                        <Typography>
                          PSD between 1.5MB and 250MB and a JPG preview file
                          (with the same name)
                        </Typography>
                      </div>
                      <div className={classes.labelItem}>
                        <CheckCircleRoundedIcon />
                        <Typography>
                          Color: sRGB, Adobe RGB, Prophoto RGB or P3
                        </Typography>
                      </div>
                      <div className={classes.labelItem}>
                        <CheckCircleRoundedIcon />
                        <Typography>
                          Preview files must be between 2000px and 10000px on
                          any of the sides.
                        </Typography>
                      </div>
                      <div className={classes.labelItem}>
                        <CheckCircleRoundedIcon />
                        <Typography>
                          Titles and tags can be included in preview file. How
                          can I do this?
                        </Typography>
                      </div>
                    </div>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    className={classes.imageTypeGrid}
                  >
                    <div>
                      <Heading tag="h2">Photos</Heading>

                      <div className={classes.labelItem}>
                        <CheckCircleRoundedIcon />
                        <Typography>Only JPG files Over 0.5MB</Typography>
                      </div>
                      <div className={classes.labelItem}>
                        <CheckCircleRoundedIcon />
                        <Typography>
                          Color: sRGB, Adobe RGB, Prophoto RGB or P3
                        </Typography>
                      </div>
                      <div className={classes.labelItem}>
                        <CheckCircleRoundedIcon />
                        <Typography>
                          Photos must be between 2000px and 10000px on any of
                          the sides.
                        </Typography>
                      </div>
                      <div className={classes.labelItem}>
                        <CheckCircleRoundedIcon />
                        <Typography>
                          Titles and tags can be included in preview file. How
                          can I do this?
                        </Typography>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Spacing space={{ height: "2.5rem" }} />
            <Heading tag="h2">Upload Your Content</Heading>

            <label
              htmlFor="btn-upload"
              className={classes.fileUploadContainer}
              {...getRootProps({
                onClick: (e) =>
                  (e.currentTarget.style.border = "2px dashed #26AA10"),
              })}
              style={{ border: isActive }}
            >
              <div className={classes.uploadIconWrapper}>
                <input
                  {...getInputProps({
                    multiple: true,
                  })}
                />
                <FontAwesomeIcon icon={faCloudUploadAlt} />

                <h2 className={classes.imageErrorText}>{imageError}</h2>

                <Typography className={classes.photoUploadText} variant="body1">
                  Drag and drop or click to upload an photo
                </Typography>

                {isImageDimensionOkay ? (
                  <Typography
                    className={classes.subtitle}
                    variant="body1"
                    // style={{ color: "red" }}
                  >
                    Your image dimension exceeds the limit. Preview files must
                    be between 2000px and 10000px on any of the sides.
                  </Typography>
                ) : (
                  <Typography className={classes.subtitle} variant="body1">
                    Preview files must be between 2000px and 10000px on any of
                    the sides.
                  </Typography>
                )}
              </div>
            </label>

            {!isImageDimensionOkay}

            {getUploadFiles()}

            <div className={classes.singleBorder}></div>
            <div className={classes.uploadBtnRoot}>
              <div className={classes.rejectFileWrapper}>
                {fileRejectionItems}
              </div>
              <Button
                variant="contained"
                className={classes.uploadBtn}
                type="submit"
                disabled={isUploadBtnDisabled}
                onClick={handleUpload}
              >
                <FontAwesomeIcon
                  icon={faCloudUploadAlt}
                  className={classes.uploadIcon}
                />
                {isLoading ? "Uploading..." : "Upload"}
              </Button>
            </div>
          </div>

          <Spacing space={{ height: "2rem" }} />
          <Footer />
        </main>
      </div>
    </Layout>
  );
};

export default UploadFiles;