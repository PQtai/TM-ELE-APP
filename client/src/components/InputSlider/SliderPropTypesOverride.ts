import { SliderRoot } from '@mui/material/Slider';
import PropTypes from 'prop-types';
// @ts-ignore
SliderRoot.propTypes.ownerState = PropTypes.shape({
    'aria-label': PropTypes.string,
    'aria-labelledby': PropTypes.string,
    'aria-valuetext': PropTypes.string,
    classes: PropTypes.object,
    color: PropTypes.oneOf(['primary', 'secondary', 'brown']),
    defaultValue: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
    disabled: PropTypes.bool,
    getAriaLabel: PropTypes.func,
    getAriaValueText: PropTypes.func,
    isRtl: PropTypes.bool,
    marks: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.node,
                value: PropTypes.number.isRequired,
            }),
        ),
        PropTypes.bool,
    ]),
    max: PropTypes.number,
    min: PropTypes.number,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onChangeCommitted: PropTypes.func,
    orientation: PropTypes.oneOf(['horizontal', 'vertical']),
    scale: PropTypes.func,
    step: PropTypes.number,
    track: PropTypes.oneOf(['inverted', 'normal', false]),
    value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
    valueLabelDisplay: PropTypes.oneOf(['auto', 'off', 'on']),
    valueLabelFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
});
