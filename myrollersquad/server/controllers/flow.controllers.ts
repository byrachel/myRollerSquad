import { Request, Response } from "express";
import database from "../db/database";
import { validationResult } from "express-validator";
import { Post } from "../models/Post";

// export const getAllPosts = (req: Request, res: Response) => {
//   // const sqlQuery =  'CREATE TABLE IF NOT EXISTS flow(id int AUTO_INCREMENT, firstname VARCHAR(50), lastname VARCHAR(50), email VARCHAR(50), PRIMARY KEY(id))';
//   const sqlQuery = "SELECT * FROM emails";
//   database.query(sqlQuery, (err, result) => {
//     if (err) throw err;

//     res.send({ result });
//   });
// };

export const getAllPosts = async (req: Request, res: Response) => {
  const posts = await Post.findAll();
  return res.status(200).json(posts);
};

// const getSubscribers = (req, res) => {
//     const sqlQuery = 'SELECT * FROM emails';

//     database.query(sqlQuery, (err, result) => {
//         if (err) throw err;

//         res.json({ 'emails': result });
//     });
// };

export const addPost = (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (errors.array().length > 0) {
    res.send(errors.array());
  } else {
    const subscriber = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
    };

    const sqlQuery = "INSERT INTO emails SET ?";

    database.query(sqlQuery, subscriber, (err, row) => {
      if (err) throw err;

      res.send("Subscribed successfully!");
    });
  }
};
