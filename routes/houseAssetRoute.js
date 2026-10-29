import express from 'express';
import { 
  addAsset, 
  getAssets, 
  updateAssetStatus, 
  deleteAsset 
} from '../controllers/houseAssetController.js';
import { verifyToken, checkRole } from '../middleware/auth.js';

const router = express.Router();

router.get('/', verifyToken, getAssets);
router.post('/', verifyToken, checkRole(['super_admin', 'admin']), addAsset);
router.patch('/:id/status', verifyToken, checkRole(['super_admin', 'admin', 'manager']), updateAssetStatus);
router.delete('/:id', verifyToken, checkRole(['super_admin']), deleteAsset);

export default router;