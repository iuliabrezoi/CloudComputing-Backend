const express = require ('express');
const mysql = require('mysql');
const router = express.Router();
const connection = require('../db.js');
const {sendMAIL} = require("../utile/mail");
const {analyzeMail} = require("../utile/sentiment");

const buildInsertQueryString = (senderName, senderMail, receiverMail, messageContent, score = 0.0, magnitude = 0.0) => {
  const queryString = `INSERT INTO messages (senderName, senderMail, receiverMail, messageContent, score, magnitude) 
      VALUES (${mysql.escape(senderName)}, ${mysql.escape(senderMail)}, ${mysql.escape(receiverMail)}, ${mysql.escape(messageContent)}, ${mysql.escape(score)}, ${mysql.escape(magnitude)})`;
  return queryString;
};


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
    receiverMail,
    messageContent,
  } = req.body; 

  if(!senderName || !senderMail || !receiverMail || !messageContent)
  {
    return res.status(400).json({
      error: "All fields must be completed",
    })
  }

  connection.query(`INSERT INTO messages (senderName, senderMail, receiverMail, messageContent) values (${mysql.escape(senderName)}, ${mysql.escape(senderMail)}, ${mysql.escape(receiverMail)}, ${mysql.escape(messageContent)})`, (err, results) => {
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
    receiverMail,
    messageContent,
  } = req.body; 
if(!senderName || !senderMail ||  !receiverMail || !messageContent){
  return res.status(400).json({
    error:"All fields must be completed",

  })
}
  connection.query(`UPDATE messages SET senderName = ${mysql.escape(senderName)}, senderMail = ${mysql.escape(senderMail)}, receiverMail = ${mysql.escape(receiverMail)}, messageContent = ${mysql.escape(messageContent)} WHERE entryID = ${mysql.escape(id)}`, (err,results)=>{
    if(err){
      console.log(err);
      return res.send(err);

    }
    return res.json({
      results,
    })
  });

});

router.post("/foreign", async(req,res)=>{
  const 
  {senderName, senderMail, receiverMail, messageContent} = req.body;
  if(!senderName || !senderMail || ! receiverMail || !messageContent)
  {
    return res.status(400).json({
      error:"All fields are required",
    })
  }

  const sentiment = await analyzeMail(messageContent);

  const queryString = buildInsertQueryString(senderName, senderMail, receiverMail, messageContent, sentiment.score, sentiment.magnitude);
  try {
    const sendMailResponse = await sendMAIL(
      receiverMail,
      senderMail,
      senderName + "" + " ti-a trimis un mesaj",
      messageContent
  );

  connection.query(queryString, (err, results) => {
      if (err) {
          return res.send(err);
      }

      return res.json({
          data: results,
          messageContent,
      });
  });
} catch (err) {
  console.log(err);
  return res.send("Something went wrong");
}
})

module.exports = router;