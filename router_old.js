class Router_old {
    routes = {
        '/': {
            render: () => {
                console.log('首页')
            }
        },
        '/about': {
            render: () => {
                console.log('关于')
            }
        },
        '/404': {
            render: () => {
                console.log('404')
            }
        }
    }
    currentUrl = ''
    beforeHooks = []
    afterHooks = []

    constructor({mode,routes,currentUrl} = {
        mode: 'history'
    }){
        if(routes){
            this.routes = routes
        }
        this.currentUrl = currentUrl
        this.mode = mode
        this.beforeHooks = [];
        this.afterHooks = [];

        this.init()
    }

    async init() {
        // 两个事件就可以监听路由的变化了
        if (this.mode === 'history') {
            window.addEventListener('popstate', async () => {
                await this.routeChanged();
            });
        } else if (this.mode === 'hash') {
            window.addEventListener('hashchange', async () => {
                await this.routeChanged();
            });
        }
        await this.routeChanged(); // 初始加载时处理路由
    }

    async handleRouteChange(path) {

        const from = this.getCurrentPath();
        const to = path;

        // 前置钩子、路由匹配和渲染、后置钩子的处理逻辑与之前相同
        this.handleRender();



    }

    handleRender(){
        const route = this.routes[this.currentUrl];
        if (route) {
            route.render();
        } else {
            this.routes['/404'].render();
        }
    }

    async routeChanged(path) {
        await this.handleRouteChange(path);
    }

    getCurrentPath() {
        return window.location.hash.slice(1) || '/';
    }

    beforeEach(hook) {
        this.beforeHooks.push(hook);
    }

    afterEach(hook) {
        this.afterHooks.push(hook);
    }

    // 跳转
    async navigate(path){
        if(this.mode === 'history'){
            history.pushState({}, '', path)
        } else if (this.mode === 'hash') {
            window.location.hash = path
        } else {
            throw new Error('不支持的路由模式')
        }
        await this.routeChanged(path);
    }

}