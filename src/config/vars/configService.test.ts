//
// Copyright (C) 2020 - Banco Davivienda S.A. y sus filiales.
//

import 'reflect-metadata'
import { ConfigService } from './configService'

const vars = {
  authServiceUrl: 'AUTH_SERVICE_URL',
  enviarRecibirDineroService: 'ENVIAR_RECIBIR_DINERO_SERVICE_URL',
  frontUrl: 'ERD_FRONT_URL',
  loggerLevel: 'LOGGER_LEVEL',
  nodeEnv: 'NODE_ENV',
  persistenceServiceUrl: 'PERSISTENCE_SERVICE_URL',
  port: 'PORT',
  rootPath: 'ROOT_PATH',
}

describe('ConfigService', () => {
  const config = new ConfigService()

  test('getVars devuelve undefined antes de llamar a load', () => {
    const env = config.getVars()
    expect(env).toBeUndefined()
  })

  test('load da error de validación si no estan configuradas las variables requeridas', () => {
    const err = config.load()
    expect(err).toContain('Config validation error:')
  })

  test('load NO da error de validación si estan configuradas las variables requeridas', () => {
    process.env[vars.nodeEnv] = 'testing'
    process.env[vars.rootPath] = 'some-path'
    process.env[vars.authServiceUrl] = 'some-path'
    process.env[vars.enviarRecibirDineroService] = 'some-path'
    process.env[vars.persistenceServiceUrl] = 'some-path'
    process.env[vars.frontUrl] = 'some-path'

    const err = config.load()
    expect(err).toBeFalsy()
    expect(config.getVars()).toBeTruthy()
  })

  test('NODE_ENV invalido da error', () => {
    process.env[vars.nodeEnv] = 'invalid-value'

    const err = config.load()
    expect(err).toContain('Config validation error:')
    expect(config.getVars()).toBeFalsy()
  })

  test('NODE_ENV development carga correctamente', () => {
    process.env[vars.nodeEnv] = 'development'

    const err = config.load()
    expect(err).toBeFalsy()
    expect(config.getVars().env).toEqual('development')
    expect(config.getVars().isDev).toBeTruthy()
  })

  test('NODE_ENV testing carga correctamente', () => {
    process.env[vars.nodeEnv] = 'testing'

    const err = config.load()
    expect(err).toBeFalsy()
    expect(config.getVars().env).toEqual('testing')
    expect(config.getVars().isTest).toBeTruthy()
  })

  test('NODE_ENV production carga correctamente', () => {
    process.env[vars.nodeEnv] = 'production'

    const err = config.load()
    expect(err).toBeFalsy()
    expect(config.getVars().env).toEqual('production')
    expect(config.getVars().isProd).toBeTruthy()
  })

  test('PORT defaults to 8080', () => {
    expect(config.getVars().server.port).toEqual(8080)
  })

  test('PORT carga correctamente', () => {
    process.env[vars.port] = '5050'

    const err = config.load()
    expect(err).toBeFalsy()
    expect(config.getVars().server.port).toEqual(5050)
  })

  test('ROOT_PATH carga correctamente', () => {
    process.env[vars.rootPath] = 'some-123-path'

    const err = config.load()
    expect(err).toBeFalsy()
    expect(config.getVars().server.rootPath).toEqual('some-123-path')
  })

  test('LOGGER_LEVEL defaults to info', () => {
    expect(config.getVars().logger.level).toEqual('info')
  })

  test('LOGGER_LEVEL invalido da error', () => {
    process.env[vars.loggerLevel] = 'invalid'

    const err = config.load()
    expect(config.getVars()).toBeFalsy()
    expect(err).toContain('Config validation error:')
  })

  test('LOGGER_LEVEL carga correctamente', () => {
    process.env[vars.loggerLevel] = 'verbose'

    const err = config.load()
    expect(err).toBeFalsy()
    expect(config.getVars().logger.level).toEqual('verbose')
  })
})
