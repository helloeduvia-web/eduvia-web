const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL ||
  '';

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  '';

const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

const destinations = [
  ['UK','2 yr stay-back','↗'],['USA','Top-ranked','★'],['Canada','Pathway options','◈'],['Australia','Feb / Jul intakes','⌁'],
  ['Germany','Low tuition','€'],['Ireland','Tech growth','●'],['New Zealand','Post-study route','＋'],['France','Rich culture','✦'],['Netherlands','English-taught','◎'],
  ['Italy','Design, business & culture','◌'],['Sweden','Innovation & sustainability','✦'],['Finland','Research & technology','◇'],['Denmark','Design & engineering','◆'],['Norway','Energy & marine studies','≈'],
  ['Switzerland','Hospitality & finance','✚'],['Austria','Engineering & music','♫'],['Poland','Affordable EU study','◈'],['Czech Republic','Engineering & medicine','▣'],['Hungary','Medicine & sciences','✚'],['Portugal','Business & technology','◉'],
  ['Spain','Business, design & tourism','☼'],['Japan','Technology & innovation','◈'],['South Korea','Technology & creative industries','●'],['Singapore','Business & computing','▤'],['Malaysia','Affordable regional hub','◇'],['UAE','Business & emerging tech','✦'],
  ['China','Engineering & technology','◐'],['Hong Kong','Finance & business','◆'],['Turkey','Engineering & health','◉'],['Malta','Business & hospitality','＋']
];

const countryFlags = {USA:'🇺🇸',Canada:'🇨🇦',UK:'🇬🇧',Australia:'🇦🇺',Germany:'🇩🇪',Ireland:'🇮🇪','New Zealand':'🇳🇿',France:'🇫🇷',Netherlands:'🇳🇱',Italy:'🇮🇹',Sweden:'🇸🇪',Finland:'🇫🇮',Denmark:'🇩🇰',Norway:'🇳🇴',Switzerland:'🇨🇭',Austria:'🇦🇹',Poland:'🇵🇱','Czech Republic':'🇨🇿',Hungary:'🇭🇺',Portugal:'🇵🇹',Spain:'🇪🇸',Japan:'🇯🇵','South Korea':'🇰🇷',Singapore:'🇸🇬',Malaysia:'🇲🇾',UAE:'🇦🇪',China:'🇨🇳','Hong Kong':'🇭🇰',Turkey:'🇹🇷',Malta:'🇲🇹'};


const intakeCountries = [
  {country:'USA', flag:'🇺🇸', intakes:[['Fall','Aug / Sep','Main'],['Spring','Jan','Secondary']]},
  {country:'Canada', flag:'🇨🇦', intakes:[['Fall','Sep','Main'],['Winter','Jan','Secondary'],['Summer','May','Secondary']]},
  {country:'UK', flag:'🇬🇧', intakes:[['Autumn','Sep / Oct','Main'],['Winter','Jan','Secondary'],['Spring','May','Limited']]},
  {country:'Australia', flag:'🇦🇺', intakes:[['Semester 1','Feb','Main'],['Semester 2','Jul','Main'],['Summer','Nov','Limited']]},
  {country:'Germany', flag:'🇩🇪', intakes:[['Winter','Oct','Main'],['Summer','Apr','Secondary']]},
  {country:'Ireland', flag:'🇮🇪', intakes:[['Autumn','Sep','Main'],['Spring','Jan / Feb','Limited']]},
  {country:'New Zealand', flag:'🇳🇿', intakes:[['Semester 1','Feb','Main'],['Semester 2','Jul','Secondary']]},
  {country:'France', flag:'🇫🇷', intakes:[['Autumn','Sep / Oct','Main'],['Spring','Jan / Feb','Limited']]},
  {country:'Netherlands', flag:'🇳🇱', intakes:[['September','Sep','Main'],['February','Feb','Secondary']]},
  {country:'Italy', flag:'🇮🇹', intakes:[['Autumn','Sep / Oct','Main'],['Spring','Feb','Limited']]},
  {country:'Sweden', flag:'🇸🇪', intakes:[['Autumn','Aug / Sep','Main'],['Spring','Jan','Secondary']]},
  {country:'Finland', flag:'🇫🇮', intakes:[['Autumn','Aug / Sep','Main'],['Spring','Jan','Secondary']]},
  {country:'Denmark', flag:'🇩🇰', intakes:[['Autumn','Sep','Main'],['Spring','Feb','Secondary']]},
  {country:'Norway', flag:'🇳🇴', intakes:[['Autumn','Aug','Main'],['Spring','Jan','Limited']]},
  {country:'Switzerland', flag:'🇨🇭', intakes:[['Autumn','Sep','Main'],['Spring','Feb','Secondary']]},
  {country:'Austria', flag:'🇦🇹', intakes:[['Winter','Oct','Main'],['Summer','Mar','Secondary']]},
  {country:'Poland', flag:'🇵🇱', intakes:[['Winter','Oct','Main'],['Summer','Feb','Secondary']]},
  {country:'Czech Republic', flag:'🇨🇿', intakes:[['Autumn','Sep / Oct','Main'],['Spring','Feb','Secondary']]},
  {country:'Hungary', flag:'🇭🇺', intakes:[['Autumn','Sep','Main'],['Spring','Feb','Secondary']]},
  {country:'Portugal', flag:'🇵🇹', intakes:[['Autumn','Sep / Oct','Main'],['Spring','Feb','Secondary']]},
  {country:'Spain', flag:'🇪🇸', intakes:[['Autumn','Sep / Oct','Main'],['Spring','Feb','Secondary']]},
  {country:'Japan', flag:'🇯🇵', intakes:[['Spring','Apr','Main'],['Autumn','Oct','Secondary']]},
  {country:'South Korea', flag:'🇰🇷', intakes:[['Spring','Mar','Main'],['Fall','Sep','Secondary']]},
  {country:'Singapore', flag:'🇸🇬', intakes:[['August','Aug / Sep','Main'],['January','Jan / Feb','Secondary']]},
  {country:'Malaysia', flag:'🇲🇾', intakes:[['September','Sep / Oct','Main'],['January','Jan'],['May','May']]},
  {country:'UAE', flag:'🇦🇪', intakes:[['September','Sep','Main'],['January','Jan','Secondary'],['May','May','Secondary']]}
];

const intakeMonths = [
  ['January',['Canada','UK','USA','Sweden','Finland','Ireland','Singapore','Malaysia','UAE']],
  ['February',['Australia','New Zealand','Canada','Netherlands','Italy','Denmark','Switzerland','Poland','Hungary','Portugal','Spain','South Korea']],
  ['March',['Germany','Austria','South Korea']],
  ['April',['Germany','Japan']],
  ['May',['Canada','Malaysia','UAE']],
  ['July',['Australia','New Zealand']],
  ['August',['USA','Sweden','Finland','Norway','Singapore']],
  ['September',['USA','Canada','UK','Ireland','Netherlands','Sweden','Finland','Denmark','Switzerland','France','Italy','Spain','Hungary','Portugal','Czech Republic','Singapore','Malaysia','UAE','South Korea']],
  ['October',['UK','Germany','Japan','Austria','Poland','Czech Republic','France','Italy','Spain']]
];


