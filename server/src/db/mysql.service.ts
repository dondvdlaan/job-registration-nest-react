"use strict"
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const mysql = require('mysql2');


@Injectable()
export class MySqlService {

// ---- Constants and variables ----
private pool: import("mysql2/typings/mysql/lib/Pool");

// ---- Constructor ----
constructor(private configService: ConfigService) {}

// ---- Functions ----
/**
 * Initialisation of DB
 */
init = () => {

  // Load configuration MySql DB
  this.pool = mysql.createPool({
    host:       this.configService.get<string>('MYSQL_HOST_IP'),
    user:       this.configService.get<string>('MYSQL_USER'),
    password:   this.configService.get<string>('MYSQL_PASSWORD'),
    database:   this.configService.get<string>('MYSQL_DATABASE'),
    port:       this.configService.get<string>('MYSQL_PORT'),
  });
}

/**
 * SQL statement for 1 table with eventual values are sent to the DB for execution
 * 
 * @param sql     [string]          : sql statement
 * @param values  [array of string] : values for insert and update commands
 */
 transmit = (sql: string, values: string[] = []) => {

   // Initialise DB, if needed
   if (!this.pool) this.init();
   
  return new Promise((res, rej) => {

    console.log("sql ", sql);
    console.log("values ", values);

    this.pool.query(sql, values, (err, results) => {
      if (err) rej(err);
      else res(results);
    });
  })
}

/**
 * Add Employee spans 2 tables(employees, companyEmployee), so we need a Transaction / Commit
 */
transmitAddEmployee = (sql, values = [], sql2, compID) => {

  // Initialise DB, if needed
  if (!this.pool) this.init();

  // Start transferring data
  return new Promise((resolve, reject) => {

    this.pool.getConnection((err, connection) => {
      if (err) {
        return reject("Error occurred while getting the connection");
      }
      // Start transaction
      return connection.beginTransaction(err => {
        if (err) {
          connection.release();
          return reject("Error occurred while creating the transaction");
        }
        // Inserting values in Employee table
        return this.pool.query(sql, values, (err) => {
          if (err) {
            return connection.rollback(() => {
              connection.release();
              return reject("Inserting in to Employee table failed")
            });
          }
          // Recover Employee ID
          return this.pool.query('SELECT LAST_INSERT_ID();', (err, res) => {
            if (err) {
              return connection.rollback(() => {
                connection.release();
                return reject("Recovering Employee ID failed")
              });
            } 
            console.log("res ID ",res[0]['LAST_INSERT_ID()']);
            const emplID = res[0]['LAST_INSERT_ID()'];
            
            console.log("emplID ", emplID);
            console.log(" compID ", compID);

            // Update junction table companyEmployee  
            return this.pool.query(sql2,[emplID, compID], (err, results) => {
              if (err) {
                return connection.rollback(() => {
                  connection.release();
                  return reject("Inserting in to companyEmployee table failed")
                });
              }
              // Send message back to transmitAddEmployee function  
              else resolve(results);
          
                // Commit connection
                return connection.commit((err) => {
                  if (err) {
                    return connection.rollback(() => {
                      connection.release();
                      return reject("Commit failed");
                    });
                  }
                  connection.release();
              }); // Connection commit
            }); // Pool query III 
          }); // Pool query II
        }); // Pool query
      }); // Begin transaction
    }); // Get connection
  }); // New Promise
}; // Transmit employee


}