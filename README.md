# GlideJS [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](glide-js/LICENSE) ![Version](https://img.shields.io/badge/version-1.0.0-brightgreen.svg) ![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-green.svg) ![Babel](https://img.shields.io/badge/Babel-7.25.7-yellowgreen.svg) ![Sass](https://img.shields.io/badge/Sass-1.79.4-ff69b4.svg)

## Table of Contents
1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
   - [Installation](#installation)
   - [Creating Your First Project](#creating-your-first-project)
3. [Core Features](#core-features)
   - [Page and Component System](#page-and-component-system)
   - [Routing](#routing)
   - [SCSS/SASS Support](#scsssass-support)
4. [Commands](#commands)
5. [Example Usage](#example-usage)
6. [Contributing](#contributing)
7. [License](#license)

## Introduction
**GlideJS** is a lightweight framework designed to help developers create static websites easily. It combines modern JavaScript features with SCSS/SASS support, allowing for streamlined development and beautiful styling.

## Getting Started

### Pulling the Repository
To get started with **GlideJS**, fork the repository from GitHub:

```bash
https://github.com/yourusername/glide-js.git
```

### Initializing Your First Project
Once you've forked the repository, you can clone it to your local machine, rename the root folder, and begin exploring the project. 

Be sure to run `npm install` to set up the necessary dependencies.

**Note**: `glide-js` folder contains essential APIs, including the **Router**, **Component**, and **Page**, along with the framework’s main **index.js** file.

```bash
<root folder>
├── node_modules
├── src 
│ ├── App 
│ │ ├── App.scss 
│ │ ├── App.ts 
│ │ ├── AppModule.ts 
│ │ └── AppRouting.ts 
│ ├── favicon.ico 
│ ├── index.html 
│ ├── scripts.ts 
│ └── styles.scss 
├── glide-js // API library
├── .babelrc 
├── .gitignore 
├── package-lock.json 
├── package.json 
└── tsconfig.json
└── webpack.config.js
```

## Core Features

### Page and Component System
**GlideJS** allows you to generate new pages and components that can be dynamically rendered on your static site, with built-in support for templating.

```javascript
import { Component } from '@glide-js/Component';

export class NavbarComponent {
    init(): void {
        Component({
            selector: "navbar-component",
            template: `
                <ul class="navbar">
                    <li class="nav-items">
                        <a href="/">Home</a>
                    </li>
                    <li class="nav-items">
                        <a href="/about">About</a>
                    </li>
                    <li class="nav-items">
                        <a href="/projects">Projects</a>
                    </li>
                </div>
            `,
            contextSource: this
        });
    }
}
```

It also allows you to specify multiple components in the same template, as well as dynamic binding.
```javascript
import { Page } from '@glide-js/Page'

export class App {
    age: int = 24;

    init(): void {
        Page({
            template: `
                <p>Hi, I'm {{ name }} years old</p>
            `,
            contextSource: this
        });
    }
}
```

### Routing
Manage your site’s navigation with a simple routing system.

```javascript
import { Router } from '@glide-js/Router';
import { App } from './App';

export function AppRouting(): void {
    Router.register([
        { path: '/', component: App },
    ]);
}
```

### SCSS/SASS Support
Write your styles using SCSS/SASS for better organization and maintainability.

```scss
$primary-color: blue;

body {
    background-color: $primary-color;
}
```

## Commands
**GlideJS** provides commands to facilitate your development workflow:

- `gl run dev`: Start a development server.
- `gl run prod`: Start a production server.
- `gl generate page <name>`: Generate a new page.
- `gl generate component <name>`: Generate a new component.
- `gl build`: Build your static site for production.

## Example Usage
Here’s a simple example to illustrate how to create a component and use it in a page.

```javascript
import { Page } from '@glide-js/Page'

export class App {
    name: string = 'John Smith'

    init(): void {
        Page({
            template: `
                <navbar-component></navbar-component>
                <div>
                    <p>Hi, I'm {{ name }}</p>
                </div>
                <footer-component></footer-component>
            `,
            contextSource: this
        });
    }
}
```

## Contributing
We welcome contributions to **GlideJS**! Please email me at [dev.simongranil@gmail.com](https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=dev.simongranil@gmail.com) for guidelines on how to contribute.

## License
**GlideJS** is licensed under the [MIT License](glide-js/LICENSE).
