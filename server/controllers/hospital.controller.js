import City from "../models/city.model.js";
import Hospital from "../models/hospital.model.js";
import Department from "../models/department.model.js";
import Doctor from "../models/doctor.model.js";

const addHospitalController = async (req, res) => {
  try {
    const { hospitalName, cityName, email, pincode, departments } = req.body;
    let city = await City.findOne({ city: cityName });

    if (!city) {
      city = new City({ city: cityName, hospitals: [] });
    }
    const hospital = new Hospital({
      hospitalName: hospitalName,
      email: email,
      pincode: pincode,
      departments: [],
    });
    await hospital.save();
    for (const departmentData of departments) {
      const { name, doctors } = departmentData;

      const department = new Department({ departmentName: name, doctors: [] });
      await department.save();

      for (const doctorData of doctors) {
        const { name, weekends } = doctorData;

        const doctor = new Doctor({ doctorName: name, weekends });

        await doctor.save();

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
    const cityName = req.query.cityName;

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
