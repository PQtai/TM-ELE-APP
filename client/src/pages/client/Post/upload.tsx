import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './post.module.scss';
import ErrorIcon from '@mui/icons-material/Error';
import AddIcon from '@mui/icons-material/Add';
import { useAppSelector } from '~/config/store';
import ButtonCustom from '~/components/Button/ButtonCustom';
import { StatusType } from '~/shared/model/global';
interface IUploadProps {
    handleFileSelect: Function;
    images: File[];
}
const Upload = ({ handleFileSelect, images }: IUploadProps) => {
    const currTypeCategory = useAppSelector((state) => state.postSlice.initialState.typeCategory);
    return (
        <div
            style={{
                cursor: `${currTypeCategory ? 'default' : 'no-drop'}`,
                opacity: `${currTypeCategory ? '' : 0.5}`,
            }}
            className={styles.upload}
        >
            <input
                style={{
                    cursor: `${currTypeCategory ? 'pointer' : 'no-drop'}`,
                }}
                className={`${styles.inputUpload}`}
                type={`${currTypeCategory ? 'file' : 'text'}`}
                multiple
                onChange={(e) => {
                    if (currTypeCategory) {
                        handleFileSelect(e);
                    }
                }}
            />
            {!images.length ? (
                <>
                    <ButtonCustom
                        className={styles.btnUpload}
                        leftIcon={<FontAwesomeIcon icon={faCloudArrowUp} />}
                    />
                    <p className={styles.limitImages}> Đăng từ 1 đến 6 hình</p>
                </>
            ) : (
                <>
                    <ButtonCustom className={styles.btnUpload} leftIcon={<AddIcon />} />
                    <p className={styles.limitImages}>{`Bạn còn ${6 - images.length} hình`}</p>
                </>
            )}
            <ButtonCustom
                statusType={StatusType.Transparent}
                leftIcon={<ErrorIcon />}
                title="Hình ảnh hợp lệ"
                className={styles.regulationsImages}
            />
        </div>
    );
};

export default Upload;
