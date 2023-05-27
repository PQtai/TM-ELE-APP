import styles from './accountManager.module.scss';
import imgUser from '~/assets/images/user-avatar.jpg';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyTwoToneIcon from '@mui/icons-material/KeyTwoTone';
import BasicRating from '~/components/Rating/Rating';
import { useEffect, useState } from 'react';
import { IAccountManager } from '~/shared/model/accountManager';
import ButtonCustom from '~/components/Button/ButtonCustom';
import { SizeType, StatusType } from '~/shared/model/global';
interface IPropsItemAcc {
    data: IAccountManager;
}
const ItemAccount = ({ data }: IPropsItemAcc) => {
    const [isOpenListBtn, setIsOpenListBtn] = useState<boolean>(false);
    useEffect(() => {
        const closeListBtn = () => {
            setIsOpenListBtn(false);
        };
        if (isOpenListBtn) {
            document.addEventListener('mousedown', closeListBtn);
        }
        return () => {
            document.removeEventListener('mousedown', closeListBtn);
        };
    }, [isOpenListBtn]);
    console.log(data.avatar);

    return (
        <div className={styles.itemAccount}>
            <div className={styles.itemHead}>
                <div
                    className={styles.itemAvatar}
                    style={{
                        backgroundImage: `url(${data.avatar ? data.avatar : imgUser})`,
                    }}
                ></div>
                <h4 className={styles.itemName}>
                    {data.firstName && data.lastName
                        ? data.firstName + ' ' + data.lastName
                        : data.phone}
                </h4>
                <div
                    onClick={() => {
                        setIsOpenListBtn(!isOpenListBtn);
                    }}
                    className={styles.itemBtn}
                >
                    <MoreVertIcon />
                    <ul className={`${styles.listBtnCustom} ${isOpenListBtn ? styles.active : ''}`}>
                        <li
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                            }}
                            className={styles.itemBtnCustom}
                        >
                            <ButtonCustom
                                className={styles.itemBtn}
                                sizeType={SizeType.Large}
                                title="Quản lý tài khoản"
                            />
                        </li>
                        <li className={styles.itemBtnCustom}>
                            <ButtonCustom
                                className={styles.itemBtn}
                                sizeType={SizeType.Large}
                                title="Quản lý tin nhắn"
                            />
                        </li>
                    </ul>
                </div>
            </div>
            <div className={styles.itemBody}>
                <div className={styles.bodyComment}>
                    <BasicRating readOnly sumRating={data.averageRating} />
                    <span className={styles.totalComment}>{data.reviewCount} bình luận</span>
                </div>
                <div className={styles.bodyPosts}>{data.postCount} bài đăng</div>
            </div>
            <ButtonCustom
                className={styles.lockAccount}
                statusType={StatusType.Warning}
                leftIcon={<KeyTwoToneIcon />}
                title="Lock"
            />
        </div>
    );
};

export default ItemAccount;
