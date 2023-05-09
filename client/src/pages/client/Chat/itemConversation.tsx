import React from 'react';
import styles from './chat.module.scss';
import { IDataChat } from '~/shared/model/chat';
import { useNavigate } from 'react-router-dom';
export interface IPropDataChat {
    dataChat: IDataChat;
}
const ItemConversation = ({ dataChat }: IPropDataChat) => {
    const navigate = useNavigate();
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
            className={styles.itemConversation}
        >
            <div
                className={styles.imgConversation}
                style={{
                    backgroundImage: `url(${dataChat.members[0].avatar})`,
                }}
            />
            <div className={styles.infoConversation}>
                <h4 className={styles.conversationName}>
                    {dataChat.members[0].lastName} {dataChat.members[0].firstName}
                </h4>
                <span className={styles.conversationLastMess}>{dataChat.lastMessage.text}</span>
                <button className={styles.conversationEvaluate}>Viết đánh giá</button>
            </div>
        </div>
    );
};

export default ItemConversation;
