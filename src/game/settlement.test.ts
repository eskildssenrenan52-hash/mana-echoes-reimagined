import { describe, it, expect } from 'vitest';
import { freshSettlement, growPlots, CROPS, STRUCTURES } from './settlement';
import { generateWorld, BIOME_LIST, T, SOLID, W, H } from './world';
import { ITEMS, BIOME_ENEMIES, BIOME_NAMES } from './data';

describe('Expanded living world',()=>{
  it('generates all 17 biomes on a continent sixteen times the original area',()=>{
    const world=generateWorld();const ids=new Set(world.biomes);
    expect(BIOME_LIST.length).toBe(17);
    expect(W * H).toBe(320 * 240 * 16);
    for(const [i,b] of BIOME_LIST.entries()){expect(ids.has(i)).toBe(true);expect(BIOME_NAMES[b]).toBeTruthy();expect(BIOME_ENEMIES[b].length).toBeGreaterThan(0);}
    expect(world.tiles[130*W+143]).toBe(T.GRASS);
  });
  it('grows only watered crops and rain irrigates planted crops',()=>{
    const s=freshSettlement();s.plots.push({x:140,y:130,crop:'carrot',growth:0,watered:false});
    growPlots(s,20,false);expect(s.plots[0].growth).toBe(0);
    growPlots(s,20,true);expect(s.plots[0].growth).toBe(.5);
    growPlots(s,100,false);expect(s.plots[0].growth).toBe(1);
  });
  it('uses real catalog materials for structures and seeds',()=>{
    for(const c of Object.values(CROPS)){expect(ITEMS[c.seed]).toBeDefined();expect(ITEMS[c.item]).toBeDefined();}
    for(const s of Object.values(STRUCTURES))for(const [id,n]of Object.entries(s.cost)){expect(ITEMS[id]).toBeDefined();expect(n).toBeGreaterThan(0);}
    expect(SOLID.has(T.LAVA)).toBe(true);
  });
});