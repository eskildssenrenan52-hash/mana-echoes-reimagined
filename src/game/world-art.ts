import objects from '@/assets/ai-world-objects.png';
import terrain from '@/assets/ai-terrain.jpg';
import characters from '@/assets/ai-characters-buildings.png';
import { T, TS, BIOME_LIST, hash } from './world';
import { BUILDINGS } from './exploration';
import type { Game } from './engine';

export class WorldArt {
  canopy = new Image();
  terrain = new Image();
  people = new Image();
  constructor() { this.canopy.src = objects; this.terrain.src = terrain; this.people.src = characters; }
  ground(c:CanvasRenderingContext2D,t:number,tx:number,ty:number,clock:number,biome:number) {
    if(!this.terrain.complete || !this.terrain.naturalWidth)return false;
    const cells:Record<number,number> = {[T.GRASS]:0,[T.FLOWER]:1,[T.PATH]:2,[T.WATER]:3,[T.SAND]:4,[T.DUNE]:4,[T.SNOW]:5,[T.CAVE]:6,[T.COBBLE]:7,[T.AUTUMN]:8,[T.MOSS]:9,[T.ASH]:10,[T.MEADOW]:1,[T.RUINS]:14,[T.ICE]:15};
    let cell = cells[t]; if(cell===undefined)return false;
    const b=BIOME_LIST[biome];
    if([T.GRASS,T.FLOWER,T.MEADOW,T.MOSS].includes(t as 0)) {if(b==='cherry')cell=12;else if(b==='enchanted'||b==='mushroom')cell=11;}
    const size=this.terrain.naturalWidth/4;
    const offset=Math.floor(hash(tx,ty,5)*3)*size/4;
    c.drawImage(this.terrain,(cell%4)*size+offset,Math.floor(cell/4)*size+offset,size/4,size/4,tx*TS,ty*TS,TS,TS);
    if(t===T.WATER){c.save();c.globalAlpha=.22;c.drawImage(this.terrain,3*size,0,size,size,tx*TS+Math.sin(clock+ty)*.8,ty*TS,TS,TS);c.restore();}
    return true;
  }
  tree(c:CanvasRenderingContext2D,t:number,tx:number,ty:number,clock:number,biome=0){
    const image=this.canopy;if(!image.complete||!image.naturalWidth)return;
    let cell=t===T.AUTUMN_TREE?1:t===T.PALM?3:t===T.PINE?7:t===T.MUSHROOM?4:t===T.CRYSTAL?2:0;
    if(BIOME_LIST[biome]==='cherry'&&t===T.AUTUMN_TREE)cell=6;
    const sw=image.naturalWidth/4,sh=image.naturalHeight/2;
    const size=t===T.CRYSTAL?26:t===T.MUSHROOM?34:45;
    const x=tx*TS+8,y=ty*TS+16,sway=Math.sin(clock*1.3+tx)*.55;
    c.drawImage(image,cell%4*sw,Math.floor(cell/4)*sh,sw,sh,x-size/2+sway,y-size+4,size,size);
  }
  village(c:CanvasRenderingContext2D,clock:number){
    if(!this.canopy.complete||!this.canopy.naturalWidth)return;
    const sw=this.canopy.naturalWidth/4,sh=this.canopy.naturalHeight/2;
    c.drawImage(this.canopy,0,0,sw,sh,122*TS-57,111*TS-105,130,130);
    for(let i=0;i<10;i++){c.globalAlpha=.4+Math.sin(clock+i)*.3;c.fillStyle='#d1f0b1';c.fillRect(122*TS+Math.sin(clock*.5+i)*50,111*TS-30-Math.cos(clock*.3+i)*55,1,1);}c.globalAlpha=1;
  }
  buildings(c:CanvasRenderingContext2D){
    const im=this.people;if(!im.complete||!im.naturalWidth)return;
    const sw=im.naturalWidth/4,sh=im.naturalHeight/2;
    for(const b of BUILDINGS){const cell=b.secret?3:b.kind==='alchemy'?1:b.kind==='inn'?2:0;c.drawImage(im,cell*sw,sh,sw,sh,b.x*TS-8,b.y*TS-18,b.w*TS+16,b.h*TS+24);}
  }
  character(c:CanvasRenderingContext2D,x:number,y:number,dir:number,frame:number,clock:number){
    const im=this.people;if(!im.complete||!im.naturalWidth)return false;
    const cell=dir===3?1:dir===1?2:dir===2?3:0,sw=im.naturalWidth/4,sh=im.naturalHeight/2;
    c.save();c.translate(x,y);if(dir===1)c.scale(-1,1);
    c.drawImage(im,cell*sw,0,sw,sh,-12,-26+(frame%2?Math.sin(clock*13):0),24,28);c.restore();return true;
  }
  ambient(g:Game,c:CanvasRenderingContext2D){
    for(let i=0;i<35;i++){const x=(hash(i,3,7)*g.canvas.width+g.clock*3)%g.canvas.width,y=(hash(i,8,9)*g.canvas.height+Math.sin(g.clock*.6+i)*12)%g.canvas.height;c.globalAlpha=.12+Math.sin(g.clock*1.4+i)*.1;c.fillStyle=g.biome==='cherry'?'#f4c2da':'#d3e9b8';c.fillRect(x,y,1.5,1);}c.globalAlpha=1;
  }
}
