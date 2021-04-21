let organizations = require("../database");
//const { v4: uuidv4 } = require('uuid')
interface organization {
 id?: number;
 organization: string;
 createdAt: Date;
 updatedAt?: Date;
 products: string[];
 marketValue: string;
 address: string;
 ceo: string;
 country: string;
 noOfEmployees: number;
 employees: string[];
}
const { writeDataToFile } = require("../utils.ts");
let lastindex =
 organizations.length === 0 ? 0 : organizations[organizations.length - 1].id;

function findAll():Promise<organization | undefined> {
 return new Promise((resolve, reject) => {
  resolve(organizations);
 });
}

function findById(id:number) {
 return new Promise((resolve, reject) => {
  const organization = organizations.find((p:organization) => p.id == id);
  resolve(organization);
 });
}

function create(organization:organization) {
 return new Promise((resolve, reject) => {
  const newOrg = { id: ++lastindex, ...organization };
  organizations.push(newOrg);
  if (process.env.NODE_ENV !== "test") {
   writeDataToFile("./data/database.json", organizations);
  }
  resolve(newOrg);
 });
}

function update(id:number, organization:organization) {
 return new Promise((resolve, reject) => {
  const index = organizations.findIndex((p) => p.id === id);
  organizations[index] = { id, ...organization };
  if (process.env.NODE_ENV !== "test") {
   writeDataToFile("./data/database.json", organizations);
  }
  resolve(organizations[index]);
 });
}

function remove(id:number) {
 return new Promise<void>((resolve, reject) => {
  organizations = organizations.filter((p:organization) => p.id != id);
  if (process.env.NODE_ENV !== "test") {
   writeDataToFile("./data/dabase.json", organizations);
  }
  resolve();
 });
}

module.exports = {
 findAll,
 findById,
 create,
 update,
 remove,
};
