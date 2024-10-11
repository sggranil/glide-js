/**
 * Interface representing a route in the application.
 */
interface Route {
    path: string; // The path for the route
    component: { new (): { init: () => void } } | { init: () => void }; // The component to be rendered for this route
}

/**
 * BaseRouter class to manage routing in a single-page application.
 * This class handles route registration, navigation, and rendering
 * of the current route's component.
 */
class BaseRouter {
    private routes: Route[] = []; // Array to hold registered routes
    private currentPath: string = window.location.pathname; // Current path in the application

    /**
     * Initializes the router and sets up the initial route rendering.
     */
    constructor() {
        this.init();
    }

    /**
     * Registers the provided routes and navigates to the current path.
     * 
     * @param routes - An array of routes to register with the router.
     */
    register(routes: Route[]): void {
        this.routes = routes; // Store the routes
        this.navigate(this.currentPath); // Navigate to the current path
    }

    /**
     * Navigates to a new path, updates the browser history,
     * and renders the corresponding component for the route.
     * 
     * @param path - The path to navigate to.
     */
    public navigate(path: string): void {
        this.currentPath = path; // Update the current path
        window.history.pushState({}, '', path); // Update the browser history
        this.renderCurrentRoute(); // Render the component for the new route
    }

    /**
     * Initializes the router by setting up the popstate event listener
     * and rendering the current route on initial load.
     */
    private init(): void {
        window.onpopstate = () => this.renderCurrentRoute(); // Handle back/forward navigation
        this.renderCurrentRoute(); // Render the component for the initial route
    }

    /**
     * Renders the component associated with the current route.
     * If no matching route is found, the method exits early.
     */
    private renderCurrentRoute(): void {
        const route = this.routes.find(r => r.path === this.currentPath); // Find the current route

        // If no route found, exit early
        if (!route) {
            return; // Exit without rendering
        }

        // Attempt to create an instance if it's a class; otherwise, call init directly
        const componentInstance = this.createComponentInstance(route.component);

        if (componentInstance) {
            componentInstance.init(); // Initialize the component
        }
    }

    /**
     * Creates an instance of the component if it's a class,
     * otherwise returns the component itself if it has an init method.
     * 
     * @param component - The component to instantiate or use directly.
     * @returns An instance of the component or null if not applicable.
     */
    private createComponentInstance(component: any): any {
        if (typeof component === 'function') {
            return new component(); // Create an instance if it's a class
        } else if (component && typeof component.init === 'function') {
            return component; // Return the component if it has an init method
        }
        return null; // Return null if neither condition is met
    }
}

// Export a singleton instance of the BaseRouter
export const Router = new BaseRouter();
