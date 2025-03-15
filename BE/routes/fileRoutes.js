const express = require("express");
const objectHash = require("object-hash");
const router = express.Router();
const hash = require("object-hash");
const MessagesPerMonth = require("../models/MessagesPerMonth");

// 🟢 POST: Add messagesPerMonth Data
router.post("/addMessagesPerMonth", async (req, res) => {
    const { months, you, other } = req.body; // Destructure the input data

    try {
        // Create a new document in the MessagesPerMonth collection
        const newMessagesPerMonth = new MessagesPerMonth({
            messagesPerMonth: {
                months: months,
                you: you,
                other: other
            }
        });

        // Save the document to MongoDB
        const savedData = await newMessagesPerMonth.save();

        // Return a success response with the saved data
        res.status(201).json({ message: "MessagesPerMonth data created", data: savedData });
    } catch (err) {
        console.error("Error creating MessagesPerMonth document:", err);
        res.status(500).json({ error: "Error creating MessagesPerMonth document" });
    }
});


module.exports = router;