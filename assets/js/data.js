/* =====================================================
   HARYAD MASSUD — Content Data
   ----------------------------------------
   EDIT THIS FILE to add/update projects, tech languages,
   tools, certificates, and experience.
   Each language key holds its own content.
   For adding a NEW item, simply add a new object to the
   array for each language you want to support.
   ===================================================== */

const SITE_DATA = {

    /* ------------------------------------------------
       PROJECTS
       id     : unique slug
       title  : project title
       desc   : short description
       tech   : array of technology labels
       status : 'soon' | 'inprogress' | 'done'
       date   : display date / year
       github : GitHub URL ('' to hide)
       demo   : Live demo URL ('' to hide)
    ------------------------------------------------ */
    projects: {
        en: [
            {
                id: 'p1', icon: '🚧', title: 'Project 01 — Coming Soon', emoji: '🚧',
                desc: 'A new project I am currently building. More details will be revealed soon.',
                tech: ['Java'],
                status: 'soon', date: '2026',
                github: '', demo: ''
            },
            {
                id: 'p2', icon: '🎨', title: 'Project 02 — Designing', emoji: '🎨',
                desc: 'A new project I am currently building. More details will be revealed soon.',
                tech: ['Design'],
                status: 'soon', date: '2026',
                github: '', demo: ''
            },
            {
                id: 'p3', icon: '🎬', title: 'Project 03 — Editing', emoji: '🎬',
                desc: 'A new project I am currently building. More details will be revealed soon.',
                tech: ['Video'],
                status: 'soon', date: '2026',
                github: '', demo: ''
            }
        ],
        ckb: [
            { id: 'p1', icon: '🚧', title: 'پرۆژەی ٠١ — بەم زووانە', desc: 'پرۆژەیەکی نوێیە کە ئێستا لەسەری کار دەکەم. وردەکاریی زیاتر بەم زووانە بڵاو دەکرێتەوە.', tech: ['جاڤا'], status: 'soon', date: '٢٠٢٦', github: '', demo: '' },
            { id: 'p2', icon: '🎨', title: 'پرۆژەی ٠٢ — دیزاین', desc: 'پرۆژەیەکی نوێیە کە ئێستا لەسەری کار دەکەم. وردەکاریی زیاتر بەم زووانە بڵاو دەکرێتەوە.', tech: ['دیزاین'], status: 'soon', date: '٢٠٢٦', github: '', demo: '' },
            { id: 'p3', icon: '🎬', title: 'پرۆژەی ٠٣ — مۆنتاژ', desc: 'پرۆژەیەکی نوێیە کە ئێستا لەسەری کار دەکەم. وردەکاریی زیاتر بەم زووانە بڵاو دەکرێتەوە.', tech: ['ڤیدیۆ'], status: 'soon', date: '٢٠٢٦', github: '', demo: '' }
        ],
        ar: [
            { id: 'p1', icon: '🚧', title: 'المشروع ٠١ — قريبًا', desc: 'مشروع جديد أعمل عليه حاليًا. ستُكشف التفاصيل قريبًا.', tech: ['جافا'], status: 'soon', date: '٢٠٢٦', github: '', demo: '' },
            { id: 'p2', icon: '🎨', title: 'المشروع ٠٢ — تصميم', desc: 'مشروع جديد أعمل عليه حاليًا. ستُكشف التفاصيل قريبًا.', tech: ['تصميم'], status: 'soon', date: '٢٠٢٦', github: '', demo: '' },
            { id: 'p3', icon: '🎬', title: 'المشروع ٠٣ — مونتاج', desc: 'مشروع جديد أعمل عليه حاليًا. ستُكشف التفاصيل قريبًا.', tech: ['فيديو'], status: 'soon', date: '٢٠٢٦', github: '', demo: '' }
        ]
    },

    /* ------------------------------------------------
       TECH LANGUAGES
       name   : language name
       icon   : emoji / char
       pct    : skill bar percentage (0-100)
       status : 'using' | 'learning' | 'inprogress'
    ------------------------------------------------ */
    techLanguages: {
        en: [
            { name: 'Java', icon: '☕', pct: 90, status: 'using' },
            { name: 'JavaScript', icon: '🌐', pct: 80, status: 'using' },
            { name: 'Python', icon: '🐍', pct: 85, status: 'using' },
            { name: 'C++', icon: '⚙️', pct: 75, status: 'inprogress' },
            { name: 'HTML', icon: '🧱', pct: 88, status: 'using' },
            { name: 'CSS', icon: '🎨', pct: 87, status: 'using' },
            { name: 'SQL', icon: '🗄️', pct: 60, status: 'learning' }
        ],
        ckb: [
            { name: 'جاڤا', icon: '☕', pct: 90, status: 'using' },
            { name: 'جاڤاسکریپت', icon: '🌐', pct: 80, status: 'using' },
            { name: 'پایتۆن', icon: '🐍', pct: 85, status: 'using' },
            { name: 'C++', icon: '⚙️', pct: 75, status: 'inprogress' },
            { name: 'HTML', icon: '🧱', pct: 88, status: 'using' },
            { name: 'CSS', icon: '🎨', pct: 87, status: 'using' },
            { name: 'SQL', icon: '🗄️', pct: 60, status: 'learning' }
        ],
        ar: [
            { name: 'جافا', icon: '☕', pct: 90, status: 'using' },
            { name: 'جافاسكريبت', icon: '🌐', pct: 80, status: 'using' },
            { name: 'بايثون', icon: '🐍', pct: 85, status: 'using' },
            { name: 'سي بلس بلس', icon: '⚙️', pct: 75, status: 'inprogress' },
            { name: 'HTML', icon: '🧱', pct: 88, status: 'using' },
            { name: 'CSS', icon: '🎨', pct: 87, status: 'using' },
            { name: 'SQL', icon: '🗄️', pct: 60, status: 'learning' }
        ]
    },

    /* ------------------------------------------------
       TOOLS & SOFTWARE
       name   : tool name
       icon   : emoji / char
       desc   : short description
       status : 'using' | 'learning' | 'inprogress'
    ------------------------------------------------ */
    tools: {
        en: [
            { name: 'GitHub', icon: '🐙', desc: 'Version control & collaboration', status: 'using' },
            { name: 'Visual Studio Code', icon: '💻', desc: 'Code editor of choice', status: 'using' },
            { name: 'Figma', icon: '🎨', desc: 'UI/UX design & prototyping', status: 'using' },
            { name: 'Adobe Premiere Pro', icon: '🎬', desc: 'Video editing & production', status: 'using' },
            { name: 'Adobe After Effects', icon: '✨', desc: 'Motion graphics & VFX', status: 'inprogress' }
        ],
        ckb: [
            { name: 'گیت‌ھەب', icon: '🐙', desc: 'بەڕێوەبردنی وەشان و هاوکاری', status: 'using' },
            { name: 'ڤیژواڵ ستودیۆ کۆد', icon: '💻', desc: 'ئیدیتۆری کۆدی هەڵبژاردە', status: 'using' },
            { name: 'فیگما', icon: '🎨', desc: 'دیزاین و پرۆتۆتایپ', status: 'using' },
            { name: 'ئەدۆبی پرێمیێر پرۆ', icon: '🎬', desc: 'مۆنتاژ و بەرهەمهێنانی ڤیدیۆ', status: 'using' },
            { name: 'ئەدۆبی ئەفتر ئیفێکتس', icon: '✨', desc: 'جوڵە و کاریگەری بینراو', status: 'inprogress' }
        ],
        ar: [
            { name: 'جيت‌هب', icon: '🐙', desc: 'إدارة الإصدارات والتعاون', status: 'using' },
            { name: 'فيجوال ستوديو كود', icon: '💻', desc: 'محرر الأكواد المفضل', status: 'using' },
            { name: 'فيجما', icon: '🎨', desc: 'تصميم الواجهات والنماذج الأولية', status: 'using' },
            { name: 'أدوبي بريمير برو', icon: '🎬', desc: 'مونتاج وإنتاج الفيديو', status: 'using' },
            { name: 'أدوبي أفتر إفكتس', icon: '✨', desc: 'الرسوم المتحركة والمؤثرات', status: 'inprogress' }
        ]
    },

    /* ------------------------------------------------
       CERTIFICATES
       completed : array of finished certs
       inprogress: array of ongoing certs
       Each: id, title, subject, icon, year, url
    ------------------------------------------------ */
    certificates: {
        en: {
            completed: [
                { id: 'ce1', title: 'English Language Certificate', subject: 'English Language', icon: '🇬🇧', year: '' }
            ],
            inprogress: [
                { id: 'ci1', title: 'HTML & CSS', subject: 'Web Development', icon: '🧱', year: '' },
                { id: 'ci2', title: 'Java', subject: 'Programming', icon: '☕', year: '' },
                { id: 'ci3', title: 'JavaScript', subject: 'Programming', icon: '🌐', year: '' },
                { id: 'ci4', title: 'Adobe Premiere Pro', subject: 'Video Editing', icon: '🎬', year: '' },
                { id: 'ci5', title: 'Adobe After Effects', subject: 'Motion Graphics', icon: '✨', year: '' }
            ]
        },
        ckb: {
            completed: [
                { id: 'ce1', title: 'بڕوانامەی زمانی ئینگلیزی', subject: 'زمانی ئینگلیزی', icon: '🇬🇧', year: '' }
            ],
            inprogress: [
                { id: 'ci1', title: 'HTML & CSS', subject: 'پەرەپێدانی وێب', icon: '🧱', year: '' },
                { id: 'ci2', title: 'جاڤا', subject: 'بەرنامەسازی', icon: '☕', year: '' },
                { id: 'ci3', title: 'جاڤاسکریپت', subject: 'بەرنامەسازی', icon: '🌐', year: '' },
                { id: 'ci4', title: 'ئەدۆبی پرێمیێر پرۆ', subject: 'مۆنتاژی ڤیدیۆ', icon: '🎬', year: '' },
                { id: 'ci5', title: 'ئەدۆبی ئەفتر ئیفێکتس', subject: 'گرافیک و جوڵە', icon: '✨', year: '' }
            ]
        },
        ar: {
            completed: [
                { id: 'ce1', title: 'شهادة اللغة الإنجليزية', subject: 'اللغة الإنجليزية', icon: '🇬🇧', year: '' }
            ],
            inprogress: [
                { id: 'ci1', title: 'HTML & CSS', subject: 'تطوير الويب', icon: '🧱', year: '' },
                { id: 'ci2', title: 'جافا', subject: 'البرمجة', icon: '☕', year: '' },
                { id: 'ci3', title: 'جافاسكريبت', subject: 'البرمجة', icon: '🌐', year: '' },
                { id: 'ci4', title: 'أدوبي بريمير برو', subject: 'مونتاج الفيديو', icon: '🎬', year: '' },
                { id: 'ci5', title: 'أدوبي أفتر إفكتس', subject: 'الرسوم المتحركة', icon: '✨', year: '' }
            ]
        }
    },

    /* ------------------------------------------------
       EXPERIENCE — vertical timeline
       period : date range
       role   : role / title
       points : bullet list
    ------------------------------------------------ */
    experience: {
        en: [
            {
                period: '2025 – Present', role: 'Software Engineering',
                points: [
                    'Studying Software Engineering',
                    'Developing programming and problem-solving skills',
                    'Learning different programming languages',
                    'Building academic and personal projects',
                    'Continuously improving technical skills'
                ]
            },
            {
                period: '2025 – Present', role: 'Freelance Developer & Graphic Designer',
                points: [
                    'Working on personal and freelance projects',
                    'Combining software development with visual design',
                    'Creating digital content and graphics',
                    'Developing creative and technical solutions',
                    'Continuously improving development and design skills'
                ]
            },
            {
                period: '2024 – 2025', role: 'Learning & Building',
                points: [
                    'Started seriously exploring programming and digital creation',
                    'Learned different programming technologies',
                    'Experimented with graphic design and video editing',
                    'Built projects while developing practical skills',
                    'Developed a strong interest in technology and creativity'
                ]
            }
        ],
        ckb: [
            {
                period: '٢٠٢٥ – ئێستا', role: 'ئەندازیاریی پڕۆگرامسازی',
                points: [
                    'خوێندنی ئەندازیاریی پڕۆگرامسازی',
                    'پەرەپێدانی تواناکانی بەرنامەسازی و چارەسەرکردنی کێشە',
                    'فێربوونی زمانەکانی بەرنامەسازی جیاواز',
                    'بنیاتنانی پرۆژەی ئەکادیمی و کەسی',
                    'باشترکردنی بەردەوامی تواناکانی تەکنیکی'
                ]
            },
            {
                period: '٢٠٢٥ – ئێستا', role: 'گەشەپێدەری سەربەخۆ و دیزاینەری گرافیک',
                points: [
                    'کارکردن لەسەر پرۆژەی کەسی و سەربەخۆ',
                    'تێکەڵکردنی پەرەپێدانی پڕۆگرامسازی لەگەڵ دیزاینی بینراو',
                    'بنیاتنانی ناوەڕۆکی دیجیتاڵی و گرافیک',
                    'پەرەپێدانی چارەسەری داهێنەرانە و تەکنیکی',
                    'باشترکردنی بەردەوامی تواناکانی پەرەپێدان و دیزاین'
                ]
            },
            {
                period: '٢٠٢٤ – ٢٠٢٥', role: 'فێربوون و بنیاتنان',
                points: [
                    'دەستپێکردنی جدی گەڕان لە بەرنامەسازی و بنیاتنانی شتی دیجیتاڵی',
                    'فێربوونی تەکنۆلۆژیای جیاوازی بەرنامەسازی',
                    'تاقیکردنەوە لە دیزاینی گرافیک و مۆنتاژی ڤیدیۆ',
                    'بنیاتنانی پرۆژە لە کاتی پەرەپێدانی توانا پراکتیکییەکان',
                    'حەزێکی بەهێزم بە تەکنۆلۆژیا و داهێنان پەیدا کرد'
                ]
            }
        ],
        ar: [
            {
                period: '٢٠٢٥ – حتى الآن', role: 'هندسة البرمجيات',
                points: [
                    'دراسة هندسة البرمجيات',
                    'تطوير مهارات البرمجة وحل المشكلات',
                    'تعلم لغات برمجة مختلفة',
                    'بناء مشاريع أكاديمية وشخصية',
                    'تحسين المهارات التقنية باستمرار'
                ]
            },
            {
                period: '٢٠٢٥ – حتى الآن', role: 'مطوّر مستقل ومصمم جرافيك',
                points: [
                    'العمل على مشاريع شخصية ومستقلة',
                    'دمج تطوير البرمجيات مع التصميم البصري',
                    'إنشاء محتوى رقمي ورسومات',
                    'تطوير حلول إبداعية وتقنية',
                    'تحسين مهارات التطوير والتصميم باستمرار'
                ]
            },
            {
                period: '٢٠٢٤ – ٢٠٢٥', role: 'تعلّم وبناء',
                points: [
                    'بدأت بجدية استكشاف البرمجة والإبداع الرقمي',
                    'تعلمت تقنيات برمجة مختلفة',
                    'جرّبت التصميم الجرافيكي ومونتاج الفيديو',
                    'بنيت مشاريع أثناء تطوير مهارات عملية',
                    'طوّرت اهتمامًا قويًا بالتكنولوجيا والإبداع'
                ]
            }
        ]
    },

    /* ------------------------------------------------
       SOCIAL LINKS (contact)
       type : 'tiktok'|'instagram'|'facebook'
       href : real URL when available
       ph   : placeholder shown until real URL provided
    ------------------------------------------------ */
    socials: {
        tiktok:  { label: 'TikTok',     href: 'https://www.tiktok.com/@haryad1571' },
        instagram:{ label: 'Instagram', href: 'https://www.instagram.com/h4ryad.01/' },
        facebook: { label: 'Facebook',  href: 'https://facebook.com/share/1CnQHLzzNJ' }
    }
};

/* Build real web URLs for social links (email uses mailto) */
function socialUrl(type) {
    const s = SITE_DATA.socials[type];
    if (!s) return '#';
    if (type === 'email') return 'mailto:' + s.href;
    return s.href;
}
