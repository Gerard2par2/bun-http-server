import App from './app/app'

const t1 = Bun.nanoseconds();
console.log('Starting server.');

await(async() => {App()})();

const t2 = Bun.nanoseconds();
console.log(`Server started in ${(t2 - t1) / Math.pow(10, 6)} ms.`)