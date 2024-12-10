import { Router } from 'express';
import { AdminControllers } from './admin.controller';
import validateRequest from '../middlewares/validateRequest';
import { AdminValidation } from './admin.validation';

const router = Router();

router.get('/:id', AdminControllers.getSingleAdmin);
router.delete('/:id', AdminControllers.deleteSingleAdmin);
router.patch(
  '/:id',
  validateRequest(AdminValidation.updateAdminValidationSchema),
  AdminControllers.updateSingleAdmin,
);
router.get('/', AdminControllers.getAllAdmin);

export const AdminRoute = router;
