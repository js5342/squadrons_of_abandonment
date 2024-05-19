# Run this script to replace the import statements in all TypeScript files.
from pathlib import Path


gui_imports = """AdvancedDynamicTexture,
Button,
Container,
Control,
Rectangle,
TextBlock,"""
core_imports = """AbstractMesh,
ArcRotateCamera,
ArcRotateCameraPointersInput,
AssetsManager,
BoxParticleEmitter,
Camera,
Color3,
Color4,
ColorCurves,
Constants,
CubeTexture,
DefaultLoadingScreen,
DefaultRenderingPipeline,
DepthOfFieldEffectBlurLevel,
DirectionalLight,
Effect,
Engine,
FreeCamera,
HemisphericLight,
HighlightLayer,
InstancedMesh,
LensFlare,
LensFlareSystem,
Material,
MaterialPluginBase,
Matrix,
Mesh,
MeshBuilder,
NoiseProceduralTexture,
ParticleHelper,
ParticleSystem,
ParticleSystemSet,
PassPostProcess,
PointLight,
PointerEventTypes,
PostProcess,
Quaternion,
RegisterMaterialPlugin,
RenderTargetTexture,
Scene,
SceneLoader,
ShaderMaterial,
SphereParticleEmitter,
StandardMaterial,
Texture,
Tools,
TransformNode,
UniversalCamera,
Vector2,
Vector3,
Vector4,
VertexBuffer,
VertexData,
VolumetricLightScatteringPostProcess,
WebGPUEngine,"""

typescript_directories = [Path("..") / "src"]
file_extension = ".ts"
preamble = "// ------------- global imports -------------"
postamble = "// ----------- global imports end -----------"
content = """
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import {
%%%GUI_IMPORTS%%%
} from "@babylonjs/gui/2D";
import {
%%%CORE_IMPORTS%%%
} from "@babylonjs/core";
"""

def replace_between_strings_in_string(text: str, preamble: str, postamble: str, replacement: str) -> str | None:
    try:
        preamble_index = text.index(preamble)
        postamble_index = text.index(postamble)
    except ValueError as e:
        return None
    ret_str = text[: preamble_index + len(preamble)] + replacement + text[postamble_index :]
    return ret_str

all_file_paths = []
for d in typescript_directories:
    all_file_paths += [f for f in d.iterdir() if f.is_file() and f.suffix == file_extension]
for path in all_file_paths:
    file_path = path.resolve()
    with open(file_path, "w+") as f:
        ts_content = f.read()
        replacement = preamble + content + postamble
        replacement = replacement.replace("%%%GUI_IMPORTS%%%", gui_imports).replace("%%%CORE_IMPORTS%%%", core_imports)
        ts_content_new = replace_between_strings_in_string(ts_content, preamble, postamble, replacement)
        if ts_content_new is not None:
            print(ts_content_new + "\n\n\n\n\n\n\n\n")