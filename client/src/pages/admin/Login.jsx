import React, {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialValues);
  const [dataErrors, setDataErrors] = useState({});
  const [isSubmit, seIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // console.log(formData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setDataErrors(validate(formData));
    seIsSubmit(true);
    if (Object.keys(dataErrors).length === 0 && isSubmit) {
      console.log(formData, "okkkk");
	//   logIn(formData)
	
        navigate("/admin");
      
    }
  };



  const validate = (values) => {
    const errors = {};
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!values.email) {
      errors.email = "email is required";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "This is not a valid email";
    }
    if (!values.password) {
      errors.password = "password is required";
    } else if (values.password.length < 4) {
      errors.password = "password must be morethan 4 characters";
    } else if (values.password.length > 8) {
      errors.password = "password cannot exceed morethan 8 characters";
    }

    return errors;
  };
  return (
    <>
      {/* <!-- component --> */}
      <div className="font-mono bg-specclr h-screen flex py-20">
        {/* <!-- Container --> */}
        <div className="container mx-auto ">
          <div className="flex justify-center px-6">
            {/* <!-- Row --> */}
            <div className="w-full xl:w-3/4 lg:w-11/12 flex">
              {/* <!-- Col --> */}

              {/* <!-- Col --> */}
              <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-r-none">
                <h3 className="pt-4 text-2xl text-center">
                 Admin SignIn 
                </h3>
                <form
                  className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                  onSubmit={handleSubmit}
                >
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      for="email"
                    >
                      Email
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <p className="text-red-700 text-xs italic">
                      {dataErrors.email}
                    </p>
                  </div>

                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      for="password"
                    >
                      Password
                    </label>
                    {/* <i className="ri-eye-off-fill pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 " /> */}

                    <input
                      className=" w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="password"
                      type="password"
                      name="password"
                      placeholder="******************"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <p className="text-xs italic text-red-700">
                      {dataErrors.password}.
                    </p>
                  </div>

                  <div className="mb-6 text-center">
                    <button
                      className="w-full px-4 py-2 font-bold text-white  bg-specclr rounded-full hover:bg-cyan-900 focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      SignIn
                    </button>
                  </div>
                  <hr className="mb-6 border-t" />
                  <div className="text-center">
                    <p
                      className="inline-block text-sm text-specclr align-baseline hover:text-cyan-700"
                      href="#"
                    >
                      Forgot Password?
                    </p>
                  </div>
                  <div className="text-center">
                    <Link to="/register">
                      <a
                        className="inline-block text-sm text-specclr align-baseline hover:text-cyan-700"
                        href="./index.html"
                      >
                        Crate an account? SignUp!
                      </a>
                    </Link>
                  </div>
                </form>
              </div>
              <div
                className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-r-lg"
                style={{
                  backgroundImage: `url('https://media.istockphoto.com/id/1301421740/vector/abstract-backdrop-yellow-background-minimal-empty-space-with-soft-light.jpg?s=612x612&w=0&k=20&c=LmAvP9miV9gxAX4eUd5HtMEhP3Sf5sN8HPz6vCoEBfQ=')`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
