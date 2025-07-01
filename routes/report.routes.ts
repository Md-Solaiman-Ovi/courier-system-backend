import express from 'express';
import { getAnalytics, exportCSV, exportPDF } from '../controllers/report.controller';
import { requireRole } from '../middlewares/auth.middleware';
import { Router } from 'express';
const router:Router = express.Router();

router.get('/analytics', requireRole(['admin']), getAnalytics);
router.get('/csv', requireRole(['admin']), exportCSV);
router.get('/pdf', requireRole(['admin']), exportPDF);

export default router;
