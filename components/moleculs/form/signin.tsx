import Button from '@/components/atoms/button'
import Input from '@/components/atoms/input'
import { Formik, Field, Form, FormikHelpers } from 'formik'
import { validateEmail, validateName, validatePassword } from 'utils/validation'


type SigninFormValues = {
  email: string,
  password: string
}

export default function SigninForm() {
  const initialValues: SigninFormValues = {
    email: '',
    password: ''
  }

  const handleSubmit = (values: SigninFormValues, formikHelpers: FormikHelpers<SigninFormValues>): void | Promise<any> => {
    alert(JSON.stringify(values))
  }

  return (
    <div className="form">
      <Formik
        initialValues={initialValues} 
        onSubmit={handleSubmit}>{({ errors, touched, isValid }) => (
          <Form>
            <div className="form-group">
              <Field name="email" validate={validateEmail} as={Input} placeholder="email"/>
              {errors.email && touched.email && <span className="text-sm text-red-600 ml-1">{errors.email}</span>}
            </div>
            <div className="form-group">
              <Field name="password" validate={validatePassword} as={Input} placeholder="password"/>
              {errors.password && touched.password && <span className="text-sm text-red-600 ml-1">{errors.password}</span>}
            </div>
            <Button variant="contained" color="primary" type="submit" disabled={isValid ? false : true} className="w-full">Submit</Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
