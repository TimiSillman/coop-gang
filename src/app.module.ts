import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DiscordBotModule } from './discord-bot/discord-bot.module'
import { SteamModule } from './steam/steam.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DiscordBotModule,
    SteamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
