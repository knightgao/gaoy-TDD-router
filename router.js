class Router {
    routes = {
        '/': { render: () => console.log('首页'), beforeEnter: () => console.log('beforeEnter')},
        '/about': { render: () => console.log('关于') },
        '/404': { render: () => console.log('404页面未找到') }
    };
    currentUrl = '';
    beforeHooks = [];
    afterHooks = [];
    mode = 'history';

    constructor({ mode = 'history', routes, currentUrl = '/' } = {}) {
        this.mode = mode;
        if (routes) this.routes = routes;
        this.currentUrl = currentUrl;
        this.init();
    }

    initVue(){

    }

    init() {
        if (this.mode === 'history') {
            window.addEventListener('popstate', () => this.routeChanged());
        } else if (this.mode === 'hash') {
            window.addEventListener('hashchange', () => this.routeChanged());
        }
        this.routeChanged(); // 处理初始路由
    }

    async routeChanged() {
        const path = this.getCurrentPath();
        await this.handleRouteChange(path);
    }

    async handleRouteChange(path) {
        const from = this.currentUrl;
        const to = path;

        console.log("from", from)
        console.log("to", to)

        for (let hook of this.beforeHooks) await hook(from, to);



        this.currentUrl = path;
        this.handleRender();

        for (let hook of this.afterHooks) await hook(to);
    }

    handleRender() {
        const route = this.routes[this.currentUrl];
        if (route) {

            route.render();
        } else {
            this.routes['/404'].render();
        }
    }

    getCurrentPath() {
        if (this.mode === 'history') {
            return window.location.pathname;
        } else if (this.mode === 'hash') {
            return window.location.hash.slice(1) || '/';
        }
    }

    beforeEach(hook) {
        this.beforeHooks.push(hook);
    }

    afterEach(hook) {
        this.afterHooks.push(hook);
    }

    async navigate(path) {
        if (this.mode === 'history') {
            history.pushState({}, '', path);
        } else if (this.mode === 'hash') {
            window.location.hash = path;
        }
        await this.routeChanged();
    }
}