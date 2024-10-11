import { Parser } from './Parser';
import { RenderComponent } from './Component';
import { getRegisteredComponents } from './Component';

/**
 * Interface representing options for rendering a page.
 */
interface PageOptions {
    template: string; // The template string to render
    contextSource?: Record<string, any>; // Optional context object for template parsing
}

/**
 * BasePage class responsible for rendering templates and initializing dynamic components.
 */
export class BasePage {
    private rootId: string; // The ID of the root element where the template will be rendered

    /**
     * Creates an instance of BasePage.
     * 
     * @param rootId - The ID of the root element to render the page into. Defaults to 'app'.
     */
    constructor(rootId: string = 'app') {
        this.rootId = rootId; // Set the root ID for rendering
    }

    /**
     * Renders the page using the provided options.
     * 
     * This method parses the given template with the context and inserts it 
     * into the root element. It also initializes any dynamic components 
     * defined in the rendered template.
     * 
     * @param options - The options for rendering the page, including template and contextSource.
     */
    render(options: PageOptions): void {
        const { template, contextSource } = options; // Destructure options to get template and context
        const rootElement = document.getElementById(this.rootId); // Get the root element by ID

        if (rootElement) {
            // Parse the template with the provided context
            const parsedTemplate = Parser(template, contextSource);
            rootElement.innerHTML = parsedTemplate; // Set the inner HTML of the root element
            this.initDynamicComponents(rootElement); // Initialize any dynamic components within the rendered template
        } else {
            console.warn(`Element with ID ${this.rootId} not found.`); // Warn if the root element is not found
        }
    }

    /**
     * Initializes dynamic components within the given root element.
     * 
     * This method searches for all registered custom elements within the root element 
     * and instantiates their corresponding RenderComponent.
     * 
     * @param rootElement - The root element where dynamic components are initialized.
     * @private
     */
    private initDynamicComponents(rootElement: HTMLElement): void {
        const registeredComponents = getRegisteredComponents(); // Retrieve registered components
    
        Object.keys(registeredComponents).forEach((selector) => {
            // Find all custom elements in the root element that match the registered selectors
            const customElements = rootElement.querySelectorAll(selector);
            customElements.forEach((element) => {
                const componentOptions = registeredComponents[selector]; // Get the component options
                if (componentOptions) {
                    new RenderComponent(componentOptions); // Create an instance of RenderComponent
                }
            });
        });
    }
}

/**
 * A utility function to create and render a BasePage instance with the provided options.
 *
 * This function serves as a convenient way to instantiate and render a 
 * BasePage without manually creating an instance each time.
 *
 * @param options - The options for rendering the page, including template and contextSource.
 */
export const Page = (options: PageOptions) => {
    const page = new BasePage(); // Create a new instance of BasePage
    page.render(options); // Render the page with the provided options
};
