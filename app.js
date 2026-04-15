const { useState, useEffect } = React;

const CONTENT_DATA = [
    // ... (Dados das matérias: Aritmética, Radiciação, Álgebra, etc.)
];

const App = () => {
    const [active, setActive] = useState(CONTENT_DATA[0].id);
    const [completed, setCompleted] = useState({});
    const [exampleLevel, setExampleLevel] = useState('facil');
    const [feedback, setFeedback] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [quizStep, setQuizStep] = useState(0);

    const curr = CONTENT_DATA.find(d => d.id === active);
    const currentQuiz = curr.quizzes[quizStep];
    const prog = (Object.keys(completed).length / CONTENT_DATA.length) * 100;

    useEffect(() => { 
        if (window.lucide) window.lucide.createIcons(); 
        setFeedback(null);
        setQuizStep(0);
        window.scrollTo(0,0);
    }, [active]);

    const handleQuiz = (idx) => {
        if (idx === currentQuiz.corr) {
            setFeedback('correct');
            setTimeout(() => {
                if (quizStep < curr.quizzes.length - 1) {
                    setQuizStep(quizStep + 1);
                    setFeedback(null);
                } else {
                    setCompleted({...completed, [active]: true});
                }
            }, 800);
        } else {
            setFeedback('wrong');
            setTimeout(() => setFeedback(null), 1200);
        }
    };

    const levelStyles = {
        facil: "text-emerald-500 bg-emerald-500/10",
        medio: "text-blue-500 bg-blue-500/10",
        dificil: "text-orange-500 bg-orange-500/10",
        extremo: "text-red-500 bg-red-500/10"
    };

    // Retorno do Componente (JSX)
    return (
        <div className="flex h-screen flex-col md:flex-row bg-slate-50 overflow-hidden">
            {/* ... Renderização da Interface ... */}
        </div>
    );
};

// Inicialização do React no DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
                </div>

                <nav className="flex-1 overflow-y-auto custom-scroll p-4 space-y-2">
                    {CONTENT_DATA.map(item => (
                        <button 
                            key={item.id} 
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all ${
                                activeTab === item.id ? 'bg-blue-600 text-white shadow-lg scale-[1.02]' : 'text-slate-500 hover:bg-slate-800'
                            }`}
                        >
                            <div className="text-left">
                                <p className={`text-[8px] font-black uppercase mb-1 ${activeTab === item.id ? 'text-blue-200' : 'text-slate-500'}`}>
                                    {item.category}
                                </p>
                                <p className="font-bold text-xs">{item.title}</p>
                            </div>
                            {completed[item.id] && <span className="ml-auto text-emerald-400">✓</span>}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Área de Estudo Principal */}
            <main className="flex-1 overflow-y-auto custom-scroll bg-white">
                <div className="max-w-4xl mx-auto p-8 lg:p-16 fade-in">
                    <header className="mb-12 border-b border-slate-100 pb-8">
                        <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest mb-4">
                           <i data-lucide="graduation-cap" className="w-4 h-4"></i> Módulo do 9º Ano
                        </div>
                        <h2 className="text-5xl font-black text-slate-900 mb-4">{current.title}</h2>
                        <p className="text-xl text-slate-500 leading-relaxed">{current.description}</p>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-8">
                            <section className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm">
                                <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                                    <i data-lucide="book-open" className="text-blue-500 w-5 h-5"></i> Teoria Essencial
                                </h3>
                                <div className="space-y-4">
                                    {current.theory.map((t, i) => (
                                        <div key={i} className="bg-white p-4 rounded-xl border-l-4 border-blue-500 shadow-sm text-slate-600 text-sm italic">
                                            {t}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Fórmulas Destacadas */}
                        <aside className="space-y-4">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Fórmulas</h3>
                            {current.formulas.map((f, i) => (
                                <div key={i} className="bg-slate-900 p-6 rounded-[2rem] border border-slate-700 shadow-xl math-card">
                                    <span className="text-blue-400 text-[9px] font-black uppercase block mb-2">{f.label}</span>
                                    <div className="text-xl font-mono text-white text-center py-2 bg-slate-800/50 rounded-xl formula-display">
                                        {f.math}
                                    </div>
                                </div>
                            ))}
                        </aside>
                    </div>

                    {/* Quiz do Módulo */}
                    <div className="mt-16 bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
                        <div className="relative z-10 text-center">
                            <h3 className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-8">Teste de Maestria</h3>
                            <p className="text-2xl font-medium mb-10 max-w-xl mx-auto leading-snug">{current.quiz.question}</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                                {current.quiz.options.map((opt, i) => (
                                    <button 
                                        key={i} 
                                        onClick={() => handleAnswer(i)}
                                        className="p-5 rounded-2xl bg-slate-800 border border-slate-700 hover:border-blue-500 hover:bg-slate-700 transition-all font-bold text-left group"
                                    >
                                        <span className="text-blue-500 mr-2 group-hover:text-white">{String.fromCharCode(65 + i)})</span> {opt}
                                    </button>
                                ))}
                            </div>
                            
                            {completed[activeTab] && (
                                <div className="mt-8 text-emerald-400 font-bold flex items-center justify-center gap-2 animate-bounce">
                                    <i data-lucide="award"></i> Módulo Concluído com Sucesso!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

// Renderização Final
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
