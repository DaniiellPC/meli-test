import { TYPES } from '@config/ioc/types'
import * as express from 'express'
import { inject } from 'inversify'
import {
  controller,
  httpPost,
  interfaces,
  next,
  request,
  response,
} from 'inversify-express-utils'
import joi from 'joi'
import { responseHttp } from '@utils/responseHttp'
import { topSecretRequestSchema } from './topSecret.model'
import { ICoordinadorService } from '~/services/coordinadorService'

@controller('')
export class TopSecretController implements interfaces.Controller {
  constructor(
    @inject(TYPES.ICoordinadorService)
    private coordinadorService: ICoordinadorService
  ) {}

  @httpPost('/topSecret')
  public async getSecretPosition(
    @request() req: express.Request,
    @response() res: express.Response,
    @next() nextFunc: express.NextFunction
  ) {
    const data = req.body
    const validationResult = topSecretRequestSchema.validate(data)

    if (validationResult.error) {
      // Si la validación de los datos de la solicitud falla, entonces retornar error 422
      console.error(
        `POST /v1/monedaExtranjera/liquidarTransferenciaEnviada - Formato de request invalido: ${validationResult.error}`
      )
      res.status(422).json(`${validationResult.error}`)
      nextFunc()
      return
    }
    // tslint:disable-next-line:no-shadowed-variable
    let response
    try {
      response = await this.coordinadorService.getSecret(data)
      if(!response) {
        res.status(404).json('No se puede determinar la posicion o el mensaje')
        nextFunc()
        return
      }
    } catch (error: any) {
      console.error(
        `${error.message} / ${error.internalError.message}`
      )

      res
        .status(error.statusCode)
        .json(error.internalError.message)
      nextFunc()
      return
    }
    // Si no hubo errores, responder la solicitud con 200
    res.status(200).json(response)
    nextFunc()
    return
  }
}
