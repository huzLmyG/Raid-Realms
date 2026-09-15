import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

console.log('Building production distribution for itch.io...');
execSync('npm run build', { stdio: 'inherit' });

const releaseDir = path.resolve(process.cwd(), 'release');
if (!fs.existsSync(releaseDir)) {
  fs.mkdirSync(releaseDir, { recursive: true });
}

const zipPath = path.resolve(releaseDir, 'raid-realms-itch-html5.zip');
if (fs.existsSync(zipPath)) {
  fs.unlinkSync(zipPath);
}

console.log(`Packaging dist folder into: ${zipPath}`);
if (process.platform === 'win32') {
  execSync(`powershell -Command "Compress-Archive -Path 'dist\\*' -DestinationPath '${zipPath}' -Force"`, { stdio: 'inherit' });
} else {
  execSync(`cd dist && zip -r "${zipPath}" ./*`, { stdio: 'inherit' });
}

console.log('itch.io release bundle successfully created!');
const stats = fs.statSync(zipPath);
console.log(`Bundle size: ${(stats.size / (1024 * 1024)).toFixed(2)} MB`);
