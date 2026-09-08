import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const DATA_KEYS = new Set([
  'data_values',
  'anchor_values',
  'instance_data_values',
  'position_generator',
  'instance_position_generators',
  'value_generator',
]);

const PROMPT = '请观察左侧参考图，恢复当前 DSL 的真实数据分布。保持容器层级、图元类型、数量和数据结构不变；根据参考图重建尺寸、位置、峰值、聚集区域、稀疏区域和自然波动。不要生成均匀、对称或无依据的全局单调分布。';
const BASIC_CASES = new Set([
  '01_simple_bar_chart',
  '02_radial_bar_chart',
  '03_stacked_bar_chart',
  '04_radial_stacked_bar_chart',
  '05_horizontal_stacked_bar',
  '06_grouped_bar_chart',
  '07_scatter_plot',
  '08_bubble_plot_1',
  '09_bubble_plot_2',
  '10_2d_histogram_scatterplot',
  '11_2d_histogram_heatmap',
  '12_strip_plot',
  '13_dot_plot',
  '14_pie_chart',
  '15_donut_chart',
  '16_line_chart',
  '18_stacked_area',
  '19_radar_chart',
]);

function escapeJsonPointerSegment(segment) {
  return segment.replaceAll('~', '~0').replaceAll('/', '~1');
}

function collectRecoveredData(value, segments = [], fields = []) {
  if (!value || typeof value !== 'object') return fields;

  for (const [key, child] of Object.entries(value)) {
    const nextSegments = [...segments, key];
    if (DATA_KEYS.has(key)) {
      fields.push({
        path: `/${nextSegments.map(escapeJsonPointerSegment).join('/')}`,
        kind: key,
        value: child,
      });
      continue;
    }
    collectRecoveredData(child, nextSegments, fields);
  }

  return fields;
}

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourcePath = process.argv.find((argument, index) => index >= 2 && argument !== '--');
if (!sourcePath) {
  throw new Error('Usage: pnpm export:recoveries -- /absolute/path/to/.evaluation-results.json');
}

const savedResults = JSON.parse(await readFile(path.resolve(sourcePath), 'utf8'));
const outputDirectory = path.join(projectRoot, 'public', 'recoveries');
await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

const manifest = [];
for (const [caseId, state] of Object.entries(savedResults).sort(([a], [b]) => a.localeCompare(b))) {
  if (state?.status !== 'done' || !state?.result?.dsl) continue;

  const result = state.result;
  const recoveredData = collectRecoveredData(result.dsl);
  const artifact = {
    schema_version: 1,
    case_id: caseId,
    chart_type: BASIC_CASES.has(caseId) ? 'Basic' : 'Composite',
    model: state.model,
    saved_at: state.savedAt,
    prompt: PROMPT,
    summary: result.summary,
    reference_image_used: result.referenceImageUsed,
    generated_value_count: result.explicitValueCount,
    dsl: result.dsl,
    recovered_data: {
      format: 'JSON Pointer paths into the complete DSL above',
      fields: recoveredData,
    },
  };

  const filename = `${caseId}.json`;
  await writeFile(path.join(outputDirectory, filename), `${JSON.stringify(artifact, null, 2)}\n`);
  manifest.push({
    case_id: caseId,
    chart_type: artifact.chart_type,
    model: artifact.model,
    saved_at: artifact.saved_at,
    generated_value_count: artifact.generated_value_count,
    recovered_data_field_count: recoveredData.length,
    artifact: `/recoveries/${filename}`,
    reference_image: `/cases/${caseId}-reference.png`,
    recovered_image: `/cases/${caseId}-recovered.png`,
  });
}

await writeFile(
  path.join(outputDirectory, 'index.json'),
  `${JSON.stringify({ schema_version: 1, case_count: manifest.length, cases: manifest }, null, 2)}\n`,
);

console.log(`Exported ${manifest.length} recovery artifacts to ${outputDirectory}`);
