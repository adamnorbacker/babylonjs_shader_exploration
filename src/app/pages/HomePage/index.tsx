import React, { FunctionComponent } from 'react';
import {
  SceneLoader,
  CubeTexture,
  Vector3,
  UniversalCamera,
  ShadowGenerator,
  PointLight,
} from '@babylonjs/core';
import '@babylonjs/loaders';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import SceneComponent from './SceneComponent';

const BabylonjsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: block;
`;

const onSceneReady = scene => {
  const hdrTexture = CubeTexture.CreateFromPrefilteredData(
    'assets/environment.env',
    scene,
  );
  scene.environmentTexture = hdrTexture;

  const canvas = scene.getEngine().getRenderingCanvas();

  const camera = new UniversalCamera(
    'UniversalCamera',
    new Vector3(10, 2, 0),
    scene,
  );

  camera.setTarget(Vector3.Zero());

  camera.inputs.addMouseWheel();

  camera.attachControl(canvas, true);

  const light = new PointLight('light', new Vector3(0, 2, 0), scene);

  light.intensity = 50;

  const shadowGenerator = new ShadowGenerator(1024, light);
  shadowGenerator.usePoissonSampling = true;
  shadowGenerator.setDarkness(0);

  SceneLoader.Append('/assets/', 'Sponza.glb', scene, function (scene) {
    console.log('scene', scene.meshes);
    scene.meshes.forEach(mesh => {
      shadowGenerator?.getShadowMap()?.renderList?.push(mesh);
      mesh.receiveShadows = true;
    });
    scene.environmentIntensity = 0.1;
  });
};

export const HomePage: FunctionComponent = () => {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <BabylonjsContainer>
        <SceneComponent antialias onSceneReady={onSceneReady} id="my-canvas" />
      </BabylonjsContainer>
    </>
  );
};
