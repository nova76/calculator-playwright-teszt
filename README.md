# Calculator Playwright Tesztek

Ez a mappa Playwright E2E teszteket tartalmaz a számológép alkalmazáshoz.

## Playwright vs Cucumber különbségek

### Cucumber (BDD)
- **Gherkin szintaxis**: `Given`, `When`, `Then` lépések
- **Természetes nyelv**: Magyar feature fájlok
- **Step definitions**: JavaScript implementáció
- **BDD megközelítés**: Üzleti követelmények alapján

### Playwright
- **JavaScript/TypeScript**: Közvetlenül kód alapú tesztek
- **Beépített assertions**: `expect()` funkciók
- **Page Object Model**: Támogatott, de nem kötelező
- **Modern web APIs**: Automatikus várakozás, retry logika

## Telepítés és futtatás

```bash
cd calculator-playwright-teszt

# Függőségek telepítése
npm install

# Böngészők telepítése (első alkalommal)
npm run install-browsers

# Tesztek futtatása (headless mód)
npm test

# Tesztek futtatása látható böngészővel
npm run test:headed

# Debug mód - lépésről lépésre
npm run test:debug

# UI mód - grafikus teszt futtatás
npm run test:ui

# Teszt riport megnyitása
npm run test:report
```

## Teszt fájlok

### `tests/calculator.spec.js`
- Alapvető funkcionális tesztek
- Összeadás, kivonás, szorzás, osztás
- Hibakezelés tesztelése
- Input validáció

### `tests/visual.spec.js`
- Vizuális regressziós tesztek
- Screenshot összehasonlítások
- UI komponensek megjelenésének ellenőrzése

### `tests/performance.spec.js`
- Teljesítmény tesztek
- Betöltési idő mérése
- Műveletek válaszideje
- Stressz tesztelés

## Playwright előnyök

✅ **Gyors és megbízható**: Automatikus várakozás, retry logika
✅ **Multi-browser**: Chromium, Firefox, Safari támogatás  
✅ **Mobil tesztelés**: Device emulation
✅ **Screenshot/Video**: Automatikus hibakeresés
✅ **Trace viewer**: Részletes teszt replay
✅ **API tesztelés**: HTTP API-k tesztelése is
✅ **Parallel execution**: Gyors teszt futtatás

## Teszt eredmények

- **HTML Report**: `playwright-report/index.html`
- **JUnit XML**: `test-results/results.xml`
- **Screenshots**: `test-results/` mappában
- **Videos**: Sikertelen teszteknél automatikusan

## Debug lehetőségek

1. **Headed mód**: `--headed` - látható böngésző
2. **Debug mód**: `--debug` - lépésről lépésre
3. **UI mód**: `--ui` - grafikus interfész
4. **Trace viewer**: Teszt replay részletesen
5. **Console logs**: `console.log()` üzenetek