import { Router } from 'express';
import { SettingsController } from './controllers/SettingsController';
import { UsersController } from './controllers/UsersController';

export const router = Router();

const settingsController = new SettingsController();
const usersController = new UsersController();

router.post('/settings', settingsController.create)
router.post('/users', usersController.create)

