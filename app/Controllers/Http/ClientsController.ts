// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class ClientsController {
  public async index({ request, view, session }) {
    try {
      // const page = request.input('page', 1);
      // const limit = 500;
      // const clients = await Database.from('clients').orderBy('id', 'desc').paginate(page, limit);
      // clients.baseUrl('/clients');
      const clients = [
        {
          name: 'João',
          cnpj: '00000000000000',
          phone: '00000000000',
          cellphone: '1111111111',
          system: 'teste',
          status: true,
        },
        {
          name: 'João',
          cnpj: '00000000000000',
          phone: '1111111111',
          cellphone: '00000000000',
          system: 'teste',
          status: false,
        },
        {
          name: 'João',
          cnpj: '00000000000000',
          phone: '11111111111',
          cellphone: '0000000000',
          system: 'teste',
          status: true,
        },
      ];
      return view.render('clients/index', { clients });
    } catch (error) {
      console.log(error);
      session.flash({ error: 'Erro ao listar os clientes!' });
      return view.render('clients/index', { clients: [] });
    }
  }

  public async create({ view, session }) {
    try {
      return view.render('clients/create');
    } catch (error) {
      console.log(error);
      session.flash({ error: 'Erro ao cadastrar um novo cliente!' });
      return view.render('back');
    }
  }

  public async store({}) {}

  public async show({}) {}

  public async edit({}) {}

  public async update({}) {}

  public async destroy({}) {}
}
