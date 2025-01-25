const { createClient } = require('@supabase/supabase-js')
const { PrismaClient } = require('@prisma/client')

const _prisma = new PrismaClient()

// Supabaseクライアントの初期化
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Required environment variables are not set')
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

async function createSupabaseUser(email: string, password: string): Promise<any> {
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  })

  if (error) {
    console.error('Error creating Supabase user:', error)
    throw error
  }

  return data.user
}

async function main() {
  try {
    // 管理者ユーザーの作成
    const adminUser = await createSupabaseUser('admin@example.com', 'admin123')
    if (!adminUser?.id) throw new Error('Failed to create admin user')

    const admin = await _prisma.users.create({
      data: {
        uid: adminUser.id,
        name: '管理者',
        email: 'admin@example.com',
        isAdmin: true,
      },
    })

    // テストユーザー1の作成
    const supabaseUser1 = await createSupabaseUser('yamada@example.com', 'password123')
    if (!supabaseUser1?.id) throw new Error('Failed to create Supabase user 1')

    const user1 = await _prisma.users.create({
      data: {
        uid: supabaseUser1.id,
        name: '山田太郎',
        email: 'yamada@example.com',
      },
    })

    // テストユーザー2の作成
    const supabaseUser2 = await createSupabaseUser('sato@example.com', 'password123')
    if (!supabaseUser2?.id) throw new Error('Failed to create Supabase user 2')

    const user2 = await _prisma.users.create({
      data: {
        uid: supabaseUser2.id,
        name: '佐藤花子',
        email: 'sato@example.com',
      },
    })

    // user1のPodcast作成
    const podcast1 = await _prisma.podcasts.create({
      data: {
        title: 'スタートアップラジオ',
        description: '日本のスタートアップシーンの最前線で活躍する起業家へのインタビュー',
        userId: user1.id,
        episodes: {
          create: [
            {
              title: '#1 シリコンバレーと日本のスタートアップの違い',
              description: '元Googleエンジニアで現在シリーズAを調達したスタートアップCEOが語る、両国の起業環境の違いと日本の可能性',
            },
            {
              title: '#2 事業成長の裏側にある組織作りの秘訣',
              description: '創業3年で従業員数300名まで急成長した企業の組織マネジメントと課題解決の実例',
            },
          ],
        },
      },
    })

    // user2のPodcast作成
    const podcast2 = await _prisma.podcasts.create({
      data: {
        title: 'テック探求ラボ',
        description: '最新テクノロジーとその社会的影響を深掘りする教養番組',
        userId: user2.id,
        episodes: {
          create: [
            {
              title: '#1 生成AIは人類の仕事を奪うのか',
              description: 'AI研究者と経済学者が議論する、技術革新がもたらす労働市場の変化と私たちの未来',
            },
            {
              title: '#2 ブロックチェーンが変える金融の未来',
              description: 'DeFiの最前線で活躍する開発者が語る、分散型金融が解決する社会課題',
            },
          ],
        },
      },
    })

    // コンテンツ作成
    await _prisma.contents.create({
      data: {
        title: 'スタートアップラジオ #1 要約：シリコンバレーと日本の起業環境の決定的な違い',
        body: `<h1>エピソード要約</h1><p>シリコンバレーと日本のスタートアップ環境の主な違いについて、実体験を交えた考察が展開されました。</p><h2>主要なポイント</h2><h3>1. 失敗に対する社会の許容度</h3><ul><li><p>シリコンバレー：失敗は学習の機会として評価される</p></li><li><p>日本：失敗のリスクを過度に警戒する傾向</p></li></ul><h3>2. 資金調達環境</h3><ul><li><p>シリコンバレー：潤沢な資金と積極的な投資家</p></li><li><p>日本：堅実性を重視するも、近年は改善傾向</p></li></ul><h3>3. 成長に対する考え方</h3><ul><li><p>シリコンバレー：急成長を志向</p></li><li><p>日本：持続可能性を重視</p></li></ul><h2>日本の強み</h2><ul><li><p>技術力の高さ</p></li><li><p>チームワークの質</p></li><li><p>顧客サービスへのこだわり</p></li></ul><h2>今後の展望</h2><p>日本の強みを活かしながら、グローバルで通用する新しいスタートアップモデルを構築できる可能性が示唆されました。</p>`,
        userId: user1.id,
      },
    })

    await _prisma.contents.create({
      data: {
        title: '生成AIと労働市場の変化：テック探求ラボ #1 エピソード解説',
        body: `<h1>エピソード要約</h1><p>AI研究者の山本教授と経済学者の田中氏による、生成AIが労働市場に与える影響についての議論を要約します。</p><h2>議論のポイント</h2><h3>1. 置き換えられる仕事と新しく生まれる仕事</h3><ul><li><p>定型的なタスクは自動化が進む</p></li><li><p>AIとの協業スキルを持つ新しい職種の出現</p></li><li><p>クリエイティブ業界での補助ツールとしての活用</p></li></ul><h3>2. 必要となるスキルシフト</h3><ul><li><p>プロンプトエンジニアリング</p></li><li><p>AI出力の品質管理</p></li><li><p>人間らしい創造性の発揮</p></li></ul><h3>3. 教育システムの課題</h3><ul><li><p>既存の教育カリキュラムの限界</p></li><li><p>生涯学習の重要性</p></li><li><p>実践的なAIリテラシー教育の必要性</p></li></ul><h2>結論</h2><p>技術の発展に伴う労働市場の変化は避けられないが、人間にしかできない価値創造の領域は依然として存在し続ける。</p>`,
        userId: user2.id,
      },
    })

    console.log('シードデータの作成が完了しました！')
  } catch (error) {
    console.error('Error during seeding:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await _prisma.$disconnect()
  })
