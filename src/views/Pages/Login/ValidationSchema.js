import * as Yup from 'yup';

const validationSchema = function (values) {
    return Yup.object().shape({
      email: Yup.string()
      .email('Invalid email address')
      .required('Email is required!'),
      password: Yup.string()
      .required('Password is required'),
    })
  }

  const validate = (getValidationSchema) => {
    return (values) => {
      const validationSchema = getValidationSchema(values)
      try {
        validationSchema.validateSync(values, { abortEarly: false })
        return {}
      } catch (error) {
        return getErrorsFromValidationError(error)
      }
    }
  }
  
  const getErrorsFromValidationError = (validationError) => {
    const FIRST_ERROR = 0
    return validationError.inner.reduce((errors, error) => {
      return {
        ...errors,
        [error.path]: error.errors[FIRST_ERROR],
      }
    }, {})
  }
export {validationSchema,validate,getErrorsFromValidationError} ;