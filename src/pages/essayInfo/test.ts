const textDemo = `<blockquote>11122</blockquote><p><br></p>`

const textDemo1 = `
<h1><u><em><code>hello world</code></em></u></h1><p><br></p><hr/><p><br></p><table style="width: auto;"><tbody><tr><th colSpan="1" rowSpan="1" width="auto"></th><th colSpan="1" rowSpan="1" width="auto"></th><th colSpan="1" rowSpan="1" width="auto"></th><th colSpan="1" rowSpan="1" width="auto"></th><th colSpan="1" rowSpan="1" width="auto"></th><th colSpan="1" rowSpan="1" width="auto"></th><th colSpan="1" rowSpan="1" width="auto"></th></tr><tr><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td></tr><tr><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td></tr><tr><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td></tr></tbody></table><p>👇</p><ul><li style="text-align: center; line-height: 1.15;"><span style="font-size: 13px; font-family: 标楷体;">模拟那我充电电池</span></li></ul><p><span style="color: rgb(225, 60, 57); background-color: rgb(0, 0, 0);"><sup><code>外设店</code></sup></span></p><blockquote>1</blockquote><p>😏😑</p><pre><code class="language-html">&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;link
      href="https://unpkg.com/@wangeditor/editor@latest/dist/css/style.css"
      rel="stylesheet"
    /&gt;
    &lt;style&gt;
      #editor—wrapper {
        border: 1px solid #ccc;
        z-index: 100; /* 按需定义 */
      }
      #toolbar-container {
        border-bottom: 1px solid #ccc;
      }
      #editor-container {
        height: 500px;
      }
    &lt;/style&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;div id="editor—wrapper"&gt;
      &lt;div id="toolbar-container"&gt;&lt;!-- 工具栏 --&gt;&lt;/div&gt;
      &lt;div id="editor-container"&gt;&lt;!-- 编辑器 --&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;script src="https://unpkg.com/@wangeditor/editor@latest/dist/index.js"&gt;&lt;/script&gt;
    &lt;script&gt;
      const { createEditor, createToolbar } = window.wangEditor;

      const editorConfig = {
        placeholder: "Type here...",
        onChange(editor) {
          const html = editor.getHtml();
          console.log("editor content", html);
          // 也可以同步到 &lt;textarea&gt;
        },
      };

      const editor = createEditor({
        selector: "#editor-container",
        html: "&lt;p&gt;&lt;br&gt;&lt;/p&gt;",
        config: editorConfig,
        mode: "default", // or 'simple'
      });

      const toolbarConfig = {};

      const toolbar = createToolbar({
        editor,
        selector: "#toolbar-container",
        config: toolbarConfig,
        mode: "default", // or 'simple'
      });
    &lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;
</code></pre><p><br></p>`

export {textDemo}