import * as yup from "yup"
const schema = yup.object().shape({
  id: yup.lazy((value) => {
    if (value !== undefined) {
      return yup.string().required()
    }
    return yup.string().notRequired()
  }),
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required()
})

export const fieldsRequired = async (data: object, isThrowError: boolean = false): Promise<any> => {
  const resultValidation = await schema.validate(data, {
    abortEarly: isThrowError
  })

  return resultValidation
}
