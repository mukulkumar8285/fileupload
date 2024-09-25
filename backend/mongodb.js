const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    headers: {
        type: String,
        enum: ["true", "false"],
        default: "false"
    },
    filename: { type: String, required: true },
    originalname: { type: String, required: true },
    mimetype: { type: String, required: true },
    size: { type: Number, required: true },
    path: { type: String, required: true },
});

module.exports = mongoose.model('File', fileSchema);
