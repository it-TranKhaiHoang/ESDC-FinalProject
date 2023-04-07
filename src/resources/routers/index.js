const express = require('express');
const router = express.Router();

const AssignRouter = require('./AssignRouter');
const CommentRouter = require('./CommentRouter');
const LogRouter = require('./LogRouter');
const MemberRouter = require('./MemberRouter');
const ProjectRouter = require('./ProjectRouter');
const TaskRouter = require('./TaskRouter');

router.use('/assign', AssignRouter);
router.use('/comment', CommentRouter);
router.use('/log', LogRouter);
router.use('/member', MemberRouter);
router.use('/project', ProjectRouter);
router.use('/task', TaskRouter);

module.exports = router;
