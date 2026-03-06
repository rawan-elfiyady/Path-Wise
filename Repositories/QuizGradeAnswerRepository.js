 const db = require("../models");
 const { Op } = require("sequelize");
 const { QuizGrade, QuizGradeAnswer, Quiz, Question, TopicProgress, Topic } = db;

 async function calcGrade(quizId, quizGradeId, answers, goal) {
        try {
            const quiz = await db.Quiz.findByPk(quizId, {
                include: {
                    model: db.Question,
                    as: "questions",
                },
            });
            if (!quiz) {
                throw new Error("Quiz not found");
            }
            const quizGrade = await QuizGrade.findByPk(quizGradeId);
            if (!quizGrade) {
                throw new Error("QuizGrade not found");
            }

            if (goal === "improve") {
                await QuizGradeAnswer.destroy({
                    where: {
                        quizGradeId: quizGradeId,
                    },
                });
            }
            console.log("answers", answers) // Debugging line to check the questions in the quiz
            let totalGrade = 0;
            for (const answer of answers) {
                const question = quiz.questions.find(q => q.id === answer.questionId);
                if (!question) {
                    throw new Error(`Question with ID ${answer.questionId} not found in quiz`);
                }
                if (question.answer === answer.selectedChoice) {
                    totalGrade += question.degree;
                    await QuizGradeAnswer.create({
                        quizGradeId: quizGradeId,
                        questionId: answer.questionId,
                        answer: answer.selectedChoice,
                        isCorrect: true,
                        rightAnswer: question.answer,
                    });
                }
                else {
                    await QuizGradeAnswer.create({
                        quizGradeId: quizGradeId,
                        questionId: answer.questionId,
                        answer: answer.selectedChoice,
                        isCorrect: false,
                        rightAnswer: question.answer,
                    });
            }
        }
            return totalGrade;
        } catch (error) {
            throw error;
        }
    }

async function checkIfUserCanAttendQuiz(quizId, userId) {
        try {
            const quiz = await Quiz.findByPk(quizId);
            if (!quiz) {
                return { error: "Quiz not found." };
            }
            if(quiz.entityType === "Track"){
                const roadmap = await db.Roadmap.findByPk({where: {entityId: quiz.entityId, entityType: "Track"}, include: {model: db.Topic}});
                if (!roadmap) {
                    throw new Error("Roadmap not found for the quiz's track.");
                }
                const savedRoadmap = await db.SavedRoadmap.findOne({
                    where: {
                        userId: userId,
                        roadmapId: roadmap.id,
                    },
                    include: {
                        model: db.Topic,
                    }
                });
                if (!savedRoadmap) {
                    return { error: "User has not saved the roadmap for this quiz." };
                }
                if(savedRoadmap.progressPercentage < 80){
                    return { error: "User has not completed at least 80% of the roadmap for this quiz." };
                }
            }
            else{
                const topicProgress = await TopicProgress.findOne({
                    where: {
                        userId: userId,
                        topicId: quiz.entityId,
                    },
                });
                if (!topicProgress) {
                    return { error: "User has not started the topic for this quiz." };
                }
            }  
            
            const existingQuiz = await QuizGrade.findOne({
                where: {
                    quizId: quizId,
                    userId: userId,
                },
            });
            if (existingQuiz ) {
                return { error: "This User already has a quiz grade for this quiz." };
            }
            return { message: "User can attend the quiz." };
        } catch (error) {
            throw new Error(error.message);
        }
        }

async function checkIfUserCanImproveQuizGrade(quizGradeId) {
        try {
            const quizGrade = await QuizGrade.findByPk(quizGradeId);
            if (!quizGrade) {
                return { error: "QuizGrade not found." };
            }
            if (quizGrade.status === "Passed") {
                return { error: "Cannot improve a passed quiz grade." };
            }
            return { message: "User can improve the quiz grade." };
        } catch (error) {
            throw new Error(error.message);
        }
        }

