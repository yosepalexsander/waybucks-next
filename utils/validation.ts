import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
  name: Yup.string().matches(/\w{5,20}/, 'Your name at least 5 characters with no symbols') .not(['admin'], 'Nice try!').required('Name is required'),
  email: Yup.string().email('Invalid Email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password should contain at least 8 characters').max(16, 'Password maximum 16 characters')
    .matches(/[-@!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]+/, 'Your password should contain at least one symbol').required('Password is required'),
  gender: Yup.string().oneOf(['male', 'female'], 'Gender must be male or female').required('Gender is required'),
  phone: Yup.string().matches(/^(0|\+62)(\d{11,12})$/, 'Phone must be number with indonesia phone format').required('Phone is required')
})

export const SigninSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password should contain at least 8 characters')
    .max(16, 'Password maximum 16 characters')
    .required('Password is required')
})

export const AddressSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  address: Yup.string().required('Address is required'),
  phone: Yup.string().matches(/^(0|\+62)(\d{11,12})$/, 'Phone must be number with indonesia phone format').required('Phone is required'),
  postal_code: Yup.number().integer().min(5).max(5).positive('postal code must be positive') .required('Postal code is required'),
  city: Yup.string().required('City is required')
})