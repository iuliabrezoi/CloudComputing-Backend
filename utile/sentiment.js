const language = require('@google-cloud/language');
const client = new language.LanguageServiceClient();

async function analyzeMail(msg) {
    const document = {
        content: msg,
        type: 'PLAIN_TEXT',
      };
    
      // Detects the sentiment of the text
      const [result] = await client.analyzeSentiment({document: document});
      const sentiment = result.documentSentiment;
    
      console.log(`Text: ${msg}`);
      console.log(`Sentiment score: ${sentiment.score}`);
      console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
      return sentiment;
}

module.exports = {
    analyzeMail
}