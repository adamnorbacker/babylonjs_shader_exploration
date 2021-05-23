import { Engine, Scene } from '@babylonjs/core';
import React, { useEffect, useRef } from 'react';

const SceneComponent = props => {
  const reactCanvas = useRef(null);
  const {
    antialias,
    engineOptions,
    adaptToDeviceRatio,
    sceneOptions,
    onRender,
    onSceneReady,
    ...rest
  } = props;

  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight - 40,
    width: window.innerWidth - 40,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        height: window.innerHeight - 40,
        width: window.innerWidth - 40,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  useEffect(() => {
    if (reactCanvas.current) {
      const engine = new Engine(
        reactCanvas.current,
        antialias,
        engineOptions,
        adaptToDeviceRatio,
      );
      const scene = new Scene(engine, sceneOptions);
      if (scene.isReady()) {
        props.onSceneReady(scene);
      } else {
        scene.onReadyObservable.addOnce(scene => props.onSceneReady(scene));
      }

      engine.runRenderLoop(() => {
        if (typeof onRender === 'function') {
          onRender(scene);
        }
        scene.render();
      });

      const resize = () => {
        scene.getEngine().resize();
      };

      if (window) {
        window.addEventListener('resize', resize);
      }

      return () => {
        scene.getEngine().dispose();

        if (window) {
          window.removeEventListener('resize', resize);
        }
      };
    }
  }, [reactCanvas]);

  return (
    <canvas
      height={dimensions.height}
      width={dimensions.width}
      ref={reactCanvas}
      {...rest}
    />
  );
};

export default SceneComponent;
