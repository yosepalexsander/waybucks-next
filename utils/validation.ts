

export function validateName<T extends string>(value: T): string {
  let error: string = '';
  if (!value) {
    error = `First name field is Required`
  } else if(value === 'admin') {
    error = 'Nice try!'
  } else if (!value.match(/\w{5,}/)) {
    error = 'Your name at least 5 characters with no symbols'
  }
  return error
}

export function validateEmail<T extends string>(value: T): string {
  let error: string = '';
  if (!value) {
    error = `Email field is Required`
  } else if(!value.match(/^([A-Z0-9._]+)@(\w+)\.[a-z]{3}$/i)) {
    error = 'Email is invalid'
  }
  return error
}

export function validatePassword<T extends string>(value: T): string {
  let error: string = '';
  if (!value) {
    error = 'Password field is Required'
  } else if(value.length < 8) {
    error = 'Password should contain at least 8 characters'
  } else if(!value.match(/[-@!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]+/)) {
    error = 'Your password should contain at least one symbol'
  }
  return error
}

export function validateGender<T extends string>(value: T): string {
  let error: string = ''
  if (!value) {
    error = 'Gender field is Required'
  } else if(!/^(male|female)$/.test(value)) {
    error = 'Gender must be male or female'
  }
  return error
}

export function validatePhone<T extends string>(value: T): string {
  let error: string = ''
  if (!value) {
    error = 'Phone field is Required'
  } else if(!/^(0|\+62)(\d{11,12})$/.test(value)) {
    error = 'Phone must be number with indonesia phone format'
  }
  return error
}