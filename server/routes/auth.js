import express from "express";
import {userLogin, userPassChange, userSignup } from "../controllers/auth.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *      schemas:
 *          User:
 *              type: object
 *              required:
 *                  - _id
 *                  - name
 *                  - email
 *                  - password
 *              properties:
 *                  _id:
 *                      type: string
 *                  name:
 *                      type: string
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *          UserLogin:
 *              type: object
 *              required:
 *                  - email
 *                  - password
 *              properties:
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *          UserPasswordChange:
 *              type: object
 *              required:
 *                  - email
 *                  - oldPassword
 *                  - newPassword
 *              properties:
 *                  email:
 *                      type: string
 *                  oldPassword:
 *                      type: string
 *                  newPassword:
 *                      type: string
 */

/**
 * @swagger
 * /api/auth/signup:
 *  post:
 *      summary: Used to signup new user
 *      description: This api is for getting data from mongodb
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: User signup successfully
*/

router.post("/signup", userSignup);

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *      summary: Used to login new user
 *      description: This api is for getting data from mongodb
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UserLogin'
 *      responses:
 *          200:
 *              description: User login successfully
*/

router.post("/login", userLogin);

/**
 * @swagger
 * /api/auth/userpasschange:
 *  put:
 *      summary: Used to change user password
 *      description: This api is for getting data from mongodb
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UserPasswordChange'
 *      responses:
 *          200:
 *              description: User password updated successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/UserPasswordChange'
*/

router.put("/userpasschange", userPassChange);

export default router;