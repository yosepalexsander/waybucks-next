import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { Formik, Field, Form, FormikHelpers } from 'formik'
import { validateEmail, validatePassword } from 'utils/validation'

import Input from '@/components/atoms/input'
import Button from '@/components/atoms/button'

import API, { createAxiosRequestConfig } from 'globals/api'
import { SigninResponse } from 'interfaces/interfaces'
import { Alert } from '@/components/atoms/alert'
import { CSSTransition } from 'react-transition-group'

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
  
  // handle open alert
  const [showAlert, setShowAlert] = useState(false)

  // for live feedback from formik
  const [didFocus, setDidFocus] = useState(false);
  const handleFocus = () => setDidFocus(true);

  const handleSubmit = async (values: SigninFormValues, formikHelpers: FormikHelpers<SigninFormValues>): Promise<any> => {
    const config = createAxiosRequestConfig({'Content-Type': 'application/json'})

    try {
      const response = await API().login<SigninResponse>(values, config) 
      if (response?.status === 200) {
        Cookies.set('token', response.data.payload.token)
        return
      }
      setError({isError: true, message: 'Your Email/Password does\'nt match'})
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {error.isError && (
        <CSSTransition
          in={showAlert}
          timeout={300}
          classNames="alert"
          unmountOnExit
        >   
          <Alert severity="error" onClose={() => setShowAlert(false)}>{error.message}</Alert>
        </CSSTransition>
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
                {!!didFocus && values.email.trim().length > 2 || touched.email 
                  ?(<span aria-live="polite" className="text-sm text-red-600 ml-1">{errors.email}</span>) : null}
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
                {!!didFocus && values.password.trim().length > 2 || touched.password 
                  ?(<span aria-live="polite" className="text-sm text-red-600 ml-1">{errors.password}</span>) : null}
              </div>
              <Button variant="contained" color="primary" type="submit" disabled={isValid ? false : true} className="w-full mt-2 mb-2">Submit</Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}
