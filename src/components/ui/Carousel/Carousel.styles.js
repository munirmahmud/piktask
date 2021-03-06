import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  carouselWrapper: {
    marginBottom: "3rem",

    "& .slick-list": {
      margin: "0 0px",
    },
    "& .slick-slide > div": {
      // margin: "0 5px",
    },

    "& .slick-arrow": {
      position: "absolute",
      top: "50%",
      transform: "translateY(-60.4%)",
      zIndex: "1",
      color: "#1B3F4E",
      height: "83%",
      width: 150,
      cursor: "pointer",

      "& .MuiSvgIcon-root": {
        color: "rgb(20 51 64 / 94%)",
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        fontSize: "3.5rem",
        background: "#ddd",
        borderRadius: "50%",
      },
    },
    "& .slick-prev": {
      left: 0,
      background:
        "linear-gradient(90deg, rgba(0,0,0,0.7206232834930848) 0%, rgba(0,0,0,0) 100%)",
      "& .MuiSvgIcon-root": {
        left: "15%",
        transition: "all 0.3s linear",
      },
      "&:hover .MuiSvgIcon-root": {
        backgroundColor: "#0088f2",
        color: "white",
      },
    },
    "& .slick-next": {
      right: "-2px",
      background:
      "linear-gradient(-90deg, rgba(0,0,0,0.7206232834930848) 0%, rgba(0,0,0,0) 100%)",
      "& .MuiSvgIcon-root": {
        right: "15%",
        transition: "all 0.3s linear",
      },
      "&:hover .MuiSvgIcon-root": {
        backgroundColor: "#0088f2",
        color: "white",
      },
    },
  },
}));

export default useStyles;
