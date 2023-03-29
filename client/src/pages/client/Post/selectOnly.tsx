import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { setOtherInfo } from './post.reducer';
import styles from './post.module.scss';

interface IPropsTitleSelect {
   title: string;
}

const listOtherInfos = [
   {
      mess: 'Nội thất cao cấp',
      code: 1,
   },
   {
      mess: 'Nội thất đầy đủ',
      code: 2,
   },
   {
      mess: 'Nội thất nhà trống',
      code: 0,
   },
];

export default function SelectOnly({ title }: IPropsTitleSelect) {
   const otherInfo = useAppSelector((state) => state.postSlice.initialState.otherInfo);
   const dispatch = useAppDispatch();
   const handleChange = (event: SelectChangeEvent) => {
      dispatch(setOtherInfo(event.target.value));
   };

   return (
      <FormControl
         className={styles.selectOnly}
         size="medium"
         sx={{ m: 1, minWidth: '100%', margin: '0' }}
      >
         <InputLabel id="demo-simple-select-helper-label">{title}</InputLabel>
         <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={otherInfo?.toString() || ''}
            label={title}
            onChange={handleChange}
         >
            <MenuItem value="">
               <em>Trống</em>
            </MenuItem>
            {listOtherInfos?.map((itemOtherInfo, index) => {
               return (
                  <MenuItem key={index} value={itemOtherInfo.code}>
                     {itemOtherInfo.mess}
                  </MenuItem>
               );
            })}
         </Select>
      </FormControl>
   );
}
