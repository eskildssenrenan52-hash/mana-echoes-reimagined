import buttons from '@/assets/ai-action-buttons.png';
export function GameArtIcon({cell}:{cell:number}) {
  return <span className={`art-icon art-cell-${cell}`} aria-hidden="true"><img src={buttons} alt="" width={1024} height={768}/></span>;
}
