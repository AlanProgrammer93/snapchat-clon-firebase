import { Avatar } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import "./Chat.css";
import { selectImage } from '../features/appSlice';
import { db } from '../firebase';
import moment from 'moment';
require("moment/min/locales.min");
moment.locale('es');

export const Chat = ({ id, username, timestamp, read, imageUrl, profilePic }) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const postTime = moment(timestamp);

    const open = () => {
        if (!read) {
            dispatch(selectImage(imageUrl));
            db.collection('posts').doc(id).set(
                {
                    read: true,
                },
                { merge: true }
            );
            history.push('/chats/view');
        } else {
            dispatch(selectImage(imageUrl));
            history.push('/chats/view');
        }
    }

    return (
        <div onClick={open} className="chat">
            <Avatar className="chat__avatar" src={profilePic} />
            <div className="chat__info">
                <h4>{username}</h4>
                <p>
                    {!read && "Ver -"}{" "}
                    { postTime.fromNow() }
                </p>
            </div>

            {!read && <StopRoundedIcon className="chat__readIcon" />}

        </div>
    )
}
