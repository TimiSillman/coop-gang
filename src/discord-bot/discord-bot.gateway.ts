import {
  InjectDiscordClient,
  Once,
  Payload,
  PrefixCommand,
  UsePipes,
} from '@discord-nestjs/core'
import { Injectable, Logger } from '@nestjs/common'
import { Client, Message } from 'discord.js'
import { SteamService } from 'src/steam/steam.service'
import { LinkSteamDto } from './dto/link-steam.dto'

@Injectable()
export class DiscordBotGateway {
  private readonly logger = new Logger(DiscordBotGateway.name)

  constructor(
    @InjectDiscordClient() private readonly client: Client,
    private readonly steamService: SteamService,
  ) {}

  @Once('ready')
  onReady() {
    this.logger.log(`${this.client.user.tag} started`)
  }

  @PrefixCommand('link')
  async onMessage(
    @Payload() dto: LinkSteamDto,
    message: Message,
  ): Promise<string> {
    let steamid
    try {
      const parsed = parseInt(message.content)
      if (isNaN(parsed)) {
        const profileUrl = new URL(message.content)
        const splitPathname = profileUrl.pathname.split('/')
        steamid = splitPathname[2]
      } else {
        steamid = parsed
      }

      this.steamService.getUserGamesWithCategories(steamid)
      return 'result'
    } catch (error) {
      return 'Please provide valid URL or steamid'
    }
  }
}
