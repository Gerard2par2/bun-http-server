import Server from './classes/server.class'
import rootRoute from './routes/router'
import pageRoute from './routes/page/page.route'

export default function App(port?: number) {
    const server = new Server(port ? port : 6969);

    server.use('/', rootRoute)
    server.use('/page', pageRoute)

    server.serve()
}

