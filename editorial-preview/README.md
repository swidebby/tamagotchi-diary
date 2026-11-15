# 小小星球日記 — Editorial Preview

Live preview: https://tama.debby.one/editorial-preview/

This is an isolated, publicly viewable **design experiment**. The original homepage at https://tama.debby.one/ remains unchanged.

## Design reference

The preview applies the [Cup of Couple design specification on Refero Styles](https://styles.refero.design/style/f4e1b510-6085-4fb8-8597-05d479d3c00c) to Debby's Tamagotchi Diary:

- White canvas, #303030 charcoal type, #808080 hairline rules and #f0f0f0 as a restrained secondary surface.
- 400-weight type everywhere; EB Garamond, IBM Plex Sans and Noto Serif TC are freely accessible substitutes for the proprietary or unavailable font faces in the reference.
- 0px corners, no shadows, no colored UI elements, 1200px maximum layout width.
- Three featured editorial stories, a large masthead and nav, an image-text hero, three-column diary cards, editorial collection, about section and the functioning monochrome browser pet.
- Adaptive mobile layouts and reduced-motion support.

## Content and operation

- The preview reads **../content.js** from the live repository, so diary and collection edits in the original content file also appear here.
- It has category filters, a working journal search, and a functioning feed/play/rest/reset browser pet. Pet state is stored only in the visitor's browser, sharing the same localStorage key as the original site on this domain.
- The current diary and collection records are **placeholders**, not autobiographical claims. The demo photographs are from Wikimedia Commons and **are not Debby's belongings**. Their vintage models are not claims about the named collection entries.
- Real diary images added to ../assets/ can be referenced from ../content.js and will be displayed in this preview. Until then the sample images are used.

## Preview photograph credits

Photographs are externally loaded for the design preview and have not been copied into this repository. CSS crops are used for the editorial layout.

1. [Tamagotchis](https://commons.wikimedia.org/wiki/File:Tamagotchis.jpg), photo by **xmacex** — [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).
2. [Tamagotchi (9174345467)](https://commons.wikimedia.org/wiki/File:Tamagotchi_(9174345467).jpg), photo by **Chester** — [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/).
3. [David's Tamagotchi](https://commons.wikimedia.org/wiki/File:David%27s_Tamagotchi.jpg), photo by **David** — public domain.

The subject matter is referenced solely for demonstration. The original HTML/CSS pixel-pet illustration in the original site is replaced here by a new grayscale CSS pet.

## Deployment and rollback

GitHub Pages publishes this subdirectory automatically from the repository's main branch. No deployment settings, DNS, CNAME or original homepage code was changed.

To remove the preview without affecting the original site, delete only the \`editorial-preview/\` directory. To use it as the homepage later, first review the design and move its files and their relative asset paths accordingly.
