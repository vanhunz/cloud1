import React from 'react';
import ResourceTable from './components/ResourceTable';
import './App.css';

/**
 * Main Application Component
 * Cloud Resource Classifier - Frontend
 */
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>☁️ Cloud Resource Classifier</h1>
        <p className="subtitle">Hệ thống phân loại tài nguyên động trong môi trường Cloud</p>
      </header>
      
      <main className="App-main">
        <ResourceTable />
      </main>
      
      <footer className="App-footer">
        <p>© 2025 Cloud Resource Classification System | Demo Project</p>
      </footer>
    </div>
  );
}

export default App;
