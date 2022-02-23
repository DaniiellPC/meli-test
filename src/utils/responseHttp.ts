import { IResponse } from '@models/response.model'

export const responseHttp = (data: any, errors: any) => {
  const httpResponse: IResponse = { data, errors }
  return httpResponse
}
