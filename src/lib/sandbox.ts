export interface SandboxCodeInput {
  html: string;
  css: string;
  js: string;
}

/**
 * Builds a safe HTML string for srcdoc execution in a sandboxed iframe.
 */
export function generateSandboxSrcDoc(input: SandboxCodeInput): string {
  const { html, css, js } = input;

  const scriptTag = js && js.trim() ? `
  <script>
    (function() {
      const _log = console.log;
      console.log = function(...args) {
        _log.apply(console, args);
      };
      
      try {
        ${js}
      } catch (err) {
        console.error('Runtime Error:', err.message);
      }
    })();
  </script>` : '';

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    /* Reset & Child Friendly Basic Styles */
    * {
      box-sizing: border-box;
    }
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: 1rem;
      color: #17233C;
      background-color: #ffffff;
      line-height: 1.5;
    }
    button {
      cursor: pointer;
      font-family: inherit;
    }
    /* User Custom CSS */
    ${css}
  </style>
  ${scriptTag}
</head>
<body>
  ${html}
</body>
</html>`;
}