const educationOptions = [
  {title:'After Class 10', desc:'Foundation, diploma and pre-university routes for students planning an international pathway.', tags:['Foundation','Diploma','Pathway']},
  {title:'After Class 12', desc:'Bachelor’s, integrated master’s and undergraduate pathway options across global destinations.', tags:['Bachelor’s','Integrated Master’s','Foundation']},
  {title:'During Bachelor’s', desc:'Semester exchange, transfer, credit mobility and progression opportunities.', tags:['Transfer','Exchange','Credit transfer']},
  {title:'After Bachelor’s', desc:'Master’s, graduate certificates, postgraduate diplomas and professional specialisations.', tags:['Master’s','PG Diploma','Graduate Certificate']},
  {title:'Working Professional', desc:'Executive, conversion, part-time, online and career-switch programs abroad.', tags:['MBA','Executive','Conversion']},
  {title:'Research & PhD', desc:'Research degrees, doctoral pathways and funded academic opportunities.', tags:['MPhil','PhD','Research']},
  {title:'Short & Career Programs', desc:'Certificates, bootcamps, micro-credentials and specialised professional study.', tags:['Certificate','Micro-credential','Bootcamp']}
];

const programCatalog = [
  ['Artificial Intelligence & Machine Learning','Computing & AI',['UK','USA','Canada','Germany','Ireland','Australia']],
  ['Data Science','Computing & AI',['UK','USA','Canada','Germany','Ireland','Netherlands']],
  ['Cybersecurity & Digital Forensics','Computing & AI',['UK','USA','Canada','Australia','Germany','Singapore']],
  ['Quantum Computing','Computing & AI',['UK','USA','Canada','Germany','Netherlands','Japan']],
  ['Robotics & Autonomous Systems','Engineering & Technology',['Germany','Japan','South Korea','USA','UK','Canada']],
  ['Aerospace Engineering','Engineering & Technology',['USA','UK','Germany','France','Canada','Australia']],
  ['Renewable Energy Engineering','Engineering & Technology',['Germany','Denmark','Netherlands','UK','Australia','Sweden']],
  ['Environmental Engineering','Engineering & Technology',['Canada','Germany','Sweden','Netherlands','Australia','New Zealand']],
  ['Biomedical Engineering','Health & Life Sciences',['USA','Canada','UK','Germany','Australia','Singapore']],
  ['Bioinformatics','Health & Life Sciences',['Germany','UK','Netherlands','USA','Canada','Sweden']],
  ['Computational Neuroscience','Health & Life Sciences',['UK','USA','Germany','Netherlands','Canada','Switzerland']],
  ['Genomics & Precision Medicine','Health & Life Sciences',['UK','USA','Canada','Australia','Singapore','Germany']],
  ['Public Health & Epidemiology','Health & Life Sciences',['UK','USA','Canada','Australia','New Zealand','Ireland']],
  ['Health Informatics','Health & Life Sciences',['UK','Canada','USA','Ireland','Australia','Germany']],
  ['Prosthetics & Orthotics','Health & Life Sciences',['UK','Australia','Canada','USA','New Zealand','Germany']],
  ['Marine Biology & Ocean Science','Science & Environment',['Australia','New Zealand','Norway','UK','Canada','USA']],
  ['Astrobiology & Space Science','Science & Environment',['USA','UK','Germany','France','Japan','Netherlands']],
  ['Climate Science','Science & Environment',['Germany','Sweden','Finland','Norway','Canada','UK']],
  ['Geospatial Science & GIS','Science & Environment',['UK','Canada','Australia','New Zealand','Netherlands','Germany']],
  ['Food Technology & Food Science','Science & Environment',['Netherlands','Germany','Denmark','Australia','UK','Canada']],
  ['Actuarial Science','Business & Finance',['UK','Canada','Australia','USA','Ireland','Singapore']],
  ['FinTech & Financial Analytics','Business & Finance',['UK','Singapore','Ireland','Canada','USA','Switzerland']],
  ['Supply Chain & Logistics Analytics','Business & Finance',['Netherlands','Germany','Canada','UK','Australia','Singapore']],
  ['Business Analytics','Business & Finance',['UK','Ireland','Canada','Australia','USA','Netherlands']],
  ['Luxury Brand Management','Business & Creative Industries',['France','Italy','UK','Switzerland','Spain','UAE']],
  ['Sports Analytics & Management','Business & Creative Industries',['UK','USA','Canada','Australia','Germany','Spain']],
  ['UX/UI & Human-Computer Interaction','Design & Creative',['UK','USA','Canada','Netherlands','Sweden','Germany']],
  ['Game Design & Interactive Media','Design & Creative',['UK','Canada','USA','Japan','South Korea','Australia']],
  ['Animation & VFX','Design & Creative',['Canada','UK','USA','Australia','France','Japan']],
  ['Film & Screen Production','Design & Creative',['UK','USA','Canada','Australia','Ireland','New Zealand']],
  ['Music Technology & Audio Production','Design & Creative',['UK','USA','Canada','Australia','Germany','Netherlands']],
  ['Architecture & Urban Planning','Built Environment',['UK','Netherlands','Germany','Australia','Canada','USA']],
  ['Smart Cities & Urban Analytics','Built Environment',['Netherlands','UK','Germany','Singapore','Canada','Australia']],
  ['Construction Management','Built Environment',['UK','Australia','Canada','USA','New Zealand','Ireland']],
  ['International Development','Social Sciences & Policy',['UK','Netherlands','Germany','Sweden','Canada','Australia']],
  ['International Relations & Diplomacy','Social Sciences & Policy',['UK','France','Germany','Switzerland','Netherlands','USA']],
  ['Behavioural Economics','Social Sciences & Policy',['UK','USA','Netherlands','Germany','Canada','Australia']],
  ['Educational Technology','Education & Psychology',['UK','USA','Canada','Australia','Finland','Ireland']],
  ['Clinical Psychology','Education & Psychology',['UK','Australia','Canada','USA','New Zealand','Ireland']],
  ['Hospitality & Hotel Management','Hospitality & Tourism',['Switzerland','France','Australia','UK','Spain','UAE']],
  ['Tourism & Destination Management','Hospitality & Tourism',['Australia','New Zealand','Spain','France','UK','Portugal']],
  ['Aviation Management','Hospitality & Tourism',['UK','Australia','Canada','UAE','Singapore','Netherlands']],
  ['Maritime Management','Transport & Logistics',['Norway','Netherlands','UK','Denmark','Singapore','Germany']],
  ['Renewable Energy Policy','Sustainability & Policy',['Germany','Denmark','Sweden','Netherlands','UK','Finland']],
  ['Sustainability & ESG','Sustainability & Policy',['UK','Netherlands','Germany','Sweden','Canada','Australia']],
  ['Circular Economy','Sustainability & Policy',['Netherlands','Finland','Sweden','Germany','Denmark','UK']],
  ['Agricultural Technology (AgriTech)','Science & Technology',['Netherlands','Australia','Canada','UK','Germany','New Zealand']],
  ['Fermentation Science & Brewing','Science & Technology',['Germany','Netherlands','Denmark','UK','Australia','Canada']],
  ['Forensic Science','Science & Technology',['UK','USA','Australia','Canada','Netherlands','New Zealand']],
  ['Nanotechnology','Science & Technology',['Germany','Japan','USA','UK','Canada','Australia']],
  ['Materials Science','Science & Technology',['Germany','Japan','Sweden','USA','UK','Canada']],
  ['Advanced Manufacturing','Engineering & Technology',['Germany','Japan','South Korea','Netherlands','USA','Canada']],
  ['Mechatronics','Engineering & Technology',['Germany','Netherlands','Japan','Australia','Canada','UK']],
  ['Industrial Design','Design & Creative',['Italy','Germany','Netherlands','UK','Sweden','France']],
  ['Fashion Technology & Sustainable Fashion','Design & Creative',['Italy','France','UK','Netherlands','Sweden','Germany']],
  ['Digital Marketing & MarTech','Business & Creative Industries',['UK','USA','Canada','Australia','Ireland','Singapore']],
  ['Product Management','Business & Technology',['UK','USA','Canada','Ireland','Australia','Singapore']],
  ['Entrepreneurship & Innovation','Business & Technology',['UK','USA','Canada','Netherlands','Singapore','Australia']],
  ['Health & Safety / Occupational Safety','Health & Life Sciences',['UK','Australia','Canada','New Zealand','Ireland','Germany']]
];

