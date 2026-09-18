#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/38713866cfd185ededa59653fe8957d3ae8475b7a4abf89f05f31dfcdb6435b4/contract';
import startContract from '../../snapshots/38713866cfd185ededa59653fe8957d3ae8475b7a4abf89f05f31dfcdb6435b4/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/72738919e43ee320516acd5ac9908461f86c71f29ad27f773e847c5dadbda8bd/contract';
import endContract from '../../snapshots/72738919e43ee320516acd5ac9908461f86c71f29ad27f773e847c5dadbda8bd/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'transaction',
        columns: [
          col('amount', 'numeric', { notNull: true, codecRef: { codecId: 'pg/numeric@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('type', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('walletId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createIndex({
        schema: 'public',
        table: 'transaction',
        index: 'transaction_walletId_idx_2e003173',
        columns: ['walletId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'transaction',
        foreignKey: {
          name: 'transaction_walletId_fkey',
          columns: ['walletId'],
          references: { schema: 'public', table: 'wallet', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
