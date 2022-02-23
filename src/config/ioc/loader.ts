import { buildProviderModule, container } from '~/config/ioc/inversify.config'

/* REST Controllers */
import '@routes/topSecret/topSecret.controller'

/* Services */
import '@services/coordinadorService/coordinadorService'
import '@services/topSecretService/topSecretService'

container.load(buildProviderModule())
