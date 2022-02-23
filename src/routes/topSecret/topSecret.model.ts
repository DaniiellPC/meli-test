import joi from 'joi'

const satellitesData = joi.object().keys({
  distance: joi.number().required(),
  name: joi.string().required(),
  message: joi.array().items(joi.string().allow('')).required()
})

export const topSecretRequestSchema = joi
  .object()
  .keys({
    satellites: joi
      .array()
      .items(satellitesData)
      .min(3)
      .max(3)
  })
  .required()
