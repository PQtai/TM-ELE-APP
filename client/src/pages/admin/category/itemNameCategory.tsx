import React, { useRef, useState } from 'react';
import { useAppDispatch } from '~/config/store';
import { Category } from '~/shared/model/category';
import { deleteCategory, deleteItemCategory, updateCategory } from './category.reducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import styles from './category.module.scss';
interface IPropsItemCategory {
    data: Category;
}
const ItemNameCategory = ({ data }: IPropsItemCategory) => {
    const [valueName, setValueName] = useState<string>(data.title);
    const [isRename, setIsRename] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const handleRename = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        const target = e.target as HTMLInputElement;
        if (target.value !== data.title) {
            dispatch(
                updateCategory({
                    id: data._id,
                    title: valueName,
                }),
            );
        }
    };
    return (
        <>
            <li>
                {isRename ? (
                    <input
                        autoFocus
                        className={styles.categoryInputRename}
                        onBlur={(e) => {
                            handleRename(e);
                            setIsRename((prev) => !prev);
                        }}
                        onChange={(e) => {
                            setValueName(e.target.value);
                        }}
                        type="text"
                        value={valueName}
                    />
                ) : (
                    data.title
                )}
            </li>
            <li>{data.posts.length}</li>
            <li>
                <FontAwesomeIcon
                    onClick={() => {
                        dispatch(deleteItemCategory(data._id));
                        if (data.posts.length !== 0) {
                            dispatch(
                                deleteCategory({
                                    id: data._id,
                                }),
                            );
                        }
                    }}
                    icon={faTrashCan}
                />
            </li>
            <li>
                <FontAwesomeIcon
                    onClick={() => {
                        setIsRename((prev) => !prev);
                    }}
                    icon={faPencil}
                />
            </li>
        </>
    );
};

export default ItemNameCategory;
