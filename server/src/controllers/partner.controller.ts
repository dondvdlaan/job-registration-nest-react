import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PartnerService } from 'src/services/partner.service';
import { Employee } from 'src/types/interfaces/employee';

@Controller()
export class PartnerController {

  // --- Constructor ----
  constructor(private readonly partnerService: PartnerService) {}

  // ---- Routes ----
  @Get('/partners')
  async getPartners(){

    return this.partnerService.getPartners();
  }
}
