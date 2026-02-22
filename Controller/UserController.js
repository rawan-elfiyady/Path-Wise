const express = require("express");
const router = express.Router();
const UserServices = require("../Services/UserServices");
const AIServices = require("../Services/AIServices");
const UserRepo = require("../Repositories/UserRepository");
const verifyToken = require("../Middlewares/verifyToken"); 
const authorize = require("../Middlewares/auth");

/////////////////////// AI RECOMMENDATION //////////////////////

router.post("/aiConsultation", verifyToken, authorize("user"), async (req, res, next) => {
    try {
        const data = req.body;
        const recommendation = await AIServices.getAIRecommendation(data);
        res.status(200).json(recommendation);
    } catch (error) {
        next(error);
    }   
});

//////////////////////////////////ROADMAPS///////////////////////////////

// GET ALL ROADMAPS
router.get("/roadmaps", verifyToken, authorize("user"), async (req, res, next) => {
    try {
        const roadmaps = await UserServices.getAllRoadmaps();
        res.status(200).json(roadmaps);
    }
    catch (err) {
        next(err);
    }
});

// GET BY ID
router.get("/roadmap/:id", verifyToken, authorize("user"), async (req, res, next) => {
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
router.get("/roadmapByName", verifyToken, authorize("user"), async (req, res, next) => {
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
router.get("/trackRoadmaps/:id", verifyToken, authorize("user"), async (req, res, next) => {
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
router.get("/searchRoadmaps", verifyToken, authorize("user"), async (req, res, next) => {
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

////////////////////////////////SavedRoadmaps//////////////////////////


// SAVE ROADMAP
router.post("/SaveRoadmap", verifyToken, authorize("user"), async (req, res, next) => {
    try {

        const { userId, roadmapId, progressStatus, progressPercentage } = req.body;

        const SavedRoadmap = await UserServices.createSavedRoadmap({
            userId,
            roadmapId,
            progressStatus,
            progressPercentage
        });

        res.status(201).json({
            message: "Roadmap saved successfully",
            data: SavedRoadmap
        });

    } catch (error) {
        next(error);
    }
});


// GET USER SAVED ROADMAPS
router.get("/SavedRoadmaps/:id", verifyToken, authorize("user"), async (req, res, next) => {
    try {

        const id = req.params.id;

        const SavedRoadmaps = await UserServices.getUserSavedRoadmaps(id);

        res.status(200).json(SavedRoadmaps);

    } catch (err) {
        next(err);
    }
});


// GET SAVED ROADMAP BY ID
router.get("/SavedRoadmap/:id", verifyToken, authorize("user"), async (req, res, next) => {
    try {

        const id = req.params.id;

        const SavedRoadmap = await UserServices.getSavedRoadmapById(id);

        res.status(200).json(SavedRoadmap);

    } catch (err) {
        next(err);
    }
});


// UPDATE SAVED ROADMAP
router.put("/SavedRoadmap/:roadmapId/:userId", verifyToken, authorize("user"), async (req, res) => {
    try {
        const { roadmapId, userId } = req.params;
        const updates = req.body;

        const updated = await UserServices.updateSavedRoadmap(
            parseInt(roadmapId),
            parseInt(userId),
            updates
        );

        res.status(200).json({
            message: "SavedRoadmap updated successfully",
            data: updated
        });
    } catch (err) {
        console.error("Error in PUT /SavedRoadmap/:roadmapId/:userId:", err);
        res.status(500).json({ error: err.message });
    }
});


router.delete("/SavedRoadmap/:roadmapId/:userId", verifyToken, authorize("user"), async (req, res) => {

    const { roadmapId, userId } = req.params;

    const deleted = await UserServices.deleteSavedRoadmap(
        parseInt(roadmapId),
        parseInt(userId)
    );

    res.status(200).json({
        message: "SavedRoadmap deleted successfully",
        deleted
    });
});



////////////////////////////////SavedSkills////////////////////////////


router.post("/SaveSkill", verifyToken, authorize("user"), async (req, res, next) => {
    try {
        const { name, userId } = req.body;
        const SaveSkill = await UserServices.createSevedSkill({ name, userId });

        res.status(201).json({
            message: "Skill saved successfully",
            data: SaveSkill
        });
    }
    catch (error) {
        next(error);
    }
});

// GET USER SAVED SKILLS
router.get("/SavedSkills/:id", verifyToken, authorize("user"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const SavedSkills = await UserServices.getUserSavedSkills(id);
        res.status(200).json(SavedSkills);
    }
    catch (err) {
        next(err);
    }
});

// GET SAVED SKILL BY ID
router.get("/SavedSkill/:id", verifyToken, authorize("user"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const SavedSkill = await UserServices.getSavedSkillById(id);

        res.status(200).json(SavedSkill);
    }
    catch (err) {
        next(err);
    }
});


router.get("/SavedSkillByName", verifyToken, authorize("user"), async (req, res, next) => {
    try {
        const name = req.query.name;
        const SavedSkill = await UserServices.getSavedSkillByName(name);

        res.status(200).json(SavedSkill);
    }
    catch (err) {
        next(err);
    }
});


router.put("/SavedSkill/:id", verifyToken, authorize("user"), async (req, res, next) => {
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


router.delete("/SavedSkill/:id", verifyToken, authorize("user"), async (req, res, next) => {
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


router.get("/Tracks", verifyToken, authorize("user"), async (req, res, next) => {
    try {
        const tracks = await UserServices.getAllTracks();
        res.status(200).json(tracks);
    }
    catch (err) {
        next(err);
    }
});


router.get("/Track/:id", verifyToken, authorize("user"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const track = await UserServices.getTrackById(id);

        res.status(200).json(track);
    }
    catch (err) {
        next(err);
    }
});


router.get("/TrackByName", verifyToken, authorize("user"), async (req, res, next) => {
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


/* router.get("/Topics/", async (req, res, next) => {
    try {
        const topics = await UserServices.getAllTracks();
        res.status(200).json(topics);
    }
    catch (err) {
        next(err);
    }
});
 */
router.get("/TopicsByRoadmap/:roadmapId", verifyToken, authorize("user"), async (req, res, next) => {
    try {
        const { roadmapId } = req.params;
        const topics = await UserServices.getTopicsByRoadmapId(roadmapId);

        res.status(200).json(topics);
    }
    catch (err) {
        next(err);
    }
});


router.get("/Topic/:id", verifyToken, authorize("user"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const topic = await UserServices.getTopicById(id);

        res.status(200).json(topic);
    }
    catch (err) {
        next(err);
    }
});


router.get("/TopicByName", verifyToken, authorize("user"), async (req, res, next) => {
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


router.get("/Technologies", verifyToken, authorize("user"), async (req, res, next) => {
    try {
        const technologies = await UserServices.getAllTechnologies();
        res.status(200).json(technologies);
    }
    catch (err) {
        next(err);
    }
});


router.get("/Technology/:id", verifyToken, authorize("user"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const technology = await UserServices.getTechnologyById(id);

        res.status(200).json(technology);
    }
    catch (err) {
        next(err);
    }
});

router.get("/TechnologyTrack/:id", verifyToken, authorize("user"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const technology = await UserServices.getTechnologyByTrackId(id);

        res.status(200).json(technology);
    }
    catch (err) {
        next(err);
    }
});


router.get("/TechnologyByName", verifyToken, authorize("user"), async (req, res, next) => {
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

router.get("/Sources", verifyToken, authorize("user"), async (req, res, next) => {
    try {
        const sources = await UserServices.getAllSources();
        res.status(200).json(sources);
    } catch (err) {
        next(err);
    }
});


router.get("/Source/:id", verifyToken, authorize("user"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const source = await UserServices.getSourceById(id);
        res.status(200).json(source);
    } catch (err) {
        next(err);
    }
});


router.get("/SourceTopic/:topicId", verifyToken, authorize("user"), async (req, res, next) => {
    try {
        const topicId = req.params.topicId;
        const sources = await UserServices.getSourcesByTopicId(topicId);
        res.status(200).json(sources);
    } catch (err) {
        next(err);
    }
});

/////////////////////////////REgions/////////////////////////


router.get("/Regions", verifyToken, authorize("user"), async (req, res, next) => {
    try {
        const regions = await UserServices.getAllRegions();
        res.status(200).json(regions);
    }
    catch (err) {
        next(err);
    }
});


router.get("/Region/:id", verifyToken, authorize("user"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const region = await UserServices.getRegionById(id);

        res.status(200).json(region);
    }
    catch (err) {
        next(err);
    }
});


router.get("/RegionTrack/:id", verifyToken, authorize("user"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const regions = await UserServices.getRegionsByTrackId(id);

        res.status(200).json(regions);
    }
    catch (err) {
        next(err);
    }
});


router.get("/RegionByName", verifyToken, authorize("user"), async (req, res, next) => {
    try {
        const name = req.query.name;
        const region = await UserServices.getRegionByName(name);

        res.status(200).json(region);
    }
    catch (err) {
        next(err);
    }
});

/////////////////////////////Statistics////////////////////////////////

router.get("/marketDemand/track/:id", verifyToken, authorize("user"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const statistics = await UserServices.getTrackStatistics(id);
        res.status(200).json(statistics);
    } catch (error) {
        next(error);
    }
}
);

router.get("/marketDemand/region/:id", verifyToken, authorize("user"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const statistics = await UserServices.getRegionStatistics(id);
        res.status(200).json(statistics);
    } catch (error) {
        next(error);
    }
});

////////////////////////////Quizess///////////////////////////////////

router.get("/Quizzes", verifyToken, authorize("user"), async (req, res, next) => {
    try {
        const quizzes = await UserServices.getAllQuizzes();
        res.status(200).json(quizzes);
    } catch (error) {
        next(error);
    }
});


router.get("/Quiz/:id", verifyToken, authorize("user"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const quiz = await UserServices.getQuizById(id);
        res.status(200).json(quiz);
    } catch (error) {
        next(error);
    }
});


router.get("/QuizByEntity", verifyToken, authorize("user"), async (req, res, next) => {
    try {
        const { type, id } = req.query; 
        const quizzes = await UserServices.getQuizzesByEntity(type, id);
        res.status(200).json(quizzes);
    } catch (error) {
        next(error);
    }
});


router.get("/QuizByName", verifyToken, authorize("user"), async (req, res, next) => {
    try {
        const name = req.query.name;
        const quiz = await UserServices.getQuizByName(name);
        res.status(200).json(quiz);
    } catch (error) {
        next(error);
    }
});

///////////////////////////////////////Questions///////////////////////////////////////


router.get("/QuestionsByQuiz/:id", verifyToken, authorize("user"), async (req, res, next) => {
    try {
        const quizId = req.params.id;
        const questions = await UserServices.getQuestionsByQuizId(quizId);

        res.status(200).json(questions);
    } 
    catch (err) {
        next(err);
    }
});

// GET single question
router.get("/Question/:id", verifyToken, authorize("user"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const question = await UserServices.getQuestionById(id);

        res.status(200).json(question);
    } 
    catch (err) {
        next(err);
    }
});

////////////////////// Quiz Grades //////////////////////////////////

router.post("/submitQuiz", verifyToken, authorize("user"), async (req, res, next) => {
    try {
        const data = req.body;
        const quizGrade = await UserServices.submitQuiz({
                userId: data.userId,
                quizId: data.quizId,
                answers: data.answers
            });
        res.status(201).json({
            message: "Quiz submitted successfully",
            data: quizGrade
        });
    } catch (error) {
        next(error);
    }
});

router.put("/improveQuizGrade/:id", verifyToken, authorize("user"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const improvedGrade = await UserServices.improveQuizGrade(id, data);
        res.status(200).json({
            message: "Quiz grade improved successfully",
            data: improvedGrade
        });
    } catch (error) {
        next(error);
    }
});

router.get("/QuizGrade/:id", verifyToken, authorize("user"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const quizGrade = await UserServices.getQuizGradeById(id);
        res.status(200).json(quizGrade);
    }
    catch (error) {
        next(error);
    }
});

router.get("/QuizGradesByUser/:userId", verifyToken, authorize("user"), async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const quizGrades = await UserServices.getQuizGradesByUserId(userId);
        res.status(200).json(quizGrades);
    }
    catch (error) {
        next(error);
    }
});

/////////////////////User///////////////////////////////////


// // REGISTER
// router.post("/register", async (req, res, next) => {
//     try {
//         const { name, email, password, image, cv, role } = req.body;
//         const user = await UserServices.registerUser({ name, email, password, image, cv, role });

//         res.status(201).json({
//             message: "User registered successfully",
//             data: user
//         });
//     } catch (error) {
//         next(error);
//     }
// });


// // LOGIN
// router.post("/login", async (req, res, next) => {
//     try {
//         const { email } = req.body;

//         const user = await UserServices.loginUser(email);

//         res.status(200).json(user);
//     } catch (error) {
//         next(error);
//     }
// });


// GET PROFILE BY ID
router.get("/user/:id", verifyToken, authorize("user"), async (req, res, next) => {
    try {
        const id = req.params.id;

        const user = await UserServices.getUserProfile(id);

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});


// UPDATE PROFILE
router.put("/user/:id", verifyToken, authorize("user"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const updates = req.body;

        const updated = await UserServices.updateUserProfile(id, updates);

        res.status(200).json({
            message: "User updated successfully",
            data: updated
        });

    } catch (error) {
        next(error);
    }
});


//-----------------------------------UserContribution-------------------------------//


router.post("/contribution", verifyToken, authorize("user"), async (req, res, next) => {
    try {

        const { name, link, userId,topicId } = req.body;
        const contribution = await UserServices.createContribution({ name, link, userId, topicId, requestStatus: "Pending" });

        res.status(201).json({
            message: "Contribution created successfully",
            data: contribution
        });

    } catch (error) {
        next(error);
    }
});

router.get("/contribution/:id", verifyToken, authorize("user"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const userId = req.user.id;

        const contribution = await UserServices.getContributionById(id, userId);
        res.status(200).json(contribution);

    } catch (error) {
        next(error);
    }
});

