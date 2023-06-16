const asyncHandler = require("express-async-handler");
const Contact = require("../models/ContactModel");
//@desc get all contacts
//@route GET /api/contacts
//@access private 
const getContacts = asyncHandler(async(req,res)=> {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
});

//@desc Create new contact
//@route POST /api/contacts
//@access private 
const creatContact = asyncHandler(async(req,res)=> {
    console.log(" body is : ",req.body);
    const{name, email, phone} = req.body;
    if(!name || !email || !phone ){
        res.status(400); 
        throw new Error("Missing field");
    }
    const contact = await Contact.create({
        name, email, phone, user_id: req.user.id
    });
    res.status(201).json(contact);
});


//@desc Update a contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async(req,res)=> {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    } 

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("you can not update other user's contacts");
    }

    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
);
res.status(200).json(updateContact);

});

//@desc get indv contact
//@route delete /api/contacts/:id
//@access private 
const getConact = asyncHandler(async(req,res)=> {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

//@desc Create new contact
//@route individual contact /api/contacts
//@access private
const deleteconatct = asyncHandler(async(req,res)=> {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    } 

    
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("you can not update other user's contacts");
    }


    await Contact.deleteOne({_id: req.params.id});
    res.status(200).json(contact);
});

module.exports = {getContacts, creatContact,deleteconatct,updateContact,getConact};