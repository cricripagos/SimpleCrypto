## Primeros pasos

Usamos la última versión estable de node lts/hydrogen y Yarn como package-manager. La puedes instalar con:

```bash
nvm install lts/hydrogen
```
Ya estamos list@s para empezar. Instala las dependencias y empieza a hackear!

```bash
yarn
```
Para probar que todo este en orden:

```bash
yarn dev
```

## Buenas prácticas y tips

Apenas vas llegando y el aburrido del equipo ya puso reglas estrictas. Créeme es por tu bien y en un par de días ya ni lo vas a notar.

1. Para que en automático Visual Code estructure prolijo tu código cada que guardas tus avances, instala la extensión: Prettier - Code formatter.

      En Visual Code:
      Ctrl + P >
      ext install esbenp.prettier-vscode
      
      También puedes formatear manual usando:
      
      ```bash
      yarn prettier
      ```
2. Usamos pre-commit que te dará advertencias sobre las variables que declaraste y no estás usando. Cada que das commit se ejecuta en automático 'yarn lint'. 

3. Usamos pre-push para revisar que tu código no tenga errores. Cuando das un push, se ejecuta 'yarn build'. Esto nos va asegurar que cualquier rama en el repositorio, este lista y libre de conflictos con Vercel. TE VA A DAR ERROR si tu código no pasa las validaciones. Esto es porque si no lo revisas y resuelves tú, le tomará más tiempo a la persona que tenga que resolver el conflicto para poder integrarlo a producción.

4. Claridad con los commits. Nos va a pasar mil veces tener que regresar a una versión anterior del código. Será mucho más fácil encontrar la versión si usamos prefijos en la descripción. Te dejo algunas convenciones:
            build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
            ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
            docs: Documentation only changes
            feat: A new feature
            fix: A bug fix
            perf: A code change that improves performance
            refactor: A code change that neither fixes a bug nor adds a feature
            style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
            test: Adding missing tests or correcting existing tests