const programGroups = [...new Set(programCatalog.map(x=>x[1]))];

const assessmentQuestions = [
  { label:'Where are you in your education journey?', hint:'Choose the option that best matches you today.', options:['12th / High School','Bachelor’s Student','Graduate / Master’s','Working Professional'] },
  { label:'What do you want to study or build a career in?', hint:'Pick the closest area — you can refine it later.', options:['Computer Science / IT','Data / AI','Cybersecurity','Engineering / Robotics','Business / Finance','Healthcare / Life Sciences','Science / Environment','Design / Creative','Hospitality / Tourism','Social Sciences / Policy','Rare / Emerging Course','Not sure — show me options'] },
  { label:'What can you realistically plan for your first year?', hint:'A practical budget helps us suggest countries that are financially realistic.', options:['Under ₹15 lakh','₹15–25 lakh','₹25–40 lakh','₹40 lakh+','I need funding guidance'] },
  { label:'How comfortable are you with English for study?', hint:'This helps us identify whether you may need an English test or preparation support.', options:['Already have a test score','Comfortable, test not taken','Need some preparation','Not sure yet'] },
  { label:'Where and when would you like to study?', hint:'You can choose “not sure” and let Eduvia guide the next step.', options:['UK / Europe','USA / Canada','Australia / New Zealand','Asia / UAE','Not sure — recommend for me'] }
];

function Icon({name}){
  const paths={
    arrow:'M5 12h14M13 6l6 6-6 6', check:'M5 12l4 4L19 6', globe:'M12 2a10 10 0 1 0 0 20a10 10 0 0 0 0-20ZM2 12h20M12 2c3 3.1 4.2 6.4 4.2 10S15 18.9 12 22c-3-3.1-4.2-6.4-4.2-10S9 5.1 12 2Z', spark:'M12 2l1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6L12 2Z', menu:'M4 7h16M4 12h16M4 17h16'};
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d={paths[name]||paths.spark}/></svg>
}

function App(){
  const [view,setView]=useState('home');
  const [assessment,setAssessment]=useState(false);
  const [step,setStep]=useState(0);
  const [answers,setAnswers]=useState({});
  const [mobile,setMobile]=useState(false);
  const [login,setLogin]=useState(false);
  const [studentName,setStudentName]=useState('Revathi');

  const progress=Math.round(((step+1)/assessmentQuestions.length)*100);
  const selected=answers[step];
  const current=assessmentQuestions[step];

  const go=(id)=>{ setView(id); window.scrollTo({top:0,behavior:'smooth'}); setMobile(false); };

  return <>
    <header className="nav">
      <div className="container nav-inner">
        <button className="brand" onClick={()=>go('home')} aria-label="Eduvia home"><img src="/assets/eduvia-logo.png" alt="Eduvia" /></button>
        <nav className={mobile?'open':''} aria-label="Primary navigation">
          <button className={view==='home'?'active':''} aria-current={view==='home'?'page':undefined} onClick={()=>go('home')}>For Students</button>
          <button className={view==='destinations'?'active':''} aria-current={view==='destinations'?'page':undefined} onClick={()=>go('destinations')}>Destinations</button><button className={view==='intakes'?'active':''} aria-current={view==='intakes'?'page':undefined} onClick={()=>go('intakes')}>Intakes</button><button className={view==='programs'?'active':''} aria-current={view==='programs'?'page':undefined} onClick={()=>go('programs')}>Programs</button>
          <button className={view==='dashboard'?'active':''} aria-current={view==='dashboard'?'page':undefined} onClick={()=>go('dashboard')}>Dashboard</button>
        </nav>
        <div className="nav-actions">
          <button className={login?'link-btn active-action':'link-btn'} onClick={()=>setLogin(true)} aria-current={login?'page':undefined}>Login</button>
          <button className="primary small" onClick={()=>setAssessment(true)}>Get Started <Icon name="arrow"/></button>
        </div>
        <button className="menu-btn" onClick={()=>setMobile(!mobile)}><Icon name="menu"/></button>
      </div>
    </header>

    {view==='home' && <Home go={go} openAssessment={()=>setAssessment(true)}/>} 
    {view==='destinations' && <Destinations openAssessment={()=>setAssessment(true)}/>} 
    {view==='intakes' && <Intakes openAssessment={()=>setAssessment(true)}/>}
    {view==='programs' && <Programs openAssessment={()=>setAssessment(true)}/>} 
    {view==='dashboard' && <Dashboard studentName={studentName}/>}

    <footer><div className="container footer-grid"><div><div className="footer-brand"><img src="/assets/eduvia-logo.png" alt="Eduvia" /></div><p>Delivering Opportunities</p><small className="footer-trust">Student-first guidance from India to the world.</small></div><div><b>Explore</b><span>Destinations</span><span>Programs & rare courses</span><span>Universities</span><span>Intake calendar</span></div><div><b>My Journey</b><span>Free assessment</span><span>Student dashboard</span><span>My documents</span><span>My applications</span></div><div><b>Support</b><span>Book counselling</span><span>Privacy</span><span>Terms</span><span>Contact Eduvia</span></div></div><div className="container footer-bottom">© 2026 Eduvia · Delivering Opportunities · Student platform</div></footer>

    {login && <LoginModal onClose={()=>setLogin(false)} onStudentName={setStudentName} />}

    {assessment && <div className="modal-backdrop" onMouseDown={(e)=>e.target===e.currentTarget&&setAssessment(false)}><div className="assessment-modal">
      <div className="modal-head"><div><span className="eyebrow">FREE STUDY ABROAD PROFILE ASSESSMENT</span><h2>{step<5?current.label:'Your study-abroad snapshot is ready.'}</h2>{step<5 && <p className="assessment-hint">{current.hint}</p>}</div><button className="close" onClick={()=>setAssessment(false)}>×</button></div>
      {step<5 ? <>
        <div className="progress"><span style={{width:`${progress}%`}}></span></div><div className="step-copy">Step {step+1} of 5 <span>{progress}%</span></div>
        <div className="options">{current.options.map(o=><button key={o} className={selected===o?'selected':''} onClick={()=>setAnswers({...answers,[step]:o})}>{selected===o?<span className="check">✓</span>:<span className="radio"/>}{o}</button>)}</div>
        <div className="modal-foot"><button className="ghost" onClick={()=>step>0&&setStep(step-1)} disabled={step===0}>Back</button><button className="primary" disabled={!selected} onClick={()=>setStep(step+1)}>{step===4?'View My Study-Abroad Snapshot':'Continue'} <Icon name="arrow"/></button></div>
      </> : <Result answers={answers} onClose={()=>setAssessment(false)}/>} 
    </div></div>}
  </>
}

