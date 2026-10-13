// 日本語版のコンテンツ。data.js（英語版）と同じ項目を上書きします。
// Japanese content — overrides the matching fields in data.js. Wording follows the 履歴書.

export default {
  profile: {
    role: 'ソフトウェアエンジニア · フルスタック & ML',
    location: 'デリー、インド',
    status: 'インド・日本での就職を希望',
  },

  roles: ['フルスタックエンジニア', 'バックエンド開発者（Java · Spring Boot）', 'AI・機械学習エンジニア', '日本語も話せるエンジニア'],

  hero: {
    sub: 'Spring Boot・React・FastAPI を中心に、プロダクトを企画から本番運用までつくるフルスタックエンジニアです。日本語での業務にも対応できます。',
  },

  companies: ['Infosys', 'Nagarro', 'TechDost', 'マニパル大学'],

  stats: [
    { value: 3, suffix: '社', label: 'インターン経験', note: 'Infosys · Nagarro · TechDost' },
    { value: 1000, suffix: '+', label: '件の同時注文に対応', note: 'Rotino 負荷テスト' },
    { value: 100, suffix: '+', label: '件 / 日の履歴書を処理', note: 'Oraculum 本番運用' },
    { value: 8.91, suffix: '', label: 'CGPA', note: 'Dean’s List ×3', decimals: 2 },
  ],

  marquee: ['フルスタック開発', 'LLM アプリケーション', 'Spring Boot', 'React & Vue', '機械学習', '日本語 · N3 相当'],

  bio: {
    lines: ['フルスタックのプロダクトと、', 'それを賢くする機械学習を', 'つくっています。'],
    body: [
      'マニパル大学ジャイプール校でコンピューターサイエンスを専攻（CGPA 8.91、Dean’s List）。Infosys でのエンタープライズ Java・React、Nagarro でのレスポンシブなフロントエンド、TechDost でのバックエンド開発と、3 つのインターンを通じてフルスタックの実務経験を積みました。',
      '新しい技術を継続的に学びながら、問題解決能力と責任感を持って業務に取り組みます。大気質予測のアンサンブル学習に関する論文も発表しました。',
    ],
    terminal: [
      ['location', 'デリー、インド'],
      ['education', 'B.Tech CSE · MUJ · 8.91'],
      ['focus', 'フルスタック · LLM · ML'],
      ['languages', 'English · 日本語 (NAT-Q3)'],
      ['status', '就職活動中 · 日本勤務も可'],
    ],
  },

  japan: {
    title: ['日本で働く', '準備ができています。'],
    sub: 'Ready to work in Japan.',
    body: [
      '日本語学習に力を入れており、JLPT N4 と NAT 3Q（N3 相当）を取得しました。読み書き・会話ができ、日本語での業務環境にも対応できます。',
      'ソフトウェア開発・Web エンジニア職を希望しており、日本国内での勤務にも柔軟に対応可能です。',
    ],
    skills: ['読む', '書く', '会話', '日本語での業務'],
    current: '現在のレベル',
    certified: '取得済み',
    timeline: [
      { date: '2020', title: 'CBSE 10年生 日本語', note: '満点（100%）で表彰' },
      { date: '2024.06', title: 'JLPT N4', note: '合格' },
      { date: '2024.06', title: 'NAT 4Q', note: '合格' },
      { date: '2025.06', title: 'NAT 3Q', note: '合格 · JLPT N3 相当' },
    ],
  },

  projects: {
    oraculum: {
      category: 'AI キャリア支援',
      summary: '履歴書解析、キャリアロードマップ生成、カバーレター作成を LLM で実現する AI キャリア支援プラットフォーム。',
      meta: { role: 'フルスタック + AI 統合', status: '公開中', type: 'AI プラットフォーム' },
      imageNote: '公開サイト · oraculum-iota.vercel.app',
      challenge: '求職者は、自分の履歴書が採用担当者や ATS にどう評価されるのか、具体的なフィードバックを得る機会がほとんどありません。',
      approach: '履歴書を解析してキーワードを抽出し、個別のロードマップやカバーレターを生成する、LLM を活用した FastAPI サービス群を構築。',
      outcome: '1 日 100 件以上の履歴書を処理し、キーワード抽出精度 90% 以上を達成。',
      methodology: 'バックエンドは役割ごとに分けた FastAPI サービスで構成。PyPDF で解析、OpenAI API で分析と生成を行い、すべてのルートを JWT で保護しています。クライアントは Vue 3 + TypeScript。Vitest と Playwright のテストを CI で毎回実行し、テスト時間を 35%、デプロイエラーを 20% 削減しました。',
      metrics: ['1 日 100 件以上の履歴書を処理', 'キーワード抽出精度 90% 以上', 'テスト時間を 35% 削減', 'デプロイエラーを 20% 削減'],
      flow: ['履歴書の解析', 'LLM による分析', 'ロードマップ・カバーレター生成', 'JWT 認証', 'CI/CD・デプロイ'],
    },
    rotino: {
      category: 'フードデリバリー',
      summary: 'ロールベースのアクセス制御と決済機能を備えた、フルスタックのフード注文プラットフォーム。',
      meta: { role: 'フルスタック開発', status: '公開中', type: 'Web プラットフォーム' },
      imageNote: 'UI イメージ図',
      challenge: '注文システムはアクセスが集中しても正確に動く必要があり、注文と決済は必ず一度だけ処理されなければなりません。',
      approach: 'MERN スタックで構築し、顧客と管理者を JWT のロールで分離。決済には Razorpay を採用しました。',
      outcome: '1,000 件以上の同時注文で負荷テストを行い、決済成功率 95% を達成。',
      methodology: 'React + Tailwind のフロントエンドが、MongoDB を使った Express/Node API と連携します。ロールで顧客と管理者のフローを分け、決済は Razorpay Sandbox API で処理。Render へのデプロイ前に、同時注文の負荷テストを実施しました。',
      metrics: ['1,000 件以上の同時注文', '決済成功率 95%', 'ロールベースのアクセス制御', 'Render にデプロイ'],
      flow: ['データモデリング', '認証・ロール', '注文フロー', '決済', '負荷テスト・デプロイ'],
    },
    'brahma-dms': {
      category: '災害対応',
      summary: 'シミュレーションのドローンとクアッドボットを、リアルタイムの地図上で連携させる災害対応プラットフォーム。',
      meta: { role: 'フルスタック開発', status: 'SAP Hackfest 準優勝', type: 'ハッカソン作品' },
      imageNote: 'UI イメージ図',
      challenge: '災害時には対応が追いつかないほどの速さで報告が届き、位置などの状況も失われがちです。',
      approach: '届いた報告をリアルタイムで地図に表示し、シミュレーションのドローンやクアッドボットを派遣する地理空間ダッシュボード。',
      outcome: '報告処理の遅延を 40% 短縮し、200 件以上の同時レポートに対応。',
      methodology: 'PHP/MySQL のバックエンドで事案を管理し、JavaScript + Leaflet.js のフロントエンドでリアルタイムに描画。ロボットシミュレーション層がドローンとクアッドボットの派遣を担当します。ハッカソンの限られた時間で開発し、SAP PSGitech Hackfest で準優勝しました。',
      metrics: ['200 件以上の同時レポート', '遅延を 40% 短縮', 'リアルタイムの地図表示', 'ドローン・クアッドボットのシミュレーション'],
      flow: ['報告の受付', '地図での可視化', 'ロボットシミュレーション', '派遣・連携', 'ライブデモ'],
    },
  },

  experience: {
    Infosys: {
      role: 'Java インターン（トレーニー）',
      period: '2026年1月 — 5月',
      text: 'フルスタックのエンタープライズプロジェクトに参加。Java・Spring Boot・Spring Security と MySQL でバックエンドを、React + TypeScript でフロントエンドを開発。JUnit・Mockito でテストし、SonarQube でコード品質を管理しました。',
    },
    Nagarro: {
      role: 'Web 開発インターン',
      period: '2025年5月 — 7月',
      text: 'レスポンシブなフロントエンドモジュールを開発し、モバイルでの使いやすさを 25% 向上、UI バグを 10% 削減しました。',
    },
    TechDost: {
      role: 'バックエンドインターン',
      period: '2024年6月 — 12月',
      text: 'Laravel で学校管理ポータル（利用者 500 名以上）を構築。PHP/MySQL の業務を自動化して手作業を 60% 削減し、クエリ最適化で API のレイテンシを 40% 改善しました。',
    },
    'Manipal University Jaipur': {
      company: 'マニパル大学ジャイプール校',
      role: 'コンピューターサイエンス学士',
      period: '2022 — 2026',
      text: 'CGPA 8.91。第 1・第 2・第 4 学期に Dean’s List（GPA 9.0 以上）として表彰。',
    },
  },

  research: {
    date: '2025年4月',
    summary: 'scikit-learn・XGBoost を用いた、PM10 大気質予測のためのハイブリッド・メタアンサンブル学習モデル。ベースライン比で MAE を 12%、RMSE を 15% 改善しました。',
  },

  recognition: [
    ['Code with Cisco 2025', '準優勝 · スマートホームオートメーション'],
    ['SAP PSGitech Hackfest', '準優勝 · ドローン・クアッドボットによる災害管理'],
    ['Dean’s List', '第 1・第 2・第 4 学期に表彰'],
    ['日本語', 'JLPT N4 · NAT 3Q（N3 相当）· CBSE 10年生で満点'],
  ],

  certifications: [
    'OOP in Java — Oracle', 'データ構造とアルゴリズム — NPTEL', 'ソフトウェアテスト — NPTEL', 'Python — NPTEL',
    'CS50 — edX', 'CCNAv7 Enterprise', 'Red Hat System Admin II', 'Database SQL',
  ],
}
