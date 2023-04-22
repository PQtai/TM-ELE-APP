import express from 'express';
const router = express.Router();
import { vnpController } from '../controllers/vnp.controller'

router.post('/create_payment_url', vnpController);