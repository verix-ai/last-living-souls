import Vibrant from 'node-vibrant';
import fs from 'fs';

Vibrant.from('logo.png').getPalette().then((palette) => {
  console.log("Vibrant Hex:", palette.Vibrant?.hex);
  console.log("DarkVibrant Hex:", palette.DarkVibrant?.hex);
  console.log("LightVibrant Hex:", palette.LightVibrant?.hex);
  console.log("Muted Hex:", palette.Muted?.hex);
  console.log("DarkMuted Hex:", palette.DarkMuted?.hex);
  console.log("LightMuted Hex:", palette.LightMuted?.hex);
}).catch(err => console.error(err));
