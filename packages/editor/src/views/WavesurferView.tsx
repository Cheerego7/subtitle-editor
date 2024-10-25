import type WaveSurfer from "wavesurfer.js";
import type { Regions } from "wavesurfer.js/dist/plugins/regions.esm.js";
import WavesurferPlayer from "@wavesurfer/react";
import React from "react";
import Minimap from "wavesurfer.js/dist/plugins/minimap.esm.js";

import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.esm.js";

export interface WavesurferInstances {
  readonly wavesurfer: WaveSurfer;
  readonly regions: Regions;
}

export interface WavesurferProps {
  readonly url?: string;
  readonly firstDecode?: (instances: WavesurferInstances) => void;
}

export const WavesurferView = (props: WavesurferProps) => {
  const { firstDecode, url } = props;
  const regions = React.useMemo(() => RegionsPlugin.create(), []);
  const onDecode = React.useCallback((wavesurfer: WaveSurfer) => {
    const instances: WavesurferInstances = { wavesurfer, regions };
    if (firstDecode) {
      // callback in wavesurfer never print errors
      // I need do it by myself
      try {
        firstDecode(instances);
      }
      catch (error) {
        console.error(error);
      }
    }
  }, [regions, firstDecode]);

  return (
    <WavesurferPlayer
      waveColor="rgb(200, 0, 200)"
      progressColor="rgb(100, 0, 100)"
      interact={false}
      url={url}
      onDecode={onDecode}
      plugins={[regions, ...createPlugins()]}
    />
  );
};

function createPlugins() {
  return [
    Minimap.create({
      height: 20,
      waveColor: "#ddd",
      progressColor: "#999",
    }),
  ];
}

export default WavesurferView;
