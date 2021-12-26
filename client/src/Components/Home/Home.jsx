import React, {useState, useEffect} from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { addContact, getContacts } from '../../services/contacts';
import Main from '../Main/Main';
import './Home.css';

const Home = () => {
    const [contacts, setContacts] = useState([]);
    const [errMsg, setErrorMsg] = useState("");
    const [notification, setNotification] = useState(false);
    const getAllContacts = async() => {
        setContacts([]);
        const res = await getContacts();
        // console.log({res});
        if(res?.success){
            setContacts(res?.data);
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
        console.log({dataObj});
        const res = await addContact(dataObj);
        if(res?.success){
            getAllContacts();
            setErrorMsg('');
            setNotification({bg: 'success', message: "Your contact is added successfully"});
        }else{
            setNotification({bg: 'danger', message: res?.message});
        }
        setTimeout(() => {
            setNotification("");
        }, 5000);
    }

    return (
        <div className='container'>
            <h1 className='header'>Create a contact</h1>
            <form className='card form p-5 w-75 mx-auto' onSubmit={(form) => handleSubmit(form)}>
                {
                    notification?.bg
                    ? <div className="text-center"><p className={`text-${notification?.bg}`}>{notification?.message}</p></div>
                    : null
                }
                <div className='form-group'>
                    <input onFocus={()=> setNotification("")} className='form-control' type="text" placeholder="Name" name="name" required/>
                </div><br/>
                <div className='form-group'>
                    <input 
                        maxLength={14} 
                        onFocus={()=> setNotification("")}
                        className='form-control' 
                        type="text" 
                        placeholder="Mobile Number" 
                        name="mobile_number" required/>
                </div><br/>
                <div className='form-group'>
                    <input className='btn btn-primary text-light btn-outline-success' type="submit" value="ADD" />
                </div>
            </form>
            {
                contacts?.length
                ? <Main contacts={contacts} reRender={getAllContacts} />
                : <div className='text-center text-danger mt-5'>
                    {
                        errMsg || <Spinner animation="border" variant="info" />
                    }
                </div>
            }
        </div>
    );
};

export default Home;