// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import Database from '@ioc:Adonis/Lucid/Database';
import Client from 'App/Models/Client';

export default class ClientsController {
  public async index({ request, view, session }) {
    try {
      const page = request.input('page', 1);
      const limit = 500;
      const clients = await Database.from('clients').orderBy('id', 'desc').paginate(page, limit);
      clients.baseUrl('/client');
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

  public async store({ request, response, session }) {
    try {
      const body = request.all();
      body.name = body.name.toUpperCase();
      body.corporateName = body.corporateName.toUpperCase();
      body.clientEmail = body.clientEmail.toLowerCase();
      body.sat === 'on' ? (body.sat = true) : (body.sat = false);
      body.nfe === 'on' ? (body.nfe = true) : (body.nfe = false);
      const client = await Client.findBy('cnpj', body.cnpj);
      if (client) {
        session.flash({ error: 'Cliente já cadastrado!' });
        return response.redirect('back');
      }
      await Client.create(body);
      session.flash({ success: 'Cliente criado com sucesso!' });
      return response.redirect('/client');
    } catch (error) {
      console.log(error);
      session.flash({ error: 'Erro ao cadastrar o novo cliente!' });
      return response.redirect('back');
    }
  }

  public async status({ response, session, params }) {
    try {
      const client = await Client.findOrFail(params.id);
      const { status } = params;
      client.status = status === '1' ? false : true;
      await client.save();
      session.flash({ success: 'Status do cliente atualizado com sucesso!' });
      return response.redirect('/client');
    } catch (error) {
      console.log(error);
      session.flash({ error: 'Erro ao atualizar o status do cliente!' });
      return response.redirect('/client');
    }
  }

  public async edit({ response, params, view, session }) {
    try {
      const client = await Client.findOrFail(params.id);
      return view.render('Clients/edit', { client: client.toJSON() });
    } catch (error) {
      console.log(error);
      session.flash({ error: 'Cliente não encontrado!' });
      return response.redirect('back');
    }
  }

  public async update({ request, response, params, session }) {
    try {
      const client = await Client.findOrFail(params.id);
      const body = request.except('_method');
      body.name = body.name.toUpperCase();
      body.corporateName = body.corporateName.toUpperCase();
      body.clientEmail = body.clientEmail.toLowerCase();
      body.sat === 'on' ? (body.sat = true) : (body.sat = false);
      body.nfe === 'on' ? (body.nfe = true) : (body.nfe = false);
      client.merge(body);
      await client.save();
      session.flash({ success: 'Cliente atualizado com sucesso!' });
      return response.redirect('/client');
    } catch (error) {
      console.log(error);
      session.flash({ error: 'Erro ao atualizar o cliente!' });
      return response.redirect('back');
    }
  }

  public async destroy({ response, params, session }) {
    try {
      const client = await Client.findOrFail(params.id);
      await client.delete();
      session.flash({ success: 'Cliente excluído com sucesso!' });
      return response.redirect('/client');
    } catch (error) {
      console.log(error);
      session.flash({ error: 'Erro ao excluir o cliente!' });
      return response.redirect('back');
    }
  }
}
