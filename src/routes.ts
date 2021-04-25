import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { SettingsRepository } from './repositories/SettingsRepository';

export const router = Router();

router.post('/settings', async (request, response) => {
  const { chat, username } = request.body;

  const settingsRepository = getCustomRepository(SettingsRepository);

  const settings = settingsRepository.create({
    chat,
    username,
  });

  await settingsRepository.save(settings);

  return response.json(settings);

})

