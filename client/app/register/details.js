import React from "react";

const Details = () => {
  return (
    <div>
      <section className="pt-14 bg-gray-900 text-white">
        <div className="flex flex-col items-center justify-center px-6 mx-auto md:h-full py-0">
          {/* <img className="h-36 md:h-56 m-6" src="/img/cover.png" alt="logo" /> */}
          <div className="w-full  rounded-lg shadow border sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
            <div className="p-6 space-y-3 md:space-y-5 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
                Hospital Form
              </h1>

              <div className="text-sm">
                Fill details of the respective departments and doctors above to
                register your hospital.
              </div>

              <div className="text-sm">
                <p>Form registration:</p> <br />
                <ol className="text-sm space-y-3">
                  <li>
                    <p>
                      1. Add the departments like General Surgery,
                      Gastroenterology, Cardiology etc.
                    </p>
                  </li>
                  <li>
                    <p>2. Add doctors in the respective department.</p>
                  </li>
                  <li>
                    <p>
                      3. Fill time slot in which doctor is available for the
                      appointment.
                    </p>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Details;
