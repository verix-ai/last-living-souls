import * as ctx from 'colorthief';
const ColorThief = ctx.default || ctx;
ColorThief.getColor('logo.png').then(color => console.log('Primary Color RGB:', color)).catch(console.error);
ColorThief.getPalette('logo.png', 5).then(palette => console.log('Palette RGB:', palette)).catch(console.error);
