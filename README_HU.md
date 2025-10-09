# Tikera

[**English description**](./README.md)

## Leírás

A Tikera (egy mozijegy-foglaló webalkalmazás) a **Kliensoldali Webprogramozás** kurzus végső beadandója, amely az ELTE programtervező informatikus BSc képzésének része.
<br>A REST API-t biztosították, a fő feladat pedig a Tikera alkalmazás front-endjének elkészítése volt **React**, **Redux** és **RTK Query** használatával.

## Feladatok

### Hitelesítés

- A felhasználók regisztrálhatnak, bejelentkezhetnek és kijelentkezhetnek.
- Az adminisztrátorok be- és kijelentkezhetnek.

### Alapvető funkciók

- Mindenki megtekintheti és navigálhat a filmek és vetítések listájában.
- A felhasználók foglalhatnak helyeket a vetítésekre, és megtekinthetik, hogy mely vetítésekre foglaltak helyet.
- Az adminisztrátorok létrehozhatnak, módosíthatnak és eltávolíthatnak filmeket és vetítéseket.

### További funkciók

- **Sötét/világos téma** preferencia, a localStorage-ba mentve.
- **Reszponzív dizájn**, a weboldal optimálisan jelenik meg mobilokon, tableteken és számítógépeken.
- **Toastok**, melyek visszajeleznek a műveletek eredményeiről (sikeres/sikertelen).

## Felhasznált könyvtárak

- [**React**](https://react.dev/) – JavaScript könyvtár felhasználói felületek létrehozásához.
- [**Redux**](https://redux.js.org/) – Kiszámítható állapottároló az alkalmazásállapot kezeléséhez.
- [**RTK Query**](https://redux-toolkit.js.org/rtk-query/overview) – A Redux Toolkitbe ​​épített adatlekérő és gyorsítótárazó eszköz.
- [**Tailwind CSS**](https://tailwindcss.com/) – CSS keretrendszer reszponzív felületek tervezéséhez.
- [**daisyUI**](https://daisyui.com/) – Tailwind CSS kiegészítő, mely előre elkészített, témázható UI komponenseket biztosít.
- [**Framer Motion**](https://motion.dev/) – React animációs könyvtár folyékony és interaktív felhasználói felület animációk létrehozásához.

## Helyi futtatás

**Követelmények:**
[**Node.js**](https://nodejs.org/), [**PHP**](https://www.php.net/), [**Composer**](https://getcomposer.org/)

1. REST API-t elíndítása: Navigáljon a `server` mappába, és futtassa a következőt:

   - Windows:`init.bat`
   - Linux: `init.sh`

2. Kliens elindítása: Navigáljon a `client` mappába, és futtassa a következőt:

   ```
   npm install
   npm run dev
   ```

### Tesztelés

Admin felhasználó adatai:
<br>email: `admin@example.com`
<br>jelszó: `admin`