async function changeToicProgressStatus(userId, topicId, status) {
            try {
                const topicProgress = await TopicProgress.findOne({
                    where: {
                        userId,
                        topicId
                    }
                });
                if (!topicProgress) {
                    throw new Error("TopicProgress not found");
                }
                topicProgress.status = status;
                await topicProgress.save();
            } catch (error) {
                throw new Error(error.message);
            }
        }

 async function attendQuiz(data){
        try {
            const quiz = await Quiz.findByPk(data.quizId, {
                include: [{
                    model: Question,
                    as: "questions",
                },
                {
                    model:Topic,
                    as: "topic",
                }
            ]
            });
            const topicProcess = await TopicProgress.findOne({
                where: {
                    userId: data.userId,
                    topicId: quiz.topic.id,
                },
            });

            if (!quiz) {
                return { error: "Quiz not found." };
            }
            const userCanAttendQuiz = await checkIfUserCanAttendQuiz(data.quizId, data.userId);
            console.log("User can attend quiz check:", userCanAttendQuiz); // Debugging line to check the result of the user eligibility check
            if (userCanAttendQuiz.error) {
                throw new Error(userCanAttendQuiz.error);
            }

            const quizGrade = await QuizGrade.create({
                userId: data.userId,
                quizId: data.quizId,
                topicProcessId: topicProcess ? topicProcess.id : null,
            });

            const totalGrade = await calcGrade(data.quizId, quizGrade.id, data.answers, "attend");
            if(totalGrade < quiz.grade / 2){
                quizGrade.status = "Failed";
                const finalQuizGradeWithoutAnswers = await QuizGrade.findByPk(quizGrade.id, {
                    include: [
                        {
                            model: QuizGradeAnswer,
                            attributes: { exclude: ['rightAnswer'] },
                            as: "answers",
                            include: {
                                model: Question,
                                as: "question",
                            },
                        },
                        {
                            model: Quiz,
                            as: "Quiz",
                        },
                    ],
                });
                return{ message: "Quiz attended, but the user did not pass. Total grade: " + totalGrade, quizGrade: finalQuizGradeWithoutAnswers};
             }
              else{
                quizGrade.status = "Passed";
                await changeToicProgressStatus(data.userId, quiz.topic.id, "Done");
            }

            console.log("Total Grade:", totalGrade); // Debugging line to check the calculated grade
            quizGrade.grade = totalGrade;
            await quizGrade.save();

            const finalQuizGrade = await QuizGrade.findByPk(quizGrade.id, {
                include: [
                    {
                        model: QuizGradeAnswer,
                        as: "answers",
                        include: {
                            model: Question,
                            as: "question",
                        },
                    },
                    {
                        model: Quiz,
                        as: "Quiz",
                    },
                ],
            });

            return finalQuizGrade;
        }
        catch (error) {
            throw new Error(error.message);
        }
 }

 async function improveQuizGrade(quizGradeId, data){
    try {
        const quizGrade = await QuizGrade.findByPk(quizGradeId, {
            include: [{
                model: Quiz,
                as: "Quiz",
            }]
         }
        );
        if (!quizGrade) {
            return { error: "QuizGrade not found." };
        }
        const totalGrade = await calcGrade(quizGrade.quizId, quizGrade.id, data.answers, "improve");
        if(totalGrade < quizGrade.Quiz.grade / 2){
            quizGrade.status = "Failed";
            quizGrade.grade = totalGrade;
            await quizGrade.save();
            const finalQuizGradeWithoutAnswers = await QuizGrade.findByPk(quizGrade.id, {
                    include: [
                        {
                            model: QuizGradeAnswer,
                            attributes: { exclude: ['rightAnswer'] },
                            as: "answers",
                            include: {
                                model: Question,
                                as: "question",
                            },
                        },
                        {
                            model: Quiz,
                            as: "Quiz",
                        },
                    ],
        });
        return{ message: "Quiz attended, but the user did not pass. Total grade: " + totalGrade, quizGrade: finalQuizGradeWithoutAnswers};
        }
        else{
            quizGrade.status = "Passed";
            quizGrade.grade = totalGrade;
            await quizGrade.save();
            await changeToicProgressStatus(quizGrade.userId, quizGrade.Quiz.entityId, "Done");
        }
        quizGrade.grade = totalGrade;
        await quizGrade.save();
         const finalQuizGrade = await QuizGrade.findByPk(quizGrade.id, {
                include: [
                    {
                        model: QuizGradeAnswer,
                        as: "answers",
                        include: {
                            model: Question,
                            as: "question",
                        },
                    },
                    {
                        model: Quiz,
                        as: "Quiz",
                    },
                ],
            });

            return finalQuizGrade;
    } catch (error) {
        throw new Error(error.message);
    }
 }

 async function submitQuiz(data){
    try{
        const quiz = await Quiz.findByPk(data.quizId);
    if (!quiz) {
        return { error: "Quiz not found." };
    }

    const user = await db.User.findByPk(data.userId);
    if (!user) {
        return { error: "User not found." };
    }

    const quizGrade = await QuizGrade.findOne({
        where: {
            quizId: data.quizId,
            userId: data.userId,
        },
    });

    if (!quizGrade) {
        const quizResult = await attendQuiz(data);
        return quizResult;
    }
        else {
            const quizResult = await improveQuizGrade(quizGrade.id, data);
            return quizResult;
         }
    
    }catch (error) {
    throw new Error(error.message);
    }
 }
 async function getQuizGradeById(id) {
    try {
        const quizGrade = await QuizGrade.findByPk(id, {
            include: [
                {
                    model: QuizGradeAnswer,
                    as: "quizGradeAnswers",
                    include: {
                        model: Question,
                        as: "questions",
                    },
                },
                {
                    model: Quiz,
                    as: "quiz",
                },
            ],
        });
        return quizGrade;
    } catch (error) {
        throw new Error(error.message);
    }
 }

 async function getQuizGradesByUserId(userId) {
    try {
        const quizGrades = await QuizGrade.findAll({
            where: { userId },
            include: [
                {
                    model: QuizGradeAnswer,
                    as: "quizGradeAnswers",
                    include: {
                        model: Question,
                        as: "questions",
                    },
                },
                {
                    model: Quiz,
                    as: "quiz",
                },
            ],
        });
        return quizGrades;
    } catch (error) {
        throw new Error(error.message);
    }
    }



    module.exports = {
        attendQuiz,
        improveQuizGrade,
        submitQuiz,
        getQuizGradeById,
        getQuizGradesByUserId,
        };