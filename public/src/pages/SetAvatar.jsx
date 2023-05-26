import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import styled from 'styled-components';
import { Buffer } from 'buffer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loader from '../assets/loader.gif';
import { avatar_route, avatar_api } from '../utils/APIRoutes';

const SetAvatar = () => {
    const api = avatar_api;
    const navigate = useNavigate();

    const [avatars, setAvatars] = useState([]);
    const [is_loading, setIsLoading] = useState(true);
    const [selected_avatar, setSelectedAvatar] = useState(undefined);

    const toast_options = {
        position: 'bottom-right',
        autoClose: 3500,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
    };

    const setProfilePicture = async () => {
        if (selected_avatar === undefined) {
            toast.error('Please select an avatar', toast_options);
        } else {
            const user = await JSON.parse(localStorage.getItem('user'));
            const { data } = await axios.post(`${avatar_route}/$${user._id}`, {
                image: avatars[selected_avatar],
            });

            if (data.is_set) {
                user.is_avatar_image_set = true;
                user.avatar_img = data.image;
                localStorage.setItem('user', JSON.stringify(user));
                navigate('/');
            } else {
                toast.error('Failed to set avatar. Please try again', toast_options);
            }
        }
    }


    useEffect(() => {
        (async () => {
            const data = [];

            for (let i = 0; i < 4; i++) {
                const random = Math.round(Math.random() * 1000);
                const image = await axios.get(`${api}/${random}?apikey=${process.env.REACT_APP_AVATAR_API_KEY}`);
                
                console.log(image);
                const buffer = new Buffer(image.data);

                data.push(buffer.toString("base64"));
            }

            setAvatars(data);
            setIsLoading(false);
        })();
    }, []);


    return (
        <>
            {
                is_loading ? 
                    <Container>
                        <img src={Loader} alt="loading animation" />
                    </Container>
                :
                    <Container>
                        <div className="title-container">
                            <h1>Pick an AVATAR as your profile picture</h1>
                        </div>
                        <div className="avatars">
                            {
                                avatars.map((avatar, i) => {
                                    return (
                                        <div className={`avatar ${selected_avatar === i ? 'selected' : ''}`}>
                                            <img
                                                key={avatar}
                                                src={`data:image/svg+xml;base64, ${avatar}`}
                                                alt="avatar icon"
                                                onClick={() => { setSelectedAvatar(i) }}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <button type="button" className="submit-btn" onClick={() => setProfilePicture()}>Set as profile picture</button>
                    </Container>
            }
            <ToastContainer />
        </>
    );
}

// Container here refers to the component we are referring to
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    background-color: #131324;
    height: 100vh;
    width: 100vw;

    .loader {
        max-inline-size: 100%;
    }

    .title-container {
        h1 {
        color: white;
        }
    }

    .avatars {
        display: flex;
        gap: 2rem;

        .avatar {
            border: 0.4rem solid transparent;
            padding: 0.4rem;
            border-radius: 5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s ease-in-out;
            
                img {
                    height: 6rem;
                    transition: 0.5s ease-in-out;

                    &:hover {
                        cursor: pointer;
                    }
                }
            }
            
            .selected {
                border: 0.4rem solid #4e0eff;
            }
    }
    .submit-btn {
        cursor: pointer;
        background-color: #4e0eff;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        
        &:hover {
            background-color: #4e0eff;
        }
    }
`;

export default SetAvatar;