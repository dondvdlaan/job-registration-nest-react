import { Injectable } from '@nestjs/common';
import { MySqlService } from '../db/mysql.service';
import { SqlStatementService } from '../db/sqlStatement.service';
import { Job } from 'src/types/interfaces/job';

@Injectable()
export class JobService {
 
  constructor(
    private readonly mySqlService: MySqlService,
    private readonly sqlStatementService: SqlStatementService
    ) {}


  // ---- Functions ----
  async getAllJobs(): Promise<any> {
    
    // Constants and variables
    let sql: string = this.sqlStatementService.allJobs;
    
    // Inquire DB
    return this.mySqlService.transmit(sql);
  }
  
  async getActiveJobs(): Promise<any> {
    
    // Constants and variables
    let sql: string = this.sqlStatementService.activeJobs;
    
    // Inquire DB
    return this.mySqlService.transmit(sql);
  }

  async getLostJobs(): Promise<any> {
    
    // Constants and variables
    let sql: string = this.sqlStatementService.lostJobs;
    
    // Inquire DB
    return this.mySqlService.transmit(sql);
  }
  
  async getJobByID(jobID: string): Promise<any> {
    
    // Constants and variables
    let sql: string = this.sqlStatementService.jobByID;
    let values: string[] = [jobID];
    
    let job = await this.mySqlService.transmit(sql, values);
    
    console.log("Job: ", job)
    // Inquire DB
    return job[0];
  }

  async addJob(job: Job): Promise<any> {

    // Constants and variables
    let sql: string = this.sqlStatementService.addJob;
    let values: string[] = [job.jobTitle,
                            job.jobDescription,
                            job.jobDetails,
                            job.jobStatus,
                            job.jobNote,
                            job.jobContract,
                            job.compID,
                            job.emplID
                          ];

    // Insert in DB and return status code
    return this.mySqlService.transmit(sql, values);
  }
  
  async updateJob(job: Job): Promise<any>{

     // Constants and variables
    let sql: string = this.sqlStatementService.updateJob;
    let values: string[] =[ job.jobTitle,
                            job.jobDescription,
                            job.jobDetails,
                            job.jobStatus,
                            job.jobNote,
                            job.jobContract,
                            job.jobClosedReason,
                            job.jobCloseDate,
                            job.compID,
                            job.emplID,
                            job.jobID
                          ];
    
      // Update DB and return status code
      return this.mySqlService.transmit(sql, values);                      
  }

  async deleteJobByID(jobID: string): Promise<any> {
    
    // Constants and variables
    let sql: string = this.sqlStatementService.deleteJob;
    let values: string[] = [jobID];
    
    // Delete job and return status code
    return this.mySqlService.transmit(sql, values);
  }
}
