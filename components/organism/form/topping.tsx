/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';

import Input from '@/components/atoms/input';
import Button from '@/components/atoms/button';
import Alert from '@/components/atoms/alert';

import { ToppingSchema } from 'utils/validation';
import { createAxiosRequestConfig, postTopping, updateTopping } from 'utils/api';
import { CommonResponse } from 'interfaces/api';
import { Topping } from 'interfaces/object';
import { AttachmentIcon } from 'icons';

type ToppingValues = {
  name: string
  price: number
}

type ProductProps = {
  oldProduct?: Topping
  isUpdate?: boolean
  formTopping?: boolean
  onSubmitSuccess: () => void
}


export default function ToppingForm({oldProduct, isUpdate, formTopping, onSubmitSuccess}: ProductProps) {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>()
  const [image, setImage] = useState<File>()
  const initialValues: ToppingValues = {
    name: oldProduct?.name || '',
    price: oldProduct?.price || 0,
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

  const onChangeImage = (files: FileList | null) => {
    if (files) {
      const file = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        setPreview(reader.result)
      }
      setImage(file)
    }
  }
  const handleSubmit = async (values: ToppingValues, formikHelpers: FormikHelpers<ToppingValues>): Promise<any> => {
    const config = createAxiosRequestConfig({
      'Content-Type': 'application/json'
    })
    const onResponse = (status: number) => {
      if (status !== 200) {
        setShowAlert(true)
        setError({
          isError: true,
          message: 'Invalid request'
        })
        return
      }
      onSubmitSuccess()
    }
    try {
      if (image) {
        const body = new FormData()
        body.set('name', values.name)
        body.set('price', `${values.price}`)
        body.set('image', image, image.name)
        const { data, ...response } = isUpdate 
          ? await updateTopping<CommonResponse>(oldProduct?.id as number, body) 
          : await postTopping<CommonResponse>(body) 
        onResponse(response.status)
      } else {
        const body: Record<string, any> = { ...values }
        const { data, ...response } = isUpdate 
          ? await updateTopping<CommonResponse>(oldProduct?.id as number, body, config) 
          : await postTopping<CommonResponse>(body, config) 
        onResponse(response.status)
      }
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
          validationSchema={ToppingSchema}
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
                  id="price"
                  name="price" 
                  label="Price"
                  type="number"
                  onFocus={handleFocus}
                  className={values.price >= 0 ? 'not-empty': ''}
                  as={Input}
                />
                {!!didFocus && touched.price ? (
                  <div aria-live="polite" className="h-3 text-sm text-red-600 ml-1">
                    {errors.price}
                  </div>
                ) : (
                  <div className="h-3"></div>
                )}
              </div>
              <div className="form-group">
                <input 
                  id="upload" 
                  type="file" 
                  name="image" 
                  hidden accept="image/*"
                  onChange={e => onChangeImage(e.target.files)}
                />
                <label htmlFor="upload">
                  Attachment <span id="file-chosen"><AttachmentIcon size="24"/></span>
                </label>
                {preview ? (
                  <img aria-live="polite" alt="preview" src={preview as string} width={100} height={100} className="mt-5"/>
                ) : (
                  <div className="h-15 w-15">
                    {oldProduct?.image && (<img alt="previous image" src={oldProduct.image} width={100} height={100} className="mt-5" />)}
                  </div>
                )}
              </div>
              <Button variant="contained" color="primary" type="submit" disabled={!isValid && !image} className="w-full mt-2 mb-2">Submit</Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}