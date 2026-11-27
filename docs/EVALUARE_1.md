# Evaluare nr. 1 — jurnal de modificări și verificare

## Cele 10 probleme identificate și remediate

| # | Reproducere | Problemă observată | Remediere |
|---|---|---|---|
| 1 | Deschide lista și selectează „In progress”. | Statusul din opțiune nu se potrivește cu `In progress` din date. | Comparare fără diferență de majuscule/minuscule. |
| 2 | Caută un responsabil cu litere mici sau spații la capete. | Căutarea după responsabil era sensibilă la majuscule și nu elimina spațiile. | Normalizarea interogării și a numelui, cu protecție pentru valori lipsă. |
| 3 | Deschide Tasks și încearcă filtrarea după prioritate. | Controlul nu exista, deși logica stării era prezentă. | Adăugat selector accesibil Low/Medium/High/All priorities; combinația folosește toate filtrele. |
| 4 | Apasă „View all” pe Dashboard. | Legătura `/task` nu corespundea niciunei rute. | Legătura indică `/tasks`. |
| 5 | Șterge o sarcină din detalii. | După ștergere aplicația naviga la ruta inexistentă `/task`. | Navigare către `/tasks`. |
| 6 | Compară progresul proiectelor sau deschide detaliile unui proiect după editarea sarcinii. | ID-urile numerice și textuale nu se potriveau, ascunzând sarcini. | Comparație coerentă prin conversie la text în paginile proiectelor. |
| 7 | Creează sau șterge o sarcină și urmărește contorul din meniu. | Contorul era fixat la 7 și nu reflecta datele API. | Contor derivat din API și reîmprospătat după operațiile CRUD. |
| 8 | Verifică numărul „In progress” pe Dashboard. | Dashboard-ul compara cu `In Progress`, dar datele folosesc `In progress`. | Numărare fără diferență de majuscule/minuscule. |
| 9 | Trimite titlul cu spații sau editează o sarcină și salvează proiectul. | Spațiile erau acceptate drept titlu, iar ID-ul selectat putea fi salvat ca șir. | Validare titlu după eliminarea spațiilor, trimitere ID numeric/null și sincronizarea formularului cu datele inițiale. |
| 10 | Încarcă Dashboard/Projects cu API oprit sau cu listă goală. | Eșecurile puteau rămâne neanunțate, iar proiectele fără rezultate nu aveau stare goală. | Mesaje accesibile la eșec și stare goală explicită. |

## Filtru de prioritate

Selectorul din pagina Tasks filtrează Low, Medium și High. Căutarea, statusul și prioritatea se combină prin AND; numărătoarea folosește rezultatul filtrat; „Clear filters” resetează toate criteriile. Când nu există rezultate, este afișată starea goală.

## CRUD și navigare

- Create: formularul validează titlul și data, trimite ID-ul proiectului în format numeric și redirecționează la `/tasks` după succes.
- Read: Dashboard, lista, detaliile sarcinii, lista proiectelor și detaliile proiectului folosesc API-ul.
- Update: detaliile permit editare și afișează eroarea API dacă salvarea eșuează.
- Delete: detaliile cer confirmare, apoi șterg și redirecționează la lista validă.
- Navigarea folosește rutele React Router existente; linkurile către lista sarcinilor și proiecte au fost corectate.

## Verificări executate

- `git diff --check` — trecut, fără erori de spațiere.
- `npm install` — reușit după instalarea Node.js; prima încercare a întâlnit două instalări simultane și eroarea `ENOTEMPTY`, iar reluarea într-un singur proces a trecut.
- `npm run build` — trecut (Vite 6.4.6, 1592 module).
- `git diff --check` — trecut, fără erori de spațiere.
- `npm install` a raportat două vulnerabilități moderate și un script de instalare `esbuild` neaprobat de npm 11.
- CRUD în interfață și verificarea navigării în browser nu au fost executate încă; necesită `npm run api` și `npm run dev` în terminale separate.

## Branch și Pull Request

- Branch: `feature/fix-taskflow`
- Commit-uri: `fix: repair task flows and filters`, `docs: document evaluation fixes and checks`.
- Fork personal: `https://github.com/Cristik1P/task_apsw`.
- Push către repo-ul inițial `ApaAura/task_apsw` a fost respins cu HTTP 403; branch-ul urmează să fie publicat în fork-ul personal.
