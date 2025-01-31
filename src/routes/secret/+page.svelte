<script lang="ts">
  import * as Three from 'three';
  import * as SC from 'svelte-cubed';

  let spin = $state(0);
  SC.onFrame(() => {
    spin += 0.01;
  })
</script>

<SC.Canvas 
  antialias 
  background={new Three.Color('spin')}
  fog={new Three.FogExp2('papayawhip', 0.1)}
  shadows
>
  <SC.Mesh 
    geometry={new Three.TubeGeometry()} 
    rotation={[0, spin, 0]}
  />
  <SC.PerspectiveCamera position={[1, 1, 5]} />
  <SC.OrbitControls enableZoom={false} maxPolarAngle={Math.PI * 0.51}/>
</SC.Canvas>