import React from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const Notification = ({notification, setNotification}) => {
    return (
        <ToastContainer className="p-3" position={"top-end"}>
                <Toast onClose={() => setNotification({flag: false})} bg={notification?.bg} show={notification?.flag} delay={3000} autohide>
                    <Toast.Header closeButton={true}>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto text-info">Notification</strong>
                    <small>Just a few seconds ago</small>
                    </Toast.Header>
                    <Toast.Body className='text-light'>{notification?.message}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default Notification;