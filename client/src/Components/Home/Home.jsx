import React, {useState, useEffect} from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { addContact, getContacts } from '../../services/contacts';
import Main from '../Main/Main';
import Notification from '../Shared/Notification';
import './Home.css';

const Home = () => {
    const [contacts, setContacts] = useState([]);
    const [errMsg, setErrorMsg] = useState("");
    const [notification, setNotification] = useState({flag: false});
    const getAllContacts = async() => {
        setContacts([]);
        const res = await getContacts();
        // console.log({res});
        if(res?.success){
            setContacts(res?.data);
            setTimeout(() => {
                setErrorMsg("  ")
            }, 3000);
        }else{
            setErrorMsg("Contacts are not available!!!")
        }
    }

    useEffect(() => {
        getAllContacts();
    }, ['']);

    const handleSubmit = async(form) => {
        // setContacts([])
        form.preventDefault();
        const dataObj = {
            name: form?.target?.name?.value,
            mobile_number: form?.target?.mobile_number?.value
        }
        // console.log({dataObj});
        const res = await addContact(dataObj);
        if(res?.success){
            getAllContacts();
            setErrorMsg('');
            setNotification({bg: 'info', flag: true, message: "Your contact is added successfully"});
            form.target.reset();
        }else{
            setNotification({bg: 'danger', flag: true, message: res?.message});
        }
        setTimeout(() => {
            setNotification({flag: false});
        }, 4000);
    }

    return (
        <div className='container'>
            <h1 className='header'>Create a contact</h1>
            <div className="row justify-content-center">
                <div className="col-xs-8 col-md-10 col-sm-12">
                    <form className='card form p-3 mx-auto' onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <input className='form-control' type="text" placeholder="Name" name="name" required/>
                        </div><br/>
                        <div className='form-group'>
                            <input 
                                maxLength={14} 
                                // onFocus={()=> setNotification("")}
                                className='form-control' 
                                type="text" 
                                placeholder="Mobile Number" 
                                name="mobile_number" required/>
                        </div><br/>
                        <div className='form-group'>
                            <input className='btn btn-primary text-light btn-outline-success' type="submit" value="ADD" />
                        </div>
                    </form>
                </div>
            </div>
            {
                contacts?.length
                ? <Main contacts={contacts} reRender={getAllContacts} />
                : <div className='text-center text-danger mt-5'>
                    {
                        errMsg || <Spinner animation="border" variant="info" />
                    }
                </div>
            }
            <Notification notification={notification} setNotification={setNotification}/>
            <p style={{marginTop: contacts?.length ? "5px" : "230px"}} className='text-center font-weight-italic'>Copyright©{new Date().getFullYear()} By MMHK</p>
        </div>
    );
};

export default Home;