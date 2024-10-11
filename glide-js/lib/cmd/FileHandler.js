const fs = require('fs');
const path = require('path');

/**
 * Generates a TypeScript file based on the provided type and arguments.
 *
 * @param {string} type - The type of the file to create (e.g., 'Component', 'Page').
 * @param {any} args - The path (with or without the filename) where the file should be generated.
 *   This path is relative to the 'src' directory.
 */
function generateFile(type, args) {
    // Define the base directory as 'src'
    const baseDirectory = 'src';

    // Remove the last segment (filename) and get the directory path
    const dirPath = path.dirname(args);

    // Extract the last segment of the path to use as the filename
    const lastSegment = path.basename(args);

    // Ensure the directory exists; create it if it does not
    const dir = path.join(baseDirectory, dirPath);
    fs.mkdirSync(dir, { recursive: true });

    // Create the full file path with .ts extension
    const fileName = `${lastSegment}${type}.ts`;
    const fullPath = path.join(process.cwd(), baseDirectory, dirPath, fileName);

    // Define the content of the file separately
    const fileContent = generateFileContent(type, lastSegment);

    // Create the file and write the generated content into it
    fs.writeFileSync(fullPath, fileContent);

    console.log(`${type} successfully generated!`);
}

/**
 * Generates the content of the TypeScript file based on the specified type and class name.
 *
 * @param {string} type - The type of the file (e.g., 'Component', 'Page').
 * @param {string} className - The base name of the class, derived from the last segment of the path.
 * @returns {string} The generated content for the TypeScript file, including imports and the class definition.
 */
function generateFileContent(type, className) {
    return `
import { ${type} } from '@glide-js/${type}';

export class ${className}${type} {
    init(): void {
        ${type}({
            ${type === 'Component' ? `selector: "${className.toLowerCase()}-${type.toLowerCase()}",\n            ` : ''.trim()}template: \`
                <div>This is a ${type}</div>
            \`,
            contextSource: this
        });
    }
}
    `.trim();
}

module.exports = { generateFile };
