import { Module } from '@nestjs/common';
import { CompanyController } from './controllers/company.controller';
import { CompanyService } from './services/company.service';
import { DbModule } from './db/db.module';
import { JobController } from './controllers/job.controller';
import { JobService } from './services/job.service';
import { EmployeeController } from './controllers/employee.controller';
import { EmployeeService } from './services/employee.service';
import { PartnerController } from './controllers/partner.controller';
import { PartnerService } from './services/partner.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:     [DbModule,
                ConfigModule.forRoot()],
  controllers: [CompanyController, 
                JobController, 
                EmployeeController,
                PartnerController ],
  providers:   [CompanyService, 
                JobService, 
                EmployeeService,
                PartnerService],
})
export class AppModule {}
