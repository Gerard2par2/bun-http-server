import Router from './router.class';

export default class Server {

    private readonly port: number;
    private readonly rootRouter: Router;

    get Router(): Router {
        return this.rootRouter;
    }

    public constructor(port: number) {
        this.port = port;
        this.rootRouter = new Router();
    }

    public serve(): void {
        const router = this.rootRouter;
        Bun.serve({
            port: this.port,
            fetch(req: Request): Response {
                return router.handleRequest(req.url.replace(`http://localhost:${this.port}`, '').split('/').filter(element => element !== ''), req);
            }
        });
    }

    public use(url: string, callBack: (router: Router) => void) {
        const splittedUrl = url.split('/').filter(element => element !== '');
    
        if (splittedUrl.length > 1) {
            throw new Error('Can only use 1 depth routes');
        }
    
        if (splittedUrl.length === 0) {
            callBack(this.rootRouter);
        } else {
            let router = this.rootRouter.childrens.get(splittedUrl[0])
            if(router === undefined) {
                router = new Router();
                this.rootRouter.childrens.set(splittedUrl[0], router);
            }
            callBack(router)
        }
    }
    
}