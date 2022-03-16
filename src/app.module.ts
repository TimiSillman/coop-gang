import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DiscordBotModule } from './discord-bot/discord-bot.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DiscordBotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
