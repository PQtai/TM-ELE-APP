import React, { useEffect, useState } from 'react';
import styles from './category.module.scss';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { deleteCategory, deleteItemCategory, getListsCategory } from './category.reducer';
import ButtonCustom from '~/components/Button/ButtonCustom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { setDisplayOverlay } from '~/components/Overlay/overlay.reducer';
import ModalAddCategory from './modalAddCategory/modalAddCategory';
import { setInfoAlert } from '~/components/Alerts/Alerts.reducer';
import ItemNameCategory from './itemNameCategory';
const Category = () => {
    const listCategory = useAppSelector((state) => state.listCategorySlice.listCategory.datas);

    const infoCreateCategory = useAppSelector(
        (state) => state.listCategorySlice.dataCreateCategory,
    );
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getListsCategory());
    }, []);
    useEffect(() => {
        if (infoCreateCategory.data) {
            dispatch(
                setDisplayOverlay({
                    isDisplay: false,
                    children: <></>,
                }),
            );
            dispatch(
                setInfoAlert({
                    isOpen: true,
                    infoAlert: {
                        type: 'Success',
                        duration: 2000,
                        message: infoCreateCategory.mess,
                        title: 'Thành công',
                    },
                }),
            );
        }
    }, [infoCreateCategory.data]);
    return (
        <div className={styles.category}>
            <h3 className={styles.titleTable}>Tất cả danh mục</h3>
            <ul className={styles.headTable}>
                <li>Tên danh mục</li>
                <li>Số lượng bài đăng</li>
                <li>Xoá</li>
                <li>Chỉnh sửa</li>
            </ul>
            <div className={styles.contentTable}>
                {listCategory &&
                    listCategory.map((category, index) => {
                        return (
                            <ul key={category._id}>
                                <ItemNameCategory data={category} />
                            </ul>
                        );
                    })}
            </div>
            <button
                onClick={() => {
                    dispatch(
                        setDisplayOverlay({
                            isDisplay: true,
                            children: <ModalAddCategory />,
                        }),
                    );
                }}
                className={styles.btnAdd}
            >
                <FontAwesomeIcon icon={faPlus} />
            </button>
        </div>
    );
};

export default Category;
