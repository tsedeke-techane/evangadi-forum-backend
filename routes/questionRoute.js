import express from 'express';
const router = express.Router();
// question controllers
// import { createQuestion, getQuestions, getQuestionById, updateQuestion, deleteQuestion } from '../controllers/questionController.js';

router.get("/all-questions", (req, res) => {
    res.status(200).json({ message: "All questions" });
}
);

export default router;