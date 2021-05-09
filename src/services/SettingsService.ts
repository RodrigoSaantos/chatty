import { getCustomRepository, Repository } from "typeorm";
import { Setting } from "../entities/Setting";
import { SettingsRepository } from "../repositories/SettingsRepository";

interface SettingsProps {
  chat: boolean;
  username: string;
}

interface IFindByUserName {
  username: string;
}

export class SettingsService {
  private settingsRepository: Repository<Setting>;

  constructor() {
    this.settingsRepository = getCustomRepository(SettingsRepository)
  }

  async create({ chat, username }: SettingsProps) {

    const userAlreadyExists = await this.settingsRepository.findOne({ username });
    
    if (userAlreadyExists) {
      throw new Error('User already exists!')
    }

    const settings = this.settingsRepository.create({
      chat,
      username,
    });
  
    await this.settingsRepository.save(settings);

    return settings;
  }

  async findByUserName({ username }: IFindByUserName) {
    const settings = await this.settingsRepository.findOne({ 
      username,
    });

    return settings;
  }

  async update({ chat, username}: SettingsProps) {
    await this.settingsRepository
      .createQueryBuilder()
      .update(Setting)
      .set({ chat })
      .where("Username = :username", {
        username,
      })
      .execute()
  }
}
