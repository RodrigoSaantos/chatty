import { Router } from 'express';
import { SettingsController } from './controllers/SettingsController';

export const router = Router();

const settingsController = new SettingsController();

router.post('/settings', settingsController.create)

