import { provide } from '@config/ioc/inversify.config'
import { TYPES } from '@config/ioc/types'
import { inject } from 'inversify'
import { ICoordinadorService } from '.'
import { ITopSecretService } from '../topSecretService'
import { IMessageService } from '../messageService'

@provide(TYPES.ICoordinadorService)
export class CoordinadorService implements ICoordinadorService {
  constructor(
    @inject(TYPES.ITopSecretService)
    private topSecretService: ITopSecretService,
    @inject(TYPES.IMessageService)
    private messageService: IMessageService
  ) { }


  public getSecret = async (payload: any) => {
    const response = {
      message: '',
      position: {}
    }

    let distances: number[] = []
    let message: any
    let i = 0
    for (i; i < payload.satellites.length; i++) {
      distances = [...distances, payload.satellites[i].distance]
      message = await this.messageService.getSecretMessage(payload.satellites[i].message)
    }

    const location: any = await this.topSecretService.getLocation(distances)

    if(!message || !location.value) {
      return false
    }

    response.position = location
    response.message = message

    return response
  }
}
