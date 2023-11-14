export type Show = {
  id: number
  url: string
  name: string
  type: string
  language: string
  genres: string[]
  status: string
  runtime: number
  averageRuntime: number
  premiered: string
  ended: string | null
  officialSite: string | null
  schedule: {
    time: string
    days: string[]
  }
  rating: {
    average: number | null
  }
  weight: number
  network: {
    id: number
    name: string
    country: {
      name: string
      code: string
      timezone: string
    }
    officialSite: string | null
  }
  webChannel: null
  dvdCountry: null
  externals: {
    tvrage: number | null
    thetvdb: number | null
    imdb: string | null
  }
  image: {
    medium: string
    original: string
  }
  summary: string
  updated: number
  _links: {
    self: {
      href: string
    }
    previousepisode: {
      href: string
    }
    nextepisode: {
      href: string
    }
  }
  _embedded: any
}
