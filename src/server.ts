import { App } from './app';

const app = new App();

(async () => {
  await app.init();
  app.listen();
})();