const express = require("express");
const router = express.Router();
const School = require("../models/school");
const { calculateDistance } = require("../utils/distance");

// Add School API
router.post("/addSchool", async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    // Create school using Sequelize (built-in validation)
    const school = await School.create({
      name,
      address,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    });

    res.status(201).json({
      success: true,
      message: "School added successfully",
      school: school,
    });
  } catch (error) {
    console.error("Error adding school:", error);

    // Handle Sequelize validation errors
    if (error.name === "SequelizeValidationError") {
      const validationErrors = error.errors.map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: validationErrors,
      });
    }

    res.status(500).json({
      success: false,
      message: "An error occurred while adding the school",
      error: error.message,
    });
  }
});

// List Schools API
router.get("/listSchool", async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    // Validate user coordinates
    if (
      !latitude ||
      !longitude ||
      isNaN(parseFloat(latitude)) ||
      isNaN(parseFloat(longitude))
    ) {
      return res.status(400).json({
        success: false,
        message: "Valid latitude and longitude parameters are required",
      });
    }

    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

    // Validate coordinates range
    if (userLat < -90 || userLat > 90 || userLon < -180 || userLon > 180) {
      return res.status(400).json({
        success: false,
        message:
          "Latitude must be between -90 and 90, and longitude must be between -180 and 180",
      });
    }

    // Fetch all schools using Sequelize
    const schools = await School.findAll();

    // Calculate distance and sort by proximity
    const schoolsWithDistance = schools.map((school) => {
      const schoolData = school.toJSON();
      const distance = calculateDistance(
        userLat,
        userLon,
        schoolData.latitude,
        schoolData.longitude
      );

      return {
        ...schoolData,
        distance: parseFloat(distance.toFixed(2)), // Distance in km, rounded to 2 decimal places
      };
    });

    // Sorted by distance (ascending)
    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    res.status(200).json({
      success: true,
      userLocation: { latitude: userLat, longitude: userLon },
      count: schoolsWithDistance.length,
      schools: schoolsWithDistance,
    });
  } catch (error) {
    console.error("Error listing schools:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching schools",
      error: error.message,
    });
  }
});

router.get("/allSchools", async (req, res) => {
  try {
    const schools = await School.findAll();
    res.status(200).json({
      success: true,
      count: schools.length,
      schools: schools,
    });
  } catch (error) {
    console.error("Error fetching all schools:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching all schools",
      error: error.message,
    });
  }
});

module.exports = router;
