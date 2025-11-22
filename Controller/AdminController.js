const express = require("express");
const router = express.Router();
const AdminServices = require("../Services/AdminServices");

// CREATE ROADMAP
router.post("/createRoadmap", async (req, res, next) => {
    try {
        const { name, entityType, entityId } = req.body;
        const roadmap = await AdminServices.createRoadmap({ name, entityType, entityId });

        res.status(201).json({
            message: "Roadmap created successfully",
            data: roadmap
        });
    }
    catch (error) {
        next(error);
    }
});

// GET ALL ROADMAPS
router.get("/roadmaps", async (req, res, next) => {
    try {
        const roadmaps = await AdminServices.getAllRoadmaps();
        res.status(200).json(roadmaps);
    }
    catch (err) {
        next(err);
    }
});

// GET BY ID
router.get("/roadmap/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const roadmap = await AdminServices.getRoadmapById(id);

        res.status(200).json(roadmap);
    }
    catch (err) {
        next(err);
    }
});

// GET BY NAME (use query param)
router.get("/roadmapByName", async (req, res, next) => {
    try {
        const name = req.query.name;
        const roadmap = await AdminServices.getRoadmapByName(name);

        res.status(200).json(roadmap);
    }
    catch (err) {
        next(err);
    }
});

// GET ROADMAPS FOR A TRACK
router.get("/trackRoadmaps/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const roadmaps = await AdminServices.getTrackRoadmaps(id);

        res.status(200).json(roadmaps);
    }
    catch (err) {
        next(err);
    }
});

// SEARCH ROADMAPS
router.get("/searchRoadmaps", async (req, res, next) => {
    try {
        const { search } = req.query;
        const roadmaps = await AdminServices.searchRoadmaps(search);

        res.status(200).json({
            success: true,
            count: roadmaps.length,
            data: roadmaps
        });
    }
    catch (err) {
        next(err);
    }
});

// UPDATE ROADMAP
router.put("/roadmap/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const updates = req.body;

        const updated = await AdminServices.updateRoadmap(id, updates);

        res.status(200).json({
            message: "Roadmap updated successfully",
            data: updated
        });
    }
    catch (err) {
        next(err);
    }
});

// DELETE ROADMAP
router.delete("/roadmap/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const deleted = await AdminServices.deleteRoadmap(id);

        res.status(200).json({
            message: "Roadmap deleted successfully",
            deleted
        });
    }
    catch (err) {
        next(err);
    }
});


/////////////////////////////////Tracks/////////////////////////////////////


router.post("/createTrack", async (req, res, next) => {
    try {
        const { name, description, keyConcepts, crashCourse } = req.body;
        const track = await AdminServices.createTrack({ name, description, keyConcepts, crashCourse });

        res.status(201).json({
            message: "Track created successfully",
            data: track
        });
    }
    catch (error) {
        next(error);
    }
});


router.get("/tracks", async (req, res, next) => {
    try {
        const tracks = await AdminServices.getAllTracks();
        res.status(200).json(tracks);
    }
    catch (err) {
        next(err);
    }
});

// GET BY ID
router.get("/track/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const track = await AdminServices.getTrackById(id);

        res.status(200).json(track);
    }
    catch (err) {
        next(err);
    }
});

// GET BY NAME (use query param)
router.get("/trackByName", async (req, res, next) => {
    try {
        const name = req.query.name;
        const track = await AdminServices.getTrackByName(name);

        res.status(200).json(track);
    }
    catch (err) {
        next(err);
    }
});


router.put("/track/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const updates = req.body;

        const updated = await AdminServices.updateTrack(id, updates);

        res.status(200).json({
            message: "Track updated successfully",
            data: updated
        });
    }
    catch (err) {
        next(err);
    }
});


router.delete("/track/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const deleted = await AdminServices.deleteTrack(id);

        res.status(200).json({
            message: "Track deleted successfully",
            deleted
        });
    }
    catch (err) {
        next(err);
    }
});


///////////////////////////////Topics/////////////////////////////


router.post("/createTopic", async (req, res, next) => {
    try {
        const { name, description } = req.body;
        const topic = await AdminServices.createTopic({ name, description });

        res.status(201).json({
            message: "Topic created successfully",
            data: topic
        });
    }
    catch (error) {
        next(error);
    }
});


router.get("/Topics", async (req, res, next) => {
    try {
        const topics = await AdminServices.getAllTopics();
        res.status(200).json(topics);
    }
    catch (err) {
        next(err);
    }
});

// GET BY ID
router.get("/Topic/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const topic = await AdminServices.getTopicById(id);

        res.status(200).json(topic);
    }
    catch (err) {
        next(err);
    }
});

// GET BY NAME (use query param)
router.get("/TopicByName", async (req, res, next) => {
    try {
        const name = req.query.name;
        const topic = await AdminServices.getTopicByName(name);

        res.status(200).json(topic);
    }
    catch (err) {
        next(err);
    }
});


router.put("/Topic/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const updates = req.body;

        const updated = await AdminServices.updateTopic(id, updates);

        res.status(200).json({
            message: "Topic updated successfully",
            data: updated
        });
    }
    catch (err) {
        next(err);
    }
});


router.delete("/Topic/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const deleted = await AdminServices.deleteTopic(id);

        res.status(200).json({
            message: "Topic deleted successfully",
            deleted
        });
    }
    catch (err) {
        next(err);
    }
});



module.exports = router;
