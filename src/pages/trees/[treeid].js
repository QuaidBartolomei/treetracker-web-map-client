import AccessTime from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LanguageIcon from '@mui/icons-material/Language';
import NavigationOutlinedIcon from '@mui/icons-material/NavigationOutlined';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CustomImageWrapper from 'components/common/CustomImageWrapper';
import log from 'loglevel';
import { makeStyles } from 'models/makeStyles';
import React from 'react';

import TreeTag from '../../components/common/TreeTag';
import InformationCard1 from '../../components/InformationCard1';
import PageWrapper from '../../components/PageWrapper';
import VerifiedBadge from '../../components/VerifiedBadge';
import { useMapContext } from '../../mapContext';

const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  imageContainer: {
    position: 'relative',
    flexGrow: 1,
    width: '100%',
    marginTop: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  badges: {
    marginTop: 8,
    '&>*': {
      marginRight: 8,
    },
  },
  informationCard: {
    marginTop: theme.spacing(10),
    width: '100%',
  },
  tabBox: {
    marginTop: theme.spacing(9),
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(5),
    },
    flexWrap: 'wrap',
    display: 'flex',
    '& div': {
      margin: theme.spacing(1),
    },
  },
}));

export default function Tree({ tree, planter, organization }) {
  const { classes } = useStyles();
  const mapContext = useMapContext();
  console.log(tree);

  log.warn('map:', mapContext);

  React.useEffect(() => {
    // manipulate the map
    if (mapContext.map && tree?.lat && tree?.lon) {
      mapContext.map.flyTo(tree.lat, tree.lon, 16);
    }
  }, [mapContext.map]);

  return (
    <PageWrapper className={classes.root}>
      <Typography sx={{ color: 'textPrimary.main' }} variant="h2">
        Tree{/* tree.species */} - #{tree.id}
      </Typography>
      <Typography
        sx={{ color: 'textPrimary.main', fontWeight: 300 }}
        variant="h5"
      >
        Eco-Peace-Vision
      </Typography>
      <Box className={classes.badges}>
        <VerifiedBadge verified={tree.verified} badgeName="Tree Verified" />
        <VerifiedBadge verified={tree.token_id} badgeName="Token Issued" />
      </Box>
      <CustomImageWrapper
        imageUrl={tree.photo_url}
        timeCreated={tree.time_created}
        likes={20}
      />
      <Box className={classes.informationCard}>
        <InformationCard1
          entityName={organization.name}
          entityType="Planting Organization"
          buttonText="Meet the Organization"
          cardImageSrc={organization?.photo_url}
          link={`/organizations/${organization.id}`}
        />
      </Box>
      <Box className={classes.informationCard}>
        <InformationCard1
          entityName={`${planter.first_name} ${planter.last_name}`}
          entityType="Planter"
          buttonText="Meet the Planter"
          cardImageSrc={planter?.photo_url}
          link={`/planters/${planter.id}`}
        />
      </Box>
      <Typography
        variant="h4"
        sx={{ color: 'textPrimary.main', mt: { xs: 14, md: 26 } }}
      >
        Tree Info
      </Typography>
      <Box className={classes.tabBox}>
        <TreeTag
          TreeTagValue={new Date(tree.time_created).toLocaleDateString()}
          title="Planted on"
          icon={<CalendarTodayIcon />}
        />
        <TreeTag
          TreeTagValue="Tanzania"
          title="Located in"
          icon={<RoomOutlinedIcon />}
        />
        {tree.age && (
          <TreeTag TreeTagValue={tree.age} title="Age" icon={<AccessTime />} />
        )}
        {tree.gps_accuracy && (
          <TreeTag
            TreeTagValue={tree.gps_accuracy}
            title="GPS Accuracy"
            icon={<NavigationOutlinedIcon />}
          />
        )}
        {tree.lat && tree.lon && (
          <TreeTag
            TreeTagValue={`${tree.lat}, ${tree.lon}`}
            title="Latitude, Longitude"
            icon={<LanguageIcon />}
          />
        )}
        {tree.token_id && (
          <TreeTag
            TreeTagValue={tree.token_id}
            title="Token ID"
            icon={<AccessTime />}
          />
        )}
      </Box>
    </PageWrapper>
  );
}

export async function getServerSideProps({ params }) {
  log.warn('params:', params);
  log.warn('host:', process.env.NEXT_PUBLIC_API_NEW);

  const props = {};
  {
    const url = `${process.env.NEXT_PUBLIC_API_NEW}/trees/${params.treeid}`;
    log.warn('url:', url);

    const res = await fetch(url);
    const tree = await res.json();
    log.warn('response:', tree);
    props.tree = tree;
  }
  {
    const url = `${process.env.NEXT_PUBLIC_API_NEW}/planters/${props.tree.planter_id}`;
    log.warn('url:', url);

    const res = await fetch(url);
    const planter = await res.json();
    log.warn('response:', planter);
    props.planter = planter;
  }
  {
    const url = `${process.env.NEXT_PUBLIC_API_NEW}/organizations/${props.tree.planting_organization_id}`;
    log.warn('url:', url);

    const res = await fetch(url);
    const organization = await res.json();
    log.warn('response:', organization);
    props.organization = organization;
  }

  return {
    props,
  };
}
