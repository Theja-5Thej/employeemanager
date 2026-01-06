import React, { startTransition, useState } from 'react'
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {  useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { login } from '../Redux/userSlice';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),

});



const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex  scroll-container h-full  items-center justify-center bg-linear-to-br from-indigo-300 via-white to-blue-300 px-4">
      <div className="w-full max-w-112.5   px-2 py-8   rounded-2xl bg-white p-8 shadow-xl" >
        <h2 className="text-xl font-semibold text-center text-blue-500 mb-6">
          Login
        </h2>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            setLoading(true);
            dispatch(login(values));
            setLoading(false);
            startTransition(() => {
              navigate("/");
            });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="flex flex-col gap-2 max-w-75 mx-auto">
                <label
                  htmlFor="email"
                  className="text-md font-medium text-gray-700"
                >
                  Email Address
                </label>
                <Field
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="new-email"
                  placeholder="Please enter email address"
                  className="w-full rounded-lg border border-gray-300
                           px-4 py-2.5 text-sm text-gray-800
                           placeholder-gray-400 focus:border-indigo-500
                           focus:outline-none focus:ring-2
                           focus:ring-indigo-200"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-sm text-red-500"
                />
                <label
                  htmlFor="password"
                  className="text-md font-medium text-gray-700 mt-2"
                >
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  label="Password"
                  autoComplete="new-password"
                  placeholder="Please enter password"
                  name='password'
                  className="w-full rounded-lg border border-gray-300
                           px-4 py-2.5 text-sm text-gray-800
                           placeholder-gray-400 focus:border-indigo-500
                           focus:outline-none focus:ring-2
                           focus:ring-indigo-200"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-sm text-red-500"
                />
                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="mt-6 mx-auto px-6 py-2 rounded-md bg-blue-600 text-white disabled:opacity-60 font-medium "
                >
                  {loading ? "Please wait..." : "Login"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

    </div>
  )
}

export default Login