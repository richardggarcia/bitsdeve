import { Suspense, lazy } from 'react';

const Factory = lazy(() => import('./factory/Factory'));

function App() {
    return (
        <Suspense fallback={<div className="boot" role="status">Encendiendo la sala…</div>}>
            <Factory />
        </Suspense>
    );
}

export default App;
