import Router from '../classes/router.class'

export default function RootRoute(router: Router) {
    router.get('/',(_req: Request) => new Response('Hello World !'))
}