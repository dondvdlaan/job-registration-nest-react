import { Injectable } from '@nestjs/common';
import { MySqlService } from '../db/mysql.service';
import { SqlStatementService } from '../db/sqlStatement.service';
import { Job } from 'src/types/interfaces/job';
import { Employee } from 'src/types/interfaces/employee';

@Injectable()
export class EmployeeService {
 
  constructor(
    private readonly mySqlService: MySqlService,
    private readonly sqlStatementService: SqlStatementService
    ) {}


  // ---- Functions ----

  async getEmployeesCompanyByID(compID: string): Promise<any> {
    
    // Constants and variables
    let sql: string = this.sqlStatementService.employeesCompanyByID;
    let values: string[] = [compID];
    
    let employees = await this.mySqlService.transmit(sql, values);
    
    console.log("Employees: ", employees)
    // Inquire DB
    return employees;
  }

  async addEmployee(employee: Employee): Promise<any> {

    // Constants and variables
    let sql1: string = this.sqlStatementService.addEmployee;
    let sql2: string = this.sqlStatementService.addEmployee2;

    let values: string[] = [employee.emplFirstName,
                            employee.emplLastName,
                            employee.emplTel,
                            employee.emplEmail
                          ];

    // Insert in DB and return status code
    return this.mySqlService.transmitAddEmployee(sql1, values, sql2, employee.compID );
  }
}
