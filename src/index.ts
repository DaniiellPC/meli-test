// tslint:disable-next-line: no-var-requires
require('module-alias/register')

// Permitir cargar variables de entorno desde .env para ambientes de development o testing
import dotenv from 'dotenv'
dotenv.config()

// Importar Reflect antes que Inversify
import 'reflect-metadata'
import { ConfigService } from '@config/vars/configService'

// Importar dependencias de Express y de Inversify
import bodyParser from 'body-parser'
import { InversifyExpressServer } from 'inversify-express-utils'
import { container } from '~/config/ioc/inversify.config'
import { errorHandler } from '~/utils/errorHandlerMiddleware'
import { TYPES } from './config/ioc/types'

const config = new ConfigService()
const configErr = config.load()
if (configErr) throw new Error(configErr)

// middlewares
// Obtener variables de configuración desde entorno
const httpPort = config.getVars().server.port
const httpRootPath = config.getVars().server.rootPath


// Cargar las entidades inyectables
// la anotación @provide() las registra automaticamente
import '@config/ioc/loader'

// registrar instancia de config en container de dependencias
container.bind<any>(TYPES.IConfig).toConstantValue(config)

// Configurar wrap de Express con Inversify para proveer inversión de control e inyección de dependencias
const server = new InversifyExpressServer(container, null, {
    rootPath: httpRootPath,
})

server.setConfig(expressApp => {
    expressApp.use(bodyParser.json())
    expressApp.use(errorHandler)
})
const app = server.build()
// app.use(indexRoutes)

// Iniciar el servidor HTTP
const httpServer = app.listen(httpPort, () => {
    console.log(`Server on port: ${httpPort}`)
})

exports = module.exports = app