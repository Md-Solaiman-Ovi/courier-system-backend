import express from 'express';
import { createParcel, getParcelsByUser, getAllParcels, updateParcel, deleteParcel, assignAgentToParcel, updateParcelStatus } from '../controllers/parcel.controller';
import { requireRole } from '../middlewares/auth.middleware';
import { Router } from 'express';

const router: Router = express.Router();

router.post('/', requireRole(['customer']), createParcel);
router.get('/my-parcels', requireRole(['customer']), getParcelsByUser);
router.get('/', requireRole(['admin']), getAllParcels);
router.put('/:id', requireRole(['admin', 'agent']), updateParcel);
router.delete('/:id', requireRole(['admin']), deleteParcel);
router.put('/:id/assign', requireRole(['admin']), assignAgentToParcel);
router.put('/:id/status', requireRole(['agent']), updateParcelStatus);

export default router;