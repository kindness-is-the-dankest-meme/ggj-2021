# [Global Game Jam](https://globalgamejam.org) 2021

> A faffabout for Global Game Jam (Online) 2021<br>
> by [Matt Hayes](https://globalgamejam.org/users/mysterycommand)

## Notes

The theme is [Lost & Found](https://globalgamejam.org/news/theme-global-game-jam-online-2021). There are some [diversifiers](https://globalgamejam.org/news/ggj-online-diversifiers). Of particular interest to me are:

> #### Sponsored
>
> **Virtual Wallet (Sponsored by IGDA Foundation)** - Use the [Web Monetization API](https://webmonetization.org/docs/getting-started/) to make a web game that uses an alternative revenue model ([learn how to do this here](https://igdafoundation.org/ggj2021/)).
>
> **Unlikely Allies (Sponsored by [Virtuos](https://www.virtuosgames.com/))** - Your game must support multiplayer crossplay between Mobile and PC.
>
> **The Feels (Sponsored by Sony Interactive Entertainment)** - We would like to encourage projects to come up with designs that take advantage of controller feel, game feel, and/or an emotional and honest personal story.
>
> #### Accessibility
>
> **Kitchen sink** - Players have a choice between at least three different types of input device (e.g. keyboard, controller, mouse, eye tracking, potatoes)
>
> #### Meta
>
> **Snail's Pace** - Your game is designed to be played over multiple days and cannot be sped up.

I'm participating through the [Houston Jam Site](https://globalgamejam.org/2021/jam-sites/houston-global-game-jam-2021) because I'm geographically there. But of course it's all online, so really just hanging out in the Discord.

---

## What I've Got Going

I'm only casually participating this year, and using it as an excuse to explore some web technologies I've been curious about. So this is a [monorepo](https://en.wikipedia.org/wiki/Monorepo) split into [apps](apps) and [packages](packages), and managed by [Lerna](https://lerna.js.org/) and [npm](https://docs.npmjs.com/) ([v7.5.0](https://www.npmjs.com/package/npm/v/7.5.0)) a la [this article](https://dev.to/limal/simplify-your-monorepo-with-npm-7-workspaces-5gmj).

The [server app](apps/server) is a simple NodeJS server that's using [`node-static`](https://www.npmjs.com/package/node-static) to serve static assets out of [the public folder](apps/server/public) (following [this tutorial](https://nodejs.org/en/knowledge/HTTP/servers/how-to-serve-static-files/)) and [`ws`](https://www.npmjs.com/package/ws) to set up a WebSocket server. An [`http-proxy`](https://www.npmjs.com/package/http-proxy) forwards requests for `.js` and `.json` files to the client.

The [client app](apps/client) is an [Esbuild](https://esbuild.github.io/) project that (in dev) uses [the serve command](https://esbuild.github.io/api/#serve). This setup is very loosely inspired by [`yyz`](https://www.npmjs.com/package/yyz) and spiritually by other live coding projects. I'd love to eventually look into implemting something more live, but [Fast Refresh seems hard](https://github.com/facebook/react/issues/16604#issuecomment-528663101).
