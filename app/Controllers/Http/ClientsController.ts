// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import Database from '@ioc:Adonis/Lucid/Database';
import Client from 'App/Models/Client';
import { DateTime } from 'luxon';

export default class ClientsController {
  public async daysToExpire(expiracy: number) {
    const now = DateTime.fromISO(DateTime.now().toISODate());
    const expiracyDate = DateTime.fromISO(DateTime.fromSeconds(expiracy).toISODate());
    const diff = expiracyDate.diff(now, 'days').toObject();
    return diff.days;
  }

  public async index({ request, view, session }) {
    try {
      const page = request.input('page', 1);
      const limit = 500;
      const clients = await Database.from('clients').orderBy('id', 'desc').paginate(page, limit);
      clients.forEach((client) => {
        client.status =
          client?.expiracy && DateTime.now().toUnixInteger() > client?.expiracy ? 2 : client.status;
      });
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
      if (body.sat === 'on') {
        body.sat = true;
        body.satDirectory = body.satDirectory.replace(/\\/g, '/');
        body.satDirectory = body.satDirectory.endsWith('/')
          ? body.satDirectory
          : body.satDirectory + '/';
      } else {
        body.sat = false;
      }
      if (body.nfe === 'on') {
        body.nfe = true;
        body.nfeDirectory = body.nfeDirectory.replace(/\\/g, '/');
        body.nfeDirectory = body.nfeDirectory.endsWith('/')
          ? body.nfeDirectory
          : body.nfeDirectory + '/';
      } else {
        body.nfe = false;
      }

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

      if (status === '1') {
        client.status = false;
        if (client.system === 'AVULSO') client.expiracy = null;
      } else {
        client.status = true;
        if (client.system === 'AVULSO')
          client.expiracy = DateTime.now().plus({ years: 1 }).toUnixInteger();
      }

      await client.save();
      session.flash({ success: 'Status do cliente atualizado com sucesso!' });
      return response.redirect('/client');
    } catch (error) {
      console.log(error);
      session.flash({ error: 'Erro ao atualizar o status do cliente!' });
      return response.redirect('/client');
    }
  }

  public async getStatus({ response, params }) {
    try {
      const client = await Client.query()
        .select('id', 'status', 'expiracy')
        .where('cnpj', params.cnpj)
        .first();
      const status = client?.status ? true : false;

      if (status) {
        if (client?.expiracy) {
          const expiracy = client?.expiracy;
          const diff = await this.daysToExpire(expiracy);

          if (diff) {
            if (diff <= 0) {
              const expiredClient = await Client.findOrFail(client.id);
              expiredClient.status = false;
              await expiredClient.save();

              const data = {
                status: false,
                message: 'Sua licença expirou, entre em contato com o suporte para renovação!',
              };
              return response.json(data);
            } else if (diff === 1) {
              const data = {
                status: true,
                message:
                  'Sua licença expira amanhã, entre em contato com o suporte para renovação!',
              };
              return response.json(data);
            } else if (diff === 2) {
              const data = {
                status: true,
                message:
                  'Sua licença expira em 2 dias, entre em contato com o suporte para renovação!',
              };
              return response.json(data);
            } else if (diff === 3) {
              const data = {
                status: true,
                message:
                  'Sua licença expira em 3 dias, entre em contato com o suporte para renovação!',
              };
              return response.json(data);
            } else if (diff === 5) {
              const data = {
                status: true,
                message:
                  'Sua licença expira em 5 dias, entre em contato com o suporte para renovação!',
              };
              return response.json(data);
            } else if (diff === 10) {
              const data = {
                status: true,
                message:
                  'Sua licença expira em 10 dias, entre em contato com o suporte para renovação!',
              };
              return response.json(data);
            } else if (diff === 15) {
              const data = {
                status: true,
                message:
                  'Sua licença expira em 15 dias, entre em contato com o suporte para renovação!',
              };
              return response.json(data);
            } else if (diff === 30) {
              const data = {
                status: true,
                message:
                  'Sua licença expira em 30 dias, entre em contato com o suporte para renovação!',
              };
              return response.json(data);
            }
          }
          return response.json({ status });
        }
        return response.json({ status });
      }
      return response.json({ status });
    } catch (e) {
      console.log(e);
      return response.json({ error: 'Erro ao obter o status do cliente' });
    }
  }

  public async edit({ response, params, view, session }) {
    try {
      const client = await Client.findOrFail(params.id);
      return view.render('clients/edit', { client: client.toJSON() });
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

      if (body.sat === 'on') {
        body.sat = true;
        body.satDirectory = body.satDirectory.replace(/\\/g, '/');
        body.satDirectory = body.satDirectory.endsWith('/')
          ? body.satDirectory
          : body.satDirectory + '/';
      } else {
        body.sat = false;
      }
      if (body.nfe === 'on') {
        body.nfe = true;
        body.nfeDirectory = body.nfeDirectory.replace(/\\/g, '/');
        body.nfeDirectory = body.nfeDirectory.endsWith('/')
          ? body.nfeDirectory
          : body.nfeDirectory + '/';
      } else {
        body.nfe = false;
      }

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
