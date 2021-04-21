const Organization = require("../models/orgModel.ts");

const { getPostData } = require("../utils.ts");

// @desc    Gets All Products
// @route   GET /api/products
async function getAll(req: IncomingMessage, res: ServerResponse) {
 try {
  const organizations = await Organization.findAll();

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(organizations));
 } catch (error) {
  console.log(error);
 }
}

// @desc    Gets Single Product
// @route   GET /api/product/:id
async function getOne(req:IncomingMessage, res:ServerResponse, id:number) {
 try {
  const organization = await Organization.findById(id);

  if (!organization) {
   res.writeHead(404, { "Content-Type": "application/json" });
   res.end(JSON.stringify({ message: "Organization Not Found" }));
  } else {
   res.writeHead(200, { "Content-Type": "application/json" });
   res.end(JSON.stringify(organization));
  }
 } catch (error) {
  console.log(error);
 }
}

// @desc    Create a Product
// @route   POST /api/products
async function createOrg(req, res) {
 try {
  const body = await getPostData(req);

  const { name, ceo, country } = JSON.parse(body);

  const organization = {
   name,
   ceo,
   country,
  };

  const newOrg = await Organization.create(organization);

  res.writeHead(201, { "Content-Type": "application/json" });
  return res.end(JSON.stringify(newOrg));
 } catch (error) {
  console.log(error);
 }
}

// @desc    Update a Product
// @route   PUT /api/products/:id
async function updateOrg(req, res, id) {
 try {
  const organization = await Organization.findById(id);

  if (!organization) {
   res.writeHead(404, { "Content-Type": "application/json" });
   res.end(JSON.stringify({ message: "Organization Not Found" }));
  } else {
   const body = await getPostData(req);

   const { name, ceo, country } = JSON.parse(body);

   const organizationData = {
    name: name || organization.name,
    ceo: ceo || organization.ceo,
    country: country || organization.country,
   };

   const updOrg = await Organization.update(id, organizationData);

   res.writeHead(200, { "Content-Type": "application/json" });
   return res.end(JSON.stringify(updOrg));
  }
 } catch (error) {
  console.log(error);
 }
}

// @desc    Delete Product
// @route   DELETE /api/product/:id
async function deleteOrg(req, res, id) {
 try {
  const organization = await Organization.findById(id);

  if (!organization) {
   res.writeHead(404, { "Content-Type": "application/json" });
   res.end(JSON.stringify({ message: "Organization Not Found" }));
  } else {
   await Organization.remove(id);
   res.writeHead(200, { "Content-Type": "application/json" });
   res.end(JSON.stringify({ message: `Organisation ${id} removed` }));
  }
 } catch (error) {
  console.log(error);
 }
}

module.exports = {
 getAll,
 getOne,
 createOrg,
 updateOrg,
 deleteOrg,
};
