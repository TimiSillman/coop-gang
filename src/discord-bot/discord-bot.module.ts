import { DiscordModule } from '@discord-nestjs/core'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Intents } from 'discord.js'

@Module({
  imports: [
    /*
    Discord bot token setup from .env file
    Discord commands generated automatically from files ending in command.js
    */

    DiscordModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        token: configService.get<string>('DISCORD_BOT_TOKEN'),
        commands: ['**/*.command.js'],
        discordClientOptions: {
          intents: [Intents.FLAGS.GUILDS],
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DiscordBotModule {}
