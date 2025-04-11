// models/Appointment.js

const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    patient: { type: String, required: true },
    doctor: { type: String, required: true },
    appointmentDate: { type: Date, required: true },
});
const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
