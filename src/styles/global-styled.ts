"use client"

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {
        --background: #ffffff;
        --foreground: #171717;
    }

    @media (prefers-color-scheme: dark) {
        :root {
            --background: #0a0a0a;
            --foreground: #ededed;
        }
    }

    html, body {
        max-width: 100vw;
        overflow-x: hidden;
        margin: 0;
    }

    body {
        display: flex;
        flex-direction: column;
        color: var(--foreground);
        background: var(--background);
        font-family: Arial, Helvetica, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    /* Estilo para o conteúdo principal */
    .main-content {
        flex-grow: 1; /* Isso permite que o conteúdo principal cresça */
        display: flex; /* Flex para organizar o conteúdo dentro dele */
        flex-direction: column; /* Para alinhar elementos em coluna, se necessário */
    }

    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    @media (prefers-color-scheme: dark) {
        html {
            color-scheme: dark;
        }
    }
`

export default GlobalStyle;
