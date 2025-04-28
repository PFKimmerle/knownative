const express = require("express");
const { getUserTexts, deleteUserText,saveCard } = require("../../controllers/api/textController");
const { verifyJWT } = require("./../../utils/jwt");
const router = express.Router();

router.get("/:userId", getUserTexts);
router.delete("/:userId/text/:textId", deleteUserText);
router.post("/:textId/save", verifyJWT, saveCard);

module.exports = router;