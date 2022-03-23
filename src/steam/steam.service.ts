import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { catchError, map, mergeMap, Observable } from 'rxjs'

@Injectable()
export class SteamService {
  baseUrl: string
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {
    this.baseUrl = 'https://api.steampowered.com/'
  }

  getUsersGames(
    steamid: string,
    include_appinfo = true,
    include_played_free_games = true
  ): Observable<any> {
    return this.httpService
      .get(`${this.baseUrl}IPlayerService/GetOwnedGames/v1/`, {
        params: {
          key: this.configService.get<string>('STEAM_API_KEY'),
          steamid: steamid,
          include_appinfo: include_appinfo,
          include_played_free_games: include_played_free_games,
        },
      })
      .pipe(map((result) => result.data.response.games))
  }

  getAppDetails(appids: string[]): Observable<any> {
    return this.httpService.get(
      `http://store.steampowered.com/api/appdetails`,
      {
        params: {
          appids: appids.toString(),
          filters: 'categories',
        },
      }
    )
  }

  //TODO: fetch app info with appids. Needed info: categories. Steam api is not allowing bulk query for app categories.

  getUserGamesWithCategories(steamid: string) {
    const games = []
    this.getUsersGames(steamid)
      .pipe(
        mergeMap((result) => {
          const appids = result.map((game) => game.appid)
          return games
        })
      )
      .pipe(
        catchError((error) => {
          return error
        })
      )
  }
}
