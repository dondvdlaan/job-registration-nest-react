import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { EmployeeService } from 'src/services/employee.service';
import { JobService } from 'src/services/job.service';
import { Employee } from 'src/types/interfaces/employee';
import { Job } from 'src/types/interfaces/job';

@Controller()
export class EmployeeController {

  constructor(private readonly employeeService: EmployeeService) {}

  // ---- Routes ----

  @Get('/employeesCompany/:compID')
  async getEmployeesCompanyByID(@Param('compID') compID: string): Promise<any> {

    return this.employeeService.getEmployeesCompanyByID(compID);
  }


  @Post('/addEmployee')
  async addEmployee(@Body() employee: Employee): Promise<any>{

    return this.employeeService.addEmployee(employee);
  }
}
