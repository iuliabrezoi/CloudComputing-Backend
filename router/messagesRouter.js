const express = require ('express');
const mysql = require('mysql');
const router = express.Router();
const connection = require('../db.js');

//get all messages
router.get("/",(req,res)=>{
    connection.query("SELECT * FROM messages", (err, results) => {
      if(err)
      {
        console.log(err);
        return res.send(err);
      }
  
      return res.json ({
        messages:results,
      }
      )
    })
  });

// get a message by id
router.get("/:id",(req,res)=>{
  const {id} = req.params;
  connection.query(`SELECT * FROM messages where entryID = ${mysql.escape(id)}`, (err, results) => {
    if(err)
    {
      console.log(err);
      return res.send(err);
    }

    if(results.length ===0)
    {
      return res.status(400).json({
        error: "This id doesn't exist",
      })
    }

    return res.json ({
      messages:results,
    }
    )
  })
});


//insert a message
router.post("/",(req,res)=>{
  const {
    senderName,
    senderMail,
    receiverName,
    receiverMail,
    messageContent,
  } = req.body; 

  if(!senderName || !senderMail || !receiverName || !receiverMail || !messageContent)
  {
    return res.status(400).json({
      error: "All fields must be completed",
    })
  }

  connection.query(`INSERT INTO messages (senderName, senderMail, receiverName, receiverMail, messageContent) values (${mysql.escape(senderName)}, ${mysql.escape(senderMail)}, ${mysql.escape(receiverName)}, ${mysql.escape(receiverMail)}, ${mysql.escape(messageContent)})`, (err, results) => {
    if(err)
    {
      console.log(err);
      return res.send(err);
    }

    return res.json ({
      results,
    })
  })

});

//delete 

router.delete("/:id", (req,res)=>{
    const {id} = req.params;
    connection.query(`DELETE FROM messages where entryID = ${mysql.escape(id)}`, (err, results) => {
      if (err)
      {
        console.log(err);
        return res.send(err);
      }

      return res.json({
        results,
      })
    })
});

router.put("/:id",(req,res) =>{
  const {id} = req.params;
  const {
    senderName,
    senderMail,
    receiverName,
    receiverMail,
    messageContent,
  } = req.body; 
if(!senderName || !senderMail || !receiverName || !receiverMail || !messageContent){
  return res.status(400).json({
    error:"All fields must be completed",

  })
}
  connection.query(`UPDATE messages SET senderName = ${mysql.escape(senderName)}, senderMail = ${mysql.escape(senderMail)}, receiverName = ${mysql.escape(receiverName)}, receiverMail = ${mysql.escape(receiverMail)}, messageContent = ${mysql.escape(messageContent)} WHERE entryID = ${mysql.escape(id)}`, (err,results)=>{
    if(err){
      console.log(err);
      return res.send(err);

    }
    return res.json({
      results,
    })
  });

});


module.exports = router;