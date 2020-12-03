import './App.css';
import Table1 from './components/table1';
import Table2 from './components/table2';

function App() {
  return (
    <div className="App">
        <Table2 title={'Table: Show loading ...'}></Table2>
        <Table1 title={'Simple table'}></Table1>
    </div>
  );
}

export default App;
