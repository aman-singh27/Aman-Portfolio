# Local portfolio fonts

Downloaded October 18, 2026, from the official Google Fonts CSS API and its `fonts.gstatic.com` asset URLs. These are unmodified Latin-subset WOFF2 files.

CSS request: <https://fonts.googleapis.com/css2?family=Anton&family=DM+Sans:wght@400;500;600&display=swap>

| Local file | Family/style/weight | Original asset |
| --- | --- | --- |
| `anton-latin-400.woff2` | Anton, normal, 400 | <https://fonts.gstatic.com/s/anton/v27/1Ptgg87LROyAm3Kz-C8.woff2> |
| `dm-sans-latin-variable.woff2` | DM Sans, normal, 400/500/600 | <https://fonts.gstatic.com/s/dmsans/v17/rP2Yp2ywxg089UriI5-g4vlH9VoD8Cmcqbu0-K4.woff2> |

Google's response supplies the same DM Sans asset URL for all three requested weights. One downloaded file serves those weights. The file name is a local descriptive name; the asset bytes are unchanged.

Both families are distributed under the SIL Open Font License, Version 1.1. The full upstream license and copyright notices are included as `OFL-Anton.txt` and `OFL-DMSans.txt`, downloaded from the official [google/fonts Anton directory](https://github.com/google/fonts/tree/main/ofl/anton) and [DM Sans directory](https://github.com/google/fonts/tree/main/ofl/dmsans). Keep these notices when redistributing the fonts.

Use `font-display: swap` and system fallbacks. Suggested face declarations:

```css
@font-face {
  font-family: 'Anton';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/anton-latin-400.woff2') format('woff2');
}
@font-face {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 400 600;
  font-display: swap;
  src: url('/fonts/dm-sans-latin-variable.woff2') format('woff2');
}
```

This subset covers the Latin text used by the portfolio, including standard typographic punctuation. Other symbols may use system fallbacks. Root-relative asset paths assume domain-root hosting; adjust them for a subdirectory deployment.
