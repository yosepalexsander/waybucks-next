import { useState } from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';


import Input from '@/components/atoms/input';
import Button from '@/components/atoms/button';
import Alert from '@/components/atoms/alert';

import { AddressSchema } from 'utils/validation';
import { createAxiosRequestConfig, postAddress, updateAddress } from 'utils/api';
import { Address } from 'interfaces/object';

type AddressValues = {
  name: string
  address: string
  phone: string
  postal_code: number
  city: string
}

type AddressProps = {
  oldAddress?: Address,
  isUpdate?: boolean,
  onSubmitSuccess: () => void
} // reusable for update addres form
export default function AddressForm({oldAddress, isUpdate, onSubmitSuccess}: AddressProps) {
  
  const initialValues: AddressValues = {
    name: oldAddress?.name || '',
    address: oldAddress?.address || '',
    phone: oldAddress?.phone || '',
    postal_code: oldAddress?.postal_code || 0,
    city: oldAddress?.city || '',
  }
  
  // for handle notify error post address 
  const [error, setError] = useState({
    isError: false,
    message: ''
  })
  
  // handle show alert
  const [showAlert, setShowAlert] = useState(false)

  // for live feedback from formik
  const [didFocus, setDidFocus] = useState(false);
  const handleFocus = () => setDidFocus(true);

  const handleSubmit = async (values: AddressValues, formikHelpers: FormikHelpers<AddressValues>): Promise<any> => {
    const config = createAxiosRequestConfig({
      'Content-Type': 'application/json'
    })
    
    const body: Record<string, any> = { ...values }
    try {
      const { data, ...response } = isUpdate 
        ?  await updateAddress(oldAddress?.id as number, body, config) 
        : await postAddress(body, config) 
      if (response.status !== 200) {
        setShowAlert(true)
        setError({
          isError: true,
          message: data.message
        })
        return
      }
      onSubmitSuccess()
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
          enableReinitialize={true}
          initialValues={initialValues} 
          validationSchema={AddressSchema}
          onSubmit={handleSubmit}>{({ errors, touched, isValid, values }) => (
            <Form>
              <div className="form-group">
                <Field 
                  id="name" 
                  name="name" 
                  label="Name"
                  onFocus={handleFocus}
                  className={values.name ? 'not-empty': ''}
                  as={Input} 
                />
                {(!!didFocus && values.name.trim().length > 2) || touched.name ? (
                  <div aria-live="polite" className="h-3 text-sm text-red-600 ml-1">
                    {errors.name}
                  </div>
                ) : (
                  <div className="h-3"></div>
                )}
              </div>
              <div className="form-group">
                <Field 
                  id="address"
                  name="address" 
                  label="Address"
                  onFocus={handleFocus}
                  className={values.address ? 'not-empty': ''}
                  as={Input}
                />
                {(!!didFocus && values.address.trim().length > 2) || touched.address ? (
                  <div aria-live="polite" className="h-3 text-sm text-red-600 ml-1">
                    {errors.address}
                  </div>
                ) : (
                  <div className="h-3"></div>
                )}
              </div>
              <div className="form-group">
                <Field 
                  id="postal_code"
                  name="postal_code" 
                  label="Postal Code"
                  type="number"
                  onFocus={handleFocus}
                  className={values.postal_code >= 0 ? 'not-empty': ''}
                  as={Input}
                />
                {!!didFocus && touched.postal_code ? (
                  <div aria-live="polite" className="h-3 text-sm text-red-600 ml-1">
                    {errors.postal_code}
                  </div>
                ) : (
                  <div className="h-3"></div>
                )}
              </div>
              <div className="form-group">
                <Field 
                  id="phone"
                  name="phone" 
                  label="Phone"
                  onFocus={handleFocus}
                  className={values.phone ? 'not-empty': ''}
                  as={Input}
                />
                {(!!didFocus && values.phone.trim().length > 2) || touched.phone ? (
                  <div aria-live="polite" className="h-3 text-sm text-red-600 ml-1">
                    {errors.phone}
                  </div>
                ) : (
                  <div className="h-3"></div>
                )}
              </div>
              <div className="form-group">
                <Field 
                  id="city"
                  name="city" 
                  label="City"
                  onFocus={handleFocus}
                  className={values.city ? 'not-empty': ''}
                  as={Input}
                />
                {(!!didFocus && values.city.trim().length > 2) || touched.city ? (
                  <div aria-live="polite" className="h-3 text-sm text-red-600 ml-1">
                    {errors.city}
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