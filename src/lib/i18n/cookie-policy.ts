import type { Locale } from "@/lib/i18n/config";

export type CookiePolicyCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  identity: {
    title: string;
    body: string;
    name: string;
    address: string;
    email: string;
    phone: string;
    whatsapp: string;
  };
  types: {
    title: string;
    intro: string;
    items: { title: string; body: string }[];
  };
  inventory: {
    title: string;
    intro: string;
    columns: {
      name: string;
      provider: string;
      type: string;
      purpose: string;
      duration: string;
    };
    rows: {
      name: string;
      provider: string;
      type: string;
      purpose: string;
      duration: string;
    }[];
    note: string;
    sessionTitle: string;
    sessionBody: string;
  };
  legal: {
    title: string;
    paragraphs: string[];
  };
  transfers: {
    title: string;
    paragraphs: string[];
  };
  rights: {
    title: string;
    intro: string;
    items: string[];
    apply: string;
    browserTitle: string;
    browsers: { name: string; steps: string }[];
    blockNote: string;
  };
};

const tr: CookiePolicyCopy = {
  eyebrow: "Çerezler",
  title: "Çerez politikası ve aydınlatma metni",
  intro:
    "Bu metin, sitede hangi çerezlerin kullanıldığını, ne amaçla ve ne süreyle saklandığını, hukuki sebebi ve KVKK kapsamındaki haklarınızı açıklar.",
  updated: "Son güncelleme: 11 Ekim 2026",
  identity: {
    title: "1. Veri sorumlusunun kimliği",
    body: "Veri sorumlusu, bu internet sitesini işleten Kesu’dur. Aşağıdaki unvan ve iletişim bilgileri, sitede yayımlanan kayıttır. Başvurularınızı e-posta adresine yazabilirsiniz.",
    name: "Unvan",
    address: "Adres",
    email: "E-posta",
    phone: "Telefon",
    whatsapp: "WhatsApp",
  },
  types: {
    title: "2. Çerez türleri ve kullanım amaçları",
    intro:
      "Çerez, sitenin tarayıcınıza yazdığı küçük bir metin kaydıdır. Bu sitede kullanılan türler şunlardır.",
    items: [
      {
        title: "Zorunlu",
        body: "Sitenin temel işleyişi için gerekir. Çerez bildirimini kabul ettiğinizi hatırlar. Bu kayıt olmadan bildirim her ziyarette yeniden görünür.",
      },
      {
        title: "İşlevsel",
        body: "Seçtiğiniz dili hatırlar. Böylece site, sonraki ziyarette aynı dilde açılır.",
      },
      {
        title: "Performans ve analitik",
        body: "Kullanılmaz. Ziyaret sayısı, tıklama veya benzeri bir ölçüm için çerez yazılmaz.",
      },
      {
        title: "Reklam ve pazarlama",
        body: "Kullanılmaz. Reklam ağı, yeniden pazarlama veya sosyal medya piksel çerezi yoktur.",
      },
    ],
  },
  inventory: {
    title: "3. Güncel çerez envanteri",
    intro: "Sitede fiilen çalışan çerezler yalnızca şunlardır.",
    columns: {
      name: "Çerez adı",
      provider: "Sağlayıcı",
      type: "Tür",
      purpose: "Amaç",
      duration: "Saklama süresi",
    },
    rows: [
      {
        name: "kesu-consent",
        provider: "Kesu (birinci taraf)",
        type: "Zorunlu",
        purpose:
          "Çerez bildirimini kabul ettiğinizi hatırlar. Yalnızca Kabul et düğmesine basınca yazılır.",
        duration: "1 yıl",
      },
      {
        name: "kesu-locale",
        provider: "Kesu (birinci taraf)",
        type: "İşlevsel",
        purpose:
          "Seçtiğiniz dili hatırlar. Site bir dilde açıldığında yazılır.",
        duration: "1 yıl",
      },
    ],
    note: "Her iki çerez de yalnızca bu siteye aittir. Yol: /. SameSite: Lax.",
    sessionTitle: "Çerez olmayan geçici kayıtlar",
    sessionBody:
      "Açılış ekranı (kesu-intro-seen) ve ürün sayfasına geçişin kısa görsel kaydı (kesu-reverse-morph) çerez değildir. Tarayıcının oturum belleğinde durur, sekme kapanınca silinir ve bir reklam veya analiz sağlayıcısına gönderilmez.",
  },
  legal: {
    title: "4. Hukuki sebep ve veri toplama yöntemi",
    paragraphs: [
      "Çerezler, siteyi ziyaret ettiğinizde tarayıcınıza bu site tarafından yazılır. Form doldurularak veya ayrıca bir kimlik belgesi istenerek toplanmaz.",
      "kesu-consent zorunlu çerezdir. Hukuki sebep, 6698 sayılı KVKK’nın 5. maddesinin 2. fıkrasının (f) bendi uyarınca meşru menfaattir: bildirimin gösterildiğini hatırlamak. Bu çerez için açık rıza aranmaz. Yalnızca Kabul et düğmesine bastığınızda yazılır.",
      "kesu-locale işlevsel çerezdir. Hukuki sebep yine meşru menfaattir: siteyi seçtiğiniz dilde sunmak. Dil, adres çubuğunda da görünür; çerez aynı tercihi sonraki ziyarette korur. Site bir dile açıldığında yazılır.",
      "Analitik veya reklam çerezi olmadığı için açık rızaya dayanan bir çerez işlenmez. Kabul et düğmesi, bildirim metnini gördüğünüzü ve zorunlu çerez kaydının tutulabileceğini gösterir.",
    ],
  },
  transfers: {
    title: "5. Üçüncü taraf aktarımları",
    paragraphs: [
      "Çerezler aracılığıyla toplanan veri; Google, Meta veya başka bir reklam ya da analiz sağlayıcısına aktarılmaz.",
      "Çerezleri yalnızca bu site okur. Envanterdeki sağlayıcı “Kesu” ifadesi, çerezin bu alan adına ait olduğunu belirtir.",
      "Yurt dışındaki bir reklam veya analiz ağına çerez verisi gönderilmez.",
    ],
  },
  rights: {
    title: "6. Haklarınız ve tercihlerinizi yönetme",
    intro: "KVKK’nın 11. maddesi kapsamında aşağıdaki haklara sahipsiniz:",
    items: [
      "Kişisel verinizin işlenip işlenmediğini öğrenmek",
      "İşlenmişse buna ilişkin bilgi talep etmek",
      "İşlenme amacını ve amaca uygun kullanılıp kullanılmadığını öğrenmek",
      "Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilmek",
      "Eksik veya yanlış işlenmişse düzeltilmesini istemek",
      "KVKK’nın 7. maddesindeki şartlar çerçevesinde silinmesini veya yok edilmesini istemek",
      "Düzeltme ve silme işlemlerinin, verinin aktarıldığı üçüncü kişilere bildirilmesini istemek",
      "Münhasıran otomatik sistemler ile analiz edilmesi nedeniyle aleyhinize bir sonuç çıkmasına itiraz etmek",
      "Kanuna aykırı işlenme sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etmek",
    ],
    apply:
      "Başvurunuzu aşağıdaki e-posta adresine yazın. Kimliğinizi doğrulamaya yetecek bilgiyi ekleyin. Başvurular, KVKK’da öngörülen süre içinde yanıtlanır. Yanıtı yetersiz bulursanız Kişisel Verileri Koruma Kurulu’na şikâyette bulunabilirsiniz.",
    browserTitle: "Tarayıcıdan çerezleri silmek veya engellemek",
    browsers: [
      {
        name: "Chrome",
        steps:
          "Sağ üst menü, Ayarlar, Gizlilik ve güvenlik, Üçüncü taraf çerezleri yolunu izleyin. Adres çubuğundaki kilit simgesinden bu siteye ait çerezleri silebilirsiniz.",
      },
      {
        name: "Safari",
        steps:
          "Mac’te Safari, Ayarlar, Gizlilik bölümünden çerezleri yönetin. iPhone’da Ayarlar, Uygulamalar, Safari, Gelişmiş, Web sitesi verileri yolunu kullanın.",
      },
      {
        name: "Firefox",
        steps:
          "Menü, Ayarlar, Gizlilik ve Güvenlik, Çerezler ve site verileri, Verileri yönet yolunu izleyin.",
      },
    ],
    blockNote:
      "Çerezleri engellerseniz dil tercihi hatırlanmayabilir ve çerez bildirimi yeniden görünebilir. Sitenin diğer sayfaları açılmaya devam eder.",
  },
};

