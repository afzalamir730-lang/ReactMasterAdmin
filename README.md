# CampusFlow — React Master Admin Project

A beginner-to-advanced React learning project for a campus administration dashboard. It demonstrates JSX, reusable components, props, state, events, forms, array methods, hooks, routing, API requests, CRUD operations, memoization, refs, context, and an admin-style multi-page layout.

## Requirements
- Node.js (LTS recommended)
- VS Code
- Internet connection for installing npm packages

## Run on Windows
Open this folder in VS Code. In the terminal run:

```bash
npm install
npm run dev:all
```

This starts:
- Vite frontend: `http://localhost:5173`
- JSON Server API: `http://localhost:3001`

If you prefer two terminals, run `npm run server` in the first terminal and `npm run dev` in the second.

## Demo login
- Email: `admin@campusflow.com`
- Password: `admin123`

This is a demo-only frontend login. Do not use it as real authentication. Production apps must authenticate on a secure backend.

## Pages
- `/login` — demo administrator login
- `/` — dashboard totals and recent students
- `/students` — create, read, update, delete, search, and filter student records
- `/courses` — course list loaded from the API
- `/settings` — simple preference controls

## API endpoints
- `GET /students`
- `POST /students`
- `PUT /students/:id`
- `DELETE /students/:id`
- `GET /courses`

The API data is stored in `server/db.json`. JSON Server writes changes to this file while it is running.

## Concepts demonstrated

| Concept | Where to find it |
|---|---|
| JSX and function components | `src/App.jsx`, `src/pages/` |
| Props | `StatCard.jsx`, `StudentRow.jsx`, `StudentForm.jsx` |
| `useState` | forms, login, settings, students |
| `useEffect` | `useFetch.js`, `StudentForm.jsx` |
| `useRef` | `StudentForm.jsx`, `Students.jsx` |
| `useMemo` | `Dashboard.jsx`, `Students.jsx`, `AuthContext.jsx` |
| `useCallback` | `Students.jsx` |
| `useContext` / Context API | `AuthContext.jsx` |
| `React.memo` | `StatCard.jsx`, `StudentRow.jsx` |
| `map()` | sidebar, courses, student list, form options |
| `filter()` | student search and status filter |
| `reduce()` | total fee calculations |
| `find()` / `forEach()` / `includes()` | see the concept examples below |
| Events and controlled forms | `StudentForm.jsx`, `Login.jsx` |
| Conditional rendering | loading, errors, empty lists, protected routes |
| React Router / multiple pages | `App.jsx` |
| API / `fetch` / async-await | `src/services/api.js`, `src/hooks/useFetch.js` |
| CRUD | `Students.jsx` |
| Error handling | `api.js`, `useFetch.js`, `Students.jsx` |

## Small JavaScript array-method examples

```js
const marks = [45, 80, 67, 92];
const doubled = marks.map(mark => mark * 2);       // [90, 160, 134, 184]
const passed = marks.filter(mark => mark >= 50);   // [80, 67, 92]
const total = marks.reduce((sum, mark) => sum + mark, 0); // 284
const firstHigh = marks.find(mark => mark > 85);   // 92
const hasFortyFive = marks.includes(45);           // true
marks.forEach(mark => console.log(mark));          // runs once per item
```

## Useful React JSX attributes
- `className`: CSS class (React JSX equivalent of HTML `class`)
- `htmlFor`: label association (equivalent of HTML `for`)
- `src`, `alt`: image source and alternative text
- `href`, `target`, `rel`: link destination and behavior
- `id`, `title`, `name`, `value`, `placeholder`
- `type`, `required`, `disabled`, `checked`, `readOnly`
- `onClick`, `onChange`, `onSubmit`, `onFocus`, `onBlur`, `onKeyDown`
- `style={{ backgroundColor: 'tomato' }}`: inline style object
- `key`: stable identity for elements rendered from a list; React uses it internally and does not pass it as a normal prop
- `ref`: connects a DOM node to a ref object

## Notes
- `useMemo`, `useCallback`, and `React.memo` are performance tools; use them when useful, not automatically everywhere.
- `useEffect` is used for synchronization with external systems (for example, data fetching). Avoid using it for calculations that can happen during render.
- The project is a learning demo. Add server-side validation, secure authentication, authorization, and deployment configuration before using real student data.
