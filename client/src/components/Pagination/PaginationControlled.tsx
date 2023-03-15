import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import styles from './PaginationControlled.module.scss';
export default function PaginationControlled() {
   const [page, setPage] = React.useState(1);
   const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
   };

   return (
      <div className={styles.pagination}>
         <Stack spacing={2}>
            <Pagination
               count={10}
               size="large"
               color="primary"
               page={page}
               onChange={handleChange}
            />
         </Stack>
      </div>
   );
}
