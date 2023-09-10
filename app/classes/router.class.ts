import { assert } from "console";
import { RouteCallBackType } from "../types/route-callback.type";

export default class Router {
    public readonly childrens: Map<string, Router> = new Map();

    private routeCallbackMethodMap: Map<string, RouteCallBackType> = new Map();

    get = (url: string, callBack: RouteCallBackType) => this.addNewRoute(url, 'GET', callBack);
    head = (url: string, callBack: RouteCallBackType) => this.addNewRoute(url, 'HEAD', callBack);
    post = (url: string, callBack: RouteCallBackType) => this.addNewRoute(url, 'POST', callBack);
    put = (url: string, callBack: RouteCallBackType) => this.addNewRoute(url, 'PUT', callBack);
    delete = (url: string, callBack: RouteCallBackType) => this.addNewRoute(url, 'DELETE', callBack);
    
    private addNewRoute(url: string, method: string, callBack: RouteCallBackType){
        method = method.toUpperCase();

        url = url === '' ? '/' : url;

        if(url === '/') {
            this.routeCallbackMethodMap.set(method, callBack)
        } else {
            const splittedUrl = url.split('/').filter(element => element !== '');
            assert(splittedUrl !== undefined);
            
            let firstRoute = splittedUrl.shift() as string; 
            let childrenRouter = this.childrens.get(firstRoute);
            const newUrl = splittedUrl.length > 0 ? splittedUrl.reduce((acc, val) => acc + '/' + val) : '/';

            if(childrenRouter === undefined) {
                // If the route does not exist yet
                childrenRouter = new Router();
                this.childrens.set(firstRoute, childrenRouter);
            }

            childrenRouter.addNewRoute(newUrl, method, callBack)
        }
    }
    
    public handleRequest(url: string[], req: Request): Response {
        if(url.length > 0) {
            const route = this.childrens.get(url[0])
            if(route === undefined) {
                throw new Error('404 not found')
            }
            url.shift();
            return route.handleRequest(url, req);
        } 

        const method = req.method.toUpperCase();
        const callBack = this.routeCallbackMethodMap.get(method)

        if(callBack === undefined) {
            throw new Error('405 Method Not Allowed, in route : ' + url)   
        }
        return callBack(req);
    }
}