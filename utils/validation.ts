

export function validateName<T extends string>(value: T): string {
  let error: string = '';
  if (!value) {
    error = `First name field is Required`
  } else if(value === 'admin') {
    error = 'Nice try!'
  } else if (value.match(/\W+/)) {
    error = 'Your name should not contain symbols'
  }
  return error
}

export function validateEmail<T extends string>(value: T): string {
  let error: string = '';
  if (!value) {
    error = `Email field is Required`
  } else if(!value.match(/^[A-Z0-9._]+@[a-z0-9.-]+\.[a-z]{2,4}$/i)) {
    error = 'Invalid email address'
  }
  return error
}

export function validatePassword<T extends string>(value: T): string {
  let error: string = '';
  if (!value) {
    error = `Password field is Required`
  } else if(value.length < 8) {
    error = 'Password should contain at least 8 characters'
  } else if(!value.match(/[-@!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]+/)) {
    error = 'Your password should contain at least one symbol'
  }
  return error
}