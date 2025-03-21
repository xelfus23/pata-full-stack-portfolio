// components/CodeWithColors.tsx
"use client";
import React, { JSX } from "react";

interface CodeWithColorsProps {
    code: string;
}

const CodeWithColors: React.FC<CodeWithColorsProps> = ({ code }) => {
    const renderColoredCode = () => {
        const output: JSX.Element[] = [];
        let i = 0;

        while (i < code.length) {
            const char = code[i];

            if (char === "<") {
                // Handle tags
                const tagStart = i;
                let tagEnd = -1;
                for (let j = i + 1; j < code.length; j++) {
                    if (code[j] === ">") {
                        tagEnd = j;
                        break;
                    }
                }

                if (tagEnd === -1) {
                    // Unclosed tag
                    output.push(createSpan(code.substring(i), ""));
                    break;
                }

                const tag = code.substring(tagStart, tagEnd + 1);

                // Regex for HTML elements (including closing tags)
                const htmlElementRegex =
                    /^<(nav|div|span|a|img|ul|li|ol|header|footer|article|section)(?=[>\s/])/i;
                const htmlClosingElementRegex =
                    /^<\/(nav|div|span|a|img|ul|li|ol|header|footer|article|section)>/i; //Regex for closing tags

                // Regex for React components (capitalized)
                const reactComponentRegex = /^<[A-Z][a-zA-Z0-9]*\s|\/>/;
                const reactComponentClosingRegex = /^<\/[A-Z][a-zA-Z0-9]*>/; //Regex for closing react component tags

                if (htmlElementRegex.test(tag)) {
                    const match = tag.match(htmlElementRegex);
                    const elementName = match ? match[1] : "";

                    output.push(createSpan("<", ""));
                    output.push(createSpan(elementName, "text-green-400"));

                    const restOfTag = tag.substring(elementName.length + 1);
                    output.push(createSpan(restOfTag, ""));
                } else if (htmlClosingElementRegex.test(tag)) {
                    //Handle closing tags
                    const match = tag.match(htmlClosingElementRegex);
                    const elementName = match ? match[1] : "";

                    output.push(createSpan("</", ""));
                    output.push(createSpan(elementName, "text-green-400"));

                    const restOfTag = tag.substring(elementName.length + 2); //+2 to remove the </>
                    output.push(createSpan(restOfTag, ""));
                } else if (reactComponentRegex.test(tag)) {
                    //It checks if there's a space after the component name or if it's a self-closing tag (/>).

                    const componentNameMatch = tag.match(
                        /^<([A-Z][a-zA-Z0-9]*)/
                    ); // Get the component name from the tag
                    const componentName = componentNameMatch
                        ? componentNameMatch[1]
                        : "";

                    output.push(createSpan("<", ""));
                    output.push(createSpan(componentName, "text-yellow-400"));

                    const restOfTag = tag.substring(componentName.length + 1);
                    output.push(createSpan(restOfTag, ""));
                } else if (reactComponentClosingRegex.test(tag)) {
                    //Handle closing react component tags
                    const componentNameMatch = tag.match(
                        /^<\/([A-Z][a-zA-Z0-9]*)/
                    ); // Get the component name from the tag
                    const componentName = componentNameMatch
                        ? componentNameMatch[1]
                        : "";

                    output.push(createSpan("</", ""));
                    output.push(createSpan(componentName, "text-yellow-400"));

                    const restOfTag = tag.substring(componentName.length + 2);
                    output.push(createSpan(restOfTag, ""));
                } else {
                    output.push(createSpan(tag, ""));
                }
                i = tagEnd + 1;
            } else if (code.substring(i, i + 11) === 'className="') {
                // Handle className attributes with double quotes
                const classNameStart = i + 11;
                let classNameEnd = -1;
                for (let j = classNameStart; j < code.length; j++) {
                    if (code[j] === '"') {
                        classNameEnd = j;
                        break;
                    }
                }

                if (classNameEnd === -1) {
                    output.push(createSpan(code.substring(i), "")); // Unclosed className
                    break;
                }

                const classNameValue = code.substring(
                    classNameStart,
                    classNameEnd
                );
                output.push(createSpan("className=", ""));
                output.push(createSpan('"', "text-blue-400"));
                output.push(createSpan(classNameValue, "text-blue-400"));
                output.push(createSpan('"', "text-blue-400"));
                i = classNameEnd + 1;
            } else if (code.substring(i, i + 11) === "className='") {
                // Handle className attributes with single quotes
                const classNameStart = i + 11;
                let classNameEnd = -1;
                for (let j = classNameStart; j < code.length; j++) {
                    if (code[j] === "'") {
                        classNameEnd = j;
                        break;
                    }
                }

                if (classNameEnd === -1) {
                    output.push(createSpan(code.substring(i), "")); // Unclosed className
                    break;
                }

                const classNameValue = code.substring(
                    classNameStart,
                    classNameEnd
                );
                output.push(createSpan("className=", ""));
                output.push(createSpan("'", "text-blue-400"));
                output.push(createSpan(classNameValue, "text-blue-400"));
                output.push(createSpan("'", "text-blue-400"));
                i = classNameEnd + 1;
            } else if (code.substring(i, i + 11) === "className={`") {
                // Handle className attributes with backticks
                const classNameStart = i + 11;
                let classNameEnd = -1;
                for (let j = classNameStart; j < code.length; j++) {
                    if (code[j] === "`") {
                        classNameEnd = j;
                        break;
                    }
                }

                if (classNameEnd === -1) {
                    output.push(createSpan(code.substring(i), "")); // Unclosed className
                    break;
                }

                const classNameValue = code.substring(
                    classNameStart,
                    classNameEnd
                );
                output.push(createSpan("className=", ""));
                output.push(createSpan("`", "text-blue-400"));
                output.push(createSpan(classNameValue, "text-blue-400"));
                output.push(createSpan("`", "text-blue-400"));
                i = classNameEnd + 1;
            } else if (char === '"' || char === "'" || char === "`") {
                // Handle strings
                const stringStart = i;
                let stringEnd = -1;
                for (let j = i + 1; j < code.length; j++) {
                    if (code[j] === char) {
                        stringEnd = j;
                        break;
                    }
                }

                if (stringEnd === -1) {
                    // Unclosed string
                    output.push(createSpan(code.substring(i), "text-blue-400"));
                    break;
                }

                const string = code.substring(stringStart, stringEnd + 1);
                output.push(createSpan(string, "text-blue-400"));
                i = stringEnd + 1;
            } else {
                // Handle normal characters
                output.push(createSpan(char, ""));
                i++;
            }
        }

        return output;
    };

    const createSpan = (text: string, className: string): JSX.Element => {
        return (
            <span key={text + Math.random()} className={className}>
                {text}
            </span>
        );
    };

    return (
        <pre className="border-secondary/20 border-1 p-4 rounded-md overflow-x-auto">
            <code>{renderColoredCode()}</code>
        </pre>
    );
};

export default CodeWithColors;
