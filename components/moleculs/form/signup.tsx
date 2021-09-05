import { Formik, Field, Form, FormikHelpers } from 'formik'
import { validateEmail, validateName, validatePassword } from 'utils/validation'
import Button from '@/components/atoms/button'
import Input from '@/components/atoms/input'

type SignupFormValues = {
  name: string,
  email: string,
  password: string
}

export default function SignupForm() {
  const initialValues: SignupFormValues = {
    name: '',
    email: '',
    password: ''
  }

  const handleSubmit = (values: SignupFormValues, formikHelpers: FormikHelpers<SignupFormValues>): void | Promise<any> => {
    alert(JSON.stringify(values))
  }

  return (
    <div className="form">
      <Formik
        initialValues={initialValues} 
        onSubmit={handleSubmit}>{({ errors, touched, isValid }) => (
          <Form>
            <div className="form-group">
              <Field name="name" validate={validateName} as={Input} placeholder="username"/>
              {errors.name && touched.name && <span className="text-red-600 ml-1">{errors.name}</span>}
            </div>
            <div className="form-group">
              <Field name="email" validate={validateEmail} as={Input} placeholder="email"/>
              {errors.email && touched.email && <span className="text-red-600 ml-1">{errors.email}</span>}
            </div>
            <div className="form-group">
              <Field name="password" validate={validatePassword} as={Input} placeholder="password"/>
              {errors.password && touched.password && <span className="text-red-600 ml-1">{errors.password}</span>}
            </div>
            <Button variant="contained" color="primary" type="submit" disabled={isValid ? false : true} className="w-full">Submit</Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
