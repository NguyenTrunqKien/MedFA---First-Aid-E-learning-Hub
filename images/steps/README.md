# Step illustration images

The step-by-step guide looks for one optional WebP image per step using this layout:

```text
images/
└── steps/
    ├── hoc-di-vat/
    │   ├── step-01.webp
    │   ├── step-02.webp
    │   └── step-03.webp
    └── bong-cap-do-1-2/
        ├── step-01.webp
        └── step-02.webp
```

- Use the topic `id` from `data/topics.json` as the folder name.
- Name images by their displayed order: `step-01.webp`, `step-02.webp`, and so on.
- Use WebP images where possible; PNG is also supported. The guide preserves each image's original aspect ratio, so square, portrait, and landscape illustrations are supported.
- For clear illustrations, aim for at least 800 px on the longest edge; around 1000 x 750 px (4:3) is a good general-purpose size. Square images around 900 x 900 px also work well.
- Do not stretch an image to force it into 16:9. The guide scales it to fit the available space without cropping.
- Add only the files for steps that have an illustration; missing images show an in-app placeholder.
- Keep each image in its topic folder. No JSON or backend changes are needed.

For example, the first step of `hoc-di-vat` uses `images/steps/hoc-di-vat/step-01.webp`.
