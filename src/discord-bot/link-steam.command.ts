import { Command, DiscordCommand } from '@discord-nestjs/core'
import { CommandInteraction } from 'discord.js'

@Command({
  name: 'link',
  description: 'Link steam account',
})
export class LinkCommand implements DiscordCommand {
  handler(interaction: CommandInteraction): string {
    console.log(interaction)
    return 'Link steam'
  }
}
