import { TYPES } from '@config/ioc/types'
import { inject } from 'inversify'
import { provide } from 'inversify-binding-decorators'
import { IMessageService } from '.'
import { satellitePositions } from '@utils/satelliteLocations'



@provide(TYPES.IMessageService)
export class GetMessage implements IMessageService {
  private mensajeActual: any[] = []
  private mensajeFinal = ''
  constructor(

    // tslint:disable-next-line: no-empty
  ) { }

  public getSecretMessage = async (messages: string[]): Promise<string> => {
    try {
      this.mensajeActual = [...this.mensajeActual, messages]

      let currentMessage = []
      if (this.mensajeActual.length > 1) {
        if (this.mensajeActual[this.mensajeActual.length - 1].length === this.mensajeActual[this.mensajeActual.length - 2].length) {
          let i = 0
          currentMessage = this.mensajeActual[0]
          for (i; i < messages.length; i++) {
            if (!currentMessage.includes(messages[i]) && !currentMessage[i]) {
              currentMessage[i] = messages[i]
            }
          }

        } else {
          return ''
        }
      }
      currentMessage.includes('') ? this.mensajeFinal = '' : this.mensajeFinal = currentMessage.join(' ')

    } catch (error: any) {
      return ''
    }


    return this.mensajeFinal
  }
}
