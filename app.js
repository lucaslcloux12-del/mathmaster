const { useState } = React;

// Configuração de Ícones (Fallback seguro)
const Icons = {
    Book: () => <i data-lucide="book-open"></i>,
    Zap: () => <i data-lucide="zap"></i>,
    Target: () => <i data-lucide="target"></i>,
    Check: () => <i data-lucide="check-circle"></i>
};

const CONTENT_DATA = [
    {
        id: 'pot1',
        category: 'Potenciação',
        title: 'Propriedades da Base',
        description: 'Multiplicação e divisão de potências de mesma base.',
        theory: [
            "Na multiplicação de potências de mesma base, mantém-se a base e somam-se os expoentes.",
            "Na divisão, mantém-se a base e subtraem-se os expoentes."
        ],
        formulas: [
            { label: "Produto", math: "aⁿ · aᵐ = aⁿ⁺ᵐ" },
            { label: "Divisão", math: "aⁿ / aᵐ = aⁿ⁻ᵐ" }
        ],
        quiz: {
            question: "Qual o resultado simplificado de x⁷ / x³?",
            options: ["x⁴", "x¹⁰", "x²¹", "4x"],
            correct: 0
        }
    },
    {
        id: 'rad1',
        category: 'Radiciação',
        title: 'Simplificação de Raízes',
        description: 'Aprenda a extrair fatores de dentro do radical.',
        theory: [
            "Fatoramos o radicando e formamos grupos com o mesmo índice da raiz.",
            "Para cada grupo completo, um fator sai da raiz multiplicando."
        ],
        formulas: [
            { label: "Extração", math: "√(a²·b) = a√b" }
        ],
        quiz: {
            question: "Simplificando √50, obtemos:",
            options: ["10√5", "2√5", "5√2", "25√2"],
            correct: 2
        }
    }
    // Você pode adicionar mais módulos aqui seguindo o padrão
];

const App = () => {
    const [activeTab, setActiveTab] = useState(CONTENT_DATA[0].id);
    const [completed, setCompleted] = useState({});
    
    const current = CONTENT_DATA.find(item => item.id === activeTab);
    const progress = (Object.keys(completed).length / CONTENT_DATA.length) * 100;

    // Inicializa ícones do Lucide após renderizar
    React.useEffect(() => {
        lucide.createIcons();
    }, [activeTab]);

    const handleAnswer = (index) => {
        if (index === current.quiz.correct) {
            setCompleted({ ...completed, [activeTab]: true });
        } else {
            alert("Resposta incorreta! Revise a teoria e tente novamente.");
        }
    };

    return (
        <div className="flex h-screen overflow-hidden flex-col md:flex-row bg-slate-50">
            {/* Sidebar Lateral */}
            <aside className="w-full md:w-80 bg-slate-900 text-white flex flex-col shadow-2xl z-20">
                <div className="p-8">
                    <h1 className="text-2xl font-black tracking-tighter flex items-center gap-2">
                        <span className="text-blue-500 italic">M</span>MATHMASTER
                    </h1>
                    <div className="mt-6">
                        <div className="flex justify-between text-[10px] font-bold mb-1 text-slate-400 uppercase tracking-widest">
                            <span>Progresso</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-blue-500 transition-all duration-1000" 
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto custom-scroll p-4 space-y-2">
                    {CONTENT_DATA.map(item => (
                        <button 
                            key={item.id} 
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all ${
                                activeTab === item.id ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-800'
                            }`}
                        >
                            <div className="text-left overflow-hidden">
                                <p className={`text-[8px] font-black uppercase mb-1 ${activeTab === item.id ? 'text-blue-200' : 'text-slate-500'}`}>
                                    {item.category}
                                </p>
                                <p className="font-bold text-xs truncate">{item.title}</p>
                            </div>
                            {completed[item.id] && <span className="ml-auto text-emerald-400 font-bold">✓</span>}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Conteúdo Principal */}
            <main className="flex-1 overflow-y-auto custom-scroll bg-white">
                <div className="max-w-4xl mx-auto p-8 lg:p-16 fade-in">
                    <header className="mb-12 border-b border-slate-100 pb-8">
                        <h2 className="text-5xl font-black text-slate-900 mb-4">{current.title}</h2>
                        <p className="text-xl text-slate-500 leading-relaxed">{current.description}</p>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-8">
                            <section className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                                <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                                    <i data-lucide="book-open" className="text-blue-500"></i> Base Teórica
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

                        <aside className="space-y-4">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Fórmulas</h3>
                            {current.formulas.map((f, i) => (
                                <div key={i} className="bg-slate-900 p-6 rounded-[2rem] border border-slate-700 shadow-xl">
                                    <span className="text-blue-400 text-[9px] font-black uppercase block mb-2">{f.label}</span>
                                    <div className="text-xl font-mono text-white text-center py-2 bg-slate-800/50 rounded-xl formula-display">
                                        {f.math}
                                    </div>
                                </div>
                            ))}
                        </aside>
                    </div>

                    {/* Quiz Interativo */}
                    <div className="mt-16 bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
                        <div className="relative z-10 text-center">
                            <h3 className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-8">Desafio de Maestria</h3>
                            <p className="text-2xl font-medium mb-10 max-w-xl mx-auto">{current.quiz.question}</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                                {current.quiz.options.map((opt, i) => (
                                    <button 
                                        key={i} 
                                        onClick={() => handleAnswer(i)}
                                        className="p-5 rounded-2xl bg-slate-800 border border-slate-700 hover:border-blue-500 hover:bg-slate-700 transition-all font-bold text-left"
                                    >
                                        <span className="text-blue-500 mr-2">{String.fromCharCode(65 + i)})</span> {opt}
                                    </button>
                                ))}
                            </div>
                            
                            {completed[activeTab] && (
                                <div className="mt-8 text-emerald-400 font-bold flex items-center justify-center gap-2 animate-bounce">
                                    <i data-lucide="award"></i> Módulo Completado!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
