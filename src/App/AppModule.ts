import { Component } from '@glide-js/Component';
import { AppRouting } from "./AppRouting";

interface Component {
    init(): void;
}

export class AppModule {
    constructor() {
        AppRouting();
        this.initComponents();
    }

    private initComponents(): void {
        const modules: Component[] = [
            // Components are defined here
            // Example: new Component(),
        ];
    
        modules.forEach((module) => {
            module.init();
        });
    }
}
