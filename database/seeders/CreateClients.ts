import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Client from 'App/Models/Client';

export default class extends BaseSeeder {
  public async run() {
    await Client.createMany([
      {
        name: 'Client 1',
        corporateName: 'Client 1',
        cnpj: '12345678901234',
        phone: '(12) 3456-7800',
        cellphone: '(12) 34567-8900',
        accountant: 'Accountant 1',
        accountantPhone: '(12) 34567-8900',
        accountantEmail: 'contador1@gmail.com',
        system: 'LESTORE',
        status: true,
        sat: true,
        satDirectory: 'C:/Le Store/',
        nfe: false,
        nfeDirectory: 'C:/Le Store/',
      },
      {
        name: 'Client 2',
        corporateName: 'Client 2',
        cnpj: '12345678901234',
        phone: '(12) 3456-7800',
        cellphone: '(12) 34567-8900',
        clientEmail: 'cliente1@gmail.com',
        accountant: 'Accountant 2',
        accountantPhone: '(12) 3456-7800',
        accountantEmail: 'contador2@gmail.com',
        system: 'LECHEFF',
        status: false,
        sat: false,
        satDirectory: 'C:/Le Store/',
        nfe: true,
        nfeDirectory: 'C:/Le Store/',
      },
      {
        name: 'Client 3',
        corporateName: 'Client 3',
        cnpj: '12345678901234',
        phone: '(12) 3456-7800',
        cellphone: '(12) 34567-8900',
        clientEmail: 'cliente3@gmail.com',
        accountant: 'Accountant 3',
        accountantPhone: '(12) 34567-8900',
        accountantEmail: 'contador3@gmail.com',
        system: 'MOBILITY',
        status: true,
        sat: true,
        satDirectory: 'C:/POS/',
        nfe: true,
        nfeDirectory: 'C:/POS/',
      },
    ]);
  }
}
