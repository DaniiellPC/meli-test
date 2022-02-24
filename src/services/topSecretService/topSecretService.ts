import { TYPES } from '@config/ioc/types'
import { inject } from 'inversify'
import { provide } from 'inversify-binding-decorators'
import { ITopSecretService } from '.'
import { satellitePositions } from '@utils/satelliteLocations'



@provide(TYPES.ITopSecretService)
export class TopSecretService implements ITopSecretService {
  constructor(

  // tslint:disable-next-line: no-empty
  ) {}

  public getLocation = async (distances: number[]): Promise<object> => {
    const response = {
      x: '',
      y: '',
      value: false
    }
    try {
      const coordinates: number[][] = Object.values(satellitePositions)

      const [x1, y1] = [coordinates[0][0], coordinates[0][1]]
      const [x2, y2] = [coordinates[1][0], coordinates[1][1]]
      const [x3, y3] = [coordinates[2][0], coordinates[2][1]]

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

      if (!x || !y) return response
      response.x = x.toString()
      response.y = y.toString()
      response.value = true
    } catch (error: any) {
      return response
    }

    return response
  }
}
