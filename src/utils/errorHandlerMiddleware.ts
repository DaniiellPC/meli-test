
import { IResponse } from '@models/response.model'
import { NextFunction, Request, Response } from 'express'

// errorHandler es un middleware de express para retornar un mensaje consistente en los errores
// internos capturados en la API
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof SyntaxError) {
    const response: IResponse = {
      data: req.body,
      errors: ['Invalid data on request'],
    }
    res.status(422).json(response)
  } else {
    const response: IResponse = {
      data: {},
      errors: ['Internal server error'],
    }
    res.status(500).send(response)
  }
}
