// Title: nodebucket
// Author: Professor Krasso
// Date: 13 Jan 2023
// Modified by: Kayla McDanel
// Attributions: Code from Bellevue Web Dev GitHub Repository
// https://github.com/buwebdev/web-450

const express = require('express');
const Employee = require ('../models/employee');
const config = require ('../data/config.json')

const router = express.Router();

//YAML for Swagger testing
/** 
* findEmployeeById
* @openapi
* /api/employees/{empId}:
*   get:
*     description:  API for returning employees via employeeId
*     summary: Returns employee info from employeeId
*     parameters:
*       - name: empId
*         in: path
*         required: true
*         description: Employees ID
*         schema:
*           type: Number
*     responses:
*       '200':
*         description: Employee document
*       '401':
*         description: Invalid employeeId
*       '500':
*         description: Server exception
*       '501':
*         description: MongoDB exception
*/

//findEmployeeID construction to verify value entered in login screen
router.get('/:empId', async(req, res) => {
    try
      {
        Employee.findOne({'empId': req.params.empId}, function(err, emp) {
      //If there is a database error, handle it and return 501 error message
          if(err)
            {
              console.log(err);
            res.status(501).send({
                'err': config.mongoServerError + ' : ' + err.message
            })
        } else 
        //If there is no error, return the emp object from MongoDB
        {
            console.log(emp);
            res.json(emp); //Returns data as JSON
        }
    })
    //For server errors
} catch(e) {
        console.log(e);
        res.status(500).send({
            'err': config.serverError + ' : ' + e.message
        })
    }
})

/** findAllTasks
 *   /api/employees/:empId/tasks:
    get:
      summary: Find all tasks
      description: |
        Returns a list of all tasks
      responses:
        '200':    # status code
          description: List of all tasks
          content:
            application/json:
              schema: 
                type: array
                items: 
                  type: string
        '500':    # status code
          description: Server exceptions
          content:
            application/json:
              schema: 
                type: array
                items: 
                  type: string    
        '501':    # status code
          description: MongoDB exceptions
          content:
            application/json:
              schema: 
                type: array
                items: 
                  type: string
 */

//findAllTasks
router.get('/:empId/tasks', async(req,res) => {
  try {
    Employee.findOne({'empId': req.params.empId}, 'empId todo done', function(err, emp) {
      if (err) {
        console.log(err);
        res.status(501).send ({
          'err': config.mongoServerError + ': ' + err.message
        })
      } else {
        console.log(emp);
        res.json(emp);
      }
    })
  } catch (e) {
    console.log(e);
    res.status(500).send({
      'err': config.serverError + ': ' + e.message
    })
  }
});

                  /**
 * createTask
 *     put:        
      summary: Creates a task
      description: |
        Creates a new task
      responses:
        '200':    # status code
          description: Task created
          content:
            application/json:
              schema: 
                type: array
                items: 
                  type: string
        '500':    # status code
          description: Server exceptions
          content:
            application/json:
              schema: 
                type: array
                items: 
                  type: string    
        '501':    # status code
          description: MongoDB exceptions
          content:
            application/json:
              schema: 
                type: array
                items: 
                  type: string
 */

//createTask
router.post('/:empId/tasks', async(req, res) => {
  try {
    Employee.findOne({'empId': req.params.empId}, function(err,emp) {
      if (err) {
        console.log(err);
        res.status(501).send({
          'err': config.mongoServerError + ': ' + err.message
        })
      } else {

        console.log(emp);

        if (emp) {
          const newTask = {
            text: req.body.text
          }
        }
        
        emp.todo.push(newTask);


        emp.save(function(err, updatedEmp)  {
          if (err) {
            console.log(err);
            res.status(501).send({
              'err': config.mongoServerError + ': ' + err.message
            })
          }
          else {
            console.log(updatedEmp);
            res.json(updatedEmp);
          }
        })
      }
    })
  } catch (e) {
    console.log(e);
    res.status(500).send({
      'err': config.serverError + ': ' + err.message
    })
  }
})

/** updateTask
 *     post:        
      summary: Updates a task
      description: |
        Updates the current task
      responses:
        '200':    # status code
          description: Task updated
          content:
            application/json:
              schema: 
                type: array
                items: 
                  type: string
        '500':    # status code
          description: Server exceptions
          content:
            application/json:
              schema: 
                type: array
                items: 
                  type: string    
        '501':    # status code
          description: MongoDB exceptions
          content:
            application/json:
              schema: 
                type: array
                items: 
                  type: string
 */



/**
 *   /api/employees/:empId/tasks/:taskId:           
    delete:        
      summary: Deletes a task
      description: |
        Deletes the current task
      responses:
        '200':    # status code
          description: Task deleted
          content:
            application/json:
              schema: 
                type: array
                items: 
                  type: string
        '500':    # status code
          description: Server exceptions
          content:
            application/json:
              schema: 
                type: array
                items: 
                  type: string    
        '501':    # status code
          description: MongoDB exceptions
          content:
            application/json:
              schema: 
                type: array
                items: 
                  type: string
 */

module.exports = router;