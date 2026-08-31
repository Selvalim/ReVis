/* eslint-disable @next/next/no-img-element -- Vinext currently renders native images more reliably. */

const cases = [
  { id: '01_grid_bar_chart', values: 3, type: 'Composite' },
  { id: '01_simple_bar_chart', values: 9, type: 'Basic' },
  { id: '02_radial_bar_chart', values: 3, type: 'Basic' },
  { id: '02_scatter_plot_matrix', values: 7840, type: 'Composite' },
  { id: '03_marginal_histograms', values: 20, type: 'Composite' },
  { id: '03_stacked_bar_chart', values: 60, type: 'Basic' },
  { id: '04_line_with_highlight', values: 44, type: 'Composite' },
  { id: '04_radial_stacked_bar_chart', values: 350, type: 'Basic' },
  { id: '05_box_plot', values: 6, type: 'Composite' },
  { id: '05_horizontal_stacked_bar', values: 38, type: 'Basic' },
  { id: '06_grouped_bar_chart', values: 9, type: 'Basic' },
  { id: '06_OpinionSeer', values: 600, type: 'Composite' },
  { id: '07_scatter_plot', values: 784, type: 'Basic' },
  { id: '08_bitextract', values: 28, type: 'Composite' },
  { id: '08_bubble_plot_1', values: 796, type: 'Basic' },
  { id: '09_bubble_plot_2', values: 215, type: 'Basic' },
  { id: '09_DropoutSeer', values: 16, type: 'Composite' },
  { id: '10_2d_histogram_scatterplot', values: 90, type: 'Basic' },
  { id: '10_CloudDet', values: 221, type: 'Composite' },
  { id: '11_2d_histogram_heatmap', values: 750, type: 'Basic' },
  { id: '11_node_link', values: 180, type: 'Composite' },
  { id: '12_diverging_stacked_bar', values: 32, type: 'Composite' },
  { id: '12_strip_plot', values: 150, type: 'Basic' },
  { id: '13_dot_plot', values: 58, type: 'Basic' },
  { id: '13_line_and_dot', values: 88, type: 'Composite' },
  { id: '14_line_and_area', values: 4, type: 'Composite' },
  { id: '14_pie_chart', values: 6, type: 'Basic' },
  { id: '15_donut_chart', values: 6, type: 'Basic' },
  { id: '16_line_chart', values: 22, type: 'Basic' },
  { id: '18_stacked_area', values: 120, type: 'Basic' },
  { id: '19_radar_chart', values: 2, type: 'Basic' },
  { id: '20_EnsembleLens', values: 118, type: 'Composite' },
];

function caseTitle(id: string) {
  return id
    .replace(/^\d+_/, '')
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
    .replaceAll('2d', '2D');
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="ReVis Gallery home">
          <span className="brand-mark">R</span>
          <span>ReVis Gallery</span>
        </a>
        <span className="header-note">Reference distribution recovery</span>
      </header>

      <section className="hero" id="top">
        <p className="eyebrow">Reference → GPT-5.4 recovered</p>
        <h1>Real revisions,<br />side by side.</h1>
        <p className="intro">
          These are the saved results from the working ReVis evaluation—not the
          older screenshots in the paper. Each result restores a data distribution
          from its reference image while preserving the original DSL structure.
        </p>
        <div className="summary" aria-label="Recovery summary">
          <span><strong>32 / 40</strong> completed</span>
          <span><strong>18</strong> basic charts</span>
          <span><strong>14</strong> composite designs</span>
          <span><strong>8</strong> pending</span>
        </div>
      </section>

      <section className="gallery-shell" aria-labelledby="gallery-title">
        <div className="gallery-heading">
          <div>
            <p className="eyebrow">Recovered distribution gallery</p>
            <h2 id="gallery-title">Reference image, modified result</h2>
          </div>
          <span className="case-count">Showing {cases.length} saved recoveries</span>
        </div>

        <div className="gallery-grid">
          {cases.map((item, index) => {
            const title = caseTitle(item.id);
            const reference = `/cases/${item.id}-reference.png`;
            const recovered = `/cases/${item.id}-recovered.png`;
            return (
              <article className="case-card" key={item.id}>
                <div className="case-title">
                  <span className="case-id">#{String(index + 1).padStart(2, '0')}</span>
                  <h3>{title}</h3>
                  <span className="case-type">{item.type}</span>
                </div>
                <div className="comparison">
                  <figure>
                    <figcaption>Reference</figcaption>
                    <div className="image-well">
                      <a href={reference} target="_blank" aria-label={`Open reference ${title}`}>
                        <img
                          src={reference}
                          alt={`Reference ${title}`}
                          loading={index > 1 ? 'lazy' : 'eager'}
                          fetchPriority={index < 2 ? 'high' : 'auto'}
                        />
                      </a>
                    </div>
                  </figure>
                  <span className="arrow" aria-hidden="true">→</span>
                  <figure>
                    <figcaption>Modified · GPT-5.4</figcaption>
                    <div className="image-well reconstructed">
                      <a href={recovered} target="_blank" aria-label={`Open modified ${title}`}>
                        <img
                          src={recovered}
                          alt={`Modified ${title}`}
                          loading={index > 1 ? 'lazy' : 'eager'}
                          fetchPriority={index < 2 ? 'high' : 'auto'}
                        />
                      </a>
                    </div>
                  </figure>
                </div>
                <div className="case-meta">
                  <span><i />Recovered</span>
                  <span>{item.values.toLocaleString()} generated values</span>
                </div>
              </article>
            );
          })}
        </div>
        <footer>
          Only successful results saved in the working evaluation are shown. ReVis
          recovers reference-like data distributions; it does not extract the original dataset.
        </footer>
      </section>
    </main>
  );
}
