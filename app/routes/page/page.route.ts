import Router from '../../classes/router.class'

export default function pageRoute(router: Router) {
    router.get('/', (_req: Request) => new Response('Welcome to /page !'));
    router.get('/deep', (_req: Request) => new Response('Welcome to /page/deep !'));
}