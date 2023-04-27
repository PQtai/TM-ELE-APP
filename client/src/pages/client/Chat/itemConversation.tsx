import React from 'react';
import styles from './chat.module.scss';
import { IDataChat, IMemberCreateChat } from '~/shared/model/chat';
import { useAppDispatch } from '~/config/store';
import { getListMessChat } from './chat.reducer';
export interface IPropDataChat {
    dataChat: IDataChat;
    setCurrChat: React.Dispatch<React.SetStateAction<IMemberCreateChat>>;
}
const ItemConversation = ({ dataChat, setCurrChat }: IPropDataChat) => {
    const dispatch = useAppDispatch();
    const handleFindListMess = (chatId: string) => {
        setCurrChat(dataChat.members[0]);
        if (chatId) {
            dispatch(getListMessChat({ chatId }));
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
