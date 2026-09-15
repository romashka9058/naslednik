const fs = require('fs');
const path = require('path');

module.exports = function(context) {
    const themesPath = path.join(context.opts.projectRoot, 'platforms', 'android', 'app', 'src', 'main', 'res', 'values', 'cdv_themes.xml');

    if (!fs.existsSync(themesPath)) {
        console.log('--- [HOOK] cdv_themes.xml НЕТУ: ' + themesPath);
        return;
    }

    let content = fs.readFileSync(themesPath, 'utf8');
    let isModified = false;

    if (content.indexOf('parent="Theme.Cordova.NoActionBar"') !== -1 && content.indexOf('.EdgeToEdge"') === -1) {
        content = content.replace(
            'parent="Theme.Cordova.NoActionBar"',
            'parent="Theme.Cordova.NoActionBar.EdgeToEdge"'
        );
        isModified = true;
    }

    if (content.indexOf('android:navigationBarColor') === -1) {
        const injection = `
        <item name="android:statusBarColor">@android:color/transparent</item>
        <item name="android:navigationBarColor">@android:color/transparent</item>
        <item name="android:windowDrawsSystemBarBackgrounds">true</item>
        <item name="android:enforceStatusBarContrast">false</item>
        <item name="android:enforceNavigationBarContrast">false</item>
    </style>`;

        const themeRegex = /(<style\s+name="Theme\.Cordova"[\s\S]*?)<\/style>/;

        if (themeRegex.test(content)) {
            content = content.replace(themeRegex, '$1' + injection);
            isModified = true;
        }
    }

    if (isModified) {
        fs.writeFileSync(themesPath, content, 'utf8');
        console.log('--- [HOOK] ВСЕ ЗАЕБСИЬ');
    }
};