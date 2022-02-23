import joi from 'joi'

import { IConfig } from '.'

export class ConfigService implements IConfig {
  private vars: any

  constructor() {
    this.vars = undefined
  }

  /**
   * Retorna las variables de ambientes cargadas
   * @returns {any} Objeto con variables de ambiente
   */
  public getVars = () => {
    return this.vars
  }

  /**
   * Lee las variables de ambientes, valida su contenido y las carga en servicio de configuracion.
   *
   * @returns {string} Error - En caseo de ocurrir errores de validación, devuelve un mensaje de error, caso contrario retorna null.
   */
  public load = () => {
    const envVarsSchema = joi
      .object({
        // HTTP Server
        PORT: joi.number().default(5000),
        ROOT_PATH: joi.string().optional(),
      })
      .unknown()
      .required()
    const validation = envVarsSchema.validate(process.env)
    if (validation.error) {
        this.vars = undefined
        return `Config validation error: ${validation.error.message}`
    }
    this.vars = {
      server: {
        port: parseInt(validation.value.PORT, 10),
        rootPath: validation.value.ROOT_PATH,
      },
    }
    return null
  }
}