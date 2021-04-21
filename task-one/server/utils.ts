const fs = require("fs");
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

function writeDataToFile(filename:string, content:organization) {
 fs.writeFileSync(filename, JSON.stringify(content), "utf8", (err:any) => {
  if (err) {
   console.log(err);
  }
 });
}

function getPostData(req: IncomingMessage) {
 return new Promise((resolve, reject) => {
  try {
   let body = "";

   req.on("data", (chunk) => {
    body += chunk.toString();
   });

   req.on("end", () => {
    resolve(body);
   });
  } catch (error) {
   reject(error);
  }
 });
}

module.exports = {
 writeDataToFile,
 getPostData,
};
