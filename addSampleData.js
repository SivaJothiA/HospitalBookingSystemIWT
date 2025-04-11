const axios = require('axios');

const sampleData = {
  patients: [
    {name: "John Doe", age: 35, gender: "Male"},
    {name: "Jane Smith", age: 28, gender: "Female"}
  ],
  doctors: [
    {name: "Dr. Sarah Johnson", specialty: "Cardiology"},
    {name: "Dr. Michael Brown", specialty: "Neurology"}
  ]
};

async function addData() {
  try {
    console.log("Starting to add sample data...");
    
    // Add patients
    for (const patient of sampleData.patients) {
      const res = await axios.post('http://localhost:4000/api/patient/add', patient);
      console.log(`Added patient: ${patient.name}`, res.data);
    }

    // Add doctors
    for (const doctor of sampleData.doctors) {
      const res = await axios.post('http://localhost:4000/api/doctor/add', doctor);
      console.log(`Added doctor: ${doctor.name}`, res.data);
    }

    console.log("✅ All sample data added successfully!");
  } catch (error) {
    console.error("❌ Error details:", {
      message: error.message,
      url: error.config?.url,
      data: error.response?.data
    });
  }
}

addData();
