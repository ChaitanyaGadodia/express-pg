const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async function(req, res, next) {
  try {
    const results = await db.query("SELECT * from fishes");
    return res.json(results.rows);
  } catch (e) {
    next(e);
  }
});

router.post("/", async function(req, res, next) {
  try {
    const result = await db.query(
      "INSERT INTO fishes (name,type) VALUES ($1,$2) RETURNING *",
      [req.body.name, req.body.type]
    );
    return res.json(result.rows[0]);
  } catch (err) {
    return next(err);
  }
});

router.get("/:id", async function(req, res, next) {
  try {
    const result = await db.query("SELECT * FROM fishes WHERE id=$1", [
      req.params.id
    ]);
    return res.json(result.rows[0]);
  } catch (e) {
    return next(e);
  }
});

router.patch("/:id", async function(req, res, next) {
  try {
    const result = await db.query(
      "UPDATE fishes SET name=$1, type=$2 WHERE id=$3 RETURNING *",
      [req.body.name, req.body.type, req.params.id]
    );
    return res.json(result.rows[0]);
  } catch (e) {
    return next(e);
  }
});

router.delete("/:id", async function(req, res, next) {
  try {
    const result = await db.query("DELETE FROM fishes WHERE id=$1", [
      req.params.id
    ]);
    return res.json({ message: "Deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