function Home({go,openAssessment}){return <main>
  <section className="hero"><div className="container hero-grid"><div className="hero-copy"><span className="eyebrow">GUIDED GLOBAL STUDY ABROAD PLATFORM</span><h1>Make your study-abroad journey <em>clearer.</em></h1><p>Discover the right destination, course and next step through one guided journey built around your profile.</p><div className="hero-buttons"><button className="primary" onClick={openAssessment}>Start Free Assessment <Icon name="arrow"/></button><button className="secondary" onClick={()=>go('destinations')}>Explore Destinations</button></div><div className="trust-row"><span><Icon name="check"/> 5 focused questions</span><span><Icon name="check"/> Immediate value</span><span><Icon name="check"/> Personalised pathway</span></div></div><div className="hero-media"><img className="hero-photo" src="/assets/hero-student-discussion.jpg" alt="Three university students collaborating together"/><div className="float-card"><span>Profile readiness</span><strong>82 <small>/ 100</small></strong><div className="mini-bar"><i/></div></div></div></div></section>
  <section className="country-flag-strip"><div className="container"><div className="flag-strip-head"><div><span className="eyebrow">GLOBAL DESTINATIONS</span><h2>Study in the countries that match <em>your ambition.</em></h2></div><button className="secondary" onClick={()=>go('destinations')}>View all destinations <Icon name="arrow"/></button></div><div className="flag-strip-grid">{['USA','Canada','UK','Australia','Germany','France','Italy','Japan','Netherlands','Singapore','UAE'].map(c=><button key={c} className="flag-country" onClick={()=>go('destinations')}><span className="flag-country-emoji">{countryFlags[c]}</span><b>{c}</b></button>)}</div><div className="global-visuals"><article className="global-visual-card"><img src="/assets/global-landmarks.jpg" alt="Global city landmarks and study destinations"/><div className="overlay"><span>ONE WORLD. MANY PATHS.</span><h3>Compare destinations with a clearer picture.</h3><p>Use country, budget and intake signals to narrow your next move.</p></div></article><article className="global-visual-card"><img src="/assets/airport-student.jpg" alt="Student preparing to travel abroad"/><div className="overlay"><span>FROM INDIA TO THE WORLD</span><h3>Make the journey feel real.</h3><p>Plan study, travel and application milestones from one student workspace.</p></div></article></div></div></section>
  <section className="stats"><div className="container stats-grid"><div><strong>01</strong><span>Profile</span></div><div><strong>02</strong><span>Discover</span></div><div><strong>03</strong><span>Plan</span></div><div><strong>04</strong><span>Apply</span></div></div></section>
  <section className="trust-strip"><div className="container trust-strip-inner"><div className="trust-lead"><span className="trust-shield">✓</span><div><b>Built for confident study-abroad decisions</b><span>Clear guidance, transparent expectations and a student-first journey.</span></div></div><div className="trust-points"><span>✓ Profile-based recommendations</span><span>✓ Mobile verification available</span><span>✓ No admission or visa guarantees</span></div></div></section>
  <section className="section trust-section"><div className="container"><div className="trust-header"><div><span className="eyebrow">WHY STUDENTS CAN TRUST THE JOURNEY</span><h2>Less guesswork. <em>More confidence.</em></h2></div><p>Choosing a country, course and university is a major decision. Eduvia makes the process easier to understand without pretending there is a one-size-fits-all answer.</p></div><div className="trust-grid"><div className="trust-card"><div className="trust-icon">✓</div><b>Personalised, not generic</b><p>Your academic profile, preferences and goals shape the recommendations you see.</p></div><div className="trust-card"><div className="trust-icon">◈</div><b>Transparent next steps</b><p>See what you need to do next instead of navigating a maze of disconnected advice.</p></div><div className="trust-card"><div className="trust-icon">⌁</div><b>Student-first guidance</b><p>Explore destinations and pathways before deciding whether you want expert support.</p></div><div className="trust-card"><div className="trust-icon">✓</div><b>Clear expectations</b><p>Recommendations are starting points, not promises of admission, scholarships or visas.</p></div></div><div className="trust-cta"><div><span className="eyebrow">READY TO GET CLARITY?</span><h3>Start with five focused questions.</h3><p>Get immediate preliminary insight before you commit to a longer process.</p></div><button className="primary" onClick={openAssessment}>Check My Fit <Icon name="arrow"/></button></div></div></section>
  <section className="section problem"><div className="container"><div className="section-intro"><span className="eyebrow">THE PROBLEM</span><h2>Study-abroad decisions are high stakes. <em>The journey shouldn’t feel fragmented.</em></h2><p>Students need personalised guidance, realistic planning and one clear place to understand what to do next.</p></div><div className="problem-grid">{[['Country fit','Students cannot map profile to destination'],['Course & university','Too many options, too little context'],['True total budget','Costs stay unclear until late'],['Application journey','No visible sequence or milestones'],['Generic guidance','One-size-fits-all advice can miss your goals and constraints'],['Scattered information','Important decisions get buried across websites, chats and spreadsheets']].map(([a,b])=><div className="problem-card" key={a}><span>{a}</span><p>{b}</p></div>)}</div></div></section>
  <section className="section solution"><div className="container"><div className="section-intro center"><span className="eyebrow">OUR SOLUTION</span><h2>One guided journey. <em>One persistent profile.</em></h2><p>Transforms academic and personal data into a structured study-abroad profile and personalised pathway.</p></div><div className="journey">{['Student Profile','Assessment','Country Discovery','Course Discovery','University Discovery','Personalised Roadmap','Expert Connection'].map((x,i)=><div className="journey-step" key={x}><div className="step-number">{String(i+1).padStart(2,'0')}</div><b>{x}</b>{i<6&&<span className="connector"/>}</div>)}</div></div></section>
  <section className="section destination-preview"><div className="container"><div className="section-row"><div><span className="eyebrow">EXPLORE DESTINATIONS</span><h2>One platform. <em>Multiple destinations.</em></h2><p>Not sure? Let the platform recommend the best-fit destinations.</p></div><button className="secondary" onClick={()=>go('destinations')}>Explore all destinations <Icon name="arrow"/></button></div><div className="destination-grid">{destinations.map(([c,t,i])=><div className="destination-card" key={c}><div className="country-icon flag-icon">{countryFlags[c]||'🌍'}</div><div><strong>{c}</strong><span>{t}</span></div><Icon name="arrow"/></div>)}</div></div></section>
  <section className="section global-story"><div className="container"><div className="section-row"><div><span className="eyebrow">THE EDUVIA JOURNEY</span><h2>See the journey. <em>Understand the next step.</em></h2><p>Real-world context helps you compare destinations and picture what your international study journey can look like.</p></div></div><div className="story-grid student-story-grid"><article className="story-card story-wide"><img src="/assets/graduation-student.jpg" alt="University graduates celebrating together"/><div><span>GLOBAL COMMUNITY</span><h3>Think beyond borders.</h3><p>Explore destinations, people and opportunities around the world from one student-first platform.</p></div></article><article className="story-card"><img src="/assets/library-study.jpg" alt="University students on campus together"/><div><span>DESTINATIONS</span><h3>Find your place in the world.</h3><p>Compare countries with a clearer view of fit, timing and pathways.</p></div></article></div></div></section>
  <section className="section intake-preview"><div className="container"><div className="section-row"><div><span className="eyebrow">INTAKE EXPLORER</span><h2>Know <em>when to apply.</em></h2><p>Compare country-wise intake patterns, discover upcoming application windows and plan your next move from anywhere in India.</p></div><button className="secondary" onClick={()=>go('intakes')}>Explore all intakes <Icon name="arrow"/></button></div><div className="intake-month-strip">{intakeMonths.slice(0,6).map(([month,countries])=><button key={month} onClick={()=>go('intakes')}><b>{month}</b><span>{countries.length} destinations</span></button>)}</div><div className="intake-highlight"><div><span className="eyebrow">NEXT MAJOR WINDOW</span><h3>Plan your next intake with confidence</h3><p>Use the calendar as a planning guide. Exact deadlines vary by university, course and country.</p></div><div className="status-legend"><span><i className="status-dot open"/>Open / active</span><span><i className="status-dot soon"/>Closing soon</span><span><i className="status-dot closed"/>Closed</span></div></div></div></section>
  <section className="section assessment-promo"><div className="container assessment-card"><div><span className="eyebrow">FREE STUDY ABROAD PROFILE ASSESSMENT</span><h2>Five practical questions.<br/><em>A clearer next step.</em></h2><p>Answer simple questions about your study stage, goals, budget and English readiness. You will get a practical starting point you can use immediately.</p><button className="primary" onClick={openAssessment}>Start My Free Assessment <Icon name="arrow"/></button></div><div className="phone-mock"><div className="phone-top">Step 3 of 5</div><div className="phone-line"><i/></div><small>PRACTICAL PROFILE SNAPSHOT</small><strong>82 <span>/ 100</span></strong><div className="phone-tags"><span>Strong academics</span><span>Good budget readiness</span><span>English needs attention</span></div></div></div></section>
  <section className="section intelligence"><div className="container intelligence-grid"><div><span className="eyebrow">PERSONALISED PROFILE INTELLIGENCE</span><h2>Turn raw profile data into <em>actionable next steps.</em></h2><p>Simple profile signals help you understand fit, readiness and the actions that can improve your options.</p><div className="score-row"><div><span>Profile Readiness</span><strong>82 <small>/ 100</small></strong></div><div><span>Intent Score</span><strong>91 <small>/ 100</small></strong></div></div></div><div className="intelligence-panel"><div className="hot-badge">HOT</div><div className="score-ring"><span>82</span><small>readiness</small></div><div className="signal-list"><span><i/>Academics <b>Strong</b></span><span><i/>Budget Readiness <b>Good</b></span><span><i/>English Readiness <b>Needs Attention</b></span><span><i/>Application Readiness <b>Moderate</b></span></div><div className="recommendations"><b>Potential destinations</b><span>Germany — Strong Potential</span><span>UK — Good Potential</span><span>Ireland — Good Potential</span></div></div></div></section>
  <section className="section dashboard-promo"><div className="container"><div className="section-row"><div><span className="eyebrow">STUDENT DASHBOARD</span><h2>One calm workspace for <em>every milestone.</em></h2><p>From profile to pre-departure, keep your next action visible.</p></div><button className="secondary" onClick={()=>go('dashboard')}>Open My Dashboard <Icon name="arrow"/></button></div><Dashboard compact/></div></section>
</main>}

