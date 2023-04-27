import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { CompanyService } from '../services/company.service';
import { Company } from 'src/types/interfaces/company';

@Controller()
export class CompanyController {

  constructor(private readonly appService: CompanyService) {}

  // ---- Routes ----
  @Get('/allCompanies')
  async getAllCompanies(): Promise<any> {

    return this.appService.getAllCompanies();
  }

  @Get('/company/:compID')
  async getCompanyByID(@Param('compID') compID: string): Promise<any> {

    return this.appService.getCompanyByID(compID);
  }

  @Post('/addCompany')
  async addCompany(@Body() company: Company): Promise<any>{

    return this.appService.addCompany(company);
  }

  @Put('/updateCompany')
  async updateCompany(@Body() company: Company): Promise<any>{

    return this.appService.updateCompany(company);
  }

  @Delete('/deleteCompany/:compID')
  async deleteCompanyByID(@Param('compID') compID: string): Promise<any> {

    return this.appService.deleteCompanyByID(compID);
  }

}
