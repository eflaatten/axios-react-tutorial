import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faHeart } from "@fortawesome/free-solid-svg-icons";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function MuiCardBrewery(props) {
  const [isLiked, setIsLiked] = React.useState(props.isLiked || false)
  const [showCopyMessage, setShowCopyMessage] = React.useState(false)
  const [expanded, setExpanded] = React.useState(false);
  const {
    breweryName,
    breweryAddress,
    breweryCity,
    breweryState,
    breweryWebsite
  } = props;


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLike = () => {
    setIsLiked(!isLiked)
    props.handleLike(props.index)
  }

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(breweryWebsite)
    .then(() => {
      setShowCopyMessage(true)
      setTimeout(() => setShowCopyMessage(false), 2000)
    })
    .catch(error => {
      console.error("Error copying: ", error)
    })
  }

  return (
    <Card
      sx={{
        maxWidth: 510,
        borderRadius: "5px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.6)",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label='settings'>
            <MoreVertIcon />
          </IconButton>
        }
        title={breweryName}
        subheader={new Date().toLocaleDateString()}
      />

      <CardMedia
        component='iframe'
        src={breweryWebsite}
        title={breweryName}
        height='400'
        padding='10px'
      />
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          {breweryCity}, {breweryState}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites' onClick={handleLike}>
          <FavoriteIcon
            style={{
              color: isLiked ? "red" : "white",
            }}
          />
        </IconButton>

        <IconButton aria-label='share'>
          <ShareIcon />
        </IconButton>

        <div style={{ position: "relative" }}>
          {showCopyMessage && (
            <div
              style={{
                position: "absolute",
                top: "-20px",
                right: "20px",
                padding: "3px",
                borderRadius: "3px",
                fontSize: "10px",
                boxShadow: "0px 0px 5px rgba(0,0,0,0.2)",
              }}
            >
              URL copied!
            </div>
          )}
          <IconButton aria-label='url' onClick={handleCopyUrl}>
            <FontAwesomeIcon icon={faLink} />
          </IconButton>
        </div>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <Typography paragraph>Details:</Typography>

          <Typography paragraph>
            Address: {breweryAddress || "Unavailable"}
          </Typography>

          <Typography paragraph>
            Location: {breweryCity}, {breweryState}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}