// GET ALL MY CONTRIBUTIONS
router.get("/contributions", verifyToken, authorize("user"), async (req, res, next) => {
    try {
        const userId = req.user.id;

        const contributions = await UserServices.getUserContributions(userId);
        res.status(200).json(contributions);

    } catch (error) {
        next(error);
    }
});

// UPDATE MY CONTRIBUTION (ONLY IF PENDING)
router.put("/contribution/:id", verifyToken, authorize("user"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const userId = req.user.id;
        const data = req.body;

        const updated = await UserServices.updateUserContribution(id, userId, data);

        res.status(200).json({
            message: "Contribution updated successfully",
            data: updated
        });

    } catch (error) {
        next(error);
    }
});

// DELETE MY CONTRIBUTION (ONLY IF PENDING)
router.delete("/contribution/:id", verifyToken, authorize("user"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const userId = req.user.id;

        await UserServices.deleteUserContribution(id, userId);

        res.status(200).json({
            message: "Contribution deleted successfully"
        });

    } catch (error) {
        next(error);
    }
});

//////////////////////////////  CV  ////////////////////////////////

router.post("/generate-cv", verifyToken, authorize("user"), async (req, res, next) => {
    try {
        const pdf = await UserServices.generateCV(req.body);

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=cv.pdf",
        });

        res.send(pdf);

    } catch (error) {
        next(error);
    }
});


module.exports = router; 