 const db = require("../models");
 const { Op } = require("sequelize");
 const { QuizGrade, QuizGradeAnswer } = db;
  
 async function attendQuiz(data){
        try {
            const existingQuiz = await QuizGrade.findOne({
                where: {
                    quizId: data.quizId,
                    userId: data.userId,
                },
            });
            if (existingQuiz) {
                return { error: "This User already has a quiz grade for this quiz." };
            }
            const quizGradeAnswer = await QuizGradeAnswer.create({
                quizGradeId: existingQuiz.id,
                questionId: data.questionId,
            });
            return quizGradeAnswer;
        }
        catch (error) {
            throw error;
        }
 }