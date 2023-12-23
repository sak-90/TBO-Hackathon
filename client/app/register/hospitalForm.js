"use client";
import { useState } from "react";
import axios from "axios";

const HospitalForm = () => {
  const onWheel = (e) => {
    e.target.blur();
  };
  const [departments, setDepartments] = useState([
    {
      name: "",
      doctors: [],
    },
  ]);

  const addDepartment = (event) => {
    event.preventDefault();
    setDepartments([...departments, { name: "", doctors: [] }]);
  };

  const addDoctor = (departmentIndex) => {
    const updatedDepartments = [...departments];
    updatedDepartments[departmentIndex].doctors.push({
      name: "",
      apptStart: "",
      apptEnd: "",
      weekdays: [],
    });
    setDepartments(updatedDepartments);
  };

  const submitData = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formValue = {
      hospitalName: formData.get("hospitalName"),
      email: formData.get("email"),
      cityName: formData.get("location"),
      pincode: formData.get("pincode"),
      departments: departments.map((department, departmentIndex) => ({
        name: formData.get(`departmentName${departmentIndex}`),
        doctors: department.doctors.map((doctor, doctorIndex) => ({
          name: formData.get(`doctorName${doctorIndex}`),
          apptStart: formData.get(`apptStart${doctorIndex}`),
          apptEnd: formData.get(`apptEnd${doctorIndex}`),
          weekdays: Array.from(
            formData.getAll(`weekdays${doctorIndex}`)
          ).filter((value) => value !== ""),
        })),
      })),
    };

    console.log(formValue);
    await axios
      .post("http://localhost:5000/hospital/addHospital", formValue)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className=" bg-gray-900 text-sm">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full">
        <div className="w-full  rounded-lg shadow border sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={submitData}
              action={submitData}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium  text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className=" border  sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                  // disabled={true}
                  placeholder="email id"
                />
              </div>

              <div>
                <label
                  htmlFor="hospitalName"
                  className="block mb-2 text-sm font-medium  text-white"
                >
                  Hospital Name
                </label>
                <input
                  type="text"
                  name="hospitalName"
                  id="hospitalName"
                  placeholder="Hospital name"
                  className="border sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                  // required
                  autoComplete="off"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Contact Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="contact number"
                  className="border sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                  // required
                  minLength="10"
                  min="1"
                  onWheel={onWheel}
                  autoComplete="off"
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  City Name
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  placeholder="address of hospital"
                  className="border sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                  // required
                  autoComplete="off"
                />
              </div>

              <div>
                <label
                  htmlFor="pincode"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Pin code
                </label>
                <input
                  type="number"
                  name="pincode"
                  id="pincode"
                  placeholder="pincode"
                  className="border sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                  // required
                  onWheel={onWheel}
                  autoComplete="off"
                />
              </div>
              <button
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                onClick={addDepartment}
              >
                Add Department +
              </button>
              {departments.map((department, departmentIndex) => {
                return (
                  <div key={departmentIndex}>
                    <div>
                      <div className="block text-sm font-medium mt-6 text-white mb-2">
                        Department {departmentIndex + 1} :-
                      </div>
                      <label
                        htmlFor={`departmentName${departmentIndex}`}
                        className="block mb-2 text-sm font-medium text-white"
                      >
                        Department Name
                      </label>
                      <input
                        type="text"
                        name={`departmentName${departmentIndex}`}
                        id={`departmentName${departmentIndex}`}
                        placeholder="department name"
                        className="border sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                        // required
                        autoComplete="off"
                      />
                    </div>
                    {department.doctors.map((doctor, doctorIndex) => {
                      return (
                        <div key={doctorIndex}>
                          <label
                            htmlFor={`doctorName${doctorIndex}`}
                            className="block mb-2 mt-5 text-sm font-medium text-white"
                          >
                            Doctor Name
                          </label>
                          <input
                            type="text"
                            name={`doctorName${doctorIndex}`}
                            id={`doctorName${doctorIndex}`}
                            placeholder="doctor name"
                            className="border sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                            // required
                            autoComplete="off"
                          />
                          <div className="block text-sm font-medium mt-6 text-white mb-2">
                            Weekdays available on:
                          </div>
                          <div>
                            <div className="space-x-2">
                              <input
                                type="checkbox"
                                id={`weekdays${doctorIndex}`}
                                name={`weekdays${doctorIndex}`}
                                value="monday"
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              <label
                                htmlFor={`weekdays${doctorIndex}`}
                                className="text-sm text-white mr-2"
                              >
                                Monday
                              </label>

                              <input
                                type="checkbox"
                                id={`weekdays${doctorIndex}`}
                                name={`weekdays${doctorIndex}`}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                value="tuesday"
                              />
                              <label
                                htmlFor={`weekdays${doctorIndex}`}
                                className="text-sm text-white"
                              >
                                Tuesday
                              </label>

                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                id={`weekdays${doctorIndex}`}
                                name={`weekdays${doctorIndex}`}
                                value="wednesday"
                              />
                              <label
                                htmlFor={`weekdays${doctorIndex}`}
                                className="text-sm text-white"
                              >
                                Wednesday
                              </label>

                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                id={`weekdays${doctorIndex}`}
                                name={`weekdays${doctorIndex}`}
                                value="thursday"
                              />
                              <label
                                htmlFor={`weekdays${doctorIndex}`}
                                className="text-sm text-white"
                              >
                                Thursday
                              </label>
                            </div>
                            <div className="space-x-2">
                              <input
                                type="checkbox"
                                id={`weekdays${doctorIndex}`}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                name={`weekdays${doctorIndex}`}
                                value="friday"
                              />
                              <label
                                htmlFor={`weekdays${doctorIndex}`}
                                className="text-sm text-white"
                              >
                                Friday
                              </label>

                              <input
                                type="checkbox"
                                id={`weekdays${doctorIndex}`}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                name={`weekdays${doctorIndex}`}
                                value="saturday"
                              />
                              <label
                                htmlFor={`weekdays${doctorIndex}`}
                                className="text-sm text-white"
                              >
                                Saturday
                              </label>

                              <input
                                type="checkbox"
                                id={`weekdays${doctorIndex}`}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                name={`weekdays${doctorIndex}`}
                                value="sunday"
                              />
                              <label
                                htmlFor={`weekdays${doctorIndex}`}
                                className="text-sm text-white"
                              >
                                Sunday
                              </label>
                            </div>
                          </div>

                          {/* <div className="block mb-2 text-sm mt-6 font-medium text-white">
                            Choose a time for your meeting:
                          </div>
                          <div className="flex items-center">
                            <label
                              htmlFor="apptStart"
                              className="text-sm text-white mr-2"
                            >
                              Start:
                            </label>
                            <input
                              type="time"
                              id={`apptStart${doctorIndex}`}
                              name={`apptStart${doctorIndex}`}
                              min="06:00"
                              className="border sm:text-sm rounded-lg block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                              max="20:00"
                            />
                            <label
                              htmlFor={`apptEnd${doctorIndex}`}
                              className="text-sm text-white ml-4 mr-2"
                            >
                              End:
                            </label>
                            <input
                              type="time"
                              id={`apptEnd${doctorIndex}`}
                              name={`apptEnd${doctorIndex}`}
                              min="07:00"
                              max="24:00"
                              className="border sm:text-sm rounded-lg block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                              // required
                            />
                          </div> */}
                        </div>
                      );
                    })}
                    <button
                      type="button"
                      className="text-gray-900 block mt-5 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      onClick={() => addDoctor(departmentIndex)}
                    >
                      Add Doctor +
                    </button>
                  </div>
                );
              })}
              <button
                type="submit"
                className="relative inline-block text-lg group"
              >
                <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                  <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                  <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                  <span className="relative">Register</span>
                </span>
                <span
                  className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                  data-rounded="rounded-lg"
                ></span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HospitalForm;
