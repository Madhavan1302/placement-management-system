const express = require('express');
const router = express.Router();
const { getPlacementStats } = require('../controllers/statsController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', protect, authorizeRoles('admin'), getPlacementStats);

module.exports = router;
