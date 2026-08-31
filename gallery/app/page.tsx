/* eslint-disable @next/next/no-img-element -- next/image is incompatible with the current Vinext runtime. */

const cases = [
  {
    id: '01',
    title: 'Faceted Bar Chart',
    reference: '/cases/01-reference.png',
    reconstructed: '/cases/01-reconstructed.png',
    scores: ['16/16', '16/16', '16/16'],
  },
  {
    id: '02',
    title: 'Faceted Scatter Plot',
    reference: '/cases/02-reference.png',
    reconstructed: '/cases/02-reconstructed.png',
    scores: ['16/16', '15/16', '16/16'],
  },
  {
    id: '03',
    title: 'Marginal Histograms',
    reference: '/cases/03-reference.png',
    reconstructed: '/cases/03-reconstructed.png',
    scores: ['16/16', '16/16', '16/16'],
  },
  {
    id: '04',
    title: 'Line with Highlights',
    reference: '/cases/04-reference.png',
    reconstructed: '/cases/04-reconstructed.png',
    scores: ['16/16', '12/16', '13/16'],
  },
  {
    id: '05',
    title: 'Box Plot',
    reference: '/cases/05-reference.png',
    reconstructed: '/cases/05-reconstructed.png',
    scores: ['14/16', '15/16', '10/16'],
  },
  {
    id: '06',
    title: 'OpinionSeer',
    reference: '/cases/06-reference.png',
    reconstructed: '/cases/06-reconstructed.png',
    scores: ['12/16', '13/16', '13/16'],
  },
  {
    id: '07',
    title: 'iForest',
    reference: '/cases/07-reference.png',
    reconstructed: '/cases/07-reconstructed.png',
    scores: ['16/16', '15/16', '7/16'],
  },
  {
    id: '08',
    title: 'BitExtract',
    reference: '/cases/08-reference.png',
    reconstructed: '/cases/08-reconstructed.png',
    scores: ['13/16', '14/16', '14/16'],
  },
  {
    id: '09',
    title: 'DropoutSeer',
    reference: '/cases/09-reference.png',
    reconstructed: '/cases/09-reconstructed.png',
    scores: ['16/16', '16/16', '16/16'],
  },
  {
    id: '10',
    title: 'CloudDet',
    reference: '/cases/10-reference.png',
    reconstructed: '/cases/10-reconstructed.png',
    scores: ['16/16', '16/16', '16/16'],
  },
  {
    id: '11',
    title: 'Node-Link Diagram',
    reference: '/cases/11-reference.png',
    reconstructed: '/cases/11-reconstructed.png',
    scores: ['16/16', '16/16', '16/16'],
  },
  {
    id: '12',
    title: 'Diverging Stacked Bar',
    reference: '/cases/12-reference.png',
    reconstructed: '/cases/12-reconstructed.png',
    scores: ['16/16', '16/16', '16/16'],
  },
  {
    id: '13',
    title: 'Line with Dots',
    reference: '/cases/13-reference.png',
    reconstructed: '/cases/13-reconstructed.png',
    scores: ['16/16', '15/16', '16/16'],
  },
  {
    id: '14',
    title: 'Line with Area',
    reference: '/cases/14-reference.png',
    reconstructed: '/cases/14-reconstructed.png',
    scores: ['4/16', '8/16', '8/16'],
  },
  {
    id: '15',
    title: 'Multiple Bar Charts',
    reference: '/cases/15-reference.png',
    reconstructed: '/cases/15-reconstructed.png',
    scores: ['16/16', '16/16', '16/16'],
  },
  {
    id: '16',
    title: 'Multiple Stacked Bars',
    reference: '/cases/16-reference.png',
    reconstructed: '/cases/16-reconstructed.png',
    scores: ['16/16', '15/16', '16/16'],
  },
  {
    id: '17',
    title: 'Multiple Area Charts',
    reference: '/cases/17-reference.png',
    reconstructed: '/cases/17-reconstructed.png',
    scores: ['16/16', '16/16', '8/16'],
  },
  {
    id: '18',
    title: 'LineUp',
    reference: '/cases/18-reference.png',
    reconstructed: '/cases/18-reconstructed.png',
    scores: ['16/16', '16/16', '6/16'],
  },
  {
    id: '19',
    title: 'NameClarifier',
    reference: '/cases/19-reference.png',
    reconstructed: '/cases/19-reconstructed.png',
    scores: ['16/16', '16/16', '15/16'],
  },
  {
    id: '20',
    title: 'EnsembleLens',
    reference: '/cases/20-reference.png',
    reconstructed: '/cases/20-reconstructed.png',
    scores: ['7/16', '13/16', '13/16'],
  },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="ReVis Gallery home">
          <span className="brand-mark">R</span>
          <span>ReVis Gallery</span>
        </a>
        <span className="header-note">Image-based visualization reproduction</span>
      </header>

      <section className="hero" id="top">
        <p className="eyebrow">Reference → Reconstructed</p>
        <h1>See what ReVis<br />rebuilds from pixels.</h1>
        <p className="intro">
          Side-by-side results from our composite visualization study. Each
          reconstruction is generated from an editable DSL and mocked data.
        </p>
        <div className="summary" aria-label="Evaluation summary">
          <span><strong>20</strong> composite cases</span>
          <span><strong>16</strong> evaluators</span>
          <span><strong>92.8%</strong> composition match</span>
        </div>
      </section>

      <section className="gallery-shell" aria-labelledby="gallery-title">
        <div className="gallery-heading">
          <div>
            <p className="eyebrow">Comparison gallery</p>
            <h2 id="gallery-title">Original design, reconstructed result</h2>
          </div>
          <span className="case-count">Showing {cases.length} cases</span>
        </div>

        <div className="gallery-grid">
          {cases.map((item, index) => (
            <article className="case-card" key={item.id}>
              <div className="case-title">
                <span className="case-id">#{item.id}</span>
                <h3>{item.title}</h3>
              </div>
              <div className="comparison">
                <figure>
                  <figcaption>Reference</figcaption>
                  <div className="image-well">
                    <a href={item.reference} target="_blank" aria-label={`Open reference ${item.title}`}>
                      <img
                        src={item.reference}
                        alt={`Reference ${item.title}`}
                        loading={index > 1 ? 'lazy' : 'eager'}
                        fetchPriority={index < 2 ? 'high' : 'auto'}
                      />
                    </a>
                  </div>
                </figure>
                <span className="arrow" aria-hidden="true">→</span>
                <figure>
                  <figcaption>Reconstructed</figcaption>
                  <div className="image-well reconstructed">
                    <a href={item.reconstructed} target="_blank" aria-label={`Open reconstructed ${item.title}`}>
                      <img
                        src={item.reconstructed}
                        alt={`Reconstructed ${item.title}`}
                        loading={index > 1 ? 'lazy' : 'eager'}
                        fetchPriority={index < 2 ? 'high' : 'auto'}
                      />
                    </a>
                  </div>
                </figure>
              </div>
              <div className="scores" aria-label="Evaluator agreement">
                {['Marks', 'Composition', 'Encoding'].map((label, scoreIndex) => (
                  <span key={label}><small>{label}</small><strong>{item.scores[scoreIndex]}</strong></span>
                ))}
              </div>
            </article>
          ))}
        </div>
        <footer>
          ReVis generates an editable design scaffold with mocked data; it does not recover the original dataset.
        </footer>
      </section>
    </main>
  );
}
