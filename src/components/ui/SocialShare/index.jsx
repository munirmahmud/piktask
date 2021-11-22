import { List } from "@material-ui/core";
import React from "react";
import useStyles from "./SocialShare.styles";

const SocialShare = (props) => {
  const classes = useStyles();
  const { socials, copyRightSocial } = props;

  return (
    <div className={classes.container}>
      <List>
        {socials?.length > 0 &&
          socials?.map((media, index) => (
            <>
              {media.socialUrl && (
                <a key={index} href={media.socialUrl} target="_blank" rel="noreferrer">
                  <img className={copyRightSocial ? `${classes.socialIcon}` : `${classes.socialMedia}`} src={media.socialIcon} alt={media.socialUrl} />
                </a>
              )}
            </>
          ))}
      </List>
    </div>
  );
};

export default SocialShare;