function Destinations({openAssessment}){return <main className="inner-page"><section className="inner-hero visual-inner-hero"><div className="container inner-hero-grid"><div><span className="eyebrow">DESTINATION DISCOVERY</span><h1>Find where your profile <em>fits best.</em></h1><p>Explore the destinations surfaced in the Eduvia platform, then use the assessment to get a personalised recommendation.</p><button className="primary" onClick={openAssessment}>Get My Recommendation <Icon name="arrow"/></button></div><div className="inner-hero-image"><img src="/assets/hero-student-discussion.jpg" alt="University students studying together"/></div></div></section><section className="section"><div className="container"><div className="destination-grid large">{destinations.map(([c,t,i])=><div className="destination-card big" key={c}><div className="country-icon flag-icon">{countryFlags[c]||'🌍'}</div><div><strong>{c}</strong><span>{t}</span></div><Icon name="arrow"/></div>)}</div><p className="disclaimer">Recommendations are preliminary and do not guarantee admission or visa approval.</p></div></section></main>}


function Intakes({openAssessment}){
  const [year,setYear]=useState('2026');
  const [country,setCountry]=useState('All');
  const [month,setMonth]=useState('All');
  const [level,setLevel]=useState('All');
  const [query,setQuery]=useState('');
  const countries=country==='All'?intakeCountries:intakeCountries.filter(x=>x.country===country);
  const filtered=countries.filter(item=>{
    const text=item.country+' '+item.intakes.map(x=>x.join(' ')).join(' ');
    const monthOk=month==='All'||text.toLowerCase().includes(month.toLowerCase());
    const levelOk=level==='All'||true;
    return monthOk && levelOk && (!query || text.toLowerCase().includes(query.toLowerCase()));
  });
  return <main className="inner-page intake-page">
    <section className="inner-hero intake-hero visual-inner-hero"><div className="container inner-hero-grid"><div><span className="eyebrow">INTAKE EXPLORER · ALL DESTINATIONS</span><h1>Find the right <em>intake.</em></h1><p>Country-wise intake calendars, application timing and planning signals in one place.</p>
      <div className="intake-hero-actions"><button className="primary" onClick={openAssessment}>Find My Best Intake <Icon name="arrow"/></button><span>Available for students across India. Dates are planning guidance; university and program deadlines can differ.</span></div>
    </div><div className="inner-hero-image"><img src="/assets/airport-student.jpg" alt="Students studying together on campus"/></div></div></section>
    <section className="section intake-tool"><div className="container">
      <div className="intake-filters">
        <label>Planning year<select value={year} onChange={e=>setYear(e.target.value)}><option>2026</option><option>2027</option><option>2028</option></select></label>
        <label>Country<select value={country} onChange={e=>setCountry(e.target.value)}><option>All</option>{intakeCountries.map(x=><option key={x.country}>{x.country}</option>)}</select></label>
        <label>Intake month<select value={month} onChange={e=>setMonth(e.target.value)}><option>All</option>{intakeMonths.map(x=><option key={x[0]}>{x[0]}</option>)}</select></label>
        <label>Study level<select value={level} onChange={e=>setLevel(e.target.value)}><option>All</option><option>Foundation / Pathway</option><option>Diploma</option><option>Bachelor's</option><option>Graduate Certificate</option><option>Master's</option><option>MBA / Executive</option><option>PhD</option><option>Short Course</option></select></label>
        <label className="search-filter">Search<input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Country or intake"/></label>
      </div>
      <div className="intake-summary"><div><b>{filtered.length}</b><span>countries matched</span></div><div><b>{year}</b><span>planning year</span></div><div><b>Open</b><span>check university deadlines</span></div></div>
      <div className="intake-calendar"><div className="section-row compact-row"><div><span className="eyebrow">MONTHLY VIEW</span><h2>Plan by <em>intake season.</em></h2></div></div><div className="month-grid">{intakeMonths.map(([m,cs])=><button key={m} className={month===m?'active':''} onClick={()=>setMonth(month===m?'All':m)}><b>{m}</b><span>{cs.length} countries</span></button>)}</div></div>
      <div className="country-intake-grid">{filtered.map(item=><article className="country-intake-card" key={item.country}><div className="country-intake-head"><div className="country-badge">{item.flag}</div><div><h3>{item.country}</h3><span>{item.intakes.length} intake windows · {year}</span></div><span className="open-pill">● Explore</span></div><div className="intake-rows">{item.intakes.map(([name,when,type])=><div className="intake-row" key={name+when}><div><b>{name} Intake</b><span>{when}</span></div><span className={type==='Main'?'main-pill':'secondary-pill'}>{type}</span><button onClick={openAssessment}>Check Fit <Icon name="arrow"/></button></div>)}</div><div className="intake-card-foot"><span>Typical timing only</span><b>University deadlines vary</b></div></article>)}</div>
      <div className="intake-alert"><div><span className="eyebrow">DEADLINE ALERTS</span><h3>Never miss a closing window.</h3><p>Eduvia can use your profile and preferred intake to surface closing-soon applications and the next best action.</p></div><button className="primary" onClick={openAssessment}>Get Intake Alerts <Icon name="arrow"/></button></div>
    </div></section>
  </main>
}


