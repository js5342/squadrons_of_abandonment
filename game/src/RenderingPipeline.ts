// ------------- global imports -------------
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { TextBlock, Control, Container, Rectangle, AdvancedDynamicTexture, Button } from "@babylonjs/gui/2D";
import { DepthOfFieldEffectBlurLevel, DefaultRenderingPipeline, Material, DefaultLoadingScreen, Quaternion, Tools, WebGPUEngine, Matrix, HighlightLayer, BoxParticleEmitter, NoiseProceduralTexture, DirectionalLight, AbstractMesh, PointLight, Camera, VolumetricLightScatteringPostProcess, SphereParticleEmitter, Color4, Constants, ParticleHelper, ParticleSystemSet, TransformNode, ParticleSystem, Engine, Scene, ArcRotateCamera, FreeCamera, Vector3, HemisphericLight, Mesh, MeshBuilder, InstancedMesh, StandardMaterial, Texture, Vector2, Vector4 , Color3, SceneLoader, AssetsManager, ArcRotateCameraPointersInput, CubeTexture, RegisterMaterialPlugin, MaterialPluginBase, PostProcess, PassPostProcess, Effect, ShaderMaterial, RenderTargetTexture } from "@babylonjs/core";
// ----------- global imports end -----------

export class RenderingPipeline {
    public constructor(scene: Scene, mainCamera: Camera) {
        // https://doc.babylonjs.com/api/classes/babylon.defaultrenderingpipeline
        let defaultPipeline = new DefaultRenderingPipeline(
            "DefaultRenderingPipeline",
            false, // is HDR?
            scene,
            [mainCamera]
        );
        if (defaultPipeline.isSupported) {
            /* MSAA */
            defaultPipeline.samples = 9; // 1 by default
            /* imageProcessing */
            defaultPipeline.imageProcessingEnabled = false; //true by default
            if (defaultPipeline.imageProcessingEnabled) {
                defaultPipeline.imageProcessing.contrast = 1; // 1 by default
                defaultPipeline.imageProcessing.exposure = 1; // 1 by default
                /* color grading */
                //defaultPipeline.imageProcessing.colorGradingEnabled = false; // false by default
                //if (defaultPipeline.imageProcessing.colorGradingEnabled) {
                //    // using .3dl (best) :
                //    defaultPipeline.imageProcessing.colorGradingTexture = new BABYLON.ColorGradingTexture("textures/LateSunset.3dl", scene);
                //    // using .png :
                //    /*
                //    let colorGradingTexture = new BABYLON.Texture("textures/colorGrade-highContrast.png", scene, true, false);
                //    colorGradingTexture.wrapU = BABYLON.Texture.CLAMP_ADDRESSMODE;
                //    colorGradingTexture.wrapV = BABYLON.Texture.CLAMP_ADDRESSMODE;                
                //    defaultPipeline.imageProcessing.colorGradingTexture = colorGradingTexture;
                //    defaultPipeline.imageProcessing.colorGradingWithGreenDepth = false;
                //    */
                //}
                /* color curves */
                defaultPipeline.imageProcessing.colorCurvesEnabled = false; // false by default
                if (defaultPipeline.imageProcessing.colorCurvesEnabled) {
                    let curve = new ColorCurves();
                    curve.globalDensity = 0; // 0 by default
                    curve.globalExposure = 0; // 0 by default
                    curve.globalHue = 30; // 30 by default
                    curve.globalSaturation = 0; // 0 by default
                    curve.highlightsDensity = 0; // 0 by default
                    curve.highlightsExposure = 0; // 0 by default
                    curve.highlightsHue = 30; // 30 by default
                    curve.highlightsSaturation = 0; // 0 by default
                    curve.midtonesDensity = 0; // 0 by default
                    curve.midtonesExposure = 0; // 0 by default
                    curve.midtonesHue = 30; // 30 by default
                    curve.midtonesSaturation = 0; // 0 by default
                    curve.shadowsDensity = 0; // 0 by default
                    curve.shadowsExposure = 0; // 0 by default
                    curve.shadowsHue = 30; // 30 by default
                    curve.shadowsDensity = 80;
                    curve.shadowsSaturation = 0; // 0 by default;
                    defaultPipeline.imageProcessing.colorCurves = curve;
                }
            }
            /* bloom */
            defaultPipeline.bloomEnabled = true; // false by default
            if (defaultPipeline.bloomEnabled) {
                defaultPipeline.bloomKernel = 64; // 64 by default
                defaultPipeline.bloomScale = 0.5; // 0.5 by default
                defaultPipeline.bloomThreshold = 0.8; // 0.9 by default
                defaultPipeline.bloomWeight = 0.3; // 0.15 by default
            }
            /* chromatic abberation */
            defaultPipeline.chromaticAberrationEnabled = false; // enable for explosions
            if (defaultPipeline.chromaticAberrationEnabled) {
                defaultPipeline.chromaticAberration.aberrationAmount = 3000; // 30 by default
                defaultPipeline.chromaticAberration.adaptScaleToCurrentViewport = true; // false by default
                defaultPipeline.chromaticAberration.alphaMode = 0; // 0 by default
                defaultPipeline.chromaticAberration.alwaysForcePOT = true; // false by default
                defaultPipeline.chromaticAberration.enablePixelPerfectMode = false; // false by default
                defaultPipeline.chromaticAberration.forceFullscreenViewport = true; // true by default
                defaultPipeline.chromaticAberration.radialIntensity = 3;
                let rotation = Math.PI;
                defaultPipeline.chromaticAberration.direction.x = Math.sin(rotation)
                defaultPipeline.chromaticAberration.direction.y = Math.cos(rotation)
            }
            /* DOF */
            defaultPipeline.depthOfFieldEnabled = false; // false by default
            if (defaultPipeline.depthOfFieldEnabled && defaultPipeline.depthOfField.isSupported) {
                defaultPipeline.depthOfFieldBlurLevel = 0; // 0 by default
                defaultPipeline.depthOfField.fStop = 1.4; // 1.4 by default
                defaultPipeline.depthOfField.focalLength = 50; // 50 by default, mm
                defaultPipeline.depthOfField.focusDistance = 2000; // 2000 by default, mm
                defaultPipeline.depthOfField.lensSize = 50; // 50 by default
            }
            /* FXAA */
            defaultPipeline.fxaaEnabled = true; // false by default
            if (defaultPipeline.fxaaEnabled) {
                defaultPipeline.fxaa.samples = 4; // 1 by default
                defaultPipeline.fxaa.adaptScaleToCurrentViewport = true; // false by default
            }
            /* glowLayer */
            defaultPipeline.glowLayerEnabled = false;
            if (defaultPipeline.glowLayerEnabled && defaultPipeline.glowLayer != null) {
                defaultPipeline.glowLayer.blurKernelSize = 16; // 16 by default
                defaultPipeline.glowLayer.intensity = 1; // 1 by default
            }
            /* grain */
            defaultPipeline.grainEnabled = true;
            if (defaultPipeline.grainEnabled) {
                defaultPipeline.grain.adaptScaleToCurrentViewport = false; // false by default
                defaultPipeline.grain.animated = false; // false by default
                defaultPipeline.grain.intensity = 30; // 30 by default
            }
            /* sharpen */
            defaultPipeline.sharpenEnabled = false; // enable for explosions
            if (defaultPipeline.sharpenEnabled) {
                defaultPipeline.sharpen.adaptScaleToCurrentViewport = false; // false by default
                defaultPipeline.sharpen.edgeAmount = 0.6; // 0.3 by default
                defaultPipeline.sharpen.colorAmount = 0.1; // 1 by default
            }
        }
    }
}