/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
import AccessTime from '@mui/icons-material/AccessTime';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowLeft from '@mui/icons-material/ArrowLeft';
import ArrowRight from '@mui/icons-material/ArrowRight';
import Check from '@mui/icons-material/CheckCircle';
import Face from '@mui/icons-material/Face';
import Fingerprint from '@mui/icons-material/Fingerprint';
// import Eco from "@mui/icons-material/Eco";
import InsertPhoto from '@mui/icons-material/InsertPhoto';
import Nature from '@mui/icons-material/Nature';
// import Explore from "@mui/icons-material/Explore";
import Place from '@mui/icons-material/Place';
import Search from '@mui/icons-material/Search';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import Skeleton from '@mui/lab/Skeleton';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import expect from 'expect-runtime';
import log from 'loglevel';
import { makeStyles } from 'models/makeStyles';
import React from 'react';

import ImageShower from './ImageShower';
import Share from './Share';

const { CancelToken } = axios;
let source;

const treetrackerApiUrl = process.env.NEXT_PUBLIC_API;

const WIDTH = 396;
const MAX_WIDTH = 480;
const HEIGHT = 520;

const NONE = '--';

function domainSpecificData(treeDetail, property) {
  if (!treeDetail || !treeDetail.domain_specific_data) return undefined;
  return treeDetail.domain_specific_data[property];
}
function attribute(treeDetail, property) {
  if (!treeDetail || !treeDetail.attributes) return undefined;
  return treeDetail.attributes[property];
}

const useStyles = makeStyles()((theme) => ({
  placeholder: {
    position: 'absolute',
    height: '100vh',
    width: WIDTH,
    maxWidth: MAX_WIDTH,
    backgroundColor: '#d8d7d7',
    zIndex: 1,
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100vw - 22px)',
    },
    left: 0,
  },
  sidePaper: {
    position: 'absolute',
    height: '100%',
    width: WIDTH,
    maxWidth: MAX_WIDTH,
    backgroundColor: 'white',
    zIndex: 1,
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100vw - 22px)',
    },
  },
  progress: {
    position: 'absolute',
    width: '100%',
    zIndex: 9,
  },
  pictureBox: {
    position: 'relative',
  },
  backgroundBox: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 40,
    fontWeight: 700,
    fontFamily: 'roboto',
    // color: "#d4d4d4",
    color: '#bebcbc',
    letterSpacing: '1px',
    // textShadow: "1px 1px 2px #ffffff, -1px -1px 1px #4d4c4c",
    background: theme.palette.grey.A200,
    height: HEIGHT,
    [theme.breakpoints.down('sm')]: {
      height: `calc((100vw - 22px)/${WIDTH / HEIGHT})`,
    },
  },
  treePictureBox: {
    top: 0,
    left: 0,
    position: 'absolute',
    height: HEIGHT,
    overflow: 'hidden',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      height: `calc((100vw - 22px)/${WIDTH / HEIGHT})`,
    },
  },
  treePicture: {
    objectFit: 'fill',
    width: '100%',
    height: 'auto',
  },
  avatarPaper: {
    borderRadius: '50%',
  },
  avatar: {
    height: 108,
    width: 108,
    marginTop: -77,
    border: '6px solid white',
    backgroundColor: 'white',
  },
  avatarLogo: {
    backgroundColor: 'white',
    '& .MuiAvatar-img': {
      width: '70%',
      objectFit: 'unset',
    },
  },
  titleBox: {
    marginBottom: 15,
  },
  nameBox: {
    marginLeft: 15,
  },
  verify: {
    marginBottom: 15,
  },
  detailIcon: {
    fontSize: 20,
  },
  detailIconBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: 2,
    paddingRight: 7,
  },
  item: {},
  card: {
    height: '100%',
    overflow: 'scroll',
  },
  arrowBox: {
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 19,
    top: 0,
    height: HEIGHT,
    pointerEvents: 'none',
    [theme.breakpoints.down('sm')]: {
      height: `calc((100vw - 22px)/${WIDTH / HEIGHT})`,
    },
  },
  arrowIconBox: {
    pointerEvents: 'auto',
  },
  arrow: {
    color: 'white',
    fontSize: 36,
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 34,
    margin: -23,
    width: 23,
    height: 48,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    cursor: 'pointer',
    opacity: 0.8,
  },
  showButton: {
    position: 'absolute',
    left: 0,
    top: 34,
    margin: -23,
    marginLeft: 0,
    width: 23,
    height: 48,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    cursor: 'pointer',
    opacity: 0.8,
    zIndex: 2,
  },
  infoItem: {
    marginBottom: 10,
    '&>div': {
      marginRight: 5,
    },
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  hash: {
    width: 18,
    height: 18,
    background: '#212121',
    fontSize: 15,
  },
  name: {
    width: 18,
    height: 18,
    fontSize: 15,
    background: '#fff',
    color: 'black',
  },
  skeleton: {
    height: '100%',
    width: '100%',
  },
  colorBox: {
    width: 16,
    height: 16,
  },
  colorContainer: {
    height: '100%',
    paddingLeft: 10,
    paddingRight: 5,
  },
}));

