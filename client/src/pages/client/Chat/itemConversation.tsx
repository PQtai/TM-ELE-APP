import React from 'react';
import styles from './chat.module.scss';
import { IDataChat } from '~/shared/model/chat';
import { useNavigate, useParams } from 'react-router-dom';
export interface IPropDataChat {
    dataChat: IDataChat;
}
const ItemConversation = ({ dataChat }: IPropDataChat) => {
    const navigate = useNavigate();
    const { chatId } = useParams();
    const handleFindListMess = (chatId: string) => {
        if (chatId) {
            navigate(`/chat/${chatId}`);
        }
    };
    return (
        <div
            onClick={() => {
                handleFindListMess(dataChat.chatId);
            }}
            className={`${styles.itemConversation} ${chatId === dataChat.chatId && styles.active}`}
        >
            <div
                className={styles.imgConversation}
                style={{
                    backgroundImage: `url(${dataChat.members[0].avatar})`,
                }}
            />
            <div className={styles.infoConversation}>
                <h4 className={styles.conversationName}>
                    {dataChat.members[0].lastName && dataChat.members[0].firstName
                        ? dataChat.members[0].lastName && dataChat.members[0].firstName
                        : 'Người dùng chưa cung cấp tên'}
                </h4>
                <span className={styles.conversationLastMess}>{dataChat.lastMessage.text}</span>
                {dataChat.isRatingCondition ? (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/user/${dataChat.members[0]._id}/evaluate`);
                        }}
                        className={styles.conversationEvaluate}
                    >
                        Viết đánh giá
                    </button>
                ) : null}
            </div>
        </div>
    );
};

export default ItemConversation;
