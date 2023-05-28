import { useNavigate, useParams } from 'react-router-dom';
import styles from './postDetail.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_API_URL } from '~/config/constants';
import { Grid } from '@mui/material';
import { IDataPost } from '~/shared/model/post';
import FaceIcon from '~/assets/images/user-icon.jpg';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import SliderCustom from '~/components/CustomSlide';
import Map from '~/components/Map/Map';
import SimpleBackdrop from '~/components/Loading/Loading';
import { setFakePostChat } from '../Chat/chat.reducer';
import { useAppDispatch } from '~/config/store';
import PostDetailAdmin from '~/pages/admin/postManager/postDetailAdmin';
const PostDetail = () => {
    const [lat, setLatitude] = useState<number>(0);
    const [lng, setLongitude] = useState<number>(0);
    const [indexDisplayImg, setIndexDisplayImg] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { postId } = useParams();
    const [dataPost, setDataPost] = useState<IDataPost>();
    const apiUrl = SERVER_API_URL;
    useEffect(() => {
        if (postId) {
            const handleFetchPostDetail = async () => {
                const requestUrl = `${apiUrl}post/${postId}`;
                const { data } = await axios.get(requestUrl);
                setDataPost(data.data);
            };
            handleFetchPostDetail();
        }
    }, [postId]);

    //  console.log(center);

    useEffect(() => {
        if (dataPost?.address.wards) {
            const getCoordinates = async (address: string) => {
                try {
                    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
                        params: {
                            q: address,
                            format: 'json',
                            limit: 1,
                        },
                    });

                    if (response.data.length > 0) {
                        const { lat, lon } = response.data[0];
                        // setCenter({ lat: Number(lat), lng: Number(lon) });
                        setLatitude(lat);
                        setLongitude(lon);
                    }
                } catch (error: any) {
                    console.error('Error retrieving coordinates:', error.message);
                    throw error;
                }
            };
            getCoordinates(dataPost.address.wards);
        }
    }, [dataPost?.address.wards]);
    return (
        <div className={styles.postDetailWrapp}>
            <PostDetailAdmin navigate={navigate} data={dataPost} />
            {isLoading && <SimpleBackdrop />}
        </div>
    );
};

export default PostDetail;
