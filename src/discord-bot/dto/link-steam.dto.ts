import { ArgNum } from '@discord-nestjs/core'

export class LinkSteamDto {
  @ArgNum(() => ({ position: 0 }))
  profile: string
}
