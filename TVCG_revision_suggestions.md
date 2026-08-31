# ReVis 面向 TVCG 的修改建议

> 依据：我按 TVCG/VIS 系统论文常见要求来审：问题重要性、技术新颖性、方法可复现性、评估充分性、局限诚实度、图表自解释性和写作完成度。当前版本的核心想法有潜力，但需要把“系统展示”进一步打磨成“可被审稿人相信的研究贡献”。

## 总体判断

当前论文最强的卖点是：把 bitmap visualization reuse 从“重画/识别基础图表”推进到“通过 DSL 表达并复用 composite visualization”。但现在的叙事有三个主要风险：

1. **贡献边界偏大**：摘要和引言说 ReVis “enables flexible reuse”，但评估显示部分 composite cases 自动结果并不稳定，最终依赖人工编辑修复。
2. **DSL 新颖性论证不够硬**：DSL 的组件看起来像 hierarchy + marks + layout channels + style encodings，审稿人会问它相对 Vega-Lite、Mascot、DataWink、Atlas 的不可替代性是什么。
3. **评估证据偏弱**：basic chart 用人工 DSL ground truth 算 attribute accuracy，composite 用 16 人 Yes/No 判断；缺少 baseline、ablation、runtime/cost、failure taxonomy 和真实任务对照。

建议把主口径从“自动高质量复现任意 image-based visualization”调整为：

> **ReVis is a human-AI workflow that converts bitmap visualization images into an editable, container-based intermediate representation, enabling practitioners to inspect, repair, and adapt composite visualization designs that are otherwise difficult to reuse from images alone.**

这个口径更稳，也更符合你们实际系统：自动解析是 starting point，真正贡献是 editable DSL + pipeline + interaction loop。

## P0：必须优先修的问题

### 1. 标题和摘要需要降低“全自动复现”的承诺

**现在的问题**

摘要里说 “parse an image-based visualization into the DSL” 和 “reproduces the visualization from the DSL”，后面又说 user interviews demonstrate effectiveness。这个读起来像端到端自动系统，但评估中 #14、#20 等 composite case 有明显失败。

**建议从**

> ReVis employs an MLLM-based pipeline to parse an image-based visualization into the DSL ... and further reproduces the visualization from the DSL.

**改成**

> ReVis uses an MLLM-based pipeline to generate an initial editable DSL from a bitmap visualization image, which users can inspect, refine, and adapt through a human-AI reuse workflow.

**理由**

TVCG 审稿会很敏感 “automatic reproduction” 的边界。把 automatic 改成 initial editable representation，可以避免评估结果和主张冲突。

### 2. 引言的三条 challenge 需要对应到 evaluation

**现在的问题**

C1/C2/C3 提得清楚，但 evaluation 没有逐条证明：C1 没有和 SVG-only 方法对比；C2 没有覆盖度定义；C3 没有量化 customization flexibility。

**建议从**

> We evaluate ReVis via a quantitative evaluation on 40 visualizations, two usage scenarios, and user interviews...

**改成**

> We evaluate ReVis along three questions: whether the DSL can represent diverse bitmap examples, whether the MLLM pipeline can produce useful initial DSLs, and whether practitioners can repair and adapt the results through the interface.

**理由**

把评估问题和贡献绑定，审稿人更容易看到证据链，而不是觉得 gallery、quant study、interview 是松散堆叠。

### 3. 增加 baseline 或至少增加 ablation

**现在的问题**

没有 baseline。审稿人会问：为什么不是 GPT-5 直接生成 D3/Vega-Lite？为什么需要 DSL？为什么三步 pipeline 比单 prompt 好？

**建议新增一个表**

| Method | Basic charts | Composite visualizations | Editable reuse | Failure mode |
|---|---:|---:|---|---|
| Direct MLLM-to-D3/SVG | ... | ... | low | unstable code, hallucinated structure |
| Single-prompt DSL generation | ... | ... | medium | timeout / missing leaf containers |
| ReVis three-step DSL pipeline | ... | ... | high | data dependency / link layout errors |

**正文口径可从**

> Before employing such a design, we also experimented with using the same prompt...

**改成**

> We compare the three-step DSL generator with a single-prompt variant and a direct image-to-code baseline. The three-step design improves structural completeness and reduces timeouts by separating hierarchy extraction, template consolidation, and mark-level encoding inference.

**理由**

TVCG 系统论文通常需要证明设计选择不是随意的。哪怕 baseline 不完美，也能显著增强可信度。

### 4. Composite evaluation 的 Yes/No 指标太粗，需要补充评分和一致性

**现在的问题**

