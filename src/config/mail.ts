interface IMailConfig {
  driver: 'ethereal';
  defaults: {
    from: {
      name: string;
      email: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      name: 'TireiTU comunicações publicas',
      email: 'comunicacoes.publicas@tireitu.com.br',
    },
  },
} as IMailConfig;
