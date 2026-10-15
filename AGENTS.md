<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Game architecture
- Preserve the imported Canvas 2D engine and gameplay modules under src/game; this retains the original RPG rules and saved-game compatibility.
- Render the game directly at the index route without SSR, with viewport-sized canvas and React HUD overlays; browser canvas and audio require client initialization.
- Import generated artwork as bundled sprite atlases and select atlas cells at render time; this keeps the expanded world lightweight.
- Preserve the original browser save key during visual changes; existing journeys must remain loadable.
