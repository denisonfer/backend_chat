import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateGroupTable1641703438829 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'groups',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'date_raffle',
            type: 'timestamp with time zone',
          },
          {
            name: 'date_party',
            type: 'timestamp with time zone',
          },
          {
            name: 'hour_party',
            type: 'timestamp with time zone',
          },
          {
            name: 'locale_party',
            type: 'varchar',
          },
          {
            name: 'value_min',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'status_group_id',
            type: 'int',
            isNullable: true,
            default: 1,
          },
          {
            name: 'code_invite',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'groupStatus',
            columnNames: ['status_group_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'status_groups',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('groups');
  }
}
