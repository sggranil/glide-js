/**
 * Parses a template string and replaces placeholders with values from the context.
 *
 * Placeholders can be in the form of:
 * - `{{ expression }}` for inline evaluation
 * - `[attribute] = "{{ expression }}"` for attribute assignment
 *
 * @param template - The template string containing placeholders.
 * @param context - An object containing values to replace in the template. Default is an empty object.
 * @returns The template string with placeholders replaced by their corresponding values.
 */
export function Parser(template: string, context: Record<string, any> = {}): string {
    // Evaluates the expression with the given context
    const evaluate = (expression: string): string => {
        try {
            // Create a new function that takes context keys as parameters and returns the evaluated expression
            const func = new Function(...Object.keys(context), `return ${expression}`);
            return func(...Object.values(context)); // Execute the function with context values
        } catch (error) {
            console.error(`Error evaluating expression "${expression}":`, error);
            return ''; // Return an empty string in case of an error
        }
    };

    // Replace placeholders in the template with evaluated values
    return template
        // Replace {{ expression }} with the evaluated value
        .replace(/{{\s*(.*?)\s*}}/g, (_, expression) => evaluate(expression))
        // Replace [attribute] = "{{ expression }}" with the evaluated attribute string
        .replace(/\[(\w+)\]\s*=\s*"{{\s*(.*?)\s*}}"/g, (_, attr, expression) => {
            const attrValue = evaluate(expression); // Evaluate the attribute expression
            return `${attr}="${attrValue}"`; // Return the attribute string
        });
}
