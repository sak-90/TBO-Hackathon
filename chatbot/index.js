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
  
  whatsapp.on("ready", async() => {
    console.log("Client is ready!");
  });
  
  whatsapp.on("message", async (message) => {
    const chat = await message.getChat();
    // const user = chat
    let text = message.body;
    if (chat.name == "ERROR_401#") {
      // message.reply(`text: ${text}`);
      if (text.startsWith("/city")) {
        let city = text.slice(6);
        console.log(city);
        try {
          const hospitals = await fetchData(city);
          console.log(hospitals);
          if (hospitals == null) {
          message.reply(
            `No hospital service in ${city}. Please try again later.`
          );
        } else {
          const hospitalsList = new List(
            [
              {
                title: `List of hospitals in ${city}`,
                rows: hospitals.map((hospital, i) => ({
                  id: hospital.hospitalName,
                  title: hospital.hospitalName,
                })),
              },
            ],
            "Please select a hospital"
          );

          message.reply(hospitalsList);
        }
      } catch (error) {
        message.reply("Error fetching hospital data. Please try again later.");
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
