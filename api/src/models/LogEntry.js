const mongoose = require('mongoose');

const { Schema } = mongoose;

const logEntrySchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    description: String,
    comments: String,
    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 5, 
    },
    image: String,
    latitude: {
        type: Number,
        require: true,
        min: -90,
        max: 90,
    },
    longitude: {
        type: Number,
        require: true,
        min: -180,
        max: 180,
    },
    visitDate: {
        type: Date,
        require: true,
    }
}, {
    timestamps: true,
});

const LogEntry = mongoose.model('LogEntry', logEntrySchema);

module.exports = LogEntry;