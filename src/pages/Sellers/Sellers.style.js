import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    productItem: {
      "@media (max-width: 576px)": {
        maxWidth: "100%",
        flexBasis: "100%",
      },
    },
    catItemWrapper: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        width: "100%",
      },
      catImage: {
        cursor: "pointer",
        width: "100%",
        height: "200px",
        objectFit: "cover",
      },
      catName: {
        marginTop: "-3px",
        zIndex: "99",
        backgroundColor: "#ffffff",
        color: "#333333",
        fontSize: "1.9rem",
        height: "50px",
        width: "100%",
        borderRadius: 0,
      },
}));

export default useStyles;
