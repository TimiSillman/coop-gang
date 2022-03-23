import { DiscordModule } from '@discord-nestjs/core'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Intents } from 'discord.js'
import { SteamModule } from 'src/steam/steam.module'
import { DiscordBotGateway } from './discord-bot.gateway'
@Module({
  imports: [
    SteamModule,
    /*
    Discord bot token setup from .env file
    Discord commands generated automatically from files ending in command.js
    */

    DiscordModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        token: configService.get<string>('DISCORD_BOT_TOKEN'),
        commands: ['**/*.command.js'],
        prefix: '.',
        autoRegisterGlobalCommands: true,
        discordClientOptions: {
          intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_PRESENCES,
            Intents.FLAGS.GUILD_MEMBERS,
          ],
        },
        registerCommandOptions: [
          {
            forGuild: configService.get<string>('GUILD_ID'),
          },
        ],
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [DiscordBotGateway],
})
export class DiscordBotModule {}
