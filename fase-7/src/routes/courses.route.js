import express from 'express'
import { addCourse, getAllCourses, getCoursesById } from '../controllers/courses.controller.js'

const router = express.Router()

router.get('/', getAllCourses)
router.get('/:id/courses', getCoursesById)
router.post('/', addCourse)


export default router