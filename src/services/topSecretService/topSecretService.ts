import { TYPES } from '@config/ioc/types'
import { inject } from 'inversify'
import { provide } from 'inversify-binding-decorators'
import { ITopSecretService } from '.'



@provide(TYPES.ITopSecretService)
export class TopSecretService implements ITopSecretService {
  constructor(

  // tslint:disable-next-line: no-empty
  ) {}

  public getSecret = async (payload: any) => {
    console.log(`MonedaExtranjera: liquidarTransferencia > Inicio`)

    const response: any[] = []
    // let result
    try {
    //   response = result.Body.liquidarOperacionesEnviadasRiaResponse.Response
    } catch (err) {
      console.log(
        'enviarrecibir-dinero-service:operacionesLiquidacionRIA > ERROR:',
        err
      )
      return new Error()
    }
    return response
  }
}
