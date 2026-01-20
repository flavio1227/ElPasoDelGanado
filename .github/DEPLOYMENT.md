# Guía de Despliegue - GitHub Pages

## Pasos para Habilitar GitHub Pages

1. **Ve a la configuración del repositorio**:
   - Abre: https://github.com/flavio1227/ElPasoDelGanado
   - Haz clic en **Settings** (Configuración)

2. **Habilita GitHub Pages**:
   - En el menú lateral izquierdo, busca y haz clic en **Pages**
   - En la sección **Source**, selecciona **GitHub Actions** (NO selecciones "Deploy from a branch")
   - Guarda los cambios

3. **Verifica los permisos del repositorio**:
   - En Settings > Actions > General
   - Asegúrate de que "Workflow permissions" esté configurado como:
     - ✅ **Read and write permissions** 
     - ✅ **Allow GitHub Actions to create and approve pull requests**

4. **Verifica que los workflows estén activos**:
   - Ve a la pestaña **Actions** del repositorio
   - Deberías ver dos workflows:
     - **CI** - Se ejecuta en cada push/PR
     - **Deploy to GitHub Pages** - Se ejecuta en cada push a main/master

## Solución de Problemas

### Si no ves los workflows en la pestaña Actions:

1. Verifica que los archivos `.github/workflows/*.yml` estén en el repositorio
2. Verifica que el repositorio tenga permisos de Actions habilitados
3. Haz un nuevo push para activar los workflows

### Si el workflow de deploy falla:

1. Verifica que GitHub Pages esté configurado con "GitHub Actions" como source
2. Verifica los permisos del repositorio (ver paso 3 arriba)
3. Revisa los logs del workflow en la pestaña Actions para ver el error específico

### Si el workflow de CI falla:

- El workflow de CI ahora es más tolerante y no debería fallar por warnings de lint
- Si aún falla, revisa los logs para ver el error específico

## URL de la Aplicación

Una vez configurado correctamente, la aplicación estará disponible en:
**https://flavio1227.github.io/ElPasoDelGanado/**

## Notas Importantes

- El primer despliegue puede tardar unos minutos
- Los despliegues posteriores se ejecutan automáticamente en cada push a `main`
- La aplicación es una PWA y se puede instalar en dispositivos móviles y escritorio
