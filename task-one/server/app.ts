import http, { IncomingMessage, Server, ServerResponse } from "http";
import { updateSourceFile } from "typescript";
const {
 getAll,
 getOne,
 createOrg,
 updateOrg,
 deleteOrg,
} = require("./controllers/orgControllers.ts");

/*
implement your server code here
*/
const database = require('./database.json')
const server :Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    if (req.url === "/api/organization" && req.method === "GET") {
     getAll(req, res);
    } else if (Number(req.url?.split("/")[3]) && req.method === "GET") {
     const id = req.url?.split("/")[3];
     getOne(req, res, id);
    } else if (req.url === "/api/organization" && req.method === "POST") {
     createOrg(req, res);
    } else if (req.url?.match(/\/api\/organization\/\w+/) && req.method === "PUT") {
     const id = req.url.split("/")[3];
     updateOrg(req, res, id);
    } else if (req.url?.match(/\/api\/organization\/\w+/) && req.method === "DELETE") {
     const id = req.url.split("/")[3];
     deleteOrg(req, res, id);
    } else {
     res.writeHead(404, { "Content-Type": "application/json" });
     res.end(JSON.stringify({ message: "Route Not Found" }));
    }

  }


);

server.listen(3005);