function SidePanel(props) {
  const { classes } = useStyles();
  const { tree, state } = props;
  expect(state).oneOf(['none', 'show', 'hide']);
  const { hasPrev = true } = props;
  const { hasNext = true } = props;
  const [isTreePictureLoaded, setTreePictureLoaded] = React.useState(!tree);
  const [isBasePictureShown, setBasePictureShown] = React.useState(false);
  const [isLeafPictureShown, setLeafPictureShown] = React.useState(false);
  const [treeDetail, setTreeDetail] = React.useState(undefined);

  function handleClose() {
    props.onClose();
  }

  function handleShow() {
    props.onShow();
  }

  function handleLoad() {
    log.log('loaded....');
    setTreePictureLoaded(true);
  }

  function handleBasePictureClick() {
    setBasePictureShown(true);
  }

  function handleBasePictureClose() {
    setBasePictureShown(false);
  }

  function handleLeafPictureClick() {
    setLeafPictureShown(true);
  }

  function handleLeafPictureClose() {
    setLeafPictureShown(false);
  }

  React.useEffect(() => {
    log.log('tree changed');
    if (tree) {
      setTreePictureLoaded(false);
      setTreeDetail(undefined);
      source && source.cancel('clean previous request');
      source = CancelToken.source();
      axios
        .get(`${treetrackerApiUrl}tree?tree_id=${tree.id}`, {
          cancelToken: source.token,
        })
        .then((r) => {
          setTreeDetail(r.data);
          // if there isn't image, close load spin
          if (!r.data.image_url) {
            setTreePictureLoaded(true);
          }
        })
        .catch((thrown) => {
          if (axios.isCancel(thrown)) {
            // console.log('Request canceled', thrown.message);
          } else {
            throw thrown;
          }
        });
    }
  }, [props.tree]);

  /* update visibility of some list */
  React.useEffect(() => {
    document.querySelectorAll('.list-root').forEach((e) => {
      if (e.querySelector('.list-container').childElementCount === 0) {
        e.style.display = 'none';
      } else {
        e.style.display = 'flex';
      }
    });
  });

  if (tree === undefined) {
    return null;
  }

  return (
    <>
      <Slide
        in={state === 'show'}
        direction="right"
        timeout={{
          enter: 800,
          exit: 500,
        }}
      >
        <Paper square className={classes.sidePaper} elevation={8}>
          <div style={{ position: 'relative' }}>
            <Paper
              title="hide"
              onClick={handleClose}
              elevation={3}
              className={classes.closeButton}
            >
              <Grid
                container
                justify="center"
                alignItems="center"
                style={{ height: '100%' }}
              >
                <Grid item>
                  <ArrowLeft />
                </Grid>
              </Grid>
            </Paper>
          </div>
          <Card
            className={`${classes.card} ${
              isTreePictureLoaded ? 'treePictureLoaded' : 'treePictureLoading'
            }`}
          >
            {!isTreePictureLoaded && (
              <LinearProgress className={classes.progress} />
            )}
            <div className={classes.pictureBox}>
              <Grid container className={classes.backgroundBox}>
                <Box>GREENSTAND</Box>
              </Grid>
              <div className={classes.treePictureBox}>
                {treeDetail && treeDetail.image_url && (
                  <img
                    key={tree.id}
                    id="tree_img"
                    onLoad={handleLoad}
                    className={classes.treePicture}
                    alt="tree planted"
                    src={treeDetail.image_url}
                  />
                )}
              </div>
            </div>
            <Grid container className={classes.arrowBox}>
              <Grid item className={classes.arrowIconBox}>
                {hasPrev && (
                  <IconButton title="previous tree" onClick={props.onPrevious}>
                    <ArrowBackIosIcon className={classes.arrow} />
                  </IconButton>
                )}
              </Grid>
              <Grid item className={classes.arrowIconBox}>
                {hasNext && (
                  <IconButton title="next tree" onClick={props.onNext}>
                    <ArrowForwardIosIcon className={classes.arrow} />
                  </IconButton>
                )}
              </Grid>
            </Grid>
            <CardContent>
              <Grid container className={classes.titleBox}>
                <Grid item>
                  <Paper elevation={5} className={classes.avatarPaper}>
                    {treeDetail ? (
                      treeDetail.user_image_url ? (
                        <Avatar
                          id="planter-img"
                          className={`${classes.avatar}`}
                          src={
                            treeDetail.user_image_url.startsWith('http')
                              ? treeDetail.user_image_url
                              : `http://${treeDetail.user_image_url}`
                          }
                        />
                      ) : (
                        <Avatar
                          id="planter-img"
                          className={`${classes.avatar} ${classes.avatarLogo}`}
                          src="/images/greenstand_logo.svg"
                        />
                      )
                    ) : (
                      <Avatar
                        id="planter-img"
                        className={`${classes.avatar}`}
                      />
                    )}
                  </Paper>
                </Grid>
                <Grid item className={classes.nameBox}>
                  <Typography variant="h5">
                    {treeDetail &&
                      `${treeDetail.first_name || ''} ${
                        treeDetail.last_name?.slice(0, 1) || ''
                      }`}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container justify="space-between" alignItems="center">
                <Grid item>
                  {treeDetail && treeDetail.approved && (
                    <Grid container className={classes.verify}>
                      <Grid item className={classes.icon}>
                        <Check style={{ color: '#abe38f' }} />
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1">
                          Tree Verified{/* TODO wallet: token issued */}
                        </Typography>
                      </Grid>
                    </Grid>
                  )}
                  {treeDetail && treeDetail.token_uuid && (
                    <Grid container className={classes.verify}>
                      <Grid item className={classes.icon}>
                        <Check style={{ color: '#abe38f' }} />
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1">
                          Token issued
                        </Typography>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
                <Grid item>
                  {tree.id && (
                    <Share
                      shareUrl={`https://treetracker.org/?treeid=${tree.id}`}
                    />
                  )}
                </Grid>
              </Grid>
              <Divider />
              <Box height={15} />
              <Grid container className={classes.infoItem}>
                <Grid item className={classes.detailIconBox}>
                  <Tooltip title="Tree ID">
                    <Avatar className={`${classes.detailIcon} ${classes.hash}`}>
                      #
                    </Avatar>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Item title="Tree ID" prefix="#" value={tree.id} />
                </Grid>
              </Grid>
              {treeDetail && treeDetail.name && (
                <Grid container className={classes.infoItem}>
                  <Grid item className={classes.detailIconBox}>
                    <Tooltip title="Tree ID">
                      <Avatar
                        className={`${classes.detailIcon} ${classes.name}`}
                      >
                        <SentimentSatisfiedAltIcon />
                      </Avatar>
                    </Tooltip>
                  </Grid>
                  <Grid item>
                    <Item title="Name" prefix="" value={treeDetail.name} />
                  </Grid>
                </Grid>
              )}
              {!treeDetail && (
                <Grid container className={classes.skeleton}>
                  <Skeleton width="100%" animation="wave" />
                  <Skeleton width="100%" animation="wave" />
                  <Skeleton width="100%" animation="wave" />
                </Grid>
              )}
              {treeDetail && (
                <>
                  <List icon={AccessTime} tooltip="Create date">
                    <Item
                      title="Created at"
                      value={new Date(treeDetail.time_created).toLocaleString(
                        'en-US',
                      )}
                    />
                  </List>
                  <List icon={Face} tooltip="Wallet">
                    <Item
                      title="Impact Owner"
                      prefix="@"
                      value={treeDetail.wallet}
                    />
                  </List>
                  <List icon={Fingerprint} tooltip="Token assigned to the tree">
                    <Item
                      title="Token"
                      prefix=""
                      value={treeDetail.token_uuid}
                    />
                  </List>
                  <List icon={Place} tooltip="Location information">
                    <Item title="Lat" value={treeDetail.lat} />
                    <Item title="Lon" value={treeDetail.lon} />
                    <Item
                      title="Altitude"
                      value={domainSpecificData(
                        treeDetail,
                        '_coordinates_altitude',
                      )}
                    />
                  </List>
                  <List icon={Nature} tooltip="Tree information">
                    <Item
                      title="Species"
                      value={
                        treeDetail.species_name ||
                        domainSpecificData(treeDetail, 'tree_species')
                      }
                    />
                    <Item
                      title="DBH"
                      value={
                        domainSpecificData(treeDetail, 'diameter (cm)') ||
                        attribute(treeDetail, 'dbh')
                      }
                    />
                    {attribute(treeDetail, 'height_color') && (
                      <Grid container>
                        <Grid item>
                          <Typography className={classes.item} variant="body1">
                            Height:
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Grid
                            container
                            justify="center"
                            alignItems="center"
                            className={classes.colorContainer}
                          >
                            <div
                              className={classes.colorBox}
                              style={{
                                background: attribute(
                                  treeDetail,
                                  'height_color',
                                ),
                              }}
                            />
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Typography className={classes.item} variant="body1">
                            {attribute(treeDetail, 'height_color')}
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                    <Item
                      title="Tree Healthy"
                      value={domainSpecificData(treeDetail, 'tree_health')}
                    />
                    <Item
                      title="Proximity to"
                      value={domainSpecificData(treeDetail, 'threat to')}
                    />
                    <Item
                      title="Base Around Tree"
                      value={domainSpecificData(treeDetail, 'tree_base')}
                    />
                    <Item
                      title="Site"
                      value={domainSpecificData(treeDetail, 'tree_site')}
                    />
                    <Item
                      title="Functional Uses"
                      value={domainSpecificData(treeDetail, 'functional_uses')}
                    />
                  </List>
                  <List icon={InsertPhoto} tooltip="Tree images">
                    {treeDetail.images && treeDetail.images.picture_base_url && (
                      <Grid container>
                        <Grid item>
                          <Typography className={classes.item} variant="body1">
                            Base Picture:
                          </Typography>
                        </Grid>
                        <Grid item>
                          <IconButton
                            onClick={handleBasePictureClick}
                            size="small"
                            disableRipple
                            disableFocusRipple
                          >
                            <Search />
                            <ImageShower
                              src={treeDetail.images.picture_base_url}
                              title="Base picture"
                              onClose={handleBasePictureClose}
                              open={isBasePictureShown}
                              className={classes.imageIcon}
                            />
                          </IconButton>
                        </Grid>
                      </Grid>
                    )}
                    {treeDetail.images && treeDetail.images.picture_leaf_url && (
                      <Grid container>
                        <Grid item>
                          <Typography className={classes.item} variant="body1">
                            Leaf Picture:
                          </Typography>
                        </Grid>
                        <Grid item>
                          <IconButton
                            onClick={handleLeafPictureClick}
                            size="small"
                            disableRipple
                            disableFocusRipple
                          >
                            <Search />
                            <ImageShower
                              src={treeDetail.images.picture_leaf_url}
                              title="Leaf picture"
                              onClose={handleLeafPictureClose}
                              open={isLeafPictureShown}
                              className={classes.imageIcon}
                            />
                          </IconButton>
                        </Grid>
                      </Grid>
                    )}
                  </List>
                </>
              )}
            </CardContent>
          </Card>
        </Paper>
      </Slide>
      {state === 'hide' && (
        <div style={{ position: 'relative' }}>
          <Paper
            title="show"
            onClick={handleShow}
            elevation={3}
            className={classes.showButton}
          >
            <Grid
              container
              justify="center"
              alignItems="center"
              style={{ height: '100%' }}
            >
              <Grid item>
                <ArrowRight />
              </Grid>
            </Grid>
          </Paper>
        </div>
      )}
    </>
  );
}

function Item(props) {
  const { classes } = useStyles();
  if (!props.value) return null;
  return (
    <Typography className={classes.item} variant="body1">
      {props.title}: {props.prefix || ''}
      {props.value || NONE}
    </Typography>
  );
}

function List(props) {
  const { classes } = useStyles();

  return (
    <Grid container className={`${classes.infoItem} list-root`}>
      <Grid item className={classes.detailIconBox}>
        <Tooltip title={props.tooltip}>
          <props.icon className={classes.detailIcon} />
        </Tooltip>
      </Grid>
      <Grid item className="list-container">
        {props.children}
      </Grid>
    </Grid>
  );
}

SidePanel.WIDTH = WIDTH;

export default SidePanel;
