const mongoose = require("mongoose");

const messagesPerMonthSchema = new mongoose.Schema({
    messagesPerMonth: {
        month: [String],
        you:   [Number],
        other: [Number]
    }
})

const MessagesPerMonth = mongoose.model('MessagesPerMonth', messagesPerMonthSchema);

module.exports = MessagesPerMonth;