const en: CookiePolicyCopy = {
  eyebrow: "Cookies",
  title: "Cookie policy and privacy notice",
  intro:
    "This notice explains which cookies the site uses, why they are stored, how long they last, the legal basis, and your rights.",
  updated: "Last updated: 11 October 2026",
  identity: {
    title: "1. Identity of the data controller",
    body: "The data controller is Kesu, the operator of this website. The name and contact details below are the record published on the site. You can send requests to the email address.",
    name: "Name",
    address: "Address",
    email: "Email",
    phone: "Phone",
    whatsapp: "WhatsApp",
  },
  types: {
    title: "2. Cookie types and purposes",
    intro:
      "A cookie is a small text record the site writes in your browser. The types used on this site are listed below.",
    items: [
      {
        title: "Necessary",
        body: "Required for the site to function. It remembers that you accepted the cookie notice. Without it, the notice appears on every visit.",
      },
      {
        title: "Functional",
        body: "Remembers the language you chose, so the site opens in the same language on your next visit.",
      },
      {
        title: "Performance and analytics",
        body: "Not used. No cookie is written to measure visits, clicks, or similar activity.",
      },
      {
        title: "Advertising and marketing",
        body: "Not used. There is no advertising network, retargeting, or social media pixel cookie.",
      },
    ],
  },
  inventory: {
    title: "3. Current cookie inventory",
    intro: "The only cookies that actually run on this site are these.",
    columns: {
      name: "Cookie name",
      provider: "Provider",
      type: "Type",
      purpose: "Purpose",
      duration: "Retention",
    },
    rows: [
      {
        name: "kesu-consent",
        provider: "Kesu (first party)",
        type: "Necessary",
        purpose:
          "Remembers that you accepted the cookie notice. It is written only when you press Accept.",
        duration: "1 year",
      },
      {
        name: "kesu-locale",
        provider: "Kesu (first party)",
        type: "Functional",
        purpose:
          "Remembers your language. It is written when the site opens in a language.",
        duration: "1 year",
      },
    ],
    note: "Both cookies belong only to this site. Path: /. SameSite: Lax.",
    sessionTitle: "Temporary records that are not cookies",
    sessionBody:
      "The opening screen (kesu-intro-seen) and a short visual record of the move to a product page (kesu-reverse-morph) are not cookies. They stay in the browser’s session storage, are deleted when the tab closes, and are not sent to an advertising or analytics provider.",
  },
  legal: {
    title: "4. Legal basis and how data is collected",
    paragraphs: [
      "Cookies are written in your browser by this site when you visit. They are not collected through a form or by asking for an identity document.",
      "kesu-consent is a necessary cookie. The legal basis is legitimate interest under Article 5(2)(f) of Turkish Law No. 6698 (KVKK): remembering that the notice was shown. Explicit consent is not required for this cookie. It is written only when you press Accept.",
      "kesu-locale is a functional cookie. The legal basis is the same legitimate interest: serving the site in the language you chose. The language is also visible in the address bar; the cookie keeps that choice for the next visit. It is written when the site opens in a language.",
      "Because there is no analytics or advertising cookie, no cookie is processed on the basis of explicit consent. Accept shows that you saw the notice and that the necessary cookie record may be stored.",
    ],
  },
  transfers: {
    title: "5. Transfers to third parties",
    paragraphs: [
      "Data collected through cookies is not transferred to Google, Meta, or any other advertising or analytics provider.",
      "Only this site reads the cookies. “Kesu” in the provider column means the cookie belongs to this domain.",
      "Cookie data is not sent to an advertising or analytics network abroad.",
    ],
  },
  rights: {
    title: "6. Your rights and how to manage preferences",
    intro: "Under Article 11 of the KVKK you have the right to:",
    items: [
      "Learn whether your personal data is processed",
      "Request information if it has been processed",
      "Learn the purpose of processing and whether it is used for that purpose",
      "Know the third parties to whom it is transferred, in Turkey or abroad",
      "Request correction if it is incomplete or inaccurate",
      "Request deletion or destruction under the conditions in Article 7 of the KVKK",
      "Request that correction or deletion be notified to third parties to whom the data was transferred",
      "Object to a result against you arising solely from automated analysis",
      "Claim compensation if you suffer damage because of unlawful processing",
    ],
    apply:
      "Write to the email address below. Include enough information to confirm your identity. Requests are answered within the period set by the KVKK. If the reply is not sufficient, you can complain to the Turkish Personal Data Protection Board.",
    browserTitle: "Delete or block cookies in the browser",
    browsers: [
      {
        name: "Chrome",
        steps:
          "Open the menu at the top right, then Settings, Privacy and security, Third-party cookies. You can also delete this site’s cookies from the lock icon in the address bar.",
      },
      {
        name: "Safari",
        steps:
          "On a Mac, use Safari, Settings, Privacy. On an iPhone, use Settings, Apps, Safari, Advanced, Website Data.",
      },
      {
        name: "Firefox",
        steps:
          "Open the menu, then Settings, Privacy & Security, Cookies and Site Data, Manage Data.",
      },
    ],
    blockNote:
      "If you block cookies, the site may not remember your language and the cookie notice may appear again. The other pages still open.",
  },
};

