import IParseMailTemplateDTO from '../../MailTemplateProvider/dtos/IParseMailTemplateDTO';

interface IContactMailDTO {
  name: string;
  email: string;
}

export interface ISendMailDTO {
  to: IContactMailDTO;
  from?: IContactMailDTO;
  subject: string;
  templateData: IParseMailTemplateDTO;
}
