import './App.css';
import Table1 from './components/table1';
import Table2 from './components/table2';
import Table3 from './components/table3';
import Table4 from './components/table4';

function App() {
  return (
    <div className="App">
        <Table4 title={'Table 4: Real fetch from images json data'}></Table4>
        <Table3 title={'Table 3: Real fetch from back'}></Table3>
        <Table2 title={'Table 2: Show loading ...'}></Table2>
        <Table1 title={'1st table'}></Table1>
    </div>
  );
}

export default App;