const ar: CookiePolicyCopy = {
  eyebrow: "ملفات تعريف الارتباط",
  title: "سياسة ملفات تعريف الارتباط ونص التوضيح",
  intro:
    "يوضح هذا النص الملفات التي يستخدمها الموقع، وسبب حفظها، ومدة بقائها، والسند القانوني، وحقوقكم.",
  updated: "آخر تحديث: 11 أكتوبر 2026",
  identity: {
    title: "1. هوية مسؤول البيانات",
    body: "مسؤول البيانات هو Kesu، الجهة التي تشغّل هذا الموقع. الاسم وبيانات الاتصال أدناه هي السجل المنشور في الموقع. يمكنكم إرسال الطلبات إلى عنوان البريد الإلكتروني.",
    name: "الاسم",
    address: "العنوان",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    whatsapp: "واتساب",
  },
  types: {
    title: "2. أنواع الملفات وأغراض استخدامها",
    intro:
      "ملف تعريف الارتباط سجل نصي صغير يكتبه الموقع في المتصفح. الأنواع المستخدمة في هذا الموقع هي الآتية.",
    items: [
      {
        title: "ضرورية",
        body: "لازمة لعمل الموقع. تتذكر أنكم قبلتم الإشعار. من دونها يظهر الإشعار في كل زيارة.",
      },
      {
        title: "وظيفية",
        body: "تتذكر اللغة التي اخترتموها، فيُفتح الموقع باللغة نفسها في الزيارة التالية.",
      },
      {
        title: "الأداء والتحليل",
        body: "غير مستخدمة. لا يُكتب ملف لقياس عدد الزيارات أو النقرات أو نشاط مشابه.",
      },
      {
        title: "الإعلان والتسويق",
        body: "غير مستخدمة. لا يوجد ملف لشبكة إعلانات أو إعادة استهداف أو بكسل لوسائل التواصل.",
      },
    ],
  },
  inventory: {
    title: "3. جرد الملفات الحالي",
    intro: "الملفات التي تعمل فعلياً في الموقع هي هذه فقط.",
    columns: {
      name: "اسم الملف",
      provider: "المزوّد",
      type: "النوع",
      purpose: "الغرض",
      duration: "مدة الحفظ",
    },
    rows: [
      {
        name: "kesu-consent",
        provider: "Kesu (طرف أول)",
        type: "ضروري",
        purpose: "يتذكر أنكم قبلتم الإشعار. يُكتب فقط عند الضغط على موافق.",
        duration: "سنة واحدة",
      },
      {
        name: "kesu-locale",
        provider: "Kesu (طرف أول)",
        type: "وظيفي",
        purpose: "يتذكر لغتكم. يُكتب عندما يُفتح الموقع بلغة معيّنة.",
        duration: "سنة واحدة",
      },
    ],
    note: "كلا الملفين يخص هذا الموقع فقط. المسار: /. SameSite: Lax.",
    sessionTitle: "سجلات مؤقتة ليست ملفات تعريف ارتباط",
    sessionBody:
      "شاشة الافتتاح (kesu-intro-seen) والسجل البصري القصير للانتقال إلى صفحة المنتج (kesu-reverse-morph) ليسا ملفات تعريف ارتباط. يبقيان في ذاكرة الجلسة، ويُحذفان عند إغلاق التبويب، ولا يُرسلان إلى مزوّد إعلانات أو تحليل.",
  },
  legal: {
    title: "4. السند القانوني وطريقة الجمع",
    paragraphs: [
      "تُكتب الملفات في المتصفح بواسطة هذا الموقع عند الزيارة. لا تُجمع عبر نموذج ولا بطلب وثيقة هوية.",
      "kesu-consent ملف ضروري. السند القانوني هو المصلحة المشروعة وفق المادة 5/2-f من القانون التركي رقم 6698 (KVKK): تذكّر أن الإشعار عُرض. لا تُطلب موافقة صريحة لهذا الملف. يُكتب فقط عند الضغط على موافق.",
      "kesu-locale ملف وظيفي. السند القانوني هو المصلحة المشروعة نفسها: عرض الموقع باللغة التي اخترتموها. تظهر اللغة أيضاً في شريط العنوان، ويحفظ الملف هذا الاختيار للزيارة التالية. يُكتب عند فتح الموقع بلغة.",
      "لا يوجد ملف تحليل أو إعلان، لذلك لا يُعالَج أي ملف على أساس الموافقة الصريحة. زر موافق يبيّن أنكم رأيتم الإشعار وأنه يمكن حفظ سجل الملف الضروري.",
    ],
  },
  transfers: {
    title: "5. النقل إلى أطراف ثالثة",
    paragraphs: [
      "لا تُنقل البيانات المجموعة عبر الملفات إلى Google أو Meta أو أي مزوّد إعلانات أو تحليل آخر.",
      "هذا الموقع وحده يقرأ الملفات. عبارة Kesu في عمود المزوّد تعني أن الملف يخص هذا النطاق.",
      "لا تُرسل بيانات الملفات إلى شبكة إعلانات أو تحليل في الخارج.",
    ],
  },
  rights: {
    title: "6. حقوقكم وإدارة التفضيلات",
    intro: "بموجب المادة 11 من KVKK لديكم الحق في:",
    items: [
      "معرفة ما إذا كانت بياناتكم الشخصية تُعالَج",
      "طلب معلومات إن كانت قد عولجت",
      "معرفة غرض المعالجة وما إذا كانت تُستخدم لهذا الغرض",
      "معرفة الأطراف الثالثة التي نُقلت إليها داخل تركيا أو خارجها",
      "طلب التصحيح إن كانت ناقصة أو غير صحيحة",
      "طلب الحذف أو الإتلاف وفق شروط المادة 7 من KVKK",
      "طلب إبلاغ الأطراف الثالثة التي نُقلت إليها البيانات بعمليات التصحيح أو الحذف",
      "الاعتراض على نتيجة ضدكم ناشئة فقط عن تحليل آلي",
      "طلب التعويض إن لحقكم ضرر بسبب معالجة غير مشروعة",
    ],
    apply:
      "اكتبوا إلى عنوان البريد الإلكتروني أدناه. أضيفوا ما يكفي لتأكيد الهوية. تُجاب الطلبات خلال المدة التي يحددها KVKK. إذا لم يكن الرد كافياً يمكنكم الشكوى إلى مجلس حماية البيانات الشخصية في تركيا.",
    browserTitle: "حذف الملفات أو منعها من المتصفح",
    browsers: [
      {
        name: "Chrome",
        steps:
          "من القائمة أعلى اليمين: الإعدادات، ثم الخصوصية والأمان، ثم ملفات الطرف الثالث. يمكن أيضاً حذف ملفات هذا الموقع من رمز القفل في شريط العنوان.",
      },
      {
        name: "Safari",
        steps:
          "على ماك: Safari ثم الإعدادات ثم الخصوصية. على آيفون: الإعدادات، التطبيقات، Safari، متقدم، بيانات المواقع.",
      },
      {
        name: "Firefox",
        steps:
          "القائمة، ثم الإعدادات، الخصوصية والأمان، ملفات تعريف الارتباط وبيانات المواقع، إدارة البيانات.",
      },
    ],
    blockNote:
      "إذا منعتم الملفات فقد لا يتذكر الموقع لغتكم وقد يظهر الإشعار من جديد. تبقى الصفحات الأخرى متاحة.",
  },
};

