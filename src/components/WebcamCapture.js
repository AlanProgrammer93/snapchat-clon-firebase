import React, { useCallback, useRef } from 'react';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setCameraImage } from '../features/cameraSlice';
import "./WebcamCapture.css";
import Webcam from 'react-webcam';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import { IconButton } from '@material-ui/core';

const videoConstraints = {
    width: 250,
    height: 400,
    facingMode: "user",
};

export const WebcamCapture = () => {

    const webcamRef = useRef(null);
    const dispatch = useDispatch();
    const history = useHistory();

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        dispatch(setCameraImage(imageSrc));
        history.push('/preview');
    }, [webcamRef]);

    return (
        <div className='webcamCapture'>

            <ChatBubbleIcon 
                className="chats__listChats"
                fontSize="large"
                onClick={ () => history.push('/') } />

            <Webcam
                audio={false}
                height={videoConstraints.height}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={videoConstraints.width}
                videoConstraints={videoConstraints}
            />

            <RadioButtonUncheckedIcon 
                className="webcamCapture__button"
                onClick={capture}
            />
            
        </div>
    )
}
