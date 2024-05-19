// ------------- global imports -------------
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { TextBlock, Control, Container, Rectangle, AdvancedDynamicTexture, Button } from "@babylonjs/gui/2D";
import { DepthOfFieldEffectBlurLevel, DefaultRenderingPipeline, Material, DefaultLoadingScreen, Quaternion, Tools, WebGPUEngine, Matrix, HighlightLayer, BoxParticleEmitter, NoiseProceduralTexture, DirectionalLight, AbstractMesh, PointLight, Camera, VolumetricLightScatteringPostProcess, SphereParticleEmitter, Color4, Constants, ParticleHelper, ParticleSystemSet, TransformNode, ParticleSystem, Engine, Scene, ArcRotateCamera, FreeCamera, Vector3, HemisphericLight, Mesh, MeshBuilder, InstancedMesh, StandardMaterial, Texture, Vector2, Vector4 , Color3, SceneLoader, AssetsManager, ArcRotateCameraPointersInput, CubeTexture, RegisterMaterialPlugin, MaterialPluginBase, PostProcess, PassPostProcess, Effect, ShaderMaterial, RenderTargetTexture } from "@babylonjs/core";
// ----------- global imports end -----------

export class MouseSelectionBox {
    public createMouseSelectionBox(scene: Scene, advancedTexture: AdvancedDynamicTexture) {
        let selectionRectangle = new Rectangle();
        selectionRectangle.width = "40px";
        selectionRectangle.height = "40px";
        selectionRectangle.color = "#00ff0000";
        selectionRectangle.thickness = 3;
        advancedTexture.addControl(selectionRectangle);
        
        let lastPointerPositionX = -1000000;
        let lastPointerPositionY = -1000000;
        
        scene.onPointerObservable.add((eventData) => {
            const mousePosX = scene.pointerX - window.innerWidth / 2.0;
            const mousePosY = scene.pointerY - window.innerHeight / 2.0;
            
            if (eventData.type === PointerEventTypes.POINTERDOWN && eventData.event.button == 0) {
                lastPointerPositionX = mousePosX;
                lastPointerPositionY = mousePosY;
            } else if (eventData.type === PointerEventTypes.POINTERMOVE) {
                if (lastPointerPositionX != -1000000 && lastPointerPositionY != -1000000) {
                    const minX = Math.min(lastPointerPositionX, mousePosX);
                    const minY = Math.min(lastPointerPositionY, mousePosY);
                    const maxX = Math.max(lastPointerPositionX, mousePosX);
                    const maxY = Math.max(lastPointerPositionY, mousePosY);
                    
                    selectionRectangle.color = "#00ff00ff";
                    selectionRectangle.left = `${minX + (maxX - minX) / 2.0}px`;
                    selectionRectangle.top = `${minY + (maxY - minY) / 2.0}px`;
                    selectionRectangle.width = `${maxX - minX}px`;
                    selectionRectangle.height = `${maxY - minY}px;`;
                }
            } else if (eventData.type === PointerEventTypes.POINTERUP && eventData.event.button == 0) {
                if (lastPointerPositionX != -1000000 && lastPointerPositionY != -1000000) {
                    // TODO: determine affected meshes
                    
                    /*// set endPointerPosition with pointer up event
                    const endPointerPosition = { x: mousePosX, y: mousePosY }
                    // select spheres using array filter method
                    const selectedSpheres = spheres.filter((sphere) => isTargetIn(lastPointerPosition, endPointerPosition, sphere.getAbsolutePosition(), camera))
                    
                    // initialize lastPointerPosition with null
                    lastPointerPosition = defaultPointerPosition;
                    // initialize dragBox's style with default one wich doesn't include width and height
                    dragBox.style = defStyle;
                    
                    // log selected spheres
                    console.log('selectedSpheres: ', selectedSpheres)
                    // alert with selected spheres counts
                    alert(`${selectedSpheres.length} ${selectedSpheres.length > 1 ? 'spheres are' : 'sphere is'} selected!`)*/
                }
                
                selectionRectangle.color = "#00ff0000";
                lastPointerPositionX = -1000000;
                lastPointerPositionY = -1000000;
            }
        })
    }
}