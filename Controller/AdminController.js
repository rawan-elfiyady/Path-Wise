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


//////////////////////////Technology///////////////////////////

router.post("/createTechnology", async (req, res, next) => {
    try {
        const { name, description, category, crashCourse } = req.body;
        const technology = await AdminServices.createTechnology({ name, description, category, crashCourse });

        res.status(201).json({
            message: "Technology created successfully",
            data: technology
        });
    }
    catch (error) {
        next(error);
    }
});


router.get("/Technologies", async (req, res, next) => {
    try {
        const technologies = await AdminServices.getAllTechnologies();
        res.status(200).json(technologies);
    }
    catch (err) {
        next(err);
    }
});

// GET BY ID
router.get("/Technology/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const technology = await AdminServices.getTechnologyById(id);

        res.status(200).json(technology);
    }
    catch (err) {
        next(err);
    }
});

router.get("/TechnologyTrackId/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const technology = await AdminServices.getTechnologyByTrackId(id);

        res.status(200).json(technology);
    }
    catch (err) {
        next(err);
    }
});

// GET BY NAME (use query param)
router.get("/TechnologyByName", async (req, res, next) => {
    try {
        const name = req.query.name;
        const technology = await AdminServices.getTechnologyByName(name);

        res.status(200).json(technology);
    }
    catch (err) {
        next(err);
    }
});


router.put("/Technology/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const updates = req.body;

        const updated = await AdminServices.updateTechnology(id, updates);

        res.status(200).json({
            message: "Technology updated successfully",
            data: updated
        });
    }
    catch (err) {
        next(err);
    }
});


router.delete("/Technology/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const deleted = await AdminServices.deleteTechnology(id);

        res.status(200).json({
            message: "Technology deleted successfully",
            deleted
        });
    }
    catch (err) {
        next(err);
    }
});

///////////////////////////////Sources////////////////////////////////////\

router.post("/createSource", async (req, res, next) => {
    try {
        const { name, category, link, topicId } = req.body;
        const source = await AdminServices.createSource({ name, category, link, topicId });

        res.status(201).json({
            message: "Source created successfully",
            data: source
        });
    } catch (error) {
        next(error);
    }
});


router.get("/Sources", async (req, res, next) => {
    try {
        const sources = await AdminServices.getAllSources();
        res.status(200).json(sources);
    } catch (err) {
        next(err);
    }
});


router.get("/Source/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const source = await AdminServices.getSourceById(id);
        res.status(200).json(source);
    } catch (err) {
        next(err);
    }
});


router.get("/SourceByName", async (req, res, next) => {
    try {
        const name = req.query.name;
        const source = await AdminServices.getSourceByName(name);
        res.status(200).json(source);
    } catch (err) {
        next(err);
    }
});


router.get("/SourceTopic/:topicId", async (req, res, next) => {
    try {
        const topicId = req.params.topicId;
        const sources = await AdminServices.getSourcesByTopicId(topicId);
        res.status(200).json(sources);
    } catch (err) {
        next(err);
    }
});


router.put("/Source/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        const updated = await AdminServices.updateSource(id, updates);

        res.status(200).json({
            message: "Source updated successfully",
            data: updated
        });
    } catch (err) {
        next(err);
    }
});


router.delete("/Source/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const deleted = await AdminServices.deleteSource(id);

        res.status(200).json({
            message: "Source deleted successfully",
            deleted
        });
    } catch (err) {
        next(err);
    }
});


/////////////////////////////////Regions///////////////////////////////


router.post("/createRegion", async (req, res, next) => {
    try {
        const { name } = req.body;
        const region = await AdminServices.createRegion({ name });

        res.status(201).json({
            message: "Region created successfully",
            data: region
        });
    }
    catch (error) {
        next(error);
    }
});


router.get("/Regions", async (req, res, next) => {
    try {
        const regions = await AdminServices.getAllRegions();
        res.status(200).json(regions);
    }
    catch (err) {
        next(err);
    }
});


router.get("/Region/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const region = await AdminServices.getRegionById(id);

        res.status(200).json(region);
    }
    catch (err) {
        next(err);
    }
});


router.get("/RegionTrackId/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const regions = await AdminServices.getRegionByTrackId(id);

        res.status(200).json(regions);
    }
    catch (err) {
        next(err);
    }
});


router.get("/RegionByName", async (req, res, next) => {
    try {
        const name = req.query.name;
        const region = await AdminServices.getRegionByName(name);

        res.status(200).json(region);
    }
    catch (err) {
        next(err);
    }
});


router.put("/Region/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const updates = req.body;

        const updated = await AdminServices.updateRegion(id, updates);

        res.status(200).json({
            message: "Region updated successfully",
            data: updated
        });
    }
    catch (err) {
        next(err);
    }
});


router.delete("/Region/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const deleted = await AdminServices.deleteRegion(id);

        res.status(200).json({
            message: "Region deleted successfully",
            deleted
        });
    }
    catch (err) {
        next(err);
    }
});

//////////////////////////////Quizess/////////////////////////////


router.post("/createQuiz", async (req, res, next) => {
    try {
        const { name, numOfQuestions, grade, entityType, entityId } = req.body;
        const quiz = await AdminServices.createQuiz({ name, numOfQuestions, grade, entityType, entityId });

        res.status(201).json({
            message: "Quiz created successfully",
            data: quiz
        });
    } catch (error) {
        next(error);
    }
});


