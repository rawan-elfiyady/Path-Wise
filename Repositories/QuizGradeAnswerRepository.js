 const db = require("../models");
 const { Op } = require("sequelize");
 const { QuizGrade, QuizGradeAnswer, Quiz, Question } = db;

 async function calcGrade(quizId, quizGradeId, answers) {
        try {
            const quiz = await db.Quiz.findByPk(quizId, {
                include: {
                    model: db.Question,
                },
            });
            if (!quiz) {
                throw new Error("Quiz not found");
            }
            let totalGrade = 0;
            for (const answer of answers) {
                const question = quiz.Questions.find(q => q.id === answer.questionId);
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
            const existingQuiz = await QuizGrade.findOne({
                where: {
                    quizId: quizId,
                    userId: userId,
                },
            });
            if (existingQuiz) {
                return { error: "This User already has a quiz grade for this quiz." };
            }
            return { message: "User can attend the quiz." };
        } catch (error) {
            throw new Error(error.message);
        }
        }

 async function attendQuiz(data){
        try {
            const quiz = await Quiz.findByPk(data.quizId, {
                include: {
                    model: Question,
                },
            });
            if (!quiz) {
                return { error: "Quiz not found." };
            }
            const userCanAttendQuiz = checkIfUserCanAttendQuiz(data.quizId, data.userId);
            if (userCanAttendQuiz.error) {
                return userCanAttendQuiz;
            }

            const quizGrade = await QuizGrade.create({
                userId: data.userId,
                quizId: data.quizId,
            });

            const totalGrade = await calcGrade(data.quizId, quizGrade.id, data.answers);
            if(totalGrade < quiz.grade / 2){
                quizGrade.status = "Failed";
            }
            else{
                quizGrade.status = "Passed";
            }

            quizGrade.grade = totalGrade;
            await quizGrade.save();

            return quizGrade;
        }
        catch (error) {
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
                        as: "question",
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
                        as: "question",
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
        getQuizGradeById,
        getQuizGradesByUserId,
        };