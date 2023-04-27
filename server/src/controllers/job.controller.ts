import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { JobService } from 'src/services/job.service';
import { Job } from 'src/types/interfaces/job';

@Controller()
export class JobController {

  // ---- Constructor ----
  constructor(private readonly jobService: JobService) {}

  // ---- Routes ----
  @Get('/allJobs')
  async getAllJobs(): Promise<any> {

    return this.jobService.getAllJobs();
  }

  @Get('/lostJobs')
  async getLostJobs(): Promise<any> {

    return this.jobService.getLostJobs();
  }

  @Get('/activeJobs')
  async getActiveJobs(): Promise<any> {

    return this.jobService.getActiveJobs();
  }

  @Get('/job/:jobID')
  async getJobByID(@Param('jobID') jobID: string): Promise<any> {

    return this.jobService.getJobByID(jobID);
  }

  @Post('/addJob')
  async addJob(@Body() job: Job): Promise<any>{

    return this.jobService.addJob(job);
  }

  @Put('/updateJob')
  async updateJob(@Body() job: Job): Promise<any>{

    return this.jobService.updateJob(job);
  }

  @Delete('/deleteJob/:jobID')
  async deleteJobByID(@Param('jobID') jobID: string): Promise<any> {

    return this.jobService.deleteJobByID(jobID);
  }

}
