import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { SteamService } from './steam.service'

@Module({
  imports: [HttpModule],
  exports: [SteamService],
  providers: [SteamService],
})
export class SteamModule {}
