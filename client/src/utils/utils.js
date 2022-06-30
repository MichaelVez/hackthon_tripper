const axios = require("axios").default;
const { v4: uuidv4 } = require("uuid");
//
const endpoint = "https://api.cognitive.microsofttranslator.com";
const subscriptionKey = process.env.REACT_APP_TRANSLATER_KEY;
// Add your location, also known as region. The default is global.
// This is required if using a Cognitive Services resource.
const translateEvents = async (events, to) => {
  const eventsString = events.map((event) => event.title).join("|");
  const location = "westeurope";
  try {
    const translates = await axios({
      baseURL: endpoint,
      url: "/translate",
      method: "post",
      headers: {
        "Ocp-Apim-Subscription-Key": subscriptionKey,
        "Ocp-Apim-Subscription-Region": location,
        "Content-type": "application/json",
        "X-ClientTraceId": uuidv4().toString(),
      },
      params: {
        "api-version": "3.0",
        to: [to],
      },
      data: [
        {
          text: eventsString,
        },
      ],
      responseType: "json",
    });
    const array = translates.data[0].translations[0].text.split("|");
    for (let i = 0; i < array.length; i++) {
      events[i].title = array[i];
    }
    return [...events];
  } catch (error) {
    console.log("error");
  }
};
const translateText = async (text, to) => {
  const location = "westeurope";
  try {
    const translates = await axios({
      baseURL: endpoint,
      url: "/translate",
      method: "post",
      headers: {
        "Ocp-Apim-Subscription-Key": subscriptionKey,
        "Ocp-Apim-Subscription-Region": location,
        "Content-type": "application/json",
        "X-ClientTraceId": uuidv4().toString(),
      },
      params: {
        "api-version": "3.0",
        to: [to],
      },
      data: [
        {
          text,
        },
      ],
      responseType: "json",
    });
    return text;
  } catch (error) {
    console.log("error");
  }
};
export { translateEvents, translateText };
