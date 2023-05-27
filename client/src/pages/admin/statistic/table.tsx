import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import styles from './statistic.module.scss';
import { IMessageStatistic } from '~/shared/model/statistic';

interface ITableStats {
    data?: IMessageStatistic;
}

function createData(name: string, amount: number | undefined, rate: string | undefined) {
    return { name, amount, rate };
}

export default function BasicTable({ data }: ITableStats) {
    console.log(data);
    const rows = [
        createData('Lượt đăng kí trong quý', undefined, data?.registeredThisQuarterRate),
        createData(
            'Lượt đăng kí trong tháng',
            data?.registeredThisMonth,
            data?.registeredThisMonthRate,
        ),
        createData(
            'Lượt đăng kí trong tuần',
            data?.registeredThisWeek,
            data?.registeredThisWeekRate,
        ),
        createData('Lượt đăng kí trong ngày', data?.registeredToday, data?.registeredTodayRate),
    ];
    return (
        <div>
            <div className={styles.totalUsers}>
                Lượng người dùng
                <div className={styles.dataTotalUsers}>{data?.totalUsers}</div>
            </div>
            <TableContainer component={Paper} sx={{ marginBottom: '100px' }}>
                <Table
                    sx={{ minWidth: 650, borderTop: '3px solid #ffc96f' }}
                    aria-label="simple table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell className={styles.tableCellHead}>Lượt đăng kí</TableCell>
                            <TableCell className={styles.tableCellHead} align="right">
                                Số lượng
                            </TableCell>
                            <TableCell className={styles.tableCellHead} align="right">
                                Phần trăm tăng giảm&nbsp;(%)
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell
                                    className={styles.tableCellBody}
                                    component="th"
                                    scope="row"
                                >
                                    {row.name}
                                </TableCell>
                                <TableCell className={styles.tableCellBody} align="right">
                                    {row.amount}
                                </TableCell>
                                <TableCell className={styles.tableCellBody} align="right">
                                    {row.rate}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
