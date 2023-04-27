import { Injectable } from '@nestjs/common';


@Injectable()
export class SqlStatementService {

  allJobs: string = 'SELECT * FROM jobs ' +
                    'JOIN companies USING(compID) ' +
                    'ORDER BY jobDate ASC';

  activeJobs: string =  'SELECT * FROM jobs, companies ' +
                        'WHERE jobs.jobStatus != "Closed Lost" ' +
                        'AND jobs.compID = companies.compID ' +
                        'ORDER BY jobs.jobDate DESC';

  lostJobs: string =  'SELECT * FROM jobs, companies ' +
                      'WHERE jobs.jobStatus = "Closed Lost" ' +
                      'AND jobs.compID = companies.compID '+
                      'ORDER BY jobs.jobDate DESC';
                  
  allCompanies: string =  'SELECT * FROM companies ' +
                          'ORDER BY compName ';

  partners: string =  'SELECT * FROM companies ' +
                      'WHERE companies.compType = "Partner" ' +
                      'ORDER BY compName';
    
  jobByID: string = 'SELECT * FROM jobs ' + 
                    'JOIN companies USING(compID) ' + 
                    'LEFT JOIN employees USING(emplID) ' + 
                    'WHERE jobID = ? ';

  companyByID: string = 'SELECT * FROM companies ' + 
                        'WHERE compID = ?';

  employeeByID: string =  'SELECT * FROM employees ' +
                          'WHERE emplID = ? ';

  // Treated as many-to-many relationship with companyEmployee as junction table
  employeesCompanyByID: string =  'SELECT e.emplID, e.emplFirstName, e.emplLastName ' +
                                  'FROM companyEmployee ' +
                                  'INNER JOIN employees e USING(emplID) ' +
                                  'WHERE compID = ? ';

  // Get jobs per company ID
  jobsPerCompany: string =  'SELECT * ' + 
                            'FROM jobs ' + 
                            'INNER JOIN companies USING(compID) ' +
                            'WHERE compID = ? ' +
                            'ORDER BY jobDate DESC ';

  deleteCompany: string = 'DELETE c, j, e ' +
                          'FROM companies c ' +
                          'LEFT JOIN jobs j USING(compID) ' +
                          'LEFT JOIN companyEmployee e USING(compID) ' +
                          'where compID = ?';

  deleteJob: string = 'DELETE FROM jobs where jobID = ?';

  addJob: string =  'INSERT INTO jobs' +
                    '(jobTitle, jobDescription, jobDetails, jobStatus, jobNote, jobContract, compID, emplID)' +
                    'VALUES(?,?,?,?,?,?,?,?)';

  addCompany: string =  'INSERT INTO companies(	compName, compType, compNote, compStatus) ' +
                        'VALUES(?,?,?,?)';

  // 2 tables have to be updates, here table employees
  addEmployee: string = 'INSERT INTO employees ' +
                        '(emplFirstName, emplLastName, emplTel, emplEmail) ' +
                        'VALUES(?,?,?,?) ';

  // 2 tables have to be updates, here junction table companyEmployee                
  addEmployee2: string =  'INSERT INTO companyEmployee ' +
                          '(emplID, compID) ' +
                          'VALUES(?,?) ';

  updateCompany: string = 'UPDATE companies ' +
                          'SET compName = ?, compType = ?, compNote = ?, compStatus = ? ' +
                          'WHERE compID = ?';

  updateJob: string = 'UPDATE jobs ' +
                      'SET jobTitle = ?, jobDescription	=	?, jobDetails	=	?, jobStatus = ?, jobNote = ?, jobContract = ?, jobClosedReason = ?, jobCloseDate = ?, compID = ?, emplID = ? ' +
                      'WHERE jobID = ?';

  updateEmployee: string = 'UPDATE employees SET emplFirstName = ?, emplLastName = ?, emplTel = ?, emplEmail = ? WHERE emplID = ?';
}