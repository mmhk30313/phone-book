import React, { useState } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import * as Icon from 'react-bootstrap-icons';

const Main = ({contacts, reRender}) => {
    console.log({contacts});
    const [editableContact, setEditableContact] = useState({});
    const [curContactId, setCurContactId] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    const handleDelete = (id) => {
        // Delete a contact

        setCurContactId(null);
    }
    
    const handleEdit = (form) => {
        form.preventDefault();
        const dataObj = {
            name: form?.target?.name?.value,
            mobile_number: form?.target?.mobile_number?.value
        }
        console.log({dataObj});
        setCurContactId(null);
    }

    console.log({curContactId});
    return (
        <div className='py-3'>
            <h1 className='text-center text-info py-2'>All Contacts</h1>
            <div className='row justify-content-center'>
                {
                    contacts?.map(contact => {
                        return <div className='col-md-5 my-2' key={contact?._id}>
                            <div className='card p-2'>
                                <p className='mx-3'><span className='text-decoration-underline'>Name</span>: {contact?.name}</p>
                                <p className='mx-3'><span className='text-decoration-underline'>Mobile</span>: {contact?.mobile_number}</p>
                                <div className='d-flex flex-row'>
                                    <div className='mx-3'>
                                        <OverlayTrigger
                                            trigger="click"
                                            key={contact?._id}
                                            placement={'top'}
                                            show={(contact?._id+1) === curContactId}
                                            overlay={
                                                <Popover id={`popover-positioned-${"top"}`}>
                                                    <Popover.Header as="h3">{`Are you sure to edit this contact?`}</Popover.Header>
                                                    <Popover.Body>
                                                        <form className='form p-2' onSubmit={(form) => handleEdit(form)}>
                                                            <div className='form-group'>
                                                                <input value={contact?.name} className='form-control' type="text" placeholder="Name" name="name"/>
                                                            </div><br/>
                                                            <div className='form-group'>
                                                                <input 
                                                                    maxLength={14} 
                                                                    className='form-control' 
                                                                    type="text" 
                                                                    placeholder="Mobile Number" 
                                                                    name="mobile_number"
                                                                    value={contact?.mobile_number}    
                                                                />
                                                            </div><br/>
                                                            <div className='form-group'>
                                                                <button onClick={() => setCurContactId(null)} className='btn btn-warning'>No</button>
                                                                <button type='Submit' onClick={() => handleEdit(contact?._id)} className='mx-3 btn btn-danger'>Yes</button>
                                                            </div>
                                                        </form>
                                                    </Popover.Body>
                                                </Popover>  
                                            }
                                        >
                                            <button onClick={() => setCurContactId(curContactId ? null : (contact?._id+1))} className='btn btn-dark btn-outline-warning'><Icon.PencilSquare /> Edit</button>
                                        </OverlayTrigger>
                                    </div>
                                    <div>
                                        <OverlayTrigger
                                            trigger="click"
                                            key={contact?._id}
                                            placement={'top'}
                                            show={contact?._id === curContactId}
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
                                            <button onClick={() => setCurContactId(curContactId ? null : contact?._id)} className='btn btn-dark btn-outline-danger'><Icon.TrashFill/> Delete</button>
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