function Programs({openAssessment}){
  const [query,setQuery]=useState('');
  const [group,setGroup]=useState('All');
  const [country,setCountry]=useState('All');
  const [level,setLevel]=useState('All');
  const countries=[...new Set(programCatalog.flatMap(x=>x[2]))].sort();
  const levels=['All','After Class 10','After Class 12 / Bachelor’s','Postgraduate','Working Professional','Research / PhD','Short / Certificate'];
  const filtered=programCatalog.filter(([name,g,countriesList])=>{
    const text=(name+' '+g+' '+countriesList.join(' ')).toLowerCase();
    const q=!query||text.includes(query.toLowerCase());
    const gOk=group==='All'||g===group;
    const cOk=country==='All'||countriesList.includes(country);
    return q&&gOk&&cOk;
  });
  return <main className="inner-page programs-page">
    <section className="inner-hero visual-inner-hero"><div className="container inner-hero-grid"><div><span className="eyebrow">PROGRAM DISCOVERY · INDIA TO THE WORLD</span><h1>Explore more ways to <em>study abroad.</em></h1><p>From mainstream degrees to rare and emerging specialisations, discover realistic education pathways from India to global destinations.</p><div className="intake-hero-actions"><button className="primary" onClick={openAssessment}>Find My Course Fit <Icon name="arrow"/></button><span>Course availability, fees and eligibility vary by university. Use this as a discovery layer, then verify the official university requirements.</span></div></div><div className="inner-hero-image"><img src="/assets/library-study.jpg" alt="University students collaborating together"/></div></div></section>
    <section className="section"><div className="container"><div className="section-row"><div><span className="eyebrow">EDUCATION OPTIONS</span><h2>Choose the route that matches <em>your stage.</em></h2><p>Not every student needs the same qualification. Compare pathways before choosing a destination.</p></div></div><div className="education-option-grid">{educationOptions.map(x=><article className="education-option" key={x.title}><span className="option-icon">✦</span><h3>{x.title}</h3><p>{x.desc}</p><div>{x.tags.map(t=><span key={t}>{t}</span>)}</div></article>)}</div></div></section>
    <section className="section programs-catalog"><div className="container"><div className="section-row"><div><span className="eyebrow">COURSE CATALOG · {programCatalog.length}+ IDEAS</span><h2>Popular, specialised and <em>rare courses.</em></h2><p>Search by subject or destination and see where each course commonly appears.</p></div></div><div className="program-filters"><label>Search<input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Try quantum computing, marine biology, luxury…"/></label><label>Area<select value={group} onChange={e=>setGroup(e.target.value)}><option>All</option>{programGroups.map(x=><option key={x}>{x}</option>)}</select></label><label>Country<select value={country} onChange={e=>setCountry(e.target.value)}><option>All</option>{countries.map(x=><option key={x}>{x}</option>)}</select></label><label>Study route<select value={level} onChange={e=>setLevel(e.target.value)}>{levels.map(x=><option key={x}>{x}</option>)}</select></label></div><div className="program-summary"><b>{filtered.length}</b><span>courses matching your filters</span><b>{countries.length}</b><span>destination countries</span></div><div className="program-grid">{filtered.map(([name,g,c])=><article className="program-card" key={name}><div className="program-top"><span>{g}</span><b>Explore</b></div><h3>{name}</h3><p>Common destinations</p><div className="program-country-list">{c.slice(0,6).map(x=><span key={x}>{x}</span>)}</div><button className="secondary" onClick={openAssessment}>Check my fit <Icon name="arrow"/></button></article>)}</div></div></section>
    <section className="section pathway-section"><div className="container"><div className="pathway-banner"><div><span className="eyebrow">FROM INDIA · MORE POSSIBILITIES</span><h2>Compare degree, diploma, transfer and research routes.</h2><p>Use Eduvia to start broad, then narrow down by academic profile, budget, English readiness, preferred country and career direction.</p></div><button className="primary" onClick={openAssessment}>Build My Pathway <Icon name="arrow"/></button></div></div></section>
  </main>
}

