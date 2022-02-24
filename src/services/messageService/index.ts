export interface IMessageService {
    getSecretMessage(payload: any): Promise<string>
  }
