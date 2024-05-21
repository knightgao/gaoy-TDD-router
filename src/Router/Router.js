class Router {
    constructor({ mode = 'history'}={}) {
        this.routes = {};
        this.currentComponent = null;
        this.mode = mode;
        this.init();
    }

    init() {
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
    }

    addRoute(path, component) {
        if (typeof component !== 'object') {
            throw new Error('component is not a Vue component');
        }
        this.routes[path] = component;
    }

    navigate(path) {
        this.currentComponent = this.routes[path];
    }

    getCurrentComponent() {
        return this.currentComponent;
    }
}

export default Router;