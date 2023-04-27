import { Injectable } from '@nestjs/common';
import { MySqlService } from '../db/mysql.service';
import { SqlStatementService } from '../db/sqlStatement.service';
import { Job } from 'src/types/interfaces/job';
import { Employee } from 'src/types/interfaces/employee';

@Injectable()
export class PartnerService {
 
  constructor(
    private readonly mySqlService: MySqlService,
    private readonly sqlStatementService: SqlStatementService
    ) {}


  // ---- Functions ----
  async getPartners(): Promise<any> {
    
    // Constants and variables
    let sql: string = this.sqlStatementService.partners;
    
    // Inquire DB
    return this.mySqlService.transmit(sql);
  }
}
