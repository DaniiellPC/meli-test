import { provide } from '@config/ioc/inversify.config'
import { TYPES } from '@config/ioc/types'
import { IConfig } from '@config/vars'
import { inject } from 'inversify'
import { ICoordinadorService } from '.'
import { ITopSecretService } from '../topSecretService'
import { satellitePositions } from '@utils/satelliteLocations'

@provide(TYPES.ICoordinadorService)
export class CoordinadorService implements ICoordinadorService {
  private mensajeActual: any[] = []
  private mensajeFinal = ''
  constructor(
    @inject(TYPES.ITopSecretService)
    private topSecretService: ITopSecretService
  ) { }


  public getSecretPosition = async (payload: any) => {


    let distances: number[] = []
    let i = 0
    for (i; i < payload.satellites.length; i++) {
      distances = [...distances, payload.satellites[i].distance]
      this.setMessage(payload.satellites[i].message)
    }

    const response = this.getLocation(distances)


    // const curretMessage =
    const finalMessage = this.mensajeFinal

    return finalMessage
  }

  private getLocation = (distances: number[]): object => {
    const response = {
      x: '',
      y: ''
    }

    const coordinates: number[][] = Object.values(satellitePositions)

    // let xValues: any[] = []
    // let yValues: any[] = []
    // let i = 0
    // let j = 1
    // for (i; i < coordinates.length; i++) {
    //   for (j; j < coordinates[i].length; j++) {
    //     yValues.push(coordinates[i][j])
    //     xValues.push(coordinates[i][j - 1])

    //     // yValues = [...yValues, coordinates[i][j]]
    //     // xValues = [...xValues, coordinates[i][j - 1]]
    //   }
    // }

    // xValues = this.parseData(xValues)
    // yValues = this.parseData(yValues)

    const [x1, y1] = [coordinates[0][0], coordinates[0][1]]
    const [x2, y2] = [coordinates[1][0], coordinates[1][1]]
    const [x3, y3] = [coordinates[2][0], coordinates[2][1]]

    // const y1 = yValues[0]
    // const x2 = xValues[1]
    // const y2 = yValues[1]
    // const x3 = xValues[2]
    // const y3 = yValues[2]
    const r1 = distances[0]
    const r2 = distances[1]
    const r3 = distances[2]

    const A = 2 * x2 - 2 * x1
    const B = 2 * y2 - 2 * y1
    const C = r1 ** 2 - r2 ** 2 - x1 ** 2 + x2 ** 2 - y1 ** 2 + y2 ** 2
    const D = 2 * x3 - 2 * x2
    const E = 2 * y3 - 2 * y2
    const F = r2 ** 2 - r3 ** 2 - x2 ** 2 + x3 ** 2 - y2 ** 2 + y3 ** 2
    const x = (C * E - F * B) / (E * A - B * D)
    const y = (C * D - A * F) / (B * D - A * E)
    response.x = x.toString()
    response.y = y.toString()
    return response
  }

  private parseData = (positions: string[]): number[] => {
    const parse = positions.map((element: string) => parseFloat(element))
    return parse
  }

  private setMessage = (messages: string[]): string => {
    this.mensajeActual = [...this.mensajeActual, messages]

    let currentMessage = []
    if(this.mensajeActual.length > 1) {
      if(this.mensajeActual[this.mensajeActual.length - 1].length === this.mensajeActual[this.mensajeActual.length - 2].length) {
        let i = 0
        currentMessage = this.mensajeActual[0]
          for (i; i < messages.length; i++) {
            if(!currentMessage.includes(messages[i]) && !currentMessage[i]) {
              currentMessage[i] = messages[i]
            }
          }

      } else {
        throw new Error('tienen diferente longitud')
      }
    }

    this.mensajeFinal = currentMessage.join(' ')


    return ''
  }

  private getMessage = () => {
    return this.mensajeActual
  }
}
