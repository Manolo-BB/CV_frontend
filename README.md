# cv-frontend

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```


## Docker deployment

After creating your dockerfile and your nginx.conf, build your container

```sh
docker build   --build-arg VITE_APP_BACKEND_URL=http://localhost:8081
```

Run it with :
```sh
docker run -p 8081:80 cv-frontend
```

You can now see your container running locally at :
```sh
http://localhost:8081
```

if your port 8080 is already used, you can change it !
