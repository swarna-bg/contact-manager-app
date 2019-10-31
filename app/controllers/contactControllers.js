const { Contact } = require("../models/contacts");
//const paginate=require('express-paginate')

//localhost:3040/register
//list
module.exports.list = (req, res) => {
  // let pageNo = parseInt(req.query.pageNo);
  // let query = {};
  // if (pageNo < 0 || pageNo == 0) {
  //   response = {
  //     error: true,
  //     message: "invalid page number, should start with 1"
  //};
  // return res.json(response);
  // }
  const value=req.query.page
  const options={
      page:Number(value),
      limit:10
  }
  Contact.paginate({},options)

  //Contact.find()
   // .populate("userId")
    .then(contact => {
      res.send(contact.docs);
    })
    .catch(err => {
      res.send(err);
    });
};

//create
module.exports.create = (req, res) => {
  const body = req.body;
  const contact = new Contact(body);
  //contact.userId = req.user._id;
  contact.save()
    .then((contact)=> {
      // const { name, email, mobile } = contact;
      // res.json({ name, email, mobile });
      res.json(contact)
    })
    .catch((err) => {
      res.json(err);
    })
}

//show
module.exports.show = (req, res) => {
  const id = req.params.id;
  Contact.findById(id)
    .then(contact => {
      res.send(contact);
    })
    .catch(err => {
      res.send(err);
    });
};

//update
module.exports.update = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  Contact.findByIdAndUpdate(id, body, { new: true })
    .then(contact => {
      res.send(contact);
    })
    .catch(err => {
      res.send(err);
    });
};
//destroy
module.exports.destroy=(req,res)=>{
  const id=req.params.id
  Contact.findByIdAndDelete(id)
      .then((contact)=>{
          if(contact){
              res.json(contact)
          }else{
              res.json({ })
          }
          
      })
      .catch((err)=>{
          console.log(err)
      })
}
