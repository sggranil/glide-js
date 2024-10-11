import { Page } from '@glide-js/Page';
import './App.scss';

export class App {
    init(): void {
        Page({
            template: `
                <div class="app-container">
                    <div class="message">
                        <h1>GlideJS is Running!</h1>
                        <p>Your application is running at:</p>
                        <h2><a href="http://localhost:9000" target="_blank">http://localhost:9000</a></h2>
                    </div>
                </div>
            `,
            contextSource: this
        });
    }
}