Q1/Q2/Q3 都是 binary，且 16 名参与者同时用于 user interview 和 quantitative evaluation，容易被质疑主观、粗糙、任务混淆。

**建议从**

> participants were shown the input image and the generated result and asked to answer three binary Yes/No questions

**改成**

> Participants rated mark completeness, composition correctness, and encoding correctness on a 5-point scale; we report mean, standard deviation, and inter-rater agreement. For comparability, we also binarize ratings above 3 as acceptable.

**理由**

二值结果掩盖严重程度。比如 #14 的 4/16 和 #20 的 7/16 是重大失败，不应只放在总体 90.6% 后面。

### 5. 需要把失败案例前置，而不是用 “can be easily addressed” 收尾

**现在的问题**

多处写 “these issues can be easily addressed by modifying the DSL”。这会被看作回避自动方法的问题。

**建议从**

> Importantly, these issues can be easily addressed by modifying the corresponding attributes...

**改成**

> These errors indicate the current boundary of automatic parsing. ReVis addresses them by making the generated DSL inspectable and editable, but reducing such repair effort remains future work.

**理由**

更诚实，也更符合 human-AI collaboration 的主张。不要把用户修 bug 包装成算法准确性。

## P1：强烈建议提升的问题

### 6. DSL 的“为什么必须新建”需要更强

**现在的问题**

DSL design goals 写得完整，但和已有 DSL 的差异还停留在“它们 fixed chart types / flat / default settings”。这容易被 Vega-Lite/Mascot/Grammar of Graphics 审稿人反驳。

**建议新增一个对比表**

| Capability | Vega-Lite | Mascot | DataWink | ReVis DSL |
|---|---|---|---|---|
| Bitmap image as input | no | no | no / limited | yes |
| Explicit hierarchical containers | limited | partial | SVG-dependent | yes |
| Template container for repeated composite units | limited | partial | partial | yes |
| Mock-data specification for reuse | no | no | limited | yes |
| Human-editable repair after MLLM parsing | no | no | partial | yes |

**建议口径**

> The DSL is not intended to replace declarative visualization grammars for authoring from known data. Instead, it is an intermediate representation for reverse-engineering and repairing bitmap-derived visualization designs.

**理由**

这句话很重要：把 DSL 定位成 reverse-engineering IR，而不是 another visualization grammar，能避开“为什么不用 Vega-Lite”的攻击。

### 7. 明确 ReVis 不恢复原始数据，只恢复 reusable design

**现在的问题**

“data-to-encoding mappings”“underlying data”“mocked data” 混在一起，容易让读者误以为系统恢复真实数据。

**建议从**

> identify the underlying visual encodings

**改成**

> infer reusable encoding patterns and generate synthetic data with similar structural properties, rather than recovering the original dataset.

**理由**

bitmap 反推真实数据是高风险主张。应明确目标是 design reuse，而非 data extraction。

### 8. 方法部分需要补充可复现细节

**现在的问题**

只写 “ChatGPT-5” 和 prompt，缺少模型版本、temperature、image resolution、retry strategy、structured output schema、平均调用次数、失败重试规则、runtime/cost。

**建议新增 Method Implementation Details**

建议加入：

- Model version and API date
- Temperature / top-p
- Input image preprocessing and resolution
- Number of MLLM calls per visualization
- Structured output validation
- Retry / repair strategy when JSON invalid
- Average runtime and token/image cost
- Whether prompts and gallery data are released

**理由**

MLLM 论文如果不可复现，TVCG 审稿会直接扣可信度。

### 9. User interview 需要和 quantitative evaluation 拆开

**现在的问题**

同一批 16 人既评价 composite reproduction，又体验系统，还回答问卷。容易产生 exposure bias 和 positivity bias。

**建议口径**

> The composite evaluation measured perceived reproduction quality, while the interview focused on workflow usefulness after participants interacted with ReVis. We report them separately and discuss the potential bias from using the same participant pool.

**更好做法**

如果还有时间，补一个独立 evaluator study：让 3-5 名未参与系统试用的人只评生成结果。

**理由**

降低“参与者被 tutorial 引导后更宽容”的质疑。

### 10. Usage scenarios 需要变成 evidence-backed cases

**现在的问题**

两个 scenario 现在像假想故事，TVCG 可以接受 scenario，但最好连接真实任务、真实数据、操作步骤和时间。

**建议从**

> Alice is a visualization designer...

**改成**

> In this scenario, we reproduce and adapt an existing visualization from [48] using a new dataset. The workflow consists of five edits: cropping angular ranges, aligning primary counts, duplicating a container, swapping radius/angle encodings, and uploading replacement data.

