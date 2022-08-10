import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'clients';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('name').notNullable();
      table.string('corporate_name');
      table.string('cnpj').notNullable();
      table.string('phone');
      table.string('cellphone');
      table.string('client_email');
      table.string('accountant').notNullable().defaultTo('Ação');
      table.string('accountant_phone');
      table.string('accountant_cellphone');
      table.string('accountant_email');
      table
        .enu('system', [
          'LECHEFF',
          'LESTORE',
          'SAURUS',
          'MOBILITY',
          'FOCUS',
          'ACSN',
          'JS',
          'OUTROS',
          'AVULSO',
        ])
        .notNullable();
      table.integer('expiracy').nullable().defaultTo(null);
      table.boolean('status').notNullable().defaultTo(false);
      table.boolean('sat').notNullable();
      table.string('sat_directory').nullable().defaultTo(null);
      table.boolean('nfe').notNullable();
      table.string('nfe_directory').nullable().defaultTo(null);

      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
