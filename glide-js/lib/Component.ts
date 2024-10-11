import { Parser } from './Parser';

/**
 * Interface representing options for a component.
 */
export interface ComponentOptions {
    selector: string; // The tag name of the element where the component will be rendered.
    template: string; // The HTML template string to be rendered.
    contextSource?: Record<string, any>; // Optional data for template parsing.
}

// Store component classes by their selectors
const registeredComponents: { [key: string]: any } = {};

/**
 * Class responsible for rendering a component based on its options.
 */
export class RenderComponent {
    /**
     * Creates an instance of RenderComponent with the provided options.
     *
     * @param options - The options for the component, including selector, template, and optional context.
     */
    constructor(private options: ComponentOptions) {
        this.render(); // Call the render method upon instantiation
    }

    /**
     * Renders the component's template into the DOM based on the selector.
     * 
     * This method selects all elements matching the specified selector and 
     * replaces their content with the parsed template. It uses the Parser 
     * function to handle any data binding or context substitutions.
     * 
     * @private
     */
    private render(): void {
        const { selector, template, contextSource } = this.options; // Destructure options for easier access
        const elements = document.querySelectorAll(selector); // Select all elements matching the selector

        elements.forEach((element) => {
            if (template) {
                // Parse the template with the provided context
                const parsedTemplate = Parser(template, contextSource);
                
                // Create a wrapper to insert the parsed template
                const wrapper = document.createElement('div');
                wrapper.innerHTML = parsedTemplate; // Set the parsed template as the inner HTML

                // Replace the entire element with the parsed template
                element.parentNode?.replaceChild(wrapper.firstElementChild!, element);
            }
        });
    }
}

/**
 * Function to create and register a new component.
 *
 * This function takes the component options, registers the component 
 * by its selector, and returns an instance of RenderComponent for 
 * rendering the component in the DOM.
 *
 * @param options - The options for the component, including selector, template, and optional context.
 * @returns An instance of RenderComponent for the registered component.
 */
export const Component = (options: ComponentOptions): RenderComponent => {
    registeredComponents[options.selector] = options; // Register the component by its selector
    return new RenderComponent(options); // Return a new instance of RenderComponent
};

/**
 * Method to retrieve all registered components.
 *
 * This function returns an object containing all registered components 
 * indexed by their selectors. This can be useful for debugging or 
 * dynamically rendering components later.
 *
 * @returns An object containing all registered components indexed by their selectors.
 */
export const getRegisteredComponents = () => registeredComponents; // Return the registered components
