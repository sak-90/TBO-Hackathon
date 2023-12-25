const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const axios = require("axios");

const whatsapp = new Client({
  authStrategy: new LocalAuth(),
});

const fetchData = async (city) => {
  const { data } = await axios.get(
    `http://localhost:5000/hospital/getHospitals?cityName=${city}`
  );
  return data;
};
function specificUser(user) {
  return (
    user == "ERROR_401#"
  );
}

// QR code
whatsapp.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

// Ready
whatsapp.on("ready", async () => {
  console.log("Client is ready!");
});

let data;
let formData = {};
let step = 1;
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
// Message handling
whatsapp.on("message", async (message) => {
  if (specificUser((await message.getChat()).name)) {
    try {
      switch (step) {
        case 1:
          // Handle city selection and send hospital list
          if (message.body.startsWith("/city")) {
            let city = message.body.slice(6);
            data = await fetchData(city);

            if (data == null) {
              message.reply(
                `No hospital service in ${city}. Please try again later.`
              );
            } else {
              step = 2;
              const formattedHospitalList = data
                .map((hospital, i) => `${i + 1}. ${hospital.hospitalName}`)
                .join("\n");

              message.reply(
                `Here's a list of hospitals in your area:\n` +
                  formattedHospitalList +
                  `\nPlease reply with the **number** corresponding to the hospital you'd like to select.`
              );
            }
          } else {
            message.reply(
              "Please start by entering a city using /city [city name]"
            );
          }

          break;
        case 2:
          // Handle hospital selection and send department list
          const selectedHospitalIndex = parseInt(message.body) - 1;
          if (
            !isNaN(selectedHospitalIndex) &&
            selectedHospitalIndex >= 0 &&
            selectedHospitalIndex < data.length
          ) {
            step = 3;
            formData.hospitalName = data[selectedHospitalIndex].hospitalName;
            formData.hospital = data[selectedHospitalIndex];
            const departmentList = formData.hospital.departments
              .map((department, i) => `${i + 1}. ${department.departmentName}`)
              .join("\n");
            message.reply(
              "Which department would you like to make an appointment with?\n" +
                departmentList
            );
          } else {
            message.reply(
              "Invalid hospital selection. Please enter the number corresponding to the desired hospital."
            );
          }
          break;
        case 3:
          // Handle department selection and send doctor list
          const selectedDepartmentIndex = parseInt(message.body) - 1;
          if (
            !isNaN(selectedDepartmentIndex) &&
            selectedDepartmentIndex >= 0 &&
            selectedDepartmentIndex < formData.hospital.departments.length
          ) {
            step = 4;
            formData.departmentIndex = selectedDepartmentIndex;
            formData.departmentName =
              formData.hospital.departments[
                selectedDepartmentIndex
              ].departmentName;
            const doctorList = formData.hospital.departments[
              selectedDepartmentIndex
            ].doctors
              .map((doctor, i) => `${i + 1}. ${doctor.doctorName}`)
              .join("\n");
            message.reply("Please select a doctor:\n" + doctorList);
          } else {
            message.reply(
              "Invalid doctor selection. Please enter the number corresponding to the desired doctor you want appointment with."
            );
          }
          break;
        case 4:
          // Handle doctor selection and send availability list
          const selectedDoctorIndex = parseInt(message.body) - 1;
          if (
            !isNaN(selectedDoctorIndex) &&
            selectedDoctorIndex >= 0 &&
            selectedDoctorIndex <
              formData.hospital.departments[formData.departmentIndex].doctors
                .length
          ) {
            step = 5;
            formData.doctorIndex = selectedDoctorIndex;
            formData.doctorName =
              formData.hospital.departments[formData.departmentIndex].doctors[
                selectedDoctorIndex
              ].doctorName;
            const availabilityList = days
              .map((day, i) => `${i + 1}. ${day}`)
              .join("\n");
            message.reply("Please select a day:\n" + availabilityList);
          } else {
            message.reply(
              "Invalid day selection. Please enter the number corresponding to the desired day you want appointment on."
            );
          }
          break;
        case 5:
          // Handle day selection and send formData list
          const selectedDayIndex = parseInt(message.body) - 1;
          if (
            !isNaN(selectedDayIndex) &&
            selectedDayIndex >= 0 &&
            selectedDayIndex < 6
          ) {
            step = 6;
            formData.day = days[selectedDayIndex];
            const formattedData =
              `Please review the information you've entered:\n
              -> Hospital: ${formData.hospitalName}\n
              -> Department: ${formData.departmentName}\n
              -> Doctor: ${formData.doctorName}\n
              -> Appointment Day: ${formData.day}\n` +
              `\nIs this information correct?\n
              1. Yes, it's correct.\n
              2. No, I need to make changes.`;
            message.reply(formattedData);
          } else {
            message.reply(
              "Invalid day selection. Please enter the number corresponding to the desired day you want appointment on."
            );
          }
          break;
        case 6: {
          // Handle confirmation and proceed to payment or restart
          const confirmation = message.body;
          if (confirmation === "1") {
            message.reply("Navigating to payment...");
            // Implement payment logic here
          } else if (confirmation === "2") {
            message.reply("The form has reset now, please start by entering a city using /city [city name]");
            step = 1;
            formData = {};
          } else {
            message.reply(
              "Invalid response. Please reply with 1 for correct or 2 to make changes."
            );
          }
          break;
        }
        default:
          message.reply(
            "Sorry, I'm not sure what to do next. Please try again later."
          );
      }
    } catch (error) {
      console.error("Error handling message:", error);
      message.reply("Sorry, I encountered an error. Please try again.");
    }
  }
});

whatsapp.initialize();