const ru: CookiePolicyCopy = {
  eyebrow: "Файлы cookie",
  title: "Политика cookie и уведомление",
  intro:
    "Этот текст объясняет, какие файлы cookie использует сайт, зачем и как долго они хранятся, правовое основание и ваши права.",
  updated: "Последнее обновление: 11 октября 2026",
  identity: {
    title: "1. Сведения об операторе данных",
    body: "Оператор данных — Kesu, владелец этого сайта. Имя и контакты ниже совпадают с записью, опубликованной на сайте. Запросы можно отправить на адрес электронной почты.",
    name: "Наименование",
    address: "Адрес",
    email: "Эл. почта",
    phone: "Телефон",
    whatsapp: "WhatsApp",
  },
  types: {
    title: "2. Виды cookie и цели использования",
    intro:
      "Cookie — это небольшая текстовая запись, которую сайт сохраняет в браузере. На этом сайте используются следующие виды.",
    items: [
      {
        title: "Обязательные",
        body: "Нужны для работы сайта. Запоминают, что вы приняли уведомление. Без этой записи уведомление появляется при каждом визите.",
      },
      {
        title: "Функциональные",
        body: "Запоминают выбранный язык, чтобы при следующем визите сайт открылся на том же языке.",
      },
      {
        title: "Производительность и аналитика",
        body: "Не используются. Cookie для подсчёта визитов, кликов или похожих измерений не записываются.",
      },
      {
        title: "Реклама и маркетинг",
        body: "Не используются. Нет cookie рекламных сетей, ретаргетинга или пикселей социальных сетей.",
      },
    ],
  },
  inventory: {
    title: "3. Актуальный перечень cookie",
    intro: "На сайте фактически работают только эти файлы cookie.",
    columns: {
      name: "Имя",
      provider: "Поставщик",
      type: "Вид",
      purpose: "Цель",
      duration: "Срок хранения",
    },
    rows: [
      {
        name: "kesu-consent",
        provider: "Kesu (первая сторона)",
        type: "Обязательный",
        purpose:
          "Запоминает, что вы приняли уведомление. Записывается только после нажатия «Принять».",
        duration: "1 год",
      },
      {
        name: "kesu-locale",
        provider: "Kesu (первая сторона)",
        type: "Функциональный",
        purpose:
          "Запоминает ваш язык. Записывается, когда сайт открывается на одном из языков.",
        duration: "1 год",
      },
    ],
    note: "Оба файла cookie принадлежат только этому сайту. Путь: /. SameSite: Lax.",
    sessionTitle: "Временные записи, которые не являются cookie",
    sessionBody:
      "Вступительный экран (kesu-intro-seen) и краткая визуальная запись перехода на страницу продукта (kesu-reverse-morph) не являются cookie. Они хранятся в памяти сессии браузера, удаляются при закрытии вкладки и не отправляются рекламному или аналитическому поставщику.",
  },
  legal: {
    title: "4. Правовое основание и способ сбора",
    paragraphs: [
      "Cookie записывает в браузер сам сайт, когда вы его открываете. Они не собираются через форму и не требуют документа, удостоверяющего личность.",
      "kesu-consent — обязательный cookie. Правовое основание — законный интерес по статье 5(2)(f) турецкого закона № 6698 (KVKK): запомнить, что уведомление было показано. Отдельное явное согласие для этого cookie не требуется. Он записывается только после нажатия «Принять».",
      "kesu-locale — функциональный cookie. Правовое основание то же: показывать сайт на выбранном языке. Язык виден и в адресной строке; cookie сохраняет этот выбор для следующего визита. Он записывается, когда сайт открывается на языке.",
      "Аналитических и рекламных cookie нет, поэтому ни один cookie не обрабатывается на основании явного согласия. Кнопка «Принять» подтверждает, что вы видели уведомление и что запись обязательного cookie может быть сохранена.",
    ],
  },
  transfers: {
    title: "5. Передача третьим лицам",
    paragraphs: [
      "Данные, собранные через cookie, не передаются Google, Meta или другому рекламному либо аналитическому поставщику.",
      "Cookie читает только этот сайт. «Kesu» в столбце поставщика означает, что cookie принадлежит этому домену.",
      "Данные cookie не отправляются зарубежной рекламной или аналитической сети.",
    ],
  },
  rights: {
    title: "6. Ваши права и управление настройками",
    intro: "По статье 11 KVKK вы вправе:",
    items: [
      "Узнать, обрабатываются ли ваши персональные данные",
      "Запросить сведения, если они обрабатывались",
      "Узнать цель обработки и используется ли она по назначению",
      "Знать третьих лиц, которым данные переданы в Турции или за рубежом",
      "Потребовать исправления, если данные неполны или неверны",
      "Потребовать удаления или уничтожения на условиях статьи 7 KVKK",
      "Потребовать, чтобы исправление или удаление сообщили третьим лицам, которым данные были переданы",
      "Возразить против результата против вас, полученного только автоматическим анализом",
      "Потребовать возмещения ущерба, если он возник из-за незаконной обработки",
    ],
    apply:
      "Напишите на адрес электронной почты ниже. Укажите сведения, достаточные для подтверждения личности. Запросы рассматриваются в срок, установленный KVKK. Если ответ недостаточен, можно обратиться с жалобой в Совет по защите персональных данных Турции.",
    browserTitle: "Удалить или заблокировать cookie в браузере",
    browsers: [
      {
        name: "Chrome",
        steps:
          "Меню справа сверху, затем «Настройки», «Конфиденциальность и безопасность», «Сторонние файлы cookie». Cookie этого сайта можно удалить и через значок замка в адресной строке.",
      },
      {
        name: "Safari",
        steps:
          "На Mac: Safari, «Настройки», «Конфиденциальность». На iPhone: «Настройки», «Приложения», Safari, «Дополнительно», «Данные сайтов».",
      },
      {
        name: "Firefox",
        steps:
          "Меню, затем «Настройки», «Приватность и защита», «Куки и данные сайтов», «Управление данными».",
      },
    ],
    blockNote:
      "Если заблокировать cookie, сайт может не запомнить язык, а уведомление появится снова. Остальные страницы по-прежнему открываются.",
  },
};

const policies: Record<Locale, CookiePolicyCopy> = { tr, en, ar, ru };

export function getCookiePolicy(locale: Locale): CookiePolicyCopy {
  return policies[locale];
}
