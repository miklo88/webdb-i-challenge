const express = require("express");
const db = require("../dbConfig");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    // `SELECT * FROM ACCOUNTS`
    res.status(200).json(await db("accounts").select());
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    // translates to `SELECT * FROM accounts WHERE id = ? LIMIT 1;`
    // since all select statements can return multiple values (in an array),
    // calling .first instead of .select will take out the first result in the array
    // (if we know there will only be one item)
    res.status(200).json(
      await db("accounts")
        .where("id", req.params.id)
        .first()
    );
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const payload = {
      // these object keys should match up to the column names
      name: req.body.name,
      budget: req.body.budget
    };

    // translates to `INSERT INTO accounts (title, contents) VALUES(?, ?);`
    // .insert returns an array of IDs for the new rows, so we just destructure it
    const [id] = await db("accounts").insert(payload);
    res.json(
      await db("accounts")
        .where("id", id)
        .first()
    );
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const payload = {
      // these object keys should match up to the column names
      name: req.body.name,
      budget: req.body.budget
    };

    // translates to `UPDATE accounts SET title = ? AND contents = ? WHERE id = ?;`
    await db("accounts")
      .where("id", req.params.id)
      .update(payload);
    // Refetch the account from the DB since it was updated
    res.json(
      await db("accounts")
        .where("id", req.params.id)
        .first()
    );
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    // translates to `DELETE FROM accounts WHERE id = ?;`
    // Don't forget your .where or you'll delete EVERYTHING in your database :/
    await db("accounts")
      .where("id", req.params.id)
      .del();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

// Some simple middleware to validate the account ID before trying to use it
// async function validateAccountId(req, res, next) {
//   try {
//     const account = await db("accounts")
//       .where("id", req.params.id)
//       .first();
//     if (account) {
//       next();
//     } else {
//       res.status(404).json({ message: "Account not found" });
//     }
//   } catch (err) {
//     next(err);
//   }
// }

module.exports = router;
