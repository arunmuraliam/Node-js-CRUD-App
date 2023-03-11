import express from "express";


import { deleteProduct, findProduct, productReg } from "../controllers/product.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              required:
 *                  - _id
 *                  - productName
 *                  - productCategory
 *                  - productPrice
 *                  - userid
 *              properties:
 *                  _id:
 *                      type: string
 *                  productName:
 *                      type: string
 *                  productCategory:
 *                      type: string
 *                  productPrice:
 *                      type: integer
 *                  userid:
 *                      type: string
 */

/**
 * @swagger
 * /api/user/add-product:
 *  post:
 *      summary: Used to insert new product
 *      description: This api is for getting data from mongodb
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Product'
 *      responses:
 *          200:
 *              description: Product added successfully
*/

router.post("/add-product", productReg);


/**
 * @swagger
 * /api/user/find-product/{id}:
 *  get:
 *      summary: To get details of a specified product
 *      description: This api is for getting data from mongodb
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: ID required
 *            schema: 
 *              type: string
 *      responses:
 *          200:
 *              description: This is for fetching data from mongodb
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Product'
*/

router.get("/find-product/:id", findProduct);


/**
 * @swagger
 * /api/user/delete-product/{id}:
 *  delete:
 *      summary: This api is used to delete a specified product
 *      description: This api is for getting data from mongodb.
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: ID required
 *            schema: 
 *              type: string
 *      responses:
 *          200:
 *              description: Data is deleted.
*/

router.delete("/delete-product/:id", deleteProduct);

export default router;