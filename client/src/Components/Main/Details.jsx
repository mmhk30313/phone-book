import React from 'react';
import { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useState } from 'react';
import { find_A_Contact } from '../../services/contacts';

const Details = ({mobileNumber, setMobileNumber}) => {
    const [isShowModal, setIsShowModal] = useState(false);
    const [contact, setContact] = useState({});
    const getContactDetails = async(mobile_number = mobileNumber) => {
        const res = await find_A_Contact({mobile_number});
        // console.log({resMobile: res});
        if(res?.success){
            setContact(res?.data);
            setIsShowModal(true);
            
        }else{
            setContact({message: res?.message || "Something wrong to show contact details"});
            setIsShowModal(true);
        }
    }
    useEffect(() => {
        getContactDetails();
    }, [""])
    const handleClose = () => {
        setMobileNumber(null);
        setIsShowModal(false);
    }
    return (
        <Modal show={isShowModal} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Contact Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    contact?.message
                    ? <p>{contact?.message}</p>
                    : <Table striped bordered={false} hover responsive>
                        <thead>
                        </thead>
                        <tbody>
                            <tr>
                                <td scope='col'>Name</td>
                                <td scope='col' style={{textAlign: 'right'}}>{contact?.name}</td>
                            </tr>
                            <tr>
                                <td scope='col'>Mobile Number</td>
                                <td scope='col' style={{textAlign: 'right'}}>{contact?.mobile_number}</td>
                            </tr>
                            <tr>
                                <td scope='col'>Crated At</td>
                                <td scope='col' style={{textAlign: 'right'}}>{(contact?.hh < 1 || contact?.hh % 12 === 0) ? "12" : contact?.hh % 12 }
                                 { contact?.time?.substring(2)} {contact?.hh > 11 ? "PM" : "AM"}</td>
                            </tr>
                        </tbody>
                    </Table>
                }
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Details;