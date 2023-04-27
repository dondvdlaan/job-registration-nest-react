import { Module } from '@nestjs/common';
import {MySqlService} from './mysql.service'
import {SqlStatementService} from './sqlStatement.service'
import { ConfigModule } from '@nestjs/config';

@Module({
    imports:    [ConfigModule],
    providers:  [MySqlService, SqlStatementService],
    exports:    [MySqlService, SqlStatementService]
})
export class DbModule {}