function Dashboard({compact=false,studentName='Revathi'}){return <section className={compact?'dash-shell compact':'inner-page dash-page'}><div className="container"><div className="dash-head"><div><span className="eyebrow">STUDENT DASHBOARD</span><h2>Good morning, {studentName}</h2><p>Your next best action is ready.</p></div><div className="dash-score"><span>Profile readiness</span><b>82/100</b></div></div><div className="dash-progress">{['Profile','Shortlist','Application','Offer','Visa Prep','Pre-Departure'].map((x,i)=><div className={i<2?'active':''} key={x}><span>{i+1}</span>{x}</div>)}</div>{!compact&&<div className="dashboard-story"><img src="/assets/library-study.jpg" alt="University students walking through campus"/><div><span className="eyebrow">YOUR NEXT MILESTONE</span><h3>Keep preparation connected.</h3><p>From documents and funding to your departure plan, see the next action without losing sight of the bigger journey.</p><div className="dashboard-data-pills"><span>Profile 82%</span><span>Documents 6/8</span><span>Shortlist 6</span></div></div></div>}<div className="dash-grid"><div className="dash-main"><div className="dash-card"><div className="card-title"><b>Next best action</b><span>Recommended for you</span></div><h3>Complete English test details</h3><p>Add your English test status so Eduvia can make university recommendations more practical and relevant.</p><button className="secondary">Complete now <Icon name="arrow"/></button></div><div className="dash-card"><div className="card-title"><b>My shortlist</b><span>6 universities · 3 countries</span></div><div className="uni-list">{['Germany · Data Science','UK · Business Analytics','Ireland · Artificial Intelligence'].map((x,i)=><div key={x}><span>{i+1}</span><b>{x}</b><small>View details →</small></div>)}</div></div><div className="dashboard-data-grid"><div className="dash-card mini-data"><b>Documents</b><strong>6 / 8</strong><span>2 items need attention</span></div><div className="dash-card mini-data"><b>Applications</b><strong>2 active</strong><span>Next deadline in 18 days</span></div><div className="dash-card mini-data"><b>Counselling</b><strong>1 session</strong><span>Book or reschedule anytime</span></div></div></div><div className="dash-side"><div className="dash-card nav-card"><b>My student workspace</b>{['My Profile','My Countries','My Courses','My Shortlist','My Roadmap','My Documents','My Applications','My Counselling'].map((x,i)=><button key={x} className={i===0?'selected':''}>{x}<span>›</span></button>)}</div><div className="dash-card dashboard-trust"><span className="eyebrow">STUDENT-ONLY ACCESS</span><h3>Your data stays in your journey.</h3><p>Keep your profile, shortlist, documents and application progress together so every recommendation has context.</p></div></div></div></div></section>}
function LoginModal({onClose,onStudentName}){
  const [mode,setMode]=useState('signup');
  const [form,setForm]=useState({
    name:'',
    email:'',
    password:'',
    phone:''
  });
  const [message,setMessage]=useState('');
  const [saving,setSaving]=useState(false);

  const update=(key,value)=>{
    setForm(prev=>({...prev,[key]:value}));
  };

  const saveStudentProfile=async(user)=>{
    if(!supabase || !user) return;

    const {error}=await supabase
      .from('students')
      .upsert({
        auth_user_id:user.id,
        full_name:form.name.trim() || user.user_metadata?.full_name || 'Student',
        email:user.email || form.email.trim(),
        mobile:form.phone.trim() || user.user_metadata?.mobile || '',
        updated_at:new Date().toISOString()
      },{
        onConflict:'auth_user_id'
      });

    if(error) throw error;
  };

  const submit=async(e)=>{
    e.preventDefault();
    setMessage('');
    setSaving(true);

    try{
      if(!supabase){
        throw new Error('Supabase connection is missing.');
      }

      if(mode==='signup'){
        const {data,error}=await supabase.auth.signUp({
          email:form.email.trim(),
          password:form.password,
          options:{
            data:{
              full_name:form.name.trim(),
              mobile:form.phone.trim()
            }
          }
        });

        if(error) throw error;
        if(!data.user) throw new Error('Unable to create your account.');

        await saveStudentProfile(data.user);

        onStudentName?.(form.name.trim() || 'Student');

        setMessage(
          'Account created successfully. Your Eduvia student profile is ready.'
        );
      }else{
        const {data,error}=await supabase.auth.signInWithPassword({
          email:form.email.trim(),
          password:form.password
        });

        if(error) throw error;

        if(data.user){
          const {data:profile}=await supabase
            .from('students')
            .select('full_name')
            .eq('auth_user_id',data.user.id)
            .maybeSingle();

          onStudentName?.(
            profile?.full_name ||
            data.user.user_metadata?.full_name ||
            'Student'
          );
        }

        setMessage('Welcome back. You are now signed in to Eduvia.');
      }
    }catch(err){
      setMessage(err?.message || 'Unable to continue.');
    }finally{
      setSaving(false);
    }
  };

  return (
    <div
      className="modal-backdrop"
      onMouseDown={e=>{
        if(e.target===e.currentTarget) onClose();
      }}
    >
      <div className="login-modal">

        <div className="login-logo">
          <img src="/assets/eduvia-logo.png" alt="Eduvia"/>
        </div>

        <button className="close" onClick={onClose}>×</button>

        <span className="eyebrow">WELCOME TO EDUVIA</span>

        <h2>
          {mode==='signup'
            ? 'Create your student account.'
            : 'Welcome back.'}
        </h2>

        <p className="login-sub">
          Save your profile once and keep your study-abroad journey connected.
        </p>

        <div className="login-tabs">
          <button
            type="button"
            className={mode==='signup'?'active':''}
            onClick={()=>{
              setMode('signup');
              setMessage('');
            }}
          >
            Sign up
          </button>

          <button
            type="button"
            className={mode==='login'?'active':''}
            onClick={()=>{
              setMode('login');
              setMessage('');
            }}
          >
            Login
          </button>
        </div>

        <form onSubmit={submit}>

          {mode==='signup' && (
            <label>
              Full name
              <input
                value={form.name}
                onChange={e=>update('name',e.target.value)}
                placeholder="Your full name"
                required
              />
            </label>
          )}

          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={e=>update('email',e.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>

          {mode==='signup' && (
            <label>
              Mobile number
              <input
                type="tel"
                value={form.phone}
                onChange={e=>
                  update(
                    'phone',
                    e.target.value.replace(/\D/g,'').slice(0,10)
                  )
                }
                placeholder="10-digit mobile number"
                minLength="10"
                maxLength="10"
                required
              />
            </label>
          )}

          <label>
            Password
            <input
              type="password"
              value={form.password}
              onChange={e=>update('password',e.target.value)}
              placeholder="Minimum 6 characters"
              minLength="6"
              required
            />
          </label>

          <button
            className="primary full"
            type="submit"
            disabled={saving}
          >
            {saving
              ? 'Please wait…'
              : mode==='signup'
                ? 'Create Student Account'
                : 'Login to Eduvia'}
            <Icon name="arrow"/>
          </button>

        </form>

        {message && (
          <div className="login-message">
            {message}
          </div>
        )}

        <small className="login-note">
          By continuing, you agree to use Eduvia for study-abroad discovery and qualification.
        </small>

      </div>
    </div>
  );
}

function Result({answers,onClose}){
  const [unlocked,setUnlocked]=useState(false);
  const [processing,setProcessing]=useState(false);
  const [paymentMessage,setPaymentMessage]=useState('');
  const destination=answers[4]||'Not sure — recommend for me';

  const openRazorpayCheckout=async()=>{
    setProcessing(true);
    setPaymentMessage('');
    try{
      if(!window.Razorpay){
        await new Promise((resolve,reject)=>{
          const existing=document.querySelector('script[data-razorpay-checkout]');
          if(existing){existing.addEventListener('load',resolve,{once:true});existing.addEventListener('error',()=>reject(new Error('Unable to load Razorpay Checkout.')),{once:true});return;}
          const script=document.createElement('script');
          script.src='https://checkout.razorpay.com/v1/checkout.js';
          script.async=true;
          script.dataset.razorpayCheckout='true';
          script.onload=resolve;
          script.onerror=()=>reject(new Error('Unable to load Razorpay Checkout.'));
          document.body.appendChild(script);
        });
      }
      const orderResponse=await fetch('/api/create-order',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({assessment:answers})});
      const orderData=await orderResponse.json().catch(()=>({message:'Invalid server response.'}));
      if(!orderResponse.ok) throw new Error(orderData.message||'Unable to create payment order.');
      const options={
        key:orderData.keyId,
        amount:orderData.amount,
        currency:orderData.currency,
        name:'Eduvia',
        description:'Full Eduvia Report — ₹100',
        order_id:orderData.orderId,
        prefill:{name:'',email:'',contact:''},
        theme:{color:'#2457ff'},
        handler:async response=>{
          try{
            const verifyResponse=await fetch('/api/verify-payment',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(response)});
            const verifyData=await verifyResponse.json().catch(()=>({message:'Invalid verification response.'}));
            if(!verifyResponse.ok) throw new Error(verifyData.message||'Payment verification failed.');
            setUnlocked(true);
            setPaymentMessage('Payment verified successfully. Your full report is unlocked.');
          }catch(err){
            setPaymentMessage(err.message||'Payment verification failed.');
          }finally{setProcessing(false);}
        },
        modal:{ondismiss:()=>{setProcessing(false);setPaymentMessage('Payment window closed. Your report remains locked until payment is verified.');}}
      };
      const razorpay=new window.Razorpay(options);
      razorpay.on('payment.failed',response=>{setProcessing(false);setPaymentMessage(response?.error?.description||'Payment failed. Please try again.');});
      razorpay.open();
    }catch(err){
      setProcessing(false);
      setPaymentMessage(err.message||'Unable to start payment.');
    }
  };
  if(unlocked){
    return <div className="full-report">
      <div className="full-report-hero"><div><span className="eyebrow">FULL EDUVIA REPORT</span><h2>Your personalised starting plan is ready.</h2><p>Use this report as a planning guide. Final university requirements, costs and visa outcomes should always be verified with official sources.</p></div><div className="paid-pill">✓ Unlocked</div></div>
      <div className="full-report-grid">
        <div className="report-stat"><span>Eduvia Score</span><strong>82</strong><small>/ 100</small></div>
        <div className="report-stat"><span>Budget range</span><strong>{answers[2]||'₹25–40 lakh'}</strong><small>first-year planning range</small></div>
        <div className="report-stat"><span>Destination</span><strong>{destination}</strong><small>preference</small></div>
      </div>
      <div className="unlock-section"><div><span className="eyebrow">UNIVERSITY MATCHING</span><h3>Illustrative shortlist</h3><p>In the production product, these matches will be generated from your saved profile and live university data.</p></div><div className="match-cards"><article><b>Arizona State University</b><span>Target · USA</span><em>Approx. budget shown after profile review</em></article><article><b>University of Cincinnati</b><span>Target · USA</span><em>Approx. budget shown after profile review</em></article><article><b>George Mason University</b><span>Target · USA</span><em>Approx. budget shown after profile review</em></article></div></div>
      <div className="expert-strip"><div><span className="eyebrow">NEXT STEP</span><h3>Want to talk it through?</h3><p>Your next stage is to connect with an Eduvia expert using the profile context you just created.</p></div><button className="primary" onClick={onClose}>Talk to an Eduvia Expert <Icon name="arrow"/></button></div>
    </div>
  }
  return <div className="result">
    <div className="result-score"><span>FREE PROFILE SNAPSHOT</span><strong>82</strong><small>/ 100</small><p>Starting readiness</p></div>
    <div><span className="eyebrow">PRACTICAL PROFILE SNAPSHOT</span><h2>We’ve got a useful starting point.</h2><p>Your answers give Eduvia enough context to explain what to work on next — without pretending that one score can guarantee admission or a visa.</p><div className="result-grid"><div><b>Study stage</b><span>{answers[0]||'Not added yet'}</span></div><div><b>Career direction</b><span>{answers[1]||'Not added yet'}</span></div><div><b>First-year budget</b><span>{answers[2]||'Not added yet'}</span></div><div><b>Preferred region</b><span>{destination}</span></div></div><div className="practical-next"><b>What to do next</b><span>1. Complete your profile and English details.</span><span>2. Compare destinations against your realistic budget.</span><span>3. Shortlist courses before speaking with a counsellor.</span></div>
      <div className="unlock-card"><div><span className="eyebrow">UNLOCK FULL REPORT</span><h3>Get the personalised detail for ₹100</h3><p>University shortlist · Safe / Target / Ambitious fit · Estimated budget · Profile gaps · Next-step roadmap</p>{paymentMessage&&<div className="payment-message" role="status">{paymentMessage}</div>}</div><button className="primary" disabled={processing} onClick={openRazorpayCheckout}>{processing?'Opening secure checkout…':'Unlock Full Report — ₹100'} <Icon name="arrow"/></button></div>
      <div className="result-actions"><button className="ghost" onClick={onClose}>Continue exploring</button></div>
    </div></div>
}
createRoot(document.getElementById('root')).render(<App/>);
