const path = require('path');
const { task, src, dest } = require('gulp');

task('build:icons', copyIcons);

function copyIcons() {
  const nodeSource = path.resolve('nodes', '**', '*.{png,svg}');
  const nodeDestination = path.resolve('dist', 'nodes');

  // O script original tentava copiar credenciais, o que causava o erro.
  // Agora, ele só copia os ícones dos nós.
  return src(nodeSource).pipe(dest(nodeDestination));
}
