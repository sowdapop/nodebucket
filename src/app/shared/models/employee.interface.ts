// Title: nodebucket
// Author: Professor Krasso
// Date: 13 Jan 2023
// Modified by: Kayla McDanel
// Attributions: Code from Bellevue Web Dev GitHub Repository
// https://github.com/buwebdev/web-450

//import item model
import { Item } from './item.interface';

//Model for service
export interface Employee {
    empId: number;
    firstName: string;
    lastName: string;
    //add item model to task lists
    todo: Item[];
    done: Item[];
}