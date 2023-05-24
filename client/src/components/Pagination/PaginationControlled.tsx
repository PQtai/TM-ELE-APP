import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import styles from './PaginationControlled.module.scss';
import { useAppDispatch } from '~/config/store';
import { setPageNumber } from '~/pages/admin/accountManager/accountManager.reducer';

interface IPropsTotalPage {
    totalPages?: number;
}

export default function PaginationControlled({ totalPages }: IPropsTotalPage) {
    const [page, setPage] = React.useState(1);
    const dispatch = useAppDispatch();
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        dispatch(setPageNumber(value));
    };

    return (
        <div className={styles.pagination}>
            <Stack spacing={2}>
                <Pagination
                    count={totalPages}
                    size="large"
                    color="primary"
                    page={page}
                    onChange={handleChange}
                />
            </Stack>
        </div>
    );
}
