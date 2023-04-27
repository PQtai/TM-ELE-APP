import React, { Fragment, useEffect, useState } from 'react';
import styles from './chat.module.scss';
import ItemConversation from './itemConversation';
import { Grid } from '@mui/material';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { getListChat } from './chat.reducer';
import { IMemberCreateChat } from '~/shared/model/chat';
import { isObjEmpty } from '~/utils/checkObjEmpty';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faEllipsisVertical, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import getUserId from '~/utils/getUserId';
const Chat = () => {
    const listDataChat = useAppSelector((state) => state.listChatSlice.listChat.data);
    const listDataMess = useAppSelector((state) => state.listChatSlice.datasMess.data);
    const dispatch = useAppDispatch();
    const [currChat, setCurrChat] = useState<IMemberCreateChat>({} as IMemberCreateChat);
    useEffect(() => {
        dispatch(getListChat());
    }, [dispatch]);
    console.log(listDataChat);
    console.log(currChat);
    console.log(listDataMess);
    const currUser = getUserId();
    return (
        <div className={styles.chatWrapp}>
            <div className={styles.chat}>
                <Grid container spacing={1}>
                    <Grid className={styles.chatLeft} item md={5}>
                        {listDataChat ? (
                            listDataChat.map((dataChat, index) => {
                                return (
                                    <ItemConversation
                                        setCurrChat={setCurrChat}
                                        dataChat={dataChat}
                                        key={index}
                                    />
                                );
                            })
                        ) : (
                            <div>Chưa có hội thoại nào được tạo</div>
                        )}
                        <div className={styles.optionFilter}>
                            <span className={styles.filterTitle}>Chat </span>
                            <button className={styles.btnOption}>Tất cả</button>
                            <button className={styles.btnOption}>Cần thuê</button>
                            <button className={styles.btnOption}>Cho thuê</button>
                            <button className={styles.btnOption}>
                                <SettingsSuggestIcon />
                            </button>
                        </div>
                    </Grid>
                    <Grid className={styles.chatRight} item md={7}>
                        {isObjEmpty(currChat) ? (
                            <div>Chat o day</div>
                        ) : (
                            <>
                                <div className={styles.chatHead}>
                                    <div className={styles.chatHeadWrap}>
                                        <div
                                            style={{
                                                backgroundImage: `url(${currChat.avatar}`,
                                            }}
                                            className={styles.chatHeadAvatar}
                                        />
                                        <p>
                                            {currChat.lastName} {currChat.firstName}
                                        </p>
                                    </div>
                                    <FontAwesomeIcon
                                        className={styles.chatHeadIcon}
                                        icon={faEllipsisVertical}
                                    />
                                </div>
                                <div className={styles.chatBox}>
                                    {listDataMess &&
                                        listDataMess.map((dataMessage, index) => {
                                            return (
                                                <div
                                                    className={`${
                                                        dataMessage.senderId === currUser
                                                            ? styles.messIsCurrUser
                                                            : styles.messIsSenderUser
                                                    }`}
                                                    key={index}
                                                >
                                                    {dataMessage.text && <p>{dataMessage.text}</p>}
                                                    {dataMessage.images?.length
                                                        ? dataMessage.images.map(
                                                              (image, indexImg) => {
                                                                  return (
                                                                      <div
                                                                          key={indexImg}
                                                                          className={styles.messImg}
                                                                          style={{
                                                                              backgroundImage: `url(${image.url})`,
                                                                          }}
                                                                      ></div>
                                                                  );
                                                              },
                                                          )
                                                        : ''}
                                                </div>
                                            );
                                        })}
                                </div>
                                <div className={styles.chatInput}>
                                    <button>
                                        <FontAwesomeIcon icon={faCirclePlus} />{' '}
                                    </button>
                                    <input
                                        className={styles.inputChatMess}
                                        type="text"
                                        placeholder="Nhập tin nhắn"
                                    />
                                    <button type="submit" className={styles.btnSend}>
                                        <FontAwesomeIcon icon={faPaperPlane} />
                                    </button>
                                </div>
                            </>
                        )}
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Chat;
