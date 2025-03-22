window.addEventListener('load', load, false)

const header = `
    <div><a href ="/">Pupungeggang4's Blog</a></div>
    <div>
        <a href="/WebGL-Playground/Dodge/">Dodge</a>
        <a href="/Blog/BlogMain.html">Blog</a>
        <a href="/Projects/ProjectMain.html">Projects</a>
    </div>
`

function load() {
    document.getElementById('header').innerHTML = header
    eruda.init()
}
