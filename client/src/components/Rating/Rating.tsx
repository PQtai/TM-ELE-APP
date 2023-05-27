import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

interface IPropsRating {
    readOnly?: boolean;
    sumRating?: number;
    handelSetRating?: (rating: number) => void;
}

export default function BasicRating({
    readOnly = false,
    sumRating,
    handelSetRating,
}: IPropsRating) {
    const [value, setValue] = React.useState<number | null>(null);
    React.useEffect(() => {
        if (value && handelSetRating) {
            handelSetRating(value);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
    return (
        <Box
            sx={{
                '& > legend': { mt: 2 },
            }}
        >
            {readOnly ? (
                <Rating name="half-rating-read" defaultValue={sumRating} precision={0.5} readOnly />
            ) : (
                <Rating
                    size="large"
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                />
            )}
        </Box>
    );
}
