import City from "../models/city.model.js";
import Hospital from "../models/hospital.model.js";
import Department from "../models/department.model.js";
import Doctor from "../models/doctor.model.js";

const addHospitalController = async (req, res) => {
  try {
    const { cityName, departments } = req.body;
    let city = await City.findOne({ city: cityName });

    if (!city) {
      city = new City({ city: cityName, hospitals: [] });
    }
    const hospital = new Hospital({
      hospitalName: req.body.hospitalName,
      departments: [],
    });
    for (const departmentData of departments) {
      const { departmentName, doctors } = departmentData;

      const department = new Department({ departmentName, doctors: [] });

      for (const doctorData of doctors) {
        const { doctorName, availability } = doctorData;

        const doctor = new Doctor({ doctorName, availability });

        department.doctors.push(doctor);
      }

      hospital.departments.push(department);
    }

    city.hospitals.push(hospital);

    const savedCity = await city.save();

    res.status(200).json(savedCity);
  } catch (error) {
    console.error(`Error adding hospital: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getHospitalsController = async (req, res) => {
  try {
    const cityName = req.params.cityName;

    const city = await City.findOne({ city: cityName })
      .populate({
        path: "hospitals",
        populate: {
          path: "departments",
          populate: {
            path: "doctors",
          },
        },
      })
      .exec();

    if (!city) {
      return res.status(404).json({ error: "City not found" });
    }

    res.status(200).json(city.hospitals);
  } catch (error) {
    console.error(`Error getting hospitals: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { addHospitalController, getHospitalsController };
