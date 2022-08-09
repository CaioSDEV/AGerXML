import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public corporateName: string;

  @column()
  public cnpj: string;

  @column()
  public phone: string;

  @column()
  public cellphone: string;

  @column()
  public clientEmail: string;

  @column()
  public accountant: string;

  @column()
  public accountantPhone: string;

  @column()
  public accountantCellphone: string;

  @column()
  public accountantEmail: string;

  @column()
  public system: 'LECHEFF' | 'LESTORE' | 'SAURUS' | 'MOBILITY' | 'FOCUS' | 'ACSN' | 'JS' | 'OUTROS';

  @column()
  public otherSystemName: string;

  @column()
  public status: boolean;

  @column()
  public sat: boolean;

  @column()
  public satDirectory: string;

  @column()
  public nfe: boolean;

  @column()
  public nfeDirectory: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
