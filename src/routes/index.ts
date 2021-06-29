import express from 'express';
import authRouter from './auth';
import adminRouter from './admin';

const router = express.Router();

router.get('/', (_, res) => {
  res.send({
    message: 'Project Manager REST API',
  });
});

router.use('/admin', adminRouter);
router.use('/auth', authRouter);

export default router;
