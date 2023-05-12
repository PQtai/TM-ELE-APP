import styles from './ModalPriceAndArea.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import InputSlider from '../InputSlider/InputSlider';
import { useAppDispatch } from '~/config/store';
import { setInfoFilterPriceAndAcreage } from '~/pages/client/ListPostSearch/listPostSearch.reducer';
const minDistance = 5;
const minDistanceAcreage = 5;

const ModalPriceAndArea = () => {
    const handleCloseModal = () => {};
    const dispatch = useAppDispatch();
    const [valuePrice, setValuePrice] = useState<number[]>([0, 200]);
    const [valueAcreage, setValueAcreage] = useState<number[]>([5, 1000]);

    const handleChangePrice = (event: Event, newValue: number | number[], activeThumb: number) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValuePrice([Math.min(newValue[0], valuePrice[1] - minDistance), valuePrice[1]]);
        } else {
            setValuePrice([valuePrice[0], Math.max(newValue[1], valuePrice[0] + minDistance)]);
        }
    };
    const handleChangeAcreage = (
        event: Event,
        newValue: number | number[],
        activeThumb: number,
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValueAcreage([
                Math.min(newValue[0], valueAcreage[1] - minDistanceAcreage),
                valueAcreage[1],
            ]);
        } else {
            setValueAcreage([
                valueAcreage[0],
                Math.max(newValue[1], valueAcreage[0] + minDistanceAcreage),
            ]);
        }
    };
    const handleSubmitFilter = () => {
        const arr = valuePrice.map((data) => data * 1000000);
        dispatch(
            setInfoFilterPriceAndAcreage({
                price: arr,
                acreage: valueAcreage,
            }),
        );
    };
    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
            }}
            className={styles.modalWrapper}
        >
            <h3 className={styles.modalTypeTitle}>Lọc kết quả</h3>
            <ul className={styles.modalTypeList}>
                <InputSlider
                    handleChange={handleChangePrice}
                    type="Giá"
                    value={valuePrice}
                    min={0}
                    max={200}
                    step={2}
                />
                <InputSlider
                    handleChange={handleChangeAcreage}
                    type="Diện tích"
                    value={valueAcreage}
                    min={5}
                    max={1000}
                    step={5}
                />
            </ul>
            <button onClick={handleSubmitFilter} className={`${styles.btnSubmit}`}>
                Áp dụng
            </button>
            <button onClick={handleCloseModal} className={styles.btnClose}>
                <CloseIcon />
            </button>
        </div>
    );
};

export default ModalPriceAndArea;
