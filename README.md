# <img src="https://prism.ler.sg/favicon96.png" width="24"/> PrisM Dashboard

[**HacX!**](https://hacx.sg) 2023 – Hack for Public Safety

Designed by [Lam Eu Ler](https://ler.sg) of Team **`wenkAI`**

Dashboard for monitoring the vitals signs (heart rate, respiratory rate, body temperature, falls) of inmates and security camera feeds in a prison.

*This is a demo with randomly generated people and data.*

Visit the demo site: <https://prism.ler.sg>

## Developing

Start a development server:

```bash
npm run dev

# or start the server on a specified port (eg 3000) and allow access from other devices
npm run dev -- --host --port 3000
```

## Building

To create a production version of the app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy the app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

You may need to run the commands with `sudo` if you intend to host on port 80.

## Hosting Locally

To host the app locally, we can use [`pm2`](https://pm2.keymetrics.io).

First, build the app with `sudo npm run build` as described above.

Then, start the process in pm2:

```bash
sudo pm2 start "npm run preview -- --host --port 80" --name prism
```