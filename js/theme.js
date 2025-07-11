document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon'); // img要素を取得
    const body = document.body;

    // 画像のパスを定義 (HTMLファイルからの相対パス)
    // プロジェクトのルートディレクトリが 'team-project' と仮定
    const moonIconPath = 'images/moon.png';
    const sunIconPath = 'images/sun.png';

    // ページの初期テーマを設定
    // 優先順位: ローカルストレージ > OS設定 > デフォルト（ライトモード）
    const savedTheme = localStorage.getItem('theme'); // ローカルストレージからテーマを読み込む

    if (savedTheme) {
        // ローカルストレージに保存されたテーマがあればそれを適用
        body.classList.add(savedTheme);
        if (savedTheme === 'dark-mode') {
            themeIcon.src = sunIconPath; // ダークモードなら太陽の画像
        } else {
            themeIcon.src = moonIconPath; // ライトモードなら月の画像
        }
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // OSがダークモードを推奨している場合、ダークモードを適用
        body.classList.add('dark-mode');
        themeIcon.src = sunIconPath;
        localStorage.setItem('theme', 'dark-mode'); // OS設定をローカルストレージに保存
    } else {
        // それ以外の場合（または初回アクセス時）はライトモードを適用（明示的に保存）
        // bodyにはデフォルトでクラスがないため、特にクラス追加は不要だが、LocalStorageには保存
        localStorage.setItem('theme', 'light-mode');
        themeIcon.src = moonIconPath;
    }


    // ボタンがクリックされたときの処理
    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            // 現在ダークモードならライトモードに切り替え
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light-mode'); // 設定を保存
            themeIcon.src = moonIconPath; // 月の画像に変更
            themeIcon.alt = 'ライトモードに切り替える';
        } else {
            // 現在ライトモードならダークモードに切り替え
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode'); // 設定を保存
            themeIcon.src = sunIconPath; // 太陽の画像に変更
            themeIcon.alt = 'ダークモードに切り替える';
        }
    });
});