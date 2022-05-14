const express = require('express');
const router = express.Router();
const {sendMAIL} = require("../utile/mail")
const {analyzeMail} = require('../utile/sentiment')

router.post("/send",(req,res)=>
{
    const{senderName, senderMail, receiverMail, messageContent} = req.body;
    if(!senderName || !senderMail || !receiverMail || !messageContent)
    {
        return res.status(400).send("Missing information");
    }

    sendMAIL(receiverMail, senderMail, messageContent, `${senderName} ti-a trimis un mesaj`);
    res.sendStatus(200);
})

router.get("/sentiment", async (req,res)=>{
    const {text} = req.body;

    if (!text) {
        return res.status(400).send("Missing parameters");
    }

    const sentiment = await analyzeMail(text);
    return res.json({
        score: sentiment.score,
        magnitude: sentiment.magnitude
    })

  });

module.exports = router;