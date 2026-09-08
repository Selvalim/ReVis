# Recovery result artifacts

The 32 successful reference-distribution recoveries shown in the gallery are
versioned under `public/recoveries/` instead of being represented only by PNG
screenshots.

Each `<case-id>.json` file contains:

- the evaluation prompt, model, timestamp, and result summary;
- the complete recovered ReVis DSL;
- every recovered value array or deterministic generator configuration,
  indexed by a JSON Pointer into that DSL; and
- the generated-value count used by the gallery.

`public/recoveries/index.json` is the machine-readable manifest linking each
artifact to its reference and recovered images.

To rebuild the exported files from a saved evaluation result bundle:

```sh
pnpm export:recoveries -- /absolute/path/to/.evaluation-results.json
```