**理由**

少一点 fictional persona，多一点 reproducible walkthrough，会更学术。

## P2：文本、图表和格式问题

### 11. 立即修正旧系统名 VisAwaken

**位置**

Fig. 6 的 Q2-Q12 全部写的是 VisAwaken。

**从**

> I can easily understand how VisAwaken decomposes...

**改成**

> I can easily understand how ReVis decomposes...

**理由**

这是非常显眼的 copy-paste 痕迹，会严重影响评审第一印象。

### 12. 修正模板和拼写错误

建议全局检查：

- `JOURNAL OF LATEX CLASS FILES...`：提交前必须换成正确 TVCG 模板页眉或匿名模板。
- `Parsing Hierachical Containers` → `Parsing Hierarchical Containers`
- `soure-target pairs` → `source-target pairs`
- `AlthoughReVis` → `Although ReVis`
- `Sec.VI-C` → `Sec. VI-C`
- `Section. VI-C` → `Section VI-C`
- `Domain-Specific language` → `domain-specific language` 或 `Domain-Specific Language` 统一

**理由**

这些不是语法小问题；它们会让审稿人怀疑论文还没有进入 submission-ready 状态。

### 13. Fig. 2 和 Fig. 6 信息密度过高

**现在的问题**

Fig. 2 很漂亮但元素多，Fig. 6 字太小且表格/堆叠条拥挤。

**建议**

- Fig. 2 保留 pipeline，减少 UI 小字，把 UI 细节移到 Fig. 3。
- Fig. 6 改成两列：左侧问题类别和简短问题，右侧 Likert bars；完整题目放 appendix。
- Fig. 5 caption 里 `Fig. 5 E` 最后结果应核对，正文说 resulting visualization is shown in Fig. 5 E，但图中 final visualization 是 G。

**理由**

TVCG 的图要能在两栏排版下读懂。现在有些图缩小后信息损失明显。

### 14. 参考文献和相关工作需要补 LLM/VIS 最新基准的定位

**建议**

增加一段把 ReVis 和 visualization understanding / chart-to-code / MLLM benchmark 区分开：

> Existing benchmarks emphasize chart question answering or code/spec generation for common chart types, whereas ReVis targets editable reuse of composite visualization images.

**理由**

2025-2026 年 LLM4Vis 方向很快，审稿人会默认比较最新 chart-to-code / multimodal chart reasoning 工作。

## 建议新增的小节结构

建议把后半部分改成下面这个结构：

```markdown
VI. Evaluation
  A. Evaluation Questions
  B. Dataset and Gallery Construction
  C. Baselines and Ablations
  D. Basic Chart DSL Accuracy
  E. Composite Visualization Quality
  F. Runtime, Cost, and Failure Analysis

VII. User Study
  A. Participants
  B. Procedure
  C. Results
  D. Qualitative Feedback

VIII. Discussion
  A. What the DSL Enables
  B. Boundary of Automatic Bitmap Parsing
  C. Generalization and Future Work
```

## 最关键的三处口径修改

### 口径 1：从“复现 visualization”改成“生成可编辑 reuse scaffold”

**旧口径**

> ReVis automatically reproduces image-based visualizations.

**新口径**

> ReVis automatically produces an editable reuse scaffold that captures the main structure and encoding patterns of an image-based visualization.

### 口径 2：从“DSL 比现有 DSL 更通用”改成“DSL 是 reverse-engineering IR”

**旧口径**

> Existing visualization DSLs are limited; our DSL supports diverse composite visualizations.

**新口径**

> Existing DSLs are optimized for authoring visualizations from known data, whereas our DSL is designed as an intermediate representation for decomposing, repairing, and adapting bitmap-derived designs.

### 口径 3：从“错误很容易修”改成“human-AI loop 是设计的一部分”

**旧口径**

> These issues can be easily addressed by modifying the corresponding attributes.

**新口径**

> These errors motivate ReVis's human-AI workflow: the MLLM provides an initial structured interpretation, and the interface helps users localize and repair imperfect attributes before adapting the design.

## 建议优先级

1. 先修 Fig. 6 旧名、拼写、模板页眉、caption 引用这些硬伤。
2. 改摘要、贡献和引言口径，降低自动化承诺，突出 editable IR。
3. 增加 baseline/ablation，至少比较 single-prompt 和 direct image-to-code。
4. 补充 runtime/cost/failure taxonomy。
5. 改 composite evaluation 的呈现方式，突出失败边界和人工修复价值。
6. 增加 DSL 对比表，把“为什么需要新 DSL”讲硬。

