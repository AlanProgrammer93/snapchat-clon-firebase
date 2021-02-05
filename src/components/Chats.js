import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./Chats.css";
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
//import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import SearchIcon from '@material-ui/icons/Search';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from 'react-router-dom'
import { auth, db } from '../firebase';
import { resetCameraImage } from '../features/cameraSlice';
import { selectUser } from '../features/appSlice';
import { Chat } from './Chat';

export const Chats = () => {

    const [posts, setPosts] = useState([]);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        db.collection('posts')
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => 
                setPosts(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                ));
    }, []);

    const takeSnap = () => {
        dispatch(resetCameraImage);
        history.push('/capture');
    }

    return (
        <div className="chats">
            <div className="chats__header">
                <Avatar src={user.profilePic} className="chats__avatar" />
                <div className="chats__search">
                    <SearchIcon className="chats__searchIcon" />
                    <input placeholder="Amigos" type="text" />
                </div>
                <ExitToAppIcon className="chats__chatIcon" onClick={ () => { auth.signOut() } } />
            </div>

            <div className="chat__posts">
                {
                    posts.map(
                        ({
                            id,
                            data: { profilePic, username, timestamp, imageUrl, read },
                        }) => (
                            <Chat
                                key={id}
                                id={id}
                                username={username}
                                timestamp={timestamp}
                                imageUrl={imageUrl}
                                read={read}
                                profilePic={profilePic}
                             />
                        )
                    )
                }
            </div>
            <PhotoCamera
                className="chats__takePicIcon"
                onClick={takeSnap}
                fontSize='large' />
        </div>
    )
}
