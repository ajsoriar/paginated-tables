import './App.css';
import Table1 from './components/table1';
import Table2 from './components/table2';
import Table3 from './components/table3';

function App() {
  return (
    <div className="App">
        <Table3 title={'Table: Real fetch from back'}></Table3>
        <Table2 title={'Table: Show loading ...'}></Table2>
        <Table1 title={'Simple table'}></Table1>
    </div>
  );
}

export default App;
