// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import Database from '@ioc:Adonis/Lucid/Database';
import Client from 'App/Models/Client';

export default class ClientsController {
  public async index({ request, view, session }) {
    try {
      const page = request.input('page', 1);
      const limit = 500;
      const clients = await Database.from('clients').orderBy('id', 'desc').paginate(page, limit);
      clients.baseUrl('/clients');
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

  public async status({ response, session, params }) {
    try {
      const client = await Client.findOrFail(params.id);
      const { status } = params;
      client.status = status === '1' ? false : true;
      await client.save();
      session.flash({ success: 'Status do cliente atualizado com sucesso!' });
      return response.redirect('/clients');
    } catch (error) {
      console.log(error);
      session.flash({ error: 'Erro ao atualizar o status do cliente!' });
      return response.redirect('/clients');
    }
  }

  public async edit({}) {}

  public async update({}) {}

  public async destroy({}) {}
}
