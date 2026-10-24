import React from "react";
import "./ExtendedProjectArtwork.css";

const surfaces: Record<string, string> = {
  qpaper: "#d4e6f1",
  photobooth: "#e9cba8",
  "social-research": "#d2dacb",
  "rkitect-content-engine": "#d8d2eb",
  "rkitect-sketchup-tools": "#d6e5dd",
  "rkitect-product-website": "#e2ded2",
  "tenary-films": "#d2dce8",
  "po-tracker": "#d3dddc",
  "ambient-expenses": "#e9dfc7",
  "imagine-salon": "#e8c5bb",
  "182-rentals": "#d6dfcb",
  "havmor-menu": "#e7c9df",
  reviva: "#bed8c6",
  jobintel: "#d8e2ee",
  navpal: "#d6d6ee",
  "nbes-website": "#ced7dc",
  voiceguard: "#d4d8e8",
  techlearn: "#e8dfc9",
  "campus-hub": "#ecd7bb",
};

export function getProjectSurface(id: string): string | undefined {
  return surfaces[id];
}

function Lines({ count = 3 }: { count?: number }) {
  return (
    <div className="xa-lines">
      {Array.from({ length: count }, (_, i) => (
        <i key={i} />
      ))}
    </div>
  );
}

function Architecture({ building = false }: { building?: boolean }) {
  return (
    <svg viewBox="0 0 400 340" fill="none" className="xa-architecture">
      <path
        d="M30 276 210 333 378 253M30 276v-36M210 333v-36M378 253v-36"
        stroke="currentColor"
        opacity=".35"
      />
      {building ? (
        <>
          <path
            d="M79 255V88L224 37l101 43v183l-101 46Z"
            fill="#c4b59c"
            stroke="currentColor"
          />
          <path
            d="m79 88 145 53 101-61M224 141v168M79 255l145 54 101-46"
            stroke="currentColor"
          />
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(0 ${i * 37})`}>
              <path
                d="m96 112 35 13v24l-35-13Zm51 19 35 13v24l-35-13Zm98 23 24-11v23l-24 11Zm39-17 24-11v23l-24 11Z"
                fill="#4e6150"
                stroke="currentColor"
              />
            </g>
          ))}
          <path d="m193 242 20 7v47l-20-7Z" fill="#344b3b" />
        </>
      ) : (
        <>
          <path
            d="m72 216 125-64 136 46-126 66Z"
            fill="#d7e4cf"
            stroke="currentColor"
          />
          <path
            d="M72 216v-84l125-65 136 47v84M197 67v85M72 132l135 48 126-66M207 180v84"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="m106 146 40 14v72M167 167v72M234 166v82M289 137v82M72 174l135 47 126-66"
            stroke="currentColor"
            opacity=".45"
          />
          <path
            d="m197 67 40-36 135 47-39 36M237 31v84"
            stroke="currentColor"
            opacity=".3"
            strokeDasharray="4 5"
          />
          <path
            d="m130 185 37-18 40 14-37 19Z"
            fill="#dcf16d"
            stroke="currentColor"
          />
          <path
            d="M170 200v39l37-19v-39"
            fill="#a0b386"
            stroke="currentColor"
          />
          <circle cx="197" cy="67" r="4" fill="#dcf16d" />
          <circle cx="333" cy="114" r="4" fill="#dcf16d" />
          <circle cx="207" cy="264" r="4" fill="#dcf16d" />
        </>
      )}
    </svg>
  );
}

/** Original project-inspired compositions, intentionally not product screenshots. */
export default function ExtendedProjectArtwork({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  let body: React.ReactNode;
  let caption: string;
  let foot: string;

  switch (id) {
    case "qpaper":
      caption = "TURN THE PAST INTO A PLAN.";
      foot = "PAPERS / PATTERNS / PREPARATION";
      body = (
        <>
          <div className="xa-editorial xa-qpaper-type">
            Less guessing.
            <br />
            <em>More insight.</em>
          </div>
          <div className="xa-paper xa-paper-back" />
          <div className="xa-paper xa-paper-front">
            <span className="xa-micro">THE QUESTION IS…</span>
            <strong>
              What comes
              <br />
              next?
            </strong>
            <div className="xa-answer">
              <i>A</i>
              <span />
              <b>↗</b>
            </div>
            <div className="xa-answer">
              <i>B</i>
              <span />
            </div>
            <div className="xa-answer">
              <i>C</i>
              <span />
            </div>
            <span className="xa-scan" />
            <small>READ. RECOGNIZE. REVISE.</small>
          </div>
          <div className="xa-qpaper-seal">
            Q<span>↗</span>
          </div>
        </>
      );
      break;
    case "photobooth":
      caption = "A MOMENT, MADE TANGIBLE.";
      foot = "CAMERA / CAPTURE / KEEP";
      body = (
        <>
          <div className="xa-photo-title">
            Keep the
            <br />
            <em>good bits.</em>
          </div>
          {[0, 1].map((strip) => (
            <div
              key={strip}
              className={`xa-photo-strip xa-photo-strip-${strip}`}
            >
              {[0, 1, 2].map((frame) => (
                <div
                  className={`xa-photo-frame xa-photo-frame-${frame}`}
                  key={frame}
                >
                  <i className="xa-photo-sun" />
                  <span className="xa-photo-hill" />
                  <span className="xa-photo-hill xa-photo-hill-two" />
                </div>
              ))}
              <small>ONE LITTLE MOMENT.</small>
            </div>
          ))}
          <div className="xa-photo-stamp">
            THE
            <br />
            PHOTO
            <br />
            <b>BOOTH.</b>
          </div>
        </>
      );
      break;
    case "social-research":
      caption = "SIGNALS, WITHOUT THE SCATTER.";
      foot = "COLLECT / CONNECT / UNDERSTAND";
      body = (
        <>
          <div className="xa-editorial xa-social-type">
            Many voices.
            <br />
            <em>One clear view.</em>
          </div>
          <svg className="xa-social-paths" viewBox="0 0 500 300" fill="none">
            <path
              d="M50 50C230 50 120 150 280 150M60 145h220M50 250c180 0 70-100 230-100M280 150h170"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle
              cx="280"
              cy="150"
              r="24"
              fill="#d9ef9b"
              stroke="currentColor"
            />
            <path
              d="m270 150 7 7 13-14"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <div className="xa-social-nodes">
            <i>CONVERSATION</i>
            <i>CONTEXT</i>
            <i>COMMUNITY</i>
          </div>
          <div className="xa-social-sheet">
            <span className="xa-micro">THE RESEARCH VIEW</span>
            <div className="xa-sheet-grid">
              {Array.from({ length: 16 }, (_, i) => (
                <i key={i} />
              ))}
            </div>
            <b>
              Connections
              <br />
              worth keeping. ↗
            </b>
          </div>
        </>
      );
      break;
    case "rkitect-content-engine":
      caption = "FROM FIRST SIGNAL TO FINAL WORD.";
      foot = "RESEARCH / DRAFT / REVIEW / SCHEDULE";
      body = (
        <>
          <div className="xa-engine-type">
            A little system.
            <br />
            <em>A lot of voice.</em>
          </div>
          <div className="xa-engine-orbit" />
          <div className="xa-engine-orbit xa-engine-orbit-two" />
          <div className="xa-flow-card xa-flow-research">
            <span>01 / RESEARCH</span>
            <strong>
              Find the
              <br />
              useful idea.
            </strong>
            <Lines />
          </div>
          <div className="xa-flow-card xa-flow-write">
            <span>02 / CREATE</span>
            <strong>
              Give it
              <br />a voice.
            </strong>
            <Lines count={2} />
            <i>↗</i>
          </div>
          <div className="xa-flow-approve">
            <b>✓</b> HUMAN REVIEW
            <br />
            <small>People make the final call.</small>
          </div>
        </>
      );
      break;
    case "rkitect-sketchup-tools":
      caption = "BETWEEN AN IDEA AND A SPACE.";
      foot = "WORKFLOW TOOLS / BUILT AROUND DESIGNERS";
      body = (
        <>
          <div className="xa-arch-label">
            From line
            <br />
            to <em>possibility.</em>
          </div>
          <Architecture />
          <span className="xa-coordinate xa-coordinate-one">X / Y / Z</span>
          <span className="xa-coordinate xa-coordinate-two">
            DESIGN IN CONTEXT ↗
          </span>
          <div className="xa-arch-rule" />
        </>
      );
      break;
    case "rkitect-product-website":
      caption = "A PRODUCT STORY, GIVEN SPACE.";
      foot = "STORY / MOTION / DOCUMENTATION";
      body = (
        <>
          <div className="xa-web-browser">
            <div className="xa-web-nav">
              <b>r.</b>
              <span>MAKE ROOM FOR IDEAS.</span>
              <i>↗</i>
            </div>
            <div className="xa-web-head">
              Imagine.
              <br />
              Make it <em>real.</em>
            </div>
            <div className="xa-web-room">
              <i />
              <i />
              <i />
              <span />
            </div>
            <div className="xa-web-caption">
              A NEW PERSPECTIVE, INSIDE YOUR WORKFLOW.<b>EXPLORE ↗</b>
            </div>
          </div>
          <span className="xa-web-margin">DESIGN IS IN THE DETAILS.</span>
        </>
      );
      break;
    case "tenary-films":
      caption = "MAKE THE EVERYDAY FEEL DIFFERENT.";
      foot = "ORIGINAL MOTION / SCORE / NARRATION";
      body = (
        <>
          <div className="xa-film-title">
            Work moves.
            <br />
            <em>Stories stay.</em>
          </div>
          <div className="xa-film-strip">
            {[0, 1, 2].map((i) => (
              <div className={`xa-film-scene xa-film-scene-${i}`} key={i}>
                <span />
                <i />
                <b>{["THE IDEA", "THE RHYTHM", "THE RELEASE"][i]}</b>
              </div>
            ))}
          </div>
          <div className="xa-film-play">
            <svg viewBox="0 0 30 30">
              <path d="m11 7 13 8-13 8Z" fill="currentColor" />
            </svg>
          </div>
          <span className="xa-film-brand">tenary / motion studies</span>
        </>
      );
      break;
    case "po-tracker":
      caption = "EVERY ORDER HAS A STORY.";
      foot = "PURCHASE ORDERS / VISIBILITY / FOLLOW-THROUGH";
      body = (
        <>
          <div className="xa-order-title">
            Nothing
            <br />
            falls through.
          </div>
          <div className="xa-order-slip">
            <span className="xa-micro">PURCHASE ORDER</span>
            <strong>
              A clear path
              <br />
              from here.
            </strong>
            <Lines count={2} />
            <div className="xa-order-progress">
              {["PLACED", "IN MOTION", "RECEIVED"].map((step, i) => (
                <div key={step}>
                  <i>{i === 2 ? "✓" : "•"}</i>
                  <small>{step}</small>
                </div>
              ))}
            </div>
            <div className="xa-order-fold" />
          </div>
          <div className="xa-order-cube">
            <span>PO</span>
            <i>↗</i>
          </div>
        </>
      );
      break;
    case "ambient-expenses":
      caption = "MORE ROOM FOR THE EVERYDAY.";
      foot = "EXPENSES / CATEGORIES / A CLEARER PICTURE";
      body = (
        <>
          <div className="xa-ledger-title">
            Small spends.
            <br />
            <em>Clear picture.</em>
          </div>
          <div className="xa-ledger">
            <span className="xa-micro">A LITTLE DAILY CLARITY</span>
            <div className="xa-ledger-chart">
              {[38, 69, 48, 87, 56, 73, 46].map((height, i) => (
                <i key={i} style={{ height: `${height}%` }} />
              ))}
            </div>
            <div className="xa-ledger-entry">
              <b>Everyday</b>
              <i />
            </div>
            <div className="xa-ledger-entry">
              <b>Something good</b>
              <i />
            </div>
            <div className="xa-ledger-entry">
              <b>A little extra</b>
              <i />
            </div>
          </div>
          <div className="xa-ledger-coin">
            a<span>↗</span>
          </div>
        </>
      );
      break;
    case "imagine-salon":
      caption = "A LITTLE TIME, ENTIRELY YOURS.";
      foot = "SALON EXPERIENCE / DIGITAL PRESENCE";
      body = (
        <>
          <div className="xa-salon-name">
            imagine<span>THE SALON EDIT</span>
          </div>
          <div className="xa-salon-arch">
            <span />
            <i />
            <b />
          </div>
          <div className="xa-salon-comb">
            {Array.from({ length: 12 }, (_, i) => (
              <i key={i} />
            ))}
          </div>
          <div className="xa-salon-copy">
            Good hair.
            <br />
            <em>New energy.</em>
          </div>
          <span className="xa-salon-mark">✳</span>
        </>
      );
      break;
    case "182-rentals":
      caption = "FIND YOUR NEXT LITTLE CORNER.";
      foot = "SPACES / DISCOVERY / CONNECTION";
      body = (
        <>
          <div className="xa-rental-type">
            <strong>182</strong>
            <span>
              ROOM TO
              <br />
              <em>feel at home.</em>
            </span>
          </div>
          <Architecture building />
          <div className="xa-rental-card">
            <b>
              A place for
              <br />
              what comes next.
            </b>
            <span>EXPLORE SPACES ↗</span>
          </div>
        </>
      );
      break;
    case "havmor-menu":
      caption = "A VERY GOOD REASON TO PAUSE.";
      foot = "PRINT DESIGN / MENU / LITTLE DELIGHTS";
      body = (
        <>
          <div className="xa-ice-title">
            One more
            <br />
            <em>happy scoop.</em>
          </div>
          <div className="xa-ice-cone">
            <span className="xa-ice-scoop xa-ice-scoop-one" />
            <span className="xa-ice-scoop xa-ice-scoop-two" />
            <span className="xa-ice-scoop xa-ice-scoop-three" />
            <i />
          </div>
          <div className="xa-ice-menu">
            <span className="xa-micro">THE SWEET EDIT</span>
            <b>
              Pick your
              <br />
              little joy.
            </b>
            <Lines count={4} />
            <span>CREAMY. CRUNCHY. CLASSIC.</span>
          </div>
          <span className="xa-ice-spark">✳</span>
        </>
      );
      break;
    case "reviva":
      caption = "A SECOND LIFE STARTS HERE.";
      foot = "RETURNS / ASSESSMENT / RECOMMERCE";
      body = (
        <>
          <div className="xa-editorial xa-reviva-type">
            A return.
            <br />
            <em>A new beginning.</em>
          </div>
          <svg className="xa-return-orbit" viewBox="0 0 360 300" fill="none">
            <path
              d="M75 169a108 108 0 0 1 190-93m0 0-4-35m4 35-34-1M285 131A108 108 0 0 1 95 224m0 0 3 35m-3-35 35 1"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <div className="xa-return-box">
            <span />
            <b>r.</b>
            <i>↗</i>
          </div>
          <div className="xa-return-tag">
            <b>ANOTHER CHAPTER.</b>
            <span>ASSESS → RESTORE → RELIST</span>
          </div>
        </>
      );
      break;
    case "jobintel":
      caption = "FIND THE NEXT GOOD POSSIBILITY.";
      foot = "DISCOVERY / SHORTLIST / FOLLOW-THROUGH";
      body = (
        <>
          <div className="xa-job-title">
            Less searching.
            <br />
            <em>More direction.</em>
          </div>
          <div className="xa-job-board">
            <div className="xa-job-toolbar">
              <b>j.</b>
              <span>THE OPPORTUNITY DESK</span>
              <i>↗</i>
            </div>
            {["DISCOVER", "MAKE THE SHORTLIST", "NEXT CONVERSATION"].map(
              (label, i) => (
                <div className="xa-job-row" key={label}>
                  <span className={`xa-job-symbol xa-job-symbol-${i}`}>
                    {["✳", "↗", "✓"][i]}
                  </span>
                  <div>
                    <b>{label}</b>
                    <Lines count={1} />
                  </div>
                  <i>→</i>
                </div>
              ),
            )}
          </div>
          <div className="xa-job-bookmark">
            A GOOD
            <br />
            <b>NEXT STEP.</b>
          </div>
        </>
      );
      break;
    case "navpal":
      caption = "EVERY PLACE HAS A WAY IN.";
      foot = "CAMPUS / CONNECTIONS / WAYFINDING";
      body = (
        <>
          <div className="xa-nav-title">
            Find your
            <br />
            <em>way forward.</em>
          </div>
          <svg className="xa-nav-map" viewBox="0 0 450 330" fill="none">
            <g stroke="currentColor" strokeWidth="1.3">
              <path d="m55 220 204 72 140-96-204-72Z" fill="#eeebdf" />
              <path d="m55 174 204 72 140-96-204-72Z" fill="#c4c2dc" />
              <path d="m55 128 204 72 140-96-204-72Z" fill="#f2eee4" />
              <path
                d="m101 144 142-97M158 164l141-97M219 185l140-97M102 95l204 72M149 64l204 72"
                opacity=".28"
              />
              <path
                d="m105 136 58 20 47-31 45 16 49-33"
                stroke="#765e9f"
                strokeWidth="5"
                strokeLinejoin="round"
              />
              <path
                d="m304 108 0 46-49 33v46"
                stroke="#765e9f"
                strokeWidth="3"
                strokeDasharray="5 5"
              />
            </g>
            <circle
              cx="105"
              cy="136"
              r="7"
              fill="#765e9f"
              stroke="#f2eee4"
              strokeWidth="3"
            />
            <circle
              cx="304"
              cy="108"
              r="9"
              fill="#d8ec8a"
              stroke="#765e9f"
              strokeWidth="2"
            />
            <path d="m304 101 3 7-3 7-3-7Z" fill="#765e9f" />
          </svg>
          <span className="xa-nav-point">
            YOU ARE HERE <b>↗</b>
          </span>
          <div className="xa-nav-compass">
            N<span>↑</span>
          </div>
        </>
      );
      break;
    case "nbes-website":
      caption = "A STRONG FOUNDATION, ONLINE.";
      foot = "ENGINEERING / SERVICES / DIGITAL PRESENCE";
      body = (
        <>
          <div className="xa-nbes-title">
            Built for
            <br />
            <em>what’s next.</em>
          </div>
          <svg className="xa-nbes-grid" viewBox="0 0 450 320" fill="none">
            <path
              d="M65 259h330M95 259V85h55v174m0-145h61v145m0-203h62v203m0-115h60v115m0-170h35v170M65 85h330M65 144h330M65 202h330M95 85l55 59-55 58 55 57m61-203 62 88-62 58 62 57m60-170 35 55-35 58 35 57"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <path
              d="M65 56h330M65 56v203M395 56v203"
              stroke="currentColor"
              strokeDasharray="4 5"
              opacity=".4"
            />
            <circle cx="273" cy="56" r="5" fill="#d5e4a4" />
            <circle cx="150" cy="144" r="5" fill="#d5e4a4" />
          </svg>
          <div className="xa-nbes-card">
            <span className="xa-micro">ENGINEERING, IN VIEW.</span>
            <strong>
              Precision.
              <br />
              Purpose.
              <br />
              <em>Presence.</em>
            </strong>
            <Lines count={2} />
          </div>
        </>
      );
      break;
    case "voiceguard":
      caption = "LISTEN CLOSER. SEE THE SIGNAL.";
      foot = "AUDIO / FEATURES / CLASSIFICATION";
      body = (
        <>
          <div className="xa-voice-title">
            Every voice
            <br />
            <em>leaves a signal.</em>
          </div>
          <div className="xa-waveform">
            {[
              14, 24, 38, 20, 49, 68, 36, 81, 57, 92, 71, 44, 65, 33, 49, 74,
              96, 62, 40, 72, 51, 28, 42, 67, 37, 23, 45, 29, 16, 34, 19,
            ].map((height, i) => (
              <i key={i} style={{ height: `${height}%` }} />
            ))}
          </div>
          <div className="xa-voice-readout">
            <span>CAPTURE</span>
            <i>→</i>
            <span>EXTRACT</span>
            <i>→</i>
            <span>CLASSIFY</span>
          </div>
          <div className="xa-voice-disc">
            <span />
            <b>v.</b>
          </div>
        </>
      );
      break;
    case "techlearn":
      caption = "MAKE ROOM FOR THE NEXT IDEA.";
      foot = "COURSES / NOTES / A LITTLE DAILY PROGRESS";
      body = (
        <>
          <div className="xa-learn-title">
            Stay curious.
            <br />
            <em>Keep building.</em>
          </div>
          <div className="xa-learn-book">
            <div className="xa-learn-left">
              <span className="xa-micro">YOUR NEXT CHAPTER</span>
              <strong>
                One idea
                <br />
                at a time.
              </strong>
              <Lines count={4} />
              <b>READ / REFLECT / REPEAT</b>
            </div>
            <div className="xa-learn-right">
              <span>01</span>
              <div className="xa-learn-diagram">
                <i />
                <i />
                <i />
                <b>✳</b>
              </div>
              <Lines count={3} />
              <small>
                A LITTLE UNDERSTANDING
                <br />
                GOES A LONG WAY.
              </small>
            </div>
            <i className="xa-learn-ribbon" />
          </div>
        </>
      );
      break;
    case "campus-hub":
      caption = "YOUR CAMPUS. A LITTLE CLOSER.";
      foot = "EVENTS / FOOD / EVERYDAY CAMPUS LIFE";
      body = (
        <>
          <div className="xa-campus-title">
            Big plans.
            <br />
            <em>Good company.</em>
          </div>
          <div className="xa-campus-calendar">
            <span className="xa-micro">MAKE A LITTLE ROOM.</span>
            <strong>
              THIS WEEK
              <br />
              ON CAMPUS.
            </strong>
            <div className="xa-campus-days">
              {Array.from({ length: 21 }, (_, i) => (
                <i
                  key={i}
                  className={
                    i === 8 || i === 17 ? "xa-campus-day-mark" : undefined
                  }
                >
                  {i === 8 ? "✳" : i === 17 ? "↗" : "·"}
                </i>
              ))}
            </div>
            <b>FIND YOUR NEXT THING. ↗</b>
          </div>
          <div className="xa-campus-ticket">
            <span>YOU’RE INVITED.</span>
            <strong>
              Something
              <br />
              worth showing
              <br />
              <em>up for.</em>
            </strong>
            <i />
            <b>EXPLORE / REGISTER / GO</b>
          </div>
          <span className="xa-campus-star">✳</span>
        </>
      );
      break;
    default:
      caption = "MADE WITH PURPOSE.";
      foot = "IDEAS / SYSTEMS / EXPERIENCES";
      body = (
        <div className="xa-editorial">
          {title}
          <br />
          <em>Built to connect.</em>
        </div>
      );
  }

  return (
    <div className={`work-art xa-art xa-${id}`} aria-hidden="true">
      <span className="xa-caption">{caption}</span>
      {body}
      <span className="xa-foot">{foot}</span>
    </div>
  );
}
