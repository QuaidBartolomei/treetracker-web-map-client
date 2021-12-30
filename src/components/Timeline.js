import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import TimelapseTwoToneIcon from '@mui/icons-material/TimelapseTwoTone';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Slider from '@mui/material/Slider';
import Tooltip from '@mui/material/Tooltip';
import log from 'loglevel';
import { makeStyles, withStyles } from 'models/makeStyles';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

const TimelineSlider = withStyles(Slider, {
  root: {
    color: '#85c232',
    height: 8,
    '& .MuiSlider-markLabel': {
      color: 'white',
    },
    '& .MuiSlider-markLabelActive': {
      color: 'white',
    },
    '& .MuiSlider-markActive': {
      backgroundColor: 'transparent',
      display: 'none',
    },
    '& .MuiSlider-mark': {
      backgroundColor: 'transparent',
      display: 'none',
    },
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff', // white
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
});

const useStylesTooltip = makeStyles()(() => ({
  popper: {
    opacity: 0.5,
  },
}));

function ValueLabelComponent(props) {
  const { children, open, value } = props;
  const { index } = props;
  const classes = useStylesTooltip();

  return (
    <Tooltip
      open={open}
      classes={{ popper: classes.popper }}
      enterTouchDelay={0}
      placement={index === 0 ? 'top' : 'bottom'}
      title={value}
    >
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};

const useStyles = makeStyles()((theme) => ({
  root: {
    background:
      'linear-gradient(90deg, rgba(2,0,36,0.70) 10%, rgba(11,11,94,0.41360294117647056) 19%, rgba(203,209,209,0) 37%)',
    height: '75px',
    width: '40%',
    color: 'white',
    // 'user-select': "none",
    pointerEvents: 'none',
    zIndex: 9,
    position: 'fixed',
    bottom: 13,
    [theme.breakpoints.down('xs')]: {
      left: -5,
      bottom: 40,
    },
  },
  box1: {
    pointerEvents: 'none',
    width: theme.spacing(80),
    flexWrap: 'nowrap',
  },
  box2: {
    pointerEvents: 'all',
    padding: theme.spacing(1),
  },
  box3: {
    pointerEvents: 'all',
    minWidth: theme.spacing(120),
    [theme.breakpoints.down('xs')]: {
      minWidth: theme.spacing(40),
    },
  },
}));

const dayRange = Math.round(
  moment.duration(moment().diff(moment('2015-01-01'))).as('d'),
);

const marks = ['2015', '2017', '2019', '2021'].map((e) => ({
  label: e,
  value: Math.round(
    moment.duration(moment(`${e}-01-01`).diff(moment(`2015-01-01`))).as('d'),
  ),
}));

function valuetext(value) {
  return moment('2015-01-01').add(value, 'days').format('YYYY-MM-DD');
}

function textvalue(begin, end) {
  return [
    Math.round(
      moment.duration(moment(begin).diff(moment('2015-01-01'))).as('d'),
    ),
    Math.round(moment.duration(moment(end).diff(moment('2015-01-01'))).as('d')),
  ];
}

function Timeline(props) {
  const { classes } = useStyles();
  const [slide, setSlide] = React.useState(false);
  const [value, setValue] = React.useState([0, dayRange]);
  const { onClose, onDateChange, date } = props;

  function handleClick() {
    setSlide(!slide);

    /* Hidden the Timeline title  */
    document.getElementById('txtTimeline').style.display = 'none';

    if (slide) {
      /* Show up the Timeline title */
      document.getElementById('txtTimeline').style.display = '';

      setValue([0, dayRange]);
      onClose && onClose();
    }
  }

  // console.warn('value:', value);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeCommitted = (unusedEvent, newValue) => {
    log.debug('trigger change commit:', newValue);
    onDateChange && onDateChange(newValue.map((e) => valuetext(e)));
  };

  React.useEffect(() => {
    if (date) {
      setSlide(true);
      setValue(textvalue(...date));
    }
  }, [date]);

  return (
    <div className={classes.root}>
      <Grid container alignItems="center" className={classes.box1}>
        <Grid item className={classes.box2}>
          <Tooltip title="Timeline">
            <IconButton id="iconButton" onClick={handleClick}>
              {slide ? (
                <CancelTwoToneIcon fontSize="large" color="secondary" />
              ) : (
                <TimelapseTwoToneIcon fontSize="large" color="secondary" />
              )}
            </IconButton>
          </Tooltip>
        </Grid>

        <Grid item className={classes.box3}>
          <span id="txtTimeline" className="text">
            Timeline
          </span>
          {slide && (
            <TimelineSlider
              min={0}
              max={dayRange}
              value={value}
              onChange={handleChange}
              onChangeCommitted={handleChangeCommitted}
              aria-labelledby="range-slider"
              getAriaValueText={valuetext}
              valueLabelFormat={valuetext}
              marks={marks}
              valueLabelDisplay="on"
              ValueLabelComponent={ValueLabelComponent}
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default Timeline;
