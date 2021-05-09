import express, { Request, Response } from "express";
import { Nominee } from "../models/Nominee";

const nominateMovie = async (req: Request, res: Response) => {
  console.log("Nominating Movie");
  const nominee = new Nominee(req.body);

  try {
    await nominee.save();
    res.status(200).send({ msg: "success" });
  } catch (e) {
    res.status(500).send({ msg: "error" });
  }
};

const getNominees = async (req: Request, res: Response) => {
  console.log("Getting Saved Nominees");
  const { UUID } = req.body;
  try {
    await Nominee.find({ UUID }, (err, data) => {
      if (err) res.status(500).send("There was an error getting the data");

      res.status(200).send({
        data,
      });
    });
  } catch (err) {
    res.status(500).send("There was an error getting the data");
  }
};

const deleteNominee = async (req: Request, res: Response) => {
  console.log("Deleting Nominee");
  console.log(req.body);
  const { UUID, title } = req.body;

  try {
    await Nominee.findOneAndDelete({ UUID, title });
    res.status(200).send({ msg: "Record Deleted" });
  } catch (err) {
    res.status(500).send({ msg: "There was an error" });
  }
};

export { nominateMovie, getNominees, deleteNominee };
