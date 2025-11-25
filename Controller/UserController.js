const express = require("express");
const router = express.Router();
const UserServices = require("../Services/UserServices");
const UserRepo = require("../Repositories/UserRepository");


//////////////////////////////////ROADMAPS///////////////////////////////

// GET ALL ROADMAPS
router.get("/roadmaps", async (req, res, next) => {
    try {
        const roadmaps = await UserServices.getAllRoadmaps();
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
        const roadmap = await UserServices.getRoadmapById(id);

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
        const roadmap = await UserServices.getRoadmapByName(name);

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
        const roadmaps = await UserServices.getTrackRoadmaps(id);

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
        const roadmaps = await UserServices.searchRoadmaps(search);

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

////////////////////////////////SavedSkills////////////////////////////


router.post("/SaveSkill", async (req, res, next) => {
    try {
        const { name } = req.body;
        const SaveSkill = await UserServices.createSevedSkill({ name });

        res.status(201).json({
            message: "Skill saved successfully",
            data: SaveSkill
        });
    }
    catch (error) {
        next(error);
    }
});


router.get("/SavedSkills", async (req, res, next) => {
    try {
        const SavedSkills = await UserServices.getAllSavedSkills();
        res.status(200).json(SavedSkills);
    }
    catch (err) {
        next(err);
    }
});


router.get("/SavedSkill/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const SavedSkill = await UserServices.getSavedSkillById(id);

        res.status(200).json(SavedSkill);
    }
    catch (err) {
        next(err);
    }
});


router.get("/SavedSkillByName", async (req, res, next) => {
    try {
        const name = req.query.name;
        const SavedSkill = await UserServices.getSavedSkillByName(name);

        res.status(200).json(SavedSkill);
    }
    catch (err) {
        next(err);
    }
});


router.put("/SavedSkill/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const updates = req.body;

        const updated = await UserServices.updateSavedSkill(id, updates);

        res.status(200).json({
            message: "SavedSkill updated successfully",
            data: updated
        });
    }
    catch (err) {
        next(err);
    }
});


router.delete("/SavedSkill/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const deleted = await UserServices.deleteSavedSkill(id);

        res.status(200).json({
            message: "SavedSkill deleted successfully",
            deleted
        });
    }
    catch (err) {
        next(err);
    }
});


///////////////////////////////Tracks/////////////////////////////////


router.get("/Tracks", async (req, res, next) => {
    try {
        const tracks = await UserServices.getAllTracks();
        res.status(200).json(tracks);
    }
    catch (err) {
        next(err);
    }
});


router.get("/Track/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const track = await UserServices.getTrackById(id);

        res.status(200).json(track);
    }
    catch (err) {
        next(err);
    }
});


router.get("/TrackByName", async (req, res, next) => {
    try {
        const name = req.query.name;
        const track = await UserServices.getTrackByName(name);

        res.status(200).json(track);
    }
    catch (err) {
        next(err);
    }
});


///////////////////////////////Topics//////////////////////////////////


router.get("/Topics", async (req, res, next) => {
    try {
        const tpoics = await UserServices.getAllTracks();
        res.status(200).json(topics);
    }
    catch (err) {
        next(err);
    }
});


router.get("/Topic/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const topic = await UserServices.getTopicById(id);

        res.status(200).json(topic);
    }
    catch (err) {
        next(err);
    }
});


router.get("/TopicByName", async (req, res, next) => {
    try {
        const name = req.query.name;
        const topic = await UserServices.getTopicByName(name);

        res.status(200).json(topic);
    }
    catch (err) {
        next(err);
    }
});

///////////////////////////////Tecknology//////////////////////////


router.get("/Technologies", async (req, res, next) => {
    try {
        const technologies = await UserServices.getAllTechnologies();
        res.status(200).json(technologies);
    }
    catch (err) {
        next(err);
    }
});


router.get("/Technology/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const technology = await UserServices.getTechnologyById(id);

        res.status(200).json(technology);
    }
    catch (err) {
        next(err);
    }
});

router.get("/TechnologyTrack/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const technology = await UserServices.getTechnologyByTrackId(id);

        res.status(200).json(technology);
    }
    catch (err) {
        next(err);
    }
});


router.get("/TechnologyByName", async (req, res, next) => {
    try {
        const name = req.query.name;
        const technology = await UserServices.getTechnologyByName(name);

        res.status(200).json(technology);
    }
    catch (err) {
        next(err);
    }
});

//////////////////////////////////Sources/////////////////////////////////////

router.post("/createSource", async (req, res, next) => {
    try {
        const { name, category, link, topicId } = req.body;
        const source = await UserServices.createSource({ name, category, link, topicId });

        res.status(201).json({
            message: "Source suggested successfully",
            data: source
        });
    } catch (error) {
        next(error);
    }
});


router.get("/Sources", async (req, res, next) => {
    try {
        const sources = await UserServices.getAllSources();
        res.status(200).json(sources);
    } catch (err) {
        next(err);
    }
});


router.get("/Source/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const source = await UserServices.getSourceById(id);
        res.status(200).json(source);
    } catch (err) {
        next(err);
    }
});


router.get("/SourceTopic/:topicId", async (req, res, next) => {
    try {
        const topicId = req.params.topicId;
        const sources = await UserServices.getSourcesByTopicId(topicId);
        res.status(200).json(sources);
    } catch (err) {
        next(err);
    }
});

/////////////////////User///////////////////////////////////


router.get("/getUser/:id", async ( req, res, next) => {
    try {
        const id = req.params.id;
        const user = await UserRepo.getUserById(id);
        if(!user){
            return res.status(404).json({message: "not found"});
        }
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}) ;

module.exports = router; 