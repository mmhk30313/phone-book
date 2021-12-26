const contacts = require("../models/contacts");
const router = require("express").Router();
const regex = /^(((\+8801|8801|01|008801))[1|3-9]{1}(\d){8})$/;

const findContact = async(query = {}) => {
    // console.log({query});
    const contact = query?.id ? await contacts.findById(query?.id, ['id', 'name', 'mobile_number']) : await contacts.find(query, ['id', 'name', 'mobile_number']);
    return contact;
}

// register a contact
router.post('/register', async (req, res) => {
    const {name, mobile_number: mobile} = req?.body;
    console.log({name});
    try {
        //create a new contact
        if(name && mobile){
            if(regex.test(mobile)){
                const newContact = new contacts({
                  name,
                  mobile_number: mobile
                });
            
                //save contact and respond
                const contact = await newContact.save();
                res.status(200).json({success: true, ...contact?._doc, contactId: contact?._id});
                return;
            }
            res.status(500).json({
              statusCode: 500,
              success: false,
              message: `${mobile +" number is invalid" }`
            })
            return;
        }

        res.status(500).json({
          statusCode: 500,
          success: false,
          message: `${mobile ? "Contact name is" : name ? "Mobile number is" : "Contact name and mobile number are"} must be needed`
        })
    
    } catch (err) {
        res.status(500).json({
          statusCode: 500,
          success: false,
          message: "This contact number is already registered"
        })
    }
});

// get a contact
router.get('/find-one', async(req, res) => {
    const queryString = req.query;
    const {id, mobile} = queryString;
    const query = {};
    id && (query.id = id);
    mobile && (query.mobile_number = mobile);
    try {
        // const contact = await contacts.find(query);
        const contact = await findContact(query);
        // console.log({contact});
        if(contact?.id){
            res.status(200).json({success: true, data: contact});
        }else{
            res.status(404).json({success: false, message: "The contact isn't found"});
        }
    } catch (err) {
        return res.status(500).json({success: false, err});
    }
});

// get all contacts
router.get("/find-all", async (_, res) => {
    try {
      const myContacts = await findContact();
      res.status(200).json({success: true, data: myContacts});

    } catch (err) {
      res.status(500).json({success: false, err});
    }
});

// update a contact
router.put("/update", async (req, res) => {
    const queryString = req.query;
    const {id, mobile: mobile_number} = queryString;
    const query = id && {id} || mobile_number && {mobile_number} || null;
    // console.log({flag: regex.test(req.body.mobile_number)});
    try {
        if(req?.body?.mobile_number && 
            (!regex.test(req.body.mobile_number) || 
            req?.body?.mobile_number?.length > 14 || 
            req?.body?.mobile_number?.length < 11)
        ){
            return res.status(500).json({success: false, message: "Contact number is invalid"});
        }else{
            const contact = await findContact(query);
            if(req?.body?.mobile_number == contact?.mobile_number){
                res.status(200).json({success: false, message: "Your contact number is already exits"});
            }
            else{
                const myContact = await contacts.findOneAndUpdate(query, {
                    $set: req.body,
                });
                res.status(200).json({success: true, message: "Your contact has been updated"});
            }
        }
    } catch (err) {
        return res.status(500).json({success: false, message: "Your contact number is already owned by other user"});
    }
});

// delete a contact
router.delete('/delete/:id', async(req, res) => {
    try {
        const result = await contacts.findByIdAndDelete(req.params.id);
        // console.log({result});
        if(!result){
            res.status(200).json({success: false,message: "This contact is not exits"});
            return;
        }
        res.status(200).json({success: true,message: "The contact has been deleted"});
    } catch (err) {
        return res.status(500).json({success: false, err});
    }
});

module.exports = router;