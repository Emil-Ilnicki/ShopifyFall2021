import express from "express";
const router = express.Router();
import {
  nominateMovie,
  getNominees,
  deleteNominee,
} from "../handlers/handlers";
router.post("/api/nominees", getNominees);
router.post("/api/delete", deleteNominee);
router.post("/api/nominate", nominateMovie);

export { router };
