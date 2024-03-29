import React, { useEffect, useRef, useState } from 'react';
import emptyRoomImg from '~/assets/images/emptyRoom.jpg';
import styles from './chat.module.scss';
import ItemConversation from './itemConversation';
import { Grid } from '@mui/material';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { getListChat, getListMessChat, resetFakePostChat, resetInfoListMess } from './chat.reducer';
import { IDataChat, IMemberCreateChat } from '~/shared/model/chat';
import { isObjEmpty } from '~/utils/checkObjEmpty';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faEllipsisVertical, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import getUserId from '~/utils/getUserId';
import { IListDataMess, IResultResponseDataMess } from '~/shared/model/message';
import { SERVER_API_URL } from '~/config/constants';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import ItemPostCustom from '~/components/ItemPostCustom';
import PostInMess from './postInMess/postInMess';

export interface IDataCreateMess {
    chatId?: string;
    text: string;
    postId?: string;
    receiverId: string;
}
export interface ICurrChat {
    _id: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
    phone?: string;
}
interface INewListDataMess extends IListDataMess {
    receiverId?: string;
}
const Chat = () => {
    // const role = useAppSelector((state) => state.login.infoState.role);
    const socket = React.useMemo(() => io('http://localhost:3000'), []);
    const navigate = useNavigate();
    const currUser = getUserId();
    useEffect(() => {
        socket.emit('new-user-add', currUser);
        socket.on('get-users', (users) => {
            //   setOnlineUsers(users);
        });
    }, [currUser]);
    const inputElement = useRef<HTMLInputElement>(null);
    const listDataChat = useAppSelector((state) => state.listChatSlice.listChat.data);
    const listDataMess = useAppSelector((state) => state.listChatSlice.datasMess.data);
    const infoPostFake = useAppSelector((state) => state.listChatSlice.fakePostChat);

    const dispatch = useAppDispatch();

    const [newListDataMess, setNewListDataMess] = useState<INewListDataMess[] | undefined>();
    const [newListDataChat, setNewListDataChat] = useState<IDataChat[] | undefined>();
    const [receivedMessage, setReceivedMessage] = useState<INewListDataMess | null>(null);

    const [currChat, setCurrChat] = useState<ICurrChat>({} as ICurrChat);
    console.log(infoPostFake?._id);

    useEffect(() => {
        if (infoPostFake) {
            if (infoPostFake.userId._id) {
                setCurrChat({
                    _id: infoPostFake.userId._id,
                    avatar: infoPostFake.userId.avatar,
                    firstName: infoPostFake.userId.firstName,
                    lastName: infoPostFake.userId.lastName,
                    phone: infoPostFake.userId.phone,
                });
            }
        }
    }, [infoPostFake]);

    useEffect(() => {
        dispatch(getListChat());
    }, [dispatch]);
    const { chatId } = useParams();
    useEffect(() => {
        if (chatId && chatId !== '-1') {
            dispatch(getListMessChat({ chatId }));
        }
    }, [chatId]);
    useEffect(() => {
        setNewListDataMess(listDataMess);
    }, [listDataMess, dispatch]);
    useEffect(() => {
        setNewListDataChat(listDataChat);
    }, [listDataChat, dispatch]);

    console.log(listDataChat);
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
        handleAddLastMess(chatId, dataCreateMess.text);
        // dispatch(resetFakePostChat());
        socket.emit('send-message', {
            ...dataCreateMess,
            postId: response.data.data.postId,
        });
        dispatch(resetFakePostChat());
    };

    // Get the message from socket server
    useEffect(() => {
        socket.on('receive-message', (data) => {
            setReceivedMessage(data);
        });
    }, []);

    useEffect(() => {
        if (receivedMessage !== null) {
            setNewListDataMess((prev) => {
                if (prev) {
                    return [receivedMessage, ...prev];
                }
            });
            handleAddLastMess(receivedMessage.chatId, receivedMessage.text);
            setReceivedMessage(null);
        }
    }, [receivedMessage]);

    console.log(currChat);
    console.log('newListDataChat', newListDataChat);
    console.log('newListDataMess', newListDataMess);

    useEffect(() => {
        if (chatId !== '-1') {
            const conversationChat = listDataChat?.find((data) => {
                return data.chatId === chatId;
            });
            console.log(conversationChat);

            if (conversationChat) setCurrChat({ ...conversationChat.members[0] });
        }
    }, [chatId, listDataChat]);
    useEffect(() => {
        return () => {
            dispatch(resetInfoListMess());
        };
    }, []);
    const messageContainerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const messageContainer = messageContainerRef.current;
        if (messageContainer) {
            const lastMessage = messageContainer.lastElementChild as HTMLElement;
            if (lastMessage) {
                lastMessage.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [newListDataMess]);
    return (
        <div className={styles.chatWrapp}>
            <div className={styles.chat}>
                <Grid container spacing={1}>
                    <Grid className={styles.chatLeft} item md={5} sm={0}>
                        {newListDataChat ? (
                            newListDataChat.map((dataChat, index) => {
                                return <ItemConversation dataChat={dataChat} key={index} />;
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
                    <Grid className={styles.chatRight} item md={7} sm={12}>
                        {!newListDataMess && isObjEmpty(currChat) ? (
                            <div className={styles.emptyRoomImg}>
                                <img src={emptyRoomImg} alt="img-empty-rom" />
                            </div>
                        ) : (
                            <>
                                <div
                                    onClick={() => {
                                        navigate(`/user/${currChat._id}`);
                                    }}
                                    className={styles.chatHead}
                                >
                                    <div className={styles.chatHeadWrap}>
                                        <div
                                            style={{
                                                backgroundImage: `url(${currChat.avatar}`,
                                            }}
                                            className={styles.chatHeadAvatar}
                                        />
                                        <p>
                                            {currChat.lastName && currChat.firstName
                                                ? currChat.lastName && currChat.firstName
                                                : 'Người dùng chưa cung cấp tên'}
                                        </p>
                                    </div>
                                    <FontAwesomeIcon
                                        className={styles.chatHeadIcon}
                                        icon={faEllipsisVertical}
                                    />
                                </div>
                                <div ref={messageContainerRef} className={styles.chatBox}>
                                    {newListDataMess &&
                                        [...newListDataMess].reverse().map((dataMessage, index) => {
                                            console.log(!!dataMessage.postId);

                                            return (
                                                <div
                                                    className={`${
                                                        dataMessage.senderId === currUser
                                                            ? styles.messIsCurrUser
                                                            : styles.messIsSenderUser
                                                    }`}
                                                    key={index}
                                                >
                                                    {dataMessage.postId &&
                                                        Object.values(dataMessage.postId).length >
                                                            0 && (
                                                            <div
                                                                style={{
                                                                    marginLeft: `${
                                                                        dataMessage.senderId ===
                                                                        currUser
                                                                            ? 'auto'
                                                                            : ''
                                                                    }}`,
                                                                    marginRight: `${
                                                                        dataMessage.senderId !==
                                                                        currUser
                                                                            ? 'auto'
                                                                            : ''
                                                                    }}`,
                                                                    width: '40%',
                                                                }}
                                                            >
                                                                <PostInMess
                                                                    data={dataMessage.postId}
                                                                />
                                                            </div>
                                                        )}
                                                    {dataMessage.text && (
                                                        <p
                                                            style={{
                                                                maxWidth: '50%',
                                                                lineHeight: '2.6rem',
                                                            }}
                                                        >
                                                            {dataMessage.text}
                                                        </p>
                                                    )}
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
                                    {infoPostFake && (
                                        <div
                                            style={{
                                                marginLeft: 'auto',
                                                width: '40%',
                                            }}
                                        >
                                            <PostInMess data={infoPostFake} />
                                        </div>
                                    )}
                                </div>
                                <div className={styles.chatInput}>
                                    <button>
                                        <FontAwesomeIcon icon={faCirclePlus} />
                                    </button>
                                    <input
                                        ref={inputElement}
                                        onKeyDown={(e) => {
                                            if (
                                                e.key === 'Enter' &&
                                                inputElement.current &&
                                                chatId
                                            ) {
                                                handleCrateMess({
                                                    chatId,
                                                    receiverId: currChat._id,
                                                    text: inputElement.current.value,
                                                    postId: infoPostFake?._id,
                                                });
                                                inputElement.current.value = '';
                                            }
                                        }}
                                        className={styles.inputChatMess}
                                        type="text"
                                        placeholder="Nhập tin nhắn"
                                    />
                                    <button
                                        onClick={() => {
                                            if (inputElement.current && chatId) {
                                                let dataRequest: IDataCreateMess = {
                                                    receiverId: currChat._id,
                                                    text: inputElement.current.value,
                                                    postId: infoPostFake?._id,
                                                };
                                                console.log('dataRequest', dataRequest);

                                                if (chatId !== '-1') {
                                                    dataRequest.chatId = chatId;
                                                }
                                                handleCrateMess(dataRequest);
                                                inputElement.current.value = '';
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
