import express from 'express';
import { validate } from '../../middleware/validate';
import { SignUpSchema, SignInSchema } from '../../schemas/user.schema';
import { signup, signin, signout } from '../../controllers/v1/auth.controller';

const router = express.Router();

router.post('/signup', validate(SignUpSchema), signup);
router.post('/signin', validate(SignInSchema), signin);
router.post('/signout', signout);

export default router;
