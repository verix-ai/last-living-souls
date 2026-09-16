const Vibrant = require('node-vibrant');
Vibrant.from('logo.png').getPalette().then(p => {
    console.log('Vibrant:', p.Vibrant ? p.Vibrant.hex : null);
    console.log('DarkVibrant:', p.DarkVibrant ? p.DarkVibrant.hex : null);
    console.log('LightVibrant:', p.LightVibrant ? p.LightVibrant.hex : null);
    console.log('Muted:', p.Muted ? p.Muted.hex : null);
    console.log('DarkMuted:', p.DarkMuted ? p.DarkMuted.hex : null);
    console.log('LightMuted:', p.LightMuted ? p.LightMuted.hex : null);
}).catch(console.error);
