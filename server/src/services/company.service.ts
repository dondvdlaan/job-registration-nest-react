import { Injectable } from '@nestjs/common';
import { MySqlService } from '../db/mysql.service';
import { SqlStatementService } from '../db/sqlStatement.service';
import { Company } from 'src/types/interfaces/company';

@Injectable()
export class CompanyService {
 
  constructor(
    private readonly mySqlService: MySqlService,
    private readonly sqlStatementService: SqlStatementService
    ) {}


  // ---- Functions ----
  async getAllCompanies(): Promise<any> {
    
    // Constants and variables
    let sql: string = this.sqlStatementService.allCompanies;
    
    // Inquire DB
    return this.mySqlService.transmit(sql);
  }

  async getCompanyByID(compID: string): Promise<any> {
    
    // Constants and variables
    let sql: string = this.sqlStatementService.companyByID;
    let values: string[] = [compID];
    
    // Inquire DB
    return this.mySqlService.transmit(sql, values);
  }

  async addCompany(company: Company): Promise<any> {

    // Constants and variables
    let sql: string = this.sqlStatementService.addCompany;
    let values: string[] = [  company.compName,
                              company.compType,
                              company.compNote,
                              company.compStatus
                            ]; 

    // Insert in DB and return status code
    return this.mySqlService.transmit(sql, values);
  }
  
  async updateCompany(company: Company): Promise<any>{

     // Constants and variables
    let sql: string = this.sqlStatementService.updateCompany;
    let values: string[] =[ company.compName,
                            company.compType,
                            company.compNote,
                            company.compStatus,
                            company.compID
                          ];
    
      // Update DB and return status code
      return this.mySqlService.transmit(sql, values);                      
  }

  async deleteCompanyByID(compID: string): Promise<any> {
    
    // Constants and variables
    let sql: string = this.sqlStatementService.deleteCompany;
    let values: string[] = [compID];
    
    // Delete company and return status code
    return this.mySqlService.transmit(sql, values);
  }
}
