export default function Shows() {
  return <div className="scene-content shows-content"><div className="eyebrow">03 / LIVE SHOWS</div><h2 id="title-shows">See you <em>out there.</em></h2>
    <div className="show-cards">
      <article className="show-card announced"><div className="show-date"><span>SEP</span><strong>20</strong></div><div className="show-detail"><span className="show-status">UP NEXT</span><h3>Alan Walden<br />Celebration of Life</h3><p>Last Living Souls · Live</p></div></article>
      {[2,3].map(i=><article className="show-card upcoming" key={i}><div className="show-date"><span>SHOW</span><strong>0{i}</strong></div><div className="show-detail"><span className="show-status">ON THE HORIZON</span><h3>Live show<br />coming soon.</h3><p>Stay tuned for the next date.</p></div></article>)}
    </div>
  </div>
}
