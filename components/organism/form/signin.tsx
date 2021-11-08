import React, { useState } from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { validateEmail, validatePassword } from 'utils/validation';

import Input from '@/components/atoms/input';
import Button from '@/components/atoms/button';
import Alert from '@/components/atoms/alert';

import {login, createAxiosRequestConfig } from 'utils/api';
import { SigninResponse } from 'interfaces/api';
import { authLogin } from 'utils/auth';


type SigninFormValues = {
  email: string,
  password: string
}

export default function SigninForm() {
  const initialValues: SigninFormValues = {
    email: '',
    password: ''
  }

  // for handle registration reply
  const [error, setError] = useState({
    isError: false,
    message: ''
  })
  
  // handle show alert
  const [showAlert, setShowAlert] = useState(false)

  // for live feedback from formik
  const [didFocus, setDidFocus] = useState(false);
  const handleFocus = () => setDidFocus(true);

  const handleSubmit = async (values: SigninFormValues, formikHelpers: FormikHelpers<SigninFormValues>): Promise<any> => {
    const config = createAxiosRequestConfig({'Content-Type': 'application/json'})

    try {
      const {data, ...response} = await login<SigninResponse>(values, config) 
      if (response.status === 200) {
        authLogin({
          id: data.payload.id, 
          token: data.payload.token,
          redirect: '/'
        })
        return
      }
      setError({isError: true, message: 'Your Email/Password does\'nt match'})
      setShowAlert(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {error.isError && (
        <Alert severity="error" open={showAlert} position={{top: 50}} onClose={() => setShowAlert(false)}>{error.message}</Alert>
      )}
      <div className="form">
        <Formik
          initialValues={initialValues} 
          onSubmit={handleSubmit}>{({ errors, touched, isValid, values }) => (
            <Form>
              <div className="form-group">
                <Field 
                  id="email" 
                  name="email" 
                  label="Email"
                  type="email" 
                  onFocus={handleFocus}
                  className={values.email ? 'not-empty': ''}
                  validate={validateEmail} as={Input} 
                />
                {(!!didFocus && values.email.trim().length > 2) || touched.email ? (
                  <div aria-live="polite" className="h-3 text-sm text-red-600 ml-1">
                    {errors.email}
                  </div>
                ) : (
                  <div className="h-3"></div>
                )}
              </div>
              <div className="form-group">
                <Field 
                  id="password"
                  name="password" 
                  label="Password"
                  type="password"
                  onFocus={handleFocus}
                  className={values.password ? 'not-empty': ''}
                  validate={validatePassword} as={Input}
                />
                {(!!didFocus && values.password.trim().length > 2) || touched.password ? (
                  <div aria-live="polite" className="h-3 text-sm text-red-600 ml-1">
                    {errors.password}
                  </div>
                ) : (
                  <div className="h-3"></div>
                )}
              </div>
              <Button variant="contained" color="primary" type="submit" disabled={isValid ? false : true} className="w-full mt-2 mb-2">Submit</Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}
