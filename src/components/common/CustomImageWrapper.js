import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import OpenWithOutlinedIcon from '@mui/icons-material/OpenWithOutlined';
import { Box, Grid, Link, Typography } from '@mui/material';
import { makeStyles } from 'models/makeStyles';
import { formatDateString } from 'models/utils';
import React, { useMemo, useState } from 'react';

const useStyles = makeStyles()((theme) => ({
  container: {
    width: '672px',
    height: '628px',
    maxWidth: '100%',
    borderRadius: '16px',
    position: 'relative',
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('md')]: {
      height: '328px',
    },
  },
  image: {
    zIndex: 0,
    width: '100%',
    height: '100%',
    position: 'relative',
    objectFit: 'cover',
    borderRadius: '16px',
  },
}));

function InfoWrapper({ children, top, right, bottom }) {
  return (
    <Box
      ml={3}
      mr={2}
      p={4}
      sx={{
        bgcolor: 'textPrimary.main',
        opacity: 0.8,
        borderRadius: '16px',
        position: 'absolute',
        height: 'auto',
        top,
        right,
        bottom,
        zIndex: 1,
      }}
    >
      {children}
    </Box>
  );
}

function CustomImageWrapper({ imageUrl, timeCreated, likes }) {
  const { classes } = useStyles();

  const formattedDate = useMemo(
    () => formatDateString(timeCreated),
    [timeCreated],
  );

  const [isShown, setIsShown] = useState(false);

  const handleHoverEnter = () => {
    setIsShown(true);
  };
  const handleHoverLeave = () => {
    setIsShown(false);
  };
  return (
    <Box
      className={classes.container}
      onMouseEnter={() => handleHoverEnter()}
      onMouseLeave={() => handleHoverLeave()}
    >
      {isShown && (
        <InfoWrapper top={20}>
          <Grid
            container
            justifyContent="space-around"
            alignItems="center"
            flexWrap="nowrap"
            columnGap={5}
            width="100%"
            height="100%"
          >
            <CameraAltOutlinedIcon
              sx={{
                color: 'common.white',
              }}
              fontSize="large"
            />
            <Grid item xs={12}>
              <Typography variant="caption" color="white">
                Photo taken on
              </Typography>
              <Typography variant="h6" color="white">
                {formattedDate}
              </Typography>
            </Grid>
          </Grid>
        </InfoWrapper>
      )}
      {isShown && (
        <InfoWrapper top={20} right={3}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
          >
            <Link
              target="_blank"
              rel="noopener"
              href={imageUrl}
              underline="none"
              color="white"
              sx={[
                {
                  '&:hover': {
                    color: 'common.white',
                  },
                },
              ]}
            >
              <OpenWithOutlinedIcon
                sx={{
                  color: 'common.white',
                }}
                fontSize="large"
              />
            </Link>
          </Grid>
        </InfoWrapper>
      )}
      {isShown && (
        <InfoWrapper bottom={20}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            columnGap={2}
            width="100%"
            height="100%"
          >
            <FavoriteBorderOutlinedIcon
              sx={{ color: 'common.white', cursor: 'pointer' }}
              fontSize="large"
            />
            <Typography color="white">{likes}</Typography>
          </Grid>
        </InfoWrapper>
      )}
      <img src={imageUrl} alt="tree" className={classes.image} />
    </Box>
  );
}
export default CustomImageWrapper;
