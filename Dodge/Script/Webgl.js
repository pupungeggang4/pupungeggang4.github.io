const vSource = `#version 300 es
    uniform vec2 u_translate;
    uniform vec2 u_scale;
    in vec4 a_position;
    in vec2 a_texcoord;
    out vec3 p_color;
    out vec2 p_texcoord;

    void main() {
        mat4 m_translate = mat4(
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            u_translate.x, u_translate.y, 0.0, 1.0
        );
        mat4 m_scale = mat4(
            u_scale.x, 0.0, 0.0, 0.0,
            0.0, u_scale.y, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0
        );
        mat4 m_proj = mat4(
            2.0 / (1280.0 - 0.0), 0.0, 0.0, 0.0,
            0.0, 2.0 / (0.0 - 800.0), 0.0, 0.0,
            0.0, 0.0, -2.0 / (1.0 + 1.0), 0.0,
            -(1280.0 + 0.0) / (1280.0 - 0.0), -(0.0 + 800.0) / (0.0 - 800.0), -(0.0) / (2.0), 1.0
        );
        vec4 pos = a_position;
        pos = m_scale * pos;
        pos = m_translate * pos;
        pos = m_proj * pos;
        gl_Position = pos;
        p_texcoord = a_texcoord;
    }
`

const fSource = `#version 300 es
    precision highp float;
    uniform int u_mode;
    uniform vec3 u_color;
    uniform sampler2D t_sampler;
    in vec2 p_texcoord;
    out vec4 o_color;

    void main() {
        if (u_mode == 0) {
            o_color = vec4(u_color, 1.0);
        } else {
            o_color = texture(t_sampler, p_texcoord); 
        }
    }
`

function glInit() {
    vShader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vShader, vSource)
    gl.compileShader(vShader)
    fShader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fShader, fSource)
    gl.compileShader(fShader)
    program = gl.createProgram()
    gl.attachShader(program, vShader)
    gl.attachShader(program, fShader)
    gl.linkProgram(program)

    luColor = gl.getUniformLocation(program, "u_color")
    luTranslate = gl.getUniformLocation(program, "u_translate")
    luScale = gl.getUniformLocation(program, "u_scale")
    luMode = gl.getUniformLocation(program, "u_mode")
    laPosition = gl.getAttribLocation(program, "a_position")
    laTexcoord = gl.getAttribLocation(program, "a_texcoord")
   
    gt = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, gt)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)

    vao = gl.createVertexArray()
    vbo = gl.createBuffer(gl.ARRAY_BUFFER)
    bt = gl.createBuffer(gl.ARRAY_BUFFER)

    gl.bindVertexArray(vao)
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        0.5, -0.5, 1.0, 0.0,
        0.5, 0.5, 1.0, 1.0,
        -0.5, -0.5, 0.0, 0.0,
        -0.5, -0.5, 0.0, 0.0,
        0.5, 0.5, 1.0, 1.0,
        -0.5, 0.5, 0.0, 1.0
    ]), gl.STATIC_DRAW)
    gl.vertexAttribPointer(laPosition, 2, gl.FLOAT, false, 4 * 4, 0)
    gl.enableVertexAttribArray(laPosition)
    gl.vertexAttribPointer(laTexcoord, 2, gl.FLOAT, false, 4 * 4, 2 * 4)
    gl.enableVertexAttribArray(laTexcoord)
}
