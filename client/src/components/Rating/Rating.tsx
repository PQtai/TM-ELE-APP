import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

export default function BasicRating({ readOnly = false, sumRating = 3.5 }) {
   const [value, setValue] = React.useState<number | null>(null);

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
