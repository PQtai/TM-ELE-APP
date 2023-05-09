import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './SliderPropTypesOverride';
import Slider from '@mui/material/Slider';

const defaultTheme = createTheme();

const theme = createTheme({
    palette: {
        brown: defaultTheme.palette.augmentColor({
            color: {
                main: '#ffc96f;',
            },
            name: 'brown',
        }),
    },
});

interface IPropsInputSlider {
    type: string;
    max: number;
    min: number;
    value: number[];
    step: number;
    handleChange: (event: Event, newValue: number | number[], activeThumb: number) => void;
}

export default function InputSlider({
    type,
    step,
    max,
    min,
    value,
    handleChange,
}: IPropsInputSlider) {
    return (
        <ThemeProvider theme={theme}>
            <p>
                {type} từ {value[0]} đến {value[1]} {type === 'Giá' ? 'triệu đồng' : 'm2'}
            </p>
            <Slider
                onClick={(e) => {
                    e.preventDefault();
                }}
                color="brown"
                marks
                step={step}
                getAriaLabel={() => 'Minimum distance'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                disableSwap
                min={min}
                max={max}
            />
        </ThemeProvider>
    );
}
