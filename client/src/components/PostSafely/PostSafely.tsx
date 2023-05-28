import React from 'react';
import styles from './PostSafely.module.scss';
const PostSafely = () => {
    return (
        <p className={styles.postSafely}>
            Đăng tin an toàn: Khi sử dụng ứng dụng của chúng tôi để đăng tin cho thuê nhà trọ hoặc
            nhà ở, hãy tuân thủ các quy định và chính sách của chúng tôi. Đảm bảo rằng thông tin bạn
            cung cấp là chính xác, đầy đủ và không vi phạm bất kỳ quy định pháp luật nào. Nếu bạn
            phát hiện bất kỳ hoạt động vi phạm nào, hãy báo cáo cho chúng tôi ngay lập tức.
        </p>
    );
};

export default PostSafely;
