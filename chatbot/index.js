const axios = require("axios");
const qrcode = require("qrcode-terminal");
const { Client, LocalAuth, Buttons, List } = require("whatsapp-web.js");

const whatsapp = new Client({
  authStrategy: new LocalAuth(),
});

const fetchData = async (city) => {
  const data = await axios.get(
    `http://localhost:5000/hospital/getHospitals?cityName=${city}`
  );
  // console.log(data);
  return data;
};

// whatsapp
whatsapp.on("qr", (qr) => {
  qrcode.generate(qr, {
    small: true,
  });
});

whatsapp.on("ready", async () => {
  console.log("Client is ready!");
});

whatsapp.on("message", async (message) => {
  const chat = await message.getChat();
  let text = message.body;
  if (chat.name == "ERROR_401#") {
    if (text.startsWith("/city")) {
      let city = text.slice(6);
      console.log(city);
      try {
        const { data } = await fetchData(city);
        console.log(data);
        if (data == null) {
          message.reply(
            `No hospital service in ${city}. Please try again later.`
          );
        } else {
          message.reply(`
            ${data.map((hospital, i) => `${i}: ${hospital.hospitalName} \n`)}
            `);
        }
      } catch (error) {
        message.reply(`Error: ${error}. Please try again later.`);
        console.error(error);
      }
    } else {
      // message.reply("Wrong syntax, try again with /city [city name]");
    }
    if (message.type === "list_response") {
      message.reply(`You've selected ${message.body}`);
    }
  }
});

whatsapp.initialize();
