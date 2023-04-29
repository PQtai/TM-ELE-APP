import React, { useEffect, useRef, useState } from 'react';
import styles from './chat.module.scss';
import ItemConversation from './itemConversation';
import { Grid } from '@mui/material';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { IDataCreateMess, getListChat } from './chat.reducer';
import { IDataChat, IMemberCreateChat } from '~/shared/model/chat';
import { isObjEmpty } from '~/utils/checkObjEmpty';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faEllipsisVertical, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import getUserId from '~/utils/getUserId';
import { IListDataMess, IResultResponseDataMess } from '~/shared/model/message';
import { SERVER_API_URL } from '~/config/constants';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Socket, io } from 'socket.io-client';
const Chat = () => {
    // const role = useAppSelector((state) => state.login.infoState.role);

    // Connect to Socket.io
    // useEffect(() => {
    //     // socketRef.current = io('http://localhost:3000');
    // }, []);

    const listDataChat = useAppSelector((state) => state.listChatSlice.listChat.data);
    const listDataMess = useAppSelector((state) => state.listChatSlice.datasMess.data);
    const dispatch = useAppDispatch();
    const [newMessage, setNewMessage] = useState('');
    const [newListDataMess, setNewListDataMess] = useState<IListDataMess[] | undefined>();
    const [newListDataChat, setNewListDataChat] = useState<IDataChat[] | undefined>();
    const [currChat, setCurrChat] = useState<IMemberCreateChat>({} as IMemberCreateChat);
    useEffect(() => {
        dispatch(getListChat());
    }, [dispatch]);
    const { chatId } = useParams();
    useEffect(() => {
        setNewListDataMess(listDataMess);
    }, [listDataMess, dispatch]);
    useEffect(() => {
        setNewListDataChat(listDataChat);
    }, [listDataChat, dispatch]);
    // Send Message to socket server
    // useEffect(() => {
    //     if (newMessage !== '') {
    //         socket.emit('send-message', newMessage);
    //     }
    // }, [newMessage, socket]);

    // Get the message from socket server
    // useEffect(() => {
    //     socket.on('recieve-message', (data) => {
    //         console.log(data);
    //         //   setReceivedMessage(data);
    //     });

    //     // console.log("Message Arrived: ", receivedMessage)
    //     // if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
    //     //   setMessages([...messages, receivedMessage]);
    //     // }
    // }, [socket]);
    const handleAddLastMess = (chatId = '1', text: string) => {
        console.log(text);
        if (newListDataChat) {
            const newData: IDataChat[] = [...newListDataChat].map((data) => {
                if (data.chatId === chatId) {
                    const updatedData = {
                        ...data,
                        lastMessage: {
                            ...data.lastMessage,
                            text: text,
                        },
                    };
                    return updatedData;
                }
                return data;
            });
            setNewListDataChat(newData);
        }
    };
    const handleCrateMess = async (dataCreateMess: IDataCreateMess) => {
        const requestUrl = `${SERVER_API_URL}message/create`;
        const response = await axios.post<IResultResponseDataMess>(requestUrl, dataCreateMess);

        setNewListDataMess((prev) => {
            if (prev) {
                return [response.data.data, ...prev];
            }
        });
        setNewMessage('');
    };
    const currUser = getUserId();
    return (
        <div className={styles.chatWrapp}>
            <div className={styles.chat}>
                <Grid container spacing={1}>
                    <Grid className={styles.chatLeft} item md={5}>
                        {newListDataChat ? (
                            newListDataChat.map((dataChat, index) => {
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
                                    {newListDataMess &&
                                        [...newListDataMess].reverse().map((dataMessage, index) => {
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
                                        <FontAwesomeIcon icon={faCirclePlus} />
                                    </button>
                                    <input
                                        onChange={(e) => {
                                            setNewMessage(e.target.value);
                                        }}
                                        className={styles.inputChatMess}
                                        type="text"
                                        placeholder="Nhập tin nhắn"
                                        value={newMessage}
                                    />
                                    <button
                                        onClick={() => {
                                            if (newMessage) {
                                                handleCrateMess({
                                                    chatId,
                                                    receiverId: currChat._id,
                                                    text: newMessage,
                                                });
                                                handleAddLastMess(chatId, newMessage);
                                                // socket.emit('send-message', {
                                                //     chatId,
                                                //     text: newMessage,
                                                //     receiverId: currChat._id,
                                                // });
                                            }
                                        }}
                                        type="submit"
                                        className={styles.btnSend}
                                    >
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
