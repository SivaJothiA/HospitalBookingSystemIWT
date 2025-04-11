// routes/doctorRoutes.js

const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");

// Get all doctors
router.get("/get", async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new doctor
router.post("/add", async (req, res) => {
    const doctor = new Doctor({
        name: req.body.name,
        speciality: req.body.speciality,
    });
    try {
        const newDoctor = await doctor.save();
        console.log(newDoctor);
        res.status(201).json(newDoctor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a doctor by ID
router.delete("/delete/:id", async (req, res) => {
    try {
        await Doctor.findByIdAndDelete(req.params.id);
        res.json({ message: "Doctor deleted" });
    } catch (error) {
        console.error("Error deleting doctor:", error);
        res.status(500).json({ message: error.message });
    }
});

// Update a doctor by ID
router.put("/update/:id", async (req, res) => {
    const doctorId = req.params.id;
    const { name, speciality } = req.body;

    try {
        // Find the doctor by ID in the database
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        // Update the doctor properties
        doctor.name = name;
        doctor.speciality = speciality;

        // Save the updated doctor
        await doctor.save();
        console.log(doctor);

        // You can send the updated doctor details in the response
        res.json(doctor);
    } catch (error) {
        console.error("Error updating doctor details:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
