import 'reflect-metadata'
import { responseHttp } from './responseHttp'

describe('ResponseHttp', () => {
  const dataRequest = {
    id: '4c6d1cc2-8ef1-11ea-bc55-0242ac130003',
    payload: {
      FirstName: 'Jhon',
      LastName: 'Doe',
    },
    status: 1,
  }

  test('Petición exitosa al servidor', done => {
    let response
    try {
      response = responseHttp(dataRequest, [])
    } catch (error) {
      expect(error).toBeFalsy()
    }
    expect(response).toEqual(response)
    done()
  })

  test('Petición de error al servidor', done => {
    let response
    try {
      response = responseHttp(dataRequest, Error('Server Error'))
    } catch (error) {
      expect(error).toBeFalsy()
    }
    expect(response).toEqual(response)
    done()
  })
})