router.get("/Quizzes", async (req, res, next) => {
    try {
        const quizzes = await AdminServices.getAllQuizzes();
        res.status(200).json(quizzes);
    } catch (error) {
        next(error);
    }
});


router.get("/Quiz/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const quiz = await AdminServices.getQuizById(id);
        res.status(200).json(quiz);
    } catch (error) {
        next(error);
    }
});


router.get("/QuizByEntity", async (req, res, next) => {
    try {
        const { type, id } = req.query; 
        const quizzes = await AdminServices.getQuizzesByEntity(type, id);
        res.status(200).json(quizzes);
    } catch (error) {
        next(error);
    }
});

router.get("/QuizByName", async (req, res, next) => {
    try {
        const name = req.query.name;
        const quiz = await AdminQuizServices.getQuizByName(name);
        res.status(200).json(quiz);
    } catch (error) {
        next(error);
    }
});

router.put("/Quiz/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        const updated = await AdminServices.updateQuiz(id, updates);

        res.status(200).json({
            message: "Quiz updated successfully",
            data: updated
        });
    } catch (error) {
        next(error);
    }
});


router.delete("/Quiz/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const deleted = await AdminServices.deleteQuiz(id);
        res.status(200).json({
            message: "Quiz deleted successfully",
            deleted
        });
    } catch (error) {
        next(error);
    }
});

///////////////////////////////////Questions/////////////////////////////


// CREATE
router.post("/createQuestion", async (req, res, next) => {
    try {
        const { question, answer, degree, quizId } = req.body;
        const Question = await AdminServices.createQuestion({question, answer, degree, quizId});

        res.status(201).json({
            message: "Question created successfully",
            data: Question
        });
    } catch (error) {
        next(error);
    }
});

// GET ALL
router.get("/Questions", async (req, res, next) => {
    try {
        const questions = await AdminServices.getAllQuestions();
        res.status(200).json(questions);
    } catch (error) {
        next(error);
    }
});

// GET BY ID
router.get("/Question/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const question = await AdminServices.getQuestionById(id);

        res.status(200).json(question);
    } catch (error) {
        next(error);
    }
});

// GET BY QUIZ ID
router.get("/QuestionsByQuiz/:quizId", async (req, res, next) => {
    try {
        const quizId = req.params.quizId;
        const list = await AdminServices.getQuestionsByQuizId(quizId);

        res.status(200).json(list);
    } catch (error) {
        next(error);
    }
});

// GET BY QUESTION TEXT
router.get("/QuestionByText", async (req, res, next) => {
    try {
        const text = req.query.question;
        const question = await AdminServices.getQuestionByText(text);

        res.status(200).json(question);
    } catch (error) {
        next(error);
    }
});

// UPDATE
router.put("/Question/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const updates = req.body;

        await AdminServices.updateQuestion(id, updates);

        res.status(200).json({
            message: "Question updated successfully"
        });
    } catch (error) {
        next(error);
    }
});

// DELETE
router.delete("/Question/:id", async (req, res, next) => {
    try {
        const id = req.params.id;

        const deleted = await AdminServices.deleteQuestion(id);

        res.status(200).json({
            message: "Question deleted successfully",
            deleted
        });
    } catch (error) {
        next(error);
    }
});

//--------------------------------User---------------------------------//


// GET ALL USERS
router.get("/users", async (req, res, next) => {
    try {
        const users = await AdminServices.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});


// GET USER BY ID
router.get("/user/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await AdminServices.getUserById(id);

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});


// UPDATE USER
router.put("/user/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const updates = req.body;

        const updated = await AdminServices.updateUser(id, updates);

        res.status(200).json({
            message: "User updated successfully",
            data: updated
        });

    } catch (error) {
        next(error);
    }
});


// DELETE USER
router.delete("/user/:id", async (req, res, next) => {
    try {
        const id = req.params.id;

        const deleted = await AdminServices.deleteUser(id);

        res.status(200).json({
            message: "User deleted successfully",
            deleted
        });

    } catch (error) {
        next(error);
    }
});

//-----------------------------------UserContribution-------------------------------//

// GET ALL CONTRIBUTIONS
router.get("/contributions", async (req, res, next) => {
    try {
        const contributions = await AdminServices.getAllContributions();
        res.status(200).json(contributions);
    } catch (error) {
        next(error);
    }
});

// GET CONTRIBUTION BY ID
router.get("/contribution/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const contribution = await AdminServices.getUserContribution(id);

        res.status(200).json(contribution);
    } catch (error) {
        next(error);
    }
});

// APPROVE CONTRIBUTION
router.put("/contribution/:id/approve", async (req, res, next) => {
    try {
        const id = req.params.id;
        await AdminServices.approveContribution(id);

        res.status(200).json({
            message: "Contribution approved successfully"
        });
    } catch (error) {
        next(error);
    }
});

// REJECT CONTRIBUTION
router.put("/contribution/:id/reject", async (req, res, next) => {
    try {
        const id = req.params.id;
        await AdminServices.rejectContribution(id);

        res.status(200).json({
            message: "Contribution rejected successfully"
        });
    } catch (error) {
        next(error);
    }
});

// DELETE CONTRIBUTION
router.delete("/contribution/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        await AdminServices.deleteContribution(id);

        res.status(200).json({
            message: "Contribution deleted successfully"
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;