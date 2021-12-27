import React, { useEffect, useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import * as Icon from 'react-bootstrap-icons';
import { deleteContact, getContacts, editContact } from '../../services/contacts';
import Notification from '../Shared/Notification';
import Details from './Details';

const Main = ({contacts, reRender}) => {
    // console.log({contacts});
    const [allContacts, setAllContacts] = useState([]);
    const [notification, setNotification] = useState({flag: false});
    const [editableContact, setEditableContact] = useState({});
    const [curContactId, setCurContactId] = useState(null);
    const [mobileNumber, setMobileNumber] = useState(null);
    useEffect(() => {
        setAllContacts(contacts);
    }, [""])
    const getAllContacts = async() => {
        setAllContacts([]);
        const res = await getContacts();
        // console.log({res});
        if(res?.success && res?.data?.length){
            setAllContacts(res?.data);
        }else{
            reRender();
        }
    }

    const handleDelete = async(id) => {
        // Delete a contact
        const res = await deleteContact(id);
        if(res?.success){
            setNotification({bg: "success", flag: true, message: "The contact is deleted successfully!!"});
            getAllContacts();
        }else{
            setNotification({bg: "danger", flag: true, message: "The contact isn't deleted successfully!!"});
        }
        setCurContactId(null);
    }
    
    const handleEdit = async(form) => {
        form.preventDefault();
        const dataObj = {
            name: form?.target?.name?.value,
            mobile_number: form?.target?.mobile_number?.value
        }
        const res = await editContact(curContactId, dataObj);
        // console.log({res});
        if(res?.success){
            setNotification({bg: "success", flag: true, message: res?.message});
            getAllContacts();
            form.target.reset();
            setCurContactId(null);
        }else{
            setNotification({bg: "danger", flag: true, message: res?.message});
        }
    }

    // console.log({curContactId});
    return (   
        <div className='py-3'>
            {
                mobileNumber && <Details mobileNumber={mobileNumber} setMobileNumber={setMobileNumber}/>
            }
            
            <Notification notification={notification} setNotification={setNotification} />
            <h1 className='text-center text-info py-2'>All Contacts</h1>
            <div className='row justify-content-center'>
                {
                    allContacts?.map(contact => {
                        return <div className='col-md-5 my-2' key={contact?._id}>
                            <div className='card p-2'>
                                <p className='mx-3'><span className='text-decoration-underline'>Name</span>: {contact?.name}</p>
                                <p className='mx-3'><span className='text-decoration-underline'>Mobile</span>: {contact?.mobile_number}</p>
                                <div className='d-flex flex-row'>
                                    <div className='mx-3'>
                                        <button onClick={() => setMobileNumber(curContactId ? null : (contact?.mobile_number))} className='btn btn-success text-light btn-outline-primary'><Icon.BookFill/> Details</button>
                                    </div>
                                    <div>
                                        <OverlayTrigger
                                            trigger="click"
                                            key={contact?._id}
                                            placement={'top'}
                                            show={(contact?._id) === curContactId}
                                            overlay={
                                                <Popover id={`popover-positioned-${"top"}`}>
                                                    <Popover.Header as="h3">{`Are you sure to edit this contact?`}</Popover.Header>
                                                    <Popover.Body>
                                                        <form className='form p-2' onSubmit={handleEdit}>
                                                            <div className='form-group'>
                                                                <input defaultValue={contact?.name} className='form-control' type="text" placeholder="Name" name="name"/>
                                                            </div><br/>
                                                            <div className='form-group'>
                                                                <input 
                                                                    maxLength={14} 
                                                                    className='form-control' 
                                                                    type="text" 
                                                                    placeholder="Mobile Number" 
                                                                    name="mobile_number"
                                                                    defaultValue={contact?.mobile_number}    
                                                                />
                                                            </div><br/>
                                                            <div className='form-group'>
                                                                <p onClick={() => setCurContactId(null)} className='btn mt-3 btn-warning'>No</p>
                                                                <button type='Submit' onClick={() => handleEdit(contact?._id)} className='mx-3 btn btn-danger'>Yes</button>
                                                            </div>
                                                        </form>
                                                    </Popover.Body>
                                                </Popover>  
                                            }
                                        >
                                            <button onClick={() => setCurContactId(curContactId ? null : (contact?._id))} className='btn btn-dark btn-outline-warning'><Icon.PencilSquare /> Edit</button>
                                        </OverlayTrigger>
                                    </div>
                                    <div className='mx-3'>
                                        <OverlayTrigger
                                            trigger="click"
                                            key={contact?._id}
                                            placement={'top'}
                                            show={(contact?._id+1) === curContactId}
                                            overlay={
                                                <Popover id={`popover-positioned-${"top"}`}>
                                                    <Popover.Header as="h3">{`Are you sure to delete this contact?`}</Popover.Header>
                                                    <Popover.Body>
                                                        <button onClick={() => setCurContactId(null)} className='btn btn-warning'>No</button>
                                                        <button onClick={() => handleDelete(contact?._id)} className='mx-3 btn btn-danger'>Yes</button>
                                                    </Popover.Body>
                                                </Popover>  
                                            }
                                        >
                                            <button onClick={() => setCurContactId(curContactId ? null : (contact?._id+1))} className='btn btn-dark btn-outline-danger'><Icon.TrashFill/> Delete</button>
                                        </OverlayTrigger>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    );
};

export default Main;