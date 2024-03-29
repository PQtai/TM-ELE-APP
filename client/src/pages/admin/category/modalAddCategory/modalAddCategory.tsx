import React, { useState } from 'react';
import styles from './modalAddCategory.module.scss';
import { useAppDispatch } from '~/config/store';
import { createCategory } from '../category.reducer';
import ButtonCustom from '~/components/Button/ButtonCustom';
import { StatusType } from '~/shared/model/global';
const ModalAddCategory = () => {
    const [title, setTitle] = useState<string>('');
    const dispatch = useAppDispatch();
    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
            }}
            className={styles.modalAddCategory}
        >
            <h4 className={styles.categoryTitle}>Thêm mới danh mục</h4>
            <input
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
                className={styles.categoryInput}
                value={title}
                type="text"
                placeholder="Nhập danh mục cần thêm"
            />
            <div className={styles.categoryOptions}>
                <ButtonCustom title="Huỷ" />
                <ButtonCustom
                    onClick={() => {
                        if (title) {
                            dispatch(
                                createCategory({
                                    title,
                                }),
                            );
                        }
                    }}
                    statusType={StatusType.PrimaryClient}
                    title="Thêm"
                />
            </div>
        </div>
    );
};

export default ModalAddCategory;
