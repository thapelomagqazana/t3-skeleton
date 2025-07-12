import express from 'express';
import { validate } from '../../middleware/validate';
import { SignUpSchema, SignInSchema } from '../../schemas/user.schema';
import { signup, signin, signout } from '../../controllers/v1/auth.controller';
import { authenticateJWT } from '../../middleware/auth.middleware';

const router = express.Router();

router.post('/signup', validate(SignUpSchema), signup);
router.post('/signin', validate(SignInSchema), signin);
router.post('/signout', authenticateJWT, signout);

export default router;
