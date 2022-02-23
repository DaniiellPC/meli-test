import 'reflect-metadata'

import { createRequest, createResponse } from 'node-mocks-http'
import { errorHandler } from './errorHandlerMiddleware'

describe('ErrorHandler Middleware', () => {
  test('Error de sintaxis retorna 422', () => {
    // Preparacion de HTTP props
    const req = createRequest({
      method: 'GET',
      url: '/fake',
    })
    const res = createResponse()
    const next = () => {
      const a = 1
    }

    const err = new SyntaxError('Error de datos')

    // llamo al handler para que haga lo suyo
    errorHandler(err, req, res, next)
    res.end()
    expect(res._getStatusCode()).toBe(422)
  })

  test('Error que no sea de sintaxis retorna 500', () => {
    // Preparacion de HTTP props
    const req = createRequest({
      method: 'GET',
      url: '/fake',
    })
    const res = createResponse()
    const next = () => {
      const a = 1
    }

    const err = new Error('Error normal')

    // llamo al handler para que haga lo suyo
    errorHandler(err, req, res, next)
    res.end()
    expect(res._getStatusCode()).toBe(500)
  